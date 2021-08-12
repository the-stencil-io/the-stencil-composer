import CMS from './cms';
import createMock from './spi/mock';
import createService from './spi/service';


declare namespace API {
  export { CMS }
}

namespace API {
  
  export const mock = (): CMS.Service => {
    return createMock();
  };
  export const service = (init: {store?: CMS.Store, url?: string}): CMS.Service => {
    return createService(init);
  };
  
  export class StoreError extends Error {
    private _props: API.CMS.ErrorProps;

    constructor(props: API.CMS.ErrorProps) {
      super(props.text);
      this._props = {
        text: props.text,
        status: props.status,
        errors: parseErrors(props.errors)
      };


      ///children.errors
    }
    get name() {
      return this._props.text;
    }
    get status() {
      return this._props.status;
    }
    get errors() {
      return this._props.errors;
    }
  }
}



const getErrorMsg = (error: any) => {
  if (error.msg) {
    return error.msg;
  }
  if (error.value) {
    return error.value
  }
  if (error.message) {
    return error.message;
  }
}

const getErrorId = (error: any) => {
  if (error.id) {
    return error.id;
  }
  if (error.code) {
    return error.code
  }
  return "";
}


const parseErrors = (props: any): CMS.ErrorMsg[] => {
  if (!props) {
    return []
  }
  
  if(props.appcode) {
    return [
      {id: props.appcode, value: props.appcode}
    ]
  }
  
  
  if(!props.map) {
    return [];
  }
  const result: CMS.ErrorMsg[] = props.map((error: any) => ({
    id: getErrorId(error),
    value: getErrorMsg(error)
  }));

  return result;
}

export default API;