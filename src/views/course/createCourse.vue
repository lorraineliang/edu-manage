<template>
  <div>
    <create-or-update />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdate from './components/createOrUpdate.vue'
export default Vue.extend({
  name: 'courseIndex',
  components: {
    CreateOrUpdate
  }
})
</script>

<style>

</style>
