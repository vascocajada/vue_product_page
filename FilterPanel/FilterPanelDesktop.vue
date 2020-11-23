<template>
    <VExpansionPanel
        v-if="windowWidth > 767"
        v-model="panel"
        expand
    >
        <div
            v-if="categoryId != 0"
            class="filter-panel-desktop-cont"
        >
            <div
                v-if="hasSelection"
                class="clear-filters mt-2 mb-1 mr-4"
                :style="{color: config.brand_primary}"
                @click="clearFilters"
            >
                {{ 'Limpar todos'|trans }}
            </div>
            <div class="filter-group-list">
                <FilterGroup
                    v-for="filterData in filtersData"
                    :key="filterData.key"
                    :filter-data="filterData"
                />
            </div>
        </div>
        <FilterCategories
            v-if="categoryId == 0"
        />
    </VExpansionPanel>
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
        categoryId() {
            return this.$store.state.filters.categoryId
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
        }
    }
}

</script>

<style>
.filter-panel-desktop-cont {
    width: 100%;
}
</style>
