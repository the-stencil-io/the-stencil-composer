import React from 'react';
import ReactDOM from 'react-dom';
import { CMSEditor, API, messages } from './core';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { IntlProvider } from 'react-intl'
import { siteTheme } from './themes/siteTheme'

const locale = "en";
//const service = API.mock();
const service = API.service({url: "http://localhost:8080/q/ide-services"});

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={messages[locale]}>
      <StyledEngineProvider injectFirst>
      <ThemeProvider theme={siteTheme}>
        <CMSEditor service={service} />
      </ThemeProvider>
      </StyledEngineProvider>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
