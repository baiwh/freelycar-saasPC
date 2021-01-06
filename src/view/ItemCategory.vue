<template>
  <div class="minwidth">
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
          <el-col :span="10">
            <span>服务商：</span>
            <el-select
              clearable
              v-model="rspName"
              placeholder="请选择"
              style="width: 16vw"
              size="small"
            >
              <el-option
                v-for="item in serviceList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="primary" size="small" @click="getTableData2(1)"
              >查询</el-button
            >
          </el-col>
        </el-row>

        <!--按钮-->
        <el-row :gutter="30">
          <el-col :span="3">
            <el-button
              type="primary"
              plain
              size="small"
              @click="multipupperShelf"
              >批量上架</el-button
            >
          </el-col>
          <el-col :span="3">
            <el-button type="primary" plain size="small" @click="multipdownShelf">批量下架</el-button>
          </el-col>
        </el-row>

        <!--表格-->
        <el-table
          ref="multipleTable"
          :data="tableData2"
          tooltip-effect="dark"
          border
          @selection-change="handleSelectionChange"
          :default-sort="{ prop: 'sort', order: 'ascending' }"
        >
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column align="center" label="序号" type="index">
            <template slot-scope="scope">
              <span>{{
                scope.$index +
                (pageData2.currentPage - 1) * pageData2.pageSize +
                1
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="rspName"
            width="120"
            label="服务商名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="name"
            width="120"
            label="项目名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="price"
            label="项目价格"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="createTime"
            width="100"
            label="创建时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="comment"
            label="备注"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column align="center" prop="bookOnline" label="上架/下架">
            <template slot-scope="scope">
              <el-popover placement="top" width="160" :ref="scope.row.id">
                <p>确定进行{{ scope.row.bookOnline ? "下架" : "上架" }}？</p>
                <div style="text-align: right; margin: 0">
                  <el-button
                    size="mini"
                    type="text"
                    @click="handleClose(scope.row.id)"
                    >取消</el-button
                  >
                  <el-button
                    type="primary"
                    size="mini"
                    @click="upperShelf(scope.row)"
                    >确定</el-button
                  >
                </div>
              </el-popover>
              <el-button
                size="mini"
                :type="scope.row.bookOnline ? 'success' : 'info'"
                v-popover="scope.row.id"
                >{{ scope.row.bookOnline ? "下架" : "上架" }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!--分页器-->
        <el-row class="show">
          <pagingDevice
            :pageData.sync="pageData2"
            @changePage="getTableData2"
          ></pagingDevice>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="服务商排序" name="service">
        <!--表格-->
        <el-table
          ref="multipleTable"
          :data="serviceList"
          tooltip-effect="dark"
          border
          :default-sort="{ prop: 'sort', order: 'ascending' }"
        >
         
          <el-table-column align="center" label="序号" type="index" width="80px;">
            <template slot-scope="scope">
              <span>{{
                scope.$index +
                (serviceData.currentPage - 1) * serviceData.pageSize +
                1
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            width="200"
            label="服务商"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="address"
            width="200"
            label="服务商地址"
          ></el-table-column>
          <el-table-column align="center" prop="sort" v-if="false"></el-table-column>
          <el-table-column align="center" label="排序">
            <template slot-scope="scope">
          <el-button
            :disabled="scope.row.sort===10"
            size="mini"
            type="primary"
            @click="upLayer(scope.$index,scope.row)"
          >上移</el-button>
          <el-button
           :disabled="scope.$index+(serviceData.currentPage - 1) * serviceData.pageSize + 1 === serviceData.pageTotal"
            size="mini"
            type="primary"
            @click.native.prevent="downLayer(scope.$index,scope.row)"
          >下移</el-button>
        </template>
          </el-table-column>
        </el-table>

        <!--分页器-->
        <el-row class="show">
          <pagingDevice
            :pageData.sync="serviceData"
            @changePage="getserviceList"
          ></pagingDevice>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "ItemCategory",
  data() {
    return {
      loading: true,
      input: "",
      item: "first",
      itemName: "",
      itemCategory: "",
      multipleSelection: [],
      serviceProviderList: [],
      isServiceProvider: false,
      tableData1: [],
      tableData2: [],
      pageData1: {
        currentPage: 1,
        pageSize: 10,
        pageTotal: 100,
      },
      pageData2: {
        currentPage: 1,
        pageSize: 10,
        pageTotal: 100,
      },
      serviceData:{
         currentPage: 1,
        pageSize: 10,
        pageTotal: 100,
      },
      dialog1: {
        name: "",
        comment: "",
      },
      dialog1Rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      dialog2: {
        name: "",
        projectTypeId: "",
        serviceProviderId: "",
        price: null,
        memberPrice: null,
        comment: "",
        standard: null,
      },
      dialog2Rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        projectTypeId: [
          { required: true, message: "请选择项目类别", trigger: "blur" },
        ],
        standard: [
          { required: true, message: "请选择价格类型", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
      },
      dialogLoading1: false,
      dialogLoading2: false,
      projectIsModify: false,
      projectIsModify2: false,
      addCategoryVisible: false,
      addManagementVisible: false,
      selectValue: "",
      selectOptions: [
        {
          label: "项目一",
          value: "one",
        },
      ],
      rspName: "",
      serviceList: [],
      storeId: "",
      itemid: [],
    };
  },
  methods: {
    /**
     *项目类别
     */

    //获取服务商列表
    getserviceList() {
      this.$get("/sp/listByStore", {
        storeId: localStorage.getItem("storeId"),
        currentPage: this.serviceData.currentPage,
        pageSize: this.serviceData.pageSize,
      }).then((res) => {
        console.log(res);
        this.serviceList = res.data;
        this.serviceData.currentPage = res.currentPage;
        this.serviceData.pageSize = res.pageSize;
        this.serviceData.pageTotal = res.total
      });
    },
    // 获取项目列表
    getTableData2(search) {
      this.$get("/sp/project/listByStore", {
        storeId: localStorage.getItem("storeId"),
        currentPage: search ? search : this.pageData2.currentPage,
        pageSize: this.pageData2.pageSize,
        name: this.itemName,
        rspName: this.rspName,
      }).then((res) => {
        this.loading = false;
        this.tableData2 = res.data;
        console.log(this.tableData2);
        this.pageData2.currentPage = res.currentPage;
        this.pageData2.pageSize = res.pageSize;
        this.pageData2.pageTotal = res.total;
      });
    },

    // 上架下架
    upperShelf(row) {
      if (!row.bookOnline) {
        // 上架
        this.storeId = localStorage.getItem("storeId");
        this.$post("/sp/project/bookOnlineProject?storeId=" + this.storeId, [
          row.id,
        ]).then((res) => {
          this.$message({
            message: "上架成功",
            type: "success",
          });
          this.getTableData2();
        });
      } else {
        // 下架
        this.$post("/sp/project/bookOfflineProject?storeId="+this.storeId, [row.id]
        ).then((res) => {
          console.log(res)
          this.$message({
            message: "下架成功",
            type: "success",
          });
          this.getTableData2();
        });
      }
      this.handleClose(row.id);
    },
    multipupperShelf() {
      for (var i in this.multipleSelection) {
        this.itemid.push(this.multipleSelection[i].id);
      }
      this.storeId = localStorage.getItem("storeId");
      console.log(this.multipleSelection);
      this.$post(
        "/sp/project/bookOnlineProject?storeId=" + this.storeId,
        this.itemid
      ).then((res) => {
        this.$message({
          message: "上架成功",
          type: "success",
        });
        this.getTableData2();
      });
    },
    multipdownShelf(){
      for (var i in this.multipleSelection) {
        this.itemid.push(this.multipleSelection[i].id);
      }
      this.storeId = localStorage.getItem("storeId");
      console.log(this.multipleSelection);
      this.$post(
        "/sp/project/bookOfflineProject?storeId=" + this.storeId,
        this.itemid
      ).then((res) => {
        this.$message({
          message: "下架成功",
          type: "success",
        });
        this.getTableData2();
      });
    },

    // table多选功能
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //关闭二次确认提示框
    handleClose(id) {
      this.$refs[id].doClose();
    },
    //排序
    //上移
    upLayer(index, row) {
      console.log(row)
      // if (index == 0 && row.sort!== 10) {
      //   let param = {};
      //   let prestore;
      //   console.log(index)
      //   this.$get("/sp/listByStore", {
      //     storeId: localStorage.getItem("storeId"),
      //     currentPage: this.pageData.currentPage-1,
      //     pageSize: this.pageData.pageSize,
      // }).then((res) => {
      //   console.log(res)
      //   prestore = res.data[9];
      //   param[row.storeId] = prestore.sort;
      //   param[prestore.storeId] = row.sort;
      //   this.switchLocation(param);

      // });
       if(row.sort === 10){
        this.$message({
          message: "处于顶端，不能继续上移",
          type: "warning",});
      } else {
        let param = {};
        param[row.id] = this.serviceList[index - 1].sort; //该行的网点id和sort
        param[this.serviceList[index - 1].id] = row.sort; //上一行数据的sort
        console.log(param)
        //访问后台接口传入两个调换的网点id和sort值有后台调换顺序，刷新数据
        this.switchLocation(param);
      }
    },
    // 下移
    downLayer(index, row) {
      //下移当前页最后一个逻辑
      // if (index === this.storeList.length - 1 && index+(this.pageData.currentPage - 1) * this.pageData.pageSize + 1 !==this.pageData.pageTotal) {
      //   let param = {};
      //   let nextstore;
      //   this.$get("/store/list", {
      //     name: this.storeName,
      //     currentPage: this.pageData.currentPage+1,
      //     pageSize: this.pageData.pageSize,
      // }).then((res) => {
      //   nextstore = res.data[0];
      //   param[row.storeId] = nextstore.sort;
      //   param[nextstore.storeId] = row.sort;
      //   this.switchLocation(param);

      // });
      if(index+(this.serviceData.currentPage - 1) * this.serviceData.pageSize + 1 === this.serviceData.pageTotal){
        this.$message({
          message: "最后一个元素，不能下移",
          type: "warning",});
      } else {
        let param = {};
        param[row.id] = this.serviceList[index + 1].sort; //该行的网点id和下一行的sort
        param[this.serviceList[index + 1].id] = row.sort; //上一行数据的sort
        this.switchLocation(param);
      }
    },
    switchLocation(param) {
      console.log('移动')
      this.storeId = localStorage.getItem("storeId");
      this.$post("/sp/switchLocation?storeId="+this.storeId, param).then((res) => {
        this.$message({
          message: "移动成功",
          type: "success",
        });
        this.getserviceList();
      });
    },
  },
  mounted: function () {
    this.getserviceList();
    this.getTableData2();
  },
};
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
.minwidth{
  width : 100%;
  min-width: 1000px;
}
</style>
