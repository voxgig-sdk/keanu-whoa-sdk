# Whoa entity test

require "minitest/autorun"
require "json"
require_relative "../KeanuWhoa_sdk"
require_relative "runner"

class WhoaEntityTest < Minitest::Test
  def test_create_instance
    testsdk = KeanuWhoaSDK.test(nil, nil)
    ent = testsdk.Whoa(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = whoa_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "whoa." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set KEANUWHOA_TEST_WHOA_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    whoa_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.whoa")))
    whoa_ref01_data = nil
    if whoa_ref01_data_raw.length > 0
      whoa_ref01_data = Helpers.to_map(whoa_ref01_data_raw[0][1])
    end

    # LIST
    whoa_ref01_ent = client.Whoa(nil)
    whoa_ref01_match = {}

    whoa_ref01_list_result, err = whoa_ref01_ent.list(whoa_ref01_match, nil)
    assert_nil err
    assert whoa_ref01_list_result.is_a?(Array)

    # LOAD
    whoa_ref01_match_dt0 = {
      "id" => whoa_ref01_data["id"],
    }
    whoa_ref01_data_dt0_loaded, err = whoa_ref01_ent.load(whoa_ref01_match_dt0, nil)
    assert_nil err
    whoa_ref01_data_dt0_load_result = Helpers.to_map(whoa_ref01_data_dt0_loaded)
    assert !whoa_ref01_data_dt0_load_result.nil?
    assert_equal whoa_ref01_data_dt0_load_result["id"], whoa_ref01_data["id"]

  end
end

def whoa_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "whoa", "WhoaTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = KeanuWhoaSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["whoa01", "whoa02", "whoa03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["KEANUWHOA_TEST_WHOA_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "KEANUWHOA_TEST_WHOA_ENTID" => idmap,
    "KEANUWHOA_TEST_LIVE" => "FALSE",
    "KEANUWHOA_TEST_EXPLAIN" => "FALSE",
    "KEANUWHOA_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["KEANUWHOA_TEST_WHOA_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["KEANUWHOA_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["KEANUWHOA_APIKEY"],
      },
      extra || {},
    ])
    client = KeanuWhoaSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["KEANUWHOA_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["KEANUWHOA_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
