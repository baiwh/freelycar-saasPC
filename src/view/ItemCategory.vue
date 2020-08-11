<template>
  <div>
    <!--标签页-->
    <el-tabs v-model="item">

      <!--项目管理-->
      <el-tab-pane label="项目管理" name="first">

        <!--条件查询-->
        <el-row>
          <el-col :span="10">
            <span>项目名称：</span>
            <el-input v-model="itemName" size="small"></el-input>
          </el-col>
          <el-col :span="10" :offset="1">
            <span>项目类别：</span>
            <el-select size="small" clearable v-model="itemCategory" placeholder="请选择" style="width: 80%">
              <el-option v-for="item in tableData1" :key="item.id" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="primary" size="small" @click="getTableData2(1)">查询</el-button>
          </el-col>
        </el-row>

        <!--按钮-->
        <el-row :gutter="30">
          <el-col :span="3">
            <el-button type="primary" plain size="small" @click="addProject2(false)">新增项目</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" plain size="small" @click="allDelete">删除项目</el-button>
          </el-col>
          <!--<el-col :span="4">-->
          <!--<el-button type="primary" plain size="small" @click="uploadFile">上传导入文件</el-button>-->
          <!--</el-col>-->
          <!--<el-col :span="4">-->
          <!--<el-button type="primary" plain size="small" @click="downloadFile">下载导入模板</el-button>-->
          <!--</el-col>-->
        </el-row>

        <!--表格-->
        <el-table ref="multipleTable" :data="tableData2" tooltip-effect="dark" border
                  @selection-change="handleSelectionChange" :default-sort="{prop: 'sort', order: 'ascending'}">
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column align="center" label="序号" type="index"></el-table-column>
          <el-table-column align="center" prop="name" width="80" label="项目名称"></el-table-column>
          <el-table-column align="center" prop="projectTypeName" width="80" label="项目类别"></el-table-column>
          <el-table-column align="center" prop="standard" label="价格类型" :formatter="standardFilter"></el-table-column>
          <el-table-column align="center" prop="price" label="项目价格"></el-table-column>
          <el-table-column align="center" prop="memberPrice" width="80" label="会员价格"></el-table-column>
          <el-table-column align="center" prop="createTime" width="100" label="创建时间"></el-table-column>
          <el-table-column align="center" prop="comment" label="备注" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="modifyProject2(scope.row)">修改</el-button>
              <el-popover placement="top" width="160" :ref="scope.$index">
                <p>确定删除？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="handleClose(scope.$index)">取消</el-button>
                  <el-button type="primary" size="mini" @click="handleDelete(scope.row,scope.$index)">确定</el-button>
                </div>
              </el-popover>
              <el-button slot="reference" size="mini" type="danger" v-popover="scope.$index">删除</el-button>
            </template>
          </el-table-column>

          <el-table-column align="center" prop="saleStatus" label="智能柜服务">
            <template slot-scope="scope">
              <el-popover
                placement="top"
                width="160"
                :ref="scope.row.name">
                <p>确定{{!scope.row.saleStatus ? '开通智能柜服务' : '取消智能柜服务'}}？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="handleClose(scope.row.name)">取消</el-button>
                  <el-button type="primary" size="mini" @click="openService(scope.row)">确定</el-button>
                </div>
              </el-popover>
              <el-button size="mini" :type="!scope.row.saleStatus ? 'info': 'success'" v-popover="scope.row.name">
                {{!scope.row.saleStatus ? '开通':'取消'}}
              </el-button>
            </template>
          </el-table-column>

          <el-table-column align="center" prop="bookOnline" label="上架/下架">
            <template slot-scope="scope">
              <el-popover
                placement="top"
                width="160"
                :ref="scope.row.id">
                <p>确定进行{{scope.row.bookOnline? '下架' : '上架'}}？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="handleClose(scope.row.id)">取消</el-button>
                  <el-button type="primary" size="mini" @click="upperShelf(scope.row)">确定</el-button>
                </div>
              </el-popover>
              <el-button size="mini" :type="scope.row.bookOnline?'success':'info'" v-popover="scope.row.id">
                {{ scope.row.bookOnline?'下架':'上架'}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" label="排序" width="150">
        <template slot-scope="scope">
          <el-button  :disabled="scope.$index===0" size="mini" type="primary" @click="upLayer(scope.$index,scope.row)" >上移</el-button>
          <el-button :disabled="scope.$index===(tableData2.length-1)" size="mini" type="primary" @click="downLayer(scope.$index,scope.row)">下移</el-button>
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

      <!--项目类别-->
      <el-tab-pane label="项目类别" name="second">

        <!--新增类别按钮-->
        <el-row>
          <el-button type="primary" @click="addProject" plain size="small">新增类别</el-button>
        </el-row>

        <!--表格-->
        <el-table :data="tableData1" border>
          <el-table-column label="序号" type="index" align="center"></el-table-column>
          <el-table-column prop="name" label="类别名称" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="comment" label="备注" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="modifyProject(scope.row)">修改</el-button>
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
    </el-tabs>

    <!--项目类别模态框-->
    <el-dialog v-loading="dialogLoading1" :title="projectIsModify?'修改项目类别':'新增项目类别'"
               :visible.sync="addCategoryVisible" width="50%">
      <el-form :model="dialog1" :rules="dialog1Rules" ref="dialog1" label-width="100px">
        <el-form-item label="类别名称：" prop="name">
          <el-input v-model="dialog1.name" placeholder="请输入内容" style="width: 80%" size="small"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="dialog1.comment"
                    style="width:80%"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addCategoryVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitData1">确 定</el-button>
      </div>
    </el-dialog>

    <!--项目管理模态框-->
    <el-dialog v-loading="dialogLoading2" :title="projectIsModify2?'修改项目':'新增项目'" :visible.sync="addManagementVisible">
      <el-form :model="dialog2" :rules="dialog2Rules" ref="dialog2" label-width="100px">
        <el-form-item label="项目名称：" prop="name">
          <el-input v-model="dialog2.name" placeholder="请输入内容" style="width: 80%" size="small"></el-input>
        </el-form-item>
        <el-form-item label="项目类别：" prop="projectTypeId">
          <el-select v-model="dialog2.projectTypeId" placeholder="请选择" @change="selectChange" style="width: 80%">
            <el-option v-for="item in tableData1" :key="item.id" :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="isServiceProvider" label="服务商：" prop="serviceProviderId">
          <el-select v-model="dialog2.serviceProviderId" placeholder="请选择" style="width: 80%">
            <el-option v-for="item in serviceProviderList" :key="item.id" :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格类型：" prop="standard">
          <template>
            <el-radio-group v-model="dialog2.standard">
              <el-radio :label="0">非标准价格</el-radio>
              <el-radio :label="1">标准价格</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="项目价格：" prop="price">
          <el-input v-model="dialog2.price" placeholder="请输入内容" style="width: 80%" size="small"></el-input>
        </el-form-item>
        <el-form-item label="会员价格：" prop="memberPrice">
          <el-input v-model="dialog2.memberPrice" placeholder="请输入内容" style="width: 80%" size="small"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="comment">
          <el-input type="textarea" placeholder="请输入内容" v-model="dialog2.comment" style="width:80%"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addManagementVisible =false">取 消</el-button>
        <el-button type="primary" @click="submitData2">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'ItemCategory',
    data() {
      return {
        loading: true,
        input: '',
        item: 'first',
        itemName: '',
        itemCategory: '',
        multipleSelection: [],
        serviceProviderList: [],
        isServiceProvider:false,
        tableData1: [],
        tableData2: [],
        pageData1: {
          currentPage: 1,
          pageSize: 10,
          pageTotal: 100
        },
        pageData2: {
          currentPage: 1,
          pageSize: 10,
          pageTotal: 100
        },
        dialog1: {
          name: '',
          comment: '',
        },
        dialog1Rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ]
        },
        dialog2: {
          name: '',
          projectTypeId: '',
          serviceProviderId: '',
          price: null,
          memberPrice: null,
          comment: '',
          standard:null
        },
        dialog2Rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ],
          projectTypeId: [
            {required: true, message: '请选择项目类别', trigger: 'blur'}
          ],
          standard: [
            {required: true, message: '请选择价格类型', trigger: 'blur'}
          ],
          price: [
            {required: true, message: '请输入价格', trigger: 'blur'}
          ]
        },
        dialogLoading1: false,
        dialogLoading2: false,
        projectIsModify: false,
        projectIsModify2: false,
        addCategoryVisible: false,
        addManagementVisible: false,
        selectValue: '',
        selectOptions: [{
          label: '项目一',
          value: 'one',
        }]
      }
    },
    methods: {
      /**
       *项目类别
       */

      // 获取项目类别列表
      getTableData1() {
        this.$get('/projectType/list', {
          storeId: localStorage.getItem('storeId'),
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

      // 新增类别
      addProject() {
        this.addCategoryVisible = true
        this.projectIsModify = false
        this.dialog1 = {
          id: '',
          name: '',
          comment: '',
          storeId: localStorage.getItem('storeId')
        }
      },

      // 如果选择的是“代驾项目”就显示服务商列表
      selectChange(e){
        let item = this.tableData1.filter(item=>{
          return item.id===e
        })
        if(item[0].name.includes('代驾')){
          this.isServiceProvider=true
        }else {
          this.isServiceProvider=false
          this.dialog2.serviceProviderId = ''
        }
      },

      // 修改按钮（打开弹框、要获取项目详情）
      modifyProject(row) {
        this.addCategoryVisible = true
        this.dialogLoading1 = true
        this.projectIsModify = true
        this.$get('/projectType/detail', {
          id: row.id
        }).then((res) => {
          this.dialog1 = res
          this.dialogLoading1 = false
        })
      },

      // 保存按钮（提交）
      submitData1() {
        this.$refs['dialog1'].validate((valid) => {
          if (valid) {
            this.dialogLoading1 = true
            this.$post('/projectType/modify', {
              id: this.dialog1.id,
              name: this.dialog1.name,
              comment: this.dialog1.comment,
              storeId: localStorage.getItem('storeId')
            }).then((res) => {
              this.dialogLoading1 = false
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.addCategoryVisible = false
              this.getTableData1()
            })
          } else {
            this.$message({
              message: '有信息未填写',
              type: 'error'
            })
            return false
          }
        })
      },

      /**
       *项目管理
       */

      // 获取项目管理列表
      getTableData2(search) {
        this.$get('/project/list?', {
          storeId: localStorage.getItem('storeId'),
          currentPage: search ? search : this.pageData2.currentPage,
          pageSize: this.pageData2.pageSize,
          name: this.itemName,
          projectTypeId: this.itemCategory
        }).then((res) => {
          this.loading = false
          this.tableData2 = res.data
          console.log(this.tableData2)
          this.pageData2.currentPage = res.currentPage
          this.pageData2.pageSize = res.pageSize
          this.pageData2.pageTotal = res.total
          this.getServiceProviderList()
        })
      },

      // 获取服务商列表
      getServiceProviderList(){
        this.$get('/serviceProvider/list?', {
          currentPage: 1,
          pageSize: 1000,
          name: ''
        }).then((res) => {
          this.serviceProviderList = res.data
        })
      },

      // 价格类型过滤器
      standardFilter(row) {
        switch (row.standard) {
          case 0:
            return '非标准价格'
            break
          case 1:
            return '标准价格'
            break
        }
      },

      // 新增项目
      addProject2() {
        this.addManagementVisible = true
        this.projectIsModify2 = false
        this.dialog2 = {
          id: '',
          name: '',
          projectType: '',
          projectTypeId: '',
          serviceProviderId: '',
          price: null,
          memberPrice: null,
          standard:null,
          comment: '',
          storeId: localStorage.getItem('storeId')
        }
      },

      // 修改按钮（打开弹框、要获取项目详情）
      modifyProject2(row) {
        this.addManagementVisible = true
        this.dialogLoading2 = true
        this.projectIsModify2 = true
        this.$get('/project/detail', {
          id: row.id
        }).then((res) => {
          this.dialog2 = res
          if(res.projectTypeName.includes('代驾')) {
            this.isServiceProvider = true
          }else{
            this.isServiceProvider = false
          }
          console.log(this.dialog2)
          this.dialogLoading2 = false
        })
      },

      // 保存按钮（提交）
      submitData2() {
        this.$refs['dialog2'].validate((valid) => {
          if (valid) {
            this.dialogLoading2 = true
            // console.log(this.dialog2.memb)
            this.$post('/project/modify', {
              id: this.dialog2.id,
              name: this.dialog2.name,
              projectTypeId: this.dialog2.projectTypeId,
              serviceProviderId: this.dialog2.serviceProviderId,
              price: this.dialog2.price,
              memberPrice: this.dialog2.memberPrice===''?null:this.dialog2.memberPrice,
              comment: this.dialog2.comment,
              standard: this.dialog2.standard,
              storeId: localStorage.getItem('storeId')
            }).then((res) => {
              this.dialogLoading2 = false
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.addManagementVisible = false
              this.getTableData2()
            })
          } else {
            this.$message({
              message: '有信息未填写',
              type: 'error'
            })
            return false
          }
        })
      },

      // 批量删除项目
      allDelete() {
        let ids = []
        this.multipleSelection.filter(v => {
          ids.push(v.id)
        })
        if (this.multipleSelection.length > 0) {
          this.$post('/project/batchDelete', {
            ids: ids.join(',')
          }).then(res => {
            this.$message({
              message: '批量删除成功',
              type: 'success'
            })
            this.getTableData2()
          })
        } else {
          this.$message({
            message: '请勾选项目',
            type: 'error'
          })
        }

      },

      // 上传导入文件
      uploadFile() {

      },

      // 下载导入模板
      downloadFile() {

      },

      // 项目管理行内删除单个项目
      handleDelete(row, index) {
        this.$get('/project/delete', {
          id: row.id
        }).then((res) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.handleClose(index)
          this.getTableData2()
        })
      },

      // 智能柜服务
      openService(row) {
        if (!row.saleStatus) {
          // 上架
          this.$get('/project/upperArk', {
            id: row.id
          }).then(res => {
            this.$message({
              message: '开通智能柜成功',
              type: 'success'
            })
            this.getTableData2()
          })
        } else {
          // 下架
          this.$get('/project/lowerArk', {
            id: row.id
          }).then(res => {
            this.$message({
              message: '关闭智能柜成功',
              type: 'success'
            })
            this.getTableData2()
          })
        }
        this.handleClose(row.name);
      },

      // 上架下架
      upperShelf(row) {
        if (!row.bookOnline) {
          // 上架
          this.$get('/project/upperShelf', {
            id: row.id
          }).then(res => {
            this.$message({
              message: '上架成功',
              type: 'success'
            })
            this.getTableData2()
          })
        } else {
          // 下架
          this.$get('/project/lowerShelf', {
            id: row.id
          }).then(res => {
            this.$message({
              message: '下架成功',
              type: 'success'
            })
            this.getTableData2()
          })
        }
        this.handleClose(row.id);
      },

      // table多选功能
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      //关闭二次确认提示框
      handleClose(id) {
        this.$refs[id].doClose()
      },
       // 上移
      upLayer(index, row) {
        if (index == 0) {
          this.$message({
            message: '处于顶端，不能继续上移',
            type: 'warning'
          });
        } else {
          let param = {
          };
          param[row.id] = this.tableData2[index - 1].sort//该行的门店id和将要切换的sort
          param[this.tableData2[index - 1].id]=row.sort;//上一行数据的sort
          console.log(param)
          //视图移动
           //访问后台接口传入两个调换的门店id和sort值有后台调换顺序，刷新数据
          this.switchLocation(param);
        }
      },
      // 下移
      downLayer(index, row) {
        if (index == this.tableData2.length-1) {
          this.$message({
            message: '处于底端，不能继续下移',
            type: 'warning'
          });
        } else {
          const param = {};
          param[row.id] = this.tableData2[index + 1].sort//该行的门店id将要换成的sort
          param[this.tableData2[index + 1].id]=row.sort;//下一行数据的sort
          this.switchLocation(param);
        }
      },
      //移动请求
      switchLocation(param){
        this.$post('/project/switchLocation', 
          param
        ).then(res =>{
             this.$message({
              message: '移动成功',
              type: 'success'
            });
            this.getTableData2();
          });
      }

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
