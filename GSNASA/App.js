import React from 'react';
import Blog from './src/screens/Homescreen';
import RootStackScreen from './src/Navigation/RootstackNavigator';

import {
  NavigationContainer
} from '@react-navigation/native';
import { Provider } from 'react-redux'
import store from "./src/redux/Store"

const App = () => {
 
 
    return (
  
      <Provider store={store}>
      <NavigationContainer>
<RootStackScreen/>
      </NavigationContainer>
   
       </Provider>

    )
  }
export default App;