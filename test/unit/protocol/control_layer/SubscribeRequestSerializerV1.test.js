import assert from 'assert'

import { ControlLayer } from '../../../../src/index'

const { SubscribeRequest, ControlMessage } = ControlLayer

const VERSION = 1

// Message definitions
const message = new SubscribeRequest(VERSION, null, 'streamId', 0, 'sessionToken')
const serializedMessage = JSON.stringify([VERSION, SubscribeRequest.TYPE, 'streamId', 0, 'sessionToken'])

describe('SubscribeRequestSerializerV1', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            assert.deepStrictEqual(ControlMessage.deserialize(serializedMessage), message)
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages', () => {
            assert.deepStrictEqual(message.serialize(VERSION), serializedMessage)
        })
    })
})
