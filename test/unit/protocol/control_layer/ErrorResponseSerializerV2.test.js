import assert from 'assert'

import ErrorResponseSerializerV2 from '../../../../src/protocol/control_layer/error_response/ErrorResponseSerializerV2'
import ErrorResponse from '../../../../src/protocol/control_layer/error_response/ErrorResponse'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'

const VERSION = 2

// Message definitions
const message = new ErrorResponse(VERSION, 'requestId', 'error message', 'ERROR_CODE')
const serializedMessage = JSON.stringify([VERSION, ErrorResponse.TYPE, 'requestId', 'error message', 'ERROR_CODE'])

describe('ErrorResponseSerializerV2', () => {

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