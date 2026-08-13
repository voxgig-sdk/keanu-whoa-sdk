# KeanuWhoa SDK utility: make_context

from projectname_sdk.core.context import KeanuWhoaContext


def make_context_util(ctxmap, basectx):
    return KeanuWhoaContext(ctxmap, basectx)
