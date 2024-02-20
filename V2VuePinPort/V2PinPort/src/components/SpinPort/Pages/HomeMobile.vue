<template>
    <div class="contentContainer">
        <div class="profilePicHolder">
            <img :src="profilePicture" alt="Profile Picture" class="profilePic">
        </div>
        <div class="introText">
            <div class="normalText">Hello, I am</div>
            <div class="bigName"><span style="color: var(--main-color);">Pin</span> <span v-for="char in myName">{{char}}</span></div>
            <div class="normalText">Web developer</div>
            <div class="introTextBody" >
            Based in Phnom Penh, Cambodia. I create beautiful and functional
            websites for small businesses and individuals. I have over three 
            years of experience in web development, using technologies such 
            as C#, SQL, .NET, JS, HTML, CSS, and Vue. Some of the projects 
            I’ve worked on include online casino, and a portfolio 
            site. If you need a website for your project. I’m always eager to learn 
            new skills and take on new challenges.
            </div>
        </div>
        
        
    </div>
</template>

<style lang="css" scoped>
    img{
        width: 100%;
        border-radius: 10px;
    }
    .contentContainer{
        width: 100%;
        gap: 2px;
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 10px;
        justify-content: space-between;
        color: var(--secondary-color);
    }
    .bigName{
        font-size: 50px;
        font-weight: bold;
        transition: font-size 0.5s;
    }
    .bigName span{
        transition: font-size 1s;
    }
    .bigName span:hover{
        font-size: 70px;
    }
    .normalText{
        font-size: 20px;
        font-weight: bold;
        transition: font-size 0.5s;
    }
    .normalText:hover{
        font-size: 30px;
    }
    .introText{
        font-size: 20px;
        text-wrap: wrap;
        width: 96%;
        margin-top: 10px;
        text-align: center;
    }
    .profilePic{
        height: 100%;
        width: auto;
        box-shadow: 15px 15px var(--optional-color);
        transition: height 0.5s, box-shadow 0.5s;
    }
    .profilePic:hover{
        height: 130%;
        box-shadow: 20px 25px var(--optional-color);
    }
    .profilePicHolder{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 250px;
    }
    .introTextBody{
        padding: 0px 20px;
    }
</style>

<script lang="ts" setup>
import {ref} from "vue";
    const profilePicture: string = "/IMG_20230322_0003.png";

    const myName = ref(['S','o','p','h','e','a','k','t','r','a']);
</script>