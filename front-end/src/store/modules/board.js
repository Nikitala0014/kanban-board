import axios from 'axios'
import {server} from '@/utils/helper'
import authHeader from '@/services/authHeader'

export default {
    state: {
        cards: [],
        tasks: []
    },

    getters: {
        allCards: (state) => state.cards,
        getTasks: state => idRoot => {
            function compare(a, b) {
                if (a.weight > b.weight) return -1;
                if (a.weight === b.weight) return 0;
                if (a.weight < b.weight) return 1;
            }
            const tasks = state.tasks.filter(task => task.idRoot === idRoot)
            tasks.sort(compare)

            return tasks
        }
    },

    actions: {
        getCards({commit}) {
            axios.get(`${server.baseUrl}/board`, { headers: authHeader() }).then(response => {
                commit('SET_CARDS', response.data)
            })
        },

        async addCard({commit}, payload) {
            await axios.post(`${server.baseUrl}/board`, payload, { headers: authHeader() })
            commit('SAVE_CARD', payload)
        },

        async updateCard({commit}, payloud) {
            await axios.put(`${server.baseUrl}/board/update/${payloud.id}/${payloud.name}`)
            commit('UPDATE_CARD', payloud)
        },

        async deleteCard({commit}, id) {
            await axios.delete(`${server.baseUrl}/board/delete/${id}`, { headers: authHeader() })
            commit('DELETE_CARD', id)
        },

        getTasks({commit}) {
            axios.get(`${server.baseUrl}/tasks`, { headers: authHeader() }).then(response => {
                commit('SET_TASKS', response.data)
            })
        },

        async addTask({commit}, payload) {
            await axios.post(`${server.baseUrl}/tasks`, payload, { headers: authHeader() })
            commit('SAVE_TASK', payload)
        },

        async removeTask({commit}, id) {
            await axios.delete(`${server.baseUrl}/tasks/delete/${id}`, { headers: authHeader() })
            commit('DELETE_TASK', id)
        },

        async editTask({commit}, payloud) {
            await axios.put(`${server.baseUrl}/tasks/update/${payloud.id}/${payloud.task}`)
            commit('UPDATE_TASK', payloud)
        },

        async dragnDrop({commit}, payloud) {
            console.log('payloud', payloud);
            if(payloud.idCurrent === 0) {
                commit('TASK_TO_EMPTY', {idRoot: payloud.idRoot, idTask: payloud.idTask})
            }
            await axios.put(`${server.baseUrl}/tasks/dragndrop`, payloud)
        }
    },

    mutations: {
        SET_CARDS(state, cards) {
            state.cards = cards
        },

        SAVE_CARD(state, card) {
            state.cards.push(card)
        },

        SET_TASKS(state, tasks) {
            state.tasks = tasks
        },

        SAVE_TASK(state, task) {
            state.tasks.push(task)
        },

        DELETE_TASK(state, id) {
            const taskToDelete = state.tasks.findIndex(task => task.id === id)
            state.tasks.splice(taskToDelete, 1)
        },

        UPDATE_TASK(state, payloud) {
            const taskToUpdate = state.tasks.findIndex(task => task.id === payloud.id)
            state.tasks[taskToUpdate].task = payloud.task
        },

        UPDATE_CARD(state, payloud) {
            const cardUpdateId = state.cards.findIndex(card => card.id === payloud.id)
            state.cards[cardUpdateId].name = payloud.name    
        },

        DELETE_CARD(state, id) {
            const cardToDelete = state.cards.findIndex(card => card.id === id)
            state.cards.splice(cardToDelete, 1)            
        },
        TASK_TO_EMPTY(state, payloud) {
            const task = state.tasks.findIndex(task => task.id === payloud.idTask)
            state.tasks[task].idRoot = payloud.idRoot
        }
    }
}