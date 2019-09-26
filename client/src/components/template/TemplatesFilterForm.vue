<template>
  <div>
    <form>
      <div class="form-group text-left">
        <label for="templateNameKeyword" class="font-weight-normal">
          <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="templateNameKeywordTooltipText">
            <i class="fas fa-question-circle"></i>&nbsp;
          </span>
          <span>模板名称：</span>
        </label>
        <input v-model="templateNameKeyword" type="text" class="form-control" id="templateNameKeyword" placeholder="模板名称关键字">
      </div>
      <div class="form-group text-left">
        <label for="templateCreatorNameKeyword" class="font-weight-normal">
          <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="templateCreatorNameKeywordTooltipText">
            <i class="fas fa-question-circle"></i>&nbsp;
          </span>
          <span>模板创建者名称：</span>
        </label>
        <input v-model="templateCreatorNameKeyword" type="text" class="form-control" id="templateCreatorNameKeyword" placeholder="模板创建者名称关键字">
      </div>
      <button type="button" class="btn btn-success" @click="query">
        <i class="fas fa-search"></i>
        <span>&nbsp;按上述条件筛选</span>
      </button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'templates_filter_form',
    data: () => {
      return {
        templateNameKeyword: '',
        templateNameKeywordTooltipText: '请在这里填写模板名称中的关键字，留空默认匹配所有模板名称。',
        templateCreatorNameKeyword: '',
        templateCreatorNameKeywordTooltipText: '请在这里填写模板创建者名称中的关键字，留空默认匹配所有创建者名称。',
      };
    },
    methods: {
      processFormData: function () {
        let templateNameKeywordDescription = this.templateNameKeyword;
        let templateCreatorNameKeywordDescription = this.templateCreatorNameKeyword;
        if (this.templateNameKeyword === '') {
          templateNameKeywordDescription = '不限';
        }
        if (this.templateCreatorNameKeyword === '') {
          templateCreatorNameKeywordDescription = '不限';
        }
        let filterDescription = `"模板名称关键字：${templateNameKeywordDescription}；模板创建者名称关键字：${templateCreatorNameKeywordDescription}"`;
        this.$store.dispatch('setTemplateFilterDescriptionAction', {
          templateFilterDescription: filterDescription
        });
        return {
          templateNameKeyword: this.templateNameKeyword || '',
          templateCreatorNameKeyword: this.templateCreatorNameKeyword || '',
        };
      },
      // 生成一个对象，包括用户ID与一些检索条件，将该对象保存至vuex
      query: function () {
        const queryObject = this.processFormData();
        this.$store.dispatch('setTemplateFilterQueryObjectAction', queryObject);
      },
    },
  }
</script>

<style scoped>

</style>