<template>
    <div class="drawer">
        <div class="drawer-content">
            <router-link to="/">Ресурсы</router-link>
            <router-link to="/wastes">Затраты БН</router-link>
            <router-link to="/cashwastes">Затраты Н</router-link>
            <router-link to="/payers">Контрагенты</router-link>
            <router-link to="/users">Пользователи</router-link>
        </div>
    </div>
</template>
<script>
    export default {
        
    }
</script>
<style scoped>
    .drawer{
        position: fixed;
        left: 0;
        top: 0;
        width: 300px;
        background-color: black;
        color: white;
        height: 100%;
        /* padding: 20px; */
    }
    .drawer-content{
        margin: 20px;
    }
    a{
        color: white;
        text-decoration: none;
        display: block;
        margin-bottom: 10px;
    }
</style>