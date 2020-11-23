<template>
    <div class="mb-2 breadcrumb-text">
        {{ categoryTitle }} {{ selectionsString !== '' ? '/ ' : '' }}{{ selectionsString }}
    </div>
</template>

<script>
export default {
    computed: {
        categoryTitle() {
            return this.$store.state.filters.categoryTitle
        },
        selectionsString() {
            let selectionsString = this.$store.state.filters.priceMinSelected +
                '€ - ' +
                this.$store.state.filters.priceMaxSelected +
                '€'
            selectionsString += this.$store.state.filters.queryString !== '' ?
                (' / ' + this.$store.state.filters.queryString) :
                ''

            return Object.entries(this.$store.state.filters.selections).reduce((selectionsString, selection) => {
                if (selection[1].length > 0) {
                    selectionsString += ' / '
                }
                selectionsString += selection[1].join(' / ')

                return selectionsString
            }, selectionsString)
        }
    }
}
</script>

<style>
.breadcrumb-text {
    color: rgba(0,0,0,.54);
    font-size: 1.1em;
}
</style>
