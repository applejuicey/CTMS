<template>
  <div>
    <form>
      <div class="form-group text-left">
        <label for="fileNameKeyword" class="font-weight-normal">
          <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="fileNameKeywordTooltipText">
            <i class="fas fa-question-circle"></i>&nbsp;
          </span>
          <span>文件名称：</span>
        </label>
        <input v-model="fileNameKeyword" type="text" class="form-control" id="fileNameKeyword" placeholder="文件名称关键字">
      </div>
      <div class="form-group text-left">
        <label for="fileBelongedToTaskNameKeyword" class="font-weight-normal">
          <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="fileBelongedToTaskNameKeywordTooltipText">
            <i class="fas fa-question-circle"></i>&nbsp;
          </span>
          <span>所属任务名称：</span>
        </label>
        <input v-model="fileBelongedToTaskNameKeyword" type="text" class="form-control" id="fileBelongedToTaskNameKeyword" placeholder="所属任务名称关键字">
      </div>
      <div class="form-group text-left">
        <label for="fileBelongedToProjectNameKeyword" class="font-weight-normal">
          <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="fileBelongedToProjectNameKeywordTooltipText">
            <i class="fas fa-question-circle"></i>&nbsp;
          </span>
          <span>所属项目名称：</span>
        </label>
        <input v-model="fileBelongedToProjectNameKeyword" type="text" class="form-control" id="fileBelongedToProjectNameKeyword" placeholder="所属项目名称关键字">
      </div>
      <div class="form-group text-left">
        <label for="fileCreatorNameKeyword" class="font-weight-normal">
          <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="fileCreatorNameKeywordTooltipText">
            <i class="fas fa-question-circle"></i>&nbsp;
          </span>
          <span>创建者姓名：</span>
        </label>
        <input v-model="fileCreatorNameKeyword" type="text" class="form-control" id="fileCreatorNameKeyword" placeholder="创建者姓名关键字">
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
    name: 'files_filter_form',
    data: () => {
      return {
        fileNameKeyword: '',
        fileNameKeywordTooltipText: '请在这里填写文件名称中的关键字，留空默认匹配所有文件名称。',
        fileBelongedToTaskNameKeyword: '',
        fileBelongedToTaskNameKeywordTooltipText: '请在这里填写文件所属任务名称中的关键字，留空默认匹配所有任务名称。',
        fileBelongedToProjectNameKeyword: '',
        fileBelongedToProjectNameKeywordTooltipText: '请在这里填写文件所属项目名称中的关键字，留空默认匹配所有项目名称。',
        fileCreatorNameKeyword: '',
        fileCreatorNameKeywordTooltipText: '请在这里填写文件创建者姓名中的关键字，留空默认匹配所有姓名。',
      };
    },
    methods: {
      processFormData: function () {
        let fileNameKeywordDescription = this.fileNameKeyword;
        let fileBelongedToTaskNameKeywordDescription = this.fileBelongedToTaskNameKeyword;
        let fileBelongedToProjectNameKeywordDescription = this.fileBelongedToProjectNameKeyword;
        let fileCreatorNameKeywordDescription = this.fileCreatorNameKeyword;
        if (this.fileNameKeyword === '') {
          fileNameKeywordDescription = '不限';
        }
        if (this.fileBelongedToTaskNameKeyword === '') {
          fileBelongedToTaskNameKeywordDescription = '不限';
        }
        if (this.fileBelongedToProjectNameKeyword === '') {
          fileBelongedToProjectNameKeywordDescription = '不限';
        }
        if (this.fileCreatorNameKeyword === '') {
          fileCreatorNameKeywordDescription = '不限';
        }
        let filterDescription = `"文件名称关键字：${fileNameKeywordDescription}；文件所属任务名称关键字：${fileBelongedToTaskNameKeywordDescription}；文件所属项目名称关键字：${fileBelongedToProjectNameKeywordDescription}；文件创建者姓名关键字：${fileCreatorNameKeywordDescription}"`;
        this.$store.dispatch('setFileFilterDescriptionAction', {
          fileFilterDescription: filterDescription
        });
        return {
          fileNameKeyword: this.sponsorNameKeyword || '',
          fileBelongedToTaskNameKeyword: this.investigatorNameKeyword || '',
          fileBelongedToProjectNameKeyword: this.involvedUserRealNameKeyword || '',
          fileCreatorNameKeyword: this.involvedUserRealNameKeyword || '',
        };
      },
      // 生成一个对象，包括用户ID与一些检索条件，将该对象保存至vuex
      query: function () {
        const queryObject = this.processFormData();
        this.$store.dispatch('setFileFilterQueryObjectAction', queryObject);
      },
    },
  }
</script>

<style scoped>

</style>