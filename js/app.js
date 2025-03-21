const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const mensaje = document.querySelector('#mensaje');
const btnEnviar = document.querySelector('#submit');
const formulario = document.querySelector('#formulario');

/* Validar campos de forma individual */
nombre.addEventListener('input', () => {
    if (!(nombre.value === '')) {
        nombre.classList.add('borde-verde');
    } else {
        nombre.classList.remove('borde-verde');
    }
})

email.addEventListener('input', () => {
    emailValido = validarEmail(email.value);

    if (!(email.value === '') && emailValido) {
        email.classList.add('borde-verde');
        email.classList.remove('borde-rojo');
    } else {
        email.classList.add('borde-rojo');
        email.classList.remove('borde-verde');
    }
})
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

mensaje.addEventListener('input', () => {
    if (!(mensaje.value === '')) {
        mensaje.classList.add('borde-verde');
    } else {
        mensaje.classList.remove('borde-verde');
    }
})


/* Validar envío del mensaje */
btnEnviar.addEventListener('click', validarFormulario);

function validarFormulario() {
    if (nombre.value === '' || email.value === '' || mensaje.value === '' || !emailValido) {
        alerta('Sorry, invalid fields', 'rojo');
        return;
    }

    // Borrar clases
    nombre.classList.remove('borde-verde');
    email.classList.remove('borde-verde');
    mensaje.classList.remove('borde-verde');

    // Enviar los datos del formulario
    enviarDatos();

    // Reiniciar formulario
    formulario.reset();
}

function alerta(mensaje, tipo) {
    const alerta = document.querySelector('.alerta');
    alerta.textContent = mensaje;

    if (tipo === 'rojo') {
        alerta.classList.add('rojo');
        alerta.classList.remove('verde');
    } else {
        alerta.classList.add('verde');
        alerta.classList.remove('rojo');
    }

    setTimeout(() => {
        alerta.textContent = '';
    }, 3000);
}


// Conectar formulario con Airtable para guardar los datos
async function enviarDatos() {
    const token = 'patPXo2xSw1Ps4nWp.3021d525ce4db2dcbcb1ba26421514e5f898f642e27f39b2528fe9823f7ea01d';
    const idBase = 'appufaBlyQHnV0kyJ';
    const tablaId = 'tbl5Sfg7ltBzpA4ym';
    const tablaNombre = 'Datos de mensaje';
    url = `https://api.airtable.com/v0/${idBase}/${tablaNombre}`;

    try {
        const respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fields: {
                    "Nombre": nombre.value,
                    "Email": email.value,
                    "Mensaje": mensaje.value
                }
            })
        });
    
        if (respuesta.ok) {
            alerta('Message sent successfully', 'verde');
        } else {
            console.log('Hubo un error al enviar el formulario')
        }
    } catch (error) {
        console.log(error);
    }
    
}

