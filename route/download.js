const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')

async function downloadImage(url) {
    const ur = url
    const path = Path.resolve(__dirname, 'media', 'video.mp4')
    const writer = Fs.createWriteStream(path)
    console.log("success")
        // const response = await Axios({
        //     ur,
        //     method: 'GET',
        //     responseType: 'stream'
        // })
        // cbk(true, "successs")
        // response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
}
module.exports = downloadImage;