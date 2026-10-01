"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "whoa",
        "accessor": "Whoa",
        "op": "list",
        "method": "GET",
        "path": "/whoas",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "movie": "x",
                "year": 1,
                "director": "x",
                "character": "x",
                "movie_duration": "x",
                "timestamp": "x",
                "full_line": "x",
                "current_whoa_in_movie": 1,
                "total_whoas_in_movie": 1,
                "whoa_in_movie": "x",
                "video": {
                    "1080p": "x",
                    "360p": "x",
                    "480p": "x",
                    "720p": "x"
                },
                "audio": "x",
                "poster": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "whoa",
        "accessor": "Whoa",
        "op": "load",
        "method": "GET",
        "path": "/whoas/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "movie": "x",
            "year": 1,
            "director": "x",
            "character": "x",
            "movie_duration": "x",
            "timestamp": "x",
            "full_line": "x",
            "current_whoa_in_movie": 1,
            "total_whoas_in_movie": 1,
            "whoa_in_movie": "x",
            "video": {
                "1080p": "x",
                "360p": "x",
                "480p": "x",
                "720p": "x"
            },
            "audio": "x",
            "poster": "x"
        },
        "idField": "id"
    },
    {
        "entity": "whoa",
        "accessor": "Whoa",
        "op": "load",
        "method": "GET",
        "path": "/whoas/random",
        "action": "random",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "movie": "x",
            "year": 1,
            "director": "x",
            "character": "x",
            "movie_duration": "x",
            "timestamp": "x",
            "full_line": "x",
            "current_whoa_in_movie": 1,
            "total_whoas_in_movie": 1,
            "whoa_in_movie": "x",
            "video": {
                "1080p": "x",
                "360p": "x",
                "480p": "x",
                "720p": "x"
            },
            "audio": "x",
            "poster": "x"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map