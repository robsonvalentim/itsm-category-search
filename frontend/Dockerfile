# # Estágio 1: Build
# FROM node:24-alpine AS build

# # Define o diretório de trabalho
# WORKDIR /app

# # Copia os arquivos de dependências
# COPY package*.json ./

# # Instala as dependências
# # (O alpine é leve e ideal para ambientes de CI/CD)
# RUN npm install

# # Copia o restante dos arquivos do projeto
# COPY . .

# # Compila a aplicação para produção
# RUN npm run build

# # Estágio 2: Produção (Runtime)
# FROM nginx:stable-alpine

# # Copia os arquivos compilados do estágio anterior para o diretório do Nginx
# COPY --from=build /app/dist /usr/share/nginx/html

# # Expõe a porta 80 (padrão web)
# EXPOSE 80

# # Inicia o Nginx
# CMD ["nginx", "-g", "daemon off;"]
# Estágio único: Servidor de Alta Performance
FROM nginx:stable-alpine

# Remove os arquivos padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia a pasta 'dist' que o seu comando 'npm run build' criou no Windows
COPY dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o servidor
CMD ["nginx", "-g", "daemon off;"]