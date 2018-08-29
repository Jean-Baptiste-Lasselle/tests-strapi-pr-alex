#!/bin/bash


# - 
# - injection des données exemple : 

export MAISON_OPS=`pwd`
export CHEMIN_ARCHIVE_A_DEPLOYER=./content-types-api.zip
export NOM_FICHIER_ARCHIVE_A_DEPLOYER=content-types-api.zip
export NOM_CONTENEUR_STRAPI=initialisation_strapi_api_1

# - on dézippe à l'extérieur du conteneur 

rm -rf $MAISON_OPS/injection-des-apis
mkdir  $MAISON_OPS/injection-des-apis
unzip $CHEMIN_ARCHIVE_A_DEPLOYER -d $MAISON_OPS/injection-des-apis/
# - Chemin dans l'hôte Docker
export CHEMIN_REP_DEPLOIEMENT=$MAISON_OPS/injection-des-apis/api/translation
# - Le chemin fournit à Strapi, pour faire le strapi new : 
export STRAPI_APP_NAME=jbl-strapi

# - Création du répertoire qui doit recevoir le zip dans le conteneur
docker exec -it -u root $NOM_CONTENEUR_STRAPI /bin/bash -c "rm -rf /root/injection-des-apis"
docker exec -it -u root $NOM_CONTENEUR_STRAPI /bin/bash -c "mkdir /root/injection-des-apis"

# - Copie du zip à l'intérieur du conteneur
docker cp $CHEMIN_REP_DEPLOIEMENT $NOM_CONTENEUR_STRAPI:/root/injection-des-apis

clear
echo " "
echo " CONTENEU DS CONTENEUR du rep [/root/injection-des-apis] : "
echo " "
docker exec -it -u root $NOM_CONTENEUR_STRAPI /bin/bash -c "ls -all  /root/injection-des-apis  "
echo " "
echo " "
# echo " CONTENEUR DS CONTENEUR du rep [/root/injection-des-apis] : "
# echo " "
# docker exec -it -u root $NOM_CONTENEUR_STRAPI /bin/bash -c "ls -all  /root/injection-des-apis  "
# echo " "
# echo " "
# read DEBUG2
# - dé-compression du zip dans le conteneur
docker exec -it -u root $NOM_CONTENEUR_MONGODB /bin/bash -c "cp -Rf /root/injection-des-apis/translation  /usr/src/api/ "
# - restauration de la BDD
docker exec -it -u root $NOM_CONTENEUR_MONGODB /bin/bash -c "mongorestore --drop -d $NOM_BDD /root/injection-des-apis/translation"

# - ANNEXE 

# 
# Requête spécifique STRAPI sur la BDD : 
# 
# -
# 
# - db[`users-permissions_permission`].find({ _id: '5b71421e5ba9360013cd2e79' })

