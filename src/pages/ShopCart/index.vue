<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <!-- 购物车标题 -->
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="changeChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="handler('minus', -1, cart)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a class="plus" @click="handler('add', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}.00</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartInfoList.length > 0"
          @change="updateAllChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ checkedNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}.00</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      // 获取购物车列表
      this.$store.dispatch("getCartList");
    },
    // 修改产品的数量
    async handler(type, disNum, cart) {},
    // 删除产品
    async deleteCart(cart) {
      try {
        await this.$store.dispatch("deleteCart", cart.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 修改数量  进行一个节流操作
    handler: throttle(async function (type, disNum, cart) {
      // type:区分这三个功能
      // disNum
      // cart 哪一个产品（id）
      /************************************************** */
      // 向服务器发送请求，修改产品数量
      switch (type) {
        // 加号
        case "add":
          disNum = 1;
          break;
        // 减号
        case "minus":
          if (cart.skuNum > 1) {
            disNum = -1;
          } else {
            disNum = 0;
          }
          break;
        // 修改值
        case "change":
          // 用户输入的值是非法的
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - cart.skuNum;
          }
          break;
      }

      try {
        // 代表修改成功
        await this.$store.dispatch("addShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        // 重新获取数据
        this.getData();
      } catch (error) {
        alert("修改失败");
      }
    }, 1000),

    async changeChecked(cart, e) {
      try {
        let checked = e.target.checked ? "1" : "0";
        await this.$store.dispatch("changeChecked", {
          skuId: cart.skuId,
          isChecked: checked,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },

    // 删除所有选中的产品
    async deleteAllChecked() {
      try {
        await this.$store.dispatch("deleteAllChecked");
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },

    // 全选所有产品
    async updateAllChecked(e) {
      try {
        let flag = e.target.checked ? "1" : "0";
        // 派发action
        await this.$store.dispatch("updateAllChecked", flag);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    totalPrice() {
      let sum = 0;
      let checkedLists = this.cartInfoList.filter((item) => {
        return item.isChecked == "1";
      });
      checkedLists.forEach((cart) => {
        sum += cart.skuPrice * cart.skuNum;
      });
      return sum;
    },
    isAllChecked() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
    checkedNum() {
      let num = 0;
      this.cartInfoList.forEach((item) => {
        item.isChecked == 1 ? num++ : "";
      });
      return num;
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 15%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>