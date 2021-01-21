import axios from 'axios'
import {server} from '@/utils/helper'
import authHeader from '@/services/authHeader'
import store from '@/store/index'


export default async function initState() {
    await axios.get(`${server.baseUrl}/auth/islogin`, { headers: authHeader() }).then(res => {store.commit('INIT_STATE', res.data)}).catch(() => {
        store.commit('INIT_STATE', false)
    })
}