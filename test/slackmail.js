/*
 * Copyright (c) 2019, Hugo Freire <hugo@exec.sh>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

const { readFileSync } = require('fs')
const { join } = require('path')

describe('Slackmail', () => {
  let subject
  let IncomingWebhook

  beforeAll(() => {
    subject = require('../src/slackmail')

    IncomingWebhook = require('@slack/client').IncomingWebhook
    jest.mock('@slack/client')
  })

  describe('when exporting and loading slackmail', () => {
    it('should create a slackmail with send function', () => {
      expect(subject.send).toBeInstanceOf(Function)
    })
  })

  describe('when sending', () => {
    const email = readFileSync(join(__dirname, './email.eml')).toString()
    const url = 'my-url'
    const username = 'my-username'
    const channel = 'my-channel'

    beforeEach(async () => {
      await subject.send(email, url, username, channel)
    })

    it('should send slack message', () => {
      expect(IncomingWebhook.prototype.send).toHaveBeenCalledTimes(1)
    })
  })
})
