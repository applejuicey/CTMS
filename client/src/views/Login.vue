<template>
  <div class="row align-items-center" id="login">
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
                <input type="email" class="form-control" id="username" placeholder="请输入用户名">
              </div>
            </div>
            <div class="form-group row">
              <label for="password" class="col-md-3 col-form-label text-md-right text-left">密码：</label>
              <div class="col-md-9">
                <input type="password" class="form-control" id="password" placeholder="请输入密码">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-12 text-center">
                <button type="submit" class="btn btn-warning">登录</button>
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
  }
</script>

<style scoped>
 #login {
   height: 100vh;
   background:url(https://images.unsplash.com/photo-1546198632-9ef6368bef12?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80);
   background-size:cover;
 }
 .shadow {
   box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.1);
 }
</style>