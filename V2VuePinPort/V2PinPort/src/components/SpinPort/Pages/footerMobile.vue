<template>
    <div class="footerContainer">
        <div class="multiColoredLine">
            <div class="m-multiColoredLine"></div>
            <div class="s-multiColoredLine"></div>
            <div class="o-multiColoredLine"></div>
        </div>
        <div class="footerText">
            <div class="copyRight">
                <span>© 2020</span>
                <span> SPinPort</span>
            </div>
            <div class="creditContainer">
                <div class="creditTitle">Credit</div>
                <div v-for="creditUrl in creditUrls" class="creditUrl">>> {{ creditUrl }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

    const creditUrls = ref([
        "https://www.flaticon.com/free-icons/instagram-logo"
        ,"https://www.flaticon.com/free-icons/copy"
        ,"https://www.flaticon.com/free-icons/network"
        ,"https://www.flaticon.com/free-icons/telegram"
        ,"https://www.flaticon.com/free-icons/menu"
    ]);
</script>

<style scoped>
.footerContainer{
    margin-top: 200px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.119);
}
.multiColoredLine{
    width: 100%;
    height: 2px;
    display: flex;
}
.m-multiColoredLine{
    background-color: var(--main-color);
    width: 50%;
    height: 100%;
}
.s-multiColoredLine{
    background-color: var(--secondary-color);
    width: 25%;
    height: 100%;
}
.o-multiColoredLine{
    background-color: var(--optional-color);
    width: 25%;
    height: 100%;
}
.footerText{
    margin-left: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.copyRight{
    font-weight: bold;
}
.creditTitle{
    font-weight: bold;
    margin-bottom: 10px;
}
.creditUrl{
    font-size: 10px;
}
</style>