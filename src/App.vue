<template>
  <div id="app">
    <Calender />
    <ReserveEvent />
  </div>
</template>

<script>
import Calender from "./components/Calender.vue";
import ReserveEvent from "./components/Modals/Modal/ReserveEvent";

export default {
  name: "App",
  components: {
    Calender,
    ReserveEvent
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
