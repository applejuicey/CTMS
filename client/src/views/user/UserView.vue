<template>
  <div class="row" id="user_view">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>查看用户-{{ $route.params.userID }}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mb-2">
          <bottom-card :cardHeaderText="userInfoHeaderText" :cardTooltipText="userInfoTooltipText">
            <template v-slot:card-body>
              <user-info-table :userInfoObject="userInfoObject" :statusObject="statusObject4User"></user-info-table>
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
  export default {
    name: 'user_view',
    components: {
      BottomCard,
      UserInfoTable,
    },
    data: function () {
      return {
        userInfoHeaderText: '用户资料',
        userInfoTooltipText: '该用户的资料如下所示。',
        userInfoObject: {},
        statusObject4User: {},
      }
    },
    computed: {
      currentUserID: function () {
        return JSON.parse(localStorage.getItem('userInfo')).userID;
      },
      isAdmin: function () {
        return JSON.parse(localStorage.getItem('userInfo')).isAdmin;
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
      // 根据传入的userID从服务器获取用户的信息
      getUserInfo: function () {
        this.statusObject4User = {
          statusIndicator: 'loading',
          alertHeader: '加载中',
          feedbackMessage: '正在从服务器获取数据，请稍后......',
        };
        this.$axios.get('/userInfo', {
          params: {
            userID: this.$route.params.userID,
          }
        }).then((response) => {
          // console.log('UserView获取用户信息成功', response);
          this.userInfoObject = response.data.userInfo;
          this.statusObject4User = {
            statusIndicator: 'loaded',
          };
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