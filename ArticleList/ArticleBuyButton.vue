<template>
    <td>
        <a
            :href="url"
            @click="trackProductClick"
        >
            <button
                class="btn prod-buy list"
                style="width: 100%"
            >
                {{ 'Comprar'|trans }}
            </button>
        </a>
    </td>
</template>

<script>

export default {
    props: {
        articleData: {
            type: Object,
            default() { return {} }
        },
        selectedOption: {
            type: Number,
            default() { return 0 }
        }
    },
    computed: {
        url() {
            return this.articleData.url + '/' + (this.selectedOption !== 0 ? this.selectedOption : '')
        },
        priceMin() {
            if (this.selectedOption === 0) { return this.articleData.price_min }

            let priceMin = null
            this.articleData.options.forEach((option) => {
                if (option.id === this.selectedOption) return priceMin = Math.round(option.price)
            })
            return priceMin
        }
    },
    methods: {
        trackProductClick() {
            window.dataLayer.push({
                'event': 'productClick',
                'ecommerce':{
                    'click':{
                        'products':[
                            {
                                name: this.articleData.title,
                                id: this.articleData.id,
                                price: this.priceMin
                            }
                        ]
                    }
                }
            });
        }
    }
}
</script>

<style>
</style>
