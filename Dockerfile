# Utiliser l'image officielle Node.js version 14
FROM node:16

# Créer le dossier d'application dans l'image
WORKDIR /app

# Copier les fichiers de l'application dans l'image
COPY package*.json ./
COPY . .

# Installer les dépendances de l'application
RUN npm install

# Exposer le port utilisé par l'application
EXPOSE 8000

# Démarrer l'application lorsque le conteneur est lancé
CMD ["npm", "start"]
