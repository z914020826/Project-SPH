<template>
  <div class="spec-preview">
    <img :src="img.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="img.imgUrl" ref="bigImg" />
    </div>
    <!-- 遮罩 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      index: 0,
    };
  },
  props: ["skuImageList"],
  computed: {
    img() {
      return this.skuImageList[this.index] || {};
    },
  },
  mounted() {
    // 接收图片
    this.$bus.$on("getImgIndex", (index) => {
      this.index = index;
    });
  },
  methods: {
    handler(e) {
      let mask = this.$refs.mask;
      let bigImg = this.$refs.bigImg;
      let left = e.offsetX - mask.offsetWidth / 2;
      let top = e.offsetY - mask.offsetHeight / 2;

      // 设置边界
      if (left < 0) left = 0;
      if (left >= mask.offsetWidth) left = mask.offsetWidth;
      if (top < 0) top = 0;
      if (top >= mask.offsetHeight) top = mask.offsetHeight;
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      bigImg.style.left = -2 * left + "px";
      bigImg.style.top = -2 * top + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>