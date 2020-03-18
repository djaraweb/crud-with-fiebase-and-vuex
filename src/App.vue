<template>
  <div id="app" class="container">
    <Menu />
    <router-view />
  </div>
</template>
<script>
import Menu from "@/components/Menu.vue";
export default {
  name: "AppBase",
  components: {
    Menu
  }
};
</script>


