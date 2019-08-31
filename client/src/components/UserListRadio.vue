<template>
  <div class="user-list">
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
        <template>
          <div class="form-check" v-for="(user, index) in userList">
            <input class="form-check-input" type="radio" :id="user.userID" :value="user.userID" v-model="selectedUserIDCurrent" @change="$emit('selectionChanged', selectedUserIDCurrent)">
            <label class="form-check-label" :for="user.userID">{{ user.username }}</label>
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
</template>

<script>
  export default {
    name: 'user_list_checkbox',
    props: {
      userList: {
        type: Array,
        required: true,
      },
      statusObject: {
        type: Object,
        required: true,
      },
      selectedUserIDOriginal: {
        type: String,
        required: false,
      }
    },
    data: function () {
      return {
        selectedUserIDCurrent: '',
      };
    },
    mounted: function () {
      this.selectedUserIDCurrent = this.selectedUserIDOriginal;
    },
    watch: {
      selectedUserIDOriginal: {
        handler: function (newVal, oldVal) {
          this.selectedUserIDCurrent = newVal;
        },
        deep: true,
      },
    },
  }
</script>

<style scoped>
  .user-list {
    padding: 1.25rem;
    border: 1px solid #eee;
    border-radius: .25rem;
    border-left-width: .25rem;
    border-left-color: #28a745;
    overflow-y: scroll;
    max-height: 400px;
  }
</style>