<template>
  <!--引入布局的代码--->
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style></style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";

const route = useRoute();

//全局初始化函数，有全局单词调用的代码，都可以写到这里
const doInit = () => {
  console.log("hello this is init");
};
onMounted(() => {
  doInit();
});
</script>
