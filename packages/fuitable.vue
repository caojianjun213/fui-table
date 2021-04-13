<template>
  <div>
    <el-table :data="data" style="width: 100%">
      <slot></slot>
    </el-table>
    <el-pagination
      class="fui-table-page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      :page-size="100"
      :layout="layout"
      :total="400"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "FuiTable",
  data() {
    return {
      layout: "total, sizes, prev, pager, next, jumper",
      currentPage: 1,
      serverXiangdeng: {
        page: 0,
        size: 10,
        draw: 1,
      },
      draw_csunt: true,
    };
  },
  props: {
    //封装一个通用组件，会对props做一个约束，props进行校验
    ajax: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    serverParams: {
      type: Object,
      default() {
        return {
          page: 0,
          size: 10,
          draw: 1,
        };
      },
    },
  },
  watch: {
    serverParams: {
      handler() {
        setTimeout(() => {
          this._getFuitable();
        }, "50");
      },
      deep: true,
    },
  },
  methods: {
    _getFuitable() {
      this.serverXiangdeng.draw++;
      this.serverParams.size = this.serverXiangdeng.size;
      this.serverParams.page = this.serverXiangdeng.page;
      this.serverParams.draw = this.serverXiangdeng.draw;
      if (this.draw_csunt) {
        this.draw_csunt = false;
        setTimeout(() => {
          console.log(this.serverParams);
          this.draw_csunt=true;
        }, 500);
      }
    },
    handleSizeChange(val) {
      this.$set(this.serverXiangdeng, "size", val);
      this.$set(this.serverXiangdeng, "page", 0);
    },
    handleCurrentChange(val) {
      this.$set(this.serverXiangdeng, "page", val);
    },
  },
  created() {
    this.layout = this.$attrs["pagination-layout"];
    this.serverParams.size =
      this.serverParams.size || this.serverXiangdeng.size;
    this.serverParams.page =
      this.serverParams.page || this.serverXiangdeng.page;
    this.serverParams.draw =
      this.serverParams.draw || this.serverXiangdeng.draw;
    if (this.ajax) {
      this._getFuitable(); //获取列表数据
    }
  },
};
</script>
<style scoped>
.fui-table-page {
  text-align: center;
  margin-top: 10px;
}
</style>
