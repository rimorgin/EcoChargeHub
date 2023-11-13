import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function MapScreen({navigation}) {
  return (
    <View>
      <Text>MapScreen</Text>
      <Text>MapScreen</Text>
      <Text>MapScreen</Text>
      <Button title='open drawer' onPress={() => navigation.openDrawer()}/>
    </View>
  )
}

const styles = StyleSheet.create({})