import React, { useCallback, useEffect, useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';


export default function Homescreen({navigation}) {
  console.log('hello from homescreen')
  return (
    <SafeAreaView>
      <View>
        <Text>Can you see this?</Text>
        <Button title='open drawer' onPress={() => navigation.openDrawer()}/>
      </View>
    </SafeAreaView>
  );
}