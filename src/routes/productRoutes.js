const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer')

const storage = multer.diskStorage({
	destination: function (req,file,cb){
        let folder=path.join(__dirname,'../../public/images/product-image')
		cb(null, folder);
	},
	filename: function(req,file,cb){
        const newFilename='product-'+ Date.now() + path.extname(file.originalname);
		cb(null,newFilename);
	}
})
const uploadFile = multer({storage})
const productsController = require("../controllers/productController");




router.get('/',productsController.index)
router.get('/carrito-de-compras', productsController.productCart);
router.get('/create', productsController.create);
router.post('/create',uploadFile.single('image'), productsController.store);
router.get('/:id', productsController.detail);
router.get('/:id/edit', productsController.edit);
router.put('/:id/edit', productsController.update);
router.post('/:id', productsController.destroy); 



module.exports = router;