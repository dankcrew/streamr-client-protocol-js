import ControlMessage from '../ControlMessage'
import StreamMessage from '../../message_layer/StreamMessage'

import UnicastMessage from './UnicastMessage'

import { Serializer } from '../../../Serializer'

const VERSION = 2

export default class UnicastMessageSerializerV2 extends Serializer<UnicastMessage> {
    toArray(unicastMessage: UnicastMessage, streamMessageVersion = StreamMessage.LATEST_VERSION) {
        return [
            VERSION,
            ControlMessage.TYPES.UnicastMessage,
            unicastMessage.requestId,
            StreamMessage.getSerializer(streamMessageVersion).toArray(unicastMessage.streamMessage),
        ]
    }

    fromArray(arr: any[]) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            requestId,
            serializedStreamMsg
        ] = arr

        return new UnicastMessage({
            version, requestId, streamMessage: StreamMessage.deserialize(serializedStreamMsg)
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.UnicastMessage, new UnicastMessageSerializerV2())
