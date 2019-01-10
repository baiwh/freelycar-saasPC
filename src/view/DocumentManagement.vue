<template>
  <div>
    <!--第一模块-->
    <el-card shadow="hover">
      <el-form :model="form" ref="form" label-width="100px">

        <el-row>
          <el-col :span="8">
            <el-form-item label="单据编号：" prop="number">
              <el-input v-model="form.number" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目类别：" size="small">
              <el-select v-model="form.kind" placeholder="请选择项目类别">
                <el-option v-for="item in kindOptions" :key="item.index" :label="item.kind"
                           :value="item.kind"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <span>车辆状态：</span>
            <el-radio-group v-model="form.carState" size="small">
              <el-radio-button label="接"></el-radio-button>
              <el-radio-button label="完"></el-radio-button>
              <el-radio-button label="交"></el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="车牌号码：" prop="carNumber">
              <el-input v-model="form.carNumber" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算状态：">
              <el-select v-model="form.state" placeholder="请选择会员卡类" size="small">
                <el-option label="已结算" value="completed"></el-option>
                <el-option label="未结算" value="processing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="时间类型：">
              <el-select v-model="form.dateKind" placeholder="请选择时间类型" size="small">
                <el-option v-for="item in dateKindOptions" :key="item.index" :label="item.dateKind"
                           :value="item.dateKind"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-show="visible">
            <el-form-item>
              <el-date-picker
                v-model="form.dateValue"
                type="daterange"
                size="small"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!--两个按钮-->
      <el-row :gutter="30">
        <el-col :span="3">
          <el-button type="primary" plain size="small">查询</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" plain size="small">清空</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!--第二模块-->
    <el-card shadow="hover">
      <!--导出excel按钮-->
      <el-row>
        <el-col :span="3">
          <el-button type="primary" size="small" icon="el-icon-download">导出表单</el-button>
        </el-col>
      </el-row>

      <el-table v-loading="loading" :data="docManagementTable">
        <el-table-column label="单据编号" align="center">
          <template slot-scope="scope">
            <router-link to="/ConsumptionOrder/DocumentDetails">
              {{scope.row.docNumber}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column property="docDate" label="单据时间" align="center"></el-table-column>
        <el-table-column property="carNumber" label="车牌号" align="center"></el-table-column>
        <el-table-column property="phone" label="手机号" align="center"></el-table-column>
        <el-table-column property="itemKind" label="项目类别" align="center"></el-table-column>
        <el-table-column property="cabinet" label="智能柜" align="center"></el-table-column>
        <el-table-column property="car" label="车辆" align="center"></el-table-column>
        <el-table-column property="parkPlace" label="停车位置" align="center"></el-table-column>
        <el-table-column property="receiveDate" label="接车时间" align="center"></el-table-column>
        <el-table-column property="sendDate" label="交车时间" align="center"></el-table-column>
        <el-table-column property="orderAmounts" label="订单金额" align="center"></el-table-column>
        <el-table-column property="payAmounts" label="支付金额" align="center"></el-table-column>
        <el-table-column property="state" label="结算状态" align="center"></el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" v-show="scope.row.car === '已接'" @click="completedVisible = true">完工</el-button>
            <router-link to="/ConsumptionOrder/DocumentDetails">
              <el-button size="mini" type="primary" v-show="scope.row.car === '已接' && scope.row.state === '未结算'">修改</el-button>
              <el-button size="mini" type="primary" v-show="scope.row.car === '已交' && scope.row.state === '已结算'" class="marginLeft">查看</el-button>
            </router-link>
            <el-button size="mini" type="primary" v-show="scope.row.car === '已完'" @click="deliveryVisible = true">交车</el-button>
            <router-link to="/ConsumptionOrder/SettlementCenter">
              <el-button size="mini" type="primary" v-show="scope.row.car !== '已接' && scope.row.state === '未结算'">结算</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>

      <!--分页器-->
      <pagingDevice
        :pageData.sync="pageData"
        @changePage="changePage"></pagingDevice>

    </el-card>

    <!--完工弹出框-->
    <el-dialog title="完工" :visible.sync="completedVisible" width="50%">
      <div>
        <el-row>
          <el-col :span="4">
            完工时间：
          </el-col>
          <el-date-picker
            v-model="datePickerValue"
            type="daterange"
            size="small"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width:80%">
          </el-date-picker>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col :span="4">
            停车位置：
          </el-col>
          <el-input v-model="input" placeholder="请输入内容" style="width: 80%" size="small"></el-input>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col :span="4">
            备注：
          </el-col>
          <el-input  type="textarea" :rows="2" placeholder="请输入内容" v-model="input" style="width: 80%">
          </el-input>
        </el-row>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="completedVisible = false">取 消</el-button>
        <el-button type="primary" @click="completedVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!--交车弹出框-->
    <el-dialog title="交车" :visible.sync="deliveryVisible">
      <div>
        <el-row>
          <el-col :span="4">
            完工时间：
          </el-col>
          <el-date-picker
            v-model="datePickerValue"
            type="daterange"
            size="small"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width:80%">
          </el-date-picker>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col :span="4">
            备注：
          </el-col>
          <el-input  type="textarea" :rows="2" placeholder="请输入内容" v-model="input" style="width: 80%">
          </el-input>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deliveryVisible = false">取 消</el-button>
        <el-button type="primary" @click="deliveryVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'DocumentManagement',
    data() {
      return {
        input: '',
        visible: 'true',
        form: {
          number: '',
          kind: '',
          carState: '',
          carNumber: '',
          state: '',
          dateKind: '',
          dateValue: ''
        },
        kindOptions: [{
          index: 1,
          kind: '维修'
        }, {
          index: 2,
          kind: '洗车'
        }, {
          index: 3,
          kind: '美容'
        }],
        dateKindOptions: [{
          index: 1,
          kind: '单据时间'
        }, {
          index: 2,
          kind: '接车时间'
        }, {
          index: 3,
          kind: '交车时间'
        }, {
          index: 4,
          kind: '完工时间'
        }],
        docManagementTable: [{
          docNumber: '11111111',
          car: '已接',
          state: '未结算'
        }, {
          docNumber: '222',
          car: '已接',
          state: '已结算'
        }, {
          docNumber: '333',
          car: '已交',
          state: '已结算'
        }, {
          docNumber: '444',
          car: '已交',
          state: '未结算'
        }, {
          docNumber: '555',
          car: '已完',
          state: '已结算'
        }, {
          docNumber: '666',
          car: '已完',
          state: '未结算'
        }],
        pageData: {
          currentPage: 1,
          pageSize: 10,
          pageTotal: 1000
        },
        completedVisible: false,
        datePickerValue: '',
        deliveryVisible: false
      }
    },
    methods: {
      changePage() {

      }
    },
    mounted: function () {

    }
  }
</script>

<style lang="less">
  .el-card {
    margin-bottom: 40px;
  }
  .el-table {
    margin-top: 40px;
  }
  .el-table .cell a {
    color: #409EFF;
    text-decoration: none;
  }
  .el-date-editor--daterange.el-input__inner {
    width: 80%;
  }
  .el-radio-button--small .el-radio-button__inner {
    padding: 9px;
    margin-right: 10px;
  }
  .el-radio-button--small .el-radio-button__inner {
    border-radius: 21px!important;
  }
  .marginLeft {
    margin-left: 0px!important;
  }
</style>
