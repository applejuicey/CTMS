<template>
  <div class="card border-warning shadow">
    <div class="card-header border-warning bg-transparent d-flex">
      <b class="ml-auto">
        {{cardHeaderText}}
      </b>
      <span class="ml-auto" data-toggle="tooltip" data-placement="top" :title="cardTooltipText">
        <i class="fas fa-question-circle"></i>
      </span>
    </div>
    <div class="card-body">
      <slot name="card-body"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bottom_card',
    props: {
      cardHeaderText: {
        type: String,
        required: true,
      },
      cardTooltipText: {
        type: String,
        required: true,
      },
    },
    mounted: function () {
      this.$nextTick(function () {
        $(function () {
          $('[data-toggle="tooltip"]').tooltip();
        })
      })
    },
  }
</script>

<style scoped>
  .shadow {
    box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.1);
  }
</style>