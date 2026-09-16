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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "whoas",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"whoas",
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
								"segments": []any{
									map[string]any{
										"lit": "whoas",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"whoas",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/whoas/random",
								"segments": []any{
									map[string]any{
										"lit": "whoas",
									},
									map[string]any{
										"lit": "random",
									},
								},
								"select": map[string]any{
									"$action": "random",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.video`",
								},
								"parts": []any{
									"whoas",
									"random",
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
