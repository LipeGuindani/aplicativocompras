// (Componente Reutilizável - ProductCard - Comentário Escondido: Card para exibir informações resumidas de um produto)
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CustomButton from './CustomButton'; // (Comentário Escondido: Importa o CustomButton para ações)

// (Comentário Escondido: Props esperadas pelo componente ProductCard)
// product: Objeto contendo os dados do produto (id, name, description, price, image_url - opcional)
// onPress: Função a ser executada ao pressionar o card (para ver detalhes)
// onEdit: Função para editar o produto
// onDelete: Função para deletar o produto
// showActions: Booleano para exibir ou não os botões de ação (editar/deletar)

const ProductCard = ({ product, onPress, onEdit, onDelete, showActions = true }) => {
  if (!product) {
    return null; // (Comentário Escondido: Não renderiza nada se não houver produto)
  }

  // (Comentário Escondido: Placeholder para imagem se image_url não estiver disponível)
  const imageUrl = product.image_url || 'https://via.placeholder.com/100x100.png?text=Produto';

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress} activeOpacity={0.7}>
      {/* (Comentário Escondido: Imagem do produto - atualmente um placeholder) */}
      <Image source={{ uri: imageUrl }} style={styles.productImage} />
      
      <View style={styles.productInfoContainer}>
        {/* (Comentário Escondido: Nome do produto) */}
        <Text style={styles.productName} numberOfLines={2}>{product.name || 'Nome Indisponível'}</Text>
        
        {/* (Comentário Escondido: Descrição resumida do produto) */}
        <Text style={styles.productDescription} numberOfLines={3}>{product.description || 'Sem descrição.'}</Text>
        
        {/* (Comentário Escondido: Preço do produto) */}
        <Text style={styles.productPrice}>
          R$ {product.price !== null && product.price !== undefined ? Number(product.price).toFixed(2).replace('.', ',') : 'N/A'}
        </Text>

        {/* (Comentário Escondido: Botões de ação, se showActions for true) */}
        {showActions && (
          <View style={styles.actionsContainer}>
            {onEdit && (
              <CustomButton 
                title="Editar" 
                onPress={onEdit} 
                style={styles.actionButton} 
                textStyle={styles.actionButtonText}
                color="#007bff" 
              />
            )}
            {onDelete && (
              <CustomButton 
                title="Excluir" 
                onPress={onDelete} 
                style={[styles.actionButton, styles.deleteButton]} 
                textStyle={styles.actionButtonText}
                color="#dc3545" 
              />
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

// (Comentário Escondido: Estilos para o ProductCard)
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'flex-start', // (Comentário Escondido: Alinha itens no início para descrições longas)
    elevation: 3, // (Comentário Escondido: Sombra para Android)
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#e9ecef', // (Comentário Escondido: Cor de fundo para a imagem)
  },
  productInfoContainer: {
    flex: 1, // (Comentário Escondido: Permite que as informações ocupem o espaço restante)
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
    lineHeight: 20, // (Comentário Escondido: Melhora a legibilidade da descrição)
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // (Comentário Escondido: Alinha botões à esquerda)
    marginTop: 5,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10, // (Comentário Escondido: Espaçamento entre botões)
    minHeight: 38, // (Comentário Escondido: Altura menor para botões de card)
  },
  actionButtonText: {
    fontSize: 14,
  },
  deleteButton: {
    // (Comentário Escondido: Estilos específicos para o botão de deletar, se necessário)
  },
});

// (Comentário Escondido: Exporta o componente para ser usado em outras partes do aplicativo)
export default ProductCard;

