<template>
  <div class="row" id="template_delete">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-xl-6 offset-xl-3">
          <h1>删除模板-{{ $route.params.templateID }}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6 offset-xl-3 mb-2">
          <bottom-card :cardHeaderText="headerText" :cardTooltipText="tooltipText">
            <template v-slot:card-body>
              <div class="row">
                <div class="col-xl-10 offset-xl-1">
                  <div class="alert alert-danger">
                    <h4 class="alert-heading">请确认您的操作！</h4>
                    <p>当您再三确认后，点击下方的按钮以删除该模板！</p>
                    <hr>
                    <button class="btn btn-danger" @click="deleteTemplate" :disabled="deleteLoading">
                      删除模板
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </bottom-card>
        </div>
      </div>
      <custom-modal :modalHeader="modalHeader" :responseMessage="responseMessage" :modalButtonTarget="modalButtonTarget"></custom-modal>
    </div>
  </div>
</template>

<script>
  import BottomCard from '@/components/BottomCard.vue';
  import CustomModal from '@/components/CustomModal.vue';
  export default {
    name: 'template_delete',
    components: {
      BottomCard,
      CustomModal,
    },
    data: function () {
      return {
        headerText: '删除模板',
        tooltipText: '请确认您的操作！',
        deleteLoading: false,
        modalHeader: '',
        responseMessage: '',
        modalButtonTarget: 'nowhere',
      }
    },
    methods: {
      deleteTemplate: function () {
        this.deleteLoading = true;
        this.$axios.delete('/template', {
          params: {
            templateID: this.$route.params.templateID
          }
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.modalHeader = '提示';
            this.responseMessage = '操作成功！';
            this.modalButtonTarget = 'templates';
          } else if (response.data.statusCode === '0') {
            console.error('TemplateDelete操作失败，错误：', response.data.error.message);
            this.modalHeader = '错误';
            this.responseMessage = `操作失败！原因：${response.data.error.message}`;
            this.modalButtonTarget = 'nowhere';
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('TemplateDelete操作失败，错误：', error);
          this.modalHeader = '错误';
          this.responseMessage = `操作失败！原因：${error}`;
          this.modalButtonTarget = 'nowhere';
        }).finally(() => {
          this.deleteLoading = false;
          $('#customModal').modal('show');
        });
      },
    },
  }
</script>