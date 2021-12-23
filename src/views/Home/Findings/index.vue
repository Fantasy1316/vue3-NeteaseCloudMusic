<template>
  <div class="findings">
    <div class="findings-header">
      <side-menu />
      <div class="findings-header--search">
        <search />
      </div>

      <i class="iconfont icon-tinggeshiqu"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideMenu from '../../../components/SideMenu/index.vue'
import Search from '../../../components/Search/index.vue'
</script>

<style lang="less" scoped>
.findings {
  &-header {
    display: flex;
    align-items: center;
    padding: 8px 10px 14px 16px;

    &--search {
      flex: 1;
      margin: 0 4px 0 14px;
    }

    .icon-tinggeshiqu {
      font-size: 20px;
    }
  }
}
</style>
