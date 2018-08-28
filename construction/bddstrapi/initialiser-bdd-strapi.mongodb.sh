#!/bin/bash

# - ENV. 
# - CONTENEUR MONGODB
export NOM_BDD_STRAPI=carrefour-cloud-2018
export HOTE_RESEAU_BDD_STRAPI=127.0.0.1
export PORT_IP_BDD_STRAPI=27017
# export NOM_CONTENEUR_MONGODB=docker_db_1
export NOM_CONTENEUR_MONGODB=docker_db_1

# - CONTENEUR STRAPI


# export REPERTOIRE_TEMP_RECUP_GIT=./recup-derniere-version

# OPS

export COMMANDE_CREATION_BDD="mongo $HOTE_RESEAU_BDD_STRAPI:$PORT_IP_BDD_STRAPI/$NOM_BDD_STRAPI ./creation-bdd-strapi.mongodb.js"

# Copie du fichier dans le conteneur : 
sudo docker cp ./creation-bdd-strapi.mongodb.js $NOM_CONTENEUR_MONGODB:.
docker exec -it $NOM_CONTENEUR_MONGODB /bin/bash -c "$COMMANDE_CREATION_BDD"




