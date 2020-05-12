import assert from 'assert'

import { ControlLayer } from '../../../../src/index'

const { UnsubscribeRequest, ControlMessage } = ControlLayer

const VERSION = 1

// Message definitions
const message = new UnsubscribeRequest(VERSION, null, 'streamId', 0)
const serializedMessage = JSON.stringify([VERSION, UnsubscribeRequest.TYPE, 'streamId', 0])

describe('UnsubscribeRequestSerializerV1', () => {
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
