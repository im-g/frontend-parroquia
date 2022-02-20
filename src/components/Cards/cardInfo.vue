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
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Leer más</a>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">Corpus Christi</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Leer más</a>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">Navidad</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Leer más</a>
                      </div>
                    </div>
                  </div>
                </div>
                <a>
                  <button class="btn btn-primary" style="float: right;">Ver más</button>
                </a> 
              </div>
            </div>
          </div>
            <div class="col-xs-6 col-md-3" >
              <div class="card text-black text-center bg-light mb-3">
                <div class="card-header"><strong>Horarios de misas</strong> </div>
                <div class="card-body">
                    
                    <p class="card-text">Aquí podrás realizar la solicitud de una
                      cita para bautizo, matrimonio, primera comunión, etc.</p>
                  <button class="btn btn-primary">Ver programación</button>
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