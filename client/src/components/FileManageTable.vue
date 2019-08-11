<template>
  <div>
    <p>任务创建者的文件：</p>
    <div class="table-responsive">
      <table class="table table-bordered">
        <tr>
          <td>文件名</td>
          <td>创建日期</td>
          <td>创建者</td>
          <td>删除日期</td>
          <td>删除者</td>
          <td>操作</td>
        </tr>
        <template v-for="(file, index) in taskCreatorFiles">
          <tr>
            <td>{{file.fileName}}</td>
            <td>{{file.createDate}}</td>
            <td>{{file.creator}}</td>
            <td>{{file.deleteDate}}</td>
            <td>{{file.deleteExecutor}}</td>
            <td>
            <span class="cursor-pointer text-primary" @click="downloadFile(file.fileID, 'view')">
              <i class="fas fa-download"></i>&nbsp;
            </span>
              <span class="cursor-pointer text-danger" @click="deleteFile(file.fileID, 'delete')" v-if="isAdmin">
              <i class="fas fa-trash"></i>&nbsp;
            </span>
            </td>
          </tr>
        </template>
      </table>
    </div>
    <p>任务接受者的文件：</p>
    <div class="table-responsive">
      <table class="table table-bordered">
        <tr>
          <td>文件名</td>
          <td>创建日期</td>
          <td>创建者</td>
          <td>删除日期</td>
          <td>删除者</td>
          <td>操作</td>
        </tr>
        <template v-for="(file, index) in taskReceiverFiles">
          <tr>
            <td>{{file.fileName}}</td>
            <td>{{file.createDate}}</td>
            <td>{{file.creator}}</td>
            <td>{{file.deleteDate}}</td>
            <td>{{file.deleteExecutor}}</td>
            <td>
            <span class="cursor-pointer text-primary" @click="downloadFile(file.fileID, 'view')">
              <i class="fas fa-download"></i>&nbsp;
            </span>
              <span class="cursor-pointer text-danger" @click="deleteFile(file.fileID, 'delete')">
              <i class="fas fa-trash"></i>&nbsp;
            </span>
            </td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'file_manage_table',
    props: {
      taskID: {
        type: String,
        required: true,
      },
    },
    data: () => {
      return {
        // TODO:根据传入的taskID从服务器获取所有文件（创建者上传的+接受者上传的）
        taskCreatorFiles: [
          {
            fileID: 'FILE001',
            fileName: 'DMP-SOP-V1.0',
            createDate: '2019-08-11',
            creator: '刘沛',
            deleteDate: '2019-08-11',
            deleteExecutor: '刘沛',
          },
          {
            fileID: 'FILE001',
            fileName: 'DMP-SOP-V1.1',
            createDate: '2019-08-11',
            creator: '刘沛',
            deleteDate: '',
            deleteExecutor: '',
          },
        ],
        taskReceiverFiles: [
          {
            fileID: 'FILE001',
            fileName: 'DMP-V1.0',
            createDate: '2019-08-15',
            creator: '范扬',
            deleteDate: '2019-08-11',
            deleteExecutor: '范扬',
          },
          {
            fileID: 'FILE001',
            fileName: 'DMP-V2.0',
            createDate: '2019-08-17',
            creator: '范扬',
            deleteDate: '',
            deleteExecutor: '',
          },
        ],
      };
    },
    computed: {
      isAdmin: function () {
        return this.$store.state.indicators.isAdmin;
      },
    },
    mounted: function () {
      this.$nextTick(function () {

      })
    },
    methods: {
      downloadFile: function (fileID) {

      },
      deleteFile: function (fileID) {

      },
    },
  }
</script>

<style scoped>
  .cursor-pointer {
    cursor: pointer;
  }
</style>