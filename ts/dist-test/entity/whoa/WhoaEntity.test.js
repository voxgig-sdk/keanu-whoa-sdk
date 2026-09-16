"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('WhoaEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when KEANU_WHOA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('KEANU_WHOA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.KeanuWhoaSDK.test();
        const ent = testsdk.Whoa();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.KEANU_WHOA_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'whoa.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "1080p", "req": false, "short": "URL to 1080p video clip", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "360p", "req": false, "short": "URL to 360p video clip", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "480p", "req": false, "short": "URL to 480p video clip", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "720p", "req": false, "short": "URL to 720p video clip", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "audio", "req": false, "short": "URL to audio clip of the whoa", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "character", "req": false, "short": "Character name that Keanu Reeves played", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "current_whoa_in_movie", "req": false, "short": "The number of this whoa within the movie", "type": "`$INTEGER`", "index$": 6 }, { "active": true, "name": "director", "req": false, "short": "Director of the movie", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "full_line", "req": false, "short": "The full line of dialogue containing the whoa", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "id", "req": false, "short": "Unique identifier for the whoa instance", "type": "`$INTEGER`", "index$": 9 }, { "active": true, "name": "movie", "req": false, "short": "Title of the movie where the whoa was said", "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "movie_duration", "req": false, "short": "Total duration of the movie", "type": "`$STRING`", "index$": 11 }, { "active": true, "name": "poster", "req": false, "short": "URL to movie poster image", "type": "`$STRING`", "index$": 12 }, { "active": true, "name": "timestamp", "req": false, "short": "Timestamp when the whoa occurs in the movie", "type": "`$STRING`", "index$": 13 }, { "active": true, "name": "total_whoas_in_movie", "req": false, "short": "Total number of whoas in the movie", "type": "`$INTEGER`", "index$": 14 }, { "active": true, "name": "video", "req": false, "type": "`$OBJECT`", "index$": 15 }, { "active": true, "name": "whoa_in_movie", "req": false, "short": "Representation of whoa count in the movie (e.g., '1 of 5')", "type": "`$STRING`", "index$": 16 }, { "active": true, "name": "year", "req": false, "short": "Year the movie was released", "type": "`$INTEGER`", "index$": 17 }], "id": { "field": "id", "name": "id" }, "name": "whoa", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /whoas", "json": "{\"operationId\":\"getAllWhoas\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"audio\":{\"description\":\"URL to audio clip of the whoa\",\"type\":\"string\"},\"character\":{\"description\":\"Character name that Keanu Reeves played\",\"type\":\"string\"},\"current_whoa_in_movie\":{\"description\":\"The number of this whoa within the movie\",\"type\":\"integer\"},\"director\":{\"description\":\"Director of the movie\",\"type\":\"string\"},\"full_line\":{\"description\":\"The full line of dialogue containing the whoa\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the whoa instance\",\"type\":\"integer\"},\"movie\":{\"description\":\"Title of the movie where the whoa was said\",\"type\":\"string\"},\"movie_duration\":{\"description\":\"Total duration of the movie\",\"type\":\"string\"},\"poster\":{\"description\":\"URL to movie poster image\",\"type\":\"string\"},\"timestamp\":{\"description\":\"Timestamp when the whoa occurs in the movie\",\"type\":\"string\"},\"total_whoas_in_movie\":{\"description\":\"Total number of whoas in the movie\",\"type\":\"integer\"},\"video\":{\"properties\":{\"1080p\":{\"description\":\"URL to 1080p video clip\",\"type\":\"string\"},\"360p\":{\"description\":\"URL to 360p video clip\",\"type\":\"string\"},\"480p\":{\"description\":\"URL to 480p video clip\",\"type\":\"string\"},\"720p\":{\"description\":\"URL to 720p video clip\",\"type\":\"string\"}},\"type\":\"object\"},\"whoa_in_movie\":{\"description\":\"Representation of whoa count in the movie (e.g., '1 of 5')\",\"type\":\"string\"},\"year\":{\"description\":\"Year the movie was released\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/whoas", "segments": [{ "lit": "whoas" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /whoas/{id}", "json": "{\"operationId\":\"getWhoaById\",\"parameters\":[{\"description\":\"The ID of the whoa instance\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"audio\":{\"description\":\"URL to audio clip of the whoa\",\"type\":\"string\"},\"character\":{\"description\":\"Character name that Keanu Reeves played\",\"type\":\"string\"},\"current_whoa_in_movie\":{\"description\":\"The number of this whoa within the movie\",\"type\":\"integer\"},\"director\":{\"description\":\"Director of the movie\",\"type\":\"string\"},\"full_line\":{\"description\":\"The full line of dialogue containing the whoa\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the whoa instance\",\"type\":\"integer\"},\"movie\":{\"description\":\"Title of the movie where the whoa was said\",\"type\":\"string\"},\"movie_duration\":{\"description\":\"Total duration of the movie\",\"type\":\"string\"},\"poster\":{\"description\":\"URL to movie poster image\",\"type\":\"string\"},\"timestamp\":{\"description\":\"Timestamp when the whoa occurs in the movie\",\"type\":\"string\"},\"total_whoas_in_movie\":{\"description\":\"Total number of whoas in the movie\",\"type\":\"integer\"},\"video\":{\"properties\":{\"1080p\":{\"description\":\"URL to 1080p video clip\",\"type\":\"string\"},\"360p\":{\"description\":\"URL to 360p video clip\",\"type\":\"string\"},\"480p\":{\"description\":\"URL to 480p video clip\",\"type\":\"string\"},\"720p\":{\"description\":\"URL to 720p video clip\",\"type\":\"string\"}},\"type\":\"object\"},\"whoa_in_movie\":{\"description\":\"Representation of whoa count in the movie (e.g., '1 of 5')\",\"type\":\"string\"},\"year\":{\"description\":\"Year the movie was released\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Whoa not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/whoas/{id}", "segments": [{ "lit": "whoas" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body.video`" }, "index$": 0 }, { "active": true, "args": {}, "contract": { "id": "GET /whoas/random", "json": "{\"operationId\":\"getRandomWhoa\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"audio\":{\"description\":\"URL to audio clip of the whoa\",\"type\":\"string\"},\"character\":{\"description\":\"Character name that Keanu Reeves played\",\"type\":\"string\"},\"current_whoa_in_movie\":{\"description\":\"The number of this whoa within the movie\",\"type\":\"integer\"},\"director\":{\"description\":\"Director of the movie\",\"type\":\"string\"},\"full_line\":{\"description\":\"The full line of dialogue containing the whoa\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the whoa instance\",\"type\":\"integer\"},\"movie\":{\"description\":\"Title of the movie where the whoa was said\",\"type\":\"string\"},\"movie_duration\":{\"description\":\"Total duration of the movie\",\"type\":\"string\"},\"poster\":{\"description\":\"URL to movie poster image\",\"type\":\"string\"},\"timestamp\":{\"description\":\"Timestamp when the whoa occurs in the movie\",\"type\":\"string\"},\"total_whoas_in_movie\":{\"description\":\"Total number of whoas in the movie\",\"type\":\"integer\"},\"video\":{\"properties\":{\"1080p\":{\"description\":\"URL to 1080p video clip\",\"type\":\"string\"},\"360p\":{\"description\":\"URL to 360p video clip\",\"type\":\"string\"},\"480p\":{\"description\":\"URL to 480p video clip\",\"type\":\"string\"},\"720p\":{\"description\":\"URL to 720p video clip\",\"type\":\"string\"}},\"type\":\"object\"},\"whoa_in_movie\":{\"description\":\"Representation of whoa count in the movie (e.g., '1 of 5')\",\"type\":\"string\"},\"year\":{\"description\":\"Year the movie was released\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/whoas/random", "segments": [{ "lit": "whoas" }, { "lit": "random" }], "select": { "$action": "random" }, "transform": { "req": "`reqdata`", "res": "`body.video`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "whoa", "name__orig": "whoa", "Name": "Whoa", "name_": "whoa", "name-": "whoa", "NAME": "WHOA", "index$": 0 }, { "active": true, "entity": "whoa", "key$": "BasicWhoaFlow", "kind": "basic", "name": "BasicWhoaFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "whoa_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "whoa_ref01", "srcdatavar": "whoa_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-whoa_ref01" } }], "index$": 1 }] }, 'Whoa');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let whoa_ref01_data = Object.values(setup.data.existing.whoa)[0];
        // LIST
        const whoa_ref01_ent = client.Whoa();
        const whoa_ref01_match = {};
        const whoa_ref01_list = (await whoa_ref01_ent.list(whoa_ref01_match)).map((e) => e.data());
        // LOAD
        const whoa_ref01_match_dt0 = {};
        whoa_ref01_match_dt0.id = whoa_ref01_data.id;
        const whoa_ref01_data_dt0 = (await whoa_ref01_ent.load(whoa_ref01_match_dt0)).data();
        (0, node_assert_1.default)(whoa_ref01_data_dt0.id === whoa_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/whoa/WhoaTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.KeanuWhoaSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['whoa01', 'whoa02', 'whoa03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'KEANU_WHOA_TEST_WHOA_ENTID': idmap,
        'KEANU_WHOA_TEST_LIVE': 'FALSE',
        'KEANU_WHOA_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['KEANU_WHOA_TEST_WHOA_ENTID'];
    const live = 'TRUE' === env.KEANU_WHOA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['KEANU_WHOA_TEST_WHOA_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.KeanuWhoaSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.KEANU_WHOA_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=WhoaEntity.test.js.map