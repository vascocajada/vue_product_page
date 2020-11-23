<template>
    <div class="filter-group">
        <VExpansionPanelContent>
            <template v-slot:header>
                <div class="filter-group-title">
                    {{ filterData.name }}
                </div>
            </template>
            <div class="filter-list">
                <div
                    v-if="filterData.type === 'checkbox'"
                >
                    <CheckboxFilter :filter-data="filterData" />
                </div>
                <div v-if="filterData.type === 'range'">
                    <PriceFilter />
                </div>
            </div>
        </VExpansionPanelContent>
    </div>
</template>

<script>

import CheckboxFilter from './CheckboxFilter.vue'
import PriceFilter    from './PriceFilter.vue'

export default {
    components: {
        CheckboxFilter,
        PriceFilter
    },
    props: {
        filterData: {
            type: Object,
            default() {
                return {}
            }
        }
    }
}

</script>

<style>
.filter-group {
    margin-bottom: 10px;
    flex: 1 0 100%;
}
.filter-group-title {
    font-weight: 600;
    font-size: 1.2em;
    color: rgba(0,0,0,0.54);
}
.filter-list {
    padding-left: 20px;
    overflow-y: hidden;
}
.v-input__slot {
    margin-bottom: 0 !important;
}
.smaller-checkbox i {
    font-size: 18px !important;
}
.smaller-checkbox label {
    text-align: left;
}
.smaller-checkbox input[role="checkbox"] {
    height: 20px;
}
.smaller-checkbox div.v-input--selection-controls__input {
    margin-right: 0;
}
.v-messages {
    min-height: 0 !important;
}
</style>
