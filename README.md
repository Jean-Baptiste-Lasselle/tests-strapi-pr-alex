
# [Bootiestrapi](#), a [Strapi](https://github.com/strapi/strapi) re-containerized by Kytes Zeta Cloud Team !

![Kytes Zeta Cloud CMS](https://cms.zetacloud.kytes.com)

API creation made simple, secure and fast.
The most advanced open-source Content Management Framework to build powerful API with no effort.

***

[![Travis](https://img.shields.io/travis/strapi/strapi-docker.svg?style=for-the-badge)](https://travis-ci.org/strapi/strapi-docker)
[![GitHub release](https://img.shields.io/github/release/strapi/strapi-docker.svg?style=for-the-badge)](https://github.com/strapi/strapi-docker/releases)
[![Docker Pulls](https://img.shields.io/docker/pulls/strapi/strapi.svg?style=for-the-badge)](https://hub.docker.com/r/strapi/strapi) 

# Objet

Chaque release de ce repo, correpsond à un test que j'ai mené, concernant [Strapi.io](https://strapi.io). Je re-package strapi, aussi j'ai baptisée ma distribution *bootiestrapi*. Je mène ces tests dans une petite infrastructutre orchestrée par docker-compose.


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
export TAG_ID=bootiestrapi-plugins
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

4. On the machine your gonna access bootiestrapi using a browser, add the following entry to your `/etc/hosts` file : 
```bash
192.168.1.29    cms.zetacloud.kytes.io
```
Above, replace the IP address, with the defautl IP address of your docker host.

N.B.: on Windows, `C:\Windows\System32\drivers\etc\hosts` ....

5. Just browse to http://cms.zetacloud.kytes.io/ using Firefox, on the machine on which you modified the `/etc/hosts` file.


## Configuration Post provision

Pour terminer, j'ai trouvé une configuration qui règle certains problèmes de requêtage. DAns l'impression écran ci-dessous, on voir comment j'ai configuré ce paramètre, que je pense correspondre à l'hôte réseau du serveur backend strapi, à l'aide de l'interface graphique de l' "Admin Panel" Strapi.

Pour cette configuration graphioque avec l'admin panel, il faut cliquer, en bas à gauche, sur le bouton "configuration", puis choisir "server". 

Je n'ai aucun doute (pasz encore vérifié), qu'il soit possible de faire cette exacte même configuration à l'aide des fiheirs de configuration : 
* `/bootiestrapi/$APP_NAME/config/environments/developent/server.json`
* `/bootiestrapi/$APP_NAME/config/environments/staging/server.json`
* `/bootiestrapi/$APP_NAME/config/environments/production/server.json`

![Admin Panel: configuration host backend strapi](https://raw.githubusercontent.com/Jean-Baptiste-Lasselle/tests-strapi-pr-alex/master/doc/impr/conf-hote-reseau-backend-strapi.png)

Le paramètre de configuration `CORS`, pour le champs "Origin", a la valeur `*`, et l'admin panel, indique avec le petit voyant vert, quel est l'environnement actif (ci-dessous, l'env. `development`, la conf CORS est donc dans `/bootiestrapi/$APP_NAME/conf/environments/development/security.json`) : 

![Admin Panel: configuration CORS strapi front END ou bacend Valeur de l'Origin](https://raw.githubusercontent.com/Jean-Baptiste-Lasselle/tests-strapi-pr-alex/master/doc/impr/et-aller-pour-la-conf-cors-security.json.png)



## Résultats

### Strapi 14, sans déploiement du plugin exemple 

Dans la release `bootiestrapi`, strapi est entièrement re-packagée, focntionne corectement :+1: 
 - J'ai  forcé, cf. docker-compose.yml, la version de l'image docker mongo, au numéro de version indiqué par un anglophoen que je remercierai, i.e. `mongo:4.0.1`  
 - La creation des utilisateurs est testée, et fonctionne (on peut s'authentifier et entrer dans l'admin lorsque l'on a le rôle admi)
 - J'ai testé l'installation, via la "marketplace", du plugin strapi gratuit `graphql`
 - Je suis passé en Strapi 3.0.0@alpha-14.0

Sans le déploiement du plugin exemple `translation`, strapi fonctionne parfaitement, et ce sans toucher au stack NodeJS.

Par contre, on a toujours la grosse faille de sécurité sur les hash de mots de passe à la modification d'un utilisateur dans les  `Users` (`Content Types`, menu vertical gauche), et donc l'impossiblité de changer un mot de passe d'un utilsiateur. JE n'ai pas testé le doucble check par email de confirmation, ou tout autre mécanisme de password recovery.



### Strapi 14, avec  déploiement du plugin exemple 


Resutlat : 
* Côté GUI, j'arrive à me relogguer avec le username `bernard` et le mot de passe `mdpbernard`, si je crée (avec l'utilisateur créé initialement) un tel utilisateur, et lui donnele rôle `Administrateur`.
* Côté fonctionnel, grosse faille de sécurité admin à la gestion des utilisateurs + impossibilité de changer le mot de passe d'un utilisateur :


![Faille sécu strapi mdp hash](https://raw.githubusercontent.com/Jean-Baptiste-Lasselle/tests-strapi-pr-alex/master/doc/impr/faille-strapi-secu-mdp-hash.png)

* Enfin, côté logs, on s'aperçoit qu'il y a manifestement un problème avec le petit plugin exemple `translation`, que j'ai déployé : 

```bash
[2018-08-17T10:44:02.854Z] warn Ignored attempt to bind route 'GET /example' to unknown controller/action.
[2018-08-17T10:44:02.856Z] warn Ignored attempt to bind route 'GET /models/reload' to unknown controller/action.
(node:1180) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
(node:1180) DeprecationWarning: collection.update is deprecated. Use updateOne, updateMany, or bulkWrite instead.
(node:1180) DeprecationWarning: collection.count is deprecated, and will be removed in a future version. Use collection.countDocuments or collection.estimatedDocumentCount instead
(node:1180) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
[2018-08-17T10:44:03.227Z] info Time: Fri Aug 17 2018 10:44:03 GMT+0000 (UTC)
[2018-08-17T10:44:03.227Z] info Launched in: 3486 ms
[2018-08-17T10:44:03.227Z] info Environment: development
[2018-08-17T10:44:03.227Z] info Process PID: 1180
[2018-08-17T10:44:03.227Z] info Version: 3.0.0-alpha.13.1 (node v9.11.1)
[2018-08-17T10:44:03.227Z] info To shut down your server, press <CTRL> + C at any time

[2018-08-17T10:44:03.227Z] info ☄️  Admin panel: http://localhost:1337/admin
[2018-08-17T10:44:03.228Z] info ⚡️ Server: http://localhost:1337

[2018-08-17T10:44:04.474Z] info File changed: /bootiestrapi/jbl-strapi/plugins/users-permissions/config/actions.json
[2018-08-17T10:44:06.949Z] debug GET /content-manager/explorer/user/count?_limit=10&_start=0&_sort=_id%3AASC&source=users-permissions (46 ms)
[2018-08-17T10:44:06.963Z] debug GET /content-manager/explorer/user?_limit=10&_start=0&_sort=_id%3AASC&source=users-permissions (35 ms)
[2018-08-17T10:44:06.966Z] debug GET /content-manager/models (31 ms)
Something else already exists at `/bootiestrapi/jbl-strapi/api/langues/controllers/Langues.js`.

  Error: Cannot wrap non-Error object
      at Object.exports.assert (/usr/local/lib/node_modules/strapi/node_modules/hoek/lib/index.js:740:11)
      at Object.exports.wrap (/usr/local/lib/node_modules/strapi/node_modules/boom/lib/index.js:95:10)
      at strapi.app.use (/usr/local/lib/node_modules/strapi/lib/middlewares/boom/index.js:35:20)
      at <anonymous>

[2018-08-17T10:44:12.919Z] debug GET /users-permissions/roles (10 ms)
Something else already exists at `/bootiestrapi/jbl-strapi/api/langues/services/Langues.js`.

  Error: Cannot wrap non-Error object
      at Object.exports.assert (/usr/local/lib/node_modules/strapi/node_modules/hoek/lib/index.js:740:11)
      at Object.exports.wrap (/usr/local/lib/node_modules/strapi/node_modules/boom/lib/index.js:95:10)
      at strapi.app.use (/usr/local/lib/node_modules/strapi/lib/middlewares/boom/index.js:35:20)
      at <anonymous>

[2018-08-17T10:44:17.345Z] debug GET /settings-manager/configurations/environments (6 ms)
[2018-08-17T10:44:17.347Z] debug GET /settings-manager/menu (10 ms)
[2018-08-17T10:44:17.533Z] debug GET /settings-manager/configurations/application (6 ms)
[2018-08-17T10:44:28.142Z] debug GET /settings-manager/configurations/server/development (6 ms)
[2018-08-17T10:44:31.267Z] debug GET /settings-manager/configurations/server/production (5 ms)
[2018-08-17T10:44:33.137Z] debug GET /settings-manager/configurations/server/staging (9 ms)
[2018-08-17T10:44:35.110Z] debug GET /settings-manager/configurations/server/production (6 ms)
```
Cette erreur apparait dans les ogs, par exemple lorsuqe l'on clique sur le menu `Users` (cf. `Content Types`, menu vertical gauche).

À propos de cette même erreur , concernant le déploiement du plugin "translation" : il faut savor que c'est le "Content Manager", qui génère les APIs, (et re-démarre le serveur d'APIs, qui doit se réduire à une grappe de "RestControllers", des "EndPoints de REST API"). Hors on voit dans les logs ci-dessus, que le Content Manager tente manifestement de créer un fichier qui existe déjà: le fichier `/bootiestrapi/jbl-strapi/api/langues/controllers/Langues.js`. J'ai donc essayé de supprimer ce fichier au moment du déploiement., mais la double génération du modèle `langues` survient après le strapi start, et donc provoquée par la seule présence du plugin exemple `translation`.


Avec la dernière Release toujours, la "alpha14", la présence du plugin `translation` provoque une erreur du type suivant, dans les logs conteneur, lorsque j'esssaie d'installer le plugin "graphql", via la marketplace : 

```bash
2018-08-17T12:38:53.260Z] debug GET /admin/plugins (8 ms)
[2018-08-17T12:38:58.727Z] debug GET 1.9f1c8d13ee5efc839582.chunk.js (2 ms)
[2018-08-17T12:38:58.774Z] debug GET 1.9f1c8d13ee5efc839582.chunk.js.map (3 ms)
[2018-08-17T12:38:58.778Z] debug GET 1.9f1c8d13ee5efc839582.chunk.js.map (2 ms)
[2018-08-17T12:39:00.036Z] debug GET a3c3ba8a7b850bd30d17358efa9e4649.png (4 ms)
[2018-08-17T12:39:00.037Z] debug GET d9918a8a67770584f506e12d4c9e66c7.png (3 ms)
[2018-08-17T12:39:04.184Z] debug GET ada4458b361d5e72bcbd19da105afdc5.woff2 (3 ms)
[2018-08-17T12:39:08.547Z] info Installing graphql...
[2018-08-17T12:39:22.403Z] info The server is restarting

[2018-08-17T12:39:22.403Z] debug POST /admin/plugins/install (13864 ms)
[2018-08-17T12:39:26.406Z] warn Ignored attempt to bind route 'GET /example' to unknown controller/action.
[2018-08-17T12:39:26.408Z] warn Ignored attempt to bind route 'GET /models/reload' to unknown controller/action.

/bootiestrapi/jbl-strapi/node_modules/mongodb/lib/operations/mongo_client_ops.js:466
      throw err;
      ^
GraphQLError: Syntax Error: Invalid number, expected digit but got: "m".
    at syntaxError (/bootiestrapi/jbl-strapi/plugins/graphql/node_modules/graphql/error/syntaxError.js:24:10)
    at readDigits (/bootiestrapi/jbl-strapi/plugins/graphql/node_modules/graphql/language/lexer.js:437:32)
    at readNumber (/bootiestrapi/jbl-strapi/plugins/graphql/node_modules/graphql/language/lexer.js:395:16)
    at readToken (/bootiestrapi/jbl-strapi/plugins/graphql/node_modules/graphql/language/lexer.js:293:14)
    at Object.lookahead (/bootiestrapi/jbl-strapi/plugins/graphql/node_modules/graphql/language/lexer.js:61:43)
    at Object.advanceLexer [as advance] (/bootiestrapi/jbl-strapi/plugins/graphql/node_modules/graphql/language/lexer.js:52:33)
    at expect (/bootiestrapi/jbl-strapi/plugins/graphql/node_modules/graphql/language/parser.js:1296:11)
    at parseName (/bootiestrapi/jbl-strapi/plugins/graphql/node_modules/graphql/language/parser.js:92:15)
    at parseEnumValueDefinition (/bootiestrapi/jbl-strapi/plugins/graphql/node_modules/graphql/language/parser.js:956:14)
    at many (/bootiestrapi/jbl-strapi/plugins/graphql/node_modules/graphql/language/parser.js:1348:16)
    at parseEnumValuesDefinition (/bootiestrapi/jbl-strapi/plugins/graphql/node_modules/graphql/language/parser.js:945:50)
    at parseEnumTypeDefinition (/bootiestrapi/jbl-strapi/plugins/graphql/node_modules/graphql/language/parser.js:930:16)
    at parseTypeSystemDefinition (/bootiestrapi/jbl-strapi/plugins/graphql/node_modules/graphql/language/parser.js:669:16)
    at parseDefinition (/bootiestrapi/jbl-strapi/plugins/graphql/node_modules/graphql/language/parser.js:143:16)
    at parseDocument (/bootiestrapi/jbl-strapi/plugins/graphql/node_modules/graphql/language/parser.js:110:22)
    at Object.parse (/bootiestrapi/jbl-strapi/plugins/graphql/node_modules/graphql/language/parser.js:38:10)
    at Object.addPolymorphicUnionType (/bootiestrapi/jbl-strapi/plugins/graphql/services/GraphQL.js:1263:27)
    at Object.generateSchema (/bootiestrapi/jbl-strapi/plugins/graphql/services/GraphQL.js:1181:58)
    at Function.initialize (/bootiestrapi/jbl-strapi/plugins/graphql/hooks/graphql/index.js:103:62)
    at /usr/local/lib/node_modules/strapi/lib/hooks/index.js:19:29
    at after (/usr/local/lib/node_modules/strapi/lib/hooks/index.js:122:39)
    at /usr/local/lib/node_modules/strapi/node_modules/lodash/lodash.js:9997:23
    at Strapi.once (/usr/local/lib/node_modules/strapi/lib/hooks/index.js:133:17)
    at Object.onceWrapper (events.js:272:13)
    at Strapi.emit (events.js:180:13)
    at Strapi.emit (domain.js:422:20)
    at loadedModule.initialize.call.err (/usr/local/lib/node_modules/strapi/lib/hooks/index.js:32:12)
    at NativeConnection.instance.connection.on (/bootiestrapi/jbl-strapi/node_modules/strapi-hook-mongoose/lib/index.js:459:11)
    at NativeConnection.emit (events.js:180:13)
    at NativeConnection.emit (domain.js:422:20)
    at /bootiestrapi/jbl-strapi/node_modules/mongoose/lib/connection.js:549:13
    at result (/bootiestrapi/jbl-strapi/node_modules/mongodb/lib/utils.js:414:17)
    at executeCallback (/bootiestrapi/jbl-strapi/node_modules/mongodb/lib/utils.js:406:9)
    at err (/bootiestrapi/jbl-strapi/node_modules/mongodb/lib/operations/mongo_client_ops.js:286:5)


```

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


