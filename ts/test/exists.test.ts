
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { KeanuWhoaSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = KeanuWhoaSDK.test()
    equal(testsdk instanceof KeanuWhoaSDK, true,
      'KeanuWhoaSDK.test() must return a client synchronously')
  })

})
