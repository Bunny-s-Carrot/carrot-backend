const B2 = require('backblaze-b2');
require('dotenv').config();

const b2 = new B2({
  applicationKey: process.env.BACKBLAZE_APP_KEY,
  applicationKeyId: process.env.BACKBLAZE_APP_KEY_ID,
})

const uploadFiles = async (fileName, data) => {
  try {
    await b2.authorize();
    b2.getUploadUrl({
        bucketId: process.env.BACKBLAZE_BUCKET_ID
      }).then((res) => {
        b2.uploadFile({
          uploadUrl: res.data?.uploadUrl,
          uploadAuthToken: res.data?.authorizationToken,
          fileName: fileName,
          data,
          onUploadProgress: (e) => { console.log(e) }
        })
      })
    
  } catch (e) {
    console.log(e);
  }
}

const backBlaze = {
  uploadFiles,
}

module.exports = backBlaze;

