#!/bin/sh
set -ea

_stopStrapi() {
  echo "Stopping strapi"
  kill -SIGINT "$strapiPID"
  wait "$strapiPID"
}

trap _stopStrapi SIGTERM SIGINT

cd /bootiestrapi

# APP_NAME=${APP_NAME:-strapi-app}
# DATABASE_CLIENT=${DATABASE_CLIENT:-mongo}
# DATABASE_HOST=${DATABASE_HOST:-localhost}
# DATABASE_PORT=${DATABASE_PORT:-27017}
# DATABASE_NAME=${DATABASE_NAME:-strapi}

echo " ++ DEBUT TESTS KYTES ++ "

echo " AVANT STRAPI NEW => commande de check BDD mongo [strapi new ${APP_NAME} --dbclient=$DATABASE_CLIENT --dbhost=$DATABASE_HOST --dbport=$DATABASE_PORT --dbname=$DATABASE_NAME --dbusername=$DATABASE_USERNAME --dbpassword=$DATABASE_PASSWORD --dbssl=$DATABASE_SSL --dbauth=$DATABASE_AUTHENTICATION_DATABASE]"

echo " AVANT STRAPI NEW => test ping du conteneur MongoDB [DATABASE_HOST=$DATABASE_HOST] "
ping -c 4 $DATABASE_HOST

echo " ++ FIN TESTS KYTES ++ "

if [ ! -f "$APP_NAME/package.json" ]
then
    strapi new ${APP_NAME} --dbclient=$DATABASE_CLIENT --dbhost=$DATABASE_HOST --dbport=$DATABASE_PORT --dbname=$DATABASE_NAME --dbusername=$DATABASE_USERNAME --dbpassword=$DATABASE_PASSWORD --dbssl=$DATABASE_SSL --dbauth=$DATABASE_AUTHENTICATION_DATABASE
elif [ ! -d "$APP_NAME/node_modules" ]
then
    npm install --prefix ./$APP_NAME
fi


# echo " ++ DEBUT DEPLOIEMENT PLUGIN TRANSLATION KYTES ++ "

# ls -all /bootiestrapi/$APP_NAME/
# mkdir -p /bootiestrapi/$APP_NAME/plugins/translation
# cp -Rf $REPERTOIRE_LIVRAISON_DEV/* /bootiestrapi/$APP_NAME/plugins/translation

# echo " ++ FIN   DEPLOIEMENT PLUGIN TRANSLATION KYTES ++ "
echo " Contenu [/bootiestrapi/$APP_NAME/plugins/] : "
ls -all /bootiestrapi/$APP_NAME/plugins/
echo " ++ FIN   VERIF. DEPLOIEMENT PLUGIN TRANSLATION KYTES ++ "
echo " --------------------------------------------------------- "
echo " Contenu [/bootiestrapi/$APP_NAME/api/] : "
ls -all /bootiestrapi/$APP_NAME/api/
echo " -- Juste avant le strapi start, nous constatons donc que le répertoire api est vide. "
echo " -- Question 1 :  es-ce que le content manager génère une api langues, si je ne déploie pas le plugin translation? "
echo " -- Question 2 :  es-ce que c'est le plugin translation, seul qui implique deux tentative successives de création de l'api langues? "
echo " -- Ce test Montre : que la creéation du modèle \"Langues.js\" est impacté par le déploiement du plugin exemple \"translation\". C'est donc lui qui entre en coflit, lorsque j'essaie d'accéder au \"Content Type\" \"Users\", amené nativement par Strapi. "

cd /bootiestrapi/$APP_NAME
strapi start &

strapiPID=$!
wait "$strapiPID"
