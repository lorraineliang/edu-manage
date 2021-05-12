<template>
  <div>
    <advert-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AdvertList from './components/List.vue'
export default Vue.extend({
  name: 'advertIndex',
  components: {
    AdvertList
  }
})
</script>

<style>

</style>
