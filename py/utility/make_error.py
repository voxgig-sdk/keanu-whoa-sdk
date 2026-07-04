# KeanuWhoa SDK utility: make_error

from __future__ import annotations
from core.operation import KeanuWhoaOperation
from core.result import KeanuWhoaResult
from core.control import KeanuWhoaControl
from core.error import KeanuWhoaError


def make_error_util(ctx, err):
    if ctx is None:
        from core.context import KeanuWhoaContext
        ctx = KeanuWhoaContext({}, None)

    op = ctx.op
    if op is None:
        op = KeanuWhoaOperation({})
    opname = op.name
    if opname == "" or opname == "_":
        opname = "unknown operation"

    result = ctx.result
    if result is None:
        result = KeanuWhoaResult({})
    result.ok = False

    if err is None:
        err = result.err
    if err is None:
        err = ctx.make_error("unknown", "unknown error")

    errmsg = ""
    if isinstance(err, KeanuWhoaError):
        errmsg = err.msg
    elif hasattr(err, "msg") and err.msg is not None:
        errmsg = err.msg
    elif isinstance(err, str):
        errmsg = err
    else:
        errmsg = str(err)

    msg = "KeanuWhoaSDK: " + opname + ": " + errmsg
    msg = ctx.utility.clean(ctx, msg)

    result.err = None

    spec = ctx.spec

    if ctx.ctrl.explain is not None:
        ctx.ctrl.explain["err"] = {"message": msg}

    sdk_err = KeanuWhoaError("", msg, ctx)
    sdk_err.result = ctx.utility.clean(ctx, result)
    sdk_err.spec = ctx.utility.clean(ctx, spec)

    if isinstance(err, KeanuWhoaError):
        sdk_err.code = err.code

    ctx.ctrl.err = sdk_err

    if ctx.ctrl.throw_err is False:
        return result.resdata

    raise sdk_err
