<template>
    <div class="invisibleRelativePosOuterHeader"></div>
    <div class="outerHeader">
        <div class="UpperHeader">
            <div class="colorPalet">
                <div class="mainColor"></div>
                <div class="secondaryColor"></div>
                <div class="optionalColor"></div>
            </div>
            <div class="websiteName"><span v-on:click="ShowHome()">SPinPort</span><span style="color: var(--main-color);">></span></div>
            <div class="headerMenu">
                <button class="burgerButton" @:click="ShowSpinheader()"><img :src="'./images/burger-bar.png'" alt="burgerIcon"></button>
            </div>
            
        </div>
        <Transition name="spinheader" mode="out-in">
            <div class="spinheader" v-if="isShowSpinheader">
                <div class="spinnav" v-on:click="ShowHome()" >🏠 Home</div>
                <div class="spinnav" v-on:click="ShowResume()">📜 Resume</div>
                <div class="spinnav" v-on:click="ShowProject()">📃 Projects</div>
                <div class="spinnav" v-on:click="ShowContact()">📩 Contact</div>
            </div>
        </Transition>
        
    </div>
    <div>
        <Transition name="slide" mode="out-in">
            <div v-if="isShowHome" class="Page">
                <Spin-port-home-mobile ></Spin-port-home-mobile>
                <Spin-port-footer-mobile></Spin-port-footer-mobile>
            </div>
            <!-- <div v-else-if="isShowResume" class="Page" >
                <Spin-port-resume-desktop></Spin-port-resume-desktop>
                <Spin-port-footer></Spin-port-footer>
            </div>
            <div v-else-if="isShowProject" class="Page" >
                <Spin-port-project-desktop></Spin-port-project-desktop>
                <Spin-port-footer></Spin-port-footer>
            </div>
            <div v-else="isShowContact" class="Page" >
                <Spin-port-contact-desktop></Spin-port-contact-desktop>
                <Spin-port-footer></Spin-port-footer>
            </div> -->
        </Transition>
    </div>
    
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    let isShowHome = ref<boolean>(true);
    const isShowResume = ref<boolean>(false);
    const isShowProject = ref<boolean>(false);
    const isShowContact = ref<boolean>(false);

    const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));

    const ShowHome = async () =>{
        isShowHome.value = true;
        isShowResume.value = false;
        isShowProject.value = false;
        isShowContact.value = false;
    }
    const ShowResume = async () =>{
        isShowHome.value = false;
        isShowResume.value = true;
        isShowProject.value = false;
        isShowContact.value = false;
    }
    const ShowProject = async () =>{
        isShowHome.value = false;
        isShowResume.value = false;
        isShowProject.value = true;
        isShowContact.value = false;
    }
    const ShowContact = async () =>{
        isShowHome.value = false;
        isShowResume.value = false;
        isShowProject.value = false;
        isShowContact.value = true;
    }
    const isShowSpinheader = ref(false)
    const ShowSpinheader = () =>{
        if(isShowSpinheader.value === false){
            isShowSpinheader.value = true;
        }
        else{
            isShowSpinheader.value = false;
        }
    }
</script>

<style scoped>
    .slide-enter-active{
        opacity: 0;
        transform: translateY(100%);
    }
    .slide-enter{
        opacity: 100;
        transform: translateY(0%);
    }
    .slide-leave-to {
        transform: translateY(40%);
        opacity: 0;
    }
    .Page{
        transition: ease-in-out 0.4s;
    }
    .spinheader{
        position: absolute;
        right: 0vh;
        top: 40px;
        width: 50%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content:left;
        align-items: center;
        flex-wrap: wrap;
        gap: 30px;
        background-color: white;
        box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.105);
        border-radius: 5px;
        padding-top: 30px;
        transition: ease-in-out 0.2s;
    }
    .spinnav{
        font-family: var(--main-font);
        font-size: 18px;
        font-weight: bold;
        color: var(--text-color);
        height: 25px;
        padding: 0px 0px;
        transition: color 0.1s, font-size 0.5s;
    }
    .spinnav:hover{
        color: var(--main-color);
        cursor: pointer;
        font-size: 19px;
    }
    .spinnav:active{
        color: var(--main-color);
        font-size: 19px;
    }
    .websiteName{
        font-family: var(--main-font);
        font-size: 25px;
        font-weight: bold;
        color: var(--text-color);
    }
    .websiteName span {
        margin-right: 0px;
        transition: margin-right 0.7s, font-size 0.7s;
    }
    .websiteName span:hover{
        cursor: pointer;
        margin-right: 5px;
        font-size: 27px;
    }
    .outerHeader{
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 75px;
        top: 20px;
        left: 0px;
    }
    .invisibleRelativePosOuterHeader{
        position: relative;
        margin-top: 20px;
        width: 100%;
        height: 75px;
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
    .UpperHeader{
        display: flex;
        gap: 10px;
        left: 0;
        right: 0;
        height: 50%;
    }
    .headerMenu{
        display: flex;
        width: 100%;
        height: 100%;
        justify-content:right;
        padding: 0px 15px;
    }
    .burgerButton{
        width: 40px;
        height: 40px;
        border: none;
        background-color:unset;
    }
    .burgerButton img{
        width: 100%;
    }
    .burgerButton:active{
        background-color: rgb(224, 224, 224);
    }
    .spinheader-enter-active{
        opacity: 0;
        transform: translateX(100%);
    }
    .spinheader-enter{
        opacity: 100;
        transform: translateX(0%);
    }
    .spinheader-leave-to{
        opacity: 0;
        transform: translateX(100%);
    }
</style>