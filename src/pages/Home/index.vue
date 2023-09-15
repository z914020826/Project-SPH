<template>
  <div>
    <!-- 三级联动全局组件 已经注册，不需要引入 -->
    <TypeNav></TypeNav>
    <List></List>
    <Recommend></Recommend>
    <rank></rank>
    <like></like>
    <floor v-for="f in floorList" :key="f.id" :list="f"></floor>
    <brand></brand>
  </div>
</template>
    
<script>
import List from "@/pages/Home/List";
import Recommend from "@/pages/Home/Recommend";
import rank from "@/pages/Home/rank";
import like from "@/pages/Home/like";
import floor from "@/pages/Home/floor";
import brand from "@/pages/Home/brand";

import { mapState } from "vuex";

export default {
  name: "Home",
  components: { List, Recommend, rank, like, floor, brand },
  mounted() {
    // 派发action，获取floor组件得数据
    this.$store.dispatch("getFloorList");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.Home.floorList,
    }),
  },
};
</script>
    
    <style>
</style>