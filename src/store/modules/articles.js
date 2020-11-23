import Vue from "vue";

export default {
    namespaced: true,
    state: {
        data: [],
        options: [],
        count: 0
    },
    mutations: {
        setData(state, data) {
            state.data = data;
        },
        setCount(state, count) {
            state.count = count
        },
        deselectOption(state, optionId) {
            if (typeof state.options[optionId].selected === 'undefined') Vue.set(state.options[optionId], 'selected', false)
            else state.options[optionId].selected = false
        },
        selectOption(state, optionId) {
            if (typeof state.options[optionId].selected === 'undefined') Vue.set(state.options[optionId], 'selected', true)
            else state.options[optionId].selected = true
        }
    }
}
