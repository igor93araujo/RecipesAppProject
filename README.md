# Boas vindas ao repositório do projeto de Receitas!

---

### Instalando:

1. Clone o repositório
 
2. Instale as dependências e inicialize o projeto
  * Instale as dependências:
    * `npm install`
  * Inicialize o projeto:
    * `npm start` (uma nova página deve abrir no seu navegador com um texto simples)


---

## Sobre o projeto

Projeto trata-se de um app de receitas, utilizando o que há de mais moderno dentro do ecossistema React: Hooks e Context API!

Nele será possível ver, buscar, filtrar, favoritar e acompanhar o processo de preparação de receitas e drinks!

A base de dados serão 2 APIs distintas, uma para comidas e outra para bebidas.

O layout tem como foco dispositivos móveis.

---

### Sobre o desenvolvimento

  - Projeto desenvolvido em grupo (4 programadores).

  - Duração: dez dias.
  

## Desenvolvimento e testes

## APIs

### TheMealDB API

O [TheMealDB](https://www.themealdb.com/) é um banco de dados aberto, mantido pela comunidade, com receitas e ingredientes de todo o mundo.

Os end-points são bastante ricos, você pode [vê-los aqui](https://www.themealdb.com/api.php)

Os end-points utilizados foram:

* categorias: https://www.themealdb.com/api/json/v1/1/list.php?c=list
* areas: https://www.themealdb.com/api/json/v1/1/list.php?a=list
* ingredientes: https://www.themealdb.com/api/json/v1/1/list.php?i=list


### The CockTailDB API

Bem similar (inclusive mantida pela mesma entidade) a TheMealDB API, só que focado em bebidas.

Os end-points também são bastante ricos, você pode [vê-los aqui](https://www.thecocktaildb.com/api.php)


## Implementações técnicas

* O projeto utiliza a resolução de tela de `360 x 640` (360 pixels de largura por 640 pixels de altura).

    - ⚠️ Logo, recomenda-se analizar o projeto usando a mesma resolução, via instalação [deste plugin](https://chrome.google.com/webstore/detail/window-resizer/kkelicaakdanhinjdeammmilcgefonfh?hl=en) do `Chrome` para facilitar a configuração da resolução. ⚠️

### Rotas

As rotas utilizadas na aplicação foram:

* Tela de login: `/`;
* Tela principal de receitas de comidas: `/comidas`;
* Tela principal de receitas de bebidas: `/bebidas`;
* Tela de detalhes de uma receita de comida: `/comidas/{id-da-receita}`;
* Tela de detalhes de uma receita de bebida: `/bebidas/{id-da-receita}`;
* Tela de receita em processo de comida: `/comidas/{id-da-receita}/in-progress`;
* Tela de receita em processo de bebida: `/bebidas/{id-da-receita}/in-progress`;
* Tela de explorar: `/explorar`;
* Tela de explorar comidas: `/explorar/comidas`;
* Tela de explorar bebidas: `/explorar/bebidas`;
* Tela de explorar comidas por ingrediente: `/explorar/comidas/ingredientes`;
* Tela de explorar bebidas por ingrediente: `/explorar/bebidas/ingredientes`;
* Tela de explorar comidas por local de origem: `/explorar/comidas/area`;
* Tela de perfil: `/perfil`;
* Tela de receitas feitas: `/receitas-feitas`;
* Tela de receitas favoritas: `/receitas-favoritas`.

### `localStorage`

O uso de `localStorage` foi necessário para que as informações fossem mantidas caso a pessoa atualize a página.

# Funcionalidades do projeto

Nesse projeto, a pessoa que estiver utilizando o app pode procurar uma receita especifica, explorar receitas baseado em diferentes critérios, favoritar e fazer as receitas entre outras funcionalidades.

As telas sofrem variações dependendo do tipo da receita (se é comida ou bebida, no caso).

## Tela de login

* A pessoa deve conseguir escrever seu email no input de email.

* A pessoa deve conseguir escrever sua senha no input de senha.

* O formulário só fica válido após um email válido e uma senha de mais de 6 caracteres serem preenchidos.

As seguintes verificações são feitas:
- O botão deve estar desativado se o email for inválido;
- O botão deve estar desativado se a senha deve tiver 6 caracteres ou menos;
- O botão deve estar ativado se o email e a senha forem válidos.

Após a submissão e validação com sucesso do login, o usuário deve ser redirecionado para a tela principal de receitas de comidas.

## Header

Apresenta um ícone para a tela de perfil, um título e um ícone para a busca 

Comportamentos do Header

- Ao clicar no botão de perfil, deve-se ir para a tela de perfil.
- Ao clicar no botão de busca, a barra de busca deve aparecer. O mesmo serve para escondê-la.
- Ao clicar no botão de busca pela primeira vez a barra de busca aparece;
- Ao clicar no botão de busca pela segunda vez a barra de busca desaparece.

## Barra de busca - Header

- A barra de busca fica logo abaixo do header e possui 3 opções: `Ingrediente`, `Nome` e `Primeira letra`. Eles, em conjunto com a `search-input`, devem mudar a forma como serão filtradas as receitas após clicar no botão `Buscar`.

##### Sugestão de teste: Selecione `Ingrediente` e busque por `chicken`.

Obs: Se o radio selecionado for `Primeira letra` só será aceita uma letra, caso contrário um `alert` com a mensgem "Sua busca deve conter somente 1 (um) caracter" será exibido.

Caso apenas uma receita seja encontrada, a rota deve mudar para a tela de detalhes da receita com o ID da mesma na URL.

Caso mais de uma receita seja encontrada, serão mostradas até no máximo de 12.

Caso nenhuma receita seja encontrada, um `alert` contendo o texto "Sinto muito, não encontramos nenhuma receita para esses filtros." é exibido.

## Menu inferior

Apresenta 3 ícones: um para comidas, um para bebidas e outro para exploração.


Ao clicar no ícone de comidas, você será redirecionado para uma lista de comidas;

Ao clicar no ícone de bebidas, você será redirecionado para uma lista de cocktails;

Ao clicar no ícone de exploração, tela de explorar será exibida.

## Tela principal de receitas

A tela  possui botões de categoria para serem utilizados como filtro. 

Ao clicar no filtro de categoria, todas as receitas são filtradas para o valor desejado.

Caso o filtro selecionado no momento seja selecionado de novo,a aplicação retornará as receitas sem nenhum filtro.

Ao clicar no card, a aplicação mudará para a tela de detalhes da receita.

## Tela de detalhes de uma receita

A tela contém recomendações de comidas quando os detalhes forem de bebidas e vice-versa.

Existe um botão "Iniciar Receita", fixo no final da página.

Caso a receita já tenha sido feita, o botão "Iniciar Receita" não aparecerá.

Caso a receita tenha sido iniciada mas não finalizada, o botão "Continuar Receita" aparecerá.
a botão de "Continuar Receita" na tela de detalhes de uma bebida

Quando o botão "Iniciar Receita" for clicado, a tela de receita em processo será apresentada.

Um botão de compartilhar e um de favoritar a receita estão disponíveis.

---

## Tela de receita em processo

Ao clicar no checkbox de um ingrediente, o nome dele é "riscado" da lista;

O estado do progresso é mantido caso a pessoa atualize a página ou volte para a mesma receita. A mesma lógica de favoritar e compartilhar da tela de detalhes de uma receita se aplica aqui;

O botão de finalizar receita só é habilitado quando todos os ingredientes estiverem _"checkados"_ (marcados);

Após clicar no botão "Finalizar receita", a página de receitas feitas é apresentada.

## Tela de receitas feitas

Existem 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros.

Ao clicar na foto ou no nome da receita, a tela de detalhes daquela receita será mostrada.

## Tela de receitas favoritas

Existem 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros. 

Ao clicar na foto ou no nome da receita, a tela de detalhes daquela receita será mostrada.

## Tela de explorar

A tela tem dois botões: um para explorar comidas e o outro para explorar bebidas.

Ao clicar no botão "Explorar Comidas" a página de explorar comidas é mostrada;

Ao clicar no botão "Explorar Bebidas" a página de explorar bebidas é mostrada.

## Tela de explorar bebidas ou comidas

A tela tem três botões: um para explorar por ingrediente, um para explorar por local de origem e um para pegar uma receita aleatória.

## Tela de explorar ingredientes

A tela apresenta os cards para os 12 primeiros ingredientes.

Ao clicar no card do ingrediente, a tela principal de receitas é apresentada, mas mostrando apenas as receitas que contém o ingrediente escolhido.

## Tela de explorar por local de origem/area

A tela segue as mesmas especificações da tela de receitas principal, a única diferença é que os filtros de categoria são substituídos por um dropdown.

## Tela de perfil

O e-mail da pessoa usuária estará visível.

Nessa tela há 3 botões: um de nome "Receitas Feitas", um de nome "Receitas Favoritas" e um de nome "Sair".

Ao clicar no botão de "Receitas Favoritas", a tela de receitas favoritas é mostrada.

Ao clicar no botão de "Receitas Feitas", a tela de receitas feitas é mostrada.

Ao clicar no botão de "Sair", a tela de login é mostrada, e os dados do usuário e seu 'histórico' são apagados.

---

## Acesse aqui: <a href="https://recipes-app-project-ecru.vercel.app/">App de receitas</a>
