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
            <label for="templateName" class="font-weight-normal">
              <span>模板名称：</span>
            </label>
            <input v-model="formValues.templateName" type="text" class="form-control" id="templateName" placeholder="模板名称">
          </div>
          <div class="form-group text-left">
            <label for="templateDescription" class="font-weight-normal">
              <span>模板描述：</span>
            </label>
            <input v-model="formValues.templateDescription" type="text" class="form-control" id="templateDescription" placeholder="模板描述">
          </div>
          <div class="form-group text-left">
            <label class="font-weight-normal">
              <span>模板状态：</span>
            </label>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="templateStatus1" value="1" v-model="formValues.templateStatus">
              <label class="form-check-label" for="templateStatus1">
                正常
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="templateStatus2" value="2" v-model="formValues.templateStatus">
              <label class="form-check-label" for="templateStatus2">
                被移除
              </label>
            </div>
          </div>
          <div class="form-group text-left" v-if="$route.path.split('/')[2] !== 'edit'">
            <label for="template" class="font-weight-normal">
              <span>模板：</span>
            </label>
            <div class="input-group mb-3">
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="template" @change="processTemplate">
                <label class="custom-file-label" for="template">点击此处，然后在弹出的选择框中浏览并选中模板</label>
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
    name: 'template_edit_form',
    components: {
      CustomModal,
    },
    props: {
      templateInfoObject: {
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
      templateInfoObject: {
        handler: function (newVal, oldVal) {
          this.formValues = {
            templateID: newVal.templateID,
            templateName: newVal.templateName,
            templateDescription: newVal.templateDescription,
            templateStatus: newVal.templateStatus,
          };
        },
        deep: true,
      },
    },
    created: function () {
      this.formValues = {
        templateID: this.templateInfoObject.templateID || '',
        templateName: this.templateInfoObject.templateName || '',
        templateDescription: this.templateInfoObject.templateDescription || '',
        templateStatus: this.templateInfoObject.templateStatus || '1',
      };
    },
    methods: {
      processTemplate: function (e) {
        this.formValues.template = e.target.files[0];
        e.target.parentElement.children[1].innerHTML = e.target.files[0].name;
      },
      submit: function () {
        let formData = new FormData();
        formData.append('templateID', this.formValues.templateID);
        formData.append('templateName', this.formValues.templateName);
        formData.append('templateDescription', this.formValues.templateDescription);
        formData.append('templateStatus', this.formValues.templateStatus);
        formData.append('template', this.formValues.template);
        this.submitLoading = true;
        const axiosMethod = this.$route.path.split('/')[2] === 'create'? 'post' : 'put';
        this.$axios({
          method: axiosMethod,
          url: '/template',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.modalHeader = '提示';
            this.responseMessage = '操作成功！';
            this.modalButtonTarget = 'templates';
          } else if (response.data.statusCode === '0') {
            console.error('TemplateEditForm操作失败，错误：', response.data.error.message);
            this.modalHeader = '错误';
            this.responseMessage = `操作失败！原因：${response.data.error.message}`;
            this.modalButtonTarget = 'nowhere';
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('TemplateEditForm操作失败，错误：', error);
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