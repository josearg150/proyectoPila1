const User = require('../models/Usuario');
const passport = require('passport');

module.exports = class API {
    static async register(req, res) {
        const { name, email, password } = req.body;

        try {
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            res.send({ newUser });
        } catch (err) {
            res.status(400).json({ message: 'El correo ya fue registrado' });
        }

    };

    static login = passport.authenticate("local", {
        successRedirect: "/",
    });

    static async login(req, res) {
        try {
            passport.authenticate('local', { successRedirect: "/" });
        } catch (err) {
            res.status(400).json({ message: 'Ocurrió un error, llame al administrador' });
        }
    };

    static async logout(req, res) {
        req.session.destroy();
    };
}

