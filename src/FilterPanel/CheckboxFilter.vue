<template>
    <div>
        <div class="visible-options">
            <CheckboxToggle
                v-for="option in filterOptionsVisible"
                :key="option.value"
                :checkbox="option"
                :store-key="filterData.key"
                store-namespace="filters"
            />
        </div>
        <transition name="slide">
            <div
                v-if="displayAll"
                class="hidden-options"
            >
                <CheckboxToggle
                    v-for="option in filterOptionsHidden"
                    :key="option.value"
                    :checkbox="option"
                    :store-key="filterData.key"
                    store-namespace="filters"
                />
            </div>
        </transition>
        <div
            v-if="filterOptionsHidden.length"
            class="toggle-display-all pt-1"
            :style="{color: config.brand_primary}"
            @click="toggleDisplayAll"
        >
            <span v-if="!displayAll">
                {{ 'Ver todos'|trans }}
            </span>
            <span v-if="displayAll">
                {{ 'Esconder'|trans }}
            </span>
        </div>
    </div>
</template>

<script>

import CheckboxToggle from './CheckboxToggle.vue';

export default {
    components: {
        CheckboxToggle
    },
    props: {
        filterData: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            displayAll: false
        }
    },
    computed: {
        options() {
            return Object.values(this.filterData.options).sort((a, b) => {

                if (typeof this.$store.state.filters.selections[this.filterData.key] !== 'undefined'
                    && this.$store.state.filters.selections[this.filterData.key].indexOf(a.value) > -1) return -1

                if (typeof this.$store.state.filters.selections[this.filterData.key] !== 'undefined'
                    && typeof this.$store.state.filters.selections[this.filterData.key].indexOf(b.value) > -1) return 1

                if (a.count === 0) return 1
                if (b.count === 0) return -1

                if (this.filterData.key  === 'size') { // handle size as two floats instead of one string
                    const aSizes = a.value.split('x')
                    const bSizes = b.value.split('x')

                    if (parseFloat(aSizes[0]) > parseFloat(bSizes[0]))
                        return 1
                    if (parseFloat(bSizes[0]) > parseFloat(aSizes[0]))
                        return -1
                    if (parseFloat(aSizes[1]) > parseFloat(bSizes[1]))
                        return 1
                    if (parseFloat(bSizes[1]) > parseFloat(aSizes[1]))
                        return -1
                    return 0
                }

                const aValue = typeof a.value === 'string' ? a.value.toUpperCase() : a.value
                const bValue = typeof b.value === 'string' ? b.value.toUpperCase() : b.value

                if (aValue > bValue) return 1

                if (bValue > aValue) return -1

                return 0;
            })
        },
        filterOptionsVisible() {
            return this.options.slice().splice(0, 4)
        },
        filterOptionsHidden() {
            return this.options.slice().splice(4)
        }
    },
    methods: {
        toggleDisplayAll() {
            this.displayAll = !this.displayAll
        }
    }
}

</script>

<style>
.toggle-display-all {
    font-size: 1.1em;
    cursor: pointer;
}
.slide-enter-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: ease-in;
   -webkit-transition-timing-function: ease-in;
   -o-transition-timing-function: ease-in;
   transition-timing-function: ease-in;
}
.slide-leave-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
.slide-enter-to, .slide-leave {
   max-height: 100px;
   overflow: hidden;
}
.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}
</style>
