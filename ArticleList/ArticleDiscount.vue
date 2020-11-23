<template>
    <td style="text-align: center">
        <div class="prod-discount-box">
            -{{ discount }}%
        </div>
    </td>
</template>

<script>
export default {
    props: {
        discount: {
            type: Number,
            default() { return 0 }
        }
    }
}
</script>

<style>
</style>
