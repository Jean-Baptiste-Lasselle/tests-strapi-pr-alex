# Deploiement du plugin exemple

Logs avec le flot : 
* démarrage serveur
* création du premier utilisateur avec username=jbl, et password=jbl (et avec 3 caractères, ça passe)
* arrivé dans l'administration, j'ai tenté de changer les langues etc..., j'ai obtenu une petite erreur apparaîssant dans les logs
* et enfin, j'ai créé une utilisateur avec le username `vinse` et le mot de passe `vinsevinse`. Je lui donne le rôle "administrateur"

Resutlat : 
* Côté GUI, tout semble fonctionner correctemeent, j'arrive à me relogguer avec le username `vinse` et le mot de passe `vinsevinse`.
* Côté logs : 

```bash
 ++ FIN   DEPLOIEMENT PLUGIN TRANSLATION KYTES ++ 
total 0
drwxr-xr-x    9 root     root           152 Aug 17 09:05 .
drwxr-xr-x    8 root     root           261 Aug 17 09:05 ..
drwxr-xr-x    8 root     root           194 Aug 17 09:05 content-manager
drwxr-xr-x    9 root     root           185 Aug 17 09:05 content-type-builder
drwxr-xr-x    8 root     root           172 Aug 17 09:05 email
drwxr-xr-x    8 root     root           172 Aug 17 09:05 settings-manager
drwxr-xr-x    6 root     root           144 Aug 17 09:05 translation
drwxr-xr-x    9 root     root           186 Aug 17 09:05 upload
drwxr-xr-x   11 root     root           217 Aug 17 09:05 users-permissions
 ++ FIN   VERIF. DEPLOIEMENT PLUGIN TRANSLATION KYTES ++ 
[2018-08-17T09:05:41.851Z] warn Ignored attempt to bind route 'GET /example' to unknown controller/action.
[2018-08-17T09:05:41.853Z] warn Ignored attempt to bind route 'GET /models/reload' to unknown controller/action.
(node:573) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
(node:573) DeprecationWarning: collection.count is deprecated, and will be removed in a future version. Use collection.countDocuments or collection.estimatedDocumentCount instead
[2018-08-17T09:05:42.526Z] info Time: Fri Aug 17 2018 09:05:42 GMT+0000 (UTC)
[2018-08-17T09:05:42.526Z] info Launched in: 3715 ms
[2018-08-17T09:05:42.526Z] info Environment: development
[2018-08-17T09:05:42.526Z] info Process PID: 573
[2018-08-17T09:05:42.527Z] info Version: 3.0.0-alpha.13.1 (node v9.11.1)
[2018-08-17T09:05:42.527Z] info To shut down your server, press <CTRL> + C at any time

[2018-08-17T09:05:42.527Z] info ☄️  Admin panel: http://localhost:1337/admin
[2018-08-17T09:05:42.527Z] info ⚡ Server: http://localhost:1337

[2018-08-17T09:05:43.552Z] info File changed: /bootiestrapi/jbl-strapi/plugins/users-permissions/config/actions.json
[2018-08-17T09:06:53.253Z] debug GET index.html (32 ms)
[2018-08-17T09:06:57.561Z] debug GET index.html (5 ms)
[2018-08-17T09:06:57.597Z] debug GET vendor.dll.js (5 ms)
[2018-08-17T09:06:57.598Z] debug GET main.js (3 ms)
[2018-08-17T09:06:57.972Z] debug GET plugins.json (6 ms)
[2018-08-17T09:06:58.053Z] debug GET /admin/gaConfig (8 ms)
[2018-08-17T09:06:58.072Z] debug GET /admin/strapiVersion (2 ms)
[2018-08-17T09:06:58.076Z] debug GET /admin/currentEnvironment (2 ms)
[2018-08-17T09:06:58.082Z] debug GET /admin/layout (4 ms)
[2018-08-17T09:06:58.089Z] debug GET main.js (6 ms)
[2018-08-17T09:06:58.090Z] debug GET main.js (4 ms)
[2018-08-17T09:06:58.097Z] debug GET main.js (5 ms)
[2018-08-17T09:06:58.108Z] debug GET main.js (10 ms)
[2018-08-17T09:06:58.110Z] debug GET main.js (8 ms)
[2018-08-17T09:06:58.112Z] debug GET main.js (8 ms)
[2018-08-17T09:06:58.156Z] debug GET main.js (7 ms)
[2018-08-17T09:06:58.157Z] debug GET 0.a8afc61b64504735cc95.chunk.js (4 ms)
[2018-08-17T09:06:58.179Z] debug GET ac7d0ef8528ed4230148886fe1a21b3b.png (6 ms)
[2018-08-17T09:06:58.193Z] debug GET bd03a2cc277bbbc338d464e679fe9942.woff2 (4 ms)
[2018-08-17T09:06:58.199Z] debug GET c9cbbdc3762c340d5d37073a54971487.woff2 (5 ms)
[2018-08-17T09:06:58.204Z] debug GET 7244318390cc4d36aac4a613ff42d308.woff2 (3 ms)
[2018-08-17T09:06:58.211Z] debug GET af7ae505a9eed503f8b8e6982036873e.woff2 (6 ms)
[2018-08-17T09:06:58.214Z] debug GET cccb897485813c7c256901dbca54ecf2.woff2 (6 ms)
[2018-08-17T09:06:58.217Z] debug GET 8b4f872c5de19974857328d06d3fe48f.woff2 (5 ms)
[2018-08-17T09:06:58.495Z] debug GET 20001789a249c0d8d721531434ce02ba.png (8 ms)
[2018-08-17T09:06:58.498Z] debug GET f4b83ccf7e9e7f44b60b79a9a2a7be90.png (7 ms)
[2018-08-17T09:06:58.498Z] debug GET 3c2fd7a5298d52578097b7258362d751.png (5 ms)
[2018-08-17T09:06:58.501Z] debug GET 85f4e87cbdf8d922994c47a1356a856e.png (6 ms)
[2018-08-17T09:06:58.508Z] debug GET cbd0516e7c1ab24d5c0a55a6ad0f635d.png (10 ms)
[2018-08-17T09:06:58.511Z] debug GET c995503babdc2069f2d5f440b36771a1.png (9 ms)
[2018-08-17T09:06:58.581Z] debug GET 80f6811f6c30735dab68a01372d8b78f.woff2 (2 ms)
[2018-08-17T09:06:58.581Z] debug GET e89e581cc335503916d3001c717e40b2.png (4 ms)
[2018-08-17T09:06:58.749Z] debug GET /users-permissions/init (12 ms)
[2018-08-17T09:06:58.999Z] debug GET /settings-manager/autoReload (7 ms)
[2018-08-17T09:06:59.203Z] debug GET /content-type-builder/autoReload (6 ms)
[2018-08-17T09:06:59.541Z] debug GET 3.e894045e5095eb1a314c.chunk.js (3 ms)
[2018-08-17T09:06:59.913Z] debug GET 2ff0049a00e47b56bffc059daf9be78b.png (7 ms)
[2018-08-17T09:06:59.914Z] debug GET 0bd35bad03d09ca61ac6cce225112e36.svg (4 ms)
[2018-08-17T09:06:59.936Z] debug GET 33d5f0d956f3fc30bc51f81047a2c47d.woff2 (4 ms)
[2018-08-17T09:07:13.961Z] debug POST /auth/local/register (169 ms)
[2018-08-17T09:07:14.147Z] debug GET /content-type-builder/autoReload (7 ms)
[2018-08-17T09:07:14.148Z] debug GET /settings-manager/autoReload (13 ms)
[2018-08-17T09:07:14.527Z] debug GET /content-manager/models (7 ms)
(node:573) DeprecationWarning: collection.update is deprecated. Use updateOne, updateMany, or bulkWrite instead.
[2018-08-17T09:07:23.400Z] debug POST /content-type-builder/models/ (86 ms)
[2018-08-17T09:07:23.402Z] info The server is restarting

[2018-08-17T09:07:27.453Z] warn Ignored attempt to bind route 'GET /example' to unknown controller/action.
[2018-08-17T09:07:27.454Z] warn Ignored attempt to bind route 'GET /models/reload' to unknown controller/action.
(node:673) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
(node:673) DeprecationWarning: collection.update is deprecated. Use updateOne, updateMany, or bulkWrite instead.
(node:673) DeprecationWarning: collection.count is deprecated, and will be removed in a future version. Use collection.countDocuments or collection.estimatedDocumentCount instead
(node:673) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
[2018-08-17T09:07:27.841Z] info Time: Fri Aug 17 2018 09:07:27 GMT+0000 (UTC)
[2018-08-17T09:07:27.841Z] info Launched in: 3756 ms
[2018-08-17T09:07:27.841Z] info Environment: development
[2018-08-17T09:07:27.841Z] info Process PID: 673
[2018-08-17T09:07:27.841Z] info Version: 3.0.0-alpha.13.1 (node v9.11.1)
[2018-08-17T09:07:27.842Z] info To shut down your server, press <CTRL> + C at any time

[2018-08-17T09:07:27.842Z] info ☄️  Admin panel: http://localhost:1337/admin
[2018-08-17T09:07:27.842Z] info ⚡ Server: http://localhost:1337

[2018-08-17T09:07:28.817Z] info File changed: /bootiestrapi/jbl-strapi/plugins/users-permissions/config/actions.json
[2018-08-17T09:07:31.123Z] debug GET 2e6a10b1491e1872311c4f7a5dbc88cd.svg (38 ms)
[2018-08-17T09:07:31.127Z] debug GET /content-type-builder/connections (24 ms)
[2018-08-17T09:07:31.134Z] debug GET /content-type-builder/models (17 ms)
[2018-08-17T09:07:31.136Z] debug GET 0bd35bad03d09ca61ac6cce225112e36.svg (17 ms)
[2018-08-17T09:07:31.182Z] debug GET 0b6bb6725576b072c5d0b02ecdd1900d.woff2 (2 ms)
[2018-08-17T09:07:33.798Z] debug GET /content-manager/models (7 ms)
[2018-08-17T09:07:33.978Z] debug GET c6e5a6171e9789587d2e50f79a728506.svg (3 ms)
[2018-08-17T09:07:38.291Z] debug GET /content-type-builder/connections (6 ms)
[2018-08-17T09:07:38.301Z] debug GET /content-type-builder/models (9 ms)
[2018-08-17T09:07:54.935Z] debug GET 9d8ee0474ab828be76768bbc484f71cc.svg (3 ms)
[2018-08-17T09:07:54.953Z] debug GET f9d0d649d65cc9c946ed3668fdb72e51.png (2 ms)
[2018-08-17T09:07:55.009Z] debug GET /content-manager/explorer/user/count?_limit=10&_start=0&_sort=_id%3AASC&source=users-permissions (16 ms)
[2018-08-17T09:07:55.018Z] debug GET /content-manager/explorer/user?_limit=10&_start=0&_sort=_id%3AASC&source=users-permissions (18 ms)
[2018-08-17T09:07:55.021Z] debug GET /content-manager/models (15 ms)
[2018-08-17T09:07:55.060Z] debug GET e4b0213bd0c998e890a73ddc384f1ad5.svg (3 ms)
[2018-08-17T09:07:55.076Z] debug GET 4eb103b4d12be57cb1d040ed5e162e9d.woff2 (1 ms)
[2018-08-17T09:08:15.031Z] debug GET c6e5a6171e9789587d2e50f79a728506.svg (4 ms)
[2018-08-17T09:08:15.082Z] debug GET /upload/files?_limit=10&_sort=hash&_start=0 (28 ms)
[2018-08-17T09:08:15.085Z] debug GET /upload/files/count (20 ms)
[2018-08-17T09:08:23.167Z] debug GET /users-permissions/roles (12 ms)
Something else already exists at `/bootiestrapi/jbl-strapi/api/langues/controllers/Langues.js`.

  Error: Cannot wrap non-Error object
      at Object.exports.assert (/usr/local/lib/node_modules/strapi/node_modules/hoek/lib/index.js:740:11)
      at Object.exports.wrap (/usr/local/lib/node_modules/strapi/node_modules/boom/lib/index.js:95:10)
      at strapi.app.use (/usr/local/lib/node_modules/strapi/lib/middlewares/boom/index.js:35:20)
      at <anonymous>

[2018-08-17T09:10:27.187Z] debug GET /content-manager/explorer/user/count?_limit=10&_start=0&_sort=_id%3AASC&source=users-permissions (6 ms)
[2018-08-17T09:10:27.207Z] debug GET /content-manager/explorer/user?_limit=10&_start=0&_sort=_id%3AASC&source=users-permissions (14 ms)
[2018-08-17T09:10:27.210Z] debug GET /content-manager/models (14 ms)
[2018-08-17T09:10:29.494Z] debug GET /content-manager/explorer/role/?_limit=20&_start=0&source=users-permissions (9 ms)
[2018-08-17T09:10:46.557Z] debug POST /content-manager/explorer/user/?source=users-permissions (168 ms)
[2018-08-17T09:10:47.059Z] debug GET /content-manager/explorer/user/count?_limit=10&_start=0&_sort=_id%3AASC&source=users-permissions (13 ms)
[2018-08-17T09:10:47.061Z] debug GET /content-manager/explorer/user?_limit=10&_start=0&_sort=_id%3AASC&source=users-permissions (9 ms)
[2018-08-17T09:10:50.296Z] debug GET /content-manager/explorer/role/?_limit=20&_start=0&source=users-permissions (8 ms)
[2018-08-17T09:10:50.310Z] debug GET /content-manager/explorer/user/5b7691164504f702a185e31a?source=users-permissions (10 ms)
[2018-08-17T09:10:54.075Z] debug PUT /content-manager/explorer/user/5b7691164504f702a185e31a?source=users-permissions (31 ms)
[2018-08-17T09:10:54.404Z] debug GET /content-manager/explorer/user/count?_limit=10&_start=0&_sort=_id%3AASC&source=users-permissions (10 ms)
[2018-08-17T09:10:54.408Z] debug GET /content-manager/explorer/user?_limit=10&_start=0&_sort=_id%3AASC&source=users-permissions (11 ms)
[2018-08-17T09:11:08.328Z] debug POST /auth/local (123 ms)
[2018-08-17T09:11:08.638Z] debug GET 20001789a249c0d8d721531434ce02ba.png (7 ms)
[2018-08-17T09:11:08.639Z] debug GET f4b83ccf7e9e7f44b60b79a9a2a7be90.png (5 ms)
[2018-08-17T09:11:08.642Z] debug GET 3c2fd7a5298d52578097b7258362d751.png (6 ms)
[2018-08-17T09:11:08.649Z] debug GET 85f4e87cbdf8d922994c47a1356a856e.png (9 ms)
[2018-08-17T09:11:08.650Z] debug GET cbd0516e7c1ab24d5c0a55a6ad0f635d.png (8 ms)
[2018-08-17T09:11:08.650Z] debug GET c995503babdc2069f2d5f440b36771a1.png (4 ms)
[2018-08-17T09:11:14.549Z] debug GET /content-manager/explorer/user/count?_limit=10&_start=0&_sort=_id%3AASC&source=users-permissions (13 ms)
[2018-08-17T09:11:14.551Z] debug GET /content-manager/explorer/user?_limit=10&_start=0&_sort=_id%3AASC&source=users-permissions (10 ms)
[2018-08-17T09:11:14.561Z] debug GET /content-manager/models (8 ms)

```

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
# export TAG_ID=bootiestrapi
export TAG_ID=bootystrapi-plugins
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


