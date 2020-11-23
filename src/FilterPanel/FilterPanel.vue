<template>
    <div class="filters pr-2">
        <FilterPanelDesktop />
        <FilterPanelMobile />
    </div>
</template>

<script>

import FilterPanelDesktop from './FilterPanelDesktop.vue'
import FilterPanelMobile  from './FilterPanelMobile.vue'

export default {
    components: {
        FilterPanelDesktop,
        FilterPanelMobile
    }
}

</script>

<style>
.clear-filters {
    text-align: right;
    cursor: pointer;
    font-size: 1.1em;
    flex: 1 0 100%;
}
.close-filters {
    cursor: pointer;
    font-size: 1.1em;
    flex: 1 0 100%;
}
.filter-group-list {
    width: 100%;
}
.filter-panel-mobile {
    position: fixed !important;
    z-index: 1031 !important;
}
.filter-panel-mobile .row {
    width: 100%;
}
.expansion-panel-filters-mobile {
    box-shadow: none !important;
}
</style>
