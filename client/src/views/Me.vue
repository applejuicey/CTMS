<template>
  <div class="row height-100-percentage" id="me">
    <div class="col-12 height-100-percentage">
      <div class="row mb-2">
        <div class="col-12">
          <h1>我的资料</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mb-2">
          <bottom-card :cardHeaderText="meHeaderText" :cardTooltipText="meTooltipText">
            <template v-slot:card-body>
              <user-info-table :userInfoObject="userInfoObject" :statusObject="statusObject4User"></user-info-table>
              <hr class="bg-warning"/>
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
  import UserInfoTable from '@/components/user/UserInfoTable.vue';
  import UserEditForm from '@/components/user/UserEditForm.vue';
  export default {
    name: 'me',
    components: {
      BottomCard,
      UserInfoTable,
      UserEditForm,
    },
    data: function () {
      return {
        meHeaderText: '我的资料',
        meTooltipText: '您可以在下方填写新的资料并提交至服务器，点击"刷新"按钮以刷新您的信息！',
        userInfoObject: {},
        statusObject4User: {},
      }
    },
    computed: {
      currentUserID: function () {
        return JSON.parse(localStorage.getItem('userInfo')).userID;
      },
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
            userID: this.currentUserID,
          }
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.userInfoObject = response.data.user;
            this.statusObject4User = {
              statusIndicator: 'loaded',
            };
          } else if (response.data.statusCode === '0') {
            console.error('Me获取用户信息失败，错误：', response.data.error.message);
            this.statusObject4User = {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取用户信息失败，错误原因：${response.data.error.message}`,
            };
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('Me获取用户信息失败，错误：', error);
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

