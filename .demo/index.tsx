import React from 'react';
import ReactDOM from 'react-dom';
import { StencilComposer, StencilClient, messages, siteTheme } from './core';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { IntlProvider } from 'react-intl'

var locale = (navigator.languages && navigator.languages[0]) || navigator.language || (navigator as any).userLanguage || 'en-US';

const service = StencilClient.mock();
//const service = StencilClient.service({ config: { url: "http://localhost:8080/q/ide-services" }});

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={messages[locale]}>
      <StyledEngineProvider injectFirst>
      <ThemeProvider theme={siteTheme}>
        <StencilComposer service={service} />
      </ThemeProvider>
      </StyledEngineProvider>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
