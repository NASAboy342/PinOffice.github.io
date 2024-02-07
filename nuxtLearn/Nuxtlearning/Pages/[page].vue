<template>
    <h2>{{ currentPage?.title }}</h2>
    <p>{{ currentPage?.body }}</p>
</template>

<script lang="ts" setup>
    import PostPages from '@/composables/usePostPages';
    definePageMeta({layout: 'desktop-pure'});
    const route = useRoute();
    const {posts} = usePostPages();
    const currentPage = computed(() => posts.value.filter(p => p?.title === route.params.page)[0]);
</script>