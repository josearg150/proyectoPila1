// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const serveStatic = require('serve-static');
require('./controllers/passport');

const router = express.Router();
const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("imagenes"));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conexion exitosa a la base de datos'))
    .catch(err => console.log(err));

app.use('/api/post', require('./routes/libro.routes'));
app.use('/api/user', require('./routes/usuarios.routes'));
app.use('/api/rating',require('./routes/ratings.routes'));
app.get('/api/current_user', async (req, res) => {
    if (req.user) {
        res.send({ current_user: req.user });
    }
});

app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));