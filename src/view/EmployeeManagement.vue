<template>
  <div>
    <!--查询框-->
    <el-row :gutter="20">
      <el-col :span="8">员工工号：
        <el-input v-model="inputNumber" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="8">员工姓名：
        <el-input v-model="inputName" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary">查询</el-button>
      </el-col>
    </el-row>

    <!--两个按钮-->
    <el-row :gutter="10">
      <el-col :span="2">
        <el-button type="primary" plain>新增员工</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" plain>删除员工</el-button>
      </el-col>
    </el-row>

    <!--表格-->
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border
              @selection-change="handleSelectionChange" v-loading="loading">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="position" label="职位"></el-table-column>
      <el-table-column prop="level" label="级别"></el-table-column>
      <el-table-column prop="creationTime" label="创建时间"></el-table-column>
      <el-table-column prop="remarks" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">修改</el-button>
          <el-popover
            placement="top"
            width="160"
            v-model="visible2">
            <p>确定删除？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
              <el-button type="primary" size="mini" @click="handleDelete(scope.row)">确定</el-button>
            </div>
            <el-button size="mini" slot="reference" type="danger">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="opening" label="智能柜技师功能">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                     :type="scope.row.opening===0?'success':'info'">
            {{ scope.row.opening===0?'开通':'关闭'}}
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
    name: 'EmployeeManagement',
    data() {
      return {
        inputNumber: '',
        inputName:'',
        tableData: [
          {
            name:'1',
            sex:'1',
            phone:'1',
            position:'1',
            level:'1',
            creationTime:'1',
            remarks:'1',
            opening:0,
          },
          {
            name:'1',
            sex:'1',
            phone:'1',
            position:'1',
            level:'1',
            creationTime:'1',
            remarks:'1',
            opening:1,
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
        this.visible2 = false
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
