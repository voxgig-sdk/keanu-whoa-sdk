# frozen_string_literal: true

# Typed models for the KeanuWhoa SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Whoa entity data model.
#
# @!attribute [rw] 1080p
#   @return [String, nil]
#
# @!attribute [rw] 360p
#   @return [String, nil]
#
# @!attribute [rw] 480p
#   @return [String, nil]
#
# @!attribute [rw] 720p
#   @return [String, nil]
#
# @!attribute [rw] audio
#   @return [String, nil]
#
# @!attribute [rw] character
#   @return [String, nil]
#
# @!attribute [rw] current_whoa_in_movie
#   @return [Integer, nil]
#
# @!attribute [rw] director
#   @return [String, nil]
#
# @!attribute [rw] full_line
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] movie
#   @return [String, nil]
#
# @!attribute [rw] movie_duration
#   @return [String, nil]
#
# @!attribute [rw] poster
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] total_whoas_in_movie
#   @return [Integer, nil]
#
# @!attribute [rw] video
#   @return [Hash, nil]
#
# @!attribute [rw] whoa_in_movie
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
Whoa = Struct.new(
  :"1080p",
  :"360p",
  :"480p",
  :"720p",
  :audio,
  :character,
  :current_whoa_in_movie,
  :director,
  :full_line,
  :id,
  :movie,
  :movie_duration,
  :poster,
  :timestamp,
  :total_whoas_in_movie,
  :video,
  :whoa_in_movie,
  :year,
  keyword_init: true
)

# Request payload for Whoa#load.
#
# @!attribute [rw] id
#   @return [Integer]
WhoaLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Whoa#list.
#
# @!attribute [rw] 1080p
#   @return [String, nil]
#
# @!attribute [rw] 360p
#   @return [String, nil]
#
# @!attribute [rw] 480p
#   @return [String, nil]
#
# @!attribute [rw] 720p
#   @return [String, nil]
#
# @!attribute [rw] audio
#   @return [String, nil]
#
# @!attribute [rw] character
#   @return [String, nil]
#
# @!attribute [rw] current_whoa_in_movie
#   @return [Integer, nil]
#
# @!attribute [rw] director
#   @return [String, nil]
#
# @!attribute [rw] full_line
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] movie
#   @return [String, nil]
#
# @!attribute [rw] movie_duration
#   @return [String, nil]
#
# @!attribute [rw] poster
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] total_whoas_in_movie
#   @return [Integer, nil]
#
# @!attribute [rw] video
#   @return [Hash, nil]
#
# @!attribute [rw] whoa_in_movie
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
WhoaListMatch = Struct.new(
  :"1080p",
  :"360p",
  :"480p",
  :"720p",
  :audio,
  :character,
  :current_whoa_in_movie,
  :director,
  :full_line,
  :id,
  :movie,
  :movie_duration,
  :poster,
  :timestamp,
  :total_whoas_in_movie,
  :video,
  :whoa_in_movie,
  :year,
  keyword_init: true
)

