<?php
declare(strict_types=1);

// KeanuWhoa SDK utility: feature_add

class KeanuWhoaFeatureAdd
{
    public static function call(KeanuWhoaContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
