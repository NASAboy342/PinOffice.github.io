<script lang="ts">
  export default {
    data(){
      return {
        helloworld: "Helllo World! and all the things I know about them all are awesome!"
      };
    }
  }
</script>

<template>
  <h1>{{ helloworld }}</h1>
  <task-item></task-item>
</template>

<style>
#app > div {
    border: dashed black 1px;
    display: inline-block;
    margin: 10px;
    padding: 10px;
    background-color: lightgreen;
  }
</style>
