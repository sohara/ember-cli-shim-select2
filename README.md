# ember-cli-shim-select2

Ember CLI add-on helps to load [select2](https://github.com/select2/select2) locales in your Ember app, with a smaller footprint.

## Usage

`bower install --save select2`
`ember install ember-cli-shim-select2`

Add locales preferences to your app's config file:
```
// config.environment.js
module.exports = function(environment) {
  return {
    // ...

    select2: {
      // To cherry-pick specific locale support into your application.
      // Full list of locales:
      includeLocales: ['es', 'zh-cn']
    }
  };
```

You should be able to specify one locale when creating a select2 instance:

```
$(".js-example-language").select2({
  language: "es"
});

```


NOTE: English is the default language, so adding 'en-*' to the locale list will not actually doing anything.

When a specific locale file fails, the add-on will try to locate a more generic locale, suppose that you specify `zh-cn` on the list but no locale file for that in select2 package, a `zh` locale will be used. If still found no locale in the package a warning will be displayed from the build output.

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`
