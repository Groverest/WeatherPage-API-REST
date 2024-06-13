const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
});

function buscarClima(e) {
    e.preventDefault();

    //Validar 
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;
    if(pais === '' || ciudad === '') {
        mostrarError('Todos los campos son obligatorios');
        return
    }


    //Consultar API
    consultarAPI(ciudad, pais)
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');
    if(!alerta) {
        //Crear alerta
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4',
        'py-3', 'rounded', 'mx-w-md', 'mx-auto', 'text-center');
        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
        `;
        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);

    }
  
}

function consultarAPI( ciudad, pais) {

    const appId = '4c6f6c5b8176cfb9e55001bd4b46e276';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    spinner() // Mandamos llamar spinner

    fetch(url)
        .then(respons => respons.json())
        .then( result => {

            limpiarHTML()//Limpiar el HTML

            if(result.cod === "404") {
                mostrarError('Ciudad no encontrada');
                return
            }

            //Imprime la respuesta en el HTML
            mostrarClima(result);
        })
      
}

function mostrarClima(result) {
    
    const { name, main: { temp, temp_max, temp_min}} = result;

    const centigrados = convertirGrados(temp);
    const max = convertirGrados(temp_max);
    const min = convertirGrados(temp_min);

    const nombreCiudad = document.createElement('P');
    nombreCiudad.textContent = `Weather in ${name}`;
    nombreCiudad.classList.add('text-2xl', 'font-bold')
    
    const actual = document.createElement('P');
    actual.innerHTML = `${centigrados} &#8451`;
    actual.classList.add('font-bold', 'text-6xl');

    const maxTemp= document.createElement('p');
    maxTemp.innerHTML = `Max: ${max} &#8451;`
    maxTemp.classList.add('text-xl')
    
    const minTemp= document.createElement('p');
    minTemp.innerHTML = `Min: ${min} &#8451;`
    minTemp.classList.add('text-xl') ;

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(maxTemp);
    resultadoDiv.appendChild(minTemp);


    resultado.appendChild(resultadoDiv);
    
}

const convertirGrados = grados => parseInt(grados-273.15)

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner() {
limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div
    `;

    resultado.appendChild(divSpinner);


}