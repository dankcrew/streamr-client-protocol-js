import assert from 'assert'

import { ControlLayer } from '../../../../src/index'

const { ResendResponseResent, ControlMessage } = ControlLayer

const VERSION = 2

// Message definitions
const message = new ResendResponseResent(VERSION, 'requestId', 'streamId', 0)
const serializedMessage = JSON.stringify([VERSION, ResendResponseResent.TYPE, 'requestId', 'streamId', 0])

describe('ResendResponseResentSerializerV2', () => {
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
