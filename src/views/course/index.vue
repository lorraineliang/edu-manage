<template>
  <div>
    <course-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CourseList from './components/courseList.vue'
export default Vue.extend({
  name: 'courseIndex',
  components: {
    CourseList
  }
})
</script>

<style>

</style>
