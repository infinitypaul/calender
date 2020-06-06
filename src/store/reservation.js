import axios from "axios";

export default ({
    namespaced:  true,
    state: {
        reservations: []
    },

    mutations: {
        SET_RESERVATION (state, reservation) {
            state.reservations =  [...state.reservations, ...reservation];
            //state.reservations = reservation;
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
            console.log(res)
            commit('SET_RESERVATION', res);
        },

        async saveReservation ({commit}, credentials) {
            //console.log(credentials)
            let response = await axios.post('/reservations.json', credentials)
            let res = [{...credentials, ...{'id' : response.data.name}}]
            console.log(res)
            commit('SET_RESERVATION', res);

        }
    }
});