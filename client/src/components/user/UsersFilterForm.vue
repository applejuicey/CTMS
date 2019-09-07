<template>
  <div>
    <form>
      <div class="form-group text-left">
        <label for="realNameKeyword" class="font-weight-normal">
          <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="realNameKeywordTooltipText">
            <i class="fas fa-question-circle"></i>&nbsp;
          </span>
          <span>真实姓名：</span>
        </label>
        <input v-model="realNameKeyword" type="text" class="form-control" id="realNameKeyword" placeholder="真实姓名关键字">
      </div>
      <button type="button" class="btn btn-success" @click="query">
        <i class="fas fa-search"></i>
        <span>&nbsp;按上述条件筛选</span>
      </button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'users_filter_form',
    data: () => {
      return {
        realNameKeyword: '',
        realNameKeywordTooltipText: '请在这里填写真实姓名中的关键字，留空默认匹配所有真实姓名。',
      };
    },
    methods: {
      processFormData: function () {
        let filterDescription = '';
        if (this.realNameKeyword === '') {
          filterDescription = `"真实姓名关键字：不限"`;
        } else {
          filterDescription = `"真实姓名关键字：${this.realNameKeyword}"`;
        }
        this.$store.dispatch('setUserFilterDescriptionAction', {
          userFilterDescription: filterDescription
        });
        return {
          userRealNameKeyword: this.realNameKeyword,
        };
      },
      // 生成一个对象，包括用户ID与一些检索条件，将该对象保存至vuex
      query: function () {
        const queryObject = this.processFormData();
        this.$store.dispatch('setUserFilterQueryObjectAction', queryObject);
      },
    },
  }
</script>

<style scoped>

</style>