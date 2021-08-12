import { createTheme } from "@material-ui/core/styles";
import { PaletteOptions } from '@material-ui/core/styles/createPalette';



const palette = {
  type: 'light',


  primary: {
    main: '#078299',
    contrastText: '#2f3131',
    dark: '#078299',
    light: '#edf0f2',
  },
  secondary: {
    main: '#078299',
    light: 'rgba(7,130,153, 0.25)',
    dark: 'rgb(217,227,230)', //darker blue for under header
    contrastText: '#ffffff',
  },
  background: {
    paper: '#fefefe',
  },
  text: {
    main: '#000000',
    dark: '#066474', //dark variant of primary.main
    light: 'ffffff',
    hint: 'rgba(125,73,73,0.38)',
  },
  success: {
    main: '#4caf50',
    light: '#81c784',
    dark: '#388e3c',
  },
  action: {
    main: '#f28d00', //orange
  },
  info: {
    main: "#f28d00", //orange
    light: '#f0f6fa', //light blue
  }
}

const siteTheme = createTheme({
  palette: palette as PaletteOptions,

  typography: {
    fontFamily: "'Open Sans', sans-serif",
    h1: {
      fontSize: "2rem",
      lineHeight: 2,
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: 600,
      color: palette.primary.contrastText
    },
    h2: {
      fontSize: "1.9rem",
      lineHeight: 1,
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: 400,
      paddingTop: 15,
      paddingBottom: 15,
      color: palette.primary.contrastText,
    },
    h3: {
      fontSize: "1.6rem",
      lineHeight: 1,
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: 300,
      paddingTop: 15,
      paddingBottom: 15,
      color: palette.primary.contrastText,

    },
    h4: {
      fontSize: "1.3rem",
      lineHeight: 1,
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: 300
    },
    h5: {
      fontSize: "1.1rem",
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: 300
    },
    h6: {
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: 300
    },
    body1: {
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: 300,
    },
    body2: {
      fontFamily: "'Open Sans', sans-serif",
      fontSize: "1rem",
    }
  },
  overrides: {

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
        color: palette.text.main,
        "&:hover": {
          color: palette.primary.dark,
          fontWeight: 'bold',
        }
      },

      secondary: {
        fontSize: '.9rem',
        color: palette.text.main,
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


    MuiFormControl: {
      root: {
        "& .MuiOutlinedInput-input": {
          color: palette.primary.contrastText
        },
        "& .MuiInputLabel-root": {
          color: palette.primary.contrastText
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          color: palette.primary.contrastText
        },
        "&:hover .MuiOutlinedInput-input": {
          color: palette.primary.contrastText
        },
        "&:hover .MuiInputLabel-root": {
          color: palette.primary.contrastText
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: palette.primary.contrastText,
          borderWidth: '1px'
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
          color: palette.primary.contrastText
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: palette.primary.contrastText
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: palette.primary.contrastText
        },
        "& .MuiFormLabel-root": {
          color: palette.primary.contrastText
        },
        "& .MuiListItem-root .MuiTouchRipple-child": {
          backgroundColor: palette.info.main
        }
      }
    }
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
