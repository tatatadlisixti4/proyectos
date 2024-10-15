import path from 'path'
import fs from 'fs'
import { glob } from 'glob'
import { src, dest, watch, series } from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import terser from 'gulp-terser'
import sharp from  'sharp'

const sass = gulpSass(dartSass)

export function js( done ) {
    src('src/js/app.js')
        .pipe(terser())  // Mimifica .js con terser
        .pipe( dest('build/js') ) 
    done()
}

export function css( done ) {
    src('src/scss/app.scss', {sourcemaps: true})
        .pipe( sass({
            outputStyle: 'compressed'  // Dentro de sass funcion par mimificar (quita espacios etc) | si fuese solo sass()... es como poner sas({outputStyle: expanded})
        }).on('error', sass.logError) )  
        .pipe( dest('build/css', {sourcemaps: '.'}) )
    done()
}

// Funcion node.js para manejo de imagenes en la galeria y en el modal
export async function crop(done) {
    const inputFolder = 'src/img/gallery/full'
    const outputFolder = 'src/img/gallery/thumb';
    const width = 250;
    const height = 180;
    /* Fs: modulo file sistem de nodejs | existsSync: Su propósito es verificar si un archivo o directorio existe en la ruta especificada por outputFolder. La función devuelve true si existe 
    y false si no. */
    if (!fs.existsSync(outputFolder)) {  
        // mkdirSync: Es una función síncrona que crea un nuevo directorio en la ruta especificada por outputFolder. Si el directorio ya existe, lanzará un error.{ recursive: true }: Este es un objeto de opciones que se pasa a la 
        // función mkdirSync. La opción recursive: true indica que si alguno de los directorios principales en la ruta outputFolder no existe, también deben ser creados.
        fs.mkdirSync(outputFolder, { recursive: true }) 
    }
    // El código lee todos los archivos en la carpeta inputFolder y filtra aquellos que tienen la extensión .jpg (insensible a mayúsculas). El resultado es un array que contiene solo los nombres de los archivos .jpg
    const images = fs.readdirSync(inputFolder).filter(file => { 
        return /\.(jpg)$/i.test(path.extname(file));  /* Esta es una expresión regular que verifica si la extensión del archivo es .jpg. El modificador i hace que la expresión regular sea insensible a mayúsculas/minúsculas, por lo que coincidirá tanto con .jpg como con .JPG.
        El método .test() devuelve true si la extensión del archivo coincide con la expresión regular, es decir, si es un archivo .jpg. */
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile)  // Bibliotecade procesamiento de imgs de alto rendimiento para node.js
                .resize(width, height, {
                    position: 'centre' // Está bien escrito 'centre'
                })
                .toFile(outputFile)
        });

        done()
    } catch (error) {
        console.log(error)
    }
}

// Funcion node.js para imagenes webp
export async function imagenes(done) {
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images =  await glob('./src/img/**/*{jpg,png}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        procesarImagenes(file, outputSubDir);
    });
    done();
}

function procesarImagenes(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`)
    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp)
    sharp(file).avif().toFile(outputFileAvif)  //Para avif, darle un quality agranda la img en vez de quitarle resolucion
}

export function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
    watch('src/js/**/*.{png, jpg}', imagenes)
}

export default series(crop, js, css, imagenes, dev)