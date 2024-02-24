const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
    destination : (request,file,cb) => { 
        cb(null,"./public/images/"); 
    },
    filename : (request,file,cb) => {
        cb(null,path.parse(file.originalname).name + "-" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage : storage
});

module.exports.upload = upload;