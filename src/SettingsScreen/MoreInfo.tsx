import React from 'react';
import {Linking, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default () => (
  <View
    style={{
      flexDirection: 'row',
      marginLeft: 19,
      marginRight: 40,
      marginVertical: 30,
    }}>
    <Ionicons
      color="#fff8"
      name="information-circle-outline"
      size={24}
      style={{marginRight: 14, top: 9}}
    />
    <View>
      <Text style={{color: '#fffa', fontSize: 15, lineHeight: 27}}>
        Visit <Link url="https://www.dhamma.org">dhamma.org</Link> for more info
        about S.N. Goenka or Vipassana meditation.
      </Text>
      <Text
        style={{color: '#fffa', fontSize: 15, lineHeight: 27, marginTop: 30}}>
        For help/questions:{' '}
        <Link url="mailto:hi@goenka.app">hi@goenka.app</Link>
      </Text>
    </View>
  </View>
);

const Link = ({url, ...otherProps}: {children: any; url: string}) => (
  <Text
    style={{color: '#0070c9'}}
    {...otherProps}
    onPress={() => {
      Linking.openURL(url);
    }}
  />
);
