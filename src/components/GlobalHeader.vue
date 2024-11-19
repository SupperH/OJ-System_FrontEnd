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
            <div class="title">zeDen OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div class="userAvatar">
        {{ store.state.user?.loginUser?.userName ?? "未登录" }}
        <a-dropdown trigger="hover">
          <a-avatar shape="circle">
            <template
              v-if="loginUser && loginUser.userRole as string !== ACCESS_ENUM.NOT_LOGIN"
            >
              <template v-if="loginUser.userAvatar">
                <img
                  class="avatarImg"
                  alt="avatar"
                  :src="loginUser.userAvatar"
                  style="border-radius: 50%"
                />
              </template>
              <template v-else>
                <a-avatar>
                  <IconUser />
                </a-avatar>
              </template>
            </template>
            <template v-else>
              <a-avatar>未登录</a-avatar>
            </template>
          </a-avatar>
          <template #content>
            <template
              v-if="loginUser && loginUser.userRole as string !== ACCESS_ENUM.NOT_LOGIN"
            >
              <a-doption>
                <template #icon>
                  <icon-idcard />
                </template>
                <template #default>
                  <a-anchor-link
                    @click="
                      router.push({
                        path: '/about',
                      })
                    "
                    >个人信息
                  </a-anchor-link>
                </template>
              </a-doption>
              <a-doption>
                <template #icon>
                  <icon-poweroff />
                </template>
                <template #default>
                  <a-anchor-link @click="logout">退出登录</a-anchor-link>
                </template>
              </a-doption>
            </template>
            <template v-else>
              <a-doption>
                <template #icon>
                  <icon-user />
                </template>
                <template #default>
                  <a-anchor-link
                    @click="
                      router.push({
                        path: '/user/login',
                      })
                    "
                    >用户登录
                  </a-anchor-link>
                </template>
              </a-doption>
              <a-doption>
                <template #icon>
                  <icon-user-add />
                </template>
                <template #default>
                  <a-anchor-link
                    @click="
                      router.push({
                        path: '/user/register',
                      })
                    "
                    >用户注册
                  </a-anchor-link>
                </template>
              </a-doption>
            </template>
          </template>
        </a-dropdown>
      </div>
    </a-col>
  </a-row>
</template>

<!--      <div class="user-avatar">-->
<!--        &lt;!&ndash; 显示头像，使用<img>标签 &ndash;&gt;-->
<!--        <img-->
<!--          v-if="store.state.user?.loginUser?.avatar"-->
<!--          :src="store.state.user?.loginUser?.avatar"-->
<!--          alt="用户头像"-->
<!--          style="width: 50px; height: 50px; border-radius: 50%"-->
<!--        />-->
<!--        &lt;!&ndash; 如果没有头像，可以显示一个默认的图片或占位符 &ndash;&gt;-->
<!--        <img-->
<!--          v-else-->
<!--          src="../assets/logo01.png"-->
<!--          alt="默认头像"-->
<!--          style="width: 50px; height: 50px; border-radius: 50%"-->
<!--        />-->
<!--      </div>-->
<!--      <div class="user-name">-->
<!--        &lt;!&ndash; 显示用户名 &ndash;&gt;-->
<!--        {{ store.state.user?.loginUser?.userName ?? "未登录" }}-->
<!--      </div>-->

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
import { LoginUserVO, UserControllerService } from "../../generated";

const router = useRouter();
const store = useStore();
const loginUser: LoginUserVO = computed(
  () => store.state.user?.loginUser
) as LoginUserVO;
// 展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});
const logout = () => {
  UserControllerService.userLogoutUsingPost();
  location.reload();
};
console.log();

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "鱼皮管理员",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

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

.user-info-col {
  /* 这里可以根据需要添加一些针对整个列的样式 */
  text-align: center; /* 如果你想让用户名也居中显示的话 */
}

.user-avatar img {
  display: block; /* 防止图片下方有空隙 */
  margin-bottom: 10px; /* 头像下方添加一些间距以分隔用户名 */
}

.user-name {
  /* 这里可以添加一些针对用户名的样式，比如字体大小、颜色等 */
  margin-left: -80px;
}
</style>
