FROM node:lts-bullseye-slim

# Création de l'arborescence de destination pour les modules Node.js
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Définition du répertoire de travail
WORKDIR /home/node/app

# Copie des fichiers package.json et package-lock.json
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie des fichiers source
COPY . .

# Commande de démarrage de l'application
CMD ["node", "app.js"]