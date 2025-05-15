// (Componente Reutilizável - ScreenContainer - Comentário Escondido: Container padrão para telas)
import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

// (Comentário Escondido: Props esperadas pelo componente ScreenContainer)
// children: Conteúdo a ser renderizado dentro do container
// style: Estilos adicionais para o container principal
// scrollable: Booleano para habilitar a rolagem (usa ScrollView)
// safeArea: Booleano para usar SafeAreaView (evita notch e áreas de sistema)
// contentContainerStyle: Estilos para o container de conteúdo interno (especialmente útil com scrollable)

const ScreenContainer = ({ children, style, scrollable = false, safeArea = true, contentContainerStyle }) => {
  const ContainerComponent = safeArea ? SafeAreaView : View;
  const InnerComponent = scrollable ? ScrollView : View;

  return (
    <ContainerComponent style={[styles.safeArea, style]}>
      <InnerComponent 
        style={[styles.innerContainer, scrollable && styles.scrollFlex]} 
        contentContainerStyle={scrollable ? [styles.scrollContent, contentContainerStyle] : contentContainerStyle}
        keyboardShouldPersistTaps="handled" // (Comentário Escondido: Ajuda com interações de teclado em ScrollViews)
      >
        {children}
      </InnerComponent>
    </ContainerComponent>
  );
};

// (Comentário Escondido: Estilos padrão para o ScreenContainer)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5', // (Comentário Escondido: Cor de fundo padrão para consistência)
  },
  innerContainer: {
    flex: 1,
    padding: 20, // (Comentário Escondido: Padding padrão para o conteúdo da tela)
  },
  scrollFlex: {
    flexGrow: 1, // (Comentário Escondido: Garante que o ScrollView possa crescer)
  },
  scrollContent: {
    flexGrow: 1, // (Comentário Escondido: Permite que o conteúdo dentro do ScrollView se expanda)
    justifyContent: 'flex-start', // (Comentário Escondido: Alinha o conteúdo no início por padrão)
  },
});

// (Comentário Escondido: Exporta o componente para ser usado em outras partes do aplicativo)
export default ScreenContainer;

