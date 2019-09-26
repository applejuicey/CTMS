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
            <td>模板描述</td>
            <td>创建时间</td>
            <td>创建者姓名</td>
            <td>文件状态</td>
            <td>暂时移除时间</td>
            <td>暂时移除者姓名</td>
            <td>彻底删除时间</td>
            <td>彻底删除者姓名</td>
          </tr>
          <template v-for="(templateInfo, index) in templatesInfoArray">
            <tr>
              <td>
                <!--任何人可以下载templateStatus为normal的文件-->
                <span class="cursor-pointer text-success" @click="downloadTemplate(templateInfo.templateID)" v-if="templateInfo.templateStatus === 'normal'">
                  <i class="fas fa-download"></i>&nbsp;
                </span>
                <!--任何人可以查看templateStatus为非deleted的文件-->
                <span class="cursor-pointer text-primary" @click="changeRoute(templateInfo.templateID, 'view')" v-if="templateInfo.templateStatus !== 'deleted'">
                  <i class="fas fa-search"></i>&nbsp;
                </span>
                <!--admin或文件创建人可以编辑templateStatus为非deleted的文件-->
                <span class="cursor-pointer text-success" @click="changeRoute(templateInfo.templateID, 'edit')" v-if="(templateInfo.templateStatus !== 'deleted') && (isAdmin || currentUserID === templateInfo.templateCreatorID)">
                  <i class="fas fa-edit"></i>&nbsp;
                </span>
                <!--admin或文件创建人可以暂时移除templateStatus为normal的文件-->
                <!--暂时移除代表着将templateStatus标记为removed-->
                <span class="cursor-pointer text-warning" @click="removeTemplate(templateInfo.templateID)" v-if="(templateInfo.templateStatus === 'normal') && (isAdmin || currentUserID === templateInfo.templateCreatorID)">
                  <i class="fas fa-minus-circle"></i>&nbsp;
                </span>
                <!--admin或文件创建人可以恢复templateStatus为removed的文件-->
                <!--恢复代表着将templateStatus标记为normal-->
                <span class="cursor-pointer text-success" @click="recoverTemplate(templateInfo.templateID)" v-if="(templateInfo.templateStatus === 'removed') && (isAdmin || currentUserID === templateInfo.templateCreatorID)">
                  <i class="fas fa-redo"></i>&nbsp;
                </span>
                <!--admin或文件创建人可以彻底删除templateStatus为removed的文件-->
                <!--彻底删除代表着将templateStatus标记为deleted且清除templateDownloadURL及具体模板-->
                <span class="cursor-pointer text-danger" @click="changeRoute(templateInfo.templateID, 'delete')" v-if="(templateInfo.templateStatus === 'removed') && (isAdmin || currentUserID === templateInfo.templateCreatorID)">
                  <i class="fas fa-trash"></i>&nbsp;
                </span>
              </td>
              <td>{{templateInfo.templateName}}</td>
              <td>{{templateInfo.templateDescription}}</td>
              <td>{{templateInfo.templateCreateDate}}</td>
              <td>{{templateInfo.templateCreatorName}}</td>
              <td>{{templateInfo.templateStatus}}</td>
              <td>{{templateInfo.templateRemoveDate}}</td>
              <td>{{templateInfo.templateRemoveExecutorName}}</td>
              <td>{{templateInfo.templateDeleteDate}}</td>
              <td>{{templateInfo.templateDeleteExecutorName}}</td>
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
    name: 'templates_info_table',
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