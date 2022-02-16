<template>
  <div class="wrapper fadeInDown">
    <div class="contenedor">
      <img src="@/../images/parroquia.jpg" width="600" height="320" />
    </div>
    <div class="row">
      <div class="col-md">
        <h5
          class="pt-3"
          style="color: #1d566f; font-family: 'Oswald', sans-serif"
        >
          Crear Solicitud
        </h5>
        <div id="formContent" class="contenedor">
          <form v-on:submit.prevent="solicitarCita">
            <input
              type="time"
              v-model="horaSolicitud"
              required
              max="19:30:00"
              min="07:00:00"
              step="1"
            />
            <input
              type="date"
              id="start"
              class="fadeIn third"
              v-model="fechaSolicitud"
              required
              name="login"
              min="2022-02-16"
              max="2022-12-31"
            />
            <input type="submit" class="fadeIn fourth" value="Solicitar" />
          </form>
        </div>
      </div>
      <div class="col-md">
          <h5
          class="pt-3"
          style="color: #1d566f; font-family: 'Oswald', sans-serif"
        >
          Solicitudes En proceso
          
        </h5>
        <input type="submit" class="fadeIn fourth" value="Información Solicitud"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "solicitarCita",
  data() {
    return {
      horaSolicitud: "",
      fechaSolicitud: "",
    };
  },
  methods: {
    solicitarCita() {
      console.log("hora", this.horaSolicitud);
      console.log("fecha", this.fechaSolicitud);
    },
  },
};
</script>
<style scoped>
input[type="button"],
input[type="submit"],
input[type="reset"] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}
input[type="date"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  display: inline-block;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}
input[type="time"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  display: inline-block;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}

.contenedor {
  position: relative;
  display: inline-block;
  text-align: center;
}
/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  text-align: center;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
</style>