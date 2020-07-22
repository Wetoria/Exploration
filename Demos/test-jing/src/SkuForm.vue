<template>
  <div>
    <el-row v-for="item of items" :key="item.key" style="
        border: 1px solid black;
      ">
      <el-row type="flex" justify="space-between">
        <span>
          规格名：
          <el-input v-model="item.specificationName" @change="handleChange">
          </el-input>
        </span>
        <span>
          <i class="el-icon-error"></i>
        </span>
      </el-row>
      <el-row type="flex">
        <span>
          规格值：{{ item.specificationName }}
          <span
            v-for="i of item.valueLength"
            :key="`${item.specificationName}-${i}`"
          >
            <el-input v-model="item.specificationValue[i]" @change="handleChange">
            </el-input>
          </span>
          <el-button @click="handleAddValue(item)">添加规格值</el-button>
        </span>
      </el-row>
    </el-row>
    <el-row type="flex">
      <el-button @click="handleAdd">添加规格项目</el-button>
    </el-row>
    <el-row v-if="tableData.length">
      <el-table
        border
        :data="tableData"
      >
        <el-table-column
          v-for="item of items"
          :key="`${key}${item.key}`"
          :label="item.specificationName"
        >
          <template slot-scope="{ row }">
            <span>{{ columnValue(row, item.specificationName) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格" prop="sku_price"></el-table-column>
        <el-table-column label="库存" prop="sku_stock"></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
let uid = 1;
export default {
  data() {
    return {
      items: [],
      specifications: [
        {
          label: '尺寸',
          value: 'size',
        },
        {
          label: '颜色',
          value: 'color',
        },
        {
          label: '产地',
          value: 'place',
        },
      ],
      specificationValues: {
        size: [
          {
            label: '大',
            value: 'big',
          },
          {
            label: '中',
            value: 'mid',
          },
          {
            label: '小',
            value: 'small',
          },
        ],
        color: [
          {
            label: '红色',
            value: 'red',
          },
          {
            label: '蓝色',
            value: 'blue',
          },
          {
            label: '绿色',
            value: 'green',
          },
        ],
        place: [
          {
            label: '深圳',
            value: 'shenzhen',
          },
          {
            label: '广州',
            value: 'guangzhou',
          },
          {
            label: '东莞',
            value: 'dongguan',
          },
        ],
      },
      key: +new Date(),
      tableData: [],
    };
  },
  methods: {
    columnValue(row, key) {
      const { specs = [] } = row;
      const target = specs.find((item) => item.key === key) || {};
      const targetValue = this.specificationValues[key].find((item) => item.value === target.value) || {};
      return targetValue.label;
    },
    options(key) {
      const options = this.specificationValues[key];
      return options;
    },
    handleAddValue(item) {
      if (item.valueLength === 3) return;

      item.valueLength++;
    },
    generateTableData() {
      const allSpecs = [];
      for (const item of this.items) {
        const specs = [];
        item.specificationValue.forEach((v) => {
          specs.push({
            key: item.specificationName,
            value: v,
          });
        });
        allSpecs.push(specs);
      }
      function serialArray(arr) {
        const lengthArr = [];
        const productArr = [];
        const result = [];
        let length = 1;
        for (let i = 0; i < arr.length; i++) {
          const len = arr[i].length;
          lengthArr.push(len);
          const product = i === 0 ? 1 : arr[i - 1].length * productArr[i - 1];
          productArr.push(product);
          length *= len;
        }
        for (let i = 0; i < length; i++) {
          const resultItem = [];
          for (let j = 0; j < arr.length; j++) {
            resultItem.push(arr[j][Math.floor(i / productArr[j]) % lengthArr[j]]);
          }
          result.push(resultItem);
        }
        return result;
      }

      const results = serialArray(allSpecs);
      const data = [];
      results.forEach((item) => {
        data.push({
          specs: item,
          sku_price: 0,
          sku_stock: 0,
        });
      });
      this.tableData = data;
    },
    handleChange() {
      this.key = +new Date();
      this.generateTableData();
    },
    columnName(value) {
      return (this.specifications.find((item) => item.value === value) || {}).label;
    },
    handleAdd() {
      if (this.items.length === 3) return;

      this.items.push({
        key: uid,
        text: uid++,
        specificationName: undefined,
        specificationValue: [],
        valueLength: 1,
      });
    },
  },
};
</script>
