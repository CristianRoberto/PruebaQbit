const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const { DB_HOST } = require('../config.js');
const { DB_USER } = require('../config.js');
const { DB_PASSWORD } = require('../config.js');
const { DB_NAME } = require('../config.js');
const { DB_PORT } = require('../config.js');//creo clientePool y me conecto a la base de datos postgrets

const pool = new Pool({
user: DB_USER,
host: DB_HOST,
database: DB_NAME,
password: DB_PASSWORD,
port: DB_PORT,
ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
});

const defectoUsers = async (req, res) => {
res.send('Este es el metodo get por defecto!');
};
//busca de forma general
const getUsers = async (req, res) => {
const response = await pool.query('SELECT * FROM usuarios ORDER BY id ASC');
res.status(200).json(response.rows);
console.log(response.rows);
};

//busca por IdIdentificador
const getUserById = async (req, res) => {
const id = parseInt(req.params.id);
const response = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
res.json(response.rows);
};

//ruta para crear un nuevo usuario y guardarlo en la base de datos.
const createUser = async (req, res) => {
const {nombre, email, contraseña, fecha_registro } = req.body;
const response = await pool.query('INSERT INTO usuarios ( nombre, email, contraseña, fecha_registro) VALUES ($1, $2, $3, $4)', [ nombre, email, contraseña, fecha_registro ]);
res.json({
message: 'Se creo un nuevo usuario',
body: {
user: {nombre, email, contraseña, fecha_registro}
}
})
console.log("se creo el nuevo usuario en la base de datos");
};

//Actualiza Datos por Id
const updateUser = async (req, res) => {
const id = parseInt(req.params.id);
const { nombre, email, contraseña, fecha_registro } = req.body;
const response = await pool.query('UPDATE usuarios SET id = $1, nombre = $2, email = $3, contraseña = $4, fecha_registro = $5 WHERE id = $1', [
id,
nombre, 
email, 
contraseña, 
fecha_registro
]);
res.json({
message: 'Se  modifico el usuario',
body: {
user: {nombre, email, contraseña, fecha_registro}
}
})
};

//Elimina Datos por Id
const deleteUser = async (req, res) => {
const id = parseInt(req.params.id);
await pool.query('DELETE FROM usuarios where id = $1', [
id
]);
res.json(`Usuario ${id} eliminado Correctamente`);
};

///////////////////////////////////////////////////
///////////////////////////////////////////////////
//////////////////Controler Productos//////////////

//Busca y muestra de forma general los datos de la tabla Productos
const getProducto = async (req, res) => {
const response = await pool.query('SELECT * FROM productos ORDER BY id ASC');
res.status(200).json(response.rows);
console.log(response.rows);     
};


//Busca por Id Identificador datos de la tabla Productos
const getProductoById = async (req, res) => {
const id = parseInt(req.params.id);
const response = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
res.json(response.rows);
};

//Crea Un nuevo Producto
const createProducto = async (req, res) => {
const { nombre, descripcion, precio, stock, foto, fecha_creacion, id_usuario } = req.body;
const response = await pool.query('INSERT INTO productos (  nombre, descripcion, precio, stock, foto, fecha_creacion, id_usuario ) VALUES ($1,$2,$3,$4,$5,$6,$7)', [  nombre, descripcion, precio, stock, foto, fecha_creacion, id_usuario  ]);
res.json({
message: 'Se registro producto',
body: {
user: {  nombre, descripcion, precio, stock, foto, fecha_creacion, id_usuario }
}
})
console.log("Se Registro un Nuevo Producto ");
};

//Actualiza un Producto Existente
const updateProducto = async (req, res) => {
const id = parseInt(req.params.id);
const { nombre, descripcion, precio, stock, foto, fecha_creacion, id_usuario } = req.body;
const response =await pool.query('UPDATE productos SET id = $1, nombre = $2, descripcion = $3, precio = $4, stock = $5, foto = $6 , fecha_creacion = $7, id_usuario = $8 WHERE id = $1', [
id,
nombre, 
descripcion, 
precio, 
stock, 
foto, 
fecha_creacion, 
id_usuario       
]);
res.json('Se actualizaron correctamente los datos del Producto');
};

//elimina Producto Existente
const deleteProducto = async (req, res) => {
const id = parseInt(req.params.id);
await pool.query('DELETE FROM productos where id = $1', [
id
]);
res.json(`Producto #${id} eliminado Correctamente`);
};

module.exports = {
defectoUsers,
getUsers,
getUserById,
createUser,
updateUser,
deleteUser,
getProducto,
getProductoById,
createProducto,
updateProducto,
deleteProducto
};