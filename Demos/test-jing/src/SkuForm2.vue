<template>
  <div>
    <el-row v-for="(item,index) of items" :key="item.key" style="
        border: 1px solid black;
      ">
      <el-row type="flex" justify="space-between">
        <span>
          规格名：
          <el-input v-model="item.specificationName"></el-input>
        </span>
        <span>
          <i class="el-icon-error" @click="deleLine(index)"></i>
        </span>
      </el-row>
      <el-row type="flex">
        <span>
          规格值：
          <span
            v-for="i of item.valueLength"
            :key="`${item.specificationName}-${i}`"
          >
          <el-input v-model="item.specificationValue[i]" @blur="handleChange"></el-input>
          <i class="el-icon-error" @click="deleitem(index,i)"></i>
          </span>
          <el-button @click="handleAddValue(item)">添加规格值</el-button>
        </span>
      </el-row>
    </el-row>
    <el-row type="flex">
      <el-button @click="handleAdd">添加规格项目</el-button>
    </el-row>
    <el-row v-if="tableData.length">
      <el-form>
      <el-table
        border
        :data="tableData"
      >
      {{items}}
        <el-table-column
          v-for="item of items"
          :key="`${key}${item.key}`"
          :label="item.specificationName"
        >
          <template slot-scope="{ row }">
            <span>{{ columnValue(row, item.specificationName) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格" prop="sku_price">
            <template slot-scope="scope">
              <el-form-item>
                <el-input class="sku-input"
                        v-model.trim="scope.row.sku_price"
                        >
                </el-input>
            </el-form-item>
            </template>
        </el-table-column>
        <el-table-column label="库存" prop="sku_stock">
          <template slot-scope="scope">
              <el-form-item>
                <el-input class="sku-input"
                        v-model.trim="scope.row.sku_stock"
                        >
                </el-input>
            </el-form-item>
            </template>
        </el-table-column>
      </el-table>
       </el-form>
    </el-row>
  </div>
</template>

<script>
let uid = 1;
export default {
  data() {
    return {
      items: [],
      key: +new Date(),
      tableData: [],
    };
  },
  methods: {
    columnValue(row, key) {
      const { specs = [] } = row;
      const target = specs.find((item) => item.key === key) || {};
      return target.value;
    },
    deleLine(index) {
      this.items.splice(index, 1);
    },
    deleitem(index, i) {
      this.items[index].specificationValue.splice(i, 1);
      debugger;
      this.generateTableData();
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

      const results = serialArray(allSpecs.reverse());
      const data = [];
      results.forEach((item) => {
        data.push({
          specs: item,
          sku_price: '',
          sku_stock: '',
        });
      });
      function isSameSpecs(a, b) {
        const specsA = a.specs;
        const specsB = b.specs;
        if (specsA.length !== specsB.length) return false;
        for (const spec of specsA) {
          const hasNoSameSpec = !specsB.find((item) => item.key === spec.key && item.value === spec.value);
          if (hasNoSameSpec) return false;
        }
        return true;
      }
      console.log(JSON.stringify(data));
      console.log(JSON.stringify(this.tableData));
      data.forEach((item) => {
        const origin = this.tableData.find((t) => isSameSpecs(item, t));
        console.log(origin);
        if (origin) {
          item.sku_price = origin.sku_price;
          item.sku_stock = origin.sku_stock;
        }
      });
      this.tableData = data;
    },
    handleChange() {
      this.key = +new Date();
      this.generateTableData();
    },
    handleAdd() {
      if (this.items.length === 3) return;

      this.items.push({
        key: uid,
        text: uid++,
        specificationName: '',
        specificationValue: [],
        valueLength: 1,
      });
    },
  },
};
</script>
