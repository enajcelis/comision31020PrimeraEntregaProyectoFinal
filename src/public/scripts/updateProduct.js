let form = document.getElementById('editProductForm');

// Id del producto a editar
let url = new URL(window.location.href);
let productId = url.searchParams.get("id");

fetch(`/api/productos/${productId}`)
	.then(response => response.json())
	.then(data => {
		let productoArr = [];
		for (key in data) {
			productoArr[key] = data[key];
		}

		form.nombre.value = productoArr['nombre'];
		form.descripcion.value = productoArr['descripcion'];
		form.foto.value = productoArr['foto'];
		form.codigo.value = productoArr['codigo'];
		form.precio.value = productoArr['precio'];
		form.stock.value = productoArr['stock'];
	}
);

form.addEventListener('submit', (evt) => { 
	evt.preventDefault(); 
	let data = new FormData(form);
	let obj = {};
	data.forEach((value,key) => obj[key] = value); 
	
	fetch(`/api/productos/${productId}`,{ 
		method: 'PUT', 
		body: JSON.stringify(obj),
		headers: {
			"Content-Type": "application/json"
		} 
	})
	.then(response => response.json())
	.then(data => {
		Swal.fire(
			'¡Listo!',
			'La información del producto ha sido actualizada.',
			'success'
		).then(result => {
			location.reload();
		});
	});
});