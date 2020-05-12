import assert from 'assert'

import { ControlLayer, MessageLayer } from '../../../../src/index'

const { MessageRef } = MessageLayer
const { ResendRangeRequest, ControlMessage } = ControlLayer

const VERSION = 1

// Message definitions
const message = new ResendRangeRequest(VERSION,
    'requestId', 'streamId', 0, new MessageRef(132846894, 0),
    new MessageRef(132847000, 0), 'publisherId', 'msgChainId', 'sessionToken')

const serializedMessage = JSON.stringify([VERSION, ResendRangeRequest.TYPE, 'streamId', 0, 'requestId', [132846894, 0], [132847000, 0], 'publisherId', 'msgChainId', 'sessionToken'])

describe('ResendRangeRequestSerializerV1', () => {
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
