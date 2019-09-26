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
          <button type="button" class="btn btn-success" @click="downloadTemplate(templateInfoObject.templateID)" v-if="templateInfoObject.templateStatus === 'normal'">
            <i class="fas fa-download"></i>
            <span class="d-sm-inline d-none">&nbsp;下载模板</span>
          </button>
          <button type="button" class="btn btn-success" @click="changeRoute(templateInfoObject.templateID, 'edit')" v-if="(templateInfoObject.templateStatus !== 'deleted') && (isAdmin || currentUserID === templateInfoObject.templateCreatorID)">
            <i class="fas fa-pen"></i>
            <span class="d-sm-inline d-none">&nbsp;编辑文件</span>
          </button>
          <button type="button" class="btn btn-warning" @click="removeTemplate(templateInfoObject.templateID)" v-if="(templateInfoObject.templateStatus === 'normal') && (isAdmin || currentUserID === templateInfoObject.templateCreatorID)">
            <i class="fas fa-minus-circle"></i>
            <span class="d-sm-inline d-none">&nbsp;移除文件</span>
          </button>
          <button type="button" class="btn btn-success" @click="recoverTemplate(templateInfoObject.templateID)" v-if="(templateInfoObject.templateStatus === 'removed') && (isAdmin || currentUserID === templateInfoObject.templateCreatorID)">
            <i class="fas fa-redo"></i>
            <span class="d-sm-inline d-none">&nbsp;恢复文件</span>
          </button>
          <button type="button" class="btn btn-danger" @click="changeRoute(templateInfoObject.templateID, 'delete')" v-if="(templateInfoObject.templateStatus === 'removed') && (isAdmin || currentUserID === templateInfoObject.templateCreatorID)">
            <i class="fas fa-trash"></i>
            <span class="d-sm-inline d-none">&nbsp;彻底删除文件</span>
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
            <td class="table-right-column">{{ templateInfoObject.templateCreatorName }}</td>
          </tr>
          <tr>
            <td class="table-left-column">模板状态：</td>
            <td class="table-right-column">{{ templateInfoObject.templateStatus }}</td>
          </tr>
          <tr>
            <td class="table-left-column">暂时移除时间：</td>
            <td class="table-right-column">{{ templateInfoObject.templateRemoveDate }}</td>
          </tr>
          <tr>
            <td class="table-left-column">暂时移除者：</td>
            <td class="table-right-column">{{ templateInfoObject.templateRemoveExecutorName }}</td>
          </tr>
          <tr>
            <td class="table-left-column">彻底删除时间：</td>
            <td class="table-right-column">{{ templateInfoObject.templateDeleteDate }}</td>
          </tr>
          <tr>
            <td class="table-left-column">彻底删除者：</td>
            <td class="table-right-column">{{ templateInfoObject.templateDeleteExecutorName }}</td>
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
    name: 'template_info_table',
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
    computed: {
      isAdmin: function () {
        return JSON.parse(localStorage.getItem('userInfo')).isAdmin;
      },
      currentUserID: function () {
        return JSON.parse(localStorage.getItem('userInfo')).userID;
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
        alert(`remove${templateID}`)
      },
      recoverTemplate: function (templateID) {
        alert(`recover${templateID}`)
      },
      downloadTemplate: function (templateID) {
        alert(`download${templateID}`)
      },
    },
  }
</script>