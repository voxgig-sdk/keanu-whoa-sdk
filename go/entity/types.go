// Typed models for the KeanuWhoa SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Whoa is the typed data model for the whoa entity.
type Whoa struct {
	Audio *string `json:"audio,omitempty"`
	Character *string `json:"character,omitempty"`
	CurrentWhoaInMovie *int `json:"current_whoa_in_movie,omitempty"`
	Director *string `json:"director,omitempty"`
	FullLine *string `json:"full_line,omitempty"`
	Id *int `json:"id,omitempty"`
	Movie *string `json:"movie,omitempty"`
	MovieDuration *string `json:"movie_duration,omitempty"`
	Poster *string `json:"poster,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	TotalWhoasInMovie *int `json:"total_whoas_in_movie,omitempty"`
	Video *map[string]any `json:"video,omitempty"`
	WhoaInMovie *string `json:"whoa_in_movie,omitempty"`
	Year *int `json:"year,omitempty"`
}

// WhoaLoadMatch is the typed request payload for Whoa.LoadTyped.
type WhoaLoadMatch struct {
	Id int `json:"id"`
}

// WhoaListMatch mirrors the whoa fields as an all-optional match
// filter (Go analog of Partial<Whoa>).
type WhoaListMatch struct {
	Audio *string `json:"audio,omitempty"`
	Character *string `json:"character,omitempty"`
	CurrentWhoaInMovie *int `json:"current_whoa_in_movie,omitempty"`
	Director *string `json:"director,omitempty"`
	FullLine *string `json:"full_line,omitempty"`
	Id *int `json:"id,omitempty"`
	Movie *string `json:"movie,omitempty"`
	MovieDuration *string `json:"movie_duration,omitempty"`
	Poster *string `json:"poster,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	TotalWhoasInMovie *int `json:"total_whoas_in_movie,omitempty"`
	Video *map[string]any `json:"video,omitempty"`
	WhoaInMovie *string `json:"whoa_in_movie,omitempty"`
	Year *int `json:"year,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
