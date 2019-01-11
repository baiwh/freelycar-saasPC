<template>
  <div>
    <!--查询框-->
    <el-row :gutter="30">
      <el-col :span="10">抵用券名称：
        <el-input v-model="input" placeholder="请输入抵用券名称"></el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="getDataList">查询</el-button>
      </el-col>
    </el-row>

    <!--两个按钮-->
    <el-row :gutter="30">
      <el-col :span="3">
        <el-button type="primary" plain @click="handleModify(false)">新增抵用券</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" plain @click="allDelete">删除抵用券</el-button>
      </el-col>
    </el-row>

    <!--表格-->
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border
              @selection-change="handleSelectionChange" v-loading="loading">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column prop="name" label="券名"></el-table-column>
      <el-table-column prop="validTime" label="有效期（年）"></el-table-column>
      <el-table-column prop="" label="项目"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="content" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleModify(true, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="up" label="上架/下架">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)"
                     :type="scope.row.bookOnline?'success':'info'">
            {{ scope.row.bookOnline?'下架':'上架'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页器-->
    <pagingDevice
      :pageData.sync="pageData"
      @changePage="getDataList"></pagingDevice>


  </div>
</template>

<script>
  export default {
    name: 'CreditVoucherManagement',
    data() {
      return {
        loading: true,
        input: '',
        tableData: [],
        multipleSelection: [],
        pageData: {
          currentPage: 1,
          pageSize: 10,
          pageTotal: 1000
        },
      }
    },
    methods: {
      // 获取卡类列表
      getDataList() {
        this.$get('/couponService/list', {
          storeId: 1,
          currentPage: this.pageData.currentPage,
          pageSize: this.pageData.pageSize,
          name: this.input
        }).then((res) => {
          this.loading = false
          this.tableData = res.data
          this.pageData.currentPage = res.currentPage
          this.pageData.pageSize = res.pageSize
          this.pageData.pageTotal = res.total
        })
      },

      // table多选功能
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      // 上架下架
      handleEdit(row) {
        if (!row.bookOnline) {
          // 上架
          this.$get('', {
            id: row.id
          }).then(res => {
            this.$message({
              message: '上架成功',
              type: 'success'
            })
            this.getDataList()
          })
        } else {
          // 下架
          this.$get('', {
            id: row.id
          }).then(res => {
            this.$message({
              message: '下架成功',
              type: 'success'
            })
            this.getDataList()
          })
        }
      },

      // 行内删除
      handleDelete(row) {
        this.$get('/couponService/delete', {
          id: row.id
        }).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getDataList()
        })
      },

      // 批量删除
      allDelete() {

      },

      // 新增、修改
      handleModify(type, row) {
        if (type) {
          // 修改
        } else {
          // 新增
        }
      }
    },
    mounted: function () {
      this.getDataList()
    }
  }
</script>

<style lang="less" scoped>
  .el-input {
    width: 60%;
  }

  .el-row {
    margin-bottom: 30px;
  }
</style>
