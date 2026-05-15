# ProjectName SDK exists test

import pytest
from keanuwhoa_sdk import KeanuWhoaSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = KeanuWhoaSDK.test(None, None)
        assert testsdk is not None
