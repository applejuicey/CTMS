<template>
  <div class="list-card">
    <div class="row" v-if="statusObject.statusIndicator === 'loading'">
      <div class="col-xl-8 offset-xl-2">
        <div class="alert alert-primary text-center mb-0">
          <h4 class="alert-heading">{{ statusObject.alertHeader }}</h4>
          <p>
            <span class="spinner-border spinner-border-sm text-primary"></span>&nbsp;{{ statusObject.feedbackMessage }}
          </p>
        </div>
      </div>
    </div>
    <div class="row" v-else-if="statusObject.statusIndicator === 'error'">
      <div class="col-xl-8 offset-xl-2">
        <div class="alert alert-danger text-center mb-0">
          <h4 class="alert-heading">{{ statusObject.alertHeader }}</h4>
          <p>
            {{ statusObject.feedbackMessage }}
          </p>
        </div>
      </div>
    </div>
    <div class="row" v-else-if="statusObject.statusIndicator === 'loaded'">
      <div class="col-12">
        <form>
          <div class="form-group text-left">
            <label for="fileBelongedToTaskName" class="font-weight-normal">
              <span>隶属于任务：</span>
            </label>
            <input v-model="formValues.fileBelongedToTaskName" type="text" class="form-control" id="fileBelongedToTaskName" placeholder="文件所属任务名称" disabled>
          </div>
          <div class="form-group text-left">
            <label for="fileName" class="font-weight-normal">
              <span>文件名称：</span>
            </label>
            <input v-model="formValues.fileName" type="text" class="form-control" id="fileName" placeholder="文件名称">
          </div>
          <div class="form-group text-left">
            <label for="fileDescription" class="font-weight-normal">
              <span>文件描述：</span>
            </label>
            <input v-model="formValues.fileDescription" type="text" class="form-control" id="fileDescription" placeholder="文件描述">
          </div>
          <div class="form-group text-left">
            <label class="font-weight-normal">
              <span>文件状态：</span>
            </label>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="fileStatus1" value="1" v-model="formValues.fileStatus">
              <label class="form-check-label" for="fileStatus1">
                正常
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="fileStatus2" value="2" v-model="formValues.fileStatus">
              <label class="form-check-label" for="fileStatus2">
                被移除
              </label>
            </div>
          </div>
          <div class="form-group text-left" v-if="$route.path.split('/')[2] !== 'edit'">
            <label for="file" class="font-weight-normal">
              <span>文件：</span>
            </label>
            <div class="input-group mb-3">
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="file" @change="processFile">
                <label class="custom-file-label" for="file">点击此处，然后在弹出的选择框中浏览并选中文件</label>
              </div>
            </div>
          </div>
          <button type="button" class="btn btn-success" @click="submit" :disabled="submitLoading">
            <i class="fas fa-check"></i>&nbsp;提交
          </button>
        </form>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-xl-8 offset-xl-2">
        <div class="alert alert-info text-center mb-0">
          <h4 class="alert-heading">等待初始化</h4>
          <p>
            正在等待初始化流程执行......
          </p>
        </div>
      </div>
    </div>
    <custom-modal :modalHeader="modalHeader" :responseMessage="responseMessage" :modalButtonTarget="modalButtonTarget"></custom-modal>
  </div>
</template>

<script>
  import CustomModal from '@/components/CustomModal.vue';
  export default {
    name: 'file_edit_form',
    components: {
      CustomModal,
    },
    props: {
      fileInfoObject: {
        type: Object,
        required: true,
      },
      statusObject: {
        type: Object,
        required: true,
      },
    },
    data: () => {
      return {
        formValues: {},
        submitLoading: false,
        modalHeader: '',
        responseMessage: '',
        modalButtonTarget: 'nowhere',
      };
    },
    watch: {
      fileInfoObject: {
        handler: function (newVal, oldVal) {
          this.formValues = {
            fileID: newVal.fileID,
            fileBelongedToTaskID: newVal.fileBelongedToTaskID,
            fileBelongedToTaskName: newVal.fileBelongedToTaskName,
            fileName: newVal.fileName,
            fileDescription: newVal.fileDescription,
            fileStatus: newVal.fileStatus,
          };
        },
        deep: true,
      },
    },
    created: function () {
      this.formValues = {
        fileID: this.fileInfoObject.fileID || '',
        fileBelongedToTaskID: this.fileInfoObject.fileBelongedToTaskID || this.$route.params.taskID,
        fileBelongedToTaskName: this.fileInfoObject.fileBelongedToTaskName || this.$route.params.taskName,
        fileName: this.fileInfoObject.fileName || '',
        fileDescription: this.fileInfoObject.fileDescription || '',
        fileStatus: this.fileInfoObject.fileStatus || '1',
      };
    },
    methods: {
      processFile: function (e) {
        this.formValues.file = e.target.files[0];
        e.target.parentElement.children[1].innerHTML = e.target.files[0].name;
      },
      submit: function () {
        let formData = new FormData();
        formData.append('fileID', this.formValues.fileID);
        formData.append('fileBelongedToTaskID', this.formValues.fileBelongedToTaskID);
        formData.append('fileName', this.formValues.fileName);
        formData.append('fileDescription', this.formValues.fileDescription);
        formData.append('fileStatus', this.formValues.fileStatus);
        formData.append('file', this.formValues.file);
        this.submitLoading = true;
        const axiosMethod = this.$route.path.split('/')[2] === 'create'? 'post' : 'put';
        this.$axios({
          method: axiosMethod,
          url: '/file',
          data: formData
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.modalHeader = '提示';
            this.responseMessage = '操作成功！';
            this.modalButtonTarget = 'tasks';
          } else if (response.data.statusCode === '0') {
            console.error('FileEditForm操作失败，错误：', response.data.error.message);
            this.modalHeader = '错误';
            this.responseMessage = `操作失败！原因：${response.data.error.message}`;
            this.modalButtonTarget = 'nowhere';
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('FileEditForm操作失败，错误：', error);
          this.modalHeader = '错误';
          this.responseMessage = `操作失败！原因：${error}`;
          this.modalButtonTarget = 'nowhere';
        }).finally(() => {
          this.submitLoading = false;
          $('#customModal').modal('show');
        });
      },
    },
  }
</script>