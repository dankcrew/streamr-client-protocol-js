import StreamMessage from './StreamMessage'
import MessageRef from './MessageRef'
import MessageIDStrict from './MessageIDStrict'

const VERSION = 32

export default class StreamMessageSerializerV32 {
    static toArray(streamMessage) {
        return [
            VERSION,
            streamMessage.messageId.toArray(),
            streamMessage.prevMsgRef ? streamMessage.prevMsgRef.toArray() : null,
            streamMessage.messageType,
            streamMessage.contentType,
            streamMessage.encryptionType,
            streamMessage.groupKeyId,
            streamMessage.serializedContent,
            streamMessage.signatureType,
            streamMessage.signature,
        ]
    }

    static fromArray(arr) {
        const [
            version, // eslint-disable-line no-unused-vars
            messageIdArr,
            prevMsgRefArr,
            messageType,
            contentType,
            encryptionType,
            groupKeyId,
            serializedContent,
            signatureType,
            signature,
        ] = arr

        return new StreamMessage({
            messageId: MessageIDStrict.fromArray(messageIdArr),
            prevMsgRef: prevMsgRefArr ? MessageRef.fromArray(prevMsgRefArr) : null,
            content: serializedContent,
            messageType,
            contentType,
            encryptionType,
            groupKeyId,
            signatureType,
            signature,
        })
    }
}

StreamMessage.registerSerializer(VERSION, StreamMessageSerializerV32)