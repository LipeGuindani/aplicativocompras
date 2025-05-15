// (Tela de Formulário de Produto - Comentário Escondido: Permite adicionar ou editar produtos no Supabase usando componentes reutilizáveis)
import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Alert } from "react-native"; // (Comentário Escondido: Removido View, TextInput, Button, ScrollView, ActivityIndicator)
import { supabase } from "../../services/supabaseClient"; // (Comentário Escondido: Importa o cliente Supabase)

// (Comentário Escondido: Importa os componentes reutilizáveis)
import ScreenContainer from "../../components/ScreenContainer";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import LoadingIndicator from "../../components/LoadingIndicator";

// (Comentário Escondido: Componente principal do formulário de produto)
const ProductFormScreen = ({ route, navigation }) => {
  // (Comentário Escondido: Obtém o productId dos parâmetros da rota, se estiver editando)
  const { productId } = route.params || {}; 
  const isEditing = !!productId;

  // (Comentário Escondido: Estados para os campos do formulário e carregamento)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(""); // (Comentário Escondido: Preço será tratado como string no input, convertido para número ao salvar)
  const [loading, setLoading] = useState(false);
  const [fetchingDetails, setFetchingDetails] = useState(isEditing); // (Comentário Escondido: Carregando detalhes se estiver editando)

  // (Comentário Escondido: Hook para buscar detalhes do produto se estiver no modo de edição)
  useEffect(() => {
    if (isEditing) {
      const fetchProductDetails = async () => {
        setFetchingDetails(true);
        const { data, error } = await supabase
          .from("PRODUTOS")
          .select("name, description, price")
          .eq("id", productId)
          .single();
        setFetchingDetails(false);
        if (error) {
          Alert.alert("Erro ao Buscar Detalhes", error.message);
          navigation.goBack();
        } else if (data) {
          setName(data.name || "");
          setDescription(data.description || "");
          setPrice(data.price !== null ? String(data.price) : ""); // (Comentário Escondido: Converte preço numérico para string para o input)
        }
      };
      fetchProductDetails();
    }
  }, [productId, isEditing, navigation]);

  // (Comentário Escondido: Função para lidar com o salvamento (criação ou atualização) do produto)
  const handleSaveProduct = async () => {
    // (Comentário Escondido: Validação básica dos campos)
    if (!name || !description || !price) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    const numericPrice = parseFloat(price.replace(",", ".")); // (Comentário Escondido: Converte preço para número, aceitando vírgula ou ponto)
    if (isNaN(numericPrice) || numericPrice < 0) {
        Alert.alert("Erro", "Por favor, insira um preço válido.");
        return;
    }

    setLoading(true);
    let response;
    const productData = {
      name,
      description,
      price: numericPrice, // (Comentário Escondido: Salva o preço como número)
    };

    if (isEditing) {
      // (Comentário Escondido: Lógica de atualização do produto)
      response = await supabase
        .from("PRODUTOS")
        .update(productData)
        .match({ id: productId });
    } else {
      // (Comentário Escondido: Lógica de criação de novo produto)
      response = await supabase
        .from("PRODUTOS")
        .insert([productData]);
    }
    setLoading(false);

    const { error } = response;
    if (error) {
      Alert.alert(isEditing ? "Erro ao Atualizar" : "Erro ao Salvar", error.message);
    } else {
      Alert.alert("Sucesso", `Produto ${isEditing ? "atualizado" : "salvo"} com sucesso!`);
      navigation.goBack(); // (Comentário Escondido: Volta para a tela anterior após salvar)
    }
  };

  // (Comentário Escondido: Exibe indicador de carregamento ao buscar detalhes)
  if (fetchingDetails) {
    return <LoadingIndicator />;
  }

  return (
    // (Comentário Escondido: Utiliza ScreenContainer com rolagem para o formulário)
    <ScreenContainer scrollable={true} contentContainerStyle={styles.contentContainer}>
      {/* (Comentário Escondido: Título da tela, dinâmico para edição ou adição) */}
      <Text style={styles.title}>{isEditing ? "Editar Produto" : "Adicionar Novo Produto"}</Text>
      
      {/* (Comentário Escondido: Utiliza CustomTextInput para o nome do produto) */}
      <CustomTextInput
        label="Nome do Produto:"
        placeholder="Ex: Camiseta Branca"
        value={name}
        onChangeText={setName}
        disabled={loading}
      />
      
      {/* (Comentário Escondido: Utiliza CustomTextInput para a descrição do produto) */}
      <CustomTextInput
        label="Descrição:"
        placeholder="Ex: Camiseta de algodão, confortável e estilosa..."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        disabled={loading}
      />
      
      {/* (Comentário Escondido: Utiliza CustomTextInput para o preço do produto) */}
      <CustomTextInput
        label="Preço (R$):"
        placeholder="Ex: 49.90"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        disabled={loading}
      />
      
      {/* (Comentário Escondido: Utiliza CustomButton para salvar o produto) */}
      <CustomButton 
        title={isEditing ? "Atualizar Produto" : "Adicionar Produto"}
        onPress={handleSaveProduct} 
        loading={loading} 
        disabled={loading} 
      />
    </ScreenContainer>
  );
};

// (Comentário Escondido: Estilos para os componentes da tela)
const styles = StyleSheet.create({
  contentContainer: {
    // (Comentário Escondido: ScreenContainer já aplica padding, então podemos remover daqui se não for específico)
    // padding: 20, 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#343a40",
    textAlign: "center",
  },
  // (Comentário Escondido: Os estilos de label e input agora são gerenciados pelos componentes CustomTextInput)
});

// (Comentário Escondido: Exporta o componente para ser usado na navegação)
export default ProductFormScreen;

