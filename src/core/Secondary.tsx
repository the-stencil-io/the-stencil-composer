import React from 'react';

import { Explorer } from './explorer';
import { Composer } from './context';


const Secondary: React.FC<{}> = () => {
  const layout = Composer.useLayout();

  return (<Explorer />)
}
export { Secondary }


