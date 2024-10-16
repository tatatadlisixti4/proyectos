<?php 
    // Verificar login
    require '../../includes/app.php';
    use App\Vendedor;

    estaAutenticado();
    $vendedor = new Vendedor; // Se genera un vendedor vacío para poder usar sus atributos en el formulario

    // Obtener todos los vendedores
    $vendedores = Vendedor::all();
    $errores = Vendedor::getErrores();

    // Validacion POST, captura datos e insercion de los mismos en la bd
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $vendedor = new Vendedor($_POST['vendedor']);

        // Validad que no haya campos vacíos
        $errores = $vendedor->validar();

        // No hay errores
        if(empty($errores)){
            $vendedor->guardar();
        }
    }

    incluirTemplate('header');
?>

<main class="contenedor seccion">
        <h1>Registrar Vendedor</h1>
        <a href="/admin" class="boton boton-verde">Volver</a>

        <!-- Renderizado errores con php -->
        <?php foreach($errores as $error): ?>
            <div class="alerta error">
                <?php echo $error; ?>
            </div>  
        <?php endforeach; ?>

        <form class="formulario" method="POST" action="/admin/vendedores/crear.php">
            <?php include '../../includes/templates/formulario_vendedores.php'; ?>
            <input type="submit" value="Registrar Vendedor" class="boton boton-verde">
        </form>
    </main>

<?php 
    incluirTemplate('footer')
?>
