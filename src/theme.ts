'use client';
import { createTheme } from '@mui/material/styles';
import { interRegular } from './@core/lib/font';
import { FontSize } from './@core/lib/style';

const theme = createTheme({
    typography: {
        fontFamily: interRegular.style.fontFamily,
        button: {
          textTransform: 'none',
        },
        htmlFontSize: FontSize.semium,
    },
  
    palette: {
      mode: 'light',
      primary: {
        main: '#4793ea',
        contrastText: '#000000',
      },
      secondary: {
        main: '#FFDA78',
      },
      error: {
        main: "#ef5350"
      },
      warning: {
        main: "#ff9800"
      },
      info: {
        main: "#03a9f4"
      },
      success: {
        main: "#4caf50"
      },
    },
    components: {
      MuiInputBase: {
        styleOverrides:{
          input: {
            fontSize: FontSize.semium,
          }
        },
        defaultProps: {
          margin: 'dense',
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: FontSize.semium,
          }
        },
        defaultProps: {
          margin: 'dense',
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: FontSize.semium,
          }
        },
        defaultProps: {
          size: 'small',
        },
      },
      MuiListItem: {
        defaultProps: {
          dense: true,
        },
      },
      // MuiTable: {
      //   defaultProps: {
      //     size: 'medium',
      //   },
      // },
    }
});


export default theme;