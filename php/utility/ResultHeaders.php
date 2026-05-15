<?php
declare(strict_types=1);

// KeanuWhoa SDK utility: result_headers

class KeanuWhoaResultHeaders
{
    public static function call(KeanuWhoaContext $ctx): ?KeanuWhoaResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
