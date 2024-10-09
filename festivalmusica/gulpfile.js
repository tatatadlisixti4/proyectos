import {src, dest, watch, series} from 'gulp'  // Importo funciones de gulp para manejar rutas de entrada y salida
import * as dartSass from 'sass'  // Importo el modulo sass completo
import gulpSass from 'gulp-sass' // Importo el pluggin de gulp llamado gulp-sass

// Js
export function js(done){
    src('src/js/app.js')
        .pipe( dest('build/js') )
    done()
}

// Compilar sass con gulp
const sass = gulpSass(dartSass)  // Elemento sass
export function css(done){
    src('src/scss/app.scss', {sourcemaps: true}) // Ubicacion app.scss |  el source map habilita el uso del .map para saber al inspeccionar en que parte de mi scss está ese css
        .pipe( sass().on('error', sass.logError) )  // Ejecuto sass y hago q esté pendiende de un 'error' para mostrarlo con sass.logError
        .pipe( dest('build/css', {sourcemaps: '.'}) )  // Ruta destino .scss compilado  | true: se donde esta el css a inspeccionar en el scss. el '.' hace lo mismo pero crea el .map en build
    done() // Cuando importo estas funciones, van a recibir como parametro una funcion que yo debo ejecutar para declarar que mi funcion terminó correctamente
}

export function dev() {
    watch('src/scss/**/*.scss', css)  // Observa si hay cambios dentro de la carpeta src/scss y todos sus .scss y si hay ejecuta la funcion css
    watch('src/js/**/*.js', js)  // Lo mismo de arriba pero para los .js
}


export default series(js, css, dev) 
/* Esto hace que en mi package.json el cual tendrá algo asi:
"scripts": {
    "sass": "sass --watch src/scss:build/css",
    "dev": "gulp dev"
},

No sea necesario llamar funciones en el script de nombre dev que llama a las gulp como ese ve ahi ( gulpo ejecuta la funcion dev con el script npc run dev del mismo nombre de la funcion)
ya que export default hace que se exporte todo (gracias a series pasamos como parametros las 3 funciones).
Series especificamente agrupa tareas, en este caso estan en ese orden para que primero inicialice el js y dps el css y al final el dev que va a quedar corriendo gracias al watch 
y como la funcion que usa el dev(css) ya está inicializada, todo va a funcionar bien.
Paralel a dif de series, inicializa todo al mismo tiempo y no es el orden de los parametros que tengas. Esto te puede servir dependiendo de tu contexto, en este contexto no sirve.
*/