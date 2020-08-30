import {TransformerProcess} from './transformer-process'

describe('TransformerProcessTest', () => {

    const streamTransformer = JSON.parse(
        `{
            "streams": [
                {
                    "mediaPath": "c:\\temp\\home_media\\media",
                    "fileName": "Ice Age E2011 - A Mammoth Christmas.mkv",
                    "sourceStream": {
                        "id": "69c801f5-b254-4da6-a4ab-fbf97cdb9df1",
                        "map_id": 0,
                        "codec_name": "hevc",
                        "codec_type": "video",
                        "checked": false
                    },
                    "outStreams": [
                        {
                            "id": "93092ce3-b56e-479f-a891-0a43a1ad23b3",
                            "codec_type": "video",
                            "codec_name": "hevc"
                        }
                    ]
                },
                {
                    "mediaPath": "c:\\temp\\home_media\\media",
                    "fileName": "Ice Age E2011 - A Mammoth Christmas.mkv",
                    "sourceStream": {
                        "id": "5b58b7d5-9f1a-4471-85ac-8c36735a5662",
                        "map_id": 3,
                        "codec_name": "dts",
                        "codec_type": "audio",
                        "checked": false
                    },
                    "outStreams": [
                        {
                            "id": "a54293ab-0b64-4351-a58f-ddbb39287e64",
                            "codec_type": "audio",
                            "codec_name": "dts"
                        },
                        {
                            "codec_type": "audio",
                            "codec_name": "ac3"
                        }
                    ]
                },
                {
                    "mediaPath": "c:\\temp\\home_media\\media",
                    "fileName": "Ice Age E2011 - A Mammoth Christmas.mkv",
                    "sourceStream": {
                        "id": "e42a4d79-949d-405a-849f-315833eab029",
                        "map_id": 4,
                        "codec_name": "subrip",
                        "codec_type": "subtitle",
                        "checked": false
                    },
                    "outStreams": [
                        {
                            "id": "1d1fd8bc-e11b-4bba-ba58-ca27a13c4f53",
                            "codec_type": "subtitle",
                            "codec_name": "subrip"
                        }
                    ]
                }
            ],
            "fileName": "Ice Age E2011 - A Mammoth Christmas.mkv"
        }`
    )

    beforeAll(() => {
    })

    it('startTransformation', () => {
        TransformerProcess.startTransformation(streamTransformer)
            .subscribe(result => {
                expect(result).toHaveBeenCalled()
            })
    })

})
