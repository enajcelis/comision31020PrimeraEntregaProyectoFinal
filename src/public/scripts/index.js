let divProductos = document.getElementById('productos');
let cartId;
let isAdmin;

fetch('/api/config')
	.then(response => response.json())
	.then(data => {
		isAdmin = data.admin;
		cartId = data.defaulCartId;

		fetch('/api/productos')
			.then(response => response.json())
			.then(data => {
				let productos = "";
				let divButton = "";
				data.forEach(producto => {
					if(isAdmin){
						divButton = `
							<div class="card-footer bg-transparent border">
								<a href="updateProduct.html?id=${producto.id}" class="btn btn-sm btn-primary" name="editButton" data-id="${producto.id}">Actualizar</a>
								<a href="#" class="btn btn-sm btn-danger" onclick="deleteAction(this)" name="deleteButton" data-id="${producto.id}" data-name="${producto.nombre}">Eliminar</a>
								<a href="#" class="btn btn-sm btn-outline-info" onclick="addToCartAction(this)" name="addToCartButton" data-id="${producto.id}" data-name="${producto.nombre}"><i class="bi bi-cart4"></i> Agregar al carrito</a>
							</div>
						`;
					}else{
						divButton = `
							<div class="card-footer bg-transparent border">
								<a href="#" class="btn btn-sm btn-outline-info" onclick="addToCartAction(this)" name="addToCartButton" data-id="${producto.id}" data-name="${producto.nombre}"><i class="bi bi-cart4"></i> Agregar al carrito</a>
							</div>
						`;
					}

					productos = productos + `
						<div class="card mt-2 bg-light border">
							<div class="card-header">
								<h5 class="card-title">${producto.nombre}</h5>
							</div>
							<div class="card-body">
								<div class="container">
									<div class="row">
										<div class="col-md-2 d-flex justify-content-center">
											<a href="${producto.foto}" target="_blank">
												<img src="${producto.foto}" class="rounded img-thumbnail" style="width: 100px">
											</a>
										</div>
										<div class="col-md-10">
											<h6 class="card-subtitle mb-2 text-muted">${producto.descripcion}</h6>
											<p class="card-text">
												Código: ${producto.codigo}<br>
												Stock: ${producto.stock}
											</p>										
											<p class="card-text"><small class="text-muted"><i class="bi bi-currency-dollar"></i> ${producto.precio}</small></p>
										</div>
									</div>
								</div>						
							</div>
							${divButton}
						</div>
					`;
				});
				divProductos.innerHTML = productos;
			}
		);
	});

const deleteAction = (btn) => {
	let productId = btn.getAttribute('data-id');
	let productName = btn.getAttribute('data-name');

	Swal.fire({
		title: "¿Estás seguro?",
		html: `Estás por eliminar el producto: <strong>${productName}</strong>. No podrás deshacer esta acción.`,
		type: "warning",
		showCancelButton: true,
		allowOutsideClick: false,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Aceptar',
		cancelButtonText: "Cancelar"
	}).then((result) => {
		if(result.dismiss === 'cancel') return false;

		fetch(`/api/productos/${productId}`, {
			method: 'DELETE'
		})
		.then(response => response.json())
		.then(data => location.reload());
	});
};

const addToCartAction = (btn) => {
	let productId = btn.getAttribute('data-id');
	let productName = btn.getAttribute('data-name');

	Swal.fire({
		title: "¿Agregar producto al carrito?",
		html: `Estás por agregar el producto: <strong>${productName}</strong> a tu carrito de compras.`,
		type: "warning",
		showCancelButton: true,
		allowOutsideClick: false,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Aceptar',
		cancelButtonText: "Cancelar"
	}).then((result) => {
		if(result.dismiss === 'cancel') return false;

		let obj = {"productos": [productId]};

		fetch(`/api/carrito/${cartId}/productos`, {
			method: 'POST',
			body: JSON.stringify(obj),
			headers: {
				"Content-Type": "application/json"
			} 
		})
		.then(response => response.json())
		.then(data => {
			Swal.fire(
				'¡Listo!',
				'El producto ha sido agregado a tu carrito.',
				'success'
			);
		});
	});
};