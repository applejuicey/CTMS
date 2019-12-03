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
          模板信息：
        </span>
        <div class="btn-group ml-auto">
          <button type="button" class="btn btn-success" @click="downloadTemplate(templateInfoObject.templateDownloadURL)" v-if="templateInfoObject.templateStatus === '1'">
            <i class="fas fa-download"></i>
            <span class="d-sm-inline d-none">&nbsp;下载模板</span>
          </button>
          <button type="button" class="btn btn-success" @click="changeRoute(templateInfoObject.templateID, 'edit')" v-if="isAdmin || currentUserID === templateInfoObject.templateCreatorID">
            <i class="fas fa-pen"></i>
            <span class="d-sm-inline d-none">&nbsp;编辑模板</span>
          </button>
          <button type="button" class="btn btn-warning" @click="removeTemplate(templateInfoObject.templateID)" v-if="(templateInfoObject.templateStatus === '1') && (isAdmin || currentUserID === templateInfoObject.templateCreatorID)">
            <i class="fas fa-minus-circle"></i>
            <span class="d-sm-inline d-none">&nbsp;移除模板</span>
          </button>
          <button type="button" class="btn btn-success" @click="recoverTemplate(templateInfoObject.templateID)" v-if="(templateInfoObject.templateStatus === '0') && (isAdmin || currentUserID === templateInfoObject.templateCreatorID)">
            <i class="fas fa-redo"></i>
            <span class="d-sm-inline d-none">&nbsp;恢复模板</span>
          </button>
          <button type="button" class="btn btn-danger" @click="changeRoute(templateInfoObject.templateID, 'delete')" v-if="(templateInfoObject.templateStatus === '0') && (isAdmin || currentUserID === templateInfoObject.templateCreatorID)">
            <i class="fas fa-trash"></i>
            <span class="d-sm-inline d-none">&nbsp;彻底删除模板</span>
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-borderless table-sm text-nowrap mb-0">
          <tbody>
          <tr>
            <td class="table-left-column">模板名称：</td>
            <td class="table-right-column">{{ templateInfoObject.templateName }}</td>
          </tr>
          <tr>
            <td class="table-left-column">模板描述：</td>
            <td class="table-right-column">{{ templateInfoObject.templateDescription }}</td>
          </tr>
          <tr>
            <td class="table-left-column">创建时间：</td>
            <td class="table-right-column">{{ templateInfoObject.templateCreatedDate }}</td>
          </tr>
          <tr>
            <td class="table-left-column">创建者：</td>
            <td class="table-right-column">{{ templateInfoObject.templateCreatorRealName }}（{{ templateInfoObject.templateCreatorName }}）</td>
          </tr>
          <tr>
            <td class="table-left-column">模板状态：</td>
            <td class="table-right-column">{{ templateInfoObject.templateStatus|templateStatusFilter }}</td>
          </tr>
          <tr>
            <td class="table-left-column">暂时移除时间：</td>
            <td class="table-right-column">{{ templateInfoObject.templateRemoveDate }}</td>
          </tr>
          <tr>
            <td class="table-left-column">暂时移除者：</td>
            <td class="table-right-column">{{ templateInfoObject.templateRemoveExecutorRealName }}（{{ templateInfoObject.templateRemoveExecutorName }}）</td>
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
    name: 'template_info_table',
    components: {
      CustomModal,
    },
    props: {
      templateInfoObject: {
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
      templateStatusFilter: function (templateStatus) {
        const templateStatusMap = new Map();
        templateStatusMap.set('0', '被移除')
            .set('1', '正常');
        return templateStatusMap.get(templateStatus);
      },
    },
    methods: {
      changeRoute: function (templateID, identifier) {
        this.$router.push({
          name: `template_${identifier}`,
          params: {
            templateID: templateID,
          },
        });
      },
      removeTemplate: function (templateID) {
        let formData = new FormData();
        formData.append('templateID', templateID);
        formData.append('templateStatus', '0');
        this.$axios({
          method: 'put',
          url: '/template',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.modalHeader = '提示';
            this.responseMessage = '操作成功！';
            this.modalButtonTarget = 'nowhere';
          } else if (response.data.statusCode === '0') {
            console.error('TemplatesInfoTable操作失败，错误：', response.data.error.message);
            this.modalHeader = '错误';
            this.responseMessage = `操作失败！原因：${response.data.error.message}`;
            this.modalButtonTarget = 'nowhere';
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('TemplatesInfoTable操作失败，错误：', error);
          this.modalHeader = '错误';
          this.responseMessage = `操作失败！原因：${error}`;
          this.modalButtonTarget = 'nowhere';
        }).finally(() => {
          $('#customModal').modal('show');
        });
      },
      recoverTemplate: function (templateID) {
        let formData = new FormData();
        formData.append('templateID', templateID);
        formData.append('templateStatus', '1');
        this.$axios({
          method: 'put',
          url: '/template',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.modalHeader = '提示';
            this.responseMessage = '操作成功！';
            this.modalButtonTarget = 'nowhere';
          } else if (response.data.statusCode === '0') {
            console.error('TemplatesInfoTable操作失败，错误：', response.data.error.message);
            this.modalHeader = '错误';
            this.responseMessage = `操作失败！原因：${response.data.error.message}`;
            this.modalButtonTarget = 'nowhere';
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('TemplatesInfoTable操作失败，错误：', error);
          this.modalHeader = '错误';
          this.responseMessage = `操作失败！原因：${error}`;
          this.modalButtonTarget = 'nowhere';
        }).finally(() => {
          $('#customModal').modal('show');
        });
      },
      downloadTemplate: function (templateDownloadURL) {
        window.open(`http://47.100.168.127:5000${templateDownloadURL}`, '_blank');
      },
    },
  }
</script>