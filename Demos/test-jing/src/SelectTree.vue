<template>
  <div>
    <div>
      <el-input
        :clearable="clearable"
        placeholder="请输入名称"
        v-model="searchText"
        @input="debouncedSearch"
      ></el-input>
    </div>
    <div
      class="peoject_table"
      style="border: 1px solid #ccc"
    >
      <el-tree
        highlight-current
        class="filter-tree"
        :data="data"
        :props="defaultProps"
        default-expand-all
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        ref="tree"
        @node-click="nodeClickHandler"
      >
        <div slot-scope="{ node, data }">
          <span>
            {{ data.name }}
            <i class="el-icon-arrow-right" v-if="data.children && !data.children.length"></i>
          </span>
        </div>
      </el-tree>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    defaultProps: {
      default: () => ({
        children: 'children',
        label: 'name',
      }),
    },
    clearable: {
      type: Boolean,
    },
    data: {
      type: Array,
    },
  },
  data() {
    return {
      searchText: undefined,
    };
  },
  created() {
    this.debouncedSearch = _.debounce(this.search, 500);
  },
  methods: {
    // 项目名称搜索
    search() {
      this.$refs.tree.filter(this.searchText);
    },
    filterNode(value, data, node) {
      if (!value) return true;

      const matched = data.name.indexOf(value) !== -1;

      if ((matched || data.inherit) && data.children) {
        data.children.forEach((item) => {
          item.inherit = true;
        });
      }
      if (data.inherit) {
        data.inherit = false;
        return true;
      }
      if (matched) {
        this.$nextTick(() => {
          if (data.children) {
            node.expanded = false;
          } else {
            node.parent.expanded = true;
          }
        });
      }
      return matched;
    },
    // 节点选中
    nodeClickHandler(data) {
      if (data.children.length) return;
      console.log(data);
      this.$emit('node-click', data);
    },
  },
};
</script>

<style lang="scss" scoped>
.peoject_table {
  margin-top: 20px;
  /*overflow-y: auto;*/
  /*overflow-x: hidden;*/
}

/deep/ .el-input .el-button--primary {
  color: #ffffff;
  background-color: #ff8e00;
  border-color: #ff8e00;
}

/deep/ .el-tree-node__expand-icon {
  color: #fed59d;
  font-size: 20px;

  &.is-leaf {
    color: transparent;
  }
}
/deep/ .el-tree-node>.el-tree-node__children {
  overflow: visible;
}
</style>
