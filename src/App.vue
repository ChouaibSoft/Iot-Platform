<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import Navbar from './components/Navbar'
import { store } from "./store/store";

export default {
  name: 'app',
  components: {
    Navbar
  }


}


</script>

<style>

</style>
