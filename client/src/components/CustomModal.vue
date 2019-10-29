<template>
  <div class="modal" id="customModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalHeader }}</h5>
          <button type="button" class="close" data-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div>{{ responseMessage }}</div>
        </div>
        <div class="modal-footer">
          <slot name="modal-additional-button"></slot>
          <button type="button" class="btn btn-success" @click="closeModal">
            <i class="fas fa-check"></i>&nbsp;确定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'custom_modal',
    props: {
      responseMessage: {
        type: String,
        required: true,
      },
      modalHeader: {
        type: String,
        required: true,
      },
      modalButtonTarget: {
        type: String,
        required: true,
      },
    },
    methods: {
      closeModal: function () {
        $('#customModal').modal('hide');
        if (this.modalButtonTarget !== 'nowhere') {
          setTimeout(() => {
                this.$router.push({
                  name: this.modalButtonTarget,
                });
              }, 2000
          );
        }
      },
    },
  }
</script>