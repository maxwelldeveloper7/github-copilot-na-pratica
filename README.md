# Calculadora de Emissão de CO₂

## 🚗💨 Sobre o Projeto

A **Calculadora de Emissão de CO₂** é uma aplicação web interativa desenvolvida para conscientizar sobre o impacto ambiental das viagens. Ela calcula a emissão de dióxido de carbono (CO₂) baseada na distância percorrida e no modo de transporte escolhido, ajudando usuários a tomarem decisões mais sustentáveis.

Este projeto foi criado como parte do **Projeto Github Copilot** da DIO (Digital Innovation One), demonstrando o uso de tecnologias web modernas para promover a sustentabilidade.

## 🌟 Funcionalidades

- **Cálculo de Emissões**: Insira origem, destino e modo de transporte para calcular a emissão de CO₂ em kg.
- **Preenchimento Automático de Distâncias**: Baseado em um banco de dados de rotas brasileiras populares.
- **Comparação de Modos de Transporte**: Visualize emissões relativas para bicicleta, carro, ônibus e caminhão.
- **Sugestão de Créditos de Carbono**: Estime o custo para compensar as emissões através de créditos ambientais.
- **Interface Responsiva**: Funciona perfeitamente em dispositivos móveis e desktop.
- **Experiência Interativa**: Animações suaves e feedback visual durante os cálculos.

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica da aplicação.
- **CSS3**: Estilização com variáveis customizadas, gradientes e layouts responsivos.
- **JavaScript (Vanilla)**: Lógica de cálculo, manipulação do DOM e interatividade.
- **BEM Methodology**: Convenção de nomenclatura para classes CSS organizadas.

## 📋 Como Usar

1. **Acesse a Aplicação**: Abra o arquivo `index.html` em qualquer navegador moderno.
2. **Preencha os Dados**:
   - Selecione origem e destino nas listas de cidades brasileiras.
   - Escolha o modo de transporte (bicicleta, carro, ônibus ou caminhão).
   - A distância será preenchida automaticamente; caso contrário, marque a opção para inserir manualmente.
3. **Calcule**: Clique em "Calcular Emissão" para ver os resultados.
4. **Explore os Resultados**:
   - Visualize a emissão total e economia comparada ao carro.
   - Compare emissões entre todos os modos de transporte.
   - Veja sugestões para compensação via créditos de carbono.

## 📁 Estrutura do Projeto

```
carbon-calculator/
├── index.html          # Página principal da aplicação
├── css/
│   └── style.css       # Estilos CSS com variáveis e responsividade
├── js/
│   ├── app.js          # Lógica principal e event listeners
│   ├── calculator.js   # Funções de cálculo de emissões
│   ├── config.js       # Configurações e dados de transporte
│   ├── routes-data.js  # Banco de dados de rotas brasileiras
│   └── ui.js           # Funções de renderização e utilitários
└── README.md           # Este arquivo
```

## 🔧 Instalação e Execução

Este é um projeto puramente front-end, sem dependências externas. Para executá-lo:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/carbon-calculator.git
   cd carbon-calculator
   ```

2. **Abra no navegador**:
   - Navegue até o diretório do projeto.
   - Abra o arquivo `index.html` em seu navegador preferido.

**Nota**: Para um servidor local mais avançado, você pode usar extensões como "Live Server" no VS Code ou ferramentas como `http-server` via npm.

## 🌍 Impacto Ambiental

A aplicação utiliza fatores de emissão realistas baseados em dados científicos:
- **Bicicleta**: 0 kg CO₂/km (transporte zero-emissão)
- **Carro**: 0.12 kg CO₂/km
- **Ônibus**: 0.089 kg CO₂/km
- **Caminhão**: 0.96 kg CO₂/km

Esses valores ajudam a promover escolhas de transporte mais ecológicas, reduzindo a pegada de carbono pessoal.

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`).
4. Push para a branch (`git push origin feature/nova-funcionalidade`).
5. Abra um Pull Request.

Sugestões de melhorias:
- Adicionar mais rotas internacionais.
- Integrar APIs de mapas para distâncias reais.
- Implementar persistência de dados local.
- Adicionar gráficos interativos.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvedor

Desenvolvido com entusiasmo por Maxwell como parte do Projeto Github Copilot da DIO.

---

**Vamos juntos reduzir nossa pegada de carbono! 🌱**
