<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>

    <!-- Footer组件在的登录和注册的时候是隐藏的 -->
    <!-- <Footer v-show="$route.path == '/home' || $route.path == '/search'"></Footer> -->
    <Footer v-show="$route.meta.FtShow"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",

  components: { Header, Footer },
  mounted() {
    // 商品分类数据，由于search和typeNav都需要用到数据，则不需要获取两遍数据
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>