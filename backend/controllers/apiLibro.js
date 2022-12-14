const Libro = require('../models/Libro');
const fs = require('fs');

module.exports = class API {
    static async  obtenerLibros(req, res) {
        try {
            const libros = await Libro.find();
            res.status(200).json(libros);
        } catch (err) {
            res.send(404).json({ message: err.message });
        }
    }

    static async  getLibroID(req, res) {
        const id = req.params.id;
        try {
            const libro = await Libro.findById(id);
            res.status(200).json(libro);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async  createLibro(req, res) {
        const libro = req.body;
        const imagename = req.file.filename;
        libro.image = imagename;
        try {
            await Libro.create(libro);
            res.status(201).json({ message: 'Libro creado' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    static async  updateLibro(req, res) {
        const id = req.params.id;
        let new_image = '';
        if (req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync('./imagenes/' + req.body.old_image)
            } catch (err) {
                console.log(err);
            }
        } else {
            new_image = req.body.old_image;
        }
        
        const newLibro = req.body;
        newLibro.image = new_image;

        try {
            await Libro.findByIdAndUpdate(id, newLibro);
            res.status(200).json({ message: 'Libro actualizado' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async  deleteLibro(req, res) {
        const id = req.params.id;

        try {
            const result = await Libro.findByIdAndDelete(id);
            if (result.image != '') {
                try {
                    fs.unlinkSync('./imagenes/' + result.image);
                } catch (err) {
                    console.log(err);
                }
            }
            res.status(200).json({ message: 'El libro se eliminó' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
}