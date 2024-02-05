import {StyleSheet, View} from 'react-native';

import {Appbar, Text, useTheme} from 'react-native-paper';
import React from 'react';
import {Spacing} from '../styles/spacing';
import {makeAppStyles} from '../styles/styles';

function CoffeeDetailsScreen({route, navigation}) {
  const theme = useTheme();
  const {coffee} = route.params;

  const appStyles = makeAppStyles(theme.colors);

  const styles = StyleSheet.create({
    card: {
      padding: Spacing.default,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 10,
    },
    row: {
      flexDirection: 'row',
      marginBottom: Spacing.default,
    },
    rowLabel: {
      fontWeight: 'bold',
      marginEnd: Spacing.small,
    },
  });

  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={{backgroundColor: theme.colors.surface}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={coffee.name} />
      </Appbar.Header>

      <View style={[appStyles.centerContainer]}>
        <View style={[styles.card]}>
          <View style={[styles.row]}>
            <Text style={[styles.rowLabel]} variant="bodyLarge">
              Country:
            </Text>
            <Text variant="bodyLarge">{coffee.origin}</Text>
          </View>
          <View style={[styles.row]}>
            <Text style={[styles.rowLabel]} variant="bodyLarge">
              Roster:
            </Text>
            <Text variant="bodyLarge">{coffee.roaster}</Text>
          </View>
          <View style={[styles.row, {marginBottom: 0}]}>
            <Text style={[styles.rowLabel]} variant="bodyLarge">
              Region:
            </Text>
            <Text variant="bodyLarge">{coffee.region}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default CoffeeDetailsScreen;
