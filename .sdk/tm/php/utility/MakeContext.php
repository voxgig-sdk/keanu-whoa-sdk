<?php
declare(strict_types=1);

// KeanuWhoa SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class KeanuWhoaMakeContext
{
    public static function call(array $ctxmap, ?KeanuWhoaContext $basectx): KeanuWhoaContext
    {
        return new KeanuWhoaContext($ctxmap, $basectx);
    }
}
