<template>
    <a
        class="article-link article-report"
        :href="url"
        :data-title="articleData.title"
        :data-id="articleData.id"
        :data-price="articleData.price_min"
        @click="trackProductClick"
    >
        <div
            class="prod-img"
            :style="{background: 'url('+articleData.main_image.image_url+'?'+articleData.main_image.cache_buster+') center center', backgroundSize:'contain'}"
        />
    </a>
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
.prod-img {
    background-repeat: no-repeat !important;
}
</style>
