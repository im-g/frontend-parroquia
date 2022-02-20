<template>
    <header>
        <!-- Background image -->
      <div
        class="p-5 text-center bg-image"
      >
      <div class="mask" style="background-color: rgba(0, 0, 0, 0.6);">
          <div class="d-flex justify-content-center align-items-center h-100">
            <div class="text-white">
              <h1 class="mb-3">Parroquia Santísima Trinidad</h1>
            </div>
          </div>
        </div>

      <img src="@/../images/parroquia.jpg" width="1000" height="">

        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-light bg-white">
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarExample01"
              aria-controls="navbarExample01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="fas fa-bars"></i>
            </button>
          <div class="collapse navbar-collapse" id="navbarExample01">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item active">
                  <a class="nav-link" aria-current="page" href="#">Inicio</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Solicitudes</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Reservar eucaristía</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Comunicaciones</a>
                </li>
              </ul>
            </div> 
          </div>
        </nav>
        <!-- Navbar-->
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