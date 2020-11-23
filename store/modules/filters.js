import Vue from "vue";

export default {
    namespaced: true,
    state: {
        data: [],
        selections: {},
        priceMinSelected: '5',
        priceMaxSelected: '900',
        priceRange: '',
        queryString: '',
        sort: 'translated_price_min:asc',
        categoryId: 0,
        categoryTitle: '',
        page: 1,
        limit: 21,
        panel: [],
        hasSelection: false
    },
    mutations: {
        setInitialData(state, data) {
            state.data = data
            state.panel = [...Object.keys(state.data)].map(() => true)
        },
        setData(state, data) {
            for (const filter in state.data) {
                if (filter === 'price') continue
                if (typeof data[filter].options === 'undefined') {
                    data[filter].options = state.data[filter].options.map(option => {
                        option.count = 0
                        return option
                    })
                    continue;
                }
                for (const option in state.data[filter].options) {
                    if (typeof data[filter].options[option] === 'undefined') {
                        data[filter].options[option] = state.data[filter].options[option]
                        data[filter].options[option].count = 0
                    }
                }
            }
            state.data = data
        },
        addSelection(state, selection) {
            if (typeof state.selections[selection.key] === 'undefined') Vue.set(state.selections, selection.key, [])
            state.selections[selection.key].push(selection.value)
        },
        removeSelection(state, selection) {
            state.selections[selection.key].splice(state.selections[selection.key].indexOf(selection.value), 1)
        },
        setPrice(state, price) {
            if (price[0] !== null) state.priceMinSelected = price[0]
            if (price[1] !== null) state.priceMaxSelected = price[1]
        },
        setPriceRange(state, priceRange) {
            state.priceRange = priceRange
        },
        setCategoryId(state, categoryId) {
            state.categoryId = categoryId
        },
        setCategoryTitle(state, categoryTitle) {
            state.categoryTitle = categoryTitle
        },
        setQueryString(state, queryString) {
            if (queryString !== '') state.hasSelection = true
            state.queryString = queryString.replace('_', ' ').replace(';', ',')
            //document.getElementById('search-top').value = state.queryString
        },
        setSort(state, sort) {
            state.sort = sort
        },
        setPage(state, page) {
            state.page = page
        },
        clearFilters(state) {
            for (const key in state.selections) {
                state.selections[key] = []
            }

            state.priceMinSelected = '5'
            state.priceMaxSelected = '900'
            state.priceRange= ''
            state.queryString = ''

            document.getElementById('search-top').value = state.queryString
            state.hasSelection = false
        },
        setPanel(state, panel) {
            state.panel = panel;
        },
        setHasSelection(state, hasSelection) {
            state.hasSelection = hasSelection;
        },
        parseUrl(state) {
            let filterString = window.location.href.split('?')[0].split('/')[5]
            if (typeof filterString === 'undefined') return

            state.hasSelection = true // TODO see if selections not defaults

            filterString.split(';').forEach(filterGroup => {
                let filterGroupSplit= filterGroup.split('-')
                let filterName = filterGroupSplit[0]
                let filterContent = filterGroup.slice(filterName.length +1)

                if (filterName === 'c') {
                    // Do not use category title from URL. It may come wrongly translated.
                    // state.categoryTitle = decodeURIComponent(filterContent)
                    return;
                }
                if (filterName === 'price') {
                    state.priceMinSelected = filterGroupSplit[1]
                    state.priceMaxSelected = filterGroupSplit[2]
                    return;
                }
                if (filterName === 'q') {
                    state.queryString = decodeURIComponent(filterContent)
                    document.getElementById('search-top').value = state.queryString
                    return;
                }
                if (filterName === 'sort') {
                    if (decodeURIComponent(filterContent) !== '') state.sort = decodeURIComponent(filterContent)
                    return;
                }
                if (filterName === 'page') {
                    state.page = parseInt(filterContent)
                    return;
                }

                filterContent.split('_').forEach(filterItem => {
                    if (typeof state.selections[filterName] === 'undefined') Vue.set(state.selections, filterName, [])
                    state.selections[filterName].push(decodeURIComponent(filterItem))
                })
            })
        },
        // filterName-filterContent;filterName-filterContent-moreContent-ofSame%20Filter;filterName-filterContentOne_filterContentTwo_filter%20content-three
        // TODO put this in a better place
        buildUrl(state) {
            let urlSplit = window.location.href.split('?')[0].split('/')
            urlSplit.splice(5, 1)
            let url = urlSplit.join('/')

            url += '/c-' + state.categoryTitle + ';price-' + state.priceMinSelected + '-' + state.priceMaxSelected
            if (state.queryString) url += ';' + 'q-' + state.queryString
            if (state.sort) url += ';' + 'sort-' + state.sort
            if (state.page) url += ';' + 'page-' + state.page
            if (Object.keys(state.selections).length) {
                url += Object.entries(state.selections).reduce((selectionsString, selection) => {
                    if (selection[1].length > 0) {
                        selectionsString += ';' + selection[0] + '-'
                    }
                    selectionsString += selection[1].join('_')

                    return selectionsString
                }, '')
            }

            window.history.replaceState({}, '', url)
        }
    },
    actions: {
        updateFilter({commit, dispatch}, payload) {
            if (payload.mutation !== 'setPage') commit('setPage', 1) // if changing filters or sort always force page to first

            commit('setHasSelection', true)
            commit(payload.mutation, payload.selection)
            commit('buildUrl')
            dispatch('getData', null, {root: true})
        },
        getInitialData({commit, dispatch}, payload) {
            var url = '/api/articles'

            // get all facets to set structure. Filter by locale and category only
            url += '?limit=0&facet_min_count=1&category_id=' + payload.category_id

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    commit('setInitialData', data.filters)

                    // add selections from url params
                    for (const key in payload.selections) {
                        if (!payload.selections[key]) continue
                        if (key === 'price') {
                            const price_split = payload.selections[key].split('-')
                            commit('setPrice', price_split)
                        }
                        commit('addSelection', {key: key, value: payload.selections[key]})
                    }
                    commit('setCategoryId', payload.category_id)
                    commit('setCategoryTitle', payload.category_title)
                    commit('setQueryString', payload.query_string)
                    if (payload.sort != '') commit('setSort', payload.sort)

                    commit('parseUrl')
                    commit('buildUrl')
                    dispatch('getData', null, {root: true})
                })
                //.catch(err => console.error(err));
            //
        }
    }
}
