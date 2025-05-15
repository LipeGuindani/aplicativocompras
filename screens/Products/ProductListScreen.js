// (Tela de Listagem de Produtos - Comentário Escondido: Exibe os produtos cadastrados no Supabase utilizando componentes reutilizáveis)
import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native"; // (Comentário Escondido: Removido ActivityIndicator, TouchableOpacity, Button que serão substituídos ou tratados por componentes)
import { supabase } from "../../services/supabaseClient"; // (Comentário Escondido: Importa o cliente Supabase)
import { useFocusEffect } from "@react-navigation/native"; // (Comentário Escondido: Para recarregar dados ao focar na tela)

// (Comentário Escondido: Importa os componentes reutilizáveis)
import ScreenContainer from "../../components/ScreenContainer";
import ProductCard from "../../components/ProductCard";
import CustomButton from "../../components/CustomButton";
import LoadingIndicator from "../../components/LoadingIndicator";

// (Comentário Escondido: Componente principal da tela de Listagem de Produtos)
const ProductListScreen = ({ navigation }) => {
  // (Comentário Escondido: Estados para armazenar a lista de produtos, carregamento e erros)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // (Comentário Escondido: Função para buscar os produtos no Supabase)
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from("PRODUTOS") // (Comentário Escondido: Nome da tabela conforme fornecido pelo usuário)
        .select("id, name, description, price") // (Comentário Escondido: Seleciona os campos relevantes)
        .order("name", { ascending: true });

      if (fetchError) {
        throw fetchError;
      }
      setProducts(data || []);
    } catch (e) {
      setError(e.message);
      Alert.alert("Erro ao Buscar Produtos", e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // (Comentário Escondido: Hook para buscar produtos quando a tela é focada/montada)
  useFocusEffect(fetchProducts);

  // (Comentário Escondido: Função para lidar com a exclusão de um produto)
  const handleDeleteProduct = async (productId) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir este produto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            setLoading(true); // (Comentário Escondido: Idealmente, um loading específico para a ação de deletar)
            const { error: deleteError } = await supabase
              .from("PRODUTOS")
              .delete()
              .match({ id: productId });
            setLoading(false);
            if (deleteError) {
              Alert.alert("Erro ao Excluir", deleteError.message);
            } else {
              Alert.alert("Sucesso", "Produto excluído com sucesso!");
              fetchProducts(); // (Comentário Escondido: Recarrega a lista após a exclusão)
            }
          },
        },
      ]
    );
  };

  // (Comentário Escondido: Renderiza cada item da lista de produtos usando ProductCard)
  const renderProductItem = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate("ProductDetailScreen", { productId: item.id })}
      onEdit={() => navigation.navigate("ProductFormScreen", { productId: item.id })}
      onDelete={() => handleDeleteProduct(item.id)}
    />
  );

  // (Comentário Escondido: Exibe indicador de carregamento centralizado)
  if (loading && products.length === 0) {
    return <LoadingIndicator />;
  }

  // (Comentário Escondido: Exibe mensagem de erro, se houver)
  if (error) {
    return (
      <ScreenContainer style={styles.centeredContainer}>
        <Text style={styles.errorText}>Erro ao carregar produtos: {error}</Text>
        <CustomButton title="Tentar Novamente" onPress={fetchProducts} />
      </ScreenContainer>
    );
  }

  return (
    // (Comentário Escondido: Utiliza ScreenContainer para padronização da tela)
    <ScreenContainer>
      {/* (Comentário Escondido: Cabeçalho da tela com título e botão para adicionar novo produto) */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Produtos</Text>
        <CustomButton 
          title="Adicionar Produto" 
          onPress={() => navigation.navigate("ProductFormScreen")} 
          style={styles.addButton} 
          textStyle={styles.addButtonText}
          color="#28a745"
        />
      </View>
      
      {/* (Comentário Escondido: Lista de produtos ou mensagem se estiver vazia) */}
      {products.length === 0 && !loading ? (
        <View style={styles.centeredContainer}>
            <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContentContainer}
          refreshing={loading} // (Comentário Escondido: Mostra o indicador de refresh do FlatList)
          onRefresh={fetchProducts} // (Comentário Escondido: Permite puxar para atualizar)
        />
      )}
    </ScreenContainer>
  );
};

// (Comentário Escondido: Estilos para os componentes da tela)
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20, // (Comentário Escondido: Espaçamento abaixo do cabeçalho)
  },
  title: {
    fontSize: 26, // (Comentário Escondido: Tamanho de título maior)
    fontWeight: "bold",
    color: "#343a40",
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    minHeight: 0, // (Comentário Escondido: Remove altura mínima para botão menor)
  },
  addButtonText: {
    fontSize: 14,
  },
  listContentContainer: {
    paddingBottom: 20, // (Comentário Escondido: Espaço no final da lista)
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
  },
});

// (Comentário Escondido: Exporta o componente para ser usado na navegação)
export default ProductListScreen;

