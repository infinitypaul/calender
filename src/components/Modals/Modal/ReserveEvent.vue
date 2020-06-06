<template>
    <Modal name="reserve">
        <template slot="header"  slot-scope="{ params }">
            {{params.name}}
        </template>
        <template slot="body">
            <form class="text-center border border-light p-5" @submit.prevent="submit">

                <label for="defaultLoginFormEmail"></label>
                <input type="text" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="Title" v-model="title">

                <Datepicker v-model="picker"  :bootstrap-styling="true"  />

                <button class="btn btn-info btn-block my-4" type="submit">Book Date</button>

            </form>
        </template>
    </Modal>
</template>

<script>
    import { mapActions } from 'vuex'
    import Modal from '../Modal'
    import Datepicker from 'vuejs-datepicker';
    import moment from 'moment';
    export default {
        name: "ReserveEvent",
        data(){
            return {
                title:'',
                picker:''
            }
        },
        components:{
            Modal,
            Datepicker
        },
        methods:{
            ...mapActions({
                saveReservation: 'reservation/saveReservation',
            }),
            submit(){
                //const reduceDate = moment(Date.parse(this.picker.toUTCString())).format('YYYY-M-D');
                const processedDate = `${moment(this.picker).get('year')}-${moment(this.picker).get('month')}-${moment(this.picker).get('date')}`;
               let form = {
                    title : this.title,
                    date: processedDate
                }
                this.saveReservation(form)
                this.$modal.hide('reserve')
            }
        }
    }
</script>

<style scoped>

</style>