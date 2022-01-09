const fs = require('fs');
const path = require('path');


// ESTO SERIA EL GESTOR DEL MODELO
const jsonDB = require('../model/jsonDatabase');

// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const productModel = jsonDB('products');

const productController = {
    index : (req, res)=>{
        // muestra todos los productos en '/products'
        const products=productModel.all();
        res.render('products/products',{products});
    },
    productCart : (req, res)=>{
        res.render('products/productCart');
    },
    detail : (req, res)=>{
        // se busca por id el producto del cual se mostrara los detalles 
        let productDetail=productModel.find(req.params.id);
        res.render('products/productDetail',{productDetail});
    },
    create : (req, res)=>{
        res.render('products/productCreate');
    },
    store : (req, res)=>{
        // se obtiene valores del form para crear un nuevo producto
        if(req.file){
			let creado={
			name:req.body.name,
			description: req.body.description,
            category: req.body.category,
            size: req.body.size,
            quantity: req.body.quantity,
            colour: req.body.colour,
			price: req.body.price,
			discount: req.body.discount,
			image: req.file.filename,
            condition: req.body.condition
		}
        //se llama al metodo que crea un nuevo producto
		productModel.create(creado);
		res.redirect('/products/'+creado.id);
		}else{
			res.redirect('/products');
		}
    },
    edit : (req, res)=>{
        //se busca el producto a editar con el id
        let productToEdit=productModel.find(req.params.id);
        
        res.render('products/productEdit',{productToEdit});
    }, 
    update:(req,res)=>{
        // se busca segun id el producto que se desea moficar
        let productToUpdate=productModel.find(req.params.id);
        // del form se obtienen los valores modificados, menos id ni imagen del producto
        let modificado={
            name:req.body.name,
			description: req.body.description,
            category: req.body.category,
            size: req.body.size,
            quantity: req.body.quantity,
            colour: req.body.colour,
			price: req.body.price,
			discount: req.body.discount,
			image: req.file.filename,
            condition: req.body.condition
        }
        // se llama al metodo que realiza la modificacion
        productModel.update(modificado);
        res.render(creado.name + 'fue editado')
        
        res.redirect('/products')
    },

    destroy:(req, res)=>{
        //se busca segun id el producto a eliminar 
        let toDelete=productModel.find(req.params.id);
        //se llama al metodo que elimina y tambien se elimina la imagen para no tener archivos "basura" que ocupen memoria
        productModel.delete(req.params.id)
        let imagePath = path.join(__dirname, '../../public/images/products/' + toDelete.image);
		if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath)
        }

		res.redirect('/');
    },
}

module.exports = productController;