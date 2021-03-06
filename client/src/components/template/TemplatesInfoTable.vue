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
      <div class="d-flex mb-2" v-if="$route.path.split('/')[1] !== 'templates'">
        <span class="font-weight-normal">
          <i class="fas fa-caret-right"></i>&nbsp;
          模板：
        </span>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered table-hover text-nowrap">
          <tbody>
          <tr>
            <td>操作</td>
            <td>模板名称</td>
            <td>模板状态</td>
            <td>模板描述</td>
            <td>创建时间</td>
            <td>创建者姓名</td>
            <td>暂时移除时间</td>
            <td>暂时移除者姓名</td>
          </tr>
          <template v-for="(templateInfo, index) in templatesInfoArray">
            <tr>
              <td>
                <!--任何人可以下载templateStatus为1的模板-->
                <span>&ensp;</span>
                <span class="cursor-pointer text-success" @click="downloadTemplate(templateInfo.templateDownloadURL)" v-if="templateInfo.templateStatus === '1'">
                  <i class="fas fa-download"></i>
                  <span>&ensp;</span>
                </span>
                <!--任何人可以查看任何模板-->
                <span class="cursor-pointer text-primary" @click="changeRoute(templateInfo.templateID, 'view')">
                  <i class="fas fa-search"></i>
                  <span>&ensp;</span>
                </span>
                <!--admin或文件创建人可以编辑自己创建的模板-->
                <span class="cursor-pointer text-success" @click="changeRoute(templateInfo.templateID, 'edit')" v-if="isAdmin || currentUserID === templateInfo.templateCreatorID">
                  <i class="fas fa-edit"></i>
                  <span>&ensp;</span>
                </span>
                <!--admin或文件创建人可以暂时移除templateStatus为1的文件-->
                <!--暂时移除代表着将templateStatus标记为2-->
                <span class="cursor-pointer text-warning" @click="removeTemplate(templateInfo.templateID)" v-if="(templateInfo.templateStatus === '1') && (isAdmin || currentUserID === templateInfo.templateCreatorID)">
                  <i class="fas fa-minus-circle"></i>
                  <span>&ensp;</span>
                </span>
                <!--admin或文件创建人可以恢复templateStatus为2的文件-->
                <!--恢复代表着将templateStatus标记为1-->
                <span class="cursor-pointer text-success" @click="recoverTemplate(templateInfo.templateID)" v-if="(templateInfo.templateStatus === '0') && (isAdmin || currentUserID === templateInfo.templateCreatorID)">
                  <i class="fas fa-redo"></i>
                  <span>&ensp;</span>
                </span>
                <!--admin或文件创建人可以彻底删除templateStatus为2的文件-->
                <!--彻底删除直接在后端清除数据库中该条记录-->
                <span class="cursor-pointer text-danger" @click="changeRoute(templateInfo.templateID, 'delete')" v-if="(templateInfo.templateStatus === '0') && (isAdmin || currentUserID === templateInfo.templateCreatorID)">
                  <i class="fas fa-trash"></i>
                  <span>&ensp;</span>
                </span>
              </td>
              <td>{{templateInfo.templateName}}</td>
              <td>{{templateInfo.templateStatus|templateStatusFilter}}</td>
              <td>{{templateInfo.templateDescription}}</td>
              <td>{{templateInfo.templateCreateDate}}</td>
              <td>{{templateInfo.templateCreatorRealName}}（{{templateInfo.templateCreatorName}}）</td>
              <td>{{templateInfo.templateRemoveDate}}</td>
              <td>{{templateInfo.templateRemoveExecutorRealName}}（{{templateInfo.templateRemoveExecutorName}}）</td>
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
    name: 'templates_info_table',
    components: {
      CustomModal,
    },
    props: {
      templatesInfoArray: {
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