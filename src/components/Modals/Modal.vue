<template>
    <transition name="modal">
    <div v-if="visible">
        <div class="app-modal " @click.prevent="$modal.hide(name)" ></div>
            <div class="app_modal_inner">
                <div class="p-2 mt-2  border-bottom bg-light">
                   <span class="h4 mb-4"><slot name="header" :params="params" /></span>
                    <button type="button" @click.prevent="$modal.hide(name)" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="p-4">
                    <slot name="body" :params="params" />
                </div>

            </div>
    </div>
    </transition>
</template>

<script>
    export default {
        name: "Modal",
        props:{
            name : {
                required: true,
                type: String
            }
        },
        data(){
            return {
                params: {},
                visible: false
            }
        },
        methods:{
            showModal(modal, params){
                if(modal === this.name){

                    this.params = params

                    if(!this.$listeners['before-open']){
                        this.visible = true;
                        return;
                    }
                    this.$emit('before-open', ()=>{
                        this.visible = true;
                    })
                }
            }
        },
        beforeMount() {
            this.$modal.event.$on('show', this.showModal)
            this.$modal.event.$on('hide', (modal)=>{
                if(modal === this.name){
                    this.visible =false
                }
            })
        },
        mounted() {
            document.addEventListener('keydown', (e)=>{
                if(this.visible && e.code === 'Escape'){
                    this.visible = false;
                }
            })
        }
    }
</script>

<style scoped>
    .app-modal {
        background-color: rgba(0, 0, 0, 0.90);
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 9999;
    }

    .app_modal_inner {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        /*padding: 10px;*/
        width: 90%;
        max-width: 500px;
        z-index: 9999;
    }

    .modal-enter-active, .modal-leave-active {
        transition: all 200ms;
    }

    .modal-enter, .modal-leave-active {
        opacity: 0;
    }

</style>