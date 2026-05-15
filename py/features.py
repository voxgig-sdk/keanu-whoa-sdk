# KeanuWhoa SDK feature factory

from feature.base_feature import KeanuWhoaBaseFeature
from feature.test_feature import KeanuWhoaTestFeature


def _make_feature(name):
    features = {
        "base": lambda: KeanuWhoaBaseFeature(),
        "test": lambda: KeanuWhoaTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
