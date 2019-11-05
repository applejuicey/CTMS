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
          <button type="button" class="btn btn-success" @click="downloadFile(fileInfoObject.fileDownloadURL)" v-if="fileInfoObject.fileStatus === '1'">
            <i class="fas fa-download"></i>
            <span class="d-sm-inline d-none">&nbsp;下载文件</span>
          </button>
          <button type="button" class="btn btn-success" @click="changeRoute(fileInfoObject.fileID, 'edit')" v-if="isAdmin || currentUserID === fileInfoObject.fileCreatorID">
            <i class="fas fa-pen"></i>
            <span class="d-sm-inline d-none">&nbsp;编辑文件</span>
          </button>
          <button type="button" class="btn btn-warning" @click="removeFile(fileInfoObject.fileID)" v-if="(fileInfoObject.fileStatus === '1') && (isAdmin || currentUserID === fileInfoObject.fileCreatorID)">
            <i class="fas fa-minus-circle"></i>
            <span class="d-sm-inline d-none">&nbsp;移除文件</span>
          </button>
          <button type="button" class="btn btn-success" @click="recoverFile(fileInfoObject.fileID)" v-if="(fileInfoObject.fileStatus === '0') && (isAdmin || currentUserID === fileInfoObject.fileCreatorID)">
            <i class="fas fa-redo"></i>
            <span class="d-sm-inline d-none">&nbsp;恢复文件</span>
          </button>
          <button type="button" class="btn btn-danger" @click="changeRoute(fileInfoObject.fileID, 'delete')" v-if="(fileInfoObject.fileStatus === '0') && (isAdmin || currentUserID === fileInfoObject.fileCreatorID)">
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
            <td class="table-right-column">{{ fileInfoObject.fileCreatorRealName }}（{{ fileInfoObject.fileCreatorName }}）</td>
          </tr>
          <tr>
            <td class="table-left-column">文件状态：</td>
            <td class="table-right-column">{{ fileInfoObject.fileStatus|fileStatusFilter }}</td>
          </tr>
          <tr>
            <td class="table-left-column">暂时移除时间：</td>
            <td class="table-right-column">{{ fileInfoObject.fileRemoveDate }}</td>
          </tr>
          <tr>
            <td class="table-left-column">暂时移除者：</td>
            <td class="table-right-column">{{ fileInfoObject.fileRemoveExecutorRealName }}（{{ fileInfoObject.fileRemoveExecutorName }}）</td>
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
    <custom-modal :modalHeader="modalHeader" :responseMessage="responseMessage" :modalButtonTarget="modalButtonTarget"></custom-modal>
  </div>
</template>

<script>
  import CustomModal from '@/components/CustomModal.vue';
  export default {
    name: 'file_info_table',
    components: {
      CustomModal,
    },
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
    data: () => {
      return {
        modalHeader: '',
        responseMessage: '',
        modalButtonTarget: 'nowhere',
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
    filters: {
      fileStatusFilter: function (fileStatus) {
        const fileStatusMap = new Map();
        fileStatusMap.set('0', '被移除')
            .set('1', '正常');
        return fileStatusMap.get(fileStatus);
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
        let formData = new FormData();
        formData.append('fileID', fileID);
        formData.append('fileStatus', '0');
        this.$axios({
          method: 'put',
          url: '/file',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.modalHeader = '提示';
            this.responseMessage = '操作成功！';
            this.modalButtonTarget = 'nowhere';
          } else if (response.data.statusCode === '0') {
            console.error('FilesInfoTable操作失败，错误：', response.data.error.message);
            this.modalHeader = '错误';
            this.responseMessage = `操作失败！原因：${response.data.error.message}`;
            this.modalButtonTarget = 'nowhere';
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('FilesInfoTable操作失败，错误：', error);
          this.modalHeader = '错误';
          this.responseMessage = `操作失败！原因：${error}`;
          this.modalButtonTarget = 'nowhere';
        }).finally(() => {
          $('#customModal').modal('show');
        });
      },
      recoverFile: function (fileID) {
        let formData = new FormData();
        formData.append('fileID', fileID);
        formData.append('fileStatus', '1');
        this.$axios({
          method: 'put',
          url: '/file',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.modalHeader = '提示';
            this.responseMessage = '操作成功！';
            this.modalButtonTarget = 'nowhere';
          } else if (response.data.statusCode === '0') {
            console.error('FilesInfoTable操作失败，错误：', response.data.error.message);
            this.modalHeader = '错误';
            this.responseMessage = `操作失败！原因：${response.data.error.message}`;
            this.modalButtonTarget = 'nowhere';
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('FilesInfoTable操作失败，错误：', error);
          this.modalHeader = '错误';
          this.responseMessage = `操作失败！原因：${error}`;
          this.modalButtonTarget = 'nowhere';
        }).finally(() => {
          $('#customModal').modal('show');
        });
      },
      downloadFile: function (fileDownloadURL) {
        window.open(`http://47.100.168.127:5000${fileDownloadURL}`, '_blank');
      },
    },
  }
</script>