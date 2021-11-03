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
    findTab(newTabId: string): number | undefined;
    getTabData(tabId: string): any;
  }
  
  interface InstanceMutator extends Instance {
    withTabData(tabId: string, updateCommand: (oldData: any) => any): InstanceMutator;
    withTab(newTabOrTabIndex: Tab<any> | number): InstanceMutator;
    withSecondary(newItemId?: string): InstanceMutator;
    deleteTabs(): Session.InstanceMutator;
    deleteTab(tabId: string): Session.InstanceMutator;
  }
  
  interface Actions {
    handleTabAdd(newItem: Session.Tab<any>): void;
    handleSecondary(newItemId?: string): void;
    handleTabData(tabId: string, updateCommand: (oldData: any) => any): void;
    handleTabChange(tabIndex: number): void;
    handleTabClose(tab: Session.Tab<any>): void;
    handleTabCloseAll(): void;
  }
}

export default Session;