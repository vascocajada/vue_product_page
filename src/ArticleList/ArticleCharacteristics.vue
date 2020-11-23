<template>
    <td style="border-right: 10px solid white">
        <img
            v-for="characteristic in characteristics"
            :key="characteristic.image"
            :title="characteristic.title"
            :src="characteristic.image_url"
            style="max-width:50px"
            data-toggle="tooltip"
            data-placement="top"
        >
    </td>
</template>

<script>
export default {
    props: {
        characteristics: {
            type: Array,
            default() { return [] }
        }
    }
}
</script>

<style>
</style>
