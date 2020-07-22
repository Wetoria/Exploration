<template>
  <div>
    <el-row>
      <el-col :span="6">
        <select-tree
          :data="data1"
          @node-click="handleClick($event, 1)"
        ></select-tree>
      </el-col>
      <el-col :span="6">
        <select-tree
          :data="data2"
          @node-click="handleClick($event, 2)"
        ></select-tree>
      </el-col>
      <el-col :span="6">
        <select-tree
          :data="data3"
          @node-click="handleClick($event, 3)"
        ></select-tree>
      </el-col>
      <el-col :span="6">
        <select-tree
          :data="data4"
          @node-click="handleClick($event, 4)"
        ></select-tree>
      </el-col>
    </el-row>
    <el-row>
      <el-button @click="handleOK">确定</el-button>
    </el-row>
  </div>
</template>

<script>
import SelectTree from './SelectTree';
import data from './data';

console.log(data);

export default {
  components: {
    SelectTree,
  },
  data() {
    return {
      treeData: data,
      data1: data.tree0,
      data2: [],
      data3: [],
      data4: [],
      selection: {},
    };
  },
  methods: {
    handleOK() {
      console.log(this.selection);
    },
    handleClick(selectedData, index) {
      this.selection[index] = selectedData;
      const { id } = selectedData;
      const treeData = this.treeData[`tree${id}`] || [];
      console.log(treeData, id);
      this[`data${index + 1}`] = treeData;
    },
  },
};
</script>
