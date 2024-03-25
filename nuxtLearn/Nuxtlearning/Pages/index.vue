<template>
  <div class="content">
    <el-table :data="produactDatas.products" style="width: 100% " header-row-style="color: black;">
      <el-table-column prop="id" label="Number" width="80" />
      <el-table-column prop="title" label="Name" width="180" />
      <el-table-column prop="description" label="Description" width="300" />
      <el-table-column prop="price" label="Price" width="80">
        <template #default="scope">
          <span>{{ `${scope.row.price} $` }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="images" label="Img">
        <template #default="scope">
          <el-image :src="scope.row.images[0]" style="height: 100%; " />
        </template>
      </el-table-column>
      <el-table-column label="Obtion" class="go">
        <template #default="scope">
          <el-button @click="ShowDialog(scope.row)">View</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="isShowDialog" :title="productDetail.title" style="width: 70%;">
      <div class="productDetailContent">
        <div class="productDetailText">
          <div style="font-weight: bold; font-size: xx-large;">{{ productDetail.title }}</div>
          <div style="font-size: x-large; margin-top: 20px;">{{ productDetail.description }}</div>
          <div style="font-weight: bold; font-size: xx-large;">{{ productDetail.price }}</div>
        </div>
        <div class="productDetailImage">
          <el-image :src="productDetail.images[0]" style="width: 100%; " />
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import PostPages from '@/composables/usePostPages';
definePageMeta({ layout: 'desktop-pure' })

interface IProduct {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}


const isShowDialog = ref(false);
const route = useRoute();
const fullroute = useRequestURL().href;
const { posts } = usePostPages();
const { produactDatas } = await useApiCalling();
const productDetail = ref(Array<IProduct>);
const ShowDialog = (row: IProduct) => {

  productDetail.value = row;
  isShowDialog.value = true;
}
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

.dialog-footer {}

.productDetailContent {
  display: flex;
  width: 100%;
  justify-content: center;
}

.productDetailText {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
}

.productDetailImage {
  width: 60%;
}</style>