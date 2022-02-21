<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-md-9">
            <div class="card text-black text-center bg-light mb-3">
              <div class="card-header"> <strong>Festividades</strong></div>
              <div class="card-body">
                <div class="row">
                  
                  <div class="col-sm-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">Semana santa</h5>
                        <img class="card-img-top" src="@/../images/semana santa.jpg" width="100" height="160" alt="">
                        <p></p>
                        <a href="#" class="btn btn-primary">Leer más</a>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">Corpus Christi</h5>
                        <img class="card-img-top" src="@/../images/santisimo.jpg" width="100" height="160" alt="">
                        <p></p>
                        <a href="#" class="btn btn-primary"> Leer más</a>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">Navidad</h5>
                        <img class="card-img-top" src="@/../images/navidad.jpg" width="100" height="160" alt="">
                        <p></p>
                        <a href="#" class="btn btn-primary">Leer más</a>
                      </div>
                    </div>
                  </div>
                </div>
                <a><br><button class="btn btn-primary" style="float: right;">Ver más</button>
                </a> 
              </div>
            </div>
          </div>
            <div class="col-xs-6 col-md-3" >
              <div class="card text-black text-center bg-light mb-3">
                <div class="card-header"><strong>Horarios de misas</strong> </div>
                <div class="card-body">
                  <h5>Lunes y festivos</h5>
                  <p>No hay eucaristía</p>

                  <h5>Martes a sábado</h5>
                  <p>Mañana: 8:00 am <br> Tarde: 6:00 pm</p>

                  <h5>Domingo</h5>
                  <p>Mañana: 7:00 am - 9:00 am - 11:00 am<br> Tarde: 6:00 pm</p>

                  <p><button class="btn btn-primary">Ver programación</button></p>
                </div>
              </div>
            </div>
        </div>
      </div>
          
</template>
<script>
export default 
{
    data(){
            return {
            cardInfo: ''
            }
        }
}
</script>