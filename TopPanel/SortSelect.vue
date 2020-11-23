<template>
    <VSelect
        v-model="sort"
        label="Ordenar por"
        :color="config.brand_primary"
        :items="[
            {
                value: 'translated_price_min:asc',
                text: ordPriceAsc
            },
            {
                value: 'translated_price_min:desc',
                text: ordPriceDesc
            },
            {
                value: 'title_sort:asc',
                text: ordAlfAsc
            },
            {
                value: 'title_sort:desc',
                text: ordAlfDesc
            },
            {
                value: 'div(translated_price_min,translated_original_price_min):asc',
                text: discount
            }
        ]"
    />
</template>


<script>
export default {
    data() {
        return {
            ordPriceAsc: this.$options.filters.trans('Preço ascendente'),
            ordPriceDesc: this.$options.filters.trans('Preço descendente'),
            ordAlfAsc: this.$options.filters.trans('Ordem alfabética crescente'),
            ordAlfDesc: this.$options.filters.trans('Ordem alfabética decrescente'),
            discount: this.$options.filters.trans('Maior desconto')
        }
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
    }
}
</script>

<style>
</style>
