<template>
  <div class="modal" tabindex="-1" :id="modalUniqueID">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">请选择任务接受者</h5>
          <button type="button" class="close" data-dismiss="modal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="list-card">
            <div class="row" v-if="statusObject.statusIndicator === 'loading'">
              <div class="col-12">
                <div class="alert alert-primary text-center mb-0">
                  <h4 class="alert-heading">{{ statusObject.alertHeader }}</h4>
                  <p>
                    <span class="spinner-border spinner-border-sm text-primary"></span>&nbsp;{{ statusObject.feedbackMessage }}
                  </p>
                </div>
              </div>
            </div>
            <div class="row" v-else-if="statusObject.statusIndicator === 'error'">
              <div class="col-12">
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
                <template v-for="(user, index) in userList">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" :id="user.userID" :value="user.userID" v-model="selectedUserID">
                    <label class="form-check-label" :for="user.userID">
                      {{ user.username }}
                    </label>
                  </div>
                </template>
              </div>
            </div>
            <div class="row" v-else>
              <div class="col-12">
                <div class="alert alert-info text-center mb-0">
                  <h4 class="alert-heading">等待初始化</h4>
                  <p>
                    正在等待初始化流程执行......
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="processUserSelection">确定</button>
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'user_list_modal',
    props: {
      userList: {
        type: Array,
        required: true,
      },
      statusObject: {
        type: Object,
        required: true,
      },
    },
    data: function () {
      return {
        selectedUserID: '',
      };
    },
    computed: {
      modalUniqueID: function () {
        return `Modal${ new Date().getTime() }`;
      },
    },
    mounted: function () {
      this.$emit('mountedComplete', this.modalUniqueID);
    },
    methods: {
      processUserSelection: function () {
        for (const user of this.userList) {
          if (this.selectedUserID === user.userID) {
            this.$emit('selectionMade', this.selectedUserID, user.username);
            $(`#${ this.modalUniqueID }`).modal('hide');
          }
        }
      },
    },
  }
</script>

<style scoped>
  .list-card {
    padding: 1.25rem;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    border: 1px solid #eee;
    border-radius: .25rem;
    border-left-width: .25rem;
    /*border-left-color: #28a745;*/
  }
</style>