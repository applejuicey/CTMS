<template>
  <div class="row" id="file_create">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-xl-6 offset-xl-3">
          <h1>为{{ $route.params.taskID }}创建新文件</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6 offset-xl-3 mb-2">
          <bottom-card :cardHeaderText="headerText" :cardTooltipText="tooltipText">
            <template v-slot:card-body>
              <file-edit-form :fileInfoObject="fileInfoObject" :statusObject="statusObject4File"></file-edit-form>
            </template>
          </bottom-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BottomCard from '@/components/BottomCard.vue';
  import FileEditForm from '@/components/file/FileEditForm.vue';
  export default {
    name: 'file_create',
    components: {
      BottomCard,
      FileEditForm,
    },
    data: function () {
      return {
        headerText: '创建新文件',
        tooltipText: '您可以在下方填写新文件的资料并提交至服务器！',
        fileInfoObject: {},
        statusObject4File: {
          statusIndicator: 'loaded',
        },
      }
    },
    created: function () {
      if (this.$route.params.taskID) {
        this.fileInfoObject.fileBelongedToTaskID = this.$route.params.taskID;
      } else {
        this.$router.push({
          name: 'tasks',
        });
      }
    },
  }
</script>