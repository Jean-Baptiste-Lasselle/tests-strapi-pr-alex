# Objet

Chaque release de ce repo, correpsond à un test que j'ai mené, d'une instance bootstrapi dans une petite infrastructutre orchestrée par docker-compose.
Par exemple, dans la release `bootstrapi.previsible`, je montre que la partie authentification de l'applciation pose un problème manifieste;
L'intérêt de ma recette est de paramétrer toutes les versions de dépendances que je manipule pour les tests (et les builds from source de strapi, et de plugins strapi). 

Je paramètrerai ainsi, dans les prochaines release : 
* la version de NODEJS utilisée (j'améliorerais la construction de mes images avec une provision gérée NVM),
* la version de REACTJS utilisée par strapi,
* la version de MONGOOSE spécifiée dans la package.json de l'application (j'ajouterai donc bien un contneur exécutant le build strapi, ainsi qu'un contneur repo NPM privé),
* mais aussi la version de l'image docker mongo (qui définit la version de mongodb)
* et surtout : la version de strapi, au sens du repo NPM officiel, i.e. la version à indiquer dans la commande :
```bash
npm install -g strapi@$NUMERO_VERSION_STRAPI
```




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

```
# export TAG_ID=tests-ligne-prod-1.0.1
# export TAG_ID=bootstrapi.previsible
export TAG_ID=bootstrapi.previsible-nu
mkdir -p bootiestrapi
cd bootiestrapi
git clone "https://github.com/Jean-Baptiste-Lasselle/tests-strapi-pr-alex.git" .
git checkout "$TAG_ID" 
docker-compose down && docker system prune -f && docker-compose build && docker-compose up -d && docker logs jblsbootstrapi -f 
echo " Et comme l'on dit en un anglais parachevé: Et voilà!"

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


