<template>
    <table style="width: 100%">
        <tbody>
            <tr>
                <ArticleTitle
                    :title="articleData.title"
                    :brand="articleData.brand"
                />
                <ArticleDiscount
                    :discount="discount"
                />
                <ArticlePrice
                    :original-price="originalPrice"
                    :price-min="priceMin"
                />
            </tr>
            <tr>
                <ArticleSize
                    :options="articleData.options"
                    :selected-option="selectedOption"
                    colspan="2"
                    @option-changed="optionChanged"
                />
                <ArticleBuyButton
                    :article-data="articleData"
                    :selected-option="selectedOption"
                />
            </tr>
        </tbody>
    </table>
</template>

<script>

import ArticleTitle           from './ArticleTitle.vue';
import ArticlePrice           from './ArticlePrice.vue';
import ArticleSize            from './ArticleSize.vue';
import ArticleBuyButton       from './ArticleBuyButton.vue';
import ArticleDiscount        from './ArticleDiscount.vue';

export default {
    components: {
        ArticleTitle,
        ArticlePrice,
        ArticleSize,
        ArticleBuyButton,
        ArticleDiscount
    },
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
        originalPrice() {
            if (this.selectedOption === 0) { return this.articleData.original_price }

            let originalPrice = null
            this.articleData.options.forEach((option) => {
                if (option.id === this.selectedOption) originalPrice = option.original_price
            })
            return originalPrice
        },
        priceMin() {
            if (this.selectedOption === 0) { return this.articleData.price_min }

            let priceMin = null
            this.articleData.options.forEach((option) => {
                if (option.id === this.selectedOption) return priceMin = Math.round(option.price)
            })
            return priceMin
        },
        discount() {
            if (this.selectedOption === 0) { return this.articleData.discount }

            let discount = this.articleData.discount 
            this.articleData.options.forEach((option) => {
                if (option.id === this.selectedOption) discount = Math.round((option.price / option.original_price-1)*100*-1)
            })
            return discount
        }
    },
    methods: {
        optionChanged(selectedOption) {
            this.$emit('option-changed', selectedOption)
        }
    }
}
</script>

<style>
</style>
