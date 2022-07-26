import fs from 'fs';

export default class Archivo {
	constructor(rutaArchivo){
		this.rutaArchivo = rutaArchivo;
	}

	async read(){
		try{
			let contenido = await fs.promises.readFile(this.rutaArchivo, 'utf-8');
			contenido = JSON.parse(contenido);
			return contenido;
		}catch(error){
			return [];
		}
	}

	async save(item){
		try{
			let contenido = Object.values(await this.read());			
			contenido.push(item);
			await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(contenido, null, '\t'));
		}catch(error){
			console.log(`No se puede guardar el archivo: ${error}`);
		}
	}

	async deleteFile(){
		try{
			await fs.promises.unlink(this.rutaArchivo);		
		}catch(error){
			console.log(`No se puede borrar el archivo: ${error}`);
		}
	}

	async delete(itemId){
		try{
			let contenido = Object.values(await this.read());
			contenido = contenido.filter(obj => obj.id !== parseInt(itemId));
			await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(contenido, null, '\t'));
		}catch(error){
			console.log(`No se puede borrar el item: ${error}`);
		}
	}

	async update(item){
		try{
			item.id = parseInt(item.id);
			let contenido = Object.values(await this.read());
			let foundIndex = contenido.findIndex(x => x.id === item.id);
			contenido[foundIndex] = item;
			await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(contenido, null, '\t'));
		}catch(error){
			console.log(`No se puede actualizar el item: ${error}`);
		}
	}
}