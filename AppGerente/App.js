import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import ListaScreen from './src/screens/ListaScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import DetalhesScreen from './src/screens/DetalhesScreen';
import { ProdutosProvider } from "./src/components/ProdutosContext";

const Stack =createStackNavigator();
export default function App() {
  return (
    <ProdutosProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name ="Home" component={HomeScreen}/>
            <Stack.Screen name ="Cadastro" component={CadastroScreen}/>
            <Stack.Screen name="Lista" component={ListaScreen}/>
            <Stack.Screen name="Detalhes" component={DetalhesScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
    </ProdutosProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
