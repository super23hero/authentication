<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    <slot name="header">
                    default header
                  </slot></h5>
                  <button type="button" class="close" @click="$emit('close')" aria-label="Close">
                    <span>&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <slot name="body">
                    default body
                  </slot>
                </div>
                <div class="modal-footer">
                  <slot name="footer">
                    default footer
                    <button type="button" class="btn btn-secondary" @click="$emit('close')">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                  </slot>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

</script>

<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
