<template>
  <div class="row align-items-center" id="login">
    <div class="toast" data-delay="8000">
      <div class="toast-header">
        <i class="fas fa-exclamation-circle mr-2"></i>
        <strong class="mr-auto">登录失败</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast">
          <i class="fas fa-times fa-xs"></i>
        </button>
      </div>
      <div class="toast-body">
        {{ responseMessage }}
      </div>
    </div>
    <div class="col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-8 offset-md-2">
      <div class="card shadow border-warning">
        <div class="card-header h4 bg-warning border-warning">
          临床试验项目管理系统
        </div>
        <div class="card-body">

          <form class="mt-3">
            <div class="form-group row">
              <label for="username" class="col-md-3 col-form-label text-md-right text-left">用户名：</label>
              <div class="col-md-9">
                <input type="email" class="form-control" id="username" placeholder="请输入用户名" v-model="formValues.username">
              </div>
            </div>
            <div class="form-group row">
              <label for="password" class="col-md-3 col-form-label text-md-right text-left">密码：</label>
              <div class="col-md-9">
                <input type="password" class="form-control" id="password" placeholder="请输入密码" v-model="formValues.password">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-12 text-center">
                <button class="btn btn-warning" type="button" :disabled="loading" @click="login">
                  <span class="spinner-border spinner-border-sm" v-if="loading"></span>
                  {{ buttonText }}
                </button>
              </div>
            </div>
          </form>
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
        buttonText: '登录',
        formValues: {
          username: '',
          password: '',
        },
      };
    },
    methods: {
      login: function () {
        this.loading = true;
        this.buttonText = '登录中，请稍后';
        this.$axios.post('/login', this.formValues).then((response) => {
          if (response.data.data.statusCode === '1') {
            // console.log('Login登录成功', response);
            localStorage.setItem('userInfo', JSON.stringify(response.data.data.userInfo));
            localStorage.setItem('token', JSON.stringify(response.data.data.token));
            this.$router.push({
              name: 'home',
            });
          } else {
            console.error('Login登录失败，错误：', response.data.data.error.message);
            this.responseMessage = `${response.data.data.error.message}`;
            $('.toast').toast('show')
          }
        }).catch((error) => {
          console.error('Login登录失败，错误：', error);
          this.responseMessage = `${error}`;
        }).finally(() => {
          this.loading = false;
          this.buttonText = '登录';
        });
      },
    },
  }
</script>

<style scoped>
 #login {
   height: 100vh;
   background:url(https://images.unsplash.com/photo-1546198632-9ef6368bef12?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80);
   background-size:cover;
 }
 .toast {
   position: absolute;
   top: 10px;
   right: 10px;
 }
 .shadow {
   box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.1);
 }
</style>