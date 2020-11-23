import Vue from 'vue'

import App from "./App.vue"

import messagesPt from '../../translations/messages.pt.yml'
import messagesEs from '../../translations/messages.es.yml'
//import messagesEn from '../../translations/messages.en.yml'
//import messagesFr from '../../translations/messages.fr.yml'

import store from './store'

import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify)

Vue.config.productionTip = false

const configElement = document.getElementById( 'config' )
const config = JSON.parse( configElement.innerHTML )

Vue.mixin({
    data: function() {
        return {
            get config() {
                return config
            }
        }
    }
})

Vue.filter('trans', function (key) {
    //return key // inactive until solution for load yamls lighter
    if (!key) return ''
    key = key.toString()

    switch(config.locale) {
    case 'pt':
        return messagesPt[key] ? messagesPt[key] : key
    case 'es':
        return messagesEs[key] ? messagesEs[key] : key
                /*case 'en':
        return messagesEn[key] ? messagesEn[key] : key
    case 'fr':
        return messagesFr[key] ? messagesFr[key] : key*/
    }
})

new Vue({
    store,
    render: h => h(App),
}).$mount('#article-list-vue')
