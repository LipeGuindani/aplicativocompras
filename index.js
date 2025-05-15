import { registerRootComponent } from 'expo';

// (Comentário Escondido: Atualizado para importar o navegador principal da nova pasta routes)
import AppNavigator from './routes/AppNavigator';

// registerRootComponent calls AppRegistry.registerComponent('main', () => AppNavigator);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(AppNavigator);

