<template>
  <div>
    <!--查询框-->
    <el-row :gutter="30">
      <el-col :span="10">卡类名称：
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="primary">查询</el-button>
      </el-col>
    </el-row>

    <!--两个按钮-->
    <el-row :gutter="30">
      <el-col :span="4">
        <el-button type="primary" plain>新增储值卡</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" plain>删除储值卡</el-button>
      </el-col>
    </el-row>

    <!--表格-->
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column prop="name" label="卡类名称"></el-table-column>
      <el-table-column prop="price" label="售卡金额"></el-table-column>
      <el-table-column prop="actualAmount" label="实际金额"></el-table-column>
      <el-table-column prop="validityPeriod" label="有效期（年）"></el-table-column>
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

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      :page-sizes="[5, 10, 20, 100]"
      :total="1000"
      layout="prev, pager, next, sizes, total"
      background>
    </el-pagination>


  </div>
</template>

<script>
  export default {
    name: 'CardManagement',
    data() {
      return {
        input: '',
        tableData: [
          {
            name: 'a',
            price: 1,
            actualAmount: 1,
            validityPeriod: 1,
            creationTime: '2018-1-1',
            remarks: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            up: 0
          },
          {
            name: 'a',
            price: 2,
            actualAmount: 2,
            validityPeriod: 2,
            creationTime: '2018-1-1',
            remarks: 'bbbbbbbbbbbbbbbbba',
            up: 1
          }
        ],
        currentPage: 1,
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit() {

      },
      handleDelete() {

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    mounted: function () {

    }
  }
</script>

<style lang="less">
  .el-input {
    width: 60%;
  }

  .el-row {
    margin-bottom: 30px;
  }
  .el-pagination{
    transform: translateX(-50%);
    left: 50%;
    position: absolute;
    margin: 50px;
  }
</style>
