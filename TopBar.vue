<template>
    <div>
        <div
            v-if="false"
            class="search-top-bar"
        >
            <div class="page-wrapper">
                <div class="row">
                    <div
                        v-if="windowWidth > 991"
                        class="col-xs-3"
                    >
                        <div class="search-title">
                            {{ "Resultados"|trans }}
                        </div>
                    </div>
                    <div class="col-md-9 col-xs-9">
                        <VTextField
                            v-if="false"
                            ref="search"
                            v-model="queryString"
                            class="mt-0 pt-0 search-field"
                            background-color="#fff"
                            prepend-inner-icon="fa fa-search"
                            color="config.brand_primary"
                            autofocus
                            solo
                            flat
                            height="33"
                            type="search"
                            :placeholder="'Procurar'|trans"
                            @keyup.enter="blurSearch"
                        />
                    </div>
                    <div
                        v-if="windowWidth < 992"
                        class="col-xs-3"
                    >
                        <div
                            class="filters-button"
                            @click="toggleFilters"
                        >
                            {{ 'Filtros'|trans }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <VBtn
            v-if="windowWidth < 768"
            :color="config.brand_primary"
            class="filter-button-mobile"
            @click="toggleFilters"
        >
            {{ 'Filtros'|trans }}
        </VBtn>
    </div>
</template>

<script>

import debounce from 'lodash/debounce'

export default {
    computed: {
        queryString: {
            get() {
                return this.$store.state.filters.queryString
            },
            set(val) {
                this.updateQueryString(val)
            }
        },
        windowWidth() {
            return this.$store.state.windowWidth
        }
    },
    created() {
        this.updateQueryString = debounce(this.updateQueryString, 100)
    },
    methods: {
        updateQueryString(val) {
            this.$store.dispatch('filters/updateFilter', {
                mutation: 'setQueryString',
                selection: val
            })
        },
        toggleFilters() {
            this.$store.commit('toggleFilters')
        },
        blurSearch() {
            this.$refs.search.blur()
        }
    }
}
</script>

<style>
.search-field .v-input__slot {
    border-radius: 3px;
    padding: 0 8px;
}
.v-text-field.v-text-field--solo.search-field .v-input__control {
    height: 33px;
    min-height: unset;
}
.search-field .v-text-field__slot {
    padding-left: 15px;
}
.filters-button {
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    color: #fff;
    border-left: 1px solid #fff;
    margin-top: 6px;
    padding-left: 10px;
}
.filter-button-mobile {
    margin-top: 60px;
    color: #fff !important;
}
</style>
