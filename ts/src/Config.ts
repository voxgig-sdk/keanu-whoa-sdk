
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

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'KeanuWhoa',
        slug: "keanu-whoa",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
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
          "short": "URL to 1080p video clip",
          "type": "`$STRING`"
        },
        {
          "name": "360p",
          "short": "URL to 360p video clip",
          "type": "`$STRING`"
        },
        {
          "name": "480p",
          "short": "URL to 480p video clip",
          "type": "`$STRING`"
        },
        {
          "name": "720p",
          "short": "URL to 720p video clip",
          "type": "`$STRING`"
        },
        {
          "name": "audio",
          "short": "URL to audio clip of the whoa",
          "type": "`$STRING`"
        },
        {
          "name": "character",
          "short": "Character name that Keanu Reeves played",
          "type": "`$STRING`"
        },
        {
          "name": "current_whoa_in_movie",
          "short": "The number of this whoa within the movie",
          "type": "`$INTEGER`"
        },
        {
          "name": "director",
          "short": "Director of the movie",
          "type": "`$STRING`"
        },
        {
          "name": "full_line",
          "short": "The full line of dialogue containing the whoa",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the whoa instance",
          "type": "`$INTEGER`"
        },
        {
          "name": "movie",
          "short": "Title of the movie where the whoa was said",
          "type": "`$STRING`"
        },
        {
          "name": "movie_duration",
          "short": "Total duration of the movie",
          "type": "`$STRING`"
        },
        {
          "name": "poster",
          "short": "URL to movie poster image",
          "type": "`$STRING`"
        },
        {
          "name": "timestamp",
          "short": "Timestamp when the whoa occurs in the movie",
          "type": "`$STRING`"
        },
        {
          "name": "total_whoas_in_movie",
          "short": "Total number of whoas in the movie",
          "type": "`$INTEGER`"
        },
        {
          "name": "video",
          "type": "`$OBJECT`"
        },
        {
          "name": "whoa_in_movie",
          "short": "Representation of whoa count in the movie (e.g., '1 of 5')",
          "type": "`$STRING`"
        },
        {
          "name": "year",
          "short": "Year the movie was released",
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

