<template>
  <div>
  <mynav></mynav>
  <router-view />
  </div>
  
  
</template>

<script>
import mynav from "./components/mynav.vue";
export default {
  name: "App",
  components: {
    //Login,,
    mynav,
  },
 };
</script>