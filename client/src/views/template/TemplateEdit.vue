<template>
  <div class="row" id="template_edit">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-xl-6 offset-xl-3">
          <h1>编辑模板-{{ $route.params.templateID }}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6 offset-xl-3 mb-2">
          <bottom-card :cardHeaderText="headerText" :cardTooltipText="tooltipText">
            <template v-slot:card-body>
              <template-edit-form :templateInfoObject="templateInfoObject" :statusObject="statusObject4Template"></template-edit-form>
            </template>
          </bottom-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BottomCard from '@/components/BottomCard.vue';
  import TemplateEditForm from '@/components/template/TemplateEditForm.vue';
  export default {
    name: 'project_edit',
    components: {
      BottomCard,
      TemplateEditForm,
    },
    data: function () {
      return {
        headerText: '编辑模板',
        tooltipText: '您可以在下方修改该模板信息并提交至服务器。',
        templateInfoObject: {},
        statusObject4Template: {},
      }
    },
    created: function () {
      this.getTemplateInfo();
    },
    methods: {
      getTemplateInfo: function () {
        this.statusObject4Template = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/template', {
          params: {
            templateID: this.$route.params.templateID,
          }
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.templateInfoObject = response.data.template[0];
            this.statusObject4Template = {
              statusIndicator: 'loaded',
            };
          } else if (response.data.statusCode === '0') {
            console.error('TemplateEdit获取模板信息失败，错误：', response.data.error.message);
            this.statusObject4Template = {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取模板信息失败，错误原因：${response.data.error.message}`,
            };
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('TemplateEdit获取模板信息失败，错误：', error);
          this.statusObject4Template = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取模板信息失败，错误原因：${error}`,
          };
        });
      },
    },
  }
</script>