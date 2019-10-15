<template>
  <div class="list-card">
    <div class="row" v-if="statusObject.statusIndicator === 'loading'">
      <div class="col-xl-6 offset-xl-3">
        <div class="alert alert-primary text-center mb-0">
          <h4 class="alert-heading">{{ statusObject.alertHeader }}</h4>
          <p>
            <span class="spinner-border spinner-border-sm text-primary"></span>&nbsp;{{ statusObject.feedbackMessage }}
          </p>
        </div>
      </div>
    </div>
    <div class="row" v-else-if="statusObject.statusIndicator === 'error'">
      <div class="col-xl-6 offset-xl-3">
        <div class="alert alert-danger text-center mb-0">
          <h4 class="alert-heading">{{ statusObject.alertHeader }}</h4>
          <p>
            {{ statusObject.feedbackMessage }}
          </p>
        </div>
      </div>
    </div>
    <div class="table-responsive" v-else-if="statusObject.statusIndicator === 'loaded'">
      <div class="d-flex mb-2" v-if="$route.path.split('/')[1] !== 'users'">
        <span class="font-weight-normal">
          <i class="fas fa-caret-right"></i>&nbsp;
          用户：
        </span>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered table-hover text-nowrap">
          <tbody>
            <tr>
              <td>操作</td>
              <td>ID</td>
              <td>账户名称</td>
              <td>真实姓名</td>
              <td>邮箱</td>
              <td>账户状态</td>
              <td>上次登录时间</td>
            </tr>
            <template v-for="(user, index) in usersInfoArray">
              <tr>
                <td>
                  <span class="cursor-pointer text-primary" @click="changeRoute(user.userID, 'view')">
                    <i class="fas fa-search"></i>&nbsp;
                  </span>
                  <span class="cursor-pointer text-success" @click="changeRoute(user.userID, 'edit')" v-if="isAdmin || currentUserID === user.userID">
                    <i class="fas fa-edit"></i>&nbsp;
                  </span>
                  <span class="cursor-pointer text-danger" @click="changeRoute(user.userID, 'delete')" v-if="isAdmin">
                    <i class="fas fa-trash"></i>&nbsp;
                  </span>
                </td>
                <td>{{ user.userID }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.userRealName }}</td>
                <td>{{ user.userEmail }}</td>
                <td>{{ user.userAccountStatus }}</td>
                <td>{{ user.userLastLoginTime }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-xl-6 offset-xl-3">
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
    name: 'users_info_table',
    props: {
      usersInfoArray: {
        type: Array,
        required: true,
      },
      statusObject: {
        type: Object,
        required: true,
      },
    },
    computed: {
      isAdmin: function () {
        return JSON.parse(localStorage.getItem('userInfo')).isAdmin;
      },
      currentUserID: function () {
        return JSON.parse(localStorage.getItem('userInfo')).userID;
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

<style scoped>

</style>