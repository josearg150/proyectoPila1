const connect = require("../app");
const { MongoClient } = require("mongodb");
describe("Pruebas para BD", () => {
    let connection;
    let db = null;
    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db(process.env.__MONGO_DB_NAME__);
    });
    test("Prueba insertar elementos", async () => {
        const posts = db.collection("posts");
        let id = Math.floor(Math.random() * 101);
        const mockPost = {
            _id: id,
            title: "Titulo prueba",
            autor: "Autor prueba",
            category: "Pruebas",
            content: "Descripcion prueba",
        };
        await posts.insertOne(mockPost);

        const insertedPost = await posts.findOne({ _id: id });
        expect(insertedPost).toEqual(mockPost);
    });
    test("Prueba duplicado", async () => {
        const posts = db.collection("posts");
        let id = Math.floor(Math.random() * 101);
        const mockPost = {
            _id: id,
            title: "Titulo prueba",
            autor: "Autor prueba",
            category: "Pruebas",
            content: "Descripcion prueba",
        };
        const prueba = {
            _id: id,
            title: "Titulo prueba",
            autor: "Autor prueba",
            category: "Pruebas",
            content: "Descripcion prueba",
        };
        await posts.insertOne(mockPost);

        const insertedPost = await posts.findOne({ _id: id });
        expect(insertedPost).toEqual(prueba);
    });

    test("Pruebas para usuarios", async () => {
        const users = db.collection("users");
        let id = Math.floor(Math.random() * 101);
        const mockUser = {
            _id: id,
            name: "Prueba",
            email: "Prueba@correo.com",
            password: "12341234",
        };
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({ _id: id });
        expect(insertedUser).toEqual(mockUser);
    });
    test("Prueba duplicado", async () => {
        const users = db.collection("users");
        let id = Math.floor(Math.random() * 101);
        const mockUser = {
            _id: id,
            name: "Prueba",
            email: "Prueba@correo.com",
            password: "12341234",
        };
        const prueba = {
            _id: id,
            name: "Prueba usuario mal",
            email: "Prueba@correo.com",
            password: "12341234",
        };
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({ _id: id });
        expect(insertedUser).toEqual(prueba);
    });
    afterAll(async () => {
        await connection.close();
    });
});