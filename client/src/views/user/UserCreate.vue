<template>
  <div class="row" id="user_create">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-xl-6 offset-xl-3">
          <h1>创建新用户账户</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6 offset-xl-3 mb-2">
          <bottom-card :cardHeaderText="userInfoHeaderText" :cardTooltipText="userInfoTooltipText">
            <template v-slot:card-body>
              <user-edit-form :userInfoObject="userInfoObject" :statusObject="statusObject4User"></user-edit-form>
            </template>
          </bottom-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BottomCard from '@/components/BottomCard.vue';
  import UserEditForm from '@/components/user/UserEditForm.vue';
  export default {
    name: 'user_delete',
    components: {
      BottomCard,
      UserEditForm,
    },
    data: function () {
      return {
        userInfoHeaderText: '用户资料',
        userInfoTooltipText: '您可以在下方填写新用户的资料并提交至服务器！',
        userInfoObject: {},
        statusObject4User: {
          statusIndicator: 'loaded',
        },
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        $(function () {
          $('[data-toggle="tooltip"]').tooltip();
        })
      });
    },
  }
</script>