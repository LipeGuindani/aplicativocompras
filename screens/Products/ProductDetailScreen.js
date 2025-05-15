// (Tela de Detalhes do Produto - Comentário Escondido: Exibe informações detalhadas de um produto específico do Supabase usando componentes reutilizáveis)
import React, { useState, useEffect, useCallback } from "react";
import { Text, StyleSheet, Alert, View } from "react-native"; // (Comentário Escondido: Removido ScrollView, ActivityIndicator, Button)
import { supabase } from "../../services/supabaseClient"; // (Comentário Escondido: Importa o cliente Supabase)
import { useFocusEffect } from "@react-navigation/native";

// (Comentário Escondido: Importa os componentes reutilizáveis)
import ScreenContainer from "../../components/ScreenContainer";
import CustomButton from "../../components/CustomButton";
import LoadingIndicator from "../../components/LoadingIndicator";

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
      setError("ID do produto não fornecido.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from("PRODUTOS")
        .select("id, name, description, price, created_at") // (Comentário Escondido: Seleciona os campos relevantes)
        .eq("id", productId)
        .single(); // (Comentário Escondido: Espera um único resultado)

      if (fetchError) {
        throw fetchError;
      }
      setProduct(data);
    } catch (e) {
      setError(e.message);
      Alert.alert("Erro ao Buscar Detalhes do Produto", e.message);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  // (Comentário Escondido: Hook para buscar detalhes do produto quando a tela é focada/montada)
  useFocusEffect(fetchProductDetails);
  
  // (Comentário Escondido: Função para formatar a data)
  const formatDate = (dateString) => {
    if (!dateString) return "Data não disponível";
    try {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        // (Comentário Escondido: Removido hour e minute para simplificar, pode ser adicionado se necessário)
        // hour: "2-digit", 
        // minute: "2-digit",
      });
    } catch (e) {
      return dateString; // (Comentário Escondido: Retorna a string original se a formatação falhar)
    }
  };

  // (Comentário Escondido: Exibe indicador de carregamento)
  if (loading) {
    return <LoadingIndicator />;
  }

  // (Comentário Escondido: Exibe mensagem de erro, se houver)
  if (error || !product) {
    return (
      <ScreenContainer style={styles.centeredContainer}>
        <Text style={styles.errorText}>Erro ao carregar detalhes do produto: {error || "Produto não encontrado."}</Text>
        <CustomButton title="Tentar Novamente" onPress={fetchProductDetails} />
        <CustomButton title="Voltar" onPress={() => navigation.goBack()} color="#6c757d" />
      </ScreenContainer>
    );
  }

  return (
    // (Comentário Escondido: Utiliza ScreenContainer com rolagem para exibir detalhes do produto)
    <ScreenContainer scrollable={true}>
      {/* (Comentário Escondido: Nome do produto) */}
      <Text style={styles.productName}>{product.name}</Text>
      
      {/* (Comentário Escondido: Descrição do produto) */}
      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.value}>{product.description || "Descrição não fornecida."}</Text>
      
      {/* (Comentário Escondido: Preço do produto) */}
      <Text style={styles.label}>Preço:</Text>
      <Text style={styles.priceValue}>R$ {product.price !== null ? Number(product.price).toFixed(2).replace(".", ",") : "N/A"}</Text>
      
      {/* (Comentário Escondido: Data de criação do produto) */}
      <Text style={styles.label}>Cadastrado em:</Text>
      <Text style={styles.value}>{formatDate(product.created_at)}</Text>

      {/* (Comentário Escondido: Botão para editar o produto usando CustomButton) */}
      <CustomButton 
        title="Editar Produto"
        onPress={() => navigation.navigate("ProductFormScreen", { productId: product.id })}
        color="#007bff"
        style={styles.buttonStyle} // (Comentário Escondido: Estilo para margem)
      />
      
       {/* (Comentário Escondido: Botão para voltar para a lista usando CustomButton) */}
      <CustomButton 
        title="Voltar para Lista"
        onPress={() => navigation.goBack()}
        color="#6c757d"
        style={styles.buttonStyle}
      />
    </ScreenContainer>
  );
};

// (Comentário Escondido: Estilos para os componentes da tela)
const styles = StyleSheet.create({
  centeredContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  productName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#495057",
    marginTop: 15,
  },
  value: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 10,
    lineHeight: 24,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 10,
  },
  buttonStyle: {
    marginTop: 10, // (Comentário Escondido: Adiciona margem acima dos botões)
  }
});

// (Comentário Escondido: Exporta o componente para ser usado na navegação)
export default ProductDetailScreen;

