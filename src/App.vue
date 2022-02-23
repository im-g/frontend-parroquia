<template>
  <div>
    <mynav></mynav>
    <div class="jumbotron">
      
      <header-comp></header-comp>
      <router-view />
      
    </div> 
    <my-footer></my-footer> 
  </div>
</template>

<script>
import mynav from "./components/mynav.vue";
import myFooter from "./components/footer.vue"
import HeaderComp from "./components/header.vue"
export default {
  name: "App",
  components: {
    //Login,
    mynav,
    myFooter,
    HeaderComp,
  },
 };
</script>