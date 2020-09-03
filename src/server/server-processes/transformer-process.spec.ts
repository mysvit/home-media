import {TransformerProcess} from './transformer-process'

describe('TransformerProcessTest', () => {

    const streamTransformer =
        `{"streams":[{"mediaPath":"c:\\\\temp\\\\home_media\\\\media","fileName":"Ice Age E2011 - 1.mkv"}, {"mediaPath":"c:\\\\temp\\\\home_media\\\\media","fileName":"Ice Age E2011 - 2.mkv"}],"fileName":"Ice Age E2011 - A Mammoth Christmas.mkv"}`

    it('startTransformation', (done) => {
        TransformerProcess.startTransformation(streamTransformer)
            .subscribe(result => {
                done()
                // expect(result).toHaveBeenCalled()
            })
    })

})
