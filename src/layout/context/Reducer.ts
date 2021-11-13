import Session from './Session';

enum ActionType {
  addTab = "addTab",
  setDrawer = "setDrawer",
  removeTab = "removeTab",
  changeTab = "changeTab",
  closeTabs = "closeTabs",
  closeTabCurrent = "closeTabCurrent",
  setTabData = "setTabData",
  setSecondary = "setSecondary"
}

interface Action {
  type: ActionType;
  addTab?: Session.Tab<any>;
  setDrawer?: boolean;
  removeTab?: string;
  changeTab?: number;
  setSecondary?: string;
  setTabData?: { id: string, updateCommand: (oldData: any) => any };
}

const ActionBuilder = {
  addTab: (addTab: Session.Tab<any>): Action => ({ type: ActionType.addTab, addTab }),
  setDrawer: (setDrawer: boolean): Action => ({ type: ActionType.setDrawer, setDrawer }),
  removeTab: (removeTab: string): Action => ({ type: ActionType.removeTab, removeTab }),
  changeTab: (changeTab: number): Action => ({ type: ActionType.changeTab, changeTab }),
  closeTabs: (): Action => ({ type: ActionType.closeTabs }),
  closeTabCurrent: (): Action => ({ type: ActionType.closeTabCurrent }),
  setSecondary: (newItemId?: string): Action => ({ type: ActionType.setSecondary, setSecondary: newItemId }),
  setTabData: (id: string, updateCommand: (oldData: any) => any): Action => ({
    type: ActionType.setTabData,
    setTabData: { id, updateCommand }
  }),

}

class ReducerDispatch implements Session.Actions {

  private _sessionDispatch: React.Dispatch<Action>;
  constructor(session: React.Dispatch<Action>) {
    this._sessionDispatch = session;
  }
  handleSecondary(newItemId?: string) {
    this._sessionDispatch(ActionBuilder.setSecondary(newItemId));
  }
  handleDrawerOpen(drawerOpen: boolean) {
    this._sessionDispatch(ActionBuilder.setDrawer(drawerOpen));
  }
  handleTabAdd(newItem: Session.Tab<any>) {
    this._sessionDispatch(ActionBuilder.addTab(newItem));
  }
  handleTabChange(tabIndex: number) {
    this._sessionDispatch(ActionBuilder.changeTab(tabIndex))
  }
  handleTabClose(tab: Session.Tab<any>) {
    this._sessionDispatch(ActionBuilder.removeTab(tab.id));
  }
  handleTabCloseAll() {
    this._sessionDispatch(ActionBuilder.closeTabs());
  }
  handleTabData(tabId: string, updateCommand: (oldData: any) => any) {
    this._sessionDispatch(ActionBuilder.setTabData(tabId, updateCommand));
  }
  handleTabCloseCurrent() {
    this._sessionDispatch(ActionBuilder.closeTabCurrent());   
  }

}

const Reducer = (state: Session.Instance, action: Action): Session.Instance => {
  switch (action.type) {
    case ActionType.addTab: {
      if (action.addTab) {
        return state.withTab(action.addTab);
      }
      console.error("Action data error", action);
      return state;
    }
    case ActionType.changeTab: {
      if (action.changeTab === undefined) {
        console.error("Action data error", action);
        return state;
      }
      return state.withTab(action.changeTab);
    }
    case ActionType.removeTab: {
      if (!action.removeTab) {
        console.error("Action data error", action);
        return state;
      }
      return state.deleteTab(action.removeTab);
    }
    case ActionType.setSecondary: {
      if (!action.setSecondary) {
        console.error("Action data error", action);
        return state;
      }
      const result = state.withSecondary(action.setSecondary);
      if(result.drawer === false) {
        return result.withDrawer(true);
      }
      return result;
    }
    case ActionType.setDrawer: {
      if (action.setDrawer === undefined) {
        console.error("Action data error", action);
        return state;
      }
      return state.withDrawer(action.setDrawer);
    }
    case ActionType.setTabData: {
      if (!action.setTabData) {
        console.error("Action data error", action);
        return state;
      }
      return state.withTabData(action.setTabData.id, action.setTabData.updateCommand);
    }
    case ActionType.closeTabs: {
      return state.deleteTabs();
    }
    case ActionType.closeTabCurrent: {
      const active = state.history.open;
      const tab = state.tabs[active];
      return state.deleteTab(tab.id);
    }
  }
}

export type { Action }
export { Reducer, ReducerDispatch, ActionType };
