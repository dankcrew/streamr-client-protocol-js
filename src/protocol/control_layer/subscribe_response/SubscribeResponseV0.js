import StreamAndPartition from '../StreamAndPartition'
import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import ControlMessage from '../ControlMessage'
import SubscribeResponse from './SubscribeResponse'
import SubscribeResponseV1 from './SubscribeResponseV1'

const VERSION = 0

export default class SubscribeResponseV0 extends SubscribeResponse {
    constructor(streamId, streamPartition) {
        super(VERSION)
        this.payload = new StreamAndPartition(streamId, streamPartition)
    }

    toArray() {
        const array = super.toArray()
        array.push(...[
            null, // subId
            this.payload.toObject(),
        ])
        return array
    }

    toOtherVersion(version) {
        if (version === 1) {
            return new SubscribeResponseV1(this.payload.streamId, this.payload.streamPartition)
        }
        throw new UnsupportedVersionError(version, 'Supported versions: [0, 1]')
    }

    static getConstructorArgs(array) {
        const streamPartitionObject = array[1] // index 0 is the null subId
        const payload = StreamAndPartition.deserialize(streamPartitionObject)
        return [payload.streamId, payload.streamPartition]
    }
}

ControlMessage.registerClass(VERSION, SubscribeResponse.TYPE, SubscribeResponseV0)