import ControlMessage from '../ControlMessage'

import UnsubscribeResponse from './UnsubscribeResponse'

const VERSION = 2

export default class UnsubscribeResponseSerializerV2 {

    static toArray(unsubscribeResponse) {
        return [
            VERSION,
            UnsubscribeResponse.TYPE,
            unsubscribeResponse.requestId,
            unsubscribeResponse.streamId,
            unsubscribeResponse.streamPartition,
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type,
            requestId,
            streamId,
            streamPartition,
        ] = arr

        return new UnsubscribeResponse(version, requestId, streamId, streamPartition)
    }
}

ControlMessage.registerSerializer(VERSION, UnsubscribeResponse.TYPE, UnsubscribeResponseSerializerV2)