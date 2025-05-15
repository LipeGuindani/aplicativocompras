# Aplicativo ComprasOnline (Refatorado)

## Descrição do Projeto

O "ComprasOnline" é um aplicativo móvel desenvolvido utilizando React Native com Expo. Ele simula uma plataforma de compras online, permitindo o cadastro e login de usuários, e o gerenciamento completo (CRUD) de um catálogo de produtos. Este projeto foi desenvolvido como parte da atividade avaliativa G2 da disciplina Tópicos Especiais em Computação e **passou por uma fase de refatoração para atender a requisitos técnicos adicionais**, focando em componentização, organização de pastas e padronização visual.

## Funcionalidades Implementadas

O aplicativo inclui as seguintes funcionalidades, conforme os requisitos obrigatórios e técnicos:

1.  **Splash Screen Personalizada:** Tela inicial exibida ao abrir o app, com o logo "ComprasOnline".
2.  **Ícone do Aplicativo Personalizado:** Ícone exclusivo para o app.
3.  **Cadastro de Usuário:**
    *   Tela para registro de novos usuários com nome, e-mail e senha.
    *   Dados armazenados no Supabase, com confirmação de e-mail (configuração padrão do Supabase Auth).
4.  **Login de Usuário:**
    *   Tela para autenticação de usuários cadastrados.
    *   Validação de e-mail e senha com o Supabase.
    *   Redirecionamento para a área principal do aplicativo após login.
5.  **Conexão com Banco de Dados (Supabase):**
    *   Toda a persistência de dados (usuários e produtos) é feita via Supabase.
6.  **CRUD Completo da Entidade Principal (Produtos):**
    *   **Criar:** Adicionar novos produtos ao catálogo (nome, descrição, preço).
    *   **Listar:** Visualizar a lista de produtos cadastrados.
    *   **Atualizar:** Editar as informações de um produto existente.
    *   **Deletar:** Remover um produto do catálogo.
7.  **Mínimo de 6 Telas:** O aplicativo possui as seguintes telas principais:
    *   Splash Screen (automática)
    *   Login
    *   Cadastro
    *   Lista de Produtos (Aba Produtos)
    *   Formulário de Adicionar/Editar Produto
    *   Detalhes do Produto
    *   Carrinho (Placeholder, Aba Carrinho)
    *   Perfil (Aba Perfil, leva para Informações do App e Logout)
    *   Informações sobre o App (SAC)
8.  **Tela com Informações sobre o App e os Desenvolvedores (SAC):**
    *   Acessível pela aba "Perfil", contém versão do app, desenvolvedores, contato e descrição.
9.  **Comentários Escondidos:** Todas as telas e componentes principais possuem comentários explicativos no código-fonte.

**Melhorias da Refatoração:**

*   **Uso do `react-navigation`:** Navegação em pilha (Stack Navigator) e abas (Bottom Tabs) implementada e organizada.
*   **Autenticação com Supabase:** Mantida e funcional.
*   **Componentização:** Criação de componentes reutilizáveis (ex: `CustomButton`, `CustomTextInput`, `ScreenContainer`, `ProductCard`, `LoadingIndicator`) na pasta `components/` e integração nas telas.
*   **Organização de Pastas do Projeto:** Estrutura de pastas revisada e organizada conforme as melhores práticas:
    *   `screens/`: Telas principais da aplicação.
    *   `components/`: Componentes reutilizáveis.
    *   `services/`: Conexão com APIs ou banco de dados (ex: `supabaseClient.js`).
    *   `assets/`: Imagens, ícones, fontes.
    *   `routes/`: Arquivos de navegação (ex: `AppNavigator.js`).
*   **Estilização Limpa e Organizada:** Interface revisada para melhor organização visual, alinhamentos, espaçamentos e consistência de cores.

## Tecnologias Utilizadas

*   **React Native:** Framework para desenvolvimento de aplicativos móveis multiplataforma.
*   **Expo:** Plataforma e conjunto de ferramentas para facilitar o desenvolvimento com React Native.
*   **Supabase:** Backend como serviço (BaaS) para autenticação e banco de dados PostgreSQL.
*   **JavaScript:** Linguagem de programação principal.
*   **React Navigation:** Biblioteca para gerenciamento de navegação entre telas.

## Estrutura do Projeto (Pós-Refatoração)

O código-fonte está organizado da seguinte forma:

```
/AplicativoCompras
|-- /assets                   # Imagens (ícone, splash)
|-- /components               # Componentes reutilizáveis (CustomButton.js, etc.)
|-- /routes                   # Configuração da navegação (AppNavigator.js)
|-- /screens                  # Componentes de tela
|   |-- /Auth                 # Telas de Autenticação (LoginScreen.js, CadastroScreen.js)
|   |-- /Products             # Telas de Produtos (ProductListScreen.js, etc.)
|   |-- InfoAppScreen.js      # Tela de Informações do App
|-- /services                 # Serviços (supabaseClient.js)
|-- index.js                  # Ponto de entrada do aplicativo, registra o AppNavigator
|-- app.json                  # Configurações do projeto Expo (nome, ícone, splash, etc.)
|-- package.json              # Dependências e scripts do projeto
|-- README.md                 # Este arquivo
|-- .gitignore                # Arquivos ignorados pelo Git
```

## Configuração e Execução

Para executar o projeto localmente, siga os passos abaixo:

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/LipeGuindani/aplicativocompras.git 
    cd aplicativocompras 
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    # ou
    # yarn install
    ```

3.  **Configure o Supabase:**
    *   Crie um projeto no [Supabase](https://supabase.com/).
    *   Na seção "SQL Editor" do seu projeto Supabase, crie a tabela `PRODUTOS` com a seguinte estrutura (ou similar, conforme definido no projeto):
        ```sql
        CREATE TABLE "PRODUTOS" (
          id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          name VARCHAR,
          description TEXT,
          price NUMERIC
        );
        ```
    *   Certifique-se de que as Row Level Security (RLS) policies para a tabela `PRODUTOS` permitem as operações de `SELECT` para usuários autenticados (e `INSERT`, `UPDATE`, `DELETE` conforme a lógica de permissão desejada).
    *   Atualize o arquivo `/AplicativoCompras/services/supabaseClient.js` com a URL e a Chave Anônima (anon key) do SEU projeto Supabase:
        ```javascript
        const supabaseUrl = "SUA_URL_SUPABASE"; // Substitua pela sua URL
        const supabaseAnonKey = "SUA_CHAVE_ANON_SUPABASE"; // Substitua pela sua chave
        ```

4.  **Inicie o Aplicativo com Expo:**
    ```bash
    npm start
    # ou
    # expo start
    ```
    Isso abrirá o Metro Bundler. Você pode então escanear o QR code com o aplicativo Expo Go no seu dispositivo móvel (Android ou iOS) ou executar em um emulador/simulador.

## Desenvolvedores

*   [Seu Nome / Nomes do Grupo Aqui]
*   Assistência: Manus (IA)

## Considerações Finais

*   A tela de "Carrinho" é um placeholder e não possui funcionalidades completas de e-commerce.
*   A gestão de permissões para o CRUD de produtos pode ser refinada com Row Level Security no Supabase.
*   Para a submissão no GitHub, a pasta `node_modules` não deve ser incluída (já configurado no `.gitignore`).

---
*Este README foi atualizado para o projeto ComprasOnline refatorado.*

