import axios from "axios";

export default ({
    namespaced:  true,
    state: {
        reservations: []
    },

    mutations: {
        SET_RESERVATION (state, reservation) {
            state.reservations =  [...state.reservations, ...reservation];
        },
        REMOVE_RESERVATION (state, id){
            state.reservations = state.reservations.filter((reservation) => reservation.id !== id);
        }
    },

    getters :{
        bookings (state) {
            return state.reservations
        }
    },

    actions: {
        async getReservations({commit}) {
            let response = await axios.get('/reservations.json')

            let res = Object.keys(response.data).map((rKey) => {
                return [...Array(response.data[rKey])].map((i)=>{
                   return ({...i, ...{'id' : rKey}})
                })
            }).reduce((arr, el) => {
                return arr.concat(el)
            }, []);
            commit('SET_RESERVATION', res);
        },

        async saveReservation ({commit}, credentials) {
            let response = await axios.post('/reservations.json', credentials)
            let res = [{...credentials, ...{'id' : response.data.name}}]
            commit('SET_RESERVATION', res);
        },

        async removeReservation({commit}, id){
            await axios.delete(`/reservations/${id}.json`)
            commit('REMOVE_RESERVATION', id)

        }
    }
});