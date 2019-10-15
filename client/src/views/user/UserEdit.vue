<template>
  <div class="row" id="user_edit">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-xl-6 offset-xl-3">
          <h1>编辑用户-{{ $route.params.userID }}</h1>
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
    name: 'user_edit',
    components: {
      BottomCard,
      UserEditForm,
    },
    data: function () {
      return {
        userInfoHeaderText: '编辑用户',
        userInfoTooltipText: '您可以在下方修改该用户的资料并提交至服务器。',
        userInfoObject: {},
        statusObject4User: {},
      }
    },
    created: function () {
      this.getUserInfo();
    },
    mounted: function () {
      this.$nextTick(function () {
        $(function () {
          $('[data-toggle="tooltip"]').tooltip();
        })
      });
    },
    methods: {
      getUserInfo: function () {
        this.statusObject4User = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/user', {
          params: {
            userID: this.$route.params.userID,
          }
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.userInfoObject = response.data.user[0];
            this.statusObject4User = {
              statusIndicator: 'loaded',
            };
          } else if (response.data.statusCode === '0') {
            console.error('UserView获取用户信息失败，错误：', response.data.error.message);
            this.statusObject4User = {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取用户信息失败，错误原因：${response.data.error.message}`,
            };
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('UserView获取用户信息失败，错误：', error);
          this.statusObject4User = {
            statusIndicator: 'error',
            alertHeader: '有错误发生',
            feedbackMessage: `从服务器获取用户信息失败，错误原因：${error}`,
          };
        });
      },
    },
  }
</script>

<style scoped>

</style>