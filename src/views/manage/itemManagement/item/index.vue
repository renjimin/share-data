<template>
  <el-tree
    :data="treedata"
    :props="defaultProps"
    show-checkbox
    node-key="id"
    default-expand-all
    :expand-on-click-node="false"
    :render-content="renderContent">
  </el-tree>
</template>


<script>
let id = 1000;
import { getAllTree } from '@/api/index/index'
export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treedata:''
    }
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      let resall = await getAllTree();
      this.treedata =  this.treeData(resall.data);
    },
    /**
     * 快速生成树形
     */
    treeData(data){
      let cloneData = JSON.parse(JSON.stringify(data))    // 对源数据深度克隆
      let tree = cloneData.filter(father=>{              //循环所有项
        let branchArr = cloneData.filter(child=>{
          return father.id == child.pId      //返回每一项的子级数组
        });
        if(branchArr.length>0){
          father.children = branchArr;    //如果存在子级，则给父级添加一个children属性，并赋值
        }
        return father.pId==0;      //返回第一层
      });
      return tree     //返回树形数据
    },
    append(data) {
      console.log(data)
      this.$prompt('', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        console.log(value)
        const newChild = { id: id++, name: 'testtest', children: [] };
        // if (!value.children) {
        //   this.$set(value, 'children', []);
        // }
        this.treedata.children.push(value);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
      // const newChild = { id: id++, label: 'testtest', children: [] };
      // if (!data.children) {
      //   this.$set(data, 'children', []);
      // }
      // data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          <span>
            <el-button style="font-size: 12px;" type="text" on-click={ () => this.append(data) }>添加</el-button>
            <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>编辑</el-button>
            <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
          </span>
        </span>);
    }
  }
};
</script>
