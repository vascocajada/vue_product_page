<template>
    <div class="outer-wrapper">
        <div
            v-if="!firstRequest"
            class="home-content results-content page-wrapper"
        >
            <div class="row">
                <div class="col-md-12">
                    <BreadCrumb />
                </div>
                <div
                    class="col-md-3"
                >
                    <FilterPanel />
                </div>
                <div
                    class="col-md-9"
                >
                    <div
                        class="row"
                    >
                        <TopPanel />
                        <ArticleList />
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="firstRequest"
            class="pt-5 loader-container"
        >
            <PulseLoader
                :color="config.brand_primary"
                :loading="firstRequest"
            />
        </div>
    </div>
</template>

<script>

import ArticleList from './ArticleList/ArticleList.vue'
import TopPanel    from './TopPanel/TopPanel.vue'
import FilterPanel from './FilterPanel/FilterPanel.vue'
import BreadCrumb  from './BreadCrumb.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import debounce    from 'lodash/debounce'

export default {
    components: {
        ArticleList,
        TopPanel,
        FilterPanel,
        BreadCrumb,
        PulseLoader
    },
    computed: {
        firstRequest() {
            return this.$store.state.firstRequest
        },
        toggleFilters() {
            return this.$store.state.toggleFilters
        },
        windowWidth() {
            return this.$store.state.windowWidth
        }
    },
    // Handle search bar outside of Vue
    mounted() {
        document.getElementById('search-top-form').addEventListener('submit', e => {
            this.$store.dispatch('filters/updateFilter', {
                mutation: 'setQueryString',
                selection: document.getElementById('search-top').value
            })
            e.preventDefault()
        })
        document.getElementById('search-top').addEventListener('keyup', e => {
            this.updateQueryString(document.getElementById('search-top').value)
            e.preventDefault()
        })
    },
    created() {
        this.updateQueryString = debounce(this.updateQueryString, 300)
    },
    methods: {
        updateQueryString(val) {
            this.$store.dispatch('filters/updateFilter', {
                mutation: 'setQueryString',
                selection: val
            })
        }
    }
}

</script>

<style>
.pagination-cont {
    text-align: center;
}
.outer-wrapper {
    margin-top: 90px;
    width: 100%;
}
.loader-container {
    text-align: center;
}
/*.v-pagination__item, .v-pagination__navigation {
    box-shadow: none !important;
    border: 1px solid #ccc;
}*/
@media only screen and (max-width: 767px) {
    .outer-wrapper {
        margin-top: 10px;
    }
}
</style>
