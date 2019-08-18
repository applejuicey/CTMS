<template>
  <div>
    <form>
      <div class="form-group text-left">
        <label for="projectNameKeyword" class="font-weight-normal">
          <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="projectNameKeywordTooltipText">
            <i class="fas fa-question-circle"></i>&nbsp;
          </span>
          <span>项目名称：</span>
        </label>
        <input v-model="projectNameKeyword" type="text" class="form-control" id="projectNameKeyword" placeholder="项目名称关键字">
      </div>
      <div class="form-group text-left">
        <label for="projectStage" class="font-weight-normal">
          <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="projectStageTooltipText">
            <i class="fas fa-question-circle"></i>&nbsp;
          </span>
          <span>项目当前阶段：</span>
        </label>
        <select v-model="projectStage" class="form-control" id="projectStage">
          <option value="1">准备阶段</option>
          <option value="2">进行阶段</option>
          <option value="3">收尾阶段</option>
          <option value="4">补发阶段</option>
          <option value="-1">全部</option>
        </select>
      </div>
      <button type="button" class="btn btn-success" @click="query">按上述条件筛选</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'projects_filter_form',
    data: () => {
      return {
        projectNameKeyword: '',
        projectNameKeywordTooltipText: '请在这里填写项目名称中的关键字，留空默认匹配所有项目名称。',
        projectStage: '-1',
        projectStageTooltipText: '请在这里选择项目当前阶段。',
      };
    },
    computed: {
      currentUserID: function () {
        return JSON.parse(localStorage.getItem('userInfo')).userID;
      },
    },
    methods: {
      processFormData: function () {
        const projectStageMap = new Map()
            .set('1', ['preparation', '准备阶段'])
            .set('2', ['ongoing', '进行阶段'])
            .set('3', ['ending', '收尾阶段'])
            .set('4', ['supplementing', '补发阶段'])
            .set('-1', ['all', '全部']);
        let filterDescription = '';
        if (this.projectNameKeyword === '') {
          filterDescription = `"项目名称关键字：不限；项目当前阶段：${projectStageMap.get(this.projectStage)[1]}"`;
        } else {
          filterDescription = `"项目名称关键字：${this.projectNameKeyword}；项目当前阶段：${projectStageMap.get(this.projectStage)[1]}""`;
        }
        this.$store.dispatch('setProjectFilterDescriptionAction', {
          projectFilterDescription: filterDescription
        });
        return {
          userID: this.currentUserID,
          projectNameKeyword: this.projectNameKeyword,
          projectStage: projectStageMap.get(this.projectStage)[0],
        };
      },
      // 生成一个对象，包括用户ID与一些检索条件，将该对象保存至vuex
      query: function () {
        const queryObject = this.processFormData();
        this.$store.dispatch('setProjectFilterQueryObjectAction', queryObject);
      },
    },
  }
</script>

<style scoped>

</style>