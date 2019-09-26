<template>
  <div class="row height-100-percentage" id="templates">
    <div class="col-12 height-100-percentage">
      <div class="row mb-2">
        <div class="col-12">
          <h1>
            <i class="fas fa-capsules"></i>&nbsp;模板查询
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-3 mb-2">
          <bottom-card :cardHeaderText="filterToolboxHeaderText" :cardTooltipText="filterToolboxTooltipText">
            <template v-slot:card-body>
              <templates-filter-form></templates-filter-form>
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
                    <p>请在"文件筛选器"中提供检索条件，然后点击"按上述条件筛选"。</p>
                  </div>
                </div>
              </div>
              <div v-else>
                <p class="text-left">
                  <mark>{{ resultDescription }}</mark>
                  的查询结果如下所示：
                </p>
                <templates-info-table :templatesInfoArray="templatesInfoArray" :statusObject="statusObject4Templates"></templates-info-table>
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
  import TemplatesFilterForm from '@/components/template/TemplatesFilterForm.vue';
  import TemplatesInfoTable from '@/components/template/TemplatesInfoTable.vue';
  export default {
    name: 'templates',
    components: {
      BottomCard,
      TemplatesFilterForm,
      TemplatesInfoTable,
    },
    data: function () {
      return {
        filterToolboxHeaderText: '模板筛选器',
        filterToolboxTooltipText: '请在这里设定筛选内容，然后点击"筛选"按钮获得命中条目。',
        resultCardHeaderText: '模板查询结果',
        resultCardTooltipText: '根据筛选器规则的查询结果如下所示，点击"放大镜"按钮以查看模板详细资料；点击"铅笔"按钮以编辑模板信息；点击""按钮可以暂时移除模板；点击""按钮可以恢复暂时移除的模板；点击""按钮可以永久删除模板。',
      };
    },
    computed: {
      // 从VUEX中取出整理后的检索描述字符串
      resultDescription: function () {
        return this.$store.state.messages.templateFilterDescription;
      },
      // 从VUEX中取出检索结果
      templatesInfoArray: function () {
        return this.$store.state.templateFilterQueryResult.templatesInfoArray;
      },
      statusObject4Templates: function () {
        return this.$store.state.templateFilterQueryResult.statusObject4Templates;
      },
    },
    watch: {
      // watch VUEX中的templateFilterQueryObject，有变化时从服务器获取数据
      '$store.state.templateFilterQueryObject': {
        handler: function (newVal, oldVal) {
          this.getTemplatesInfo(newVal);
        },
        deep: true
      },
    },
    mounted: function () {
      this.$nextTick(function () {
        $(function () {
          $('[data-toggle="tooltip"]').tooltip();
        })
      });
    },
    methods: {
      getTemplatesInfo: function (queryParamsObject) {
        this.$store.dispatch('setTemplateFilterQueryResultAction', {
          statusObject4Templates: {
            statusIndicator: 'loading',
            alertHeader: '加载中',
            feedbackMessage: '正在从服务器获取数据，请稍后......',
          },
          templatesInfoArray: [],
        });
        this.$axios.get('/template', {
          params: {
            brief: false,
            templateName: queryParamsObject.templateNameKeyword,
            templateCreatorName: queryParamsObject.templateCreatorNameKeyword,
          }
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.$store.dispatch('setTemplateFilterQueryResultAction', {
              statusObject4Templates: {
                statusIndicator: 'loaded',
              },
              templatesInfoArray: response.data.templates,
            });
          } else if (response.data.statusCode === '0') {
            console.error('Templates获取模板信息失败，错误：', response.data.error.message);
            this.$store.dispatch('setTemplateFilterQueryResultAction', {
              statusObject4Templates: {
                statusIndicator: 'error',
                alertHeader: '有错误发生',
                feedbackMessage: `从服务器获取模板信息失败，错误原因：${response.data.error.message}`,
              },
              templatesInfoArray: [],
            });
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('Templates获取模板信息失败，错误：', error);
          this.$store.dispatch('setTemplateFilterQueryResultAction', {
            statusObject4Templates: {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取模板信息失败，错误原因：${error}`,
            },
            templatesInfoArray: [],
          });
        });
      },
    },
  }
</script>