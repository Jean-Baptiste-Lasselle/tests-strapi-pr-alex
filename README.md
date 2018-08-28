# [Strapi](https://bitbucket.agilefabric.fr.kytes.com/scm/dev/demandes-tests.git) re-containerized by Kytes Zeta Cloud Team !

![Kytes Zeta Cloud CMS](https://cms.zetacloud.kytes.com)

API creation made simple, secure and fast.
The most advanced open-source Content Management Framework to build powerful API with no effort.

***

[![Travis](https://img.shields.io/travis/strapi/strapi-docker.svg?style=for-the-badge)](https://travis-ci.org/strapi/strapi-docker)
[![GitHub release](https://img.shields.io/github/release/strapi/strapi-docker.svg?style=for-the-badge)](https://github.com/strapi/strapi-docker/releases)
[![Docker Pulls](https://img.shields.io/docker/pulls/strapi/strapi.svg?style=for-the-badge)](https://hub.docker.com/r/strapi/strapi)

## Utilisation

0. Cette recette permet de déployer Strapi : 
* Sur un Hôte Docker : une machine sur laquelle `docker` et `docker-compose` ont été installés.
* Sur cette machine, cible dud déploiement, `docker` doit avoir accès au registry `docker` public, i.e. `docker.io`
* Enfin, cette recette a été testée pour les versions suivantes de `docker` et `docker-compose` : 
  ```bash
  Client:
   Version:           18.06.0-ce
   API version:       1.38
   Go version:        go1.10.3
   Git commit:        0ffa825
   Built:             Wed Jul 18 19:09:33 2018
   OS/Arch:           linux/amd64
   Experimental:      false
  
  Server:
   Engine:
    Version:          18.06.0-ce
    API version:      1.38 (minimum version 1.12)
    Go version:       go1.10.3
    Git commit:       0ffa825
    Built:            Wed Jul 18 19:07:38 2018
    OS/Arch:          linux/amd64
    Experimental:     false
  ```
  ```bash
  docker-compose version 1.22.0, build f46880fe
  docker-py version: 3.4.1
  CPython version: 3.6.6
  OpenSSL version: OpenSSL 1.1.0f  25 May 2017
  ```


   N.B.: Dans les versions ultérieures, ce même hôte Docker devra être configuré pour qu'il ait avccès à un registry Docker privé carrrefour.
Cette 

1. Récupérez la recette de provision de l'environnement : 
```bash
export MAISON_OPS=$(pwd)/provision-bootiestrapi
mkdir -p $MAISON_OPS
cd $MAISON_OPS
git clone "https://jean_baptiste_lasselle@bitbucket.agilefabric.fr.kytes.com/scm/dev/demandes-tests.git" .
```
2. Run using :
```bash
docker-compose build && docker-compose up
```
3. Tear down using : 
```bash
docker-compose down && docker system prune -f
```

<!-- 
## Pull from Kytes' Dock Hub

```bash
docker pull kytes/strapi
```
N.B.: la publication n'a pas encore eu lieu
-->



## Informations



## Variables d'Environment


### Héritées du [repo officiel strapi-docker](https://github.com/strapi/strapi-docker)

On notera qu'au 28/08/2018, ce repository Git : 
* Strapi distribue publiquement une image sur son [Dockerhub strapi](https://hub.docker.com/r/strapi/strapi/) , synchronisée avec le [repo officiel strapi-docker](https://github.com/strapi/strapi-docker)

- `APP_NAME` to override the `strapi-app` generated folder name (you should also update the volumes paths).
- `DATABASE_CLIENT` a database providers supported by Strapi: MongoDB, Postgres, MySQL, Sqlite3 and Redis.
- `DATABASE_HOST` database service name.
- `DATABASE_PORT` depends on your database client.
- `DATABASE_NAME` le nom de la Base de données que Strapi utilisera dans MongoDB, pour son exécution. Au contraire de l'équipe Strapi, nous ne définissons aucune valeur par défaut autre part que dans le docker-compose.yml, et ce à l'ade de l'arguement de build correspondant, i.e. `` . LA base de donnée n'est pas créée par Strapi, mais par le conteneur MongoDB, à l'aide de la variable d'environnement Docker `MONGO_INITDB_DATABASE` que vous trouverez dans la définition du service nommé `strapibdd` dans le `./docker-compose.yml`) de ce repo.
- `DATABASE_USERNAME` permet de définir le nom d'utilisateur dont Strapi doit faire usage pour s'authentifier auprès de MongoDB.
- `DATABASE_PASSWORD` permet de définir le mot de passe de l'utilisateur MongoDB `DATABASE_USERNAME`.
- `DATABASE_SSL` doit prendre la valeur `true`, ou la valeur `false`, afin de définir si oui ou non, le conteneur doit faire usage d'un certificat TLS/SSL
- `DATABASE_AUTHENTICATION_DATABASE` permet de définir une BDD séparée, spécialement pour l'authentification.


### Ajoutées par mes soins

- `REPERTOIRE_LIVRAISON_DEV` permet de définir, dans le conteneur Strapi, le chemin du répertoire dans lequel on copie l'ensemble de la livraison équipe de dev.


