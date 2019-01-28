<template>
  <el-button circle type="primary" plain icon="el-icon-plus" size="small" @click="handleClick"></el-button>
</template>

<script>
  export default {
    name: 'addNewButton',
    methods: {
      handleClick() {
        this.$emit('newButtonClick')
      }
    }
  }
</script>
