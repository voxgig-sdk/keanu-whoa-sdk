
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { KeanuWhoaSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await KeanuWhoaSDK.test()
    equal(null !== testsdk, true)
  })

})
