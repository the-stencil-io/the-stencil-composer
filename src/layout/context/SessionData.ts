import Session from './Session';
 

class SessionData implements Session.Instance {  
  private _tabs: Session.Tab<any>[];
  private _history: Session.History;
  private _secondary?: string;
  private _drawer: boolean;
  
  constructor(props: {
      tabs?: Session.Tab<any>[], 
      history?: Session.History,
      secondary?: string,
      drawer?: boolean}) {
    
    this._drawer = props.drawer ? true : false;
    this._secondary = props.secondary;
    this._tabs = props.tabs ? props.tabs : [];
    this._history = props.history ? props.history : { open: 0 };
  }
  get tabs(): readonly Session.Tab<any>[] {
    return this._tabs;
  }
  get history() {
    return this._history;
  }
  get secondary() {
    return this._secondary;
  }
  get drawer() {
    return this._drawer;
  }
  private next(history: Session.History, tabs?: Session.Tab<any>[]): Session.Instance {
    const newTabs = tabs ? tabs : this.tabs;
    return new SessionData({tabs: [...newTabs], history, secondary: this._secondary, drawer: this._drawer});
  }
  withTabData(tabId: string, updateCommand: (oldData: any) => any): Session.Instance {
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
  withTab(newTabOrTabIndex: Session.Tab<any> | number): Session.Instance {
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
  withSecondary(newItemId?: string): Session.Instance {
    return new SessionData({ secondary: newItemId, tabs: this._tabs, history: this._history, drawer: this._drawer});
  }
  withDrawer(open: boolean): Session.Instance {
    return new SessionData({ secondary: this._secondary, tabs: this._tabs, history: this._history, drawer: open});
  }
  getTabData<T>(tabId: string): T {
    const tabIndex = this.findTab(tabId);
    if(tabIndex) {
      return this.tabs[tabIndex].data;
    }
    console.error(this);
    throw new Error (`cant find tab: '${tabId}'`);
  }
  deleteTab(tabId: string): Session.Instance {
    const tabs: Session.Tab<any>[] = [];
    for(const tab of this.tabs) {
      if(tabId !== tab.id) {
        tabs.push(tab);
      }
    }
    return this.next(this.history, tabs).withTab(tabs.length - 1);
  }
  
  deleteTabs(): Session.Instance {
    const tabs: Session.Tab<any>[] = [];
    return this.next({ previous: this.history, open: 0}, tabs);
  }
}

export default SessionData;
