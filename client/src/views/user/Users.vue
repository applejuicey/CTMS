<template>
  <div class="row" id="users">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>
            <i class="fas fa-users-cog"></i>&nbsp;用户查询
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-3 mb-2">
          <bottom-card :cardHeaderText="filterToolboxHeaderText" :cardTooltipText="filterToolboxTooltipText">
            <template v-slot:card-body>
              <users-filter-form></users-filter-form>
            </template>
          </bottom-card>
        </div>
        <div class="col-xl-9 mb-2">
          <bottom-card :cardHeaderText="resultCardHeaderText" :cardTooltipText="resultCardTooltipText">
            <template v-slot:card-body>
              <div class="row" v-if="resultDescription === ''">
                <div class="col-xl-6 offset-xl-3">
                  <div class="alert alert-info text-center mb-0">
                    <h4 class="alert-heading">请提供检索条件</h4>
                    <p>请在"用户筛选器"中提供检索条件，然后点击"按上述条件筛选"。</p>
                  </div>
                </div>
              </div>
              <div v-else>
                <p class="text-left">
                  <mark>{{ resultDescription }}</mark>
                  的查询结果如下所示：
                </p>
                <users-info-table :usersInfoArray="usersInfoArray" :statusObject="statusObject4Users"></users-info-table>
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
  import UsersFilterForm from '@/components/user/UsersFilterForm.vue';
  import UsersInfoTable from '@/components/user/UsersInfoTable.vue';
  export default {
    name: 'users',
    components: {
      BottomCard,
      UsersFilterForm,
      UsersInfoTable,
    },
    data: function () {
      return {
        filterToolboxHeaderText: '用户筛选器',
        filterToolboxTooltipText: '请在这里设定筛选内容，然后点击"筛选"按钮获得命中条目。',
        resultCardHeaderText: '用户查询结果',
        resultCardTooltipText: '根据筛选器规则的查询结果如下所示，点击"放大镜"按钮以查看用户详细资料；点击"铅笔"按钮以编辑用户信息。',
      };
    },
    computed: {
      // 从VUEX中取出整理后的检索描述字符串
      resultDescription: function () {
        return this.$store.state.messages.userFilterDescription;
      },
      // 从VUEX中取出检索结果
      usersInfoArray: function () {
        return this.$store.state.userFilterQueryResult.usersInfoArray;
      },
      statusObject4Users: function () {
        return this.$store.state.userFilterQueryResult.statusObject4Users;
      },
    },
    watch: {
      // watch VUEX中的userFilterQueryObject，有变化时从服务器获取数据
      '$store.state.userFilterQueryObject': {
        handler: function (newVal, oldVal) {
          // console.log(newVal);
          this.getUsersInfo(newVal);
        },
        deep: true
      },
    },
    mounted: function () {
      this.$nextTick(function () {
        $(function () {
          $('[data-toggle="tooltip"]').tooltip();
        })
      });
    },
    methods: {
      getUsersInfo: function (queryParamsObject) {
        this.$store.dispatch('setUserFilterQueryResultAction', {
          statusObject4Users: {
            statusIndicator: 'loading',
            alertHeader: '加载中',
            feedbackMessage: '正在从服务器获取数据，请稍后......',
          },
          usersInfoArray: [],
        });
        this.$axios.get('/users', {
          params: {
            brief: false,
            userRealName: queryParamsObject.userRealNameKeyword,
            forTaskExecutor: false,
            taskID: '',
          }
        }).then((response) => {
          if (response.data.response.statusCode === '1') {
            this.$store.dispatch('setUserFilterQueryResultAction', {
              statusObject4Users: {
                statusIndicator: 'loaded',
              },
              usersInfoArray: response.data.response.users,
            });
          } else if (response.data.response.statusCode === '0') {
            console.error('Users获取用户信息失败，错误：', response.data.response.error.message);
            this.$store.dispatch('setUserFilterQueryResultAction', {
              statusObject4Users: {
                statusIndicator: 'error',
                alertHeader: '有错误发生',
                feedbackMessage: `从服务器获取用户信息失败，错误原因：${response.data.response.error.message}`,
              },
              usersInfoArray: [],
            });
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('Users获取用户信息失败，错误：', error);
          this.$store.dispatch('setUserFilterQueryResultAction', {
            statusObject4Users: {
              statusIndicator: 'error',
              alertHeader: '有错误发生',
              feedbackMessage: `从服务器获取用户信息失败，错误原因：${error}`,
            },
            usersInfoArray: [],
          });
        });
      },
    },
  }
</script>

<style scoped>

</style>