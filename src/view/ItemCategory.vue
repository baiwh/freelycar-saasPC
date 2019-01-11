<template>
  <div>
    <!--标签页-->
    <el-tabs v-model="item">

      <!--项目类别-->
      <el-tab-pane label="项目类别" name="first">

        <!--新增类别按钮-->
        <el-row>
          <el-button type="primary" @click="handleModify1(false)" plain size="small">新增类别</el-button>
        </el-row>

        <!--表格-->
        <el-table :data="tableData1" border>
          <el-table-column label="序号" type="index" align="center"></el-table-column>
          <el-table-column prop="name" label="类别名称" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="comment" label="备注" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleModify1(true,scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页器-->
        <el-row class="show">
          <pagingDevice
            :pageData.sync="pageData1"
            @changePage="getTableData1"></pagingDevice>
        </el-row>

      </el-tab-pane>

      <!--项目管理-->
      <el-tab-pane label="项目管理" name="second">

        <!--条件查询-->
        <el-row>
          <el-col :span="10">
            <span>项目名称：</span>
            <el-input v-model="itemName" size="small"></el-input>
          </el-col>
          <el-col :span="10" :offset="1">
            <span>项目类别：</span>
            <el-input v-model="itemCategory" size="small"></el-input>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="primary" size="small" @click="getTableData2">查询</el-button>
          </el-col>
        </el-row>

        <!--按钮-->
        <el-row :gutter="30">
          <el-col :span="3">
            <el-button type="primary" plain size="small">新增项目</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" plain size="small">删除项目</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" plain size="small">上传导入文件</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" plain size="small">下载导入模板</el-button>
          </el-col>
        </el-row>

        <!--表格-->
        <el-table ref="multipleTable" :data="tableData2" tooltip-effect="dark" border
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column prop="name" label="项目名称"></el-table-column>
          <el-table-column prop="" label="项目类别"></el-table-column>
          <el-table-column prop="price" label="项目价格"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="comment" label="备注" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleModify2(true,scope.row)">修改</el-button>
              <el-popover placement="top" width="160" v-model="isDelete">
                <p>确定删除？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="isDelete = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="handleDelete(scope.row)">确定</el-button>
                </div>
                <el-button slot="reference" size="mini" type="danger">删除</el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="service" label="智能柜服务">
            <template slot-scope="scope">
              <el-button size="mini" :type="scope.row.service==0? 'success': 'info'">
                {{scope.row.up === 0 ? '智能柜服务':'取消'}}
              </el-button>
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
        <el-row class="show">
          <pagingDevice
            :pageData.sync="pageData2"
            @changePage="getTableData2"></pagingDevice>
        </el-row>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'ItemCategory',
    data() {
      return {
        loading: true,
        item: 'first',
        itemName: '',
        itemCategory: '',
        multipleSelection: [],
        isDelete: false,
        tableData1: [],
        pageData1: {
          currentPage: 1,
          pageSize: 10,
          pageTotal: 100
        },
        tableData2: [],
        pageData2: {
          currentPage: 1,
          pageSize: 10,
          pageTotal: 100
        },
      }
    },
    methods: {
      /**
       *项目类别
       */

      // 获取项目类别列表
      getTableData1() {
        this.$get('/projectType/list', {
          storeId: 1,
          currentPage: this.pageData1.currentPage,
          pageSize: this.pageData1.pageSize
        }).then((res) => {
          this.loading = false
          this.tableData1 = res.data
          this.pageData1.currentPage = res.currentPage
          this.pageData1.pageSize = res.pageSize
          this.pageData1.pageTotal = res.total
        })
      },

      // 新增类别、修改按钮（打开弹框、要获取项目详情）
      handleModify1(type, row) {
        if (type) {
          // 修改
          this.$get('/projectType/detail', {
            id: ""
          }).then((res) => {

          })
        } else {
          // 新增
        }
      },

      // 保存按钮（提交）
      submitData1() {
        this.$post('/projectType/modify', {
          id: "",
          name: "美容",
          comment: "车辆美容类",
          storeId: 1
        }).then((res) => {

        })
      },

      /**
       *项目管理
       */

      // 获取项目管理列表
      getTableData2() {
        this.$get('/project/list?', {
          storeId: 1,
          currentPage: this.pageData2.currentPage,
          pageSize: this.pageData2.pageSize,
          name: this.itemName,
          projectTypeId: ''
        }).then((res) => {
          this.loading = false
          this.tableData2 = res.data
          this.pageData2.currentPage = res.currentPage
          this.pageData2.pageSize = res.pageSize
          this.pageData2.pageTotal = res.total
        })
      },

      // 新增、修改（打开弹框、获取详情）
      handleModify2(type, row) {
        if (type) {
          // 修改
          this.$get('/project/detail', {
            id: ""
          }).then((res) => {

          })
        } else {
          // 新增
        }
      },

      // 保存按钮（提交）
      submitData2() {
        this.$post('/project/modify', {
          id: "",
          name: "美容",
          comment: "车辆美容类",
          storeId: 1
        }).then((res) => {

        })
      },

      // 批量删除项目
      // 上传导入文件
      // 下载导入模板
      // 删除单个项目
      handleDelete(row) {
        this.$get('/project/delete', {
          id: row.id
        }).then((res) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getDataList()
        })
      },

      // 智能柜服务
      // 上架下架

      // table多选功能
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    },
    mounted: function () {
      this.getTableData1()
      this.getTableData2()
    }
  }
</script>

<style lang="less" scoped>
  .el-row {
    margin-top: 20px;
  }

  .el-table {
    margin-top: 30px;
  }

  .el-input {
    width: 60%;
  }

  .show > div:nth-of-type(1) {
    height: 82px;
  }
</style>
