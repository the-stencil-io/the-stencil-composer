import { Container as LayoutContainer, ContainerProps } from "./Layout"
import { LayoutContext, LayoutProvider, Session, useLayout } from "./context"

declare namespace Layout {
  export { 
    Session, ContainerProps
  };
}

namespace Layout {
  export const Container = LayoutContainer; 
  export const Context = LayoutContext;
  export const Provider = LayoutProvider;
  export const useContext = useLayout;
}

export default Layout;