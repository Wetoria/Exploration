<template>
  <el-form ref="skuForm">
    <el-table
      :data="tableData"
      class="sku-table"
      :span-method="SpanMethod"
      :header-cell-style="{background:'#F5F7FA',color:'#353535'}"
    >
      <el-table-column
        v-for="(col,index) of attrs"
        :key="`${key}${col.key}${index}`"
        :label="col.pName"
        width="108"
      >
        <template slot-scope="{row}">
          <span>{{columnValue(row,col.pName)}}</span>
        </template>
      </el-table-column>
      <el-table-column width="160">
        <template slot="header">
          价格(元)
          <span class="red">*</span>
        </template>
        <template slot-scope="scope">
          <el-form-item :prop="'tableData.' + scope.$index +'.sku_price'">
            <el-input
              v-model="scope.row['sku_price']"

              @keyup.native="scope.row['sku_price'] = clearNoNum(scope.row['sku_price'])"
              @change="scope.row['sku_price'] = clearNoNum(scope.row['sku_price'])"
            ></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header">
          库存
          <span class="red">*</span>
        </template>
        <template slot-scope="scope">
          <el-form-item :prop="'tableData.' + scope.$index + '.sku_stock'">
            <el-input
              v-model.number="scope.row['sku_stock']"
              onkeyup="value=value.replace(/[^\d]/g,'')"
            ></el-input>
          </el-form-item>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      key: +new Date(),
      tableData: [
        {
          specs: [
            { spec_key: '产地', sort: 2, spec_value: '武汉' },
            { spec_key: '尺码', sort: 1, spec_value: '大' },
            { spec_key: '颜色', sort: 0, spec_value: '绿色' },
          ],
          sku_img: '',
          sku_price: '',
          sku_stock: '',
          sku_id: '',
          is_default: 0,
        },
        {
          specs: [
            { spec_key: '产地', sort: 2, spec_value: '山西' },
            { spec_key: '尺码', sort: 1, spec_value: '大' },
            { spec_key: '颜色', sort: 0, spec_value: '绿色' },
          ],
          sku_img: '',
          sku_price: '',
          sku_stock: '',
          sku_id: '',
          is_default: 0,
        },
        {
          specs: [
            { spec_key: '产地', sort: 2, spec_value: '武汉' },
            { spec_key: '尺码', sort: 1, spec_value: '中' },
            { spec_key: '颜色', sort: 0, spec_value: '绿色' },
          ],
          sku_img: '',
          sku_price: '',
          sku_stock: '',
          sku_id: '',
          is_default: 0,
        },
        {
          specs: [
            { spec_key: '产地', sort: 2, spec_value: '山西' },
            { spec_key: '尺码', sort: 1, spec_value: '中' },
            { spec_key: '颜色', sort: 0, spec_value: '绿色' },
          ],
          sku_img: '',
          sku_price: '',
          sku_stock: '',
          sku_id: '',
          is_default: 0,
        },
        {
          specs: [
            { spec_key: '产地', sort: 2, spec_value: '武汉' },
            { spec_key: '尺码', sort: 1, spec_value: '小' },
            { spec_key: '颜色', sort: 0, spec_value: '绿色' },
          ],
          sku_img: '',
          sku_price: '',
          sku_stock: '',
          sku_id: '',
          is_default: 0,
        },
        {
          specs: [
            { spec_key: '产地', sort: 2, spec_value: '山西' },
            { spec_key: '尺码', sort: 1, spec_value: '小' },
            { spec_key: '颜色', sort: 0, spec_value: '绿色' },
          ],
          sku_img: '',
          sku_price: '',
          sku_stock: '',
          sku_id: '',
          is_default: 0,
        },
        {
          specs: [
            { spec_key: '产地', sort: 2, spec_value: '武汉' },
            { spec_key: '尺码', sort: 1, spec_value: '大' },
            { spec_key: '颜色', sort: 0, spec_value: '蓝色' },
          ],
          sku_img: '',
          sku_price: '',
          sku_stock: '',
          sku_id: '',
          is_default: 0,
        },
        {
          specs: [
            { spec_key: '产地', sort: 2, spec_value: '山西' },
            { spec_key: '尺码', sort: 1, spec_value: '大' },
            { spec_key: '颜色', sort: 0, spec_value: '蓝色' },
          ],
          sku_img: '',
          sku_price: '',
          sku_stock: '',
          sku_id: '',
          is_default: 0,
        },
        {
          specs: [
            { spec_key: '产地', sort: 2, spec_value: '武汉' },
            { spec_key: '尺码', sort: 1, spec_value: '中' },
            { spec_key: '颜色', sort: 0, spec_value: '蓝色' },
          ],
          sku_img: '',
          sku_price: '',
          sku_stock: '',
          sku_id: '',
          is_default: 0,
        },
        {
          specs: [
            { spec_key: '产地', sort: 2, spec_value: '山西' },
            { spec_key: '尺码', sort: 1, spec_value: '中' },
            { spec_key: '颜色', sort: 0, spec_value: '蓝色' },
          ],
          sku_img: '',
          sku_price: '',
          sku_stock: '',
          sku_id: '',
          is_default: 0,
        },
        {
          specs: [
            { spec_key: '产地', sort: 2, spec_value: '武汉' },
            { spec_key: '尺码', sort: 1, spec_value: '小' },
            { spec_key: '颜色', sort: 0, spec_value: '蓝色' },
          ],
          sku_img: '',
          sku_price: '',
          sku_stock: '',
          sku_id: '',
          is_default: 0,
        },
        {
          specs: [
            { spec_key: '产地', sort: 2, spec_value: '山西' },
            { spec_key: '尺码', sort: 1, spec_value: '小' },
            { spec_key: '颜色', sort: 0, spec_value: '蓝色' },
          ],
          sku_img: '',
          sku_price: '',
          sku_stock: '',
          sku_id: '',
          is_default: 0,
        },
        {
          specs: [
            { spec_key: '产地', sort: 2, spec_value: '武汉' },
            { spec_key: '尺码', sort: 1, spec_value: '大' },
            { spec_key: '颜色', sort: 0, spec_value: '白色' },
          ],
          sku_img: '',
          sku_price: '',
          sku_stock: '',
          sku_id: '',
          is_default: 0,
        },
        {
          specs: [
            { spec_key: '产地', sort: 2, spec_value: '山西' },
            { spec_key: '尺码', sort: 1, spec_value: '大' },
            { spec_key: '颜色', sort: 0, spec_value: '白色' },
          ],
          sku_img: '',
          sku_price: '',
          sku_stock: '',
          sku_id: '',
          is_default: 0,
        },
        {
          specs: [
            { spec_key: '产地', sort: 2, spec_value: '武汉' },
            { spec_key: '尺码', sort: 1, spec_value: '中' },
            { spec_key: '颜色', sort: 0, spec_value: '白色' },
          ],
          sku_img: '',
          sku_price: '',
          sku_stock: '',
          sku_id: '',
          is_default: 0,
        },
        {
          specs: [
            { spec_key: '产地', sort: 2, spec_value: '山西' },
            { spec_key: '尺码', sort: 1, spec_value: '中' },
            { spec_key: '颜色', sort: 0, spec_value: '白色' },
          ],
          sku_img: '',
          sku_price: '',
          sku_stock: '',
          sku_id: '',
          is_default: 0,
        },
        {
          specs: [
            { spec_key: '产地', sort: 2, spec_value: '武汉' },
            { spec_key: '尺码', sort: 1, spec_value: '小' },
            { spec_key: '颜色', sort: 0, spec_value: '白色' },
          ],
          sku_img: '',
          sku_price: '',
          sku_stock: '',
          sku_id: '',
          is_default: 0,
        },
        {
          specs: [
            { spec_key: '产地', sort: 2, spec_value: '山西' },
            { spec_key: '尺码', sort: 1, spec_value: '小' },
            { spec_key: '颜色', sort: 0, spec_value: '白色' },
          ],
          sku_img: '',
          sku_price: '',
          sku_stock: '',
          sku_id: '',
          is_default: 0,
        },
      ],
      attrs: [
        {
          spec_key: 0,
          text: 0,
          pName: '颜色',
          pValue: [
            { cName: '绿色', sku_img: '', sort: 0 },
            { cName: '蓝色', sku_img: '', sort: 0 },
            { cName: '白色', sku_img: '', sort: 0 },
          ],
        },
        {
          spec_key: 1,
          text: 1,
          pName: '尺码',
          pValue: [
            { cName: '大', sku_img: '', sort: 1 },
            { cName: '中', sku_img: '', sort: 1 },
            { cName: '小', sku_img: '', sort: 1 },
          ],
        },
        {
          spec_key: 2,
          text: 2,
          pName: '产地',
          pValue: [
            { cName: '武汉', sku_img: '', sort: 2 },
            { cName: '山西', sku_img: '', sort: 2 },
          ],
        },
      ],
    };
  },
  mounted() {
    this.calcSpan();
  },
  methods: {
    columnValue(row, specKey) {
      const { specs = [] } = row;
      const target = specs.find((item) => item.spec_key === specKey) || {};
      return target.spec_value;
    },
    calcSpan() {
      // 优化性能
      const attrs = this.attrs;
      const tableData = this.tableData;
      const attrsLen = attrs.length;
      const dataLen = tableData.length;
      for (let i = 0; i < attrsLen - 1; i++) {
        const attr = attrs[i];
        let startIndex = 0;
        let target = tableData[startIndex];
        let targetSpec = target.specs.find((item) => item.spec_key === attr.pName) || {};
        let targetSpecValue = targetSpec.spec_value;
        for (let j = 0; j < dataLen; j++) {
          const current = tableData[j];
          const currentSPec = current.specs.find((item) => item.spec_key === attr.pName) || {};
          const currentSPecValue = currentSPec.spec_value;
          if (targetSpecValue != currentSPecValue) {
            targetSpec.rowSpan = j - startIndex;
            target = current;
            targetSpec = currentSPec;
            targetSpecValue = currentSPecValue;
            startIndex = j;
          }
          if (j === dataLen - 1) {
            targetSpec.rowSpan = j - startIndex + 1;
          }
        }
      }
    },
    SpanMethod({
      row, column, rowIndex, columnIndex,
    }) {
      // 需要合并的列，最后一列不需要合并
      // 假如attrs有三个，只有第一、第二列需要处理合并
      if (columnIndex < this.attrs.length - 1) {
        const specKey = column.label;
        const targetSpec = row.specs.find((item) => item.spec_key === specKey) || {};
        const { rowSpan } = targetSpec;
        if (rowSpan) {
          return [rowSpan, 1];
        }
        return [0, 1];
      }
    },
  },
};
</script>
