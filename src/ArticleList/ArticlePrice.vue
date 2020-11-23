<template>
    <td style="text-align: center">
        <h5
            style="margin-top: 5px; margin-bottom: 5px; margin: 5px; color: #777"
            class="prod-original"
        >
            <s>{{ originalPrice }}&euro;</s>
        </h5>
        <h3
            class="prod-price"
            style="margin-top:0px; font-size: 35px"
        >
            {{ priceMin }}&euro;
        </h3>
    </td>
</template>

<script>
export default {
    props: {
        originalPrice: {
            type: String,
            default() { return '' }
        },
        priceMin: {
            type: Number,
            default() { return 999 }
        }
    }
}
</script>

<style>
</style>
