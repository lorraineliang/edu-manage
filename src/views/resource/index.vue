<template>
  <div>
    <resource-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ResourceList from './components/list.vue'
export default Vue.extend({
  name: 'resourceIndex',
  components: {
    ResourceList
  }
})
</script>

<style>

</style>
