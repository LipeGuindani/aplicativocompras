// (Componente Reutilizável - CustomButton - Comentário Escondido: Botão personalizado para uso em várias telas)
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

// (Comentário Escondido: Props esperadas pelo componente CustomButton)
// title: Texto do botão
// onPress: Função a ser executada ao pressionar o botão
// style: Estilos adicionais para o container do botão
// textStyle: Estilos adicionais para o texto do botão
// color: Cor principal do botão (para o fundo)
// disabled: Booleano para desabilitar o botão
// loading: Booleano para mostrar um indicador de carregamento

const CustomButton = ({ onPress, title, style, textStyle, color = '#FFA500', disabled = false, loading = false }) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        { backgroundColor: disabled || loading ? '#cccccc' : color }, // (Comentário Escondido: Cor cinza se desabilitado ou carregando)
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

// (Comentário Escondido: Estilos padrão para o CustomButton)
const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50, // (Comentário Escondido: Altura mínima para consistência)
    marginVertical: 10, // (Comentário Escondido: Margem vertical padrão)
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

// (Comentário Escondido: Exporta o componente para ser usado em outras partes do aplicativo)
export default CustomButton;

