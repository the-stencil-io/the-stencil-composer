import Ide from './ide';
import { API } from '../deps';


enum ActionType {
  setSite = "setSite",
  setPageUpdate = "setPageUpdate",
  setPageUpdateRemove = "setPageUpdateRemove"
}

interface Action {
  type: ActionType;

  setPageUpdateRemove?: {pages: API.CMS.PageId[]}
  setPageUpdate?: { page: API.CMS.PageId, value: API.CMS.LocalisedContent };
  setSite?: { site: API.CMS.Site };
}

const ActionBuilder = {
  setPageUpdateRemove: (setPageUpdateRemove: { pages: API.CMS.PageId[] } ) => ({type: ActionType.setPageUpdateRemove, setPageUpdateRemove }),
  setPageUpdate: (setPageUpdate: { page: API.CMS.PageId, value: API.CMS.LocalisedContent }) => ({ type: ActionType.setPageUpdate, setPageUpdate }),
  setSite: (setSite: { site: API.CMS.Site }) => ({ type: ActionType.setSite, setSite }),
}

class ReducerDispatch implements Ide.Actions {

  private _sessionDispatch: React.Dispatch<Action>;
  private _service: API.CMS.Service;
  
  constructor(session: React.Dispatch<Action>, service: API.CMS.Service) {
    this._sessionDispatch = session;
    this._service = service;
  }
  async handleLoad(): Promise<void> {
    return this._service.getSite()
      .then(site => {
        if(site.contentType === "NOT_CREATED") {
          this._service.create().site().then(created => this._sessionDispatch(ActionBuilder.setSite({site: created})));
        } else {
          this._sessionDispatch(ActionBuilder.setSite({site})) 
        }
      });
  }
  async handleLoadSite(): Promise<void> {
    return this._service.getSite().then(site => this._sessionDispatch(ActionBuilder.setSite({site})));
  }
  handlePageUpdate(page: API.CMS.PageId, value: API.CMS.LocalisedContent): void {
    this._sessionDispatch(ActionBuilder.setPageUpdate({page, value}));
  }
  handlePageUpdateRemove(pages: API.CMS.PageId[]): void {
    this._sessionDispatch(ActionBuilder.setPageUpdateRemove({pages}));
  }
}

const Reducer = (state: Ide.Session, action: Action): Ide.Session => {
  switch (action.type) {
    case ActionType.setSite: {
      if (action.setSite) {
        console.log("new site", action.setSite.site);
        return state.withSite(action.setSite.site);
      }
      console.error("Action data error", action);
      return state;
    }
    case ActionType.setPageUpdate: {
      if (action.setPageUpdate) {
        return state.withPageValue(action.setPageUpdate.page, action.setPageUpdate.value);
      }
      console.error("Action data error", action);
      return state;
    }
    case ActionType.setPageUpdateRemove: {
      if (action.setPageUpdateRemove) {
        return state.withoutPages(action.setPageUpdateRemove.pages);
      }
      console.error("Action data error", action);
      return state;
    }
  }
}

export type { Action }
export { Reducer, ReducerDispatch, ActionType };
