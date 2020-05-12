import ControlMessage from '../ControlMessage'
import MessageRef from '../../message_layer/MessageRef'

import ResendFromRequest from './ResendFromRequest'

const VERSION = 2

export default class ResendFromRequestSerializerV2 {
    static toArray(resendFromRequest) {
        return [
            VERSION,
            ResendFromRequest.TYPE,
            resendFromRequest.requestId,
            resendFromRequest.streamId,
            resendFromRequest.streamPartition,
            resendFromRequest.fromMsgRef.toArray(),
            resendFromRequest.publisherId,
            resendFromRequest.sessionToken,
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            requestId,
            streamId,
            streamPartition,
            fromMsgRefArray,
            publisherId,
            sessionToken,
        ] = arr

        return new ResendFromRequest(version, requestId, streamId, streamPartition, new MessageRef(...fromMsgRefArray), publisherId, sessionToken)
    }
}

ControlMessage.registerSerializer(VERSION, ResendFromRequest.TYPE, ResendFromRequestSerializerV2)
