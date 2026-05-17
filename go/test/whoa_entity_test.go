package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/keanu-whoa-sdk/go"
	"github.com/voxgig-sdk/keanu-whoa-sdk/go/core"

	vs "github.com/voxgig-sdk/keanu-whoa-sdk/go/utility/struct"
)

func TestWhoaEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Whoa(nil)
		if ent == nil {
			t.Fatal("expected non-nil WhoaEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := whoaBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "whoa." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set KEANUWHOA_TEST_WHOA_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		whoaRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.whoa", setup.data)))
		var whoaRef01Data map[string]any
		if len(whoaRef01DataRaw) > 0 {
			whoaRef01Data = core.ToMapAny(whoaRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = whoaRef01Data

		// LIST
		whoaRef01Ent := client.Whoa(nil)
		whoaRef01Match := map[string]any{}

		whoaRef01ListResult, err := whoaRef01Ent.List(whoaRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, whoaRef01ListOk := whoaRef01ListResult.([]any)
		if !whoaRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", whoaRef01ListResult)
		}

		// LOAD
		whoaRef01MatchDt0 := map[string]any{
			"id": whoaRef01Data["id"],
		}
		whoaRef01DataDt0Loaded, err := whoaRef01Ent.Load(whoaRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		whoaRef01DataDt0LoadResult := core.ToMapAny(whoaRef01DataDt0Loaded)
		if whoaRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if whoaRef01DataDt0LoadResult["id"] != whoaRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func whoaBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "whoa", "WhoaTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read whoa test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse whoa test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"whoa01", "whoa02", "whoa03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("KEANUWHOA_TEST_WHOA_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"KEANUWHOA_TEST_WHOA_ENTID": idmap,
		"KEANUWHOA_TEST_LIVE":      "FALSE",
		"KEANUWHOA_TEST_EXPLAIN":   "FALSE",
		"KEANUWHOA_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["KEANUWHOA_TEST_WHOA_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["KEANUWHOA_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["KEANUWHOA_APIKEY"],
			},
			extra,
		})
		client = sdk.NewKeanuWhoaSDK(core.ToMapAny(mergedOpts))
	}

	live := env["KEANUWHOA_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["KEANUWHOA_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
