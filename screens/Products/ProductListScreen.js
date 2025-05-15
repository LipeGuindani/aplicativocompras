// (Tela de Listagem de Produtos - Comentário Escondido: Exibe os produtos cadastrados no Supabase)
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../supabaseClient'; // (Comentário Escondido: Importa o cliente Supabase)
import { useFocusEffect } from '@react-navigation/native'; // (Comentário Escondido: Para recarregar dados ao focar na tela)

// (Comentário Escondido: Componente principal da tela de Listagem de Produtos)
const ProductListScreen = ({ navigation }) => {
  // (Comentário Escondido: Estados para armazenar a lista de produtos, carregamento e erros)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // (Comentário Escondido: Função para buscar os produtos no Supabase)
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('PRODUTOS') // (Comentário Escondido: Nome da tabela conforme fornecido pelo usuário)
        .select('id, name, description, price') // (Comentário Escondido: Seleciona os campos relevantes)
        .order('name', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }
      setProducts(data || []);
    } catch (e) {
      setError(e.message);
      Alert.alert('Erro ao Buscar Produtos', e.message);
    } finally {
      setLoading(false);
    }
  };

  // (Comentário Escondido: Hook para buscar produtos quando a tela é focada/montada)
  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  // (Comentário Escondido: Função para lidar com a exclusão de um produto)
  const handleDeleteProduct = async (productId) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            const { error: deleteError } = await supabase
              .from('PRODUTOS')
              .delete()
              .match({ id: productId });
            setLoading(false);
            if (deleteError) {
              Alert.alert('Erro ao Excluir', deleteError.message);
            } else {
              Alert.alert('Sucesso', 'Produto excluído com sucesso!');
              fetchProducts(); // (Comentário Escondido: Recarrega a lista após a exclusão)
            }
          },
        },
      ]
    );
  };

  // (Comentário Escondido: Renderiza cada item da lista de produtos)
  const renderProductItem = ({ item }) => (
    <View style={styles.productItemContainer}>
      <TouchableOpacity 
        style={styles.productDetails}
        onPress={() => navigation.navigate('ProductDetailScreen', { productId: item.id })} // (Comentário Escondido: Navega para detalhes do produto)
      >
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>{item.description}</Text>
        {/* (Comentário Escondido: Exibe o preço. Lembrar que está como varchar) */}
        <Text style={styles.productPrice}>Preço: {item.price}</Text>
      </TouchableOpacity>
      <View style={styles.productActions}>
        <Button 
          title="Editar" 
          onPress={() => navigation.navigate('ProductFormScreen', { productId: item.id })} // (Comentário Escondido: Navega para edição)
          color="#007bff"
        />
        <View style={{marginVertical: 5}} />
        <Button 
          title="Excluir" 
          onPress={() => handleDeleteProduct(item.id)} 
          color="#dc3545"
        />
      </View>
    </View>
  );

  // (Comentário Escondido: Exibe indicador de carregamento)
  if (loading && !products.length) {
    return <ActivityIndicator size="large" color="#FFA500" style={styles.loader} />;
  }

  // (Comentário Escondido: Exibe mensagem de erro, se houver)
  if (error) {
    return <View style={styles.centered}><Text style={styles.errorText}>Erro ao carregar produtos: {error}</Text><Button title="Tentar Novamente" onPress={fetchProducts} /></View>;
  }

  return (
    <View style={styles.container}>
      {/* (Comentário Escondido: Título da tela e botão para adicionar novo produto) */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Produtos - ComprasOnline</Text>
        <Button 
          title="Adicionar Produto" 
          onPress={() => navigation.navigate('ProductFormScreen')} // (Comentário Escondido: Navega para o formulário de novo produto)
          color="#28a745"
        />
      </View>
      
      {/* (Comentário Escondido: Lista de produtos ou mensagem se estiver vazia) */}
      {products.length === 0 && !loading ? (
        <View style={styles.centered}><Text style={styles.emptyText}>Nenhum produto cadastrado.</Text></View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContentContainer}
          refreshing={loading}
          onRefresh={fetchProducts} // (Comentário Escondido: Permite puxar para atualizar)
        />
      )}
    </View>
  );
};

// (Comentário Escondido: Estilos para os componentes da tela)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#343a40',
  },
  listContentContainer: {
    padding: 10,
  },
  productItemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2, // (Comentário Escondido: Sombra para Android)
    shadowColor: '#000', // (Comentário Escondido: Sombra para iOS)
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  productDetails: {
    flex: 1, // (Comentário Escondido: Permite que o texto ocupe o espaço disponível)
    marginRight: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
  },
  productDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#28a745',
    marginTop: 6,
    fontWeight: 'bold',
  },
  productActions: {
    flexDirection: 'column',
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
  emptyText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
});

// (Comentário Escondido: Exporta o componente para ser usado na navegação)
export default ProductListScreen;

