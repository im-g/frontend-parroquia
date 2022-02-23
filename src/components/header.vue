<template>
    <header>
        <!-- Background image -->
      <div
        class="p-5 text-center bg-image"
      >
      <div class="mask" style="background-color: rgba(0, 0, 0, 0.4);">
          <div class="d-flex justify-content-center align-items-center h-100">
            <div class="text-white">
              <h1 class="mb-3">Parroquia Santísima Trinidad</h1>
            </div>
          </div>
        </div>

      <img src="@/../images/parroquia.jpg" width="1000" height="350">

        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
              <li class="breadcrumb-item active"><a href="/inicio">Inicio</a></li>
              <li class="breadcrumb-item"> <a href="/solicitarCita">Solicitudes</a></li>
              <li class="breadcrumb-item"><a href="#">Reservar eucaristía</a></li>
              <li class="breadcrumb-item"><a href="#">Comunicaciones</a></li>
              <li class="breadcrumb-item"><a href="#">Catequesis</a></li>
              <li class="breadcrumb-item"><a href="#">Sedes</a></li>
              <li class="breadcrumb-item"><a href="#">Contáctenos</a></li>
          </ol>
        </nav>
      </div>
      <!-- Background image -->
    </header>

</template>

<script>
    export default { 
        data(){
            return {
            headerComp: ''
            }
        }
    }
</script>