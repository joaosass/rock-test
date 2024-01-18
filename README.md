# Execurando localmente

>**Obs**: Garantir que o ambiente esteja configurado de acordo com a documentação do [React Native](https://reactnative.dev/docs/environment-setup).

Execute os seguintes comandos:

- ```npm install```
- ```npm start``` (e depois pressiona ```a``` para iniciar o emulador do Android)


## Decisões técnicas

### AWS Amplify

Optei por usar o Amplify para simplificar o processo de criar recursos da AWS e integrá-los. Por exemplo, criar um Cognito para criação/autenticação de usuários, criar um Lambda para o backend, criar um Api Gateway para permitir realizar request, garantir que apenas usuários autenticados na minha User Pool pudessem realizar as requests e também realizar o controle de rate-limit dessa api e criar um banco de dados DynamoDB. Sem contar da facilidade para o proceso de deploy da aplicação e de infraestrutura como código.

### Zustand

Zustand é uma forma muito simples de lidar com o estado global da aplicação, tendo um boilerplate enxuto, baixa curva de aprendizagem e facilitando um melhor controle de re-renders apenas quando houver mudanças.

### React-hook-form/yup

Esse conjunto de ferramentas sempre me trouxe um ganho de produtividade para criar experiências formulários que fossem fáceis de fazer/controlar e também trazer uma expriência de usuário que fosse fácil não deixar o usuário no escuro sem entender sobre as regras de preenchimento.

### Jest/@testing-library/react-native

O conjunto de Jest + @testing-library/react-native traz uma facilidade para encontrar os elementos que vão ser testados, disparar eventos e até testar hooks customizados de maneira assertiva.


## Arquitetura de pastas

### components

A pasta ```components``` é onde coloco os componentes que são asbtrações que possam ser retulizadas em diversos lugares da aplicação ou que valham realizar essa separação.

### screens

A pasta ```screens``` é onde são organizadas as telas do App. Em projetos maiores gosto de criar a estrutura de features, onde screen seja um conjunto de features e uma feature é um conjunto de components e utils, pensando no cenário onde uma feature também possa ser retutilizada atrás do projeto.

### utils

A pasta ```utils``` é onde são organizadas as abstrações de lógicas que podem ser reutilizadas atrás da aplicação. Geralmente também crio uma pasta hooks para organizar os hooks são mais genérico para aplicação, como o exemplo em questão era mais simples todos os hooks foram feitos especificamente para cada tela e assim considero que fazia mais sentido mantes eles mais próximos de onde vão ser usados efetivamente.