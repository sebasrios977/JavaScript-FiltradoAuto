// Variables
const resultado = document.querySelector('#resultado');
const year = document.querySelector('#year');
const marca = document.querySelector('#marca');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const max = new Date().getFullYear();
const min = max - 10;

// Generar un objeto con las busquedas
const datosBusquedas = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}
// Eventos
document.addEventListener( 'DOMContentLoaded', () => {
    mostrarAutos(autos);
    llenarSelect();
});

// Event listeners para los select de busqueda

marca.addEventListener('change', e => {
    datosBusquedas.marca = e.target.value;
    filtrarAuto();
});

year.addEventListener('change', e => {
    datosBusquedas.year = parseInt(e.target.value);
    filtrarAuto();
});

minimo.addEventListener('change', e => {
    datosBusquedas.minimo = e.target.value;
    filtrarAuto();
});

maximo.addEventListener('change', e => {
    datosBusquedas.maximo = e.target.value;
    filtrarAuto();
});

puertas.addEventListener('change', e => {
    datosBusquedas.puertas = parseInt(e.target.value);
    filtrarAuto();
});

transmision.addEventListener('change', e => {
    datosBusquedas.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener('change', e => {
    datosBusquedas.color = e.target.value;
    filtrarAuto();
});

// Funciones
function mostrarAutos(autos) {

    limpiarHTML();

    autos.forEach( auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión ${transmision} - Precio: ${precio} - Color: ${color}

        
        `

        // Insertar en el html
        resultado.appendChild(autoHTML);
    })
}

// Limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

// Genera los años del select

function llenarSelect() {
    for(let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

// Funcion que filtra en base a la busqueda
function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    if(resultado.length){
        console.log(resultado);
        mostrarAutos(resultado);
    } else {
        noResultado();
    }

}

function noResultado() {

    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultado';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto){
    if( datosBusquedas.marca ){
        return auto.marca === datosBusquedas.marca;
    }
    return auto;
}

function filtrarYear(auto){
    if( datosBusquedas.year ){
        return auto.year === datosBusquedas.year;
    }
    return auto;
}

function filtrarMinimo(auto){
    if( datosBusquedas.minimo ){
        return auto.precio >= datosBusquedas.minimo;
    }
    return auto;
}

function filtrarMaximo(auto){
    if( datosBusquedas.maximo ){
        return auto.precio <= datosBusquedas.maximo;
    }
    return auto;
}

function filtrarPuertas(auto){
    if( datosBusquedas.puertas ){
        return auto.puertas === datosBusquedas.puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    if( datosBusquedas.transmision ){
        return auto.transmision === datosBusquedas.transmision;
    }
    return auto;
}

function filtrarColor(auto){
    if( datosBusquedas.color ){
        return auto.color === datosBusquedas.color;
    }
    return auto;
}