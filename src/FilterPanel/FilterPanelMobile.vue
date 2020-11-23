<template>
    <VNavigationDrawer
        v-if="windowWidth < 768"
        v-model="toggleFilters"
        class="filter-panel-mobile"
        height="100vh"
        :width="filterPanelWidth"
        temporary
        absolute
        right
    >
        <VExpansionPanel
            v-model="panel"
            class="expansion-panel-filters-mobile"
            expand
        >
            <div class="row">
                <div class="col-xs-6">
                    <div
                        class="close-filters mt-2 mb-1 ml-2"
                        :style="{color: config.brand_primary}"
                        @click="closeFilters"
                    >
                        {{ 'Fechar'|trans }}
                    </div>
                </div>
                <div class="col-xs-6">
                    <div
                        v-if="hasSelection"
                        class="clear-filters mt-2 mb-1 mr-2"
                        :style="{color: config.brand_primary}"
                        @click="clearFilters"
                    >
                        {{ 'Limpar Todos'|trans }}
                    </div>
                </div>
            </div>
            <div
                v-if="categoryId != 0"
                class="filter-group-list"
            >
                <FilterGroup
                    v-for="filterData in filtersData"
                    :key="filterData.key"
                    :filter-data="filterData"
                />
            </div>
            <FilterCategories
                v-if="categoryId == 0"
            />
        </VExpansionPanel>
    </VNavigationDrawer>
</template>

<script>

import FilterGroup      from './FilterGroup.vue'
import FilterCategories from './FilterCategories.vue'

export default {
    components: {
        FilterGroup,
        FilterCategories
    },
    computed: {
        panel: {
            get() {
                return this.$store.state.filters.panel
            },
            set(val) {
                this.$store.commit('filters/setPanel', val)
            }
        },
        filtersData() {
            return this.$store.state.filters.data
        },
        windowWidth() {
            return this.$store.state.windowWidth
        },
        toggleFilters: {
            get() {
                return this.$store.state.toggleFilters
            },
            set(val) {
                this.$store.commit('setToggleFilters', val)
            }
        },
        filterPanelWidth() {
            return this.windowWidth - (0.15 *this.windowWidth)
        },
        categoryId() {
            return this.$store.state.filters.categoryId
        },
        queryString() {
            return this.$store.state.filters.queryString
        },
        hasSelection() {
            return this.$store.state.filters.hasSelection
        }
    },
    methods: {
        clearFilters() {
            this.$store.dispatch('filters/updateFilter', {
                mutation: 'clearFilters',
                selection: null
            })
            this.closeFilters()
        },
        closeFilters() {
            this.$store.commit('setToggleFilters', false)
        }
    }
}

</script>
