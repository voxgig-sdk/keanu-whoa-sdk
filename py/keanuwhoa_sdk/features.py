# KeanuWhoa SDK feature factory

from keanuwhoa_sdk.feature.base_feature import KeanuWhoaBaseFeature
from keanuwhoa_sdk.feature.ratelimit_feature import KeanuWhoaRatelimitFeature
from keanuwhoa_sdk.feature.retry_feature import KeanuWhoaRetryFeature
from keanuwhoa_sdk.feature.test_feature import KeanuWhoaTestFeature
from keanuwhoa_sdk.feature.timeout_feature import KeanuWhoaTimeoutFeature


_FEATURES = {
    "base": lambda: KeanuWhoaBaseFeature(),
    "ratelimit": lambda: KeanuWhoaRatelimitFeature(),
    "retry": lambda: KeanuWhoaRetryFeature(),
    "test": lambda: KeanuWhoaTestFeature(),
    "timeout": lambda: KeanuWhoaTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
