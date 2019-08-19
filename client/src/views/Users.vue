<template>
  <div class="row" id="users">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>管理用户</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <bottom-card :cardHeaderText="'所有用户'" :cardTooltipText="'aaa'">
            <template v-slot:card-body>
              <div class="table-responsive">
                <table class="table table-bordered text-nowrap">
                  <tr>
                    <td>操作</td>
                    <td>ID</td>
                    <td>账户名称</td>
                    <td>真实姓名</td>
                    <td>邮箱</td>
                    <td>账户状态</td>
                    <td>上次登录时间</td>
                  </tr>
                </table>
              </div>
            </template>
          </bottom-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BottomCard from '@/components/BottomCard.vue';
  export default {
    name: 'users',
    components: {
      BottomCard,
    },
  }
</script>

<style scoped>

</style>