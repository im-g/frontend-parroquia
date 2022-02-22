
<template>
  <div>

    <div class="wrapper fadeInDown">
      <div class="contenedor-filtro">
        <div class="contenedor">
          <img src="@/../images/parroquia.jpg" width="600" height="320" />
        </div>
          <div  id="formContent">
            <h5 class="pt-3"
              style="color: #1d566f; font-family: 'Oswald', sans-serif"
            >
              Editar Solicitud de Cita           
            </h5>

            <form v-on:submit.prevent="editarSolicitudcita">
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
                v-model="fechaCita"
                required
                name="fecha"
                min="1950-01-01"
                max="2022-02-23"
              />

              <select
              tipe="select"              
              class="form-select"
              v-model="tipo"
              aria-label="Default select example"
              id="tipopartida"              
              >
                <option disabled >Seleccione</option>
                <option>Confesion</option>
                <option>Direccion Espritual</option>
                <option>Consejeria a Joven</option>
                <option>Consejeria a Pareja</option>
                <option>Visita Enfermos</option>              
              </select>

              <input type="submit" class="fadeIn fourth" value="Editar" />
            </form>
          </div>
        </div>
      </div>
    </div>
</template>



<script>

export default {

  name: "editarSolicitudcita",
  data() {
    return {
      idSolicitud : "U29saWNpdHVkU2VydmljaW9Ob2RlOjE=",
      horaSolicitud : "",
      fechaCita : "",
      estado :"En espera",
      usuarioId: "",
      templo : "",
      tipo : "",    
      
     
    };
  },
  mounted() {
    if (localStorage.id) {
      this.usuarioId = localStorage.id;
      //this.idSolicitud = localStorage.id;
    }
  },
  methods: {
    
    editarSolicitudcita() {
      
      var updateRespuesta=document.getElementById("tipopartida").value.toString().toLowerCase();
      console.log("id solicitud : ", this.idSolicitud);
      console.log("hora: ", this.horaSolicitud);
      this.tipo=updateRespuesta;      
      console.log("fecha", this.fechaCita);   
      console.log("estado : ",this.estado);  
      console.log("usuario ", this.usuarioId);
      console.log("templo", this.templo);
      console.log(this.tipo);
      this.$apollo
        .mutate({
          // Establece la mutación de crear
          mutation: require("@/graphql/User/editarSolicitudCita.gql"),
          // Define las variables
          variables: {
            //primer variable es como esta en la base de datos y la segunda como esta en las vista
            idSolicitud:this.idSolicitud,
            hora: this.horaSolicitud,
            fecha: this.fechaCita,
            estado: this.estado,
            idUsuario: this.usuarioId,
            temploId: this.templo,
            servicioId: this.tipo,
                        
          },
          //línea para actualizar
          fetchPolicy: "no-cache",
        })
        .then((response) => {
          this.$swal("Correcto","Cita Editada correctamente","success");
          console.log("Editada Solicitud de cita:", response.data);
          this.$router.push({ name: "partidasGeneradas" });
        });
    },
  },
};
</script>

#estilos
<style scoped>
.contenedor {
  position: relative;
  display: inline-block;
  text-align: center;
}
html {
  background-color: #56baed;
}

body {
  font-family: "Poppins", sans-serif;
  height: 100vh;
}

a {
  color: #92badd;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
}
.form-select{
  display: block;
  font-size: 16px;
  font-family: 'Verdana', sans-serif;
  font-weight: 400;
  color: #444;
  line-height: 1.3;
  padding: .4em 1.4em .3em .8em;
  width: 340px;
  max-width: 100%; 
  box-sizing: border-box;
 margin: 10px auto;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.03);
  border-radius: .3em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
    linear-gradient(to bottom, #ffffff 0%,#f7f7f7 100%);
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;
}
.form-select::-ms-expand {
  display: none;
}

.form-select:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #222; 
  outline: none;
}
.form-select option {
  font-weight:normal;
}

/* STRUCTURE */

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}
input[type="time"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 10px 32px;
  display: inline-block;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 5px;
  width: 60%;
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
  width: 95%;
  max-width: 800px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}

/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}

/* FORM TYPOGRAPHY*/

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

input[type="button"]:hover,
input[type="submit"]:hover,
input[type="reset"]:hover {
  background-color: #39ace7;
}

input[type="button"]:active,
input[type="submit"]:active,
input[type="reset"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type="date"]{
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  display: inline-block;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 5px;
  width: 60%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}
input[type="text"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
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


input[type="text"]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type="text"]:placeholder {
  color: #cccccc;
}

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
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

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after {
  width: 100%;
}

/* OTHERS */

*:focus {
  outline: none;
}

#icon {
  width: 60%;
}
</style>