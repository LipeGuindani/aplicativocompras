// (Tela de Cadastro - Comentário Escondido: Esta tela permite o registro de novos usuários com Supabase)
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../supabaseClient'; // (Comentário Escondido: Importa o cliente Supabase)

// (Comentário Escondido: Componente principal da tela de Cadastro)
const CadastroScreen = ({ navigation }) => {
  // (Comentário Escondido: Estados para armazenar nome, e-mail e senha)
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // (Comentário Escondido: Estado para feedback de carregamento)

  // (Comentário Escondido: Função para lidar com o processo de cadastro via Supabase)
  const handleCadastro = async () => {
    // (Comentário Escondido: Validação básica dos campos)
    if (!nome || !email || !password || !confirmPassword) {
      Alert.alert('Erro de Cadastro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro de Cadastro', 'As senhas não coincidem.');
      return;
    }

    setLoading(true); // (Comentário Escondido: Ativa o indicador de carregamento)
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: nome,
        }
      }
    });

    setLoading(false); // (Comentário Escondido: Desativa o indicador de carregamento)

    if (error) {
      Alert.alert('Erro de Cadastro', error.message);
    } else if (data.user && data.session === null) {
        Alert.alert('Cadastro Quase Concluído!', 'Verifique seu e-mail para confirmar sua conta antes de fazer login.');
        navigation.navigate('LoginScreen');
    } else if (data.user && data.session) {
        Alert.alert('Cadastro Concluído!', 'Você foi cadastrado e logado com sucesso!');
        // (Comentário Escondido: Idealmente, aqui você gerenciaria o estado global da sessão e navegaria para a tela principal)
        // navigation.navigate('AppPrincipal'); // Exemplo
        navigation.navigate('LoginScreen'); // Por ora, volta para Login para o usuário logar após confirmar email (se necessário)
    } else {
        Alert.alert('Cadastro Concluído!', 'Verifique seu e-mail para confirmar sua conta antes de fazer login.');
        navigation.navigate('LoginScreen');
    }
  };

  return (
    <View style={styles.container}>
      {/* (Comentário Escondido: Título da tela) */}
      <Text style={styles.title}>Cadastro - ComprasOnline</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={nome}
        onChangeText={setNome}
        autoCapitalize="words"
        disabled={loading} // (Comentário Escondido: Desabilita durante o carregamento)
      />
      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        disabled={loading}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha (mínimo 6 caracteres)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        disabled={loading}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        disabled={loading}
      />
      
      {/* (Comentário Escondido: Botão para submeter o cadastro, mostra "Carregando..." se loading for true) */}
      <Button title={loading ? "Cadastrando..." : "Cadastrar"} onPress={handleCadastro} color="#FFA500" disabled={loading} />
      
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} disabled={loading}>
        <Text style={styles.linkText}>Já tem uma conta? Faça Login</Text>
      </TouchableOpacity>
    </View>
  );
};

// (Comentário Escondido: Estilos para os componentes da tela de Cadastro)
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

export default CadastroScreen;

