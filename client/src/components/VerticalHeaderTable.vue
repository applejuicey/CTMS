<template>
  <div class="text-left list-card">
    <table class="table table-borderless table-sm mb-0">
      <tbody>
        <template v-for="(row, index) in tableData">
          <tr>
            <td class="table-left-column">{{row.leftCellData}}：</td>
            <td class="table-right-column">{{row.rightCellData}}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'vertical_header_table',
    props: {
      tableData: {
        type: Array,
        required: true,
      },
    },
    mounted: function () {
      this.$nextTick(function () {

      })
    },
  }
</script>

<style scoped>
  .list-card {
    padding: 1.25rem;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    border: 1px solid #eee;
    border-radius: .25rem;
    border-left-width: .25rem;
    /*border-left-color: #28a745;*/
  }
  .table-left-column {
    font-weight: 400;
    text-align: right;
  }
  .table-right-column {
    text-align: left;
  }
  @media screen and (max-width: 540px) {
    .table-left-column {
      width: 55%;
    }
    .table-right-column {
      width: 40%;
    }
  }
  @media screen and (min-width: 540px) and (max-width: 1140px) {
    .table-left-column {
      width: 25%;
    }
    .table-right-column {
      width: 75%;
    }
  }
  @media screen and (min-width: 1140px) {
    .table-left-column {
      width: 20%;
    }
    .table-right-column {
      width: 80%;
    }
  }
</style>