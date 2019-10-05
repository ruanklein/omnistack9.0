import React from 'react';
import { YellowBox } from 'react-native';

import Routes from '../Routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

// import styles from './styles';

export default () => {
  return <Routes />;
};