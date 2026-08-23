<?php
declare(strict_types=1);

// KeanuWhoa SDK configuration

class KeanuWhoaConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "KeanuWhoa",
                "slug" => "keanu-whoa",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://whoa.onrender.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "whoa" => [],
                ],
            ],
            "entity" => [
        'whoa' => [
          'fields' => [
            [
              'name' => '1080p',
              'short' => 'URL to 1080p video clip',
              'type' => '`$STRING`',
            ],
            [
              'name' => '360p',
              'short' => 'URL to 360p video clip',
              'type' => '`$STRING`',
            ],
            [
              'name' => '480p',
              'short' => 'URL to 480p video clip',
              'type' => '`$STRING`',
            ],
            [
              'name' => '720p',
              'short' => 'URL to 720p video clip',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'audio',
              'short' => 'URL to audio clip of the whoa',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'character',
              'short' => 'Character name that Keanu Reeves played',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'current_whoa_in_movie',
              'short' => 'The number of this whoa within the movie',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'director',
              'short' => 'Director of the movie',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'full_line',
              'short' => 'The full line of dialogue containing the whoa',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the whoa instance',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'movie',
              'short' => 'Title of the movie where the whoa was said',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'movie_duration',
              'short' => 'Total duration of the movie',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'poster',
              'short' => 'URL to movie poster image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'timestamp',
              'short' => 'Timestamp when the whoa occurs in the movie',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'total_whoas_in_movie',
              'short' => 'Total number of whoas in the movie',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'video',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'whoa_in_movie',
              'short' => 'Representation of whoa count in the movie (e.g., \'1 of 5\')',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'year',
              'short' => 'Year the movie was released',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'whoa',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/whoas',
                  'parts' => [
                    'whoas',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/whoas/{id}',
                  'parts' => [
                    'whoas',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.video`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/whoas/random',
                  'parts' => [
                    'whoas',
                    'random',
                  ],
                  'select' => [
                    '$action' => 'random',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.video`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return KeanuWhoaFeatures::make_feature($name);
    }
}
