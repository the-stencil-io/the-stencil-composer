import Session from './Session';
 

class SessionData implements Session.InstanceMutator {  
  private _tabs: Session.Tab<any>[];
  private _history: Session.History;
  private _dialogId?: string;
  private _linkId?: string;
  private _dimensions: {x: number, y: number};
  private _search;
  
  constructor(props: {
      tabs?: Session.Tab<any>[], 
      history?: Session.History, 
      dialogId?: string,
      linkId?: string,
      search?: string,
      dimensions?: {x: number, y: number}}) {
    
    this._tabs = props.tabs ? props.tabs : [];
    this._history = props.history ? props.history : { open: 0 };
    this._dialogId = props.dialogId;
    this._linkId = props.linkId;
    this._dimensions = props.dimensions ? props.dimensions : {x: 0, y: 0};
    this._search = props.search ? props.search : '';
  }
  get linkId() {
    return this._linkId;
  }
  get search() {
    return this._search;
  }
  get tabs(): readonly Session.Tab<any>[] {
    return this._tabs;
  }
  get history() {
    return this._history;
  }
  get dialogId() {
    return this._dialogId;
  }
  get dimensions() {
    return this._dimensions;
  }
  private next(history: Session.History, tabs?: Session.Tab<any>[]): Session.InstanceMutator {
    const newTabs = tabs ? tabs : this.tabs;
    return new SessionData({dimensions: this._dimensions, dialogId: this.dialogId, linkId: this._linkId, search: this._search, tabs: [...newTabs], history});
  }
  withSearch(search?: string): Session.InstanceMutator {
    return new SessionData({dimensions: this._dimensions, tabs: this._tabs, history: this._history, dialogId: this._dialogId, linkId: this._linkId, search});
  }
  withDialog(dialogId?: string): Session.InstanceMutator {
    return new SessionData({dimensions: this._dimensions, tabs: this._tabs, history: this._history, linkId: this._linkId, search: this._search, dialogId});
  }  
  withLink(linkId?: string): Session.InstanceMutator {
    return new SessionData({dimensions: this._dimensions, tabs: this._tabs, history: this._history, dialogId: this._dialogId, search: this._search, linkId});
  }  
  withDimensions(dimensions: {x: number, y: number}): Session.InstanceMutator {
    return new SessionData({dimensions: {x: dimensions.x, y: dimensions.y}, tabs: this._tabs, history: this._history, dialogId: this._dialogId, search: this._search, linkId: this._linkId});
  }    
  withTabData(tabId: string, updateCommand: (oldData: any) => any): Session.InstanceMutator {
    const tabs: Session.Tab<any>[] = [];
    for(const tab of this.tabs) {
      if(tabId === tab.id) {
        const newData = updateCommand(tab.data);
        tabs.push({id: tab.id, label: tab.label, data: newData});
      } else {
        tabs.push(tab);
      }
    }
    return this.next(this.history, tabs);
  }
  withTab(newTabOrTabIndex: Session.Tab<any> | number): Session.InstanceMutator {
    if(typeof newTabOrTabIndex === 'number') {
      const tabIndex = newTabOrTabIndex as number;
      return this.next({ previous: this.history, open: tabIndex });
    }
    
    const newTab = newTabOrTabIndex as Session.Tab<any>;
    const alreadyOpen = this.findTab(newTab.id);
    if(alreadyOpen !== undefined) {      
      const editModeChange = this.tabs[alreadyOpen].edit !== newTab.edit;
      if(editModeChange && newTab.edit === true) {
        return this.deleteTab(newTab.id).withTab(newTab);
      }      
      return this.next({ previous: this.history, open: alreadyOpen });
    }

    return this.next({ previous: this.history, open: this.tabs.length}, this.tabs.concat(newTab));
  }
  findTab(newTabId: string): number | undefined {
    let index = 0; 
    for(let tab of this.tabs) {
      if(tab.id === newTabId) {
        return index;
      }
      index++
    }
    return undefined;
  }
  getTabData<T>(tabId: string): T {
    const tabIndex = this.findTab(tabId);
    if(tabIndex) {
      return this.tabs[tabIndex].data;
    }
    console.error(this);
    throw new Error (`cant find tab: '${tabId}'`);
  }
  deleteTab(tabId: string): Session.InstanceMutator {
    const tabs: Session.Tab<any>[] = [];
    for(const tab of this.tabs) {
      if(tabId !== tab.id) {
        tabs.push(tab);
      }
    }
    return this.next(this.history, tabs).withTab(tabs.length - 1);
  }
  
  deleteTabs(): Session.InstanceMutator {
    const tabs: Session.Tab<any>[] = [];
    return this.next({ previous: this.history, open: 0}, tabs);
  }
}

export default SessionData;
