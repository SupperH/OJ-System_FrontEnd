<template>
  <div id="basicLayout">
    <!--引入布局的代码 这个在arcodesgin官网找开发文档就有示例直接复制即可，后面基本所有组件都可以直接复制很方便-->
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <!--全局导航栏样式，代码也是从官网找的-->
        <GlobalHeader />
      </a-layout-header>
      <!--这么引用是为了显示动态，不写死-->
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">在线oj判题-Zeden</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout {
}

#basicLayout .header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
}

#basicLayout .content {
  background: linear-gradient(to right, #bbb, #fff);
  margin-bottom: 16px;
  padding: 20px;
}

#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>
