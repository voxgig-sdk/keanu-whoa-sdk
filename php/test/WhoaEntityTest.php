<?php
declare(strict_types=1);

// Whoa entity test

require_once __DIR__ . '/../keanuwhoa_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class WhoaEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = KeanuWhoaSDK::test(null, null);
        $ent = $testsdk->Whoa(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = whoa_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "whoa." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set KEANUWHOA_TEST_WHOA_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $whoa_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.whoa")));
        $whoa_ref01_data = null;
        if (count($whoa_ref01_data_raw) > 0) {
            $whoa_ref01_data = Helpers::to_map($whoa_ref01_data_raw[0][1]);
        }

        // LIST
        $whoa_ref01_ent = $client->Whoa(null);
        $whoa_ref01_match = [];

        [$whoa_ref01_list_result, $err] = $whoa_ref01_ent->list($whoa_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($whoa_ref01_list_result);

        // LOAD
        $whoa_ref01_match_dt0 = [
            "id" => $whoa_ref01_data["id"],
        ];
        [$whoa_ref01_data_dt0_loaded, $err] = $whoa_ref01_ent->load($whoa_ref01_match_dt0, null);
        $this->assertNull($err);
        $whoa_ref01_data_dt0_load_result = Helpers::to_map($whoa_ref01_data_dt0_loaded);
        $this->assertNotNull($whoa_ref01_data_dt0_load_result);
        $this->assertEquals($whoa_ref01_data_dt0_load_result["id"], $whoa_ref01_data["id"]);

    }
}

function whoa_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/whoa/WhoaTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = KeanuWhoaSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["whoa01", "whoa02", "whoa03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("KEANUWHOA_TEST_WHOA_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "KEANUWHOA_TEST_WHOA_ENTID" => $idmap,
        "KEANUWHOA_TEST_LIVE" => "FALSE",
        "KEANUWHOA_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["KEANUWHOA_TEST_WHOA_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["KEANUWHOA_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new KeanuWhoaSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["KEANUWHOA_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["KEANUWHOA_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
