import { createTheme, PaletteOptions } from "@mui/material/styles";


declare module '@mui/material/styles' {
  interface Palette {
    article: Palette['primary'];
    page: Palette['primary'];
    link: Palette['primary'];
    workflow: Palette['primary'];
    release: Palette['primary'];
    locale: Palette['primary'];
    import: Palette['primary'];
    activeItem: Palette['primary'];
  }
  interface PaletteOptions {
    article: Palette['primary'];
    page: Palette['primary'];
    link: Palette['primary'];
    workflow: Palette['primary'];
    release: Palette['primary'];
    locale: Palette['primary'];
    import: Palette['primary'];
    activeItem: Palette['primary'];
  }
}

const palette = {
  type: 'light',

  primary: {
    main: '#607196',
    contrastText: '#fff',
    dark: '#404c64',
    light: '#7686a7',
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
    main: '#127EE2',
    dark: '#0c5497',
    light: '#1D88ED',
    contrastText: ' #fff'
  },
  page: {
    main: '#aa4b77',
    dark: '#803859',
    light: '#BB638C',
    contrastText: '#fff'

  },
  link: {
    main: '#8ab800',
    dark: '#6b8f00',
    light: '#A8E000',
    contrastText: '#fff'
  },
  workflow: {
    main: '#8332AC',
    dark: '#6d298e',
    light: '#a351cd',
    contrastText: '#fff'
  },
  release: {
    main: '#D7901D',
    dark: '#A26C16',
    light: '#D7901D',
    contrastText: '#fff'
  },
  locale: {
    main: '#1bc5a3',
    dark: '#117E68',
    light: '#1dd7b2',
    contrastText: '#fff'
  },
  import: {
    main: 'rgba(77, 144, 142)',
    dark: 'rgba(64, 119, 118)',
    light: 'rgba(86, 159, 158)',
    contrastText: '#fff'
  },
  activeItem: {
    main: '#edf6f9'
  }


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



  components: {

    MuiCardActions: {
      styleOverrides: {
        root: {

        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
        }
      }
    },

    MuiListItemText: {
      styleOverrides: {
          root: {
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginBottom: 0,
          },
        primary: {
          color: palette.text.primary,
          "&:hover": {
            color: palette.primary.dark,
            fontWeight: 'bold',
          }
        },
  
        secondary: {
          fontSize: '.9rem',
          color: palette.text.primary,
          "&:hover": {
            color: palette.primary.dark,
            fontWeight: 'bold',
          }
        }
        
      }
    },

    MuiButton: {
      
      styleOverrides: {
        root: {
          fontVariant: 'body2',
          borderRadius: 0,
          textTransform: 'capitalize',
          borderWidth: '2px solid !important',
        },
      },
          defaultProps: {
          variant: 'outlined',
          },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          elevation: 1,
          borderColor: palette.secondary.main,
          transition: 'unset'
        },
      },
        defaultProps: {
          square: true,
        },
    },


  },

});

export { siteTheme };
