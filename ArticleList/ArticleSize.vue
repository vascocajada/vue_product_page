<template>
    <td
        style="border-right: 10px solid white"
        :colspan="colspan"
    >
        <select
            v-model="selectedOptionComputed"
            class="form-control option-selector"
        >
            <option
                value="0"
            >
                {{ 'Tamanho'|trans }}
            </option>
            <option
                v-for="option in options"
                :key="option.id"
                :value="option.id"
                :data-stockid="option.id"
                :data-originalprice="option.original_price"
                :data-price="option.price"
            >
                {{ option.size }}
            </option>
        </select>
    </td>
</template>

<script>

export default {
    props: {
        options: {
            type: Array,
            default() { return [] }
        },
        selectedOption: {
            type: Number,
            default() { return 0 }
        },
        colspan: {
            type: String,
            default() { return '' }
        }
    },
    computed: {
        selectedOptionComputed: {
            get() {
                return this.selectedOption
            },
            set(val) {
                this.$emit('option-changed', parseInt(val))
            }
        }
    }
}
</script>

<style>
</style>
