import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';

import {Text, useTheme} from 'react-native-paper';

import {Spacing} from '../styles/spacing';
import {Appbar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import data from '../data/coffee.json';

const makeStyles = (colors: any) =>
  StyleSheet.create({
    listItem: {
      padding: Spacing.default,
      marginBottom: Spacing.default,
      backgroundColor: colors.colors.surfaceVariant,
    },
  });

function CoffeeListScreen({navigation}) {
  const theme = useTheme();

  return (
    <View>
      <Appbar.Header style={{backgroundColor: theme.colors.surface}}>
        <Appbar.Content title="Coffee" />
      </Appbar.Header>

      <FlatList
        data={data.coffee}
        renderItem={({item}) => (
          <CoffeeItem theme={theme} navigation={navigation} coffee={item} />
        )}
        contentContainerStyle={{
          padding: Spacing.default,
          paddingBottom: Spacing.extraLarge,
        }}
      />
    </View>
  );
}

const CoffeeItem = ({theme, navigation, coffee}) => {
  return (
    <TouchableOpacity
      style={[makeStyles(theme).listItem]}
      onPress={() => {
        navigation.navigate('CoffeeDetails', {coffee: coffee});
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{justifyContent: 'center', marginEnd: Spacing.default}}>
          <MaterialCommunityIcons
            name="coffee-outline"
            size={24}
            color={theme.colors.onSurfaceVariant}
          />
        </View>
        <View>
          <Text variant="bodyLarge">{coffee.name}</Text>
          <Text
            variant="bodyMedium"
            style={{color: theme.colors.onSurfaceVariant}}>
            {coffee.roaster}, {coffee.origin}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CoffeeListScreen;
