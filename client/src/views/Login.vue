<template>
  <div class="row align-items-center height-100-percentage" id="login">
    <div class="col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-xs-10 offset-xs-1">
      <div class="card shadow border-success">
        <div class="card-header bg-success border-success">
          <div class="m-2 font-weight-light h4">
            <i class="fas fa-cog"></i>
            临床试验项目管理系统
          </div>
        </div>
        <div class="card-body">
          <form class="mt-3">
            <div class="form-group row">
              <label for="username" class="col-md-3 col-form-label text-md-right text-left">用户名：</label>
              <div class="col-md-9">
                <input type="email" class="form-control" id="username" placeholder="请输入用户名" v-model="formValues.username" @keyup.enter="login">
              </div>
            </div>
            <div class="form-group row">
              <label for="password" class="col-md-3 col-form-label text-md-right text-left">密码：</label>
              <div class="col-md-9">
                <input type="password" class="form-control" id="password" placeholder="请输入密码" v-model="formValues.password" @keyup.enter="login">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-12 text-center">
                <button class="btn btn-success" type="button" :disabled="loading" @click="login" v-html="buttonText">
                  <span class="spinner-border spinner-border-sm" v-if="loading"></span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="modal" id="errorModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">登录失败</h5>
              <button type="button" class="close" data-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div>{{ responseMessage }}</div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success" data-dismiss="modal">确定</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data: function () {
      return {
        responseMessage: '',
        loading: false,
        buttonText: '&nbsp;&nbsp;登录&nbsp;&nbsp;',
        formValues: {
          username: '',
          password: '',
        },
      };
    },
    created: function () {
      if (localStorage.getItem('userInfo') !== null) {
        this.$router.push({
          name: 'home',
        });
      }
    },
    methods: {
      login: function () {
        this.loading = true;
        this.buttonText = '登录中，请稍后';
        this.$axios.post('/login', this.formValues).then((response) => {
          if (response.data.statusCode === '1') {
            // console.log('Login登录成功', response);
            localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo));
            localStorage.setItem('token', JSON.stringify(response.data.token));
            this.$router.push({
              name: 'home',
            });
          } else if (response.data.statusCode === '0') {
            console.error('Login登录失败，错误：', response.data.error.message);
            this.responseMessage = `${response.data.error.message}`;
            $('#errorModal').modal('show');
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('Login登录失败，错误：', error);
          this.responseMessage = `${error}`;
          $('#errorModal').modal('show');
        }).finally(() => {
          this.loading = false;
          this.buttonText = '&nbsp;&nbsp;登录&nbsp;&nbsp;';
        });
      },
    },
  }
</script>