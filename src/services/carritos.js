import Archivo from '../archivo.js';

export default class Carritos{
	constructor(){
		this.managerCarritos = new Archivo('./src/files/carritos.txt');
	}

	save = async(cart) => {
		await this.managerCarritos.save(cart);
	}

	getNextId = async() => {
		let carts = await this.managerCarritos.read();
		let maxId = (carts.length > 0) ? Math.max(...carts.map(item => item.id)) : 0;
		return ++maxId;
	}

	getCartById = async(id) => {
		let carts = await this.managerCarritos.read();
		let cart = carts.filter(obj => obj.id === parseInt(id));
		if(cart.length == 0) return null;
		return cart[0];
	}

	delete = async(id) => {
		let found = await this.getCartById(id);
		if(!found) return false;
		await this.managerCarritos.delete(id);
		return true;
	}

	update = async(cart) => {
		let found = await this.getCartById(cart.id);
		if(!found) return false;
		await this.managerCarritos.update(cart);
		return true;
	}
	
	deleteProduct = async(id, productId) => {
		let cart = await this.getCartById(id);
		let productos = cart.productos;
		let indexProduct = -1;
		for (const [key, value] of Object.entries(productos)) {
			if(value.id === parseInt(productId)) indexProduct = key;
		}
		if(indexProduct === -1) return false;
		productos.splice(indexProduct, 1);
		await this.managerCarritos.update(cart);
		return true;
	}
}