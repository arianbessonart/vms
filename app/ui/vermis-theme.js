import {
  cyan500, cyan700, green500,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

/**
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */
export default {
  spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#238795', // '#6a104a',
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: '#B0C447',
    accent2Color: '#B0C447',
    accent3Color: '#B0C447',
    textColor: 'rgba(0,0,0,0.87)', // darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },

  appBar: {
    color: '#FFF',
    height: '64px',
  },

  button: {
    minWidth: 140,
    height: 42,
  },
};
