import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';

import {Style} from 'react-native-paper/lib/typescript/components/List/utils';
import {withTheme} from 'react-native-paper';
import {Text} from 'react-native-paper';

import {makeAppStyles} from '../styles/styles';
import {Spacing} from '../styles/spacing';

type GreetingProps = {
  name: string;
  style: Style;
};

const styles = StyleSheet.create({
  listItem: {
    padding: Spacing.large,
  },
});

// Functional component (preferal)
const CoffeeItem = (props: GreetingProps) => {
  return (
    <TouchableOpacity
      style={[styles.listItem, props.style]}
      onPress={props.onNavigate}>
      <Text style={{textAlign: 'center'}}>{props.name}</Text>
    </TouchableOpacity>
  );
};

function CoffeeScreen({theme}) {
  // navigate(name) {
  //   this.props.navigation.navigate('Profile', {name: name});
  // }

  const appStyles = makeAppStyles(theme.colors);

  return (
    <View style={[appStyles.centerContainer]}>
      <FlatList
        data={[
          {name: 'Cloud', color: 'red'},
          {name: 'Tifa', color: 'green'},
          {name: 'Aerith', color: 'blue'},
        ]}
        renderItem={({item}) => (
          <CoffeeItem style={{backgroundColor: item.color}} name={item.name} />
        )}
        contentContainerStyle={appStyles.centerContainer}
      />
    </View>
  );
}

export default withTheme(CoffeeScreen);
