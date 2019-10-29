<template>
  <div class="row" id="files">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>
            <i class="fas fa-file-alt"></i>&nbsp;文件查询
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-3 mb-2">
          <bottom-card :cardHeaderText="filterToolboxHeaderText" :cardTooltipText="filterToolboxTooltipText">
            <template v-slot:card-body>
              <files-filter-form></files-filter-form>
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
                <files-info-table :filesInfoArray="filesInfoArray" :statusObject="statusObject4Files"></files-info-table>
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
  import FilesFilterForm from '@/components/file/FilesFilterForm.vue';
  import FilesInfoTable from '@/components/file/FilesInfoTable.vue';
  export default {
    name: 'files',
    components: {
      BottomCard,
      FilesFilterForm,
      FilesInfoTable,
    },
    data: function () {
      return {
        filterToolboxHeaderText: '文件筛选器',
        filterToolboxTooltipText: '请在这里设定筛选内容，然后点击"筛选"按钮获得命中条目。',
        resultCardHeaderText: '文件查询结果',
        resultCardTooltipText: '根据筛选器规则的查询结果如下所示，点击"放大镜"按钮以查看文件详细资料；点击"铅笔"按钮以编辑文件信息；点击""按钮可以暂时移除文件；点击""按钮可以恢复暂时移除的文件；点击""按钮可以永久删除文件。',
      };
    },
    computed: {
      // 从VUEX中取出整理后的检索描述字符串
      resultDescription: function () {
        return this.$store.state.messages.fileFilterDescription;
      },
      // 从VUEX中取出检索结果
      filesInfoArray: function () {
        return this.$store.state.fileFilterQueryResult.filesInfoArray;
      },
      statusObject4Files: function () {
        return this.$store.state.fileFilterQueryResult.statusObject4Files;
      },
    },
    watch: {
      // watch VUEX中的fileFilterQueryObject，有变化时从服务器获取数据
      '$store.state.fileFilterQueryObject': {
        handler: function (newVal, oldVal) {
          this.getFilesInfo(newVal);
        },
        deep: true
      },
    },
    methods: {
      getFilesInfo: function (queryParamsObject) {
        this.$store.dispatch('setFileFilterQueryResultAction', {
          statusObject4Files: {
            statusIndicator: 'loading',
            alertHeader: '加载中',
            feedbackMessage: '正在从服务器获取数据，请稍后......',
          },
          filesInfoArray: [],
        });
        this.$axios.get('/file', {
          params: {
            brief: false,
            fileBelongedToTaskID: '',
            fileName: queryParamsObject.fileNameKeyword,
            fileBelongedToTaskName: queryParamsObject.fileBelongedToTaskNameKeyword,
            fileBelongedToProjectName: queryParamsObject.fileBelongedToProjectNameKeyword,
            fileCreatorName: queryParamsObject.fileCreatorNameKeyword,
          }
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.$store.dispatch('setFileFilterQueryResultAction', {
              statusObject4Files: {
                statusIndicator: 'loaded',
              },
              filesInfoArray: response.data.files,
            });
          } else if (response.data.statusCode === '0') {
            console.error('Files获取文件信息失败，错误：', response.data.error.message);
            this.$store.dispatch('setFileFilterQueryResultAction', {
              statusObject4Files: {
                statusIndicator: 'error',
                alertHeader: '有错误发生',
                feedbackMessage: `从服务器获取文件信息失败，错误原因：${response.data.error.message}`,
              },
              filesInfoArray: [],
            });
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('Files获取文件信息失败，错误：', error);
          this.$store.dispatch('setFileFilterQueryResultAction', {
            statusObject4Files: {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取文件信息失败，错误原因：${error}`,
            },
            filesInfoArray: [],
          });
        });
      },
    },
  }
</script>