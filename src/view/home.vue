<template>
  <div>
    <img class="page-center" src="./../../static/logo.jpg" alt="logo">
    <div class="page-center">欢迎使用小易爱车门店管理系统</div>
    <span v-for="(item,name,index) in list" >{{name}}:{{item}}({{index}})</span>
    <button @click="lengthRev">rev</button>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        list:{
          first:'1'
        }
      }
    },
    methods: {
      lengthRev(){
        this.list = Object.assign({}, this.list, {
          second: '2',
          third: '3'
        })
      }
    }

  }
</script>
<style lang="less" scoped>
  .page-center{
    transform: translateX(-50%);
    left: 45%;
    position: relative;
    width: 300px;
    text-align: center;
    margin: 50px 0;
  }
</style>

