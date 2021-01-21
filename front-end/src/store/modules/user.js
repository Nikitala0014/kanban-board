import axios from 'axios'
import {server} from '@/utils/helper'
import authHeader from '@/services/authHeader'
import initState from '../../services/initState'

initState()

export default {
    state: {
        status: '',
        loading: true
    },
    
    getters: {
        loggedIn: (state) => state.status,
        loading: (state) => state.loading
    },

    actions: {
        async newUser({dispatch}, payloud) {
            await axios.post(`${server.baseUrl}/auth/register`, payloud)
            await dispatch('userLogin', {username: payloud.username, password: payloud.password})
        },

        async userLogin({commit}, payloud) {
            await axios.post(`${server.baseUrl}/auth/login`, payloud).
            then(response => {
                if(response.data.accessToken) {
                    localStorage.setItem('accessTokenWorkSpace', response.data.accessToken)
                }
                return response.data
            }).then(
                user => {
                    commit('LOGIN_SUCCESS')
                    return Promise.resolve(user)
                },
                error => {
                    commit('LOGIN_FAILURE')
                    return Promise.reject(error)
                }
            )
            
        },
        
        async isLogin({commit}) {
            axios.get(`${server.baseUrl}/auth/islogin`, { headers: authHeader() })
            .catch(() => {
                commit('LOGIN_FAILURE');
            })
        },

        async logout({commit}) {
            await localStorage.removeItem('accessTokenWorkSpace')
            await localStorage.removeItem('userIdWorkSpace')
            commit('LOGIN_FAILURE')
        }
    },

    mutations: {
        LOGIN_SUCCESS(state) {
            state.status = true
        },

        LOGIN_FAILURE(state) {
            state.status = false
        },

        INIT_STATE(state, status) {
            state.status = status
            state.loading = false
        }
    }
}