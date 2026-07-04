# Typed models for the KeanuWhoa SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Whoa:
    audio: Optional[str] = None
    character: Optional[str] = None
    current_whoa_in_movie: Optional[int] = None
    director: Optional[str] = None
    full_line: Optional[str] = None
    id: Optional[int] = None
    movie: Optional[str] = None
    movie_duration: Optional[str] = None
    poster: Optional[str] = None
    timestamp: Optional[str] = None
    total_whoas_in_movie: Optional[int] = None
    video: Optional[dict] = None
    whoa_in_movie: Optional[str] = None
    year: Optional[int] = None


@dataclass
class WhoaLoadMatch:
    id: int


@dataclass
class WhoaListMatch:
    audio: Optional[str] = None
    character: Optional[str] = None
    current_whoa_in_movie: Optional[int] = None
    director: Optional[str] = None
    full_line: Optional[str] = None
    id: Optional[int] = None
    movie: Optional[str] = None
    movie_duration: Optional[str] = None
    poster: Optional[str] = None
    timestamp: Optional[str] = None
    total_whoas_in_movie: Optional[int] = None
    video: Optional[dict] = None
    whoa_in_movie: Optional[str] = None
    year: Optional[int] = None

