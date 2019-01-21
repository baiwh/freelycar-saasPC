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
        <el-button size="small" type="primary">查询</el-button>
      </el-col>
    </el-row>

    <!--两个按钮-->
    <el-row :gutter="10">
      <el-col :span="4">
        <el-button type="primary" size="small" plain @click="handleAdd(true)">新增员工</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="small" plain>删除员工</el-button>
      </el-col>
    </el-row>

    <!--表格-->
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border
              @selection-change="handleSelectionChange" v-loading="loading">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column prop="num" label="员工工号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="position" label="职位"></el-table-column>
      <el-table-column prop="level" label="级别"></el-table-column>
      <el-table-column prop="creationTime" label="创建时间"></el-table-column>
      <el-table-column prop="remarks" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleAdd(false)">修改</el-button>
          <el-popover
            placement="top"
            width="160"
            :ref="scope.$index">
            <p>确定删除？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="handleClose(scope.$index)">取消</el-button>
              <el-button type="primary" size="mini" @click="handleDelete(scope.$index,scope.row)">确定</el-button>
            </div>
          </el-popover>
          <el-button size="mini" v-popover="scope.$index" type="danger">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="opening" label="智能柜技师功能">
        <template slot-scope="scope">
          <el-popover
            placement="top"
            width="160"
            :ref="scope.row.name">
            <p>确定关闭技师端账号吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="handleClose(scope.row.name)">取消</el-button>
              <el-button type="primary" size="mini" @click="handleOk(scope.row.name,scope.row)">确定</el-button>
            </div>
          </el-popover>
          <el-button size="mini" v-popover="scope.row.name" type="info" v-show="scope.row.opening !== 0">关闭</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="success"
                     v-show="scope.row.opening === 0" style="margin-left: 0;">开通</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页器-->
    <pagingDevice
      :pageData.sync="pageData"
      @changePage="changePage"></pagingDevice>

    <!--新增员工、修改员工模态框-->
    <el-dialog :title="dialogOneTitle" :visible.sync="dialogVisible1">
      <el-row>
        <el-col :span="4" :offset="2">员工姓名：</el-col>
        <el-col :span="18">
          <el-input v-model="input" placeholder="请输入内容" style="width: 80%" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="2">性别：</el-col>
        <el-col :span="18">
          <el-radio-group v-model="gender" style="width: 80%">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="2">手机号码：</el-col>
        <el-col :span="18">
          <el-input v-model="input" placeholder="请输入内容" style="width: 80%" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="2">职位：</el-col>
        <el-col :span="18">
          <el-select v-model="selectValue" placeholder="请选择" size="small">
            <el-option v-for="item in selectOptions1" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="2">级别：</el-col>
        <el-col :span="18">
          <el-select v-model="selectValue" placeholder="请选择" size="small">
            <el-option v-for="item in selectOptions2" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="2">备注：</el-col>
        <el-col :span="18">
          <el-input  type="textarea" placeholder="请输入内容" v-model="input" style="width:80%"></el-input>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
      </div>
    </el-dialog>

    <!--技师模态框-->
    <el-dialog title="开通技师端账号" :visible.sync="dialogVisible2">
      <el-row>
        <el-col :span="6" :offset="2">技师登录账号：</el-col>
        <el-col :span="16">
          <el-input v-model="input" placeholder="请输入内容" style="width: 80%" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="2">技师登录密码：</el-col>
        <el-col :span="16">
          <el-input v-model="input" placeholder="请输入内容" style="width: 80%" size="small"></el-input>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'EmployeeManagement',
    data() {
      return {
        loading: '',
        input: '',
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
            name:'2',
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
        gender: '',
        selectValue: '',
        selectOptions1: [{
          label: '1',
          value: '1'
        }],
        selectOptions2: [{
          label: '2',
          value: '2'
        }],
        dialogOneTitle: '',
        dialogVisible1: false,
        dialogVisible2: false
      }
    },
    methods: {
      // table多选功能
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      //对话框
      handleAdd(type){
        if(type){
          this.dialogOneTitle = '新增员工',
          this.dialogVisible1 = true
        }else {
          this.dialogOneTitle = '修改员工',
          this.dialogVisible1 = true
        }
      },

      // 智能柜技师功能
      handleEdit(index, row) {
        if(row.opening === 0) {
          this.dialogVisible2 = true
        }else {

        }
      },

      // 删除当前行
      handleClose(id){
        this.$refs[id].doClose()
      },
      handleDelete(id, row) {
        this.handleClose(id)
      },

      // 页码发生改变时调用
      changePage() {
        //可以获取列表用。也可以直接换成获取列表的方法
      },

      handleOk(id, row) {

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
