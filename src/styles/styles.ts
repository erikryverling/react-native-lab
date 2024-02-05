import {StyleSheet} from 'react-native';

import {Spacing} from './spacing';

export const makeAppStyles = (colors: any) =>
  StyleSheet.create({
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    primaryButton: {
      alignItems: 'center',
      backgroundColor: colors.primary,
      width: 300,
      padding: Spacing.default,
      marginBottom: 10,
    },
  });
