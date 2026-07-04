<?php
declare(strict_types=1);

// Typed models for the KeanuWhoa SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Whoa entity data model. */
class Whoa
{
    public ?string $audio = null;
    public ?string $character = null;
    public ?int $current_whoa_in_movie = null;
    public ?string $director = null;
    public ?string $full_line = null;
    public ?int $id = null;
    public ?string $movie = null;
    public ?string $movie_duration = null;
    public ?string $poster = null;
    public ?string $timestamp = null;
    public ?int $total_whoas_in_movie = null;
    public ?array $video = null;
    public ?string $whoa_in_movie = null;
    public ?int $year = null;
}

/** Request payload for Whoa#load. */
class WhoaLoadMatch
{
    public int $id;
}

/** Match filter for Whoa#list (any subset of Whoa fields). */
class WhoaListMatch
{
    public ?string $audio = null;
    public ?string $character = null;
    public ?int $current_whoa_in_movie = null;
    public ?string $director = null;
    public ?string $full_line = null;
    public ?int $id = null;
    public ?string $movie = null;
    public ?string $movie_duration = null;
    public ?string $poster = null;
    public ?string $timestamp = null;
    public ?int $total_whoas_in_movie = null;
    public ?array $video = null;
    public ?string $whoa_in_movie = null;
    public ?int $year = null;
}

