<template>
  <div class="list-card">
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
    <div class="row" v-else-if="statusObject.statusIndicator === 'loaded'">
      <div class="col-12">
        <form>
          <div class="form-group text-left">
            <label for="projectName" class="font-weight-normal">
              <span>项目名称：</span>
            </label>
            <input v-model="formValues.projectName" type="text" class="form-control" id="projectName" placeholder="项目名称">
          </div>
          <div class="form-group text-left">
            <label for="projectBriefIntroduction" class="font-weight-normal">
              <span>项目简要描述：</span>
            </label>
            <textarea class="form-control" id="projectBriefIntroduction" rows="5" v-model="formValues.projectBriefIntroduction" placeholder="项目简要描述"></textarea>
          </div>
          <div class="form-group text-left">
            <label for="projectExpectedStartTime" class="font-weight-normal">
              <span>预计开始时间：</span>
            </label>
            <input v-model="formValues.projectExpectedStartTime" type="date" class="form-control" id="projectExpectedStartTime" placeholder="预计开始时间">
          </div>
          <div class="form-group text-left" v-if="this.$route.path.split('/')[2] !== 'create'">
            <label for="projectActualStartTime" class="font-weight-normal">
              <span>实际开始时间：</span>
            </label>
            <input v-model="formValues.projectActualStartTime" type="date" class="form-control" id="projectActualStartTime" placeholder="实际开始时间">
          </div>
          <div class="form-group text-left">
            <label for="projectExpectedEndTime" class="font-weight-normal">
              <span>预计结束时间：</span>
            </label>
            <input v-model="formValues.projectExpectedEndTime" type="date" class="form-control" id="projectExpectedEndTime" placeholder="预计结束时间">
          </div>
          <div class="form-group text-left" v-if="this.$route.path.split('/')[2] !== 'create'">
            <label for="projectActualEndTime" class="font-weight-normal">
              <span>实际结束时间：</span>
            </label>
            <input v-model="formValues.projectActualEndTime" type="date" class="form-control" id="projectActualEndTime" placeholder="实际结束时间">
          </div>
          <div class="form-group text-left">
            <label for="projectSponsor" class="font-weight-normal">
              <span>申办方：</span>
            </label>
            <input v-model="formValues.projectSponsor" type="text" class="form-control" id="projectSponsor" placeholder="申办方">
          </div>
          <div class="form-group text-left">
            <label for="projectInvestigator" class="font-weight-normal">
              <span>研究方：</span>
            </label>
            <input v-model="formValues.projectInvestigator" type="text" class="form-control" id="projectInvestigator" placeholder="研究方">
          </div>
          <div class="form-group text-left">
            <label for="projectMonitor" class="font-weight-normal">
              <span>监查方：</span>
            </label>
            <input v-model="formValues.projectMonitor" type="text" class="form-control" id="projectMonitor" placeholder="监查方">
          </div>
          <div class="form-group text-left">
            <label for="projectStatistician" class="font-weight-normal">
              <span>统计方：</span>
            </label>
            <input v-model="formValues.projectStatistician" type="text" class="form-control" id="projectStatistician" placeholder="统计方">
          </div>
          <div class="form-group text-left">
            <label class="font-weight-normal">
              <span>项目当前阶段：</span>
            </label>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="projectStage1" value="1" v-model="formValues.projectStage">
              <label class="form-check-label" for="projectStage1">
                准备阶段
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="projectStage2" value="2" v-model="formValues.projectStage">
              <label class="form-check-label" for="projectStage2">
                进行阶段
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="projectStage3" value="3" v-model="formValues.projectStage">
              <label class="form-check-label" for="projectStage3">
                收尾阶段
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="projectStage4" value="4" v-model="formValues.projectStage">
              <label class="form-check-label" for="projectStage4">
                发补阶段
              </label>
            </div>
          </div>
          <div class="form-group text-left" v-if="isAdmin">
            <label for="projectComment1" class="font-weight-normal">
              <span>项目备注1：</span>
            </label>
            <textarea class="form-control" id="projectComment1" rows="5" v-model="formValues.projectComment1" placeholder="项目备注1"></textarea>
          </div>
          <div class="form-group text-left" v-if="isAdmin">
            <label for="projectComment2" class="font-weight-normal">
              <span>项目备注2：</span>
            </label>
            <textarea class="form-control" id="projectComment2" rows="5" v-model="formValues.projectComment2" placeholder="项目备注2"></textarea>
          </div>
          <div class="form-group text-left" v-if="isAdmin">
            <label for="projectComment3" class="font-weight-normal">
              <span>项目备注3：</span>
            </label>
            <textarea class="form-control" id="projectComment3" rows="5" v-model="formValues.projectComment3" placeholder="项目备注3"></textarea>
          </div>
          <div class="form-group text-left" v-if="isAdmin">
            <label for="projectComment4" class="font-weight-normal">
              <span>项目备注4：</span>
            </label>
            <textarea class="form-control" id="projectComment4" rows="5" v-model="formValues.projectComment4" placeholder="项目备注4"></textarea>
          </div>
          <button type="button" class="btn btn-success" @click="submit" :disabled="submitLoading">
            <i class="fas fa-check"></i>&nbsp;提交
          </button>
        </form>
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
    <custom-modal :modalHeader="modalHeader" :responseMessage="responseMessage" :modalButtonTarget="modalButtonTarget"></custom-modal>
  </div>
</template>

