<template>
    <VApp>
        <TopBar />
        <AppBody />
    </VApp>
</template>

<script>

import AppBody from './AppBody.vue'
import TopBar      from './TopBar.vue'

export default {
    components: {
        AppBody,
        TopBar
    },
    created () {
        this.$store.dispatch('filters/getInitialData', this.config)
        window.addEventListener('resize', this.handleResize)
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize)
    },
    methods: {
        handleResize() {
            this.$store.commit('setWindowWidth', window.innerWidth)
        }
    }
}
</script>

<style>
/*
 * Bootstrap revert incompat with Vuetify
 */
label{
    max-width: unset;
    margin-bottom: 0;
    font-weight: 400;
}
/* revert theme light css. check how to not include any theme TODO */
.theme--light.application{
    background: #fff !important;
    height: auto !important;
}


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
</style>
