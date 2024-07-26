const express = require('express'); 
const app = express(); 

const { connectToMongoDB, disconnectToMongoDB } = require('./src/mongodb');

app.use(express.json());

app.use((req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf');
    next();
});

// definir la ruta GET 
app.get('/', (req, res) => {
    res.status(200).end("hola");
});

// obtener todos los muebles
app.get('/mobiliario', async (req, res) => {
    const client = await connectToMongoDB();
    if (!client) {
        res.status(500).send("error client");
        return;
    };

    const db = client.db('untref-json-files-main');
    const mobiliario = await db.collection('mobiliario').find().toArray();

    await disconnectToMongoDB()

    res.json(mobiliario);
});

// obtener un mueble
app.get('/mobiliario/:id', async (req, res) => {
    const mobiliarioId = parseInt(req.params.id) || 0; // convertir el ID del parámetro de la URL a un número entero

    const client = await connectToMongoDB();
    if (!client) {
        res.status(500).send("error client");
        return;
    };

    const db = client.db('untref-json-files-main');
    const mueble = await db.collection('mobiliario').findOne({ id: mobiliarioId });

    await disconnectToMongoDB()

    !mueble ? res.status(404).send("No existe ese mueble") : res.json(mueble);
});

// filtrar muebles por nombre parcial
app.get('/mobiliario/nombre/:nombre', async (req, res) => {
    const nombre = req.params.nombre || '';

    const client = await connectToMongoDB();
    if (!client) {
        res.status(500).send("error client");
        return;
    };

    const db = client.db('untref-json-files-main');
    const nombreMuebles = await db
        .collection('mobiliario')
        .find({ nombre: { $regex: nombre, $options: 'i' } })
        .toArray();

    await disconnectToMongoDB();

    !nombreMuebles ? res.status(404).send("No se encontraron muebles") : res.json(nombreMuebles);
});

// agregar un nuevo mueble
app.post('/mobiliario', async (req, res) => {
    const nuevoMueble = req.body;

    nuevoMueble.id = Math.floor(Math.random() * 10000);

    if (Object.keys(nuevoMueble).length === 0) {
        res.status(422).send("Error en el formato de los datos")
    }

    const client = await connectToMongoDB();
    if (!client) {
        res.status(500).send("error client");
        return;
    };

    const collection = client.db('untref-json-files-main').collection('mobiliario');
    collection
        .insertOne(nuevoMueble)
        .then(response => res.status(201).json(nuevoMueble))
        .catch(error => res.status(500).send("error al crear el registro"))
        .finally(async () => { await disconnectToMongoDB() });
});

// modificar el precio de un mueble
app.patch('/mobiliario/:id', async (req, res) => {
    const id = parseInt(req.params.id) || 0;
    const precioNuevo = req.body;
    // console.log(id, precioNuevo);

    if (Object.keys(precioNuevo).length === 0) {
        res.status(422).send("error en el formato de los datos");
        return;
    }

    const client = await connectToMongoDB();
    if (!client) {
        res.status(500).send("error client");
        return;
    }

    const collection = client.db('untref-json-files-main').collection('mobiliario');
    collection
        .updateOne({ id }, { $set: precioNuevo })
        .then((response) => res.status(200).json(precioNuevo))
        .catch((error) => res.status(500).send("error al actualizar el registro"))
        .finally(async () => {
            await disconnectToMongoDB();
        });
});

// eliminar un mueble de la lista
app.delete("/mobiliario/:id", async (req, res) => {
    const id = parseInt(req.params.id) || 0;

    if (!req.params.id) {
        res.status(422).send("Error en el formato de los datos");
        return;
    }

    const client = await connectToMongoDB();
    if (!client) {
        res.status(500).send("Error client");
        return;
    }

    const collection = client.db('untref-json-files-main').collection('mobiliario');
    collection
        .deleteOne({ id })
        .then((response) => {
            if (response.deletedCount === 0) {
                res.status(404).send(`No existe el registro con ID: ${id}`);
            } else {
                res.status(202).send("Registro eliminado");
            }
        })
        .catch((error) => res.status(500).send("Error al borrar el registro"))
        .finally(async () => {
            await disconnectToMongoDB();
        });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));