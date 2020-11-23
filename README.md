# vue_product_page

Vue Product Page is a vue sample application that can be used to display a product list for an E-commerce platform.

It was written for a website that sells mattresses and the backend code is not included in this repository.

The purpose of this repository is to serve as a showcase of code written by [vascocajada](https://github.com/vascocajada).

## Installation

Clone the repository into your project.

```bash
git clone https://github.com/vascocajada/vue_product_page.git
```

Import the bundle code into the html page where you want to display the product list.

Then create an element with the id **article-list-vue** — that is where your vue application will be injected.

You should also create a script tag on your html page with the id **config**. This script should only contain a JSON structure where you pass a few config parameters to your vue application.

```html
<script id="config" type="application/json">
  {
    "locale": "pt", // used for i18n
    "brand_primary": "#1e7483", // primary color used by your application. Passed to vuetify
    "selections": { // filters to be set on page load
      "size": "",
      "level": null,
      "deep": null,
      "brand": null,
      "mattress_type": null,
      "price": null
    },
    "category_id": "1", // category filter to be set on page load
    "category_title": "Colch\u00f5es", // category title to be set on page load
    "sort": "", // order parameter to be set on page load
    "query_string": "" // query string to be set on page load
  }
</script>
```
This information should be served by backend code that is not addressed in this repository.

The code, as is, requests the product list to the path **api/articles**.
