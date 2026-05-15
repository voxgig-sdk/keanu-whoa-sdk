# KeanuWhoa SDK utility: make_context

from core.context import KeanuWhoaContext


def make_context_util(ctxmap, basectx):
    return KeanuWhoaContext(ctxmap, basectx)
