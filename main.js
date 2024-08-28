// Animación del titulo 

let index = 0;
const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const texto = `ENCRIPTADOR DE TEXTO`;
const titulo = document.querySelector(`#titulo`);

function animacionTitulo() {
    if (index < texto.length) {
        intervaloLetras(index);
        index++;
        setTimeout(animacionTitulo, 300);
    } else if (index == texto.length) {
        titulo.style.opacity = `0.5`;
        titulo.style.opacity = `0`;
        setTimeout(() => {
            titulo.textContent = ``;
            titulo.style.opacity = `1`;
            index = 0;
        }, 1000);
        setTimeout(animacionTitulo, 1300);
    }
}

const intervaloLetras = index => {
    const intervalo = setInterval(() => {
        const letra = letras[Math.floor(Math.random() * letras.length)];
        titulo.textContent = titulo.textContent.substring(0, index) + letra + titulo.textContent.substring(index + 1);
    }, 0);

    setTimeout(() => {
        clearInterval(intervalo);
        titulo.textContent = titulo.textContent.substring(0, index) + texto[index] + titulo.textContent.substring(index + 1);
    }, 300);
}

animacionTitulo();


const letrasMinusculas = letra => {
    const codigo = letra.charCodeAt();
    return (codigo >= 97 && codigo <= 122) || codigo == 32; // Rango de [a-z] en código ASCII ó espacio en blanco
}

const evaluarEntrada = texto => {
    if (texto.trim().length > 0) {
        let textoErrado = ``;
        for (let i = 0; i < texto.length; i++) {
            if (letrasMinusculas(texto[i])) {
                textoErrado += texto[i];
            } else {
                textoErrado += `<strong>${texto[i]}</strong>`;
            }
        }
        if (textoErrado.includes(`<strong>`)) {
            const contenedorResultado = document.querySelector(`#contenedorResultado`);
            contenedorResultado.innerHTML = `
            <h2>¡No se permiten mayúsculas, acentos ni caracteres especiales!</h2>
            <p>${textoErrado}</p>
        `;
        } else {
            return true;
        }
    }
    return false;
}

function copiarTexto() {
    const mensaje = document.querySelector(`#mensajeResultado`).textContent;
    navigator.clipboard.writeText(mensaje);
    const boton = document.querySelector(`#boton3`);
    boton.innerHTML = `¡Se ha copiado!`;
    boton.addEventListener(`mouseout`, () => {
        boton.innerHTML = `Copiar`;
    });
}

// Encriptación

function encriptacion() {
    const textoIngresado = document.querySelector(`#textoIngresado`).value;
    if (evaluarEntrada(textoIngresado)) {
        const contenedorResultado = document.querySelector(`#contenedorResultado`);
        contenedorResultado.innerHTML = `
            <h2>Encriptación:</h2>
            <p id="mensajeResultado">${cambioEncriptado(textoIngresado)}</p>
            <button id="boton3" onclick="copiarTexto()">Copiar</button>
        `;
    }
}

const cambioEncriptado = texto => {
    for (let i = 0; i < texto.length; i++) {
        switch (texto[i]) {
            case `a`:
                texto = texto.substring(0, i) + `ai` + texto.substring(i + 1);
                i++;
                break;
            case `e`:
                texto = texto.substring(0, i) + `enter` + texto.substring(i + 1);
                i += 4;
                break;
            case `i`:
                texto = texto.substring(0, i) + `imes` + texto.substring(i + 1);
                i += 3;
                break;
            case `o`:
                texto = texto.substring(0, i) + `ober` + texto.substring(i + 1);
                i += 3;
                break;
            case `u`:
                texto = texto.substring(0, i) + `ufat` + texto.substring(i + 1);
                i += 3;
                break;
        }
    }
    return texto;
}

// Desencriptación

function desencriptacion() {
    const textoIngresado = document.querySelector(`#textoIngresado`).value;
    if (evaluarEntrada(textoIngresado)) {
        let resultado = cambioDesencriptado(textoIngresado, `ai`, `a`);
        resultado = cambioDesencriptado(resultado, `enter`, `e`);
        resultado = cambioDesencriptado(resultado, `imes`, `i`);
        resultado = cambioDesencriptado(resultado, `ober`, `o`);
        resultado = cambioDesencriptado(resultado, `ufat`, `u`);

        const contenedorResultado = document.querySelector(`#contenedorResultado`);
        contenedorResultado.innerHTML = `
            <h2>Desencriptación:</h2>
            <p id="mensajeResultado">${resultado}</p>
            <button id="boton3" onclick="copiarTexto()">Copiar</button>
        `;
    }
}

const cambioDesencriptado = (texto, secuencia, cambio) => {
    let extraer = texto.split(secuencia);
    let resultado = extraer.join(cambio);
    return resultado;
}