<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button v-if="continuesNum.start > 1" @click="$emit('getPageNo', 1)" :class="{ active: pageNo == 1 }">
      1
    </button>
    <button v-if="continuesNum.start > 2">···</button>

    <button v-show="page >= continuesNum.start" v-for="(page, index) in continuesNum.end" :key="index"
      @click="$emit('getPageNo', page)" :class="{ active: pageNo == page }">
      {{ page }}
    </button>

    <button v-if="continuesNum.end < totalPage - 1">···</button>
    <button v-if="continuesNum.end < totalPage" @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }">
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
  
<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续的页码的其实数字和结束数字
    continuesNum() {
      const { pageNo, continues, totalPage } = this;
      let start = 0,
        end = 0;
      // 连续页码数字5，至少五页
      if (continues > totalPage) {
        // 特殊情况，连续的页码数没有总页数多
        start = 1;
        end = totalPage;
      } else {
        // 正常情况，总页数大于5
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
      }
      // 设置边界
      if (start < 1) {
        start = 1;
        end = continues;
      }
      if (end > totalPage) {
        start = totalPage - continues + 1;
        end = totalPage;
      }
      return { start, end };
    },
  },
};
</script>
  
<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
  