# ITSM Category Navigator

O **ITSM Category Navigator** é uma ferramenta de alta performance desenvolvida para otimizar o suporte técnico e a operação logística do GrupoSC. O sistema permite a busca rápida e filtragem precisa de categorias de chamados entre mais de 16.000 registros, garantindo agilidade no registro de incidentes e requisições.

## Objetivo do Projeto
Resolver o gargalo de tempo na identificação da árvore de categorias correta no sistema ITSM, reduzindo erros de abertura de chamados e aumentando a produtividade da equipe de TI e Logística nas unidades (ex: Prazeres - PE).

## Stack Tecnológica
- **Frontend:** React + TypeScript (Vite)
- **Estilização:** Tailwind CSS (Interface responsiva e moderna)
- **Ícones:** Lucide React
- **Infraestrutura/DevOps:** Docker + Nginx (Servidor de alta performance)

## Principais Funcionalidades
- **Busca Fuzzy:** Encontra termos mesmo em hierarquias profundas.
- **Filtros Avançados:** Filtragem por Empresa Serviço, Área e Localidade (CDs como SC-PE, PP-PE).
- **Paginação:** Navegação fluida em milhares de registros sem perda de performance.
- **Copy to Clipboard:** Cópia imediata do caminho completo da categoria (ex: `Serviço > Sub1 > Sub2`).
- **Mobile Friendly:** Interface adaptada para uso em dispositivos móveis no chão do armazém.

## Como Rodar com Docker

Como o ambiente corporativo possui restrições de rede (proxy), utilizamos uma estratégia de Pre-built Deployment (Implantação Pré-compilada).

### Pré-requisitos
- Node.js 24.15.0 LTS instalado.
- Docker Desktop com WSL2 habilitado.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/robsonvalentim/itsm-category-search.git
   cd helpdesk/frontend

2. **Navegue até a pasta do frontend:**
    cd helpdesk/frontend

3. **Gere os arquivos de produção (Build local):**
    npm install e depois npm run build

4. **Construa a imagem Docker:**
    docker build -t itsm-navigator .

5. **Inicie o contêiner:**
    docker run -d -p 8080:80 --name itsm-app itsm-navigator

A aplicação estará disponível em: http://localhost:8080

## Estrutura de Dados
O sistema consome uma base de dados centralizada em formato JSON, processada para garantir que campos críticos como Empresa Serviço e Prioridade sejam exibidos de forma intuitiva.

Desenvolvido por Robson Valentim Foco em automação de TI e transição para DevOps.