<template>
  <div class="row" id="projects">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>
            <i class="fas fa-capsules"></i>&nbsp;项目查询
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-3 mb-2">
          <bottom-card :cardHeaderText="filterToolboxHeaderText" :cardTooltipText="filterToolboxTooltipText">
            <template v-slot:card-body>
              <projects-filter-form></projects-filter-form>
            </template>
          </bottom-card>
        </div>
        <div class="col-xl-9 mb-2">
          <bottom-card :cardHeaderText="resultCardHeaderText" :cardTooltipText="resultCardTooltipText">
            <template v-slot:card-body>
              <div class="row" v-if="resultDescription === ''">
                <div class="col-xl-6 offset-xl-3">
                  <div class="alert alert-info text-center mb-0">
                    <h4 class="alert-heading">请提供检索条件</h4>
                    <p>请在"项目筛选器"中提供检索条件，然后点击"按上述条件筛选"。</p>
                  </div>
                </div>
              </div>
              <div v-else>
                <p class="text-left">
                  <mark>{{ resultDescription }}</mark>
                  的查询结果如下所示：
                </p>
                <projects-info-table :projectsInfoArray="projectsInfoArray" :statusObject="statusObject4Projects"></projects-info-table>
              </div>
            </template>
          </bottom-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BottomCard from '@/components/BottomCard.vue';
  import ProjectsFilterForm from '@/components/project/ProjectsFilterForm.vue';
  import ProjectsInfoTable from '@/components/project/ProjectsInfoTable.vue';
  export default {
    name: 'projects',
    components: {
      BottomCard,
      ProjectsFilterForm,
      ProjectsInfoTable,
    },
    data: function () {
      return {
        filterToolboxHeaderText: '项目筛选器',
        filterToolboxTooltipText: '请在这里设定筛选内容，然后点击"筛选"按钮获得命中条目。',
        resultCardHeaderText: '项目查询结果',
        resultCardTooltipText: '根据筛选器规则的查询结果如下所示。点击"蓝色放大镜"按钮以查看项目详细资料；点击"绿色铅笔"按钮以编辑项目信息；点击"红色垃圾桶"按钮以删除项目。',
      };
    },
    computed: {
      // 从VUEX中取出整理后的检索描述字符串
      resultDescription: function () {
        return this.$store.state.messages.projectFilterDescription;
      },
      // 从VUEX中取出检索结果
      projectsInfoArray: function () {
        return this.$store.state.projectFilterQueryResult.projectsInfoArray;
      },
      statusObject4Projects: function () {
        return this.$store.state.projectFilterQueryResult.statusObject4Projects;
      },
    },
    watch: {
      // watch VUEX中的projectFilterQueryObject，有变化时从服务器获取数据
      '$store.state.projectFilterQueryObject': {
        handler: function (newVal, oldVal) {
          // console.log(newVal);
          this.getProjectsInfo(newVal);
        },
        deep: true
      },
    },
    methods: {
      getProjectsInfo: function (queryParamsObject) {
        this.$store.dispatch('setProjectFilterQueryResultAction', {
          statusObject4Projects: {
            statusIndicator: 'loading',
            alertHeader: '加载中',
            feedbackMessage: '正在从服务器获取数据，请稍后......',
          },
          projectsInfoArray: [],
        });
        this.$axios.get('/project', {
          params: {
            brief: false,
            projectName: queryParamsObject.projectNameKeyword,
            projectInvestigator: queryParamsObject.projectInvestigatorNameKeyword,
            projectSponsor: queryParamsObject.projectSponsorNameKeyword,
            // projectInvolvedUserRealName: queryParamsObject.projectInvolvedUserRealNameKeyword,
            projectCreatedTime: queryParamsObject.projectCreatedYearMonth,
            projectStage: queryParamsObject.projectStage === '-1'? '' : queryParamsObject.projectStage,
          }
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.$store.dispatch('setProjectFilterQueryResultAction', {
              statusObject4Projects: {
                statusIndicator: 'loaded',
              },
              projectsInfoArray: response.data.projects,
            });
          } else if (response.data.statusCode === '0') {
            console.error('Projects获取项目信息失败，错误：', response.data.error.message);
            this.$store.dispatch('setProjectFilterQueryResultAction', {
              statusObject4Projects: {
                statusIndicator: 'error',
                alertHeader: '有错误发生',
                feedbackMessage: `从服务器获取项目信息失败，错误原因：${response.data.error.message}`,
              },
              projectsInfoArray: [],
            });
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('Projects获取项目信息失败，错误：', error);
          this.$store.dispatch('setProjectFilterQueryResultAction', {
            statusObject4Projects: {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取项目信息失败，错误原因：${error}`,
            },
            projectsInfoArray: [],
          });
        });
      },
    },
  }
</script>