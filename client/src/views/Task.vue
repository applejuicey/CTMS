<template>
  <div class="row" id="task">
    <div class="col-12">
      <div class="row mb-2">
        <div class="col-12">
          <h1>{{currentFunction}}任务：{{$route.params.id}}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-3 mb-2">
          <bottom-card :cardHeaderText="actionSelectBoxHeaderText" :cardTooltipText="actionSelectBoxTooltipText">
            <template v-slot:card-body>
              <div class="list-group list-group-flush" id="list-tab">
                <a class="list-group-item list-group-item-action" data-toggle="list" href="#view">查看</a>
                <a class="list-group-item list-group-item-action" data-toggle="list" href="#edit" v-show="isAdmin">编辑</a>
                <a class="list-group-item list-group-item-action" data-toggle="list" href="#delete" v-show="isAdmin">删除</a>
              </div>
            </template>
          </bottom-card>
        </div>
        <div class="col-xl-9 mb-2">
          <bottom-card :cardHeaderText="actionBoxHeaderText" :cardTooltipText="actionBoxTooltipText">
            <template v-slot:card-body>
              <div class="tab-content">
                <div class="tab-pane fade" id="view">
                  <vertical-header-table :tableData="taskInfo"></vertical-header-table>
                  <file-manage-table :taskID="'TASK001'"></file-manage-table>
                </div>
                <div class="tab-pane fade" id="edit" v-show="isAdmin">
                  <task-edit-form :taskID="'TASK001'"></task-edit-form>
                </div>
                <div class="tab-pane fade" id="delete" v-show="isAdmin">.3..</div>
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
  import VerticalHeaderTable from '@/components/VerticalHeaderTable.vue';
  import FileManageTable from '@/components/FileManageTable.vue';
  import TaskEditForm from '@/components/TaskEditForm.vue';
  export default {
    name: 'task',
    components: {
      BottomCard,
      VerticalHeaderTable,
      FileManageTable,
      TaskEditForm,
    },
    data: () => {
      return {
        currentFunction: '查看',
        actionSelectBoxHeaderText: '操作',
        actionSelectBoxTooltipText: '请在这里选择一种操作。',
        actionBoxHeaderText: '详细信息',
        actionBoxTooltipText: '请在这里完成具体操作。',
        // TODO: 根据taskID，从服务器获取详细信息
        taskInfo: [
          {
            leftCellData: '任务名称',
            rightCellData: '写DMP',
          },
          {
            leftCellData: '隶属于',
            rightCellData: 'EV71-II期',
          },
          {
            leftCellData: '创建者',
            rightCellData: '刘沛',
          },
          {
            leftCellData: '创建时间',
            rightCellData: '2019-08-08',
          },
          {
            leftCellData: '任务描述',
            rightCellData: 'This event fires on tab show, but before the new tab has been shown. Use event.target and event.relatedTarget to target the active tab and the previous active tab (if available) respectively.',
          },
          {
            leftCellData: '接受者',
            rightCellData: '范扬',
          },
          {
            leftCellData: '接受状态',
            rightCellData: '否',
          },
          {
            leftCellData: '截止时间',
            rightCellData: '2019-09-01',
          },
          {
            leftCellData: '任务进度',
            rightCellData: '0',
          },
          {
            leftCellData: '完成状态',
            rightCellData: '否',
          },
          {
            leftCellData: '实际完成时间',
            rightCellData: '',
          },
        ],
      };
    },
    computed: {
      isAdmin: function () {
        return this.$store.state.indicators.isAdmin;
      },
    },
    mounted: function () {
      this.$nextTick(() => {
        $('#list-tab a').on('click', function (e) {
          e.preventDefault();
        });
        if (this.$route.params.function === 'edit') {
          $('#list-tab a[href="#edit"]').tab('show');
          this.currentFunction = '编辑';
        } else if (this.$route.params.function === 'delete') {
          $('#list-tab a[href="#delete"]').tab('show');
          this.currentFunction = '删除';
        } else {
          $('#list-tab a[href="#view"]').tab('show');
          this.currentFunction = '查看';
        }
        $('a[data-toggle="list"]').on('shown.bs.tab', (e) => {
          if (e.target.href.split('#')[1] === 'edit') {
            $('#list-tab a[href="#edit"]').tab('show');
            this.currentFunction = '编辑';
          } else if (e.target.href.split('#')[1] === 'delete') {
            $('#list-tab a[href="#delete"]').tab('show');
            this.currentFunction = '删除';
          } else {
            $('#list-tab a[href="#view"]').tab('show');
            this.currentFunction = '查看';
          }
        })
      });
    },
  }
</script>

<style scoped>

</style>