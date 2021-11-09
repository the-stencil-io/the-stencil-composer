declare namespace Session {
  
  interface ContextType {
    session: Instance;
    actions: Actions;
  }
  
  interface Tab<T> {
    id: string;
    label: string | React.ReactElement;
    data?: T;
    edit?: boolean;
  }
  
  interface History {
    previous?: History;
    open: number;
  }
 
  interface Instance {  
    history: History;
    secondary?: string;
    tabs: readonly Tab<any>[];
    drawer: boolean;
    findTab(newTabId: string): number | undefined;
    getTabData(tabId: string): any;
    
    withDrawer(open: boolean): Instance;
    withTabData(tabId: string, updateCommand: (oldData: any) => any): Instance;
    withTab(newTabOrTabIndex: Tab<any> | number): Instance;
    withSecondary(newItemId?: string): Instance;
    deleteTabs(): Instance;
    deleteTab(tabId: string): Instance;
  }
    
  interface Actions {
    handleDrawerOpen(open: boolean): void;
    handleTabAdd(newItem: Session.Tab<any>): void;
    handleSecondary(newItemId?: string): void;
    handleTabData(tabId: string, updateCommand: (oldData: any) => any): void;
    handleTabChange(tabIndex: number): void;
    handleTabClose(tab: Session.Tab<any>): void;
    handleTabCloseAll(): void;
  }
}

export default Session;