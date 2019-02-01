<template>
  <div>
    <!--第一部分。基本信息-->
    <el-card shadow="hover">
      <el-row :gutter="60">
        <el-col :span="8">车牌号码：
          <el-input @keyup.native="getCarInfo" v-model="consumerOrder.licensePlate" size="small"
                    placeholder="请输入内容"></el-input>
          <router-link to="/MembershipManagement/AddNewCustomers">
            <addNewButton></addNewButton>
          </router-link>
        </el-col>
        <el-col :span="8">客户管理：{{consumerOrder.clientName}}
          <router-link to="/MembershipManagement/AddNewCustomers">
            <addNewButton></addNewButton>
          </router-link>
        </el-col>
        <el-col :span="8">是否会员： {{consumerOrder.isMember===''?'':consumerOrder.isMember?'是':'否'}}
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="8">品牌型号：{{consumerOrder.carBrand}}{{consumerOrder.carType?'--'+consumerOrder.carType:''}}
        </el-col>
        <el-col :span="8">手机号码：{{consumerOrder.phone}}
        </el-col>
        <el-col :span="8">接车时间：
          <el-date-picker size="small" v-model="consumerOrder.pickTime" type="datetime"
                          placeholder="选择日期时间"></el-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="8">上次里程：{{consumerOrder.lastMiles?consumerOrder.lastMiles+'/km':''}}
        </el-col>
        <el-col :span="8">历史消费：{{consumerOrder.historyConsumption?consumerOrder.historyConsumption+'/元':''}}
        </el-col>
        <el-col :span="8">接车人员：
          <el-select size="small" v-model="consumerOrder.pickCarStaffId" placeholder="请选择" @change="changeStaff">
            <el-option v-for="item in staffList" :key="item.id" :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="8">本次里程：
          <el-input size="small" v-model="consumerOrder.miles" placeholder="请输入内容"></el-input>
          /km
        </el-col>
        <el-col :span="8">剩余金额：{{consumerOrder.balance?consumerOrder.balance+'/元':''}}
        </el-col>
      </el-row>
    </el-card>

    <!--第二部分。故障-->
    <el-card shadow="hover">
      <div slot="header">
        <span>故障描述</span>
      </div>
      <el-input type="textarea" autosize
                placeholder="请输入故障描述" v-model="consumerOrder.faultDescription"></el-input>
    </el-card>

    <!--第三部分。服务项目-->
    <el-card shadow="hover">
      <div slot="header">
        <span>服务项目</span>
        <el-button type="primary" size="small" class="addButton" icon="el-icon-plus"
                   plain @click="projectAddVisible = true">添加
        </el-button>
      </div>
      <el-table :data="consumerProjectInfos" show-summary :summary-method="getSummaries" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="price" label="项目价格"></el-table-column>
        <el-table-column prop="staffName" label="施工人员">
          <template slot-scope="scope">
            <el-select size="small" v-model="consumerOrder.pickCarStaffId" placeholder="请选择" @change="changeStaff">
              <el-option v-for="item in staffList" :key="item.id" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-popover
              placement="top"
              width="160"
              v-model="visible2">
              <p>确定删除？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                <el-button type="primary" size="mini" @click="handleDelete(scope.row)">确定</el-button>
              </div>
              <el-button slot="reference" size="mini" type="danger">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--第四部分。使用配件-->
    <el-card shadow="hover" v-show="consumerProjectInfos.length>0">
      <div slot="header">
        <span>使用配件</span>
        <el-button type="primary" size="small" class="addButton" icon="el-icon-plus"
                   plain @click="fittingAddVisible = true">添加
        </el-button>
      </div>
      <el-table :data="accessoriesList" show-summary :summary-method="getFittingSummaries" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="type" label="配件类别"></el-table-column>
        <el-table-column prop="name" label="配件名称"></el-table-column>
        <el-table-column prop="count" label="数量"></el-table-column>
        <el-table-column prop="unitPrice" label="单价"></el-table-column>
        <el-table-column label="总价">
          <template slot-scope="scope">{{scope.row.count*scope.row.unitPrice}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-popover
              placement="top"
              width="160"
              v-model="visible2">
              <p>确定删除？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                <el-button type="primary" size="mini" @click="handleDelete(scope.row)">确定</el-button>
              </div>
              <el-button slot="reference" size="mini" type="danger">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--金额结算等-->
    <el-row>
      <el-col :offset="9" :span="5">项目：<span class="redPrice">70</span>元</el-col>
      <el-col :span="5">配件：<span class="redPrice">70</span>元</el-col>
      <el-col :span="5">整单金额：<span class="redPrice">70</span>元</el-col>
    </el-row>
    <el-row>
      <el-col :offset="16" :span="4">
        <el-button type="primary" @click="submitOrder">保存</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="submitOrder(true)">结算</el-button>
      </el-col>
    </el-row>

    <!--服务项目-添加模态框-->
    <el-dialog title="项目查询" :visible.sync="projectAddVisible" width="80%">
      <!--条件查询-->
      <el-row>
        <el-col :span="10">
          <span>项目名称：</span>
          <el-input v-model="itemName"></el-input>
        </el-col>
        <el-col :span="10">
          <span>项目类别：</span>
          <el-select v-model="selectValue" clearable placeholder="请选择项目类别">
            <el-option
              v-for="item in projectType"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="getServiceList">查询</el-button>
        </el-col>
      </el-row>

      <el-table :data="serviceList" @selection-change="handleSelectionChange">>
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="项目名称"></el-table-column>
        <el-table-column prop="projectTypeId" label="项目类别" :formatter="projectTypeFormat"></el-table-column>
        <el-table-column prop="price" label="项目价格"></el-table-column>
        <el-table-column prop="referWorkTime" label="参考工时"></el-table-column>
        <el-table-column prop="pricePerUnit" label="工时单价"></el-table-column>
        <el-table-column prop="comment" label="备注" show-overflow-tooltip></el-table-column>
      </el-table>

      <!--分页器-->
      <el-row style="height: 80px">
        <pagingDevice
          :pageData.sync="pageData" @changePage="getServiceList"></pagingDevice>
      </el-row>


      <div slot="footer" class="dialog-footer">
        <el-button @click="projectAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="projectAddVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!--适用配件-添加模态框-->
    <el-dialog title="配件添加" :visible.sync="fittingAddVisible" width="80%">
      <el-table :data="fittingAddTable">
        <el-table-column prop="item" label="配件类别">
          <template slot-scope="scope">
            <el-input v-model="scope.row[scope.column.property]"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="fittingName" label="配件名称">
          <template slot-scope="scope">
            <el-input v-model="scope.row[scope.column.property]"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="数量">
          <template slot-scope="scope">
            <el-select v-model="scope.row[scope.column.property]" placeholder="请选择数量">
              <el-option
                v-for="item in projectType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="fittingPrice" label="单价">
          <template slot-scope="scope">
            <el-input v-model="scope.row[scope.column.property]"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="fittingSum" label="总价">
          <template slot-scope="scope">
            <el-input v-model="scope.row[scope.column.property]"></el-input>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click="fittingAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="fittingAddVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'QuickBilling',
    data() {
      return {
        visible2: false,
        loading: false,
        input: '',
        itemName: '',
        selectValue: '',
        consumerOrder: {
          licensePlate: '',
          balance: '',
          carBrand: '',
          carId: '',
          carType: '',
          clientId: '',
          clientName: '',
          historyConsumption: null,
          isMember: '',
          lastMiles: '',
          phone: '',
          storeId: 1,
          pickTime: '',
          pickCarStaffId: '',
          pickCarStaffName: '',
          totalPrice:null,
          miles: '',
          faultDescription:''
        },
        consumerProjectInfos: [
          {
            projectId: "4028a18167aac8410167aacec2010004",
            projectName: "打蜡1",
            staffId: "4028a18167ce66590167ce6881300001",
            staffName: "张四",
            price: 10
          }
        ],
        autoParts: [
          {
            type: "耗材",
            name: "xx车蜡",
            count: 2,
            unitPrice: 25.5,
            totalPrice: 51
          }
        ],
        accessoriesList: [],
        radio: '否',
        datetime: '',
        projectType: [],
        projectAddVisible: false,
        serviceList: [],
        pageData: {
          currentPage: 1,
          pageSize: 10,
          pageTotal: 100
        },
        fittingAddVisible: false,
        fittingAddTable: [
          {
            item: 'yuio'
          }
        ],
        multipleSelection: [],
        staffList: []
      }
    },
    methods: {
      // 获取项目类别列表
      getProjectType() {
        this.$get('/projectType/list', {
          storeId: 1,
          currentPage: 1,
          pageSize: 1000
        }).then((res) => {
          this.projectType = res.data
        })
      },

      // 获取项目列表
      getServiceList() {
        this.$get('/project/list?', {
          storeId: 1,
          currentPage: this.pageData.currentPage,
          pageSize: this.pageData.pageSize,
          name: this.itemName,
          projectTypeId: this.selectValue
        }).then((res) => {
          this.loading = false
          this.serviceList = res.data
          this.pageData.currentPage = res.currentPage
          this.pageData.pageSize = res.pageSize
          this.pageData.pageTotal = res.total
        })
      },

      // 获取员工列表
      getStaffList() {
        this.$get('/staff/list', {
          storeId: 1,
          currentPage: 1,
          pageSize: 1000
        }).then((res) => {
          this.loading = false
          this.staffList = res.data
          this.pageData.currentPage = res.currentPage
          this.pageData.pageSize = res.pageSize
          this.pageData.pageTotal = res.total
        })
      },

      // 项目名称过滤器
      projectTypeFormat(row) {
        let name = ''
        this.projectType.filter(v => {
          if (v.id === row.projectTypeId) {
            name = v.name
          }
        })
        return name
      },

      // 多选
      handleSelectionChange(val) {
        this.multipleSelection = val
        console.log(val)
      },

      // 根据车牌查信息
      getCarInfo() {
        if (this.consumerOrder.licensePlate.length === 7) {
          this.$get('/order/loadClientInfoByLicensePlate', {
            licensePlate: this.consumerOrder.licensePlate,
            storeId: 1
          }).then(res => {
            console.log(res)
            this.consumerOrder = res
          })
        } else {
          this.consumerOrder = {
            licensePlate: this.consumerOrder.licensePlate,
            balance: '',
            carBrand: '',
            carId: '',
            carType: '',
            clientId: '',
            clientName: '',
            historyConsumption: null,
            isMember: '',
            lastMiles: '',
            phone: '',
            storeId: 1,
            pickTime: '',
            staffName: '',
            miles: '',
          }
        }
      },

      // 保存快速开单
      submitOrder(settlement) {
        this.$post('/order/handleOrder', {
          consumerOrder: {
            licensePlate: "牛B74DSB",
            carBrand: "别克凯越",
            carType: "2016自动挡",
            storeId: "1",
            carId: "4028802767e9302a0167e935f2c40003",
            lastMiles: 2222,
            miles: 3333,
            clientId: "4028802767e9302a0167e935f2ab0002",
            clientName: "李四",
            phone: "18918907788",
            isMember: true,
            pickTime: "2019-01-04T09:39:16.170+0000",
            pickCarStaffId: "4028a18167ce66590167ce683ac60000",
            faultDescription: ""
          },
          consumerProjectInfos: [
            {
              projectId: "4028a18167aac8410167aade77980009",
              projectName: "普洗",
              staffId: "297ede6067e3520b0167e3539eb70000",
              staffName: "张五"
            }
          ],
          autoParts: [
            {
              type: "耗材",
              name: "xx车蜡",
              count: 2,
              unitPrice: 25.5,
              totalPrice: 51
            }
          ]
        }).then(res => {
          // 结算
          if (settlement) {
            this.$router.push({path: '/ConsumptionOrder/SettlementCenter', query: {id: res.id}})
          } else {
            // 保存
          }
        })
      },

      // 选中员工后的回调，提取员工姓名
      changeStaff(id) {
        this.staffList.map(v => {
          if (v.id === id) {
            this.consumerOrder.pickCarStaffName = v.name
          }
        })
      },

      handleDelete() {
        console.log('this', this.radio)
      },
      sum(param, totalIndex, totalPriceIndex, ride) {
        const {columns, data} = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === totalIndex) {
            sums[index] = '合计'
            return
          } else if (index === totalPriceIndex) {
            if (ride) {
              const values = data.map(item => Number(item.count * item.unitPrice))
              sums[index] = eval(values.join("+"))
            } else {
              const values = data.map(item => Number(item.price))
              sums[index] = values.reduce((prev, curr) => prev + curr)
            }
          }
        })
        return sums
      },
      getSummaries(param) {
        return this.sum(param, 0, 2)
      },
      getFittingSummaries(param) {
        return this.sum(param, 0, 5, true)
      },
      changePage() {
      }
    },
    mounted: function () {
      this.getServiceList()
      this.getProjectType()
      this.getStaffList()
    }
  }
</script>

<style lang="less" scoped>
  .el-input {
    width: 60%;
  }

  .el-row {
    margin: 20px 0;
  }

  .el-card {
    margin-bottom: 40px;
  }

  .addButton {
    margin: 0 20px;
  }

  .redPrice {
    color: red;
    font-size: 25px;
    margin: 20px;
  }
</style>
