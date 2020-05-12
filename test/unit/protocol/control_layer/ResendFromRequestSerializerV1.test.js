import assert from 'assert'

import MessageRef from '../../../../src/protocol/message_layer/MessageRef'
import { ControlLayer } from '../../../../src/index'

const { ResendFromRequest, ControlMessage } = ControlLayer

const VERSION = 1

// Message definitions
const message = new ResendFromRequest(VERSION, 'requestId', 'streamId', 0,
    new MessageRef(132846894, 0), 'publisherId', 'sessionToken')

const serializedMessage = JSON.stringify([VERSION, ResendFromRequest.TYPE, 'streamId', 0, 'requestId', [132846894, 0], 'publisherId', null, 'sessionToken'])

describe('ResendFromRequestSerializerV1', () => {
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
