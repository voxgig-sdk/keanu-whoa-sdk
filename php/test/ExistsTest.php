<?php
declare(strict_types=1);

// KeanuWhoa SDK exists test

require_once __DIR__ . '/../keanuwhoa_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = KeanuWhoaSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
