<template>
  <div class="row" id="file_view">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-xl-6 offset-xl-3">
          <h1>查看文件-{{ $route.params.fileID }}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6 offset-xl-3 mb-2">
          <bottom-card :cardHeaderText="headerText" :cardTooltipText="tooltipText">
            <template v-slot:card-body>
              <file-info-table :fileInfoObject="fileInfoObject" :statusObject="statusObject4File"></file-info-table>
            </template>
          </bottom-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BottomCard from '@/components/BottomCard.vue';
  import FileInfoTable from '@/components/file/FileInfoTable.vue';
  export default {
    name: 'file_view',
    components: {
      BottomCard,
      FileInfoTable,
    },
    data: function () {
      return {
        headerText: '查看文件',
        tooltipText: '该文件的详细资料如下所示。',
        fileInfoObject: {},
        statusObject4File: {},
      }
    },
    created: function () {
      this.getFileInfo();
    },
    methods: {
      getFileInfo: function () {
        this.statusObject4File = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/file', {
          params: {
            fileID: this.$route.params.fileID,
          }
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.fileInfoObject = response.data.file[0];
            this.statusObject4File = {
              statusIndicator: 'loaded',
            };
          } else if (response.data.statusCode === '0') {
            console.error('FileView获取文件信息失败，错误：', response.data.error.message);
            this.statusObject4File = {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取文件信息失败，错误原因：${response.data.error.message}`,
            };
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('FileView获取文件信息失败，错误：', error);
          this.statusObject4File = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取文件信息失败，错误原因：${error}`,
          };
        });
      },
    },
  }
</script>