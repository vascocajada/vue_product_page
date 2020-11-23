<template>
    <div>
        <div class="article-list-container">
            <div
                v-if="articlesData.length > 0"
                class="row"
                :style="{filter: ajaxPending ? 'blur(2px)' : ''}"
            >
                <ArticleItem
                    v-for="articleData in articlesData"
                    :key="articleData.id"
                    :article-data="articleData"
                />
            </div>
            <div
                v-if="articlesData.length === 0"
                class="no-articles"
            >
                {{ 'Não existem artigos para a selecção actual :('|trans }}
                <div
                    class="call-me-container"
                    @click="showModal"
                >
                    <span class="call-me-text">
                        <span>
                            Precisa de ajuda?
                        </span>
                        <span class="call-me-subtext">
                            Ligamos para si
                        </span>
                    </span>
                    <svg
                        id="Capa_1"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 841.89 595.281"
                        enable-background="new 0 0 841.89 595.281"
                        xml:space="preserve"
                        style="height: 25px;top: 0px; position: relative;"
                    >
                        <g>
                            <path
                                fill="#FFFFFF"
                                d="M631.33,87.22c-116.293-116.293-304.712-116.293-420.881,0C98.61,199.059,94.403,377.951,197.954,494.863
                                    l3.093,2.475c-11.258,24.248-30.558,54.188-61.239,69.281c-10.145,4.947-7.794,20.041,3.34,21.773
                                    c33.527,5.195,81.652-0.619,126.561-34.518l0.619,0.496c114.066,67.053,263.266,51.713,361.25-46.27
                                    C747.623,391.931,747.623,203.389,631.33,87.22z M518.996,424.964c-6.557,6.68-13.484,12.865-19.67,19.793
                                    c-9.031,10.145-20.414,13.361-33.281,12.619c-18.805-0.988-36.248-7.299-52.949-15.465c-37.239-18.063-69.034-43.176-95.632-74.848
                                    c-19.671-23.381-35.877-48.867-46.641-77.693c-5.196-13.98-8.908-28.207-7.794-43.301c0.742-9.278,4.207-17.196,11.011-23.753
                                    c7.423-7.052,14.351-14.351,21.65-21.526c9.526-9.402,21.403-9.279,30.929,0c5.938,5.815,11.629,11.629,17.444,17.444
                                    c5.691,5.691,11.382,11.258,16.949,16.949c9.897,10.021,9.897,21.65,0,31.671c-7.052,7.175-14.104,14.351-21.403,21.279
                                    c-1.856,1.856-2.103,3.34-1.113,5.691c4.701,11.382,11.629,21.526,19.299,30.929c15.465,19.053,33.032,36.002,54.064,49.115
                                    c4.454,2.846,9.403,4.824,14.104,7.424c2.35,1.359,4.082,0.865,5.938-1.113c7.051-7.301,14.352-14.475,21.527-21.65
                                    c9.525-9.402,21.402-9.402,30.805,0c11.629,11.504,23.135,23.01,34.641,34.641C528.769,403.314,528.769,415.189,518.996,424.964z
                                     M409.26,232.709l3.711-26.475c25.608,3.588,48.868,15.217,67.179,33.527c17.443,17.444,28.824,39.341,32.908,63.467l-26.352,4.576
                                    c-3.217-18.681-12.002-35.63-25.486-49.115C446.994,244.462,429.054,235.431,409.26,232.709z M556.111,303.228
                                    c-5.939-34.641-22.27-66.065-47.137-91.056c-26.227-26.228-59.506-42.806-96.25-48.001l3.711-26.476
                                    c42.435,5.938,81.033,25.114,111.343,55.549c28.826,28.826,47.756,65.322,54.684,105.406L556.111,303.228z
                                "
                            />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
        <div class="pagination-cont">
            <VPagination
                v-if="length > 1"
                v-model="page"
                :length="length"
                :color="config.brand_primary"
            />
        </div>
    </div>
</template>

<script>

import ArticleItem from './ArticleItem.vue'

export default {
    components: {
        ArticleItem
    },
    computed: {
        articlesData() {
            return this.$store.state.articles.data.filter((articleData) => articleData.options.length && articleData.price_min > 0)
        },
        ajaxPending() {
            return this.$store.state.ajaxPending
        },
        length() {
            return Math.ceil(this.$store.state.articles.count /21)
        },
        page: {
            get() {
                return this.$store.state.filters.page
            },
            set(val) {
                window.scrollTo(0, 0);
                this.$store.dispatch('filters/updateFilter', {
                    mutation: 'setPage',
                    selection: val
                })
            }
        }
    },
    methods: {
        showModal() {
            const element = document.getElementById('ignismyModal')
            element.className += ' in'

            document.querySelector('#ignismyModal .modal-header button').addEventListener('click', () => {
                element.classList.remove('in')
            })
        }
    }
}

</script>

<style>
.in {
    display: block;
}
.no-articles {
    padding-top: 4em;
    font-size: 1.5em;
    text-align: center;
    color: rgba(0,0,0,0.54);
}
.pagination-cont {
    text-align: center;
}
.call-me-container {
    cursor: pointer;
    color: white;
    border-radius: 5px;
    padding-top: 10px;
    font-size: 1.1em;
    background-color: #1e7483;
    outline: none;
    width: 70%;
    margin: 20px auto 0;
}
.call-me-text {
    text-transform: uppercase;
    position: relative;
    bottom: 5px;
    font-weight: 400;
}
.call-me-subtext {
    font-weight: 600;
}
.modal-dialog {
    top: 200px;
}
/*.v-pagination__item, .v-pagination__navigation {
    box-shadow: none !important;
    border: 1px solid #ccc;
}*/
</style>
