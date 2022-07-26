import Archivo from '../archivo.js';

export default class Productos{
	constructor(){
		this.managerProductos = new Archivo('./src/files/productos.txt');
	}

	getAllProducts = async() => {
		let products = await this.managerProductos.read();
		return products;
	}

	getProductById = async(id) => {
		let products = await this.managerProductos.read();
		let product = products.filter(obj => obj.id === parseInt(id));
		if(product.length == 0) return null;
		return product[0];
	}

	save = async(product) => {
		await this.managerProductos.save(product);
	}

	getNextId = async() => {
		let products = await this.managerProductos.read();
		let maxId = (products.length > 0) ? Math.max(...products.map(item => item.id)) : 0;
		return ++maxId;
	}

	update = async(product) => {
		let found = await this.getProductById(product.id);
		if(!found) return false;
		await this.managerProductos.update(product);
		return true;
	}

	delete = async(id) => {
		let found = await this.getProductById(id);
		if(!found) return false;
		await this.managerProductos.delete(id);
		return true;
	}
}