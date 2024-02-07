<template>
    <div>
        <ul>
            <li v-for="post in posts" >
                <NuxtLink :to="`/${post.title}`" class="button">{{ post.title }}</NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import PostPages from '@/composables/usePostPages';
    definePageMeta({layout: 'desktop-pure'})
    const route = useRoute();
    const fullroute = useRequestURL().href;
    const { posts } = usePostPages();
</script>

<style>
.button {
    list-style: none;
    display: inline-block;
    margin: 0 10px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;
    color: #333;
    background-color: #fff;
}
</style>