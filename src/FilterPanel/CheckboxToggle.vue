<template>
    <VCheckbox
        v-model="model"
        class="ma-0 pa-0 smaller-checkbox"
        :ripple="false"
        :color="config.brand_primary"
        :disabled="checkbox.count === 0"
    >
        <template v-slot:label>
            {{ checkbox.label }}
            <span class="filter-count ml-1">({{ checkbox.count }})</span>
        </template>
    </VCheckbox>
</template>

<script>
export default {
    props: {
        checkbox: {
            type: Object,
            default() {
                return {}
            }
        },
        storeKey: {
            type: String,
            default: ''
        },
        storeNamespace: {
            type: String,
            default: ''
        }
    },
    computed: {
        model:{
            get(){
                return (typeof this.$store.state[this.storeNamespace].selections[this.storeKey] !== 'undefined' ?
                    this.$store.state[this.storeNamespace].selections[this.storeKey].indexOf(this.checkbox.value.toString()) > -1 :
                    false
                )
            },
            set(val){
                const mutation = val ?
                    'addSelection' :
                    'removeSelection';
                this.$store.dispatch(this.storeNamespace + '/updateFilter', {
                    mutation: mutation,
                    selection: {
                        key: this.storeKey,
                        value: this.checkbox.value
                    }
                })
            }
        }
    }
}
</script>

<style>
.filter-count {
    color: rgba(0, 0, 0, 0.3);
}
</style>
