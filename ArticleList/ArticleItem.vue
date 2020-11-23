<template>
    <div class="col-md-4 col-sm-6 article">
        <ArticleImage
            :article-data="articleData"
            :selected-option="selectedOptionComputed"
        />
        <component
            :is="componentName"
            :article-data="articleData"
            :selected-option="selectedOptionComputed"
            @option-changed="optionChanged"
        />
    </div>
</template>

<script>

import ArticleImage from './ArticleImage.vue'
import ArticleBody  from './ArticleBody.vue'
import PillowBody   from './PillowBody.vue'
import NoSizeBody   from './NoSizeBody.vue'

export default {
    components: {
        ArticleImage,
        ArticleBody,
        PillowBody,
        NoSizeBody,
    },
    props: {
        articleData: {
            type: Object,
            default() { return {} }
        }
    },
    data() {
        return {
            componentName: '',
            selectedOption: 0, // TODO make something with the store so that options are watched and handle selected options differently. Vuex ORM?
            optionUntouched: true
        }
    },
    computed: {
        selectedOptionComputed() {
            if (!this.optionUntouched) return this.selectedOption

            let filtered_option = []
            if (typeof this.$store.state.filters.selections['size'] !== 'undefined' && this.$store.state.filters.selections['size'].length === 1) {
                filtered_option = this.articleData.options.filter((option) => option.size === this.$store.state.filters.selections['size'][0])
            }
            return typeof filtered_option[0] !== 'undefined' ? filtered_option[0].id : this.selectedOption
        }
    },
    created() {
        this.componentName = parseInt(this.articleData.category_id) === 1 ? 'ArticleBody' : 'PillowBody' // TODO make pretty
        if (parseInt(this.articleData.category_id) === 1) this.componentName = 'ArticleBody'
        else if (parseInt(this.articleData.category_id) === 4 || parseInt(this.articleData.category_id) === 2 || parseInt(this.articleData.category_id) === 6) this.componentName = 'NoSizeBody'
        else this.componentName = 'PillowBody'
    },
    methods: {
        optionChanged(selectedOption) {
            this.optionUntouched = false
            this.selectedOption = selectedOption
        }
    }
}
</script>

<style>
@media only screen and (min-width: 992px) {
    .col-md-4:nth-child(3n+1) {
        clear: both;
    }
}
@media only screen and (max-width: 991px) {
    .col-sm-6:nth-child(2n+1) {
        clear: both;
    }
}
</style>
