<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import PostPages from './composables/usePostPages';
import 'element-plus/dist/index.css'

const {posts} = usePostPages();
</script>