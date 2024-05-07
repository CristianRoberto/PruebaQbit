const { Router } = require('express');
const router = Router();
const { defectoUsers, getUsers, getUserById, createUser, updateUser, deleteUser,
        getProductoById, getProducto, createProducto, updateProducto, deleteProducto      
      } = require('../controllers/index.controller');

//router usuarios
router.get('/', defectoUsers);
router.get('/usuario', getUsers);
router.get('/usuario/:id', getUserById);
router.post('/usuario', createUser);
router.put('/usuario/:id', updateUser)
router.delete('/usuario/:id', deleteUser);

//router Producto
router.get('/producto', getProducto);
router.get('/producto/:id', getProductoById);
router.post('/producto', createProducto);
router.put('/producto/:id', updateProducto)
router.delete('/producto/:id', deleteProducto);

module.exports = router;