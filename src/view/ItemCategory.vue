<template>
  <div>
    <!--标签页-->
    <el-tabs v-model="item">
      <!--项目类别-->
      <el-tab-pane label="项目类别" name="first">
        <!--新增类别按钮-->
        <el-row>
          <el-button type="primary" plain size="small"
                     @click="onAddCategory">新增类别</el-button>
        </el-row>

        <el-table :data="itemCategoryTable" border>
          <el-table-column label="序号" type="index"
                           align="center"></el-table-column>
          <el-table-column prop="itemName" label="类别
名称" align="center"></el-table-column>
          <el-table-column prop="createDate" label="创
建时间" align="center"></el-table-column>
          <el-table-column prop="tips" label="备注"
                           align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary"
                         @click="onChangeCategory">修改</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页器-->
        <el-row class="show">
          <pagingDevice
            :pageData.sync="pageData"
            @changePage="changePage"></pagingDevice>
        </el-row>

      </el-tab-pane>

      <!--项目管理-->
      <el-tab-pane label="项目管理" name="second">
        <!--条件查询-->
        <el-row>
          <el-col :span="10">
            <span>项目名称：</span>
            <el-input v-model="input"
                      size="small"></el-input>
          </el-col>
          <el-col :span="10" :offset="1">
            <span>项目类别：</span>
            <el-input v-model="input"
                      size="small"></el-input>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="primary" size="small">查询
            </el-button>
          </el-col>
        </el-row>

        <!--按钮-->
        <el-row :gutter="30">
          <el-col :span="3">
            <el-button type="primary" plain
                       size="small" @click="onNewProject">新增项目</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" plain
                       size="small">删除项目</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" plain
                       size="small">上传导入文件</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" plain
                       size="small">下载导入模板</el-button>
          </el-col>
        </el-row>

        <el-table ref="multipleTable"
                  :data="managementTable" tooltip-effect="dark" border
                  @selection-
                  change="handleSelectionChange">
          <el-table-column type="selection"></el-table-column>
            <el-table-column label="序号"
                             type="index"></el-table-column>
            <el-table-column prop="itemName" label="项目
名称"></el-table-column>
            <el-table-column prop="itemCategory" label="
项目类别"></el-table-column>
            <el-table-column prop="itemPrice" label="项目
价格"></el-table-column>
            <el-table-column prop="creationTime" label="
创建时间"></el-table-column>
            <el-table-column prop="remarks" label="备注"
                             show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button size="mini" type="primary"
                           @click="onChangeProject">修改</el-button>
                <el-popover
                  ref="popover{{$index}}"
                  placement="top"
                  width="160"
                  v-model="scope.row.deleteVisible">
                  <p>确定删除吗？</p>
                  <div style="text-align: right; margin:
0">
                    <el-button size="mini" type="text"
                               @click="scope.row.deleteVisible = false">取消</el-button>
                      <el-button type="primary" size="mini"
                                 @click="scope.row.deleteVisible = false">确定</el-button>
                  </div>
                  <el-button size="mini" type="danger"
                             slot="reference">删除</el-button>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="service" label="智能柜
服务">
              <template slot-scope="scope">
                <el-button size="mini"
                           :type="scope.row.service==0? 'success': 'info'"
                           @click="onService(scope.row.service)">
                  {{scope.row.service === 0 ? '智能柜服务':'取消'}}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="up" label="上架/下架">
              <template slot-scope="scope">
                <el-button size="mini" @click="onUp
(scope.row.up)"

                           :type="scope.row.up===0?'success':'info'">
                  {{ scope.row.up===0?'上架':'下架'}}
                </el-button>
              </template>
            </el-table-column>
        </el-table>

        <!--分页器-->
        <el-row class="show">
          <pagingDevice
            :pageData.sync="pageData"
            @changePage="changePage"></pagingDevice>
        </el-row>

      </el-tab-pane>
    </el-tabs>

    <!--项目类别模态框-->
    <el-dialog :title="dialogTitle"
               :visible.sync="addCategoryVisible" width="50%">
      <div>
        <el-row style="margin-top: 20px">
          <el-col :span="4">
            类别名称：
          </el-col>
          <el-input v-model="input" placeholder="请输入
内容" style="width: 80%" size="small"></el-input>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col :span="4">
            备注：
          </el-col>
          <el-input  type="textarea" :rows="2"
                     placeholder="请输入内容" v-model="input" style="width:80%">
          </el-input>
        </el-row>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addCategoryVisible = false">
          取 消</el-button>
        <el-button type="primary"
                   @click="addCategoryVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!--项目管理模态框-->
    <el-dialog :title="managementDialogTitle"
               :visible.sync="addManagementVisible">
      <el-row>
        <el-col :span="4">项目名称：</el-col>
        <el-col :span="8">
          <el-input v-model="input" placeholder="请输入
内容" style="width: 80%" size="small"></el-input>
        </el-col>
        <el-col :span="4">项目类别：</el-col>
        <el-col :span="8">
          <el-select v-model="selectValue"
                     placeholder="请选择" style="width: 80%">
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">项目价格：</el-col>
        <el-col :span="8">
          <el-input v-model="input" placeholder="请输入
内容" style="width: 80%" size="small"></el-input>
        </el-col>
        <el-col :span="4">备注：</el-col>
        <el-col :span="8">
          <el-input  type="textarea" :rows="2"
                     placeholder="请输入内容" v-model="input" style="width:
80%"></el-input>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addManagementVisible =
false">取 消</el-button>
        <el-button type="primary"
                   @click="addManagementVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!--智能柜服务和上下架模态框-->
    <el-dialog :title="contentTitle"
               :visible.sync="dialogVisible" width="30%" center>
      <span>{{dialogContent}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消
</el-button>
    <el-button type="primary" @click="dialogVisible =
false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'ItemCategory',
    data() {
      return {
        input: '',
        item: 'first',
        itemCategoryTable: [{}],
        pageData: {
          currentPage: 1,
          pageSize: 10,
          pageTotal: 100
        },
        managementTable: [{
          deleteVisible: false,
          service: 1,
          up: 1
        }, {
          deleteVisible: false,
          service: 0,
          up: 0
        }],
        addCategoryVisible: false,
        dialogTitle: '',
        addManagementVisible: false,
        managementDialogTitle: '',
        selectValue: '',
        selectOptions: [{
          label: '项目一',
          value: 'one',
        }],
        contentTitle: '',
        dialogVisible: false,
        dialogContent: ''
      }
    },
    methods: {
      changePage() {},
      onAddCategory() {
        this.addCategoryVisible = true;
        this.dialogTitle = '新增类别'
      },
      onChangeCategory() {
        this.addCategoryVisible = true;
        this.dialogTitle = '修改类别'
      },
      onNewProject() {
        this.addManagementVisible = true;
        this.managementDialogTitle = '新增项目'
      },
      onChangeProject() {
        this.addManagementVisible = true;
        this.managementDialogTitle = '修改项目'
      },
      onService(type) {
        this.dialogVisible = true
        if(type == 0) {
          this.contentTitle = '开通智能柜服务提示';
          this.dialogContent = '确认开通智能柜服务'
        }else {
          this.contentTitle = '取消智能柜服务提示';
          this.dialogContent = '确认取消智能柜服务'
        }
      },
      onUp(type) {
        this.dialogVisible = true;
        if(type == 0) {
          this.contentTitle = '上架提示';
          this.dialogContent = '确认进行上架'
        }else {
          this.contentTitle = '下架提示';
          this.dialogContent = '确认进行下架'
        }
      },
      handleSelectionChange() {}
    },
    mounted: function () {

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
