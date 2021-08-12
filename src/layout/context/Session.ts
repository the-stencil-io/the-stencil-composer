declare namespace Session {
  
    
  type ToolbarItemButton = {
    onClick: (id: string) => void;
  }

  type ToolbarItemView = {
    getView: (id: string) => React.ReactNode;
  }

  type ToolbarItemDialog = {
    getDialog: (id: string, onClose: () => void) => React.ReactNode;
  }
  
  type ToolbarItemType = ToolbarItemButton | ToolbarItemView | ToolbarItemDialog;

  interface ToolbarItem {
    id: string;
    icon?: React.ReactNode;
    badge?: { color: string, text: string };
    enabled?: boolean;
    type: ToolbarItemType;
  }
  
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
    dialogId?: string;
    search?: string;
    linkId?: string;
    dimensions: {x: number, y: number},
    tabs: readonly Tab<any>[];
    findTab(newTabId: string): number | undefined;
    getTabData(tabId: string): any;
  }
  
  interface InstanceMutator extends Instance {
    withDimensions(props: {x: number, y: number}): InstanceMutator;
    withSearch(keyword: string): InstanceMutator;
    withDialog(dialogId?: string): InstanceMutator;
    withLink(id?: string): InstanceMutator;
    withTabData(tabId: string, updateCommand: (oldData: any) => any): InstanceMutator;
    withTab(newTabOrTabIndex: Tab<any> | number): InstanceMutator;
    deleteTabs(): Session.InstanceMutator;
    deleteTab(tabId: string): Session.InstanceMutator;
  }
  
  interface Actions {
    handleDimensions(props:{ x: number, y: number }): void;
    handleDialog(id?: string): void;
    handleLink(id?: string): void;
    handleSearch(keyword: string): void;
    handleTabAdd(newItem: Session.Tab<any>): void;
    handleTabData(tabId: string, updateCommand: (oldData: any) => any): void;
    handleTabChange(tabIndex: number): void;
    handleTabClose(tab: Session.Tab<any>): void;
    handleTabCloseAll(): void;
  }
}

export default Session;