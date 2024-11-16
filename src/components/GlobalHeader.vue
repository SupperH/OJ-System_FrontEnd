<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/oj-logo.svg" />
            <div class="title">ZeDen OJ</div>
          </div>
        </a-menu-item>
        <!--把导航栏内容循环展示，根据路由获取，path作为key也就是循环的值 name作为值-->
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>
        <!--从状态管理中拿到当前登录用户-->
        {{ store.state.user?.loginUser?.userName ?? "未登录" }}
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
/*引入路由文件，根据路由获取一些内容需要*/
import { routes } from "../router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
/*用来做路由跳转*/
const router = useRouter();
//调用userStore方法获取更新的用户信息
const store = useStore();
const loginUser = store.state.user.loginUser;

//设置路由的显示，就是菜单栏的显示
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    //todo 根据权限控制菜单 如果没有权限 返回false
    if (!checkAccess(loginUser, item?.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

//默认主页
const selectedKeys = ref(["/"]);

//路由跳转后，更新选中的菜单项可以理解为选择哪个菜单项就高亮
router.afterEach((to, from, afilure) => {
  selectedKeys.value = [to.path];
});

console.log();

//模拟登录 三秒后自动调用getLoginUser获取登录用户
setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "zeden",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

/*根据点击的菜单栏的内容，跳转到对应页面 这个在routes.ts配置了的地址对应的页面*/
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
