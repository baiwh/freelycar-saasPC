<template>
  <div>
    <!--查询框-->
    <el-row :gutter="30">
      <el-col :span="10">抵用券名称：
        <el-input v-model="input" placeholder="请输入抵用券名称"></el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" size="small" @click="getDataList">查询</el-button>
      </el-col>
    </el-row>

    <!--两个按钮-->
    <el-row :gutter="30">
      <el-col :span="4">
        <el-button type="primary" size="small" plain @click="handleModify(false)">新增抵用券</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="small" plain @click="allDelete">删除抵用券</el-button>
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
          <el-popover
            placement="top"
            width="160"
            :ref="scope.$index">
            <p>确定删除本条数据？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="handleClose(scope.$index)">取消</el-button>
              <el-button type="primary" size="mini" @click="handleDelete(scope.row)">确定</el-button>
            </div>
          </el-popover>
          <el-button size="mini" v-popover="scope.$index" type="danger">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="up" label="上架/下架">
        <template slot-scope="scope">
          <el-popover
            placement="top"
            width="160"
            :ref="scope.row.id"
           >
            <p>确定进行{{scope.row.bookOnline? '下架' : '上架'}}？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="handleClose(scope.row.id)">取消</el-button>
              <el-button type="primary" size="mini" @click="handleEdit(scope.row.id,scope.row)">确定</el-button>
            </div>
          </el-popover>
          <el-button size="mini" :type="scope.row.bookOnline?'success':'info'" v-popover="scope.row.id">
            {{ scope.row.bookOnline?'下架':'上架'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页器-->
    <pagingDevice
      :pageData.sync="pageData"
      @changePage="getDataList"></pagingDevice>

    <!--抵用券弹窗-->
    <el-dialog :title="newOrChange" :visible.sync="isShow">
      <el-row>
        <el-col :span="5" :offset="2">抵用券名称：</el-col>
        <el-col :span="17">
          <el-input v-model="dialog.creditVoucherName" style="width: 80%" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" :offset="2">金额：</el-col>
        <el-col :span="17">
          <el-input v-model="dialog.creditVoucherPrice" style="width: 80%" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" :offset="2">项目：</el-col>
        <el-col :span="17">
          <el-select v-model="dialog.selectValue" placeholder="请选择" style="width: 80%">
            <el-option v-for="item in selectOptions1" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" :offset="2">有效期（月）：</el-col>
        <el-col :span="17">
          <el-select v-model="dialog.selectValue" placeholder="请选择" style="width: 80%">
            <el-option v-for="item in selectOptions2" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" :offset="2">备注：</el-col>
        <el-col :span="17">
          <el-input  type="textarea" :rows="2" placeholder="请输入内容" v-model="input" style="width:80%"></el-input>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="isShow = false">确 定</el-button>
      </div>
    </el-dialog>
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
        newOrChange: '',
        isShow: false,
        dialog: {
          creditVoucherName: '',
          creditVoucherPrice: '',
          selectValue: '',
        },
        selectOptions1: [{
          label: '1',
          value: '1'
        }],
        selectOptions2: [{
          label: '2',
          value: '2'
        }]
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
      handleClose(id) {
        this.$refs[id].doClose()
      },
      handleEdit(id,row) {
        if (!row.bookOnline) {
          // 上架
          this.$get('', {
            id: row.id
          }).then(res => {
            // this.$message({
            //   message: '上架成功',
            //   type: 'success'
            // })
            this.getDataList()
          })
        } else {
          // 下架
          this.$get('', {
            id: row.id
          }).then(res => {
            // this.$message({
            //   message: '下架成功',
            //   type: 'success'
            // })
            this.getDataList()
          })
        }
        this.handleClose(id);
      },

      // 行内删除
      handleDelete(row) {
        this.isDelate = false
        this.$get('/couponService/delete', {
          id: row.id
        }).then(res => {
          // this.$message({
          //   message: '删除成功',
          //   type: 'success'
          // })
          this.getDataList()
        })
      },

      // 批量删除
      allDelete() {

      },

      // 新增、修改
      handleModify(type, row) {
        this.isShow = true;
        if (type) {
          // 修改
          this.newOrChange = '修改抵用券'
        } else {
          // 新增
          this.newOrChange = '新增抵用券'
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
