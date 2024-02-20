<template>
    <div class="contactContent">
        <div class="titleSection">
            <div class="title">📬 Contact Me</div>
        </div>
        <div class="complimentSection">
            <div class="complimentation">Have Some Question? Thank you for your interest. Do Drop Me A Line.</div>
        </div>
        <div class="contactSection">
            <div class="contactNote" v-for="contactNote in contactNotes">
                <div class="contactMethod"> 
                    <img v-if="contactNote.icon" :src="contactNote.icon" alt="icon"> 
                    {{ contactNote.method }}
                </div>
                <div class="contactInfo">
                    <div style="width: 80%; word-wrap: break-word; padding-left: 35px;">{{ contactNote.info }}</div>
                    <a :href="contactNote.info" target="_blank" v-if="contactNote.isUrl === true" class="contactOptionButton">
                        <img :src="'./images/link.png'" alt="icon">
                    </a>
                    <button v-else class="contactOptionButton" v-on:click="CopyTextInfo(contactNote.info)">
                        <img :src="'./images/copy.png'" alt="icon">
                    </button>
                </div>
                <div class="multiColoredLine">
                    <div class="m-multiColoredLine"></div>
                    <div class="s-multiColoredLine"></div>
                    <div class="o-multiColoredLine"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

    const contactNotes = ref([
        {
            method: '📬 Email',
            info: 'sopheakpin342@gmail.com',
            isUrl: false
        },
        {
            method: 'Facebook',
            info: 'https://www.facebook.com/paktra.pkt?mibextid=2JQ9oc',
            icon: './images/facebook.png',
            isUrl: true
        },
        {
            method: 'Instagram',
            info: 'https://www.instagram.com/pin_sopheaktra?igsh=OGQ5ZDc2ODk2ZA==',
            icon: './images/instagram.png',
            isUrl: true
        },
        {
            method: '📞 Phone',
            info: '016 743 828',
            isUrl: false
        },
        {
            method: 'Telegram',
            info: '016 743 828',
            icon: './images/telegram.png',
            isUrl: false
        }
    ]);
    const CopyTextInfo = (info: string) => {
        navigator.clipboard.writeText(info);
    }
</script>

<style scoped>
.contactOptionButton{
    width: 23px;
    height: 23px;
    background-color: transparent;
    border-color: transparent;
    border-radius: 5px;
    padding: unset;
    transition: ease-in-out 0.3s;
}
.contactOptionButton:hover{
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.273);
}
.contactOptionButton:active{
    box-shadow: none;
}
.contactOptionButton img{
    width: 100%;
}
.contactInfo{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    margin-top: 5px;
    gap: 10px;
    text-wrap: wrap;
}
.contactMethod{
    font-size: 25px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;
}
.contactMethod img{
    height: 25px;
}
.contactSection{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 80px;
    margin-top: 40px;
    justify-content: center;
}
.contactNote{
    width: 400px;
    background-color: rgba(0, 0, 0, 0.032);
    padding: 10px 10px;
    border-radius: 10px;
    transition: ease-in-out 0.2s;
}
.contactNote:hover{
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.292);
}

.complimentSection{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
}
.complimentation{
    font-size: xx-large;
    font-weight: bold;
}
.contactContent{
    width: 100%;
    color: var(--secondary-color);
}
.titleSection{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
}
.title{
    font-size: 70px;
    font-weight: bold;
}
.multiColoredLine{
    margin-top: 30px;
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
</style>