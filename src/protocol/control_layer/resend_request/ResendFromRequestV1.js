import { validateIsString, validateIsNotEmptyString, validateIsNotNegativeInteger } from '../../../utils/validations'
import ControlMessage from '../ControlMessage'
import MessageRef from '../../message_layer/MessageRef'
import ResendFromRequest from './ResendFromRequest'

const VERSION = 1

export default class ResendFromRequestV1 extends ResendFromRequest {
    constructor(streamId, streamPartition, subId, msgRefArgsArray, publisherId, msgChainId, sessionToken) {
        super(VERSION)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)
        validateIsNotEmptyString('subId', subId)
        validateIsString('publisherId', publisherId, true)
        validateIsString('msgChainId', msgChainId, true)
        validateIsString('sessionToken', sessionToken, true)

        this.streamId = streamId
        this.streamPartition = streamPartition
        this.subId = subId
        this.fromMsgRef = new MessageRef(...msgRefArgsArray)
        this.publisherId = publisherId
        this.msgChainId = msgChainId
        this.sessionToken = sessionToken
    }

    toArray(messageLayerVersion) {
        const array = super.toArray()
        array.push(...[
            this.streamId,
            this.streamPartition,
            this.subId,
            JSON.parse(this.fromMsgRef.serialize(messageLayerVersion)),
            this.publisherId,
            this.msgChainId,
            this.sessionToken,
        ])
        return array
    }

    serialize(messageLayerVersion) {
        return JSON.stringify(this.toArray(messageLayerVersion))
    }
}

ControlMessage.registerClass(VERSION, ResendFromRequest.TYPE, ResendFromRequestV1)
