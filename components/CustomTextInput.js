// (Componente Reutilizável - CustomTextInput - Comentário Escondido: Campo de texto personalizado para uso em formulários)
import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

// (Comentário Escondido: Props esperadas pelo componente CustomTextInput)
// value: Valor do campo de texto
// onChangeText: Função para atualizar o valor
// placeholder: Texto de placeholder
// secureTextEntry: Booleano para campos de senha
// keyboardType: Tipo de teclado (ex: 'email-address', 'numeric')
// autoCapitalize: Comportamento de capitalização (ex: 'none', 'words')
// style: Estilos adicionais para o container do TextInput
// inputStyle: Estilos adicionais para o próprio TextInput
// disabled: Booleano para desabilitar o campo
// multiline: Booleano para permitir múltiplas linhas
// numberOfLines: Número de linhas para campos multiline
// label: Texto para exibir acima do campo de input

const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  style,
  inputStyle,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  label
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* (Comentário Escondido: Renderiza o label se fornecido) */}
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput, // (Comentário Escondido: Aplica estilo multiline se necessário)
          disabled && styles.disabledInput, // (Comentário Escondido: Aplica estilo desabilitado se necessário)
          inputStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#aaa" // (Comentário Escondido: Cor padrão para placeholder)
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={!disabled}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1} // (Comentário Escondido: numberOfLines só se aplica a multiline)
        textAlignVertical={multiline ? 'top' : 'center'} // (Comentário Escondido: Alinhamento vertical para multiline)
      />
    </View>
  );
};

// (Comentário Escondido: Estilos padrão para o CustomTextInput)
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15, // (Comentário Escondido: Margem inferior padrão)
  },
  label: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  multilineInput: {
    height: 100, // (Comentário Escondido: Altura padrão para campos multiline)
    paddingTop: 15, // (Comentário Escondido: Padding superior para texto multiline)
  },
  disabledInput: {
    backgroundColor: '#e9ecef', // (Comentário Escondido: Cor de fundo para campos desabilitados)
    color: '#6c757d',
  },
});

// (Comentário Escondido: Exporta o componente para ser usado em outras partes do aplicativo)
export default CustomTextInput;

