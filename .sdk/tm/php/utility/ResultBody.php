<?php
declare(strict_types=1);

// KeanuWhoa SDK utility: result_body

class KeanuWhoaResultBody
{
    public static function call(KeanuWhoaContext $ctx): ?KeanuWhoaResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
