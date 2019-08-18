<template>
  <div class="text-left list-card">
    <div class="row" v-if="statusObject.statusIndicator === 'loading'">
      <div class="col-xl-6 offset-xl-3">
        <div class="alert alert-primary text-center mb-0">
          <h4 class="alert-heading">{{ statusObject.alertHeader }}</h4>
          <p>
            <span class="spinner-border spinner-border-sm text-primary"></span>&nbsp;{{ statusObject.feedbackMessage }}
          </p>
        </div>
      </div>
    </div>
    <div class="row" v-else-if="statusObject.statusIndicator === 'error'">
      <div class="col-xl-6 offset-xl-3">
        <div class="alert alert-danger text-center mb-0">
          <h4 class="alert-heading">{{ statusObject.alertHeader }}</h4>
          <p>
            {{ statusObject.feedbackMessage }}
          </p>
        </div>
      </div>
    </div>
    <div v-else-if="statusObject.statusIndicator === 'loaded'">
      <div class="d-flex mb-2">
        <span class="font-weight-normal">任务附属文件：</span>
        <button class="btn btn-success ml-auto">上传文件</button>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered text-nowrap">
          <tr>
            <td>文件名</td>
            <td>创建日期</td>
            <td>创建者</td>
            <td>简介</td>
            <td>删除日期</td>
            <td>删除者</td>
            <td>操作</td>
          </tr>
          <template v-for="(file, index) in taskFiles">
            <tr>
              <td>{{file.fileName}}</td>
              <td>{{file.createDate}}</td>
              <td>{{file.creatorName}}</td>
              <td>{{file.description}}</td>
              <td>{{file.deleteDate}}</td>
              <td>{{file.deleteExecutorName}}</td>
              <td>
            <span class="cursor-pointer text-primary" @click="downloadFile(file.fileID, 'view')">
              <i class="fas fa-download"></i>&nbsp;
            </span>
                <span class="cursor-pointer text-danger" @click="deleteFile(file.fileID, 'delete')" v-if="isAdmin || currentUserID === file.creatorID">
              <i class="fas fa-trash"></i>&nbsp;
            </span>
              </td>
            </tr>
          </template>
        </table>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-xl-6 offset-xl-3">
        <div class="alert alert-info text-center mb-0">
          <h4 class="alert-heading">查询结果为空</h4>
          <p>
            您执行的查询结果为空，请确认。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'file_manage_table',
    props: {
      taskFiles: {
        type: Array,
        required: true,
      },
      statusObject: {
        type: Object,
        required: true,
      },
    },
    data: () => {
      return {

      };
    },
    computed: {
      isAdmin: function () {
        return JSON.parse(localStorage.getItem('userInfo')).isAdmin;
      },
      currentUserID: function () {
        return JSON.parse(localStorage.getItem('userInfo')).userID;
      },
    },
    methods: {
      downloadFile: function (fileID) {

      },
      deleteFile: function (fileID) {

      },
    },
  }
</script>

<style scoped>
  .cursor-pointer {
    cursor: pointer;
  }
  .list-card {
    padding: 1.25rem;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    border: 1px solid #eee;
    border-radius: .25rem;
    border-left-width: .25rem;
    /*border-left-color: #28a745;*/
  }
</style>