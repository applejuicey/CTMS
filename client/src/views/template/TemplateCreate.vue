<template>
  <div class="row" id="template_create">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-xl-6 offset-xl-3">
          <h1>创建新模板</h1>
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
    name: 'template_create',
    components: {
      BottomCard,
      TemplateEditForm,
    },
    data: function () {
      return {
        headerText: '创建新模板',
        tooltipText: '您可以在下方填写新模板的资料并提交至服务器！',
        templateInfoObject: {},
        statusObject4Template: {
          statusIndicator: 'loaded',
        },
      }
    },
  }
</script>