<template>
    <div class="c-multiColoredLine">
        <div class="c-m-multiColoredLine"></div>
        <div class="c-s-multiColoredLine"></div>
        <div class="c-o-multiColoredLine"></div>
    </div>
</template>

<style scoped>
.c-multiColoredLine{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
}
.c-m-multiColoredLine{
    background-color: var(--main-color);
    width: 50%;
    height: 100%;
}
.c-s-multiColoredLine{
    background-color: var(--secondary-color);
    width: 25%;
    height: 100%;
}
.c-o-multiColoredLine{
    background-color: var(--optional-color);
    width: 25%;
    height: 100%;
}
</style>