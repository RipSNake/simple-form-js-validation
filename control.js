window.onload = () => {
	console.log('Window loaded');

	// add event listeners
	document.getElementById('submit-btn').addEventListener('click',validate);
}

const modalError = (title, message) => {
	//create and append modal overlay
	let modalOverlay = document.createElement('div');
	modalOverlay.id = 'modal-overlay';
	modalOverlay.classList.add('modal-overlay');
	document.body.appendChild(modalOverlay);
	//create and append modal with errors list
	let modal = document.createElement('div');
	modal.id = 'modal';
	modal.classList.add('modal','modal-error');

	let head = document.createElement('h2');
	head.innerText = title;
	head.classList.add('title');

	let msg = document.createElement('div');
	for(let m of message) {
		let err = document.createElement('p');
		err.innerHTML = `<i class="bi bi-x-circle"></i> ${m}`;
		msg.appendChild(err);
	}

	let btn = document.createElement('button');
	btn.innerText = 'Entendido';
	btn.onclick = () => {
		document.body.removeChild(document.getElementById('modal'));
		document.body.removeChild(document.getElementById('modal-overlay'))
	}

	modal.appendChild(head);
	modal.appendChild(msg);
	modal.appendChild(btn);
	document.body.appendChild(modal);
}

const modalSuccess = (title, message) => {
	//create and append modal overlay
	let modalOverlay = document.createElement('div');
	modalOverlay.id = 'modal-overlay';
	modalOverlay.classList.add('modal-overlay');
	document.body.appendChild(modalOverlay);
	//create modal
	let modal = document.createElement('div');
	modal.id = 'modal';
	modal.classList.add('modal', 'modal-success');
	//create title
	let head = document.createElement('h2');
	head.innerText = title;
	head.classList.add('title');
	//create message
	let msg = document.createElement('div');
	for(let m of message) {
		let mess = document.createElement('p');
		mess.innerHTML = `${m}`;
		msg.appendChild(mess);
	}
	//create button
	let btn = document.createElement('button');
	btn.innerText = 'Seguir';
	btn.onclick = () => {
		document.body.removeChild(document.getElementById('modal'));
		document.body.removeChild(document.getElementById('modal-overlay'))
	}
	//append title, message and button to modal
	modal.appendChild(head);
	modal.appendChild(msg);
	modal.appendChild(btn);
	//append modal to body
	document.body.appendChild(modal);
}

/*
	Mediante el uso del evento que se ejecuta en el momento del envío del formulario se valide 
	que los cuadros de texto correspondientes a “usuario y clave” no se encuentren vacíos y que 
	el cuadro de texto del “usuario” incluya un arroba. Si ambos campos no se validan correctamente 
	el formulario no debe enviarse y deberá desplegarse una ventana indicando el motivo por el cual 
	no puede ingresar por ej: “Falta el arroba en el usuario”
*/

const validate = (event) => {
	event.preventDefault();
	let errors = [];
	const f = event.target.form;
	const user = f.elements['user'].value;
	const pass = f.elements['password'].value;

	if( user.length === 0) {
		// usuario vacio
		errors.push(USER_EMPTY);
	} 

	if(pass.length === 0) {
		// password vacio
		errors.push(PASS_EMPTY);
	}

	if(!user.includes('@')) {
		// usuario inválido debe contener @
		errors.push(USER_ARROBA);
	}

	if(errors.length !== 0) {
		modalError('Datos erroneos', errors);
	} else {
		modalSuccess('Datos Correctos', ['Formulario enviado correctamente']);
	}
}
