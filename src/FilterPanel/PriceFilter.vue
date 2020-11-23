<template>
    <div>
        <div class="mb-2">
            <VRadioGroup
                v-model="model"
                class="pt-0 mt-0"
            >
                <VRadio
                    class="ma-0 pa-0 smaller-checkbox"
                    value="0-100"
                    :ripple="false"
                    :color="config.brand_primary"
                    :disabled="priceIntervals['0-100'] === 0"
                >
                    <template v-slot:label>
                        0€ - 100€
                        <span class="filter-count ml-1">({{ priceIntervals['0-100'] }})</span>
                    </template>
                </VRadio>
                <VRadio
                    class="ma-0 pa-0 smaller-checkbox"
                    value="100-200"
                    :ripple="false"
                    :color="config.brand_primary"
                    :disabled="priceIntervals['100-200'] === 0"
                >
                    <template v-slot:label>
                        100€ - 200€
                        <span class="filter-count ml-1">({{ priceIntervals['100-200'] }})</span>
                    </template>
                </VRadio>
                <VRadio
                    class="ma-0 pa-0 smaller-checkbox"
                    value="200-500"
                    :ripple="false"
                    :color="config.brand_primary"
                    :disabled="priceIntervals['200-500'] === 0"
                >
                    <template v-slot:label>
                        200€ - 500€
                        <span class="filter-count ml-1">({{ priceIntervals['200-500'] }})</span>
                    </template>
                </VRadio>
                <VRadio
                    class="ma-0 pa-0 smaller-checkbox"
                    value="500-900"
                    :ripple="false"
                    :color="config.brand_primary"
                    :disabled="priceIntervals['>500'] === 0"
                >
                    <template v-slot:label>
                        > 500€
                        <span class="filter-count ml-1">({{ priceIntervals['>500'] }})</span>
                    </template>
                </VRadio>
            </VRadioGroup>
        </div>
        <div class="row ma-0 pr-4 price-picker">
            <div class="col-xs-4 pa-0">
                <VTextField
                    v-model.number="priceMinSelected"
                    class="mt-0 pt-0"
                    height="18"
                    hide-details
                    single-line
                    type="number"
                    :color="config.brand_primary"
                    suffix="€"
                    min="0"
                    :max="parseInt(priceMaxSelected) -1"
                />
            </div>
            <div class="col-xs-4 pa-0">
                <div class="price-label">
                    {{ 'até'|trans }}
                </div>
            </div>
            <div class="col-xs-4 pa-0">
                <VTextField
                    v-model.number="priceMaxSelected"
                    class="mt-0 pt-0"
                    height="18"
                    hide-details
                    single-line
                    type="number"
                    :color="config.brand_primary"
                    suffix="€"
                    :min="parseInt(priceMinSelected) +1"
                    max="900"
                />
            </div>
        </div>
    </div>
</template>

<script>

import debounce from 'lodash/debounce'

export default {
    props: {
        min: {
            type: Number,
            default: 5
        },
        max: {
            type: Number,
            default: 900
        }
    },
    computed: {
        priceMinSelected: {
            get() {
                return this.$store.state.filters.priceMinSelected
            },
            set(val) {
                this.$store.commit('filters/setPriceRange', '')
                if (val < 0 || val >= this.priceMaxSelected) // TODO make value revert to last valid
                    this.updatePrice([this.$store.state.filters.priceMinSelected, null])
                else
                    this.updatePrice([val, null])
            }
        },
        priceMaxSelected: {
            get() {
                return this.$store.state.filters.priceMaxSelected
            },
            set(val) {
                this.$store.commit('filters/setPriceRange', '')
                if (val > 900 || val <= this.priceMinSelected) // TODO make value revert to last valid
                    this.updatePrice([null, this.$store.state.filters.priceMaxSelected])
                else
                    this.updatePrice([null, val])
            }
        },
        model: {
            get() {
                return this.$store.state.filters.priceRange
            },
            set(val) {
                const prices = val.split('-')
                this.$store.commit('filters/setPriceRange', val)
                this.$store.dispatch('filters/updateFilter', {
                    mutation: 'setPrice',
                    selection: prices
                })
            }
        },
        priceIntervals() {
            return this.$store.state.filters.data.price.intervals
        }
    },
    created() {
        this.updatePrice = debounce(this.updatePrice, 300)
    },
    methods: {
        updatePrice(val) {
            this.$store.dispatch('filters/updateFilter', {
                mutation: 'setPrice',
                selection: val
            })
        }
    }
}
</script>

<style scoped>
.price-label {
    text-align: center;
}
</style>
<style>
.price-picker .v-icon {
    font-size: 1em !important;
    margin-top: -6px !important;
}
.v-input__append-outer {
    margin-left: 3px !important;
}
</style>
