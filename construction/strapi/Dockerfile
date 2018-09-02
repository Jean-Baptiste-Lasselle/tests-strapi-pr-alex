FROM node:9.11.1-alpine

LABEL maintainer="Luca Perret <jean.baptiste.lasselle.it@gmail.com>" \
      org.label-schema.vendor="Carrefour Strapi" \
      org.label-schema.name="Carrefour's blend of Strapi Docker image" \
      org.label-schema.description="Strapi containerized by Carrefour" \
      org.label-schema.url="https://strapi.io" \
      org.label-schema.vcs-url="https://bitbucket.agilefabric.fr.carrefour.com/projects/DEV/repos/cycle-devops/browse" \
      org.label-schema.version=latest \
      org.label-schema.schema-version="1.0"

ARG APP_NAME_PAR_DEFAUT
ENV APP_NAME=$APP_NAME

ARG DATABASE_CLIENT_PAR_DEFAUT
ENV DATABASE_CLIENT=$DATABASE_CLIENT

ARG DATABASE_HOST_PAR_DEFAUT
ENV DATABASE_HOST=$DATABASE_HOST_PAR_DEFAUT

ARG DATABASE_PORT_PAR_DEFAUT
ENV DATABASE_PORT=$DATABASE_PORT_PAR_DEFAUT

ARG DATABASE_NAME_PAR_DEFAUT
ENV DATABASE_NAME=$DATABASE_NAME_PAR_DEFAUT

ARG DATABASE_NAME_PAR_DEFAUT
ENV DATABASE_NAME=$DATABASE_NAME_PAR_DEFAUT


ARG DATABASE_USERNAME_PAR_DEFAUT
ENV DATABASE_USERNAME=$DATABASE_USERNAME_PAR_DEFAUT

ARG DATABASE_PASSWORD_PAR_DEFAUT
ENV DATABASE_PASSWORD=$DATABASE_PASSWORD_PAR_DEFAUT
ARG REPERTOIRE_LIVRAISON_DEV_PAR_DEFAUT
ENV REPERTOIRE_LIVRAISON_DEV=$REPERTOIRE_LIVRAISON_DEV_PAR_DEFAUT


# ARG VERSION_FRAMEWORK_STRAPI_PAR_DEFAUT=3.0.0-alpha.13.1
ARG VERSION_FRAMEWORK_STRAPI
ENV VERSION_FRAMEWORK_STRAPI=$VERSION_FRAMEWORK_STRAPI

RUN mkdir -p /bootiestrapi
WORKDIR /bootiestrapi
# -------------------------------------
# - ajout d'utilitaires pour tests:
# -------------------------------------

RUN apk update
# le package apk "iputils" contient l'utilitaire "ping", qui permettra de faire un test réseau.
RUN apk add iputils

# -------------------------------------
# - fin ajout des utilitaires tests.
# -------------------------------------


# --- AJOUT POUR DEPLOIEMENT LIVRABLE DEV.
# RUN mkdir -p $REPERTOIRE_LIVRAISON_DEV/livraison-dev
# WORKDIR $REPERTOIRE_LIVRAISON_DEV/livraison-dev
# ADD ./livraisons-dev/1/translation .
# WORKDIR /usr/src/api

# --- AJOUT POUR DEPLOIEMENT LIVRABLE DEV.
RUN mkdir -p $REPERTOIRE_LIVRAISON_DEV
WORKDIR $REPERTOIRE_LIVRAISON_DEV
ADD ./livraisons-dev/1/translation .

WORKDIR /bootiestrapi

RUN npm install -g strapi@$VERSION_FRAMEWORK_STRAPI

COPY strapi.sh ./
RUN chmod +x ./strapi.sh

EXPOSE 1337

COPY healthcheck.js ./
HEALTHCHECK --interval=15s --timeout=5s --start-period=30s \
      CMD node /bootiestrapi/healthcheck.js

# Ensuite, j'ai (Jean-Baptiste Lasselle) ajouté dans ./strapi.sh, les sorties standard qui apparaîtront dans
# le [docker logs $NOM_DE_CE_CONTENEUR] pour que les erreurs de strapi pour la connexion BDD


CMD ["./strapi.sh"]
