<template>
  <div>
    <button type="button" :class="buttonClass" id="show-modal" @click="showModal = true">
      <slot name="buttonContent"></slot>
    </button>
    <!-- use the modal component, pass in the prop -->

    <transition v-if="showModal" name="modal">
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
                  <button type="button" class="close" @click="cancelOperation()" aria-label="Close">
                    <span>&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  {{message}}
                </div>
                <div class="modal-footer">
                  <slot name="footer">
                    default footer
                    <button type="button" class="btn btn-secondary" @click="cancelOperation()">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="confirmOperation()">Confirm</button>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'confirmationModal',
    components: {

    },
    props: {
      confirmationCallback: {
        type: Function,
        required: true
      },
      message: {
        type: String,
        required: true
      },
      buttonClass: {
        type: String,
        required: true
      },
    },
    data () {
      return {
        confirmationCallback: this.confirmationCallback,
        showModal: false
      }
    },
    methods: {
      confirmOperation () {
        this.confirmationCallback();
      },
      cancelOperation() {
        this.showModal = false
      }
    }
  }
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
