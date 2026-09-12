"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'KeanuWhoa',
        slug: "keanu-whoa",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://whoa.onrender.com",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            whoa: {},
        }
    };
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
            "id": {
                "field": "id",
                "name": "id"
            },
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
                            "segments": [
                                {
                                    "lit": "whoas"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "whoas"
                            ]
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
                            "segments": [
                                {
                                    "lit": "whoas"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.video`"
                            },
                            "parts": [
                                "whoas",
                                "{id}"
                            ]
                        },
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/whoas/random",
                            "segments": [
                                {
                                    "lit": "whoas"
                                },
                                {
                                    "lit": "random"
                                }
                            ],
                            "select": {
                                "$action": "random"
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.video`"
                            },
                            "parts": [
                                "whoas",
                                "random"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map