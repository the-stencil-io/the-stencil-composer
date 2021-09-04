import { createTheme } from "@material-ui/core/styles";
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    article: Palette['primary'];
    page: Palette['primary'];
    link: Palette['primary'];
    workflow: Palette['primary'];
    release: Palette['primary'];
    locale: Palette['primary'];
  }
  interface PaletteOptions {
    article: Palette['primary'];
    page: Palette['primary'];
    link: Palette['primary'];
    workflow: Palette['primary'];
    release: Palette['primary'];
    locale: Palette['primary'];
  }
}

const palette = {
  type: 'light',

  primary: {
    main: '#f1f2ee',
    contrastText: '#000',
    dark: '#E2E4DC',
    light: '#fff',
  },
  secondary: {
    main: '#3E668E',
    light: '#5585B4',
    dark: '#325171',
    contrastText: '#fff'
  },
  error: {
    main: '#e53935',
  },
  info: {
    main: '#554971',
    light: '#796AA0',
    dark: '#413857',
  },
  warning: {
    main: '#ff9800',
    light: '#ffac33',
    dark: '#b26a00',
    contrastText: '#000001',
  },
  success: {
    main: '#4caf50',
  },
  text: {
    primary: 'rgba(0,0,0,0.86)',
    secondary: 'rgba(0,0,0,0.55)',
    disabled: 'rgba(0,0,0,0.36)',
    hint: 'rgba(0,0,0,0.37)',
  },
  article: {
    main: 'rgba(0,125,223,255)',
    dark: 'rgba(0, 77, 144, 0.99)'
  },
  page: {
    main: 'rgba(251, 177, 60, 255)',
    dark: 'rgba(224, 141, 7, 1)'
  },
  link: {
    main: 'rgba(171, 54, 102, 255)'
  },
  workflow: {
    main: 'rgba(139,196,67,255)',
    dark: 'rgba(75, 117, 24, 1)'
  },
  release: {
    main: 'rgba(255, 104, 107, 255)'
  },
  locale: {
    main: 'rgba(205,123,221,255)'
  },


}

const siteTheme = createTheme({
  palette: palette as PaletteOptions,

  typography: {
    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
    h1: {
      fontSize: "2rem",
      lineHeight: 2,
      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.9rem",
      lineHeight: 1,
      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
      fontWeight: 400,
      paddingTop: 15,
      paddingBottom: 15,
    },
    h3: {
      fontSize: "1.6rem",
      lineHeight: 1,
      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
      fontWeight: 300,
      paddingTop: 15,
      paddingBottom: 15,
    },
    h4: {
      fontSize: "1.3rem",
      lineHeight: 1,
      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
      fontWeight: 300
    },
    h5: {
      fontSize: "1.1rem",
      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
      fontWeight: 300
    },
    h6: {
      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
      fontWeight: 300
    },
    body1: {
      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
      fontWeight: 300,
    },
    body2: {
      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
      fontSize: "1rem",
    }
  },
  overrides: {

    MuiCardActions: {
      root: {

      }
    },
    MuiListItem: {
      root: {
        paddingTop: 0,
        paddingBottom: 0,
      }
    },

    MuiListItemText: {
      root: {
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
      },
      primary: {
        //color: palette.text.main,
        "&:hover": {
          color: palette.primary.dark,
          fontWeight: 'bold',
        }
      },

      secondary: {
        fontSize: '.9rem',
        //color: palette.text.main,
        "&:hover": {
          color: palette.primary.dark,
          fontWeight: 'bold',
        }
      }
    },

    MuiButton: {
      root: {
        fontVariant: 'body2',
        borderRadius: 0,
        textTransform: 'capitalize',
        borderWidth: '2px solid !important',
      },
    },

    MuiPaper: {
      root: {
        elevation: 1,
        borderColor: palette.secondary.main,
        transition: 'unset'
      }
    },
  },
  props: {
    MuiButton: {
      variant: 'outlined',

    },
    MuiPaper: {
      square: true,

    },
  },

});

export { siteTheme };
