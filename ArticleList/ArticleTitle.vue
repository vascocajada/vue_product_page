<template>
    <td style="border-right: 10px solid white; width: 66%">
        <h4 style="font-size: 16px; height: 37px; overflow: hidden; margin-bottom:0px">
            {{ title }}
            <span style="font-size: 14px; color: #777">
                by {{ brand }}
            </span>
        </h4>
    </td>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default() { return '' }
        },
        brand: {
            type: String,
            default() { return '' }
        }
    }
}
</script>

<style>
</style>
