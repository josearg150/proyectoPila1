const express = require('express');
const router = express.Router();
const API = require('../controllers/apiLibro');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'imagenes');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

let upload = multer({
    storage: storage,
}).single("image");

router.get('/', API. obtenerLibros);
router.get('/:id', API. getLibroID);
router.post('/', upload, API. createLibro);
router.patch('/:id', upload, API. updateLibro);
router.delete('/:id', API. deleteLibro);

module.exports = router;