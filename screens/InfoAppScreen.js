// (Tela de Informações do Aplicativo - Comentário Escondido: Exibe informações sobre o app e desenvolvedores)
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';

// (Comentário Escondido: Componente principal da tela de Informações do App)
const InfoAppScreen = ({ navigation }) => {
  // (Comentário Escondido: Dados fictícios para demonstração)
  const appVersion = '1.0.0';
  const developers = ['Manus (IA)', 'Seu Nome/Grupo Aqui']; // (Comentário Escondido: Ajustar com os nomes reais)
  const contactEmail = 'suporte@comprasonline.app';
  const projectDescription = 'Este é um aplicativo de compras online desenvolvido como parte da atividade avaliativa G2 da disciplina Tópicos Especiais em Computação. Ele permite o cadastro e login de usuários, e o gerenciamento de um catálogo de produtos (CRUD completo).';

  // (Comentário Escondido: Função para abrir link de e-mail)
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${contactEmail}?subject=Contato App ComprasOnline`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* (Comentário Escondido: Título da tela) */}
      <Text style={styles.title}>Sobre o ComprasOnline</Text>

      {/* (Comentário Escondido: Seção de Versão do App) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Versão do Aplicativo</Text>
        <Text style={styles.sectionContent}>{appVersion}</Text>
      </View>

      {/* (Comentário Escondido: Seção de Desenvolvedores) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Desenvolvedores</Text>
        {developers.map((dev, index) => (
          <Text key={index} style={styles.sectionContent}>- {dev}</Text>
        ))}
      </View>

      {/* (Comentário Escondido: Seção de Contato) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contato</Text>
        <TouchableOpacity onPress={handleEmailPress}>
          <Text style={[styles.sectionContent, styles.link]}>{contactEmail}</Text>
        </TouchableOpacity>
      </View>

      {/* (Comentário Escondido: Seção de Descrição do Projeto) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descrição do Projeto</Text>
        <Text style={styles.sectionContent}>{projectDescription}</Text>
      </View>

    </ScrollView>
  );
};

// (Comentário Escondido: Estilos para os componentes da tela)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#343a40',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

// (Comentário Escondido: Exporta o componente para ser usado na navegação)
export default InfoAppScreen;

