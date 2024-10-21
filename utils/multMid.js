const multer  = require('multer')



const upload = multer({ dest: 'uploads/',  limits: {
    fieldSize: 1024 * 1024 * 10,    // size limit is 10mb
  } })    // destination set for uploaded files 

const multMid = upload.single('image') 





module.exports = multMid