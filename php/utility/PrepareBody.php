<?php
declare(strict_types=1);

// KeanuWhoa SDK utility: prepare_body

class KeanuWhoaPrepareBody
{
    public static function call(KeanuWhoaContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
