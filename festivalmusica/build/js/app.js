// Se escucha el evento DOMContentLoaded. Este evento se dispara cuando el navegador ha terminado de construir el DOM, es decir, cuando ha analizado todo el HTML y ha creado 
// la estructura de objetos que representa la página. Cuando esto pase se ejecuta la funcion function()


document.addEventListener('DOMContentLoaded', function(){
    navegacionFija()
    crearGaleria()
    resaltarEnlace()
    scrollNav()
})

function navegacionFija() {
    const header = document.querySelector('.header')
    const sobreFestival = document.querySelector('.sobre-festival')
    window.addEventListener('scroll', function(){
        /* getBoundingClientRect() es un método que devuelve un objeto DOMRect que contiene información sobre el tamaño y la posición del elemento en relación con la ventana gráfica
        (viewport) del navegador. .bottom es una propiedad del objeto DOMRect que representa la coordenada Y (vertical) del borde inferior del elemento en relación con la parte superior 
        de la ventana gráfica.*/
        //console.log(sobreFestival.getBoundingClientRect().bottom) 
        if (sobreFestival.getBoundingClientRect().bottom < 1){
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
        }
    })
}

function crearGaleria() {  //Le crea la reaccion al evento click para cada imagen (i) cuando este se desencadene a futuro gracias al cerrado que hacen las funciones anonimas. No es que el evento lo control mientras se ejecute el for, todo lo contrario.
    //console.log('desde crearGaleria')
    const galeria = document.querySelector('.galeria-imagenes')

    for(let i =1; i<=16; i++){
        const imagen = document.createElement('IMG')
        imagen.src = `src/img/gallery/full/${i}.jpg`
        imagen.alt = 'Imagen Galeria'
        //console.log(imagen)

        // Event Handler [1]: 
        imagen.onclick = function() {
            mostrarImagen(i)
        }
        galeria.appendChild(imagen)
    }
}  

function mostrarImagen(i){
    const imagen = document.createElement('IMG')
    imagen.src = `src/img/gallery/full/${i}.jpg`
    imagen.alt = 'Imagen Galeria'

    // Generar Modal 
    const modal = document.createElement('Div')
    modal.classList.add('modal')
    modal.onclick = cerrarModal
    modal.appendChild(imagen)

    // Botón cerrar modal
    const cerrarModalBtn = document.createElement('BUTTON')
    cerrarModalBtn.textContent = 'X'
    cerrarModalBtn.classList.add('btn-cerrar')
    cerrarModalBtn.onclick = cerrarModal
    modal.appendChild(cerrarModalBtn)

    // Agregar al HTML tanto el modal como la clase overflow-hidden para que no se maneje el contenido desbordado con la barra de desplazamiento y quede fija la pag con el modal 
    const body = document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.appendChild(modal)
}

function cerrarModal() {
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')
    setTimeout( () =>{
        modal?.remove() // Si existe el selector modal, se elimina
        const body = document.querySelector('body') 
        body.classList.remove('overflow-hidden') // Borro la clase que me deshabilitaba el manejo del desborde con la barra de desplazamiento 
    }, 500)
}

function resaltarEnlace() {
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion-principal a')

        let actual = ''
        sections.forEach(section => {
            const sectionTop = section.offsetTop  // Distancia del elemento con el elemento padre (section actual con el body)
            const sectionHeigth = section.clientHeight // Altura del elemento section actual
            if(window.scrollY >= (sectionTop - sectionHeigth/3) ){  //  Verifica si se ha desplazado la pag lo suf como para que al menos 1/3 de la sección sea visible en la ventana del nav
                actual = section.id
            }  
        })

        navLinks.forEach(link => {
            link.classList.remove('active')
            if(link.getAttribute('href') === '#' + actual) {
                link.classList.add('active')
            } 
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a')
    navLinks.forEach(link => {
        link.addEventListener('click', e =>{
            e.preventDefault()
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)
            section.scrollIntoView({behavior: 'smooth'}) 
            /* Sin las {} y el atributo dentro, hace la misma accion que si no hubiesemos activado el preventdefault. Hacer esto ultimo es = a poner {behavior: 'auto'} y {behavior: 'smooth'}
            da el estilo lento al scrollear */
        })
    })
}

/* [1] Event Handler
    Tenemos 2 opciones:
    imagen.onclick = mostrarImagen(i):  Usará el valor inicial de `i` (0) siempre. debido a que se establece de primeras el resultado de la funcion en ese momento como evento 
    a controlar el click a futuro
    imagen.onclick = function() {mostrarImagen(i)}: Usará el valor actual de `i` cada vez que se haga clic ya que la funciona anonima espera hasta que se desencadene el click
*/