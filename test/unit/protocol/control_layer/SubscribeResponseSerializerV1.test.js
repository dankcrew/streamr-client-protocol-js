import assert from 'assert'

import { ControlLayer } from '../../../../src/index'

const { SubscribeResponse, ControlMessage } = ControlLayer

const VERSION = 1

// Message definitions
const message = new SubscribeResponse(VERSION, null, 'streamId', 0)
const serializedMessage = JSON.stringify([VERSION, SubscribeResponse.TYPE, 'streamId', 0])

describe('SubscribeResponseSerializerV1', () => {
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
