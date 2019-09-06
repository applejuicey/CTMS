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
        <label for="sponsorNameKeyword" class="font-weight-normal">
          <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="sponsorNameKeywordTooltipText">
            <i class="fas fa-question-circle"></i>&nbsp;
          </span>
          <span>申办方名称：</span>
        </label>
        <input v-model="sponsorNameKeyword" type="text" class="form-control" id="sponsorNameKeyword" placeholder="申办方名称关键字">
      </div>
      <div class="form-group text-left">
        <label for="investigatorNameKeyword" class="font-weight-normal">
          <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="investigatorNameKeywordTooltipText">
            <i class="fas fa-question-circle"></i>&nbsp;
          </span>
          <span>研究方名称：</span>
        </label>
        <input v-model="investigatorNameKeyword" type="text" class="form-control" id="investigatorNameKeyword" placeholder="研究方名称关键字">
      </div>
      <div class="form-group text-left">
        <label for="involvedUserRealNameKeyword" class="font-weight-normal">
          <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="involvedUserRealNameKeywordTooltipText">
            <i class="fas fa-question-circle"></i>&nbsp;
          </span>
          <span>项目参与人员姓名：</span>
        </label>
        <input v-model="involvedUserRealNameKeyword" type="text" class="form-control" id="involvedUserRealNameKeyword" placeholder="项目参与人员姓名关键字">
      </div>
      <div class="form-group text-left">
        <label for="projectCreatedYearMonth" class="font-weight-normal">
          <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="projectCreatedYearMonthTooltipText">
            <i class="fas fa-question-circle"></i>&nbsp;
          </span>
          <span>项目创建年月：</span>
        </label>
        <input v-model="projectCreatedYearMonth" type="month" class="form-control" id="projectCreatedYearMonth" placeholder="项目创建年月">
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
      <button type="button" class="btn btn-success" @click="query">
        <i class="fas fa-search"></i>
        <span>&nbsp;按上述条件筛选</span>
      </button>
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
        sponsorNameKeyword: '',
        sponsorNameKeywordTooltipText: '请在这里填写申办方名称中的关键字，留空默认匹配所有申办方名称。',
        investigatorNameKeyword: '',
        investigatorNameKeywordTooltipText: '请在这里填写研究方名称中的关键字，留空默认匹配所有研究方名称。',
        involvedUserRealNameKeyword: '',
        involvedUserRealNameKeywordTooltipText: '请在这里填写项目参与人员姓名中的关键字，留空默认匹配所有项目参与人员姓名。',
        projectCreatedYearMonth: '',
        projectCreatedYearMonthTooltipText: '请在这里填写项目创建年月，留空默认匹配所有年月。',
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
        let projectNameKeywordDescription = this.projectNameKeyword;
        let sponsorNameKeywordDescription = this.sponsorNameKeyword;
        let investigatorNameKeywordDescription = this.investigatorNameKeyword;
        let involvedUserRealNameKeywordDescription = this.involvedUserRealNameKeyword;
        let projectCreatedYearMonthDescription = this.projectCreatedYearMonth;
        if (this.projectNameKeyword === '') {
          projectNameKeywordDescription = '不限';
        }
        if (this.sponsorNameKeyword === '') {
          sponsorNameKeywordDescription = '不限';
        }
        if (this.investigatorNameKeyword === '') {
          investigatorNameKeywordDescription = '不限';
        }
        if (this.involvedUserRealNameKeyword === '') {
          involvedUserRealNameKeywordDescription = '不限';
        }
        if (this.projectCreatedYearMonth === '') {
          projectCreatedYearMonthDescription = '不限';
        }
        let filterDescription = `"项目名称关键字：${projectNameKeywordDescription}；申办方名称关键字：${sponsorNameKeywordDescription}；研究方名称关键字：${investigatorNameKeywordDescription}；项目参与人员姓名：${involvedUserRealNameKeywordDescription}；项目创建年月：${projectCreatedYearMonthDescription}；项目当前阶段：${projectStageMap.get(this.projectStage)[1]}"`;
        this.$store.dispatch('setProjectFilterDescriptionAction', {
          projectFilterDescription: filterDescription
        });
        return {
          userID: this.currentUserID,
          projectNameKeyword: this.projectNameKeyword,
          sponsorNameKeyword: this.sponsorNameKeyword,
          investigatorNameKeyword: this.investigatorNameKeyword,
          involvedUserRealNameKeyword: this.involvedUserRealNameKeyword,
          projectCreatedYearMonth: this.projectCreatedYearMonth,
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