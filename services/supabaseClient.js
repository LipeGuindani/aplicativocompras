// (Arquivo de configuração do Supabase - Comentário Escondido: Inicializa o cliente Supabase para uso no aplicativo)
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// (Comentário Escondido: URL e Chave Anônima do projeto Supabase fornecidas pelo usuário)
const supabaseUrl = "https://yuvhwyrpzpglqncmuzzz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1dmh3eXJwenBnbHFuY211enp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNTAxMTYsImV4cCI6MjA2MjkyNjExNn0.Pm2A-fr_A5bO0T-Cav801UFn9IZL1JA30INXAJvr-E4";

// (Comentário Escondido: Cria e exporta o cliente Supabase, configurando o AsyncStorage para persistência da sessão)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

