<template>
    <div class="contentContainer">
        <div class="introText">
            <div class="normalText">Hello, I am</div>
            <div class="bigName"><span style="color: var(--main-color);">Pin</span> <span v-for="char in myName">{{char}}</span></div>
            <div class="normalText">Web developer</div>
            <div class="introText">
            Based in Phnom Penh, Cambodia. I create beautiful and functional
            websites for small businesses and individuals. I have over three 
            years of experience in web development, using technologies such 
            as C#, SQL, .NET, JS, HTML, CSS, and Vue. Some of the projects 
            I’ve worked on include online casino, and a portfolio 
            site. If you need a website for your project. I’m always eager to learn 
            new skills and take on new challenges. When I’m not coding, 
            I enjoy reading, playing chess, and traveling.
            </div>
        </div>
        <div>
            <div ><img :src="profilePicture" alt="Profile Picture" class="profilePic"></div>
        </div>
        
    </div>
</template>

<style lang="css">
    img{
        width: 100%;
        border-radius: 10px;
    }
    .contentContainer{
        width: 80%;
        gap: 10px;
        margin: auto;
        display: flex;
        margin-top: 80px;
        justify-content: space-between;
    }
    .bigName{
        font-size: 90px;
        font-weight: bold;
        transition: font-size 0.5s;
    }
    .bigName span{
        transition: font-size 1s;
    }
    .bigName span:hover{
        font-size: 120px;
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
        width: 70%;
        margin-top: 10px;
    }
    .profilePic{
        width: 50%;
        box-shadow: 30px 30px var(--optional-color);
        transition: width 0.5s, box-shadow 0.5s;
    }
    .profilePic:hover{
        width: 60%;
        box-shadow: 50px 100px var(--optional-color);
    }
</style>

<script lang="ts" setup>
import {ref} from "vue";
    const profilePicture: string = "/IMG_20230322_0003.png";

    const myName = ref(['S','o','p','h','e','a','k','t','r','a']);
</script>