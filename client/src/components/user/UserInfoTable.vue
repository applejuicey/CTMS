<template>
  <div class="text-left list-card">
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
    <div v-else-if="statusObject.statusIndicator === 'loaded'">
      <div class="d-flex mb-2">
        <span class="font-weight-normal">
          <i class="fas fa-caret-right"></i>&nbsp;
          用户资料：
        </span>
        <div class="btn-group ml-auto" v-if="this.$route.path.split('/')[1] !== 'me'">
          <button type="button" class="btn btn-success" @click="changeRoute(userInfoObject.userID, 'edit')" v-if="isAdmin || userInfoObject.userID === currentUserID">
            <i class="fas fa-pen"></i>
            <span class="d-sm-inline d-none">&nbsp;编辑用户</span>
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-borderless table-sm text-nowrap mb-0">
          <tbody>
            <tr>
              <td class="table-left-column">用户ID：</td>
              <td class="table-right-column">{{ userInfoObject.userID }}</td>
            </tr>
            <tr>
              <td class="table-left-column">用户名称：</td>
              <td class="table-right-column">{{ userInfoObject.username }}</td>
            </tr>
            <tr>
              <td class="table-left-column">真实姓名：</td>
              <td class="table-right-column">{{ userInfoObject.userRealName }}</td>
            </tr>
            <tr>
              <td class="table-left-column">邮箱：</td>
              <td class="table-right-column">{{ userInfoObject.userEmail }}</td>
            </tr>
            <tr>
              <td class="table-left-column">用户状态：</td>
              <td class="table-right-column">{{ userInfoObject.userAccountStatus|userAccountStatusFilter }}</td>
            </tr>
            <tr>
              <td class="table-left-column">参与项目：</td>
              <td class="table-right-column">{{ userInfoObject.userInvolvedProjectsName }}</td>
            </tr>
            <tr>
              <td class="table-left-column">可管理项目：</td>
              <td class="table-right-column">{{ userInfoObject.userCanManageProjectsName }}</td>
            </tr>
            <tr>
              <td class="table-left-column">上次登录时间：</td>
              <td class="table-right-column">{{ userInfoObject.userLastLoginTime }}</td>
            </tr>
          </tbody>
        </table>
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
  </div>
</template>

<script>
  export default {
    name: 'user_info_table',
    props: {
      userInfoObject: {
        type: Object,
        required: true,
      },
      statusObject: {
        type: Object,
        required: true,
      },
    },
    computed: {
      currentUserID: function () {
        return JSON.parse(localStorage.getItem('userInfo')).userID;
      },
      isAdmin: function () {
        return JSON.parse(localStorage.getItem('userInfo')).isAdmin;
      },
    },
    filters: {
      userAccountStatusFilter: function (userAccountStatus) {
        const userAccountStatusMap = new Map();
        userAccountStatusMap.set('2', '冻结')
            .set('1', '正常');
        return userAccountStatusMap.get(userAccountStatus);
      },
    },
    methods: {
      changeRoute: function (userID, identifier) {
        this.$router.push({
          name: `user_${identifier}`,
          params: {
            userID: userID,
          },
        });
      },
    },
  }
</script>