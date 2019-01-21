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
        <el-button type="primary" size="small" plain @click="addNewCard">新增抵用券</el-button>
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
      <el-table-column prop="name" label="抵用券名称"></el-table-column>
      <el-table-column prop="price" label="售券金额"></el-table-column>
      <el-table-column prop="project" label="关联项目名称"></el-table-column>
      <el-table-column prop="validTime" label="有效期（月）"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="content" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="modifyCard(scope.row)">修改</el-button>
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
              <el-button type="primary" size="mini" @click="upperShelf(scope.row.id,scope.row)">确定</el-button>
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
    <el-dialog :title="isModify?'修改抵用券':'新增抵用券'" :visible.sync="isShow">
      <el-row>
        <el-col :span="5" :offset="2">抵用券名称：</el-col>
        <el-col :span="17">
          <el-input v-model="dialog.name" style="width: 80%" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" :offset="2">金额：</el-col>
        <el-col :span="17">
          <el-input v-model="dialog.price" style="width: 80%" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" :offset="2">项目：</el-col>
        <el-col :span="17">
          <el-select v-model="dialog.project" placeholder="请选择" style="width: 80%">
            <el-option v-for="item in selectOptions1" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" :offset="2">有效期（月）：</el-col>
        <el-col :span="17">
          <el-select v-model="dialog.validTime" placeholder="请选择" style="width: 80%">
            <el-option v-for="item in selectOptions2" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" :offset="2">备注：</el-col>
        <el-col :span="17">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="dialog.content" style="width:80%"></el-input>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
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
        dialogLoading: false,
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
          name: '',
          price: '',
          project: '',
          validTime: '',
          content: '',
        },
        selectOptions1: [{
          label: '1',
          value: '1'
        }],
        selectOptions2: [{
          label: '2',
          value: '2'
        }],
        isModify: false,
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

      // 关闭再次确认的小窗口
      handleClose(id) {
        this.$refs[id].doClose()
      },

      // 上架下架
      upperShelf(id, row) {
        if (!row.bookOnline) {
          // 上架
          this.$get('/couponService/upperShelf', {
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
          this.$get('/couponService/lowerShelf', {
            id: row.id
          }).then(res => {
            this.$message({
              message: '下架成功',
              type: 'success'
            })
            this.getDataList()
          })
        }
        this.handleClose(id);
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

      // 新增抵用券
      addNewCard() {
        this.isModify = false
        this.dialog = {
          name: '',
          price: '',
          project: '',
          validTime: '',
          content: '',
          id:'',
          projectId:''
        },
          this.isShow = true
      },

      // 修改抵用券
      modifyCard(row) {
        this.isModify = true
        this.dialogLoading = true
        this.isShow = true
        // 获取详细信息
        this.$get('/couponService/detail', {
          id: row.id
        }).then((res) => {
          this.dialog = res
          this.dialogLoading = false
        })
      },

      // 模态框的保存按钮
      submit() {
        this.dialogLoading = true
        this.$post('/couponService/modify', {
          id: this.dialog.id,
          storeId: 1,
          content: this.dialog.content,
          name: this.dialog.name,
          validTime: this.dialog.validTime,
          price: this.dialog.price,
          projectId: this.dialog.projectId
        }).then(res => {
          this.dialogLoading = false
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.isShow = false
          this.getDataList()
        })
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
