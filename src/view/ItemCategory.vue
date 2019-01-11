<template>
  <div>
    <!--标签页-->
    <el-tabs v-model="item">
      <!--项目类别-->
      <el-tab-pane label="项目类别" name="first">
        <!--新增类别按钮-->
        <el-row>
          <el-button type="primary" plain size="small">新增类别</el-button>
        </el-row>

        <el-table :data="itemCategoryTable" border>
          <el-table-column label="序号" type="index" align="center"></el-table-column>
          <el-table-column prop="itemName" label="类别名称" align="center"></el-table-column>
          <el-table-column prop="createDate" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="tips" label="备注" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">修改</el-button>
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
            <el-input v-model="input" size="small"></el-input>
          </el-col>
          <el-col :span="10" :offset="1">
            <span>项目类别：</span>
            <el-input v-model="input" size="small"></el-input>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="primary" size="small">查询</el-button>
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

        <el-table ref="multipleTable" :data="managementTable" tooltip-effect="dark" border
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column prop="itemName" label="项目名称"></el-table-column>
          <el-table-column prop="itemCategory" label="项目类别"></el-table-column>
          <el-table-column prop="itemPrice" label="项目价格"></el-table-column>
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
            :pageData.sync="pageData"
            @changePage="changePage"></pagingDevice>
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
        item: 'first',
        itemCategoryTable: [{}],
        pageData: {
          currentPage: 1,
          pageSize: 10,
          pageTotal: 100
        },
        managementTable: [{}]
      }
    },
    methods: {
      changePage() {}
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