<script>
  import CustomModal from '@/components/CustomModal.vue';
  export default {
    name: 'project_edit_form',
    components: {
      CustomModal,
    },
    props: {
      projectInfoObject: {
        type: Object,
        required: true,
      },
      statusObject: {
        type: Object,
        required: true,
      },
    },
    data: () => {
      return {
        formValues: {},
        submitLoading: false,
        modalHeader: '',
        responseMessage: '',
        modalButtonTarget: 'nowhere',
      };
    },
    computed: {
      isAdmin: function () {
        return JSON.parse(localStorage.getItem('userInfo')).isAdmin;
      },
    },
    watch: {
      projectInfoObject: {
        handler: function (newVal, oldVal) {
          this.formValues = {
            projectID: newVal.projectID,
            projectName: newVal.projectName,
            projectBriefIntroduction: newVal.projectBriefIntroduction,
            projectExpectedStartTime: this.formatDate(newVal.projectExpectedStartTime),
            projectExpectedEndTime: this.formatDate(newVal.projectExpectedEndTime),
            projectSponsor: newVal.projectSponsor,
            projectInvestigator: newVal.projectInvestigator,
            projectMonitor: newVal.projectMonitor,
            projectStatistician: newVal.projectStatistician,
            projectStage: newVal.projectStage,
            projectActualStartTime: this.formatDate(newVal.projectActualStartTime),
            projectActualEndTime: this.formatDate(newVal.projectActualEndTime),
            projectComment1: newVal.projectComment1,
            projectComment2: newVal.projectComment2,
            projectComment3: newVal.projectComment3,
            projectComment4: newVal.projectComment4,
          };
        },
        deep: true,
      },
    },
    created: function () {
      this.formValues = {
        projectID: this.projectInfoObject.projectID || '',
        projectName: this.projectInfoObject.projectName || '',
        projectBriefIntroduction: this.projectInfoObject.projectBriefIntroduction || '',
        projectExpectedStartTime: this.formatDate(this.projectInfoObject.projectExpectedStartTime || new Date()),
        projectExpectedEndTime: this.formatDate(this.projectInfoObject.projectExpectedEndTime || new Date()),
        projectSponsor: this.projectInfoObject.projectSponsor || '',
        projectInvestigator: this.projectInfoObject.projectInvestigator || '',
        projectMonitor: this.projectInfoObject.projectMonitor || '',
        projectStatistician: this.projectInfoObject.projectStatistician || '',
        projectStage: this.projectInfoObject.projectStage || '1',
        projectActualStartTime: this.formatDate(this.projectInfoObject.projectActualStartTime || new Date()),
        projectActualEndTime: this.formatDate(this.projectInfoObject.projectActualEndTime || new Date()),
        projectComment1: this.projectInfoObject.projectComment1,
        projectComment2: this.projectInfoObject.projectComment2,
        projectComment3: this.projectInfoObject.projectComment3,
        projectComment4: this.projectInfoObject.projectComment4,
      };
    },
    methods: {
      formatDate: function (dateString) {
        const parsedDate = new Date(Date.parse(dateString));
        const year = parsedDate.getFullYear();
        let month = parsedDate.getMonth() + 1;
        month = month < 10 ? ('0' + month) : month;
        let date = parsedDate.getDate();
        date = date < 10 ? ('0' + date) : date;
        return `${year}-${month}-${date}`;
      },
      submit: function () {
        const submitInfo = {
          projectID: this.formValues.projectID,
          projectName: this.formValues.projectName,
          projectBriefIntroduction: this.formValues.projectBriefIntroduction,
          projectExpectedStartTime: this.formValues.projectExpectedStartTime,
          projectExpectedEndTime: this.formValues.projectExpectedEndTime,
          projectSponsor: this.formValues.projectSponsor,
          projectInvestigator: this.formValues.projectInvestigator,
          projectMonitor: this.formValues.projectMonitor,
          projectStatistician: this.formValues.projectStatistician,
          projectStage: this.formValues.projectStage,
          projectActualStartTime: this.formValues.projectActualStartTime,
          projectActualEndTime: this.formValues.projectActualEndTime,
          projectComment1: this.formValues.projectComment1,
          projectComment2: this.formValues.projectComment2,
          projectComment3: this.formValues.projectComment3,
          projectComment4: this.formValues.projectComment4,
        };
        this.submitLoading = true;
        const axiosMethod = this.$route.path.split('/')[2] === 'create'? 'post' : 'put';
        this.$axios({
          method: axiosMethod,
          url: '/project',
          data: submitInfo
        }).then((response) => {
          if (response.data.statusCode === '1') {
            this.modalHeader = '提示';
            this.responseMessage = '操作成功！';
            this.modalButtonTarget = 'projects';
          } else if (response.data.statusCode === '0') {
            console.error('ProjectEditForm操作失败，错误：', response.data.error.message);
            this.modalHeader = '错误';
            this.responseMessage = `操作失败！原因：${response.data.error.message}`;
            this.modalButtonTarget = 'nowhere';
          } else {
            throw new Error('CLIENT未知错误');
          }
        }).catch((error) => {
          console.error('ProjectEditForm操作失败，错误：', error);
          this.modalHeader = '错误';
          this.responseMessage = `操作失败！原因：${error}`;
          this.modalButtonTarget = 'nowhere';
        }).finally(() => {
          this.submitLoading = false;
          $('#customModal').modal('show');
        });
      },
    },
  }
</script>