import * as React from "react";
import { View, Text, Pressable, TouchableOpacity, StatusBar, LogBox } from "react-native";
import StackNavigator from "./src/StackNavigator";
import { Color } from "./src/Global";

const App = () => {
  LogBox.ignoreAllLogs();

  return (
    <>
    <StatusBar
    barStyle={'light-content'}
   backgroundColor={Color.background2}
/>
    
      <StackNavigator />
    </>
  );
};
export default App;
