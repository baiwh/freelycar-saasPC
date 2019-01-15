<template>
  <div>
    <el-card shadow="hover">
      <div slot="header">
        <span>门店信息</span>
      </div>

      <!--表单信息-->
      <el-row>
        <el-col :span="15">
          <el-form :model="storeForm" label-width="100px">
            <el-form-item label="门店名称：" prop="storeName">
              <el-input v-model="storeForm.storeName"></el-input>
            </el-form-item>
            <el-form-item label="门店地址：" prop="storeAddress">
              <el-input v-model="storeForm.storeAddress"></el-input>
            </el-form-item>
            <el-form-item label="营业时间：" prop="businessHour">
              <el-time-picker
                is-range
                v-model="storeForm.businessHour"
                range-separator="~"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="请选择时间">
              </el-time-picker>
            </el-form-item>
            <el-form-item label="客服电话：" prop="servicePhone">
              <el-input v-model="storeForm.servicePhone"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary">确认上传</el-button>
        </el-col>

        <!--图片上传-->
        <el-col :span="7" :offset="2">
          <p>上传图片：</p>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            list-type="picture-card"
            :limit="5"
            :before-upload="beforeUploadPicture"
            :on-preview="handlePictureCardPreview"
            :on-progress="uploadProgress"
            :on-remove="handleRemove"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :file-list="fileList"
            class="imgWidth imgListWidth">
            <i class="el-icon-plus icon-position"></i>
            <div slot="tip" class="el-upload__tip">*最多上传五张图片</div>
            <div slot="tip" class="el-upload__tip">*注意图片方向和大小</div>
          </el-upload>
          <el-dialog :visible.sync="imgVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'StoreManagement',
    data() {
      return {
        storeForm: {
          storeName: '',
          storeAddress: '',
          businessHour: '',
          servicePhone: '',
        },
        dialogImageUrl: '',
        imgVisible: false,
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]
      }
    },
    methods: {
      beforeUploadPicture() {
        console.log('beforeUploadPicture')
      },
      handlePictureCardPreview(file) {
        console.log(file)
      },
      uploadProgress() {
        console.log('uploadProgress')
      },
      handleRemove() {
        console.log('handleRemove')
      },
      uploadSuccess() {
        console.log('uploadSuccess')
      },
      uploadError() {
        console.log('uploadError')
      }
    },
    mounted: function () {

    }
  }
</script>

<style lang="less" scoped>
  .imgWidth /deep/ .el-upload--picture-card {
    width: 60px;
    height: 60px;
    position: relative;
  }
  .imgListWidth /deep/ .el-upload-list--picture-card .el-upload-list__item {
    display: inline-block;
    width: 60px;
    height: 60px;
  }
  .icon-position {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 20px;
    transform: translate(-50%,-50%);
  }
  .el-input,.el-date-editor{
    width: 30vw;
  }
</style>
