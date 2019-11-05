<template>
  <div class="list-card">
    <div class="row" v-if="statusObject.statusIndicator === 'loading'">
      <div class="col-xl-8 offset-xl-2">
        <div class="alert alert-primary text-center mb-0">
          <h4 class="alert-heading">{{ statusObject.alertHeader }}</h4>
          <p>
            <span class="spinner-border spinner-border-sm text-primary"></span>&nbsp;{{ statusObject.feedbackMessage }}
          </p>
        </div>
      </div>
    </div>
    <div class="row" v-else-if="statusObject.statusIndicator === 'error'">
      <div class="col-xl-8 offset-xl-2">
        <div class="alert alert-danger text-center mb-0">
          <h4 class="alert-heading">{{ statusObject.alertHeader }}</h4>
          <p>
            {{ statusObject.feedbackMessage }}
          </p>
        </div>
      </div>
    </div>
    <div v-else-if="statusObject.statusIndicator === 'loaded'">
      <div class="d-flex mb-2" v-if="$route.path.split('/')[1] !== 'files'">
        <span class="font-weight-normal">
          <i class="fas fa-caret-right"></i>&nbsp;
          文件：
        </span>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered table-hover text-nowrap">
          <tbody>
          <tr>
            <td>操作</td>
            <td>文件名称</td>
            <td>文件状态</td>
            <td>文件描述</td>
            <td>所属任务名称</td>
            <td>所属项目名称</td>
            <td>创建时间</td>
            <td>创建者姓名</td>
            <td>暂时移除时间</td>
            <td>暂时移除者姓名</td>
          </tr>
          <template v-for="(fileInfo, index) in filesInfoArray">
            <tr>
              <td>
                <!--任何人可以下载fileStatus为1的文件-->
                <span>&ensp;</span>
                <span class="cursor-pointer text-success" @click="downloadFile(fileInfo.fileDownloadURL)" v-if="fileInfo.fileStatus === '1'">
                  <i class="fas fa-download"></i>
                  <span>&ensp;</span>
                </span>
                <!--任何人可以查看任何文件-->
                <span class="cursor-pointer text-primary" @click="changeRoute(fileInfo.fileID, 'view')">
                  <i class="fas fa-search"></i>
                  <span>&ensp;</span>
                </span>
                <!--admin或文件创建人可以编辑自己创建的文件-->
                <span class="cursor-pointer text-success" @click="changeRoute(fileInfo.fileID, 'edit')" v-if="isAdmin || currentUserID === fileInfo.fileCreatorID">
                  <i class="fas fa-edit"></i>
                  <span>&ensp;</span>
                </span>
                <!--admin或文件创建人可以暂时移除fileStatus为1的文件-->
                <!--暂时移除代表着将fileStatus标记为2-->
                <span class="cursor-pointer text-warning" @click="removeFile(fileInfo.fileID)" v-if="(fileInfo.fileStatus === '1') && (isAdmin || currentUserID === fileInfo.fileCreatorID)">
                  <i class="fas fa-minus-circle"></i>
                  <span>&ensp;</span>
                </span>
                <!--admin或文件创建人可以恢复fileStatus为2的文件-->
                <!--恢复代表着将fileStatus标记为1-->
                <span class="cursor-pointer text-success" @click="recoverFile(fileInfo.fileID)" v-if="(fileInfo.fileStatus === '0') && (isAdmin || currentUserID === fileInfo.fileCreatorID)">
                  <i class="fas fa-redo"></i>
                  <span>&ensp;</span>
                </span>
                <!--admin或文件创建人可以彻底删除fileStatus为2的文件-->
                <!--彻底删除直接在后端删除数据库中的记录-->
                <span class="cursor-pointer text-danger" @click="changeRoute(fileInfo.fileID, 'delete')" v-if="(fileInfo.fileStatus === '0') && (isAdmin || currentUserID === fileInfo.fileCreatorID)">
                  <i class="fas fa-trash"></i>
                  <span>&ensp;</span>
                </span>
              </td>
              <td>{{fileInfo.fileName}}</td>
              <td>{{fileInfo.fileStatus|fileStatusFilter}}</td>
              <td>{{fileInfo.fileDescription}}</td>
              <td>{{fileInfo.fileBelongedToTaskName}}</td>
              <td>{{fileInfo.fileBelongedToProjectName}}</td>
              <td>{{fileInfo.fileCreateDate}}</td>
              <td>{{fileInfo.fileCreatorRealName}}（{{fileInfo.fileCreatorName}}）</td>
              <td>{{fileInfo.fileRemoveDate}}</td>
              <td>{{fileInfo.fileRemoveExecutorRealName}}（{{fileInfo.fileRemoveExecutorName}}）</td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-xl-8 offset-xl-2">
        <div class="alert alert-info text-center mb-0">
          <h4 class="alert-heading">等待初始化</h4>
          <p>
            正在等待初始化流程执行......
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
    name: 'files_info_table',
    components: {
      CustomModal,
    },
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
    data: () => {
      return {
        modalHeader: '',
        responseMessage: '',
        modalButtonTarget: 'nowhere',
      };
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