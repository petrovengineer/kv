<template>
  <Drawer/>
  <div class="content-wrapper">
    <div class="content"> 
      <router-view/>
    </div>
  </div>
</template>
<script>
import Drawer from './components/Drawer'

export default {
  components: {
    Drawer
  }
}
</script>

<style lang="scss">
  .content-wrapper{
    position: fixed;
    left: 300px;
    top: 0;
    height: 100%;
    background-color: darkgray;
    width: calc(100% - 300px);
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .content{
    margin: 20px;
  }
  h1{
    margin: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  .paper-wrapper{
    background-color: white;
    color:darkslategrey;
    border-radius: 5px;
    padding: 20px;
    font-size: 24px;
  }

</style>
