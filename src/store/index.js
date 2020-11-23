import Vue  from 'vue'
import Vuex from 'vuex'

import filters  from './modules/filters'
import articles from './modules/articles'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        ajaxPending: false,
        firstRequest: true,
        toggleFilters: false,
        windowWidth: 992
    },
    modules: {
        filters,
        articles
    },
    mutations: {
        setAjaxPending(state, ajaxPending) {
            state.ajaxPending = ajaxPending
        },
        setFirstRequest(state, firstRequest) {
            state.firstRequest = firstRequest
        },
        setWindowWidth(state, windowWidth) {
            state.windowWidth = windowWidth
        },
        toggleFilters(state) {
            state.toggleFilters = !state.toggleFilters
        },
        setToggleFilters(state, toggleFilters) {
            state.toggleFilters = toggleFilters
        }
    },
    actions: {
        getData({state, commit}) {
            commit('setAjaxPending', true)

            var url = '/api/articles'

            url += '?facet_min_count=1'

            url += '&query_string='+state.filters.queryString

            url += '&price_min=' + state.filters.priceMinSelected
            url += '&price_max=' + state.filters.priceMaxSelected

            url += '&sort=' + state.filters.sort
            url += '&page=' + state.filters.page

            url += '&category_id=' + state.filters.categoryId

            url += (Object.keys(state.filters.selections).length ? '&' : '') +
                Object.keys(state.filters.selections).map((key) =>
                    key + '=' + state.filters.selections[key].join(';')
                ).join('&')

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    commit('filters/setData', data.filters)
                    commit('articles/setData', data.articles)
                    commit('setAjaxPending', false)
                    commit('setFirstRequest', false)
                    commit('articles/setCount', data.count)
                })
                //.catch(err => console.error(err));
        }
    }
})
