const Formulario = document.querySelector('#form form');
const botonEnviar = document.getElementById('Enviar');
const allInputs = document.querySelectorAll('#form input, #form textarea, #form select');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const mensajePrevio = document.getElementById('mensaje-exito');
    if (mensajePrevio) {
        mensajePrevio.remove();
    }

    const Nombre = document.getElementById('Nombre').value;
    const Email = document.getElementById('Email').value;
    const Telefono = document.getElementById('Telefono').value;
    const lenguaje = document.getElementById('lang').value;
    const Puesto = document.getElementById('Puesto').value;
    const Mensaje = document.getElementById('Mensaje').value;


     const datosFormulario = {
        nombre: Nombre,
        email: Email,
        telefono: Telefono,
        lenguaje: lenguaje,
        puesto: Puesto,
        mensaje: Mensaje
    };

        fetch('Datos.json') 
    .then(respuesta => {
        if (!respuesta.ok) throw new Error('Error al conectar con el origen de datos');
        return respuesta.json();
    })
    .then(datos => {
        // Mostramos en consola los datos que consumimos del JSON local
        console.log('Datos consumidos del JSON con éxito:', datos);
        const alertaExito = document.createElement('div');
        alertaExito.id = 'mensaje-exito';
        alertaExito.textContent = '¡Datos procesados correctamente con el JSON local!';
        
        // Vincula el elemento con las clases de tu archivo CSS
        alertaExito.classList.add('mensaje-alerta', 'exito'); 

        // Insertar el elemento en el DOM (Uso de append)
        formulario.append(alertaExito);

        formulario.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        const alertaError = document.createElement('div');
        alertaError.id = 'mensaje-error'; 
        alertaError.textContent = 'ERROR: no se pudo procesar el envío';
        
        // Vincula el elemento con tus clases de CSS de error
        alertaError.classList.add('mensaje-alerta', 'error');
        
        formulario.append(alertaError);
    });
});

botonEnviar.addEventListener('click', function() {
    console.log('El usuario hizo click en el botón enviar');
});

allInputs.forEach(campo => {
    campo.addEventListener('invalid', function() {
        this.style.borderColor = 'red';
        // Corrección: Añadido espacio en el string 'El campo '
        console.warn('El campo ' + this.id + ' es requerido y se debe rellenar');
    });

    campo.addEventListener('input', function() {
        this.style.borderColor = '';
    });
});