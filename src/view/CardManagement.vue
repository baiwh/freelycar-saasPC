<template>
  <div>
    <!--查询框-->
    <el-row :gutter="30">
      <el-col :span="10">卡类名称：
        <el-input v-model="cardName" placeholder="请输入卡类名称"></el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="getDataList">查询</el-button>
      </el-col>
    </el-row>

    <!--两个按钮-->
    <el-row :gutter="30">
      <el-col :span="4">
        <el-button type="primary" plain @click="handleModify(false)">新增储值卡</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" plain @click="allDelete">删除储值卡</el-button>
      </el-col>
    </el-row>

    <!--表格-->
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border
              @selection-change="handleSelectionChange" v-loading="loading">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column prop="name" label="卡类名称"></el-table-column>
      <el-table-column prop="price" label="售卡金额"></el-table-column>
      <el-table-column prop="actualPrice" label="实际金额"></el-table-column>
      <el-table-column prop="validTime" label="有效期（年）"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="comment" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleModify(true,scope.row)">修改</el-button>
          <el-popover
            placement="top"
            width="160"
            v-model="isDelate">
            <p>确定删除本条抵用券？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="isDelate = false">取消</el-button>
              <el-button type="primary" size="mini" @click="handleDelete(scope.row)">确定</el-button>
            </div>
            <el-button size="mini" slot="reference" type="danger">删除</el-button>
          </el-popover>
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
    name: 'CardManagement',
    data() {
      return {
        loading: true,
        cardName: '',
        tableData: [],
        isDelate: false,
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
        this.$get('/cardService/list', {
          storeId: 1,
          currentPage: this.pageData.currentPage,
          pageSize: this.pageData.pageSize,
          name: this.cardName
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
        this.multipleSelection = val
      },

      // 上架下架
      handleEdit(row) {
        if (!row.bookOnline) {
          // 上架
          this.$get('/cardService/upperShelf', {
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
          this.$get('/cardService/lowerShelf', {
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
        this.isDelate = false
        this.$get('/cardService/delete', {
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
