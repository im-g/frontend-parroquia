<template>
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Inicio</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Eucaristias<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/solicitarCita">Solicitudes</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Sedes</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Sesion
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <p class="dropdown-item" >Nombre:  {{this.nombre}}</p>
          <button :disabled="!this.nombre"
            class="buttoncerrar btn-block btn btn-primary"
            v-on:click="cerrarSesion"
          >Cerrar Sesión</button>
        </div>
      </li>
    </ul>
  </div>
</nav> 
</template>
<script>
export default {
  name: "navBar",
  data() {
    return {
      nombre: "",

    };
  },
  mounted() {
    if (localStorage.nombre) {
      console.log("Munted")
      this.nombre = localStorage.nombre;
    }
    else{
      this.nombre = "";
      localStorage.id="";
    }
  },
  methods: {
    cerrarSesion() {
      localStorage.nombre="";
      localStorage.id="";
      this.nombre="";
      console.log("cerrando sesión")
      this.$router.push({ name: "login" });
    },
  },
}
</script>
<style scoped>
.buttoncerrar {
  border: none;
  color: #000000;
  padding: 12px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
} /* Green */

</style>
