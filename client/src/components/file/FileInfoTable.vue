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
        <span class="font-weight-normal">
          <i class="fas fa-caret-right"></i>&nbsp;
          文件信息：
        </span>
        <div class="btn-group ml-auto">
          <button type="button" class="btn btn-success" @click="downloadFile(fileInfoObject.fileID)" v-if="fileInfoObject.fileStatus === 'normal'">
            <i class="fas fa-download"></i>
            <span class="d-sm-inline d-none">&nbsp;下载文件</span>
          </button>
          <button type="button" class="btn btn-success" @click="changeRoute(fileInfoObject.fileID, 'edit')" v-if="(fileInfoObject.fileStatus !== 'deleted') && (isAdmin || currentUserID === fileInfoObject.fileCreatorID)">
            <i class="fas fa-pen"></i>
            <span class="d-sm-inline d-none">&nbsp;编辑文件</span>
          </button>
          <button type="button" class="btn btn-warning" @click="removeFile(fileInfoObject.fileID)" v-if="(fileInfoObject.fileStatus === 'normal') && (isAdmin || currentUserID === fileInfoObject.fileCreatorID)">
            <i class="fas fa-minus-circle"></i>
            <span class="d-sm-inline d-none">&nbsp;移除文件</span>
          </button>
          <button type="button" class="btn btn-success" @click="recoverFile(fileInfoObject.fileID)" v-if="(fileInfoObject.fileStatus === 'removed') && (isAdmin || currentUserID === fileInfoObject.fileCreatorID)">
            <i class="fas fa-redo"></i>
            <span class="d-sm-inline d-none">&nbsp;恢复文件</span>
          </button>
          <button type="button" class="btn btn-danger" @click="changeRoute(fileInfoObject.fileID, 'delete')" v-if="(fileInfoObject.fileStatus === 'removed') && (isAdmin || currentUserID === fileInfoObject.fileCreatorID)">
            <i class="fas fa-trash"></i>
            <span class="d-sm-inline d-none">&nbsp;彻底删除文件</span>
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-borderless table-sm text-nowrap mb-0">
          <tbody>
          <tr>
            <td class="table-left-column">文件名称：</td>
            <td class="table-right-column">{{ fileInfoObject.fileName }}</td>
          </tr>
          <tr>
            <td class="table-left-column">文件描述：</td>
            <td class="table-right-column">{{ fileInfoObject.fileDescription }}</td>
          </tr>
          <tr>
            <td class="table-left-column">隶属于任务：</td>
            <td class="table-right-column">{{ fileInfoObject.fileBelongedToTaskName }}</td>
          </tr>
          <tr>
            <td class="table-left-column">隶属于项目：</td>
            <td class="table-right-column">{{ fileInfoObject.fileBelongedToProjectName }}</td>
          </tr>
          <tr>
            <td class="table-left-column">创建时间：</td>
            <td class="table-right-column">{{ fileInfoObject.fileCreatedDate }}</td>
          </tr>
          <tr>
            <td class="table-left-column">创建者：</td>
            <td class="table-right-column">{{ fileInfoObject.fileCreatorName }}</td>
          </tr>
          <tr>
            <td class="table-left-column">文件状态：</td>
            <td class="table-right-column">{{ fileInfoObject.fileStatus }}</td>
          </tr>
          <tr>
            <td class="table-left-column">暂时移除时间：</td>
            <td class="table-right-column">{{ fileInfoObject.fileRemoveDate }}</td>
          </tr>
          <tr>
            <td class="table-left-column">暂时移除者：</td>
            <td class="table-right-column">{{ fileInfoObject.fileRemoveExecutorName }}</td>
          </tr>
          <tr>
            <td class="table-left-column">彻底删除时间：</td>
            <td class="table-right-column">{{ fileInfoObject.fileDeleteDate }}</td>
          </tr>
          <tr>
            <td class="table-left-column">彻底删除者：</td>
            <td class="table-right-column">{{ fileInfoObject.fileDeleteExecutorName }}</td>
          </tr>
          </tbody>
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
    name: 'file_info_table',
    props: {
      fileInfoObject: {
        type: Object,
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
      downloadFile: function (fileID) {
        alert(`download${fileID}`)
      },
    },
  }
</script>

<style scoped>

</style>