import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';


export default function Homescreen() {
  console.log('hello from homescreen')
  return (
    <SafeAreaView>
      <View>
        <Text>Can you see this?</Text>
      </View>
    </SafeAreaView>
  );
}