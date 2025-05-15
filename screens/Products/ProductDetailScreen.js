// (Tela de Detalhes do Produto - Comentário Escondido: Exibe informações detalhadas de um produto específico do Supabase)
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Button, Alert } from 'react-native';
import { supabase } from '../../supabaseClient'; // (Comentário Escondido: Importa o cliente Supabase)
import { useFocusEffect } from '@react-navigation/native';

// (Comentário Escondido: Componente principal da tela de Detalhes do Produto)
const ProductDetailScreen = ({ route, navigation }) => {
  // (Comentário Escondido: Obtém o productId dos parâmetros da rota)
  const { productId } = route.params;

  // (Comentário Escondido: Estados para armazenar os detalhes do produto, carregamento e erros)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // (Comentário Escondido: Função para buscar os detalhes do produto no Supabase)
  const fetchProductDetails = useCallback(async () => {
    if (!productId) {
      setError('ID do produto não fornecido.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('PRODUTOS')
        .select('id, name, description, price, created_at') // (Comentário Escondido: Seleciona os campos relevantes)
        .eq('id', productId)
        .single(); // (Comentário Escondido: Espera um único resultado)

      if (fetchError) {
        throw fetchError;
      }
      setProduct(data);
    } catch (e) {
      setError(e.message);
      Alert.alert('Erro ao Buscar Detalhes do Produto', e.message);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  // (Comentário Escondido: Hook para buscar detalhes do produto quando a tela é focada/montada)
  useFocusEffect(fetchProductDetails);
  
  // (Comentário Escondido: Função para formatar a data)
  const formatDate = (dateString) => {
    if (!dateString) return 'Data não disponível';
    try {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return dateString; // Retorna a string original se a formatação falhar
    }
  };

  // (Comentário Escondido: Exibe indicador de carregamento)
  if (loading) {
    return <ActivityIndicator size="large" color="#FFA500" style={styles.loader} />;
  }

  // (Comentário Escondido: Exibe mensagem de erro, se houver)
  if (error || !product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Erro ao carregar detalhes do produto: {error || 'Produto não encontrado.'}</Text>
        <Button title="Tentar Novamente" onPress={fetchProductDetails} />
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* (Comentário Escondido: Nome do produto) */}
      <Text style={styles.productName}>{product.name}</Text>
      
      {/* (Comentário Escondido: Descrição do produto) */}
      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.value}>{product.description}</Text>
      
      {/* (Comentário Escondido: Preço do produto) */}
      <Text style={styles.label}>Preço:</Text>
      <Text style={styles.priceValue}>R$ {product.price !== null ? Number(product.price).toFixed(2).replace('.', ',') : 'N/A'}</Text>
      
      {/* (Comentário Escondido: Data de criação do produto) */}
      <Text style={styles.label}>Cadastrado em:</Text>
      <Text style={styles.value}>{formatDate(product.created_at)}</Text>

      {/* (Comentário Escondido: Botão para editar o produto) */}
      <View style={styles.buttonContainer}>
        <Button 
          title="Editar Produto"
          onPress={() => navigation.navigate('ProductFormScreen', { productId: product.id })}
          color="#007bff"
        />
      </View>
       {/* (Comentário Escondido: Botão para voltar para a lista) */}
      <View style={styles.buttonContainer}>
        <Button 
          title="Voltar para Lista"
          onPress={() => navigation.goBack()}
          color="#6c757d"
        />
      </View>
    </ScrollView>
  );
};

// (Comentário Escondido: Estilos para os componentes da tela)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa	',
  },
  contentContainer: {
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
    marginTop: 15,
  },
  value: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 10,
    lineHeight: 24,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  }
});

// (Comentário Escondido: Exporta o componente para ser usado na navegação)
export default ProductDetailScreen;

