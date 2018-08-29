#!/bin/bash


# - 
# - injection des données exemple : 

export MAISON_OPS=`pwd`
# export CHEMIN_FICHIER_DUMP=/home/jean-baptiste/carrefour/usine/garage/strapi/pas-tres-interessant/dumpForProd.zip
export CHEMIN_FICHIER_DUMP=./dbdumpme.zip
export NOM_FICHIER_DUMP=dbdumpme.zip
export NOM_CONTENEUR_MONGODB=initialisation_strapibdd_1
export NOM_BDD=strapi-carrefour-db

# - on dézippe à l'extérieur du conteneur 

rm -rf $MAISON_OPS/injection-des-donnees-exemples
mkdir  $MAISON_OPS/injection-des-donnees-exemples
unzip $CHEMIN_FICHIER_DUMP -d $MAISON_OPS/injection-des-donnees-exemples

export CHEMIN_REP_DUMP=$MAISON_OPS/injection-des-donnees-exemples/dbdumpme/carrefourdb

# - création du répertoire qui doit recevoir le zip dans le conteneur
docker exec -it -u root $NOM_CONTENEUR_MONGODB /bin/bash -c "rm -rf /root/injection-des-donnees-exemples"
docker exec -it -u root $NOM_CONTENEUR_MONGODB /bin/bash -c "mkdir /root/injection-des-donnees-exemples"

# - copie du zip à l'intérieur du conteneur
docker cp $CHEMIN_REP_DUMP $NOM_CONTENEUR_MONGODB:/root/injection-des-donnees-exemples

clear
echo " "
echo " CONTENEU DS CONTENEUR du rep [/root/injection-des-donnees-exemples] : "
echo " "
docker exec -it -u root $NOM_CONTENEUR_MONGODB /bin/bash -c "ls -all  /root/injection-des-donnees-exemples/  "
echo " "
echo " "
echo " CONTENEU DS CONTENEUR du rep [/root/injection-des-donnees-exemples/carrefourdb] : "
echo " "
docker exec -it -u root $NOM_CONTENEUR_MONGODB /bin/bash -c "ls -all  /root/injection-des-donnees-exemples/carrefourdb  "
echo " "
echo " "
read DEBUG2
# - dé-compression du zip dans le conteneur
docker exec -it -u root $NOM_CONTENEUR_MONGODB /bin/bash -c "cd  /root/injection-des-donnees-exemples/carrefourdb  "
# - restauration de la BDD
docker exec -it -u root $NOM_CONTENEUR_MONGODB /bin/bash -c "mongorestore --drop -d $NOM_BDD /root/injection-des-donnees-exemples/carrefourdb/"

# - ANNEXE 

# 
# Requête spécifique STRAPI sur la BDD : 
# 
# -
# 
# - db[`users-permissions_permission`].find({ _id: '5b71421e5ba9360013cd2e79' })

