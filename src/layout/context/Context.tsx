import React from 'react';

import Session from './Session';
import SessionData from './SessionData';
import { Reducer, ReducerDispatch } from './Reducer';


const LayoutContext = React.createContext<Session.ContextType>({
  session: {} as Session.Instance,
  actions: {} as Session.Actions,
});

const sessionData = new SessionData({});

const LayoutProvider: React.FC<{children: React.ReactNode, drawerOpen?: boolean }> = ({ children, drawerOpen }) => {
  const [session, dispatch] = React.useReducer(Reducer, sessionData.withDrawer(drawerOpen ? true : false));
  const actions = React.useMemo(() => {
    console.log("init layout dispatch");
    return new ReducerDispatch(dispatch)
  }, [dispatch]);
  return (
    <LayoutContext.Provider value={{ session, actions }}>
      {children}
    </LayoutContext.Provider>
  );
};



const useLayout = () => {
  const result: Session.ContextType = React.useContext(LayoutContext);
  return result;
}

const useActions = () => {
  const result: Session.ContextType = React.useContext(LayoutContext);
  return result.actions;
}

export { LayoutProvider, LayoutContext, useLayout, useActions };