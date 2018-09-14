/* eslint-env node */
'use strict';
const existsSync = require('exists-sync');
const chalk = require('chalk');
const path = require('path');

const packageName = 'select2';

module.exports = {
  name: 'ember-cli-shim-select2',
  included(app) {
    this._super.included.apply(this, arguments);
    let options = this.getOptions();
    const locales = options.includeLocales;

    // Assuming select2 installed as bower dependency
    // TODO:
    const pkgPath = path.join(app.project.root, 'node_modules', packageName);
    if (locales) {
      this.import(`${pkgPath}/select2.css`);
      this.import(`${pkgPath}/select2.js`);

      if (Array.isArray(locales)) {
        locales.forEach(locale => {
          this.import(`${pkgPath}/select2_locale_${locale}.js`);
        });
      }
    }
  },
  getOptions() {
    const config = this.project.config(process.env.EMBER_ENV)[packageName] || {};
    if (Array.isArray(config.includeLocales)) {

      // Filter down the locales to only those are actually exists in the package.
      config.includeLocales = config.includeLocales
      .filter(locale => typeof locale === 'string')
      .map(locale => locale.replace('.js', '').trim())
      .filter(locale => {

        if (!this.checkLocaleExists(locale)) {
          // Fallback once to the generic locale if this particular is not found in place.
          locale = locale.replace(/-\w+$/, '');
        }
        if (locale === 'en') {
          // `en` is included by default.  quietly ignore if user specifies it in the list
          return false;
        }
        if (!this.checkLocaleExists(locale)) {
          this.ui.writeLine(
            chalk.red(
              `ember-cli-shim-select2: Specified locale "${locale}" but could not find in select2.\n
              Visit https://select2.org/i18n to view the full list of supported locales.`
            )
          );
          return false;
        }
        return true;
      });
    }
    return config;
  },
  checkLocaleExists(locale) {
    const location = path.join(this.app.project.root, 'node_modules', packageName);
    return existsSync(path.join(location, `select2_locale_${locale}.js`))
  }
};
