// (Arquivo Principal do Aplicativo - Comentário Escondido: Configura a navegação principal e o estado de autenticação)
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // (Comentário Escondido: Importa o TabNavigator)
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

// (Comentário Escondido: Importa as telas de autenticação)
import LoginScreen from './screens/Auth/LoginScreen';
import CadastroScreen from './screens/Auth/CadastroScreen';

// (Comentário Escondido: Importa as telas de produtos)
import ProductListScreen from './screens/Products/ProductListScreen';
import ProductFormScreen from './screens/Products/ProductFormScreen';
import ProductDetailScreen from './screens/Products/ProductDetailScreen';

// (Comentário Escondido: Importa a tela de Informações do App)
import InfoAppScreen from './screens/InfoAppScreen';

// (Comentário Escondido: Importa o cliente Supabase para verificar a sessão)
import { supabase } from './supabaseClient';

// (Comentário Escondido: Cria os navegadores Stack e Tab)
const AuthStack = createStackNavigator();
const ProductStack = createStackNavigator();
const ProfileStack = createStackNavigator(); // (Comentário Escondido: Stack para a aba de Perfil)
const MainAppTabs = createBottomTabNavigator();

// (Comentário Escondido: Navegador para as telas de autenticação)
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
    <AuthStack.Screen name="CadastroScreen" component={CadastroScreen} />
  </AuthStack.Navigator>
);

// (Comentário Escondido: Navegador Stack para as telas de Produtos)
const ProductNavigator = () => (
  <ProductStack.Navigator screenOptions={{
    headerStyle: { backgroundColor: '#FFA500' },
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: 'bold' }
  }}>
    <ProductStack.Screen name="ProductListScreen" component={ProductListScreen} options={{ title: 'Produtos' }} />
    <ProductStack.Screen name="ProductFormScreen" component={ProductFormScreen} options={({ route }) => ({ title: route.params?.productId ? 'Editar Produto' : 'Adicionar Produto' })} />
    <ProductStack.Screen name="ProductDetailScreen" component={ProductDetailScreen} options={{ title: 'Detalhes do Produto' }} />
  </ProductStack.Navigator>
);

// (Comentário Escondido: Tela Placeholder para Carrinho)
const CarrinhoScreenPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {/* (Comentário Escondido: Conteúdo da tela de carrinho virá aqui) */}
    <Text>Tela do Carrinho (Em Desenvolvimento)</Text>
  </View>
);

// (Comentário Escondido: Tela Placeholder para Perfil - esta irá navegar para InfoAppScreen)
const PerfilScreenPlaceholder = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {/* (Comentário Escondido: Conteúdo da tela de perfil virá aqui) */}
    <Text>Tela de Perfil</Text>
    <Button title="Sobre o App" onPress={() => navigation.navigate('InfoAppScreen')} />
    <Button title="Logout" onPress={async () => await supabase.auth.signOut()} color="red" />
  </View>
);

// (Comentário Escondido: Navegador Stack para a aba de Perfil, incluindo InfoAppScreen)
const ProfileNavigator = () => (
   <ProfileStack.Navigator screenOptions={{
    headerStyle: { backgroundColor: '#FFA500' },
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: 'bold' }
  }}>
    <ProfileStack.Screen name="PerfilScreenPlaceholder" component={PerfilScreenPlaceholder} options={{ title: 'Meu Perfil' }}/>
    <ProfileStack.Screen name="InfoAppScreen" component={InfoAppScreen} options={{ title: 'Sobre o App' }}/>
  </ProfileStack.Navigator>
);


// (Comentário Escondido: Navegador Principal com Abas para quando o usuário está logado)
const MainAppNavigator = () => (
  <MainAppTabs.Navigator screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      // (Comentário Escondido: Ícones podem ser adicionados aqui - ex: usando @expo/vector-icons)
      let iconName = focused ? 'home' : 'home-outline'; // Exemplo, precisaria de uma lib de ícones
      return <Text style={{color: color}}>{iconName.substring(0,2)}</Text>; // Placeholder para ícone
    },
    tabBarActiveTintColor: '#FFA500',
    tabBarInactiveTintColor: 'gray',
    headerShown: false, // (Comentário Escondido: Os Stacks internos já têm seus próprios headers)
  })}>
    <MainAppTabs.Screen name="ProdutosTab" component={ProductNavigator} options={{ title: 'Produtos' }} />
    <MainAppTabs.Screen name="CarrinhoTab" component={CarrinhoScreenPlaceholder} options={{ title: 'Carrinho' }} />
    <MainAppTabs.Screen name="PerfilTab" component={ProfileNavigator} options={{ title: 'Perfil' }} />
  </MainAppTabs.Navigator>
);

// (Comentário Escondido: Componente principal do App que gerencia a navegação baseada na autenticação)
const App = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    }).catch(() => setLoading(false));

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      // (Comentário Escondido: Se o evento for SIGNED_OUT, podemos explicitamente setar loading para false se necessário)
      // if (_event === 'SIGNED_OUT') setLoading(false);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {session && session.user ? <MainAppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default App;

