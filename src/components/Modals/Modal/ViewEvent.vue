<template>
    <Modal name="viewEvent" @before-open="viewEvent">
        <template slot="header"  slot-scope="{ params }">
            {{params.name}}
        </template>
        <template slot="body">
            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center" v-for="Event in Events" :key="Event.id" >
                    {{Event.title}}
                    <span @click="DeleteEvent(Event.id)" class="badge badge-danger badge-pill remove">Remove Event</span>
                </li>
            </ul>
        </template>
    </Modal>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import Modal from '../Modal'
    export default {
        name: "ViewEvent",
        props: {
            currentDate: {
                type: Object,
                require: true
            }
        },
        data(){
            return {
                Events: []
            }
        },
        components:{
            Modal
        },
        computed:{
            ...mapGetters({
                bookings : 'reservation/bookings'
            })
        },
        methods:{
            ...mapActions({
                removeReservation: 'reservation/removeReservation',
            }),
            viewEvent(done){
                const EventDate = `${this.currentDate.year}-${this.currentDate.month}-${this.currentDate.date}`;
                const Events = this.bookings.filter((booking) => booking.date === EventDate )
                if(Events.length){
                    this.Events = Events
                    done();
                }
            },
            async DeleteEvent(id){
                await this.removeReservation(id)
                this.viewEvent(()=>{})

            }
        }
    }
</script>

<style scoped>
    .remove {
        cursor: pointer;
    }
</style>