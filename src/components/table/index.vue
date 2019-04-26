<template>
    <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
        v-for="(item,index) in tableCol" :key='index'
        :prop="item.prop"
        :label="item.label"
        :width="item.width">
        </el-table-column>
    </el-table>
</template>
<script>
export default {
  props:['tabledata','tableCol'],
  data () {
      console.log(this.tableCol)
    return {
        tableData: this.tabledata,
        tablecol:this.tablecol,
    }
  },
  created(){
    // this.initData();
  },
  components: {

  },
  mounted(){ 

  },
  methods: {

  },
  computed: {

  },
  watch: {

  }
};
</script>