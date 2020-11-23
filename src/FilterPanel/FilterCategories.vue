<template>
    <div
        v-if="categoryId === 0"
        class="category-filters"
    >
        <div
            v-for="category in filtersData.categories.options"
            :key="category.label"
            class="category-link-cont"
        >
            <div
                :class="`category-link ${parseInt(category.count) > 0 ? '' : 'disabled'}`"
                @click="goToCategoryPage(category.id, queryString, category.count)"
            >
                <VIcon class="chevron-category-title">
                    chevron_right
                </VIcon>
                {{ category.label }}
                <span class="filter-count ml-1">({{ category.count }})</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    computed: {
        filtersData() {
            return this.$store.state.filters.data
        },
        categoryId() {
            return this.$store.state.filters.categoryId
        },
        queryString() {
            return this.$store.state.filters.queryString
        }
    },
    methods: {
        goToCategoryPage(category_id, queryString, category_count) {
            if (category_count) window.location = `/resultados/${category_id}/q-${queryString}`
        }
    }
}

</script>

<style>
.category-filters {
    width: 100%;
    padding: 12px 24px;
}
.category-link-cont {
    text-align: left;
    width: 100%;
    padding: 8px 0;
}
.category-link {
    color: rgba(0,0,0,0.54);
    font-weight: 600;
    font-size: 1.2em;
    cursor: pointer;
}
.category-link.disabled {
    color: rgba(0,0,0,0.3);
    cursor: default;
}
.category-link.disabled:hover, .category-link.disabled:focus, .category-link.disabled:active {
    color: rgba(0,0,0,0.3);
    text-decoration: none;
}
.category-link:hover, .category-link:focus, .category-link:active {
    color: rgba(0,0,0,0.54);
    text-decoration: none;
}
.category-link.disabled .chevron-category-title {
    color: rgba(0,0,0,0.3);
}
.chevron-category-title {
    vertical-align: bottom;
}
</style>
