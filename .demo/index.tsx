import React from 'react';
import ReactDOM from 'react-dom';
import { CMSEditor, API, messages } from './core';
import { ThemeProvider } from '@material-ui/core';
import { IntlProvider } from 'react-intl'
import { siteTheme } from './themes/siteTheme'

const locale = "en";
const service = API.service({url: "http://localhost:8080/q/zoe-ide-services"});

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={messages[locale]}>
      <ThemeProvider theme={siteTheme}>
        <CMSEditor service={service} />
      </ThemeProvider>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
