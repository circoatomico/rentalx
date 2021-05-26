# qual a imagem do docker hub que vc quer usar ?
FROM node

# Qual será o path onde sua aplicação docker irá rodar ?
WORKDIR /usr/app

# copiando o package.json para o /usr/app
COPY package.json ./

#  nem todas as imagens vêm com o yarn instalado, por isso o uso do npm
RUN npm install

# Copiar todos os demais arquivos para /usr/app (menos oq tiver no dockerignore )
COPY . .

# a porta em que irá rodar nossa aplicação
EXPOSE 3333

# O comando que vc quer rodar nesse ponto do docker
CMD ["npm", "run", "dev"] 