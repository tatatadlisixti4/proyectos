<?php 
    require 'includes/app.php';
    incluirTemplate('header');
?>

    <main class="contenedor seccion">
        <h1>Contacto</h1>
        <picture>
            <source srcset="build/img/destacada3.webp" type="image/webp">
            <source srcset="build/img/destacada3.jpg" type="image/jpeg">
            <img loading="lazy" src="build/img/destacada3.jpg" alt="Imagen Contacto">
        </picture>

        <h2>Llene el formulario de Contacto</h2>
        <form class="formulario">
            <fieldset>
                <legend>Informacion Personal</legend>

                <label for="nombre">Nombre</label>
                <input type="text" placeholder="Ej: Thadli" id=""nombre>

                <label for="email">E-mail</label>
                <input type="email" placeholder="Ej: thadli@gmail.com" id="email">

                <label for="telefono">Teléfono</label>
                <input type="tel" placeholder="Ej: thadli@gmail.com" id="telefono">

                <label for="mensaje">Mensaje</label>
                <textarea id="mensaje"></textarea>
            </fieldset>

            <fieldset>
                <legend>Información sobre la propiedad</legend>
                <label for="opciones">Compra o Vende:</label>
                
                <select id="opciones">
                    <option value="" disabled selected>-- Seleccione --</option>
                    <option value="Compra">Compra</option>
                    <option value="Vende">Vende</option>
                </select>

                <label for="presupuesto">Teléfono</label>
                <input type="number" placeholder="Tu precio o presupuesto (CLP)" id="presupuesto">
            </fieldset>

            <fieldset>
                <legend>Contacto</legend>

                <p>Como desea ser contactado</p>
                <div class="forma-contacto">
                    <label for="contactar-telefono">Teléfono</label>
                    <input name="contacto" type="radio" value="telefono" id="contactar-telefono">
                    
                    <label for="contactar-email">E-mail</label>
                    <input name="contacto" type="radio" value="email" id="contactar-email">
                </div>

                <p>Si eligió teléfono, elija la fecha y la hora</p>
                <label for="fecha">Fecha</label>
                <input type="date" id="fecha">

                <label for="hora">Hora</label>
                <input type="time" id="hora" min="09:00" max="18:00">
            </fieldset>
            <input type="submit" value="Enviar" class="boton-verde">
        </form>
    </main>

<?php incluirTemplate('footer')?>
