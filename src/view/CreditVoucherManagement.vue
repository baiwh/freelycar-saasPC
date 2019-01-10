<template>
  <div>
    <!--查询框-->
    <el-row :gutter="30">
      <el-col :span="10">抵用券名称：
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="primary">查询</el-button>
      </el-col>
    </el-row>

    <!--两个按钮-->
    <el-row :gutter="30">
      <el-col :span="3">
        <el-button type="primary" plain>新增抵用券</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" plain>删除抵用券</el-button>
      </el-col>
    </el-row>

    <!--表格-->
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border
              @selection-change="handleSelectionChange" v-loading="loading">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column prop="name" label="券名"></el-table-column>
      <el-table-column prop="validityPeriod" label="有效期（年）"></el-table-column>
      <el-table-column prop="project" label="项目"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="creationTime" label="创建时间"></el-table-column>
      <el-table-column prop="remarks" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="up" label="上架/下架">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                     :type="scope.row.up===0?'success':'info'">
            {{ scope.row.up===0?'上架':'下架'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页器-->
    <pagingDevice
      :pageData.sync="pageData"
      @changePage="changePage"></pagingDevice>


  </div>
</template>

<script>
  export default {
    name: 'CreditVoucherManagement',
    data() {
      return {
        input: '',
        tableData: [
          {
            name: 'a',
            price: 1,
            project: 'a',
            validityPeriod: 1,
            creationTime: '2018-1-1',
            remarks: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            up: 0
          },
          {
            name: 'a',
            price: 2,
            project: 'b',
            validityPeriod: 2,
            creationTime: '2018-1-1',
            remarks: 'bbbbbbbbbbbbbbbbba',
            up: 1
          }
        ],
        multipleSelection: [],
        pageData: {
          currentPage: 1,
          pageSize: 10,
          pageTotal: 1000
        },
      }
    },
    methods: {
      // table多选功能
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      // 上架下架
      handleEdit() {

      },

      // 删除当前行
      handleDelete() {

      },

      // 页码发生改变时调用
      changePage() {
        //可以获取列表用。也可以直接换成获取列表的方法
      }
    },
    mounted: function () {

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
