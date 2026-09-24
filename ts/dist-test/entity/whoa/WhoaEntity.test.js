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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "1080p": { "a": true, "h": "1080p", "n": "1080p", "r": false, "sh": "URL to 1080p video clip", "t": "`$STRING`", "key$": "1080p", "index$": 0 }, "360p": { "a": true, "h": "360p", "n": "360p", "r": false, "sh": "URL to 360p video clip", "t": "`$STRING`", "key$": "360p", "index$": 1 }, "480p": { "a": true, "h": "480p", "n": "480p", "r": false, "sh": "URL to 480p video clip", "t": "`$STRING`", "key$": "480p", "index$": 2 }, "720p": { "a": true, "h": "720p", "n": "720p", "r": false, "sh": "URL to 720p video clip", "t": "`$STRING`", "key$": "720p", "index$": 3 }, "audio": { "a": true, "h": "Audio", "n": "audio", "r": false, "sh": "URL to audio clip of the whoa", "t": "`$STRING`", "key$": "audio", "index$": 4 }, "character": { "a": true, "h": "Character", "n": "character", "r": false, "sh": "Character name that Keanu Reeves played", "t": "`$STRING`", "key$": "character", "index$": 5 }, "current_whoa_in_movie": { "a": true, "h": "Current Whoa In Movie", "n": "current_whoa_in_movie", "r": false, "sh": "The number of this whoa within the movie", "t": "`$INTEGER`", "key$": "current_whoa_in_movie", "index$": 6 }, "director": { "a": true, "h": "Director", "n": "director", "r": false, "sh": "Director of the movie", "t": "`$STRING`", "key$": "director", "index$": 7 }, "full_line": { "a": true, "h": "Full Line", "n": "full_line", "r": false, "sh": "The full line of dialogue containing the whoa", "t": "`$STRING`", "key$": "full_line", "index$": 8 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier for the whoa instance", "t": "`$INTEGER`", "key$": "id", "index$": 9 }, "movie": { "a": true, "h": "Movie", "n": "movie", "r": false, "sh": "Title of the movie where the whoa was said", "t": "`$STRING`", "key$": "movie", "index$": 10 }, "movie_duration": { "a": true, "h": "Movie Duration", "n": "movie_duration", "r": false, "sh": "Total duration of the movie", "t": "`$STRING`", "key$": "movie_duration", "index$": 11 }, "poster": { "a": true, "h": "Poster", "n": "poster", "r": false, "sh": "URL to movie poster image", "t": "`$STRING`", "key$": "poster", "index$": 12 }, "timestamp": { "a": true, "h": "Timestamp", "n": "timestamp", "r": false, "sh": "Timestamp when the whoa occurs in the movie", "t": "`$STRING`", "key$": "timestamp", "index$": 13 }, "total_whoas_in_movie": { "a": true, "h": "Total Whoas In Movie", "n": "total_whoas_in_movie", "r": false, "sh": "Total number of whoas in the movie", "t": "`$INTEGER`", "key$": "total_whoas_in_movie", "index$": 14 }, "video": { "a": true, "h": "Video", "n": "video", "r": false, "t": "`$OBJECT`", "key$": "video", "index$": 15 }, "whoa_in_movie": { "a": true, "h": "Whoa In Movie", "n": "whoa_in_movie", "r": false, "sh": "Representation of whoa count in the movie (e.g., '1 of 5')", "t": "`$STRING`", "key$": "whoa_in_movie", "index$": 16 }, "year": { "a": true, "h": "Year", "n": "year", "r": false, "sh": "Year the movie was released", "t": "`$INTEGER`", "key$": "year", "index$": 17 } }, "id": { "field": "id", "name": "id" }, "name": "whoa", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /whoas", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/whoas", "q": {}, "r": {}, "s": [{ "lit": "whoas" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /whoas/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/whoas/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "whoas" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.video`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /whoas/random", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/whoas/random", "q": { "$action": "random" }, "r": {}, "s": [{ "lit": "whoas" }, { "lit": "random" }], "t": { "req": "`reqdata`", "res": "`body.video`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "whoa", "name__orig": "whoa", "Name": "Whoa", "name_": "whoa", "name-": "whoa", "NAME": "WHOA", "index$": 0 }, { "active": true, "entity": "whoa", "key$": "BasicWhoaFlow", "kind": "basic", "name": "BasicWhoaFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "whoa_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "whoa_ref01", "srcdatavar": "whoa_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-whoa_ref01" } }], "index$": 1 }] }, 'Whoa', { "GET /whoas": { "protocol": "http", "operationId": "getAllWhoas", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "id": { "description": "Unique identifier for the whoa instance", "key$": "id", "type": "integer" }, "movie": { "description": "Title of the movie where the whoa was said", "key$": "movie", "type": "string" }, "year": { "description": "Year the movie was released", "key$": "year", "type": "integer" }, "director": { "description": "Director of the movie", "key$": "director", "type": "string" }, "character": { "description": "Character name that Keanu Reeves played", "key$": "character", "type": "string" }, "movie_duration": { "description": "Total duration of the movie", "key$": "movie_duration", "type": "string" }, "timestamp": { "description": "Timestamp when the whoa occurs in the movie", "key$": "timestamp", "type": "string" }, "full_line": { "description": "The full line of dialogue containing the whoa", "key$": "full_line", "type": "string" }, "current_whoa_in_movie": { "description": "The number of this whoa within the movie", "key$": "current_whoa_in_movie", "type": "integer" }, "total_whoas_in_movie": { "description": "Total number of whoas in the movie", "key$": "total_whoas_in_movie", "type": "integer" }, "whoa_in_movie": { "description": "Representation of whoa count in the movie (e.g., '1 of 5')", "key$": "whoa_in_movie", "type": "string" }, "video": { "key$": "video", "properties": { "1080p": { "description": "URL to 1080p video clip", "type": "string", "key$": "1080p" }, "360p": { "description": "URL to 360p video clip", "type": "string", "key$": "360p" }, "480p": { "description": "URL to 480p video clip", "type": "string", "key$": "480p" }, "720p": { "description": "URL to 720p video clip", "type": "string", "key$": "720p" } }, "type": "object", "index$": 0 }, "audio": { "description": "URL to audio clip of the whoa", "key$": "audio", "type": "string" }, "poster": { "description": "URL to movie poster image", "key$": "poster", "type": "string" } }, "x-ref": "#/components/schemas/Whoa", "index$": 0 } } } } } }, "parameters": [], "securitySource": "unspecified" }, "GET /whoas/{id}": { "protocol": "http", "operationId": "getWhoaById", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "description": "Unique identifier for the whoa instance", "key$": "id", "type": "integer" }, "movie": { "description": "Title of the movie where the whoa was said", "key$": "movie", "type": "string" }, "year": { "description": "Year the movie was released", "key$": "year", "type": "integer" }, "director": { "description": "Director of the movie", "key$": "director", "type": "string" }, "character": { "description": "Character name that Keanu Reeves played", "key$": "character", "type": "string" }, "movie_duration": { "description": "Total duration of the movie", "key$": "movie_duration", "type": "string" }, "timestamp": { "description": "Timestamp when the whoa occurs in the movie", "key$": "timestamp", "type": "string" }, "full_line": { "description": "The full line of dialogue containing the whoa", "key$": "full_line", "type": "string" }, "current_whoa_in_movie": { "description": "The number of this whoa within the movie", "key$": "current_whoa_in_movie", "type": "integer" }, "total_whoas_in_movie": { "description": "Total number of whoas in the movie", "key$": "total_whoas_in_movie", "type": "integer" }, "whoa_in_movie": { "description": "Representation of whoa count in the movie (e.g., '1 of 5')", "key$": "whoa_in_movie", "type": "string" }, "video": { "key$": "video", "properties": { "1080p": { "description": "URL to 1080p video clip", "type": "string", "key$": "1080p" }, "360p": { "description": "URL to 360p video clip", "type": "string", "key$": "360p" }, "480p": { "description": "URL to 480p video clip", "type": "string", "key$": "480p" }, "720p": { "description": "URL to 720p video clip", "type": "string", "key$": "720p" } }, "type": "object", "index$": 0 }, "audio": { "description": "URL to audio clip of the whoa", "key$": "audio", "type": "string" }, "poster": { "description": "URL to movie poster image", "key$": "poster", "type": "string" } }, "x-ref": "#/components/schemas/Whoa" } } } }, "404": { "description": "Whoa not found" } }, "parameters": [{ "name": "id", "in": "path", "required": true, "description": "The ID of the whoa instance", "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" }, "GET /whoas/random": { "protocol": "http", "operationId": "getRandomWhoa", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "description": "Unique identifier for the whoa instance", "key$": "id", "type": "integer" }, "movie": { "description": "Title of the movie where the whoa was said", "key$": "movie", "type": "string" }, "year": { "description": "Year the movie was released", "key$": "year", "type": "integer" }, "director": { "description": "Director of the movie", "key$": "director", "type": "string" }, "character": { "description": "Character name that Keanu Reeves played", "key$": "character", "type": "string" }, "movie_duration": { "description": "Total duration of the movie", "key$": "movie_duration", "type": "string" }, "timestamp": { "description": "Timestamp when the whoa occurs in the movie", "key$": "timestamp", "type": "string" }, "full_line": { "description": "The full line of dialogue containing the whoa", "key$": "full_line", "type": "string" }, "current_whoa_in_movie": { "description": "The number of this whoa within the movie", "key$": "current_whoa_in_movie", "type": "integer" }, "total_whoas_in_movie": { "description": "Total number of whoas in the movie", "key$": "total_whoas_in_movie", "type": "integer" }, "whoa_in_movie": { "description": "Representation of whoa count in the movie (e.g., '1 of 5')", "key$": "whoa_in_movie", "type": "string" }, "video": { "key$": "video", "properties": { "1080p": { "description": "URL to 1080p video clip", "type": "string", "key$": "1080p" }, "360p": { "description": "URL to 360p video clip", "type": "string", "key$": "360p" }, "480p": { "description": "URL to 480p video clip", "type": "string", "key$": "480p" }, "720p": { "description": "URL to 720p video clip", "type": "string", "key$": "720p" } }, "type": "object", "index$": 0 }, "audio": { "description": "URL to audio clip of the whoa", "key$": "audio", "type": "string" }, "poster": { "description": "URL to movie poster image", "key$": "poster", "type": "string" } }, "x-ref": "#/components/schemas/Whoa" } } } } }, "parameters": [], "securitySource": "unspecified" } });
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