<template>
  <div class="list-card">
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
    <div class="table-responsive" v-else-if="statusObject.statusIndicator === 'loaded'">
      <div class="d-flex mb-2" v-if="$route.path.split('/')[1] !== 'files'">
        <span class="font-weight-normal">
          <i class="fas fa-caret-right"></i>&nbsp;
          项目：
        </span>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered table-hover text-nowrap">
          <tbody>
          <tr>
            <td>操作</td>
            <td>文件名称</td>
            <td>文件描述</td>
            <td>所属任务名称</td>
            <td>所属项目名称</td>
            <td>创建时间</td>
            <td>创建者姓名</td>
            <td>文件状态</td>
            <td>删除时间</td>
            <td>删除者姓名</td>
          </tr>
          <template v-for="(fileInfo, index) in filesInfoArray">
            <tr>
              <td>
                <span class="cursor-pointer text-primary" @click="changeRoute(fileInfo.fileID, 'view')">
                  <i class="fas fa-search"></i>&nbsp;
                </span>
                <span class="cursor-pointer text-success" @click="changeRoute(fileInfo.fileID, 'edit')" v-if="isAdmin || currentUserID === fileInfo.fileCreatorID">
                  <i class="fas fa-edit"></i>&nbsp;
                </span>
                <span class="cursor-pointer text-warning" @click="removeFile(fileInfo.fileID)" v-if="fileInfo.fileStatus === 'normal' && (isAdmin || currentUserID === fileInfo.fileCreatorID)">
                  <i class="fas fa-minus-circle"></i>&nbsp;
                </span>
                <span class="cursor-pointer text-success" @click="recoverFile(fileInfo.fileID)" v-if="fileInfo.fileStatus === 'removed' && (isAdmin || currentUserID === fileInfo.fileCreatorID)">
                  <i class="fas fa-redo"></i>&nbsp;
                </span>
                <span class="cursor-pointer text-danger" @click="changeRoute(fileInfo.fileID, 'delete')" v-if="isAdmin || currentUserID === fileInfo.fileCreatorID">
                  <i class="fas fa-trash"></i>&nbsp;
                </span>
              </td>
              <td>{{fileInfo.fileName}}</td>
              <td>{{fileInfo.fileDescription}}</td>
              <td>{{fileInfo.fileBelongedToTaskName}}</td>
              <td>{{fileInfo.fileBelongedToProjectName}}</td>
              <td>{{fileInfo.fileCreateDate}}</td>
              <td>{{fileInfo.fileCreatorName}}</td>
              <td>{{fileInfo.fileStatus}}</td>
              <td>{{fileInfo.fileDeleteDate}}</td>
              <td>{{fileInfo.fileDeleteExecutorName}}</td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-xl-6 offset-xl-3">
        <div class="alert alert-info text-center mb-0">
          <h4 class="alert-heading">等待初始化</h4>
          <p>
            正在等待初始化流程执行......
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'files_info_table',
    props: {
      filesInfoArray: {
        type: Array,
        required: true,
      },
      statusObject: {
        type: Object,
        required: true,
      },
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
      changeRoute: function (fileID, identifier) {
        this.$router.push({
          name: `file_${identifier}`,
          params: {
            fileID: fileID,
          },
        });
      },
      removeFile: function (fileID) {
        alert(`remove${fileID}`)
      },
      recoverFile: function (fileID) {
        alert(`recover${fileID}`)
      },
    },
  }
</script>

<style scoped>

</style>