# mirai-scrum

> My badass Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## 1. クラスタ作成

```sh
$ sudo docker exec -it mongodb3 mongo # PRIMARYに接続
> config = {"_id" : "mongodb-repl-set","members" : [{"_id" : 0,"host" : "mongodb1:27017","priority" : 1},{"_id" : 1,"host" : "mongodb2:27017","priority" : 1},{"_id" : 2,"host" : "mongodb3:27017","priority" : 2}]}
> rs.initiate(config)
> rs.status()
```

## 2. QAのCollection作成

```sh
$ sudo docker exec -it mongodb3 mongo # PRIMARYに接続
> use admin
> db.createCollection('questions');
{ "ok" : 1 }
> show collections
questions
```

## 3. Kuromojiの全文検索設定

### open, closeしてインデックスの設定変更

```sh
curl -H "Content-Type: application/json" -X POST 'localhost:9200/admin/_close'
curl -H "Content-Type: application/json" -X PUT 'localhost:9200/admin/_settings' -d '
{
  "settings": {
    "analysis": {
      "tokenizer": {
        "kuromoji_user_dict": {
          "type": "kuromoji_tokenizer",
          "mode": "search",
          "user_dictionary_rules": []
        }
      },
      "analyzer": {
        "my_kuromoji_analyzer": {
          "type": "custom",
          "tokenizer": "kuromoji_user_dict",
          "filter": [
            "kuromoji_baseform",
            "kuromoji_number",
            "katakana_readingform",
            "katakana_stemmer",
            "ja_stop"
          ]
        }
      },
      "filter" : {
        "katakana_readingform" : {
          "type" : "kuromoji_readingform",
          "use_romaji" : false
        },
        "katakana_stemmer": {
          "type": "kuromoji_stemmer",
          "minimum_length": 4
        },
        "ja_stop": {
          "type": "ja_stop",
          "stopwords": []
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "my_kuromoji_analyzer"
      },
      "body": {
        "type": "text",
        "analyzer": "my_kuromoji_analyzer"
      },
      "tags": {
        "type": "text",
        "analyzer": "my_kuromoji_analyzer"
      }
    }
  }
}'
curl -H "Content-Type: application/json" -X POST 'localhost:9200/admin/_open'
```

## 4. mongo-connectorが起動しない件について

dockerコンテナを単体で起動してログを調べる

```
$ sudo docker-compose logs mongo-connector
Attaching to mongo-connector
mongo-connector    | Logging to /mongo-connector.log.
$ sudo docker ps -a
$ sudo docker run -it --entrypoint=/bin/sh docker_mongo-connector

$ sudo docker-compose run --service-ports --no-deps --entrypoint /bin/sh mongo-connector
$ mongo-connector -m mongodb1 -t elasticsearch:9200 -d elastic2_doc_manager --continue-on-error --auto-commit-interval=0
$ vi mongo-connector.log
# 2020-04-26 04:20:26,151 [ERROR] mongo_connector.connector:381 - No replica set at "mongodb1"! A rep
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
