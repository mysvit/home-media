import {TransformerProcess} from './transformer-process'

describe('TransformerProcessTest', () => {

    const streamTransformer =
        `{"streams":[{"mediaPath":"c:\\\\temp\\\\home_media\\\\media","fileName":"Ice Age E2011 - A Mammoth Christmas.mkv","sourceStream":{"id":"d890ea81-f82c-40e8-a7ca-87c66fd10715","map_id":0,"codec_name":"hevc","codec_type":"video","checked":false},"outStreams":[{"id":"d0b98896-6b26-4645-abb3-5b8db8b28c62","codec_type":"video","codec_name":"hevc"}]},{"mediaPath":"c:\\\\temp\\\\home_media\\\\media","fileName":"Ice Age E2011 - A Mammoth Christmas.mkv","sourceStream":{"id":"2c4042de-46aa-4ad9-93a9-77523bb9464a","map_id":3,"codec_name":"dts","codec_type":"audio","checked":false},"outStreams":[{"id":"47147650-fcd2-4a06-b899-7410d3937c0a","codec_type":"audio","codec_name":"dts"}]}],"fileName":"Ice Age E2011 - A Mammoth Christmas.mkv"}`

    it('startTransformation', (done) => {
        TransformerProcess.startTransformation(streamTransformer)
            .subscribe(result => {
                done()
                // expect(result).toHaveBeenCalled()
            })
    })

})
