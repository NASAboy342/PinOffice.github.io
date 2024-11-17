<template>
  <img
    class="w-full"
    :src="
      prop.url == '' || prop.url == undefined
        ? '\\img\\broken-img.png'
        : prop.url
    "
    :alt="prop.url"
  />
</template>
<script lang="ts" setup>
interface IProp {
  url: string;
}
const prop = defineProps<IProp>();
</script>
