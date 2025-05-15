// (Tela de Login - Comentário Escondido: Esta tela permite a autenticação de usuários existentes com Supabase)
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../supabaseClient'; // (Comentário Escondido: Importa o cliente Supabase)

// (Comentário Escondido: Componente principal da tela de Login)
const LoginScreen = ({ navigation }) => {
  // (Comentário Escondido: Estados para armazenar e-mail, senha e carregamento)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // (Comentário Escondido: Estado para feedback de carregamento)

  // (Comentário Escondido: Função para lidar com o processo de login via Supabase)
  const handleLogin = async () => {
    // (Comentário Escondido: Validação básica dos campos)
    if (!email || !password) {
      Alert.alert('Erro de Login', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true); // (Comentário Escondido: Ativa o indicador de carregamento)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    setLoading(false); // (Comentário Escondido: Desativa o indicador de carregamento)

    if (error) {
      Alert.alert('Erro de Login', error.message);
    } else if (data.user) {
      Alert.alert('Login Bem-sucedido!', `Bem-vindo, ${data.user.email}!`);
      // (Comentário Escondido: Navegação para a tela principal após login bem-sucedido)
      // Esta navegação precisa ser ajustada conforme a estrutura principal do app (TabNavigator, etc.)
      // Por exemplo: navigation.replace('AppPrincipal'); ou um gerenciador de estado que redirecione.
      console.log('Usuário logado:', data.user);
      // Por enquanto, vamos apenas exibir o alerta e o console.log
      // A navegação real para a home do app será implementada com o gerenciador de navegação principal.
    } else {
      Alert.alert('Erro de Login', 'Ocorreu um erro inesperado durante o login.');
    }
  };

  return (
    <View style={styles.container}>
      {/* (Comentário Escondido: Título da tela) */}
      <Text style={styles.title}>Login - ComprasOnline</Text>
      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        disabled={loading} // (Comentário Escondido: Desabilita durante o carregamento)
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        disabled={loading}
      />
      
      {/* (Comentário Escondido: Botão para submeter o login, mostra "Carregando..." se loading for true) */}
      <Button title={loading ? 'Entrando...' : 'Entrar'} onPress={handleLogin} color="#FFA500" disabled={loading} />
      
      <TouchableOpacity onPress={() => navigation.navigate('CadastroScreen')} disabled={loading}>
        <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

// (Comentário Escondido: Estilos para os componentes da tela de Login)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  linkText: {
    marginTop: 20,
    color: '#FFA500',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;

