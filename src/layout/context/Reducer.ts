import Session from './Session';

enum ActionType {
  addTab = "addTab", 
  removeTab = "removeTab", 
  changeTab = "changeTab",
  closeTabs = "closeTabs",
  
  setTabData = "setTabData", 
  setDialog = "setDialog", 
  setLink = "setLink", 
  setSearch = "setSearch", 
  setDimensions = "setDimensions",
}

interface Action {
  type: ActionType;
  
  setDimensions?: {x: number, y: number};
  setDialog?: string;
  setLink?: string;
  setSearch?: { keyword?: string, tab?: Session.Tab<any> };
  addTab?: Session.Tab<any>;
  removeTab?: string;
  changeTab?: number;
  setTabData?: {id: string, updateCommand: (oldData: any) => any};
}

const ActionBuilder = {
  setDimensions: (setDimensions: {x: number, y: number}) => ({ type: ActionType.setDimensions, setDimensions }),
  addTab: (addTab: Session.Tab<any>): Action => ({ type: ActionType.addTab, addTab }),
  removeTab: (removeTab: string): Action => ({ type: ActionType.removeTab, removeTab}),
  changeTab: (changeTab: number): Action => ({ type: ActionType.changeTab, changeTab}),
  closeTabs: (): Action => ({ type: ActionType.closeTabs }),
  
  setTabData: (id: string, updateCommand: (oldData: any) => any): Action => ({
    type: ActionType.setTabData, 
    setTabData: {id, updateCommand}
  }),
 
  setLink: (setLink?: string): Action => ({ type: ActionType.setLink, setLink}),
  setDialog: (setDialog?: string): Action => ({ type: ActionType.setDialog, setDialog}),
  setSearch: (keyword: string, tab?: Session.Tab<any>): Action => ({ type: ActionType.setSearch, setSearch: { keyword, tab }}),
}

class ReducerDispatch implements Session.Actions {

  private _sessionDispatch: React.Dispatch<Action>;
  constructor(session: React.Dispatch<Action>) {
    this._sessionDispatch = session;
  }
  handleDimensions(props: {x: number, y: number}) {
    this._sessionDispatch(ActionBuilder.setDimensions(props)) 
  }  
  handleSearch(keyword: string) {
    this._sessionDispatch(ActionBuilder.setSearch(keyword)) 
  }  
  handleLink(id: string) {
    this._sessionDispatch(ActionBuilder.setLink(id)) 
  } 
  handleDialog(id: string) {
    this._sessionDispatch(ActionBuilder.setDialog(id)) 
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
}

const Reducer = (state: Session.InstanceMutator, action: Action): Session.InstanceMutator => {
  switch (action.type) {
    case ActionType.addTab: {
      if(action.addTab) {
        return state.withTab(action.addTab); 
      }
      console.error("Action data error", action);
      return state;
    }
    case ActionType.changeTab: {
      if(action.changeTab === undefined) {
        console.error("Action data error", action);
        return state;
      }
      return state.withTab(action.changeTab);
    }
    case ActionType.removeTab: {
      if(!action.removeTab) {
        console.error("Action data error", action);
        return state;
      }
      return state.deleteTab(action.removeTab);      
    }
    case ActionType.setTabData: {
      if(!action.setTabData) {
        console.error("Action data error", action);
        return state;
      }
      return state.withTabData(action.setTabData.id, action.setTabData.updateCommand);
    }
    case ActionType.setSearch: {
      const search = action.setSearch;
      if(!search) {
        console.error("Action data error", action);
        return state;
      }
      
      const newState = state.withSearch(search.keyword ? search.keyword : "")
      if(search.tab) {
        return newState.withTab(search.tab);        
      }
      return newState;
    }
    case ActionType.setDialog: {
      return state.withDialog(action.setDialog)
    }
    case ActionType.setLink: {
      return state.withLink(action.setLink)
    }
    case ActionType.closeTabs: {
      return state.deleteTabs();
    }
    case ActionType.setDimensions: {
      const dimensions = action.setDimensions;
      if(!dimensions) {
        console.error("Action data error", action);
        return state;
      }
      return state.withDimensions(dimensions);
    }
  }
}

export type { Action }
export { Reducer, ReducerDispatch, ActionType };
