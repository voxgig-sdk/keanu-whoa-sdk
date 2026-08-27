package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "KeanuWhoa",
			"slug": "keanu-whoa",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://whoa.onrender.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"whoa": map[string]any{},
			},
		},
		"entity": map[string]any{
			"whoa": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "1080p",
						"short": "URL to 1080p video clip",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "360p",
						"short": "URL to 360p video clip",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "480p",
						"short": "URL to 480p video clip",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "720p",
						"short": "URL to 720p video clip",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "audio",
						"short": "URL to audio clip of the whoa",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "character",
						"short": "Character name that Keanu Reeves played",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "current_whoa_in_movie",
						"short": "The number of this whoa within the movie",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "director",
						"short": "Director of the movie",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "full_line",
						"short": "The full line of dialogue containing the whoa",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the whoa instance",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "movie",
						"short": "Title of the movie where the whoa was said",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "movie_duration",
						"short": "Total duration of the movie",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "poster",
						"short": "URL to movie poster image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timestamp",
						"short": "Timestamp when the whoa occurs in the movie",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total_whoas_in_movie",
						"short": "Total number of whoas in the movie",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "video",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "whoa_in_movie",
						"short": "Representation of whoa count in the movie (e.g., '1 of 5')",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "year",
						"short": "Year the movie was released",
						"type": "`$INTEGER`",
					},
				},
				"name": "whoa",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/whoas",
								"parts": []any{
									"whoas",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/whoas/{id}",
								"parts": []any{
									"whoas",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.video`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/whoas/random",
								"parts": []any{
									"whoas",
									"random",
								},
								"select": map[string]any{
									"$action": "random",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.video`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
