<template>
  <div class="search">
    <i class="iconfont icon-search"></i>
    <span class="search-placeholder">大家都在搜 水手怕水</span>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.search {
  display: flex;
  align-items: center;
  height: 34px;
  padding: 0 14px;
  color: #a59f9f;
  background-color: #fff;
  border-radius: 34px;

  .icon-search {
    margin-right: 8px;
    font-size: 18px;
  }

  &-placeholder {
    font-size: 16px;
  }
}
</style>
