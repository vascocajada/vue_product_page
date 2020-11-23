<template>
    <div>
        <div class="row mb-3">
            <div
                v-if="windowWidth > 991"
                class="col-md-7 mt-4 top-panel-text"
            >
                {{ (page-1) *limit +1 }}-{{ Math.min((limit *page), count) }} {{ 'de'|trans }} {{ count }} {{ 'resultados'|trans }}
            </div>
            <div
                class="col-md-5"
            >
                <SortSelect />
            </div>
            <div
                v-if="windowWidth < 992"
                class="col-md-7 mt-4 top-panel-text"
            >
                {{ (page-1) *limit +1 }}-{{ Math.min((limit *page), count) }} {{ 'de'|trans }} {{ count }} {{ 'resultados'|trans }}
            </div>
        </div>
    </div>
</template>


<script>

import SortSelect from './SortSelect.vue'

export default {
    components: {
        SortSelect
    },
    computed: {
        sort: {
            get() {
                return this.$store.state.filters.sort
            },
            set(val) {
                this.$store.dispatch('filters/updateFilter', {
                    mutation: 'setSort',
                    selection: val
                })
            }
        },
        page() {
            return this.$store.state.filters.page
        },
        limit() {
            return this.$store.state.filters.limit
        },
        count() {
            return this.$store.state.articles.count
        },
        windowWidth() {
            return this.$store.state.windowWidth
        },
    }
}
</script>

<style>
.top-panel-text {
    color: rgba(0,0,0,.54);
}
</style>

