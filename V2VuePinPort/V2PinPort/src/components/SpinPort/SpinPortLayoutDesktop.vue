<template>
    <div class="invisibleRelativePosOuterHeader"></div>
    <div class="outerHeader">
        <div class="colorPalet">
            <div class="mainColor"></div>
            <div class="secondaryColor"></div>
            <div class="optionalColor"></div>
        </div>
        <div class="websiteName"><span v-on:click="ShowHome()">SPinPort</span><span style="color: var(--main-color);">></span></div>
        <div class="spinheader">
            <div class="spinnav" v-on:click="ShowHome()" >🏠 Home</div>
            <div class="spinnav" v-on:click="ShowResume()">🪪 Resume</div>
            <div class="spinnav" v-on:click="ShowProject">📃Projects</div>
            <div class="spinnav" v-on:click="ShowContact">📩 Contact</div>
        </div>
    </div>
    <div class="home">
        <Spin-port-home-desktop v-show="isShowHome" ></Spin-port-home-desktop>
        <Spin-port-resume-desktop v-show="isShowResume" ></Spin-port-resume-desktop>
    </div>
    
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    let isShowHome = ref<boolean>(true);
    const isShowResume = ref<boolean>(false);
    const isShowProject = ref<boolean>(false);
    const isShowContact = ref<boolean>(false);

    const ShowHome = () =>{
        isShowHome.value = true;
        isShowResume.value = false;
        isShowProject.value = false;
        isShowContact.value = false;
    }
    const ShowResume = () =>{
        isShowHome.value = false;
        isShowResume.value = true;
        isShowProject.value = false;
        isShowContact.value = false;
    }
    const ShowProject = () =>{
        isShowHome.value = false;
        isShowResume.value = false;
        isShowProject.value = true;
        isShowContact.value = false;
    }
    const ShowContact = () =>{
        isShowHome.value = false;
        isShowResume.value = false;
        isShowProject.value = false;
        isShowContact.value = true;
    }
</script>

<style>
    :root {
        --background-color: white;
        --text-color: var(--secondary-color);
        --main-color: rgb(255, 0, 0);
        --secondary-color: rgb(0, 0, 0);
        --optional-color: rgb(0, 255, 242);
        --main-font: 'Californian FB';
    }
    .home{

    }
    .spinheader{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content:flex-end;
        gap: 30px;
        margin-right: 30px;
    }
    .spinnav{
        font-family: var(--main-font);
        font-size: 25px;
        font-weight: bold;
        color: var(--text-color);
        height: 25px;
        padding: 5px 10px;
        transition: color 0.1s, font-size 0.5s;
    }
    .spinnav:hover{
        color: var(--main-color);
        cursor: pointer;
        font-size: 30px;
    }
    .websiteName{
        font-family: var(--main-font);
        font-size: 30px;
        font-weight: bold;
        color: var(--text-color);
    }
    .websiteName span {
        margin-right: 0px;
        transition: margin-right 0.7s, font-size 0.7s;
    }
    .websiteName span:hover{
        cursor: pointer;
        margin-right: 15px;
        font-size: 40px;
    }
    .outerHeader{
        position: absolute;
        display: flex;
        gap: 30px;
        left: 0;
        top: 50px;
        right: 0;
        height: 100px;
    }
    .invisibleRelativePosOuterHeader{
        position: relative;
        margin-top: 50px;
        width: 100%;
        height: 100px;
    }
    .colorPalet{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 1.5%;
        background-color: var(--main-color);
    }
    .mainColor{
        width: 100%;
        height: 50%;
        background-color: var(--main-color);
    }
    .secondaryColor{
        width: 100%;
        height: 25%;
        background-color: var(--secondary-color);
    }
    .optionalColor{
        width: 100%;
        height: 25%;
        background-color: var(--optional-color);
    }
</style>