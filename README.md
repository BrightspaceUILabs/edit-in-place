# d2l-labs-edit-in-place

[![NPM version](https://img.shields.io/npm/v/@brightspace-ui-labs/edit-in-place.svg)](https://www.npmjs.org/package/@brightspace-ui-labs/edit-in-place)
[![Greenkeeper badge](https://badges.greenkeeper.io/BrightspaceUILabs/edit-in-place.svg)](https://greenkeeper.io/)
[![Build status](https://travis-ci.com/@brightspace-ui-labs/edit-in-place.svg?branch=master)](https://travis-ci.com/@brightspace-ui-labs/edit-in-place)

> Note: this is a ["labs" component](https://github.com/BrightspaceUI/guide/wiki/Component-Tiers). While functional, these tasks are prerequisites to promotion to BrightspaceUI "official" status:
>
> - [ ] [Design organization buy-in](https://github.com/BrightspaceUI/guide/wiki/Before-you-build#working-with-design)
> - [ ] [design.d2l entry](http://design.d2l/)
> - [ ] [Architectural sign-off](https://github.com/BrightspaceUI/guide/wiki/Before-you-build#web-component-architecture)
> - [ ] [Continuous integration](https://github.com/BrightspaceUI/guide/wiki/Testing#testing-continuously-with-travis-ci)
> - [ ] [Cross-browser testing](https://github.com/BrightspaceUI/guide/wiki/Testing#cross-browser-testing-with-sauce-labs)
> - [ ] [Unit tests](https://github.com/BrightspaceUI/guide/wiki/Testing#testing-with-polymer-test) (if applicable)
> - [ ] [Accessibility tests](https://github.com/BrightspaceUI/guide/wiki/Testing#automated-accessibility-testing-with-axe)
> - [ ] [Visual diff tests](https://github.com/BrightspaceUI/visual-diff)
> - [ ] [Localization](https://github.com/BrightspaceUI/guide/wiki/Localization) with Serge (if applicable)
> - [ ] Demo page
> - [ ] README documentation

[LitElement](https://lit-element.polymer-project.org/) web component for displaying text and editing it in-place.

## Installation

To install from NPM:

```shell
npm install @brightspace-ui-labs/edit-in-place
```

## Usage

```html
<script type="module">
    import '@brightspace-ui-labs/edit-in-place/edit-in-place.js';
</script>
<d2l-labs-edit-in-place placeholder="Edit Me"></d2l-labs-edit-in-place>
```

**Properties:**
- `value` (String): value of the input
- `placeholder`String, default: `'Enter a value'`): placeholder text of the input. If `value` is blank, this appears in italics as the label. `placeholder` must not be blank.
- `size`(Number): length of the input
- `maxlength`(Number): imposes an upper character limit

**Events:**

The `d2l-labs-edit-in-place` dispatches the `change` event when text is saved via pressing the Enter key while focusing the input, or by pressing the save button:

```javascript
editInPlace.addEventListener('change', (e) => {
  console.log(editInPlace.value);
});
```

### Headers
`d2l-labs-edit-in-place` can be used in headers and other section-related elements by wrapping it within the desired element:
```html
<script type="module">
    import '@brightspace-ui-labs/edit-in-place/edit-in-place.js';
</script>
<h2>
    <d2l-labs-edit-in-place placeholder="Edit Me"></d2l-labs-edit-in-place>
</h2>
```


## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

If you don't have it already, install the [Polymer CLI](https://www.polymer-project.org/3.0/docs/tools/polymer-cli) globally:

```shell
npm install -g polymer-cli
```

### Running the demos

To start a [local web server](https://www.polymer-project.org/3.0/docs/tools/polymer-cli-commands#serve) that hosts the demo page and tests:

```shell
polymer serve
```

### Testing

To lint ([eslint](http://eslint.org/) and [Polymer lint](https://www.polymer-project.org/3.0/docs/tools/polymer-cli-commands#lint)):

```shell
npm run lint
```

To run unit tests locally using [Polymer test](https://www.polymer-project.org/3.0/docs/tools/polymer-cli-commands#tests):

```shell
npm run test:polymer:local
```

To lint AND run local unit tests:

```shell
npm test
```

[ci-url]: https://travis-ci.org/BrightspaceUILabs/edit-in-place
[ci-image]: https://travis-ci.org/BrightspaceUILabs/edit-in-place.svg?branch=master


## Versioning, Releasing & Deploying

All version changes should obey [semantic versioning](https://semver.org/) rules.

Include either `[increment major]`, `[increment minor]` or `[increment patch]` in your merge commit message to automatically increment the `package.json` version, create a tag, and trigger a deployment to NPM.
