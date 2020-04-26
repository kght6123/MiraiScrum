# mirai-share

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

## QAのCollection作成

```sh
$ sudo docker exec -it mongodb3 mongo # PRIMARYに接続
> use admin
> db.createCollection('questions');
{ "ok" : 1 }
> show collections
questions
```

## Kuromojiの全文検索設定

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

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
