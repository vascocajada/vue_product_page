<template>
    <table style="width: 100%">
        <tbody>
            <tr>
                <ArticleTitle
                    :title="articleData.title"
                    :brand="articleData.brand"
                />
                <ArticlePrice
                    :original-price="articleData.original_price"
                    :price-min="priceMin = articleData.price_min"
                />
            </tr>
            <tr>
                <ArticleBuyButton
                    :article-data="articleData"
                />
                <ArticleDiscount
                    :discount="discount"
                />
            </tr>
        </tbody>
    </table>
</template>

<script>

import ArticleTitle           from './ArticleTitle.vue';
import ArticlePrice           from './ArticlePrice.vue';
import ArticleBuyButton       from './ArticleBuyButton.vue';
import ArticleDiscount        from './ArticleDiscount.vue';

export default {
    components: {
        ArticleTitle,
        ArticlePrice,
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
        discount() {
            if (this.selectedOption === 0) { return this.articleData.discount }

            let discount = this.articleData.discount 
            this.articleData.options.forEach((option) => {
                if (option.id === this.selectedOption) discount = Math.round((option.price / option.original_price-1)*100*-1)
            })
            return discount
        }
    }
}
</script>

<style>
</style>
