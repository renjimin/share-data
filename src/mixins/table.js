export default {
  data() {
    return {
      autoList: true,
      multilevel: false,
      tableData: [],
      total: 0,
      tableLoading: false,
      queryList: {
        pageNum: 1,
        pageSize: 20,
      },
    }
  },
  created() {
    if (this.autoList) {
      this.getList();
    }
  },
  methods: {
    // 获取数据
    getList() {
      return new Promise(async (resolve, reject) => {
        this.tableLoading = true;
        if (this._beforeGetList && typeof this._beforeGetList == "function") {
          this._beforeGetList()
        }
        try {
          let list = [];
          let total = 0;
          let res = await this.getListApi(this.queryList);

          if (res) {
            // 多级
            if (this.multilevel) {
              if (res.pageInfo) {
                list = res.pageInfo.list || [];
                total = res.pageInfo.total || 0;
              }
              if (res.detailResponseParams) {
                list = res.detailResponseParams.list || [];
                total = res.detailResponseParams.total || 0;
              }
            } else {
              list = res.list || [];
              total = res.total || 0;
            }
          }

          if (this._afterGetList && typeof this._afterGetList == "function" && res) {
            this._afterGetList(res)
          }

          this.total = total;
          this.tableData = list;
          this.tableLoading = false;
          resolve();
        } catch (error) {
          console.log(error);
          this.tableLoading = false;
          reject()
        }
      })
    },
    // 改变每页显示的条数
    handleSizeChange(size) {
      this.queryList.pageNum = 1;
      this.queryList.pageSize = size;
      this.getList();
    },
    // 改变当前页
    handleCurrentChange(currentPage) {
      this.queryList.pageNum = currentPage;
      this.getList();
    },
    // 搜索数据
    handleSearch() {
      this.queryList.pageNum = 1;
      this.getList();
    },
    // 重置表单
    resetForm() {
      this.queryList = {
        pageNum: 1,
        pageSize: 20,
      }
    }
  }
}
