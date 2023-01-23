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

const getFileList = async (category, productId) => {
  try {
    await b2.authorize();
    const result = await b2.listFileNames({
      bucketId: process.env.BACKBLAZE_BUCKET_ID,
      prefix: `${category}/${productId}`
    })

    const files = result.data?.files;
    const array = [];
    const data = { length: files.length, names: []};
    
    for (i = 0; i < files.length; i++) {
      array.push(files[i].fileName)
    }
    data.names = array;

    return data;
  } catch (e) {
    throw Error(e);
  }
}

const backBlaze = {
  uploadFiles,
  getFileList,
}

module.exports = backBlaze;
