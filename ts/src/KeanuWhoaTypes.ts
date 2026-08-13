// Typed models for the KeanuWhoa SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Whoa {
  "1080p"?: string
  "360p"?: string
  "480p"?: string
  "720p"?: string
  audio?: string
  character?: string
  current_whoa_in_movie?: number
  director?: string
  full_line?: string
  id?: number
  movie?: string
  movie_duration?: string
  poster?: string
  timestamp?: string
  total_whoas_in_movie?: number
  video?: Record<string, any>
  whoa_in_movie?: string
  year?: number
}

export interface WhoaLoadMatch {
  id: number

  // Selects a custom action instead of the plain load:
  //   'random'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface WhoaListMatch {
  "1080p"?: string
  "360p"?: string
  "480p"?: string
  "720p"?: string
  audio?: string
  character?: string
  current_whoa_in_movie?: number
  director?: string
  full_line?: string
  id?: number
  movie?: string
  movie_duration?: string
  poster?: string
  timestamp?: string
  total_whoas_in_movie?: number
  video?: Record<string, any>
  whoa_in_movie?: string
  year?: number
}

