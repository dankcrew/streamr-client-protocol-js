import assert from 'assert'

import { MessageLayer } from '../../../../src/index'

const { StreamMessage, MessageRef, MessageIDStrict } = MessageLayer

const VERSION = 31

const content = {
    hello: 'world',
}

// Message definitions
const message = new StreamMessage(
    new MessageIDStrict('streamId', 0, 1564046332168, 10, 'publisherId', 'msgChainId'),
    new MessageRef(1564046132168, 5),
    JSON.stringify(content),
    StreamMessage.CONTENT_TYPES.MESSAGE,
    StreamMessage.ENCRYPTION_TYPES.NONE,
    StreamMessage.SIGNATURE_TYPES.ETH,
    'signature',
)
const serializedMessage = JSON.stringify([
    VERSION,
    ['streamId', 0, 1564046332168, 10, 'publisherId', 'msgChainId'],
    [1564046132168, 5],
    StreamMessage.CONTENT_TYPES.MESSAGE,
    StreamMessage.ENCRYPTION_TYPES.NONE,
    JSON.stringify(content),
    StreamMessage.SIGNATURE_TYPES.ETH,
    'signature'
])

describe('StreamMessageSerializerV31', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            assert.deepStrictEqual(StreamMessage.deserialize(serializedMessage), message)
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages', () => {
            assert.deepStrictEqual(message.serialize(VERSION), serializedMessage)
        })
    })
})