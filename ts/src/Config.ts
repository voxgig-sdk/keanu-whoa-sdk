
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'KeanuWhoa',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://whoa.onrender.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      whoa: {
      },

    }
  }


  entity = {
    "whoa": {
      "fields": [
        {
          "name": "1080p",
          "type": "`$STRING`"
        },
        {
          "name": "360p",
          "type": "`$STRING`"
        },
        {
          "name": "480p",
          "type": "`$STRING`"
        },
        {
          "name": "720p",
          "type": "`$STRING`"
        },
        {
          "name": "audio",
          "type": "`$STRING`"
        },
        {
          "name": "character",
          "type": "`$STRING`"
        },
        {
          "name": "current_whoa_in_movie",
          "type": "`$INTEGER`"
        },
        {
          "name": "director",
          "type": "`$STRING`"
        },
        {
          "name": "full_line",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$INTEGER`"
        },
        {
          "name": "movie",
          "type": "`$STRING`"
        },
        {
          "name": "movie_duration",
          "type": "`$STRING`"
        },
        {
          "name": "poster",
          "type": "`$STRING`"
        },
        {
          "name": "timestamp",
          "type": "`$STRING`"
        },
        {
          "name": "total_whoas_in_movie",
          "type": "`$INTEGER`"
        },
        {
          "name": "video",
          "type": "`$OBJECT`"
        },
        {
          "name": "whoa_in_movie",
          "type": "`$STRING`"
        },
        {
          "name": "year",
          "type": "`$INTEGER`"
        }
      ],
      "name": "whoa",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/whoas",
              "parts": [
                "whoas"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/whoas/{id}",
              "parts": [
                "whoas",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.video`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/whoas/random",
              "parts": [
                "whoas",
                "random"
              ],
              "select": {
                "$action": "random"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.video`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

