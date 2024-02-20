<template>
    <div class="content">
        <el-table :data="produactDatas.products" style="width: 100% " header-row-style="color: black;">
          <el-table-column prop="id" label="Number" width="80"/>
          <el-table-column prop="title" label="Name" width="180" />
          <el-table-column prop="description" label="Description" />
          <el-table-column prop="price" label="Price" width="80"/>
          <el-table-column prop="images" label="Img">
            <template #default="scope">
                <el-image :src="scope.row.images[0]" style="height: 80px; " />
            </template>
          </el-table-column>
          <el-table-column label="Obtion" class="go">
            <el-button>Go</el-button>
          </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import PostPages from '@/composables/usePostPages';
    definePageMeta({layout: 'desktop-pure'})
    const route = useRoute();
    const fullroute = useRequestURL().href;
    const { posts } = usePostPages();
    const { produactDatas } = await useApiCalling();
</script>

<style scope>
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