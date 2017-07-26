# SASS and CSS Styleguide

This document provides coding standards, methodologies and architectural approaches to help keep stylesheets written with SASS or CSS scaleable, maintainable, efficient, consistent and human readable.

It has an accompanying config for [gulp-sass-lint](https://www.npmjs.com/package/gulp-sass-lint) which will check your code as you write at 2 levels:
* Error (2): Will prevent your SASS from being built and show details of the error in the console.
* Warning (1): Will build your CSS but show a warning with details in the console. These are acceptable while developing but should be cleaned up before committing your changes.

The full list of rules can be found on [GitHub](https://github.com/sasstools/sass-lint/tree/develop/docs/rules). There are many that are present in our config but not enforced.


## Fundamentals

Before getting to actual coding standards, there are some fundamentals that should be adhered to at all times when producing CSS:

* Use SASS.
* Use ITCSS.
* Use BEM syntax.
* If the target [browser support](http://caniuse.com/#feat=flexbox) allows, use flexbox where appropriate.
* Do not add vendor prefixes by hand; these should be added automatically by an autoprefixer. Non-standard proprietary selectors (such as `::-ms-clear {...}`) and properties (such as `-webkit-appearance: none;`) which do not have a non-prefixed equivalent will still need to be added to your code manually.

## Methodologies and Architecture

### ITCSS
ITCSS (Inverted Triangle CSS) provides a folder structure and source order that will help to prevent your CSS becoming tangled and messy as it increases in size. We start with the furthest reaching generic selectors and work our way down to the most explicit.

The parts of ITCSS that are geared towards using SASS can simply be ignored if writing vanilla CSS.

* **Settings:** SASS variables and maps.
* **Tools:** SASS functions and mixins.
* **Generic:** Our farthest reaching selectors such as box-sizing and resets as well as `@font-face` imports.
* **Base:** Far reaching, classless selectors for things like `body` and typographic elements.
* **Objects:** Class based selectors for underlying design patterns that are reused across components, such as a grid. We also keep generic animations using `@keyframes` here, with animations specific to components being in the below layer.
* **Components:** Individual partials with BEM based selectors for constituent parts of disparate UI components. This is where the bulk of our code lives.
* **Utilities:** Utilities and helper classes that should take precedence over anything defined before. E.g. `.is-hidden`.

All styles should be split into partials and placed in a folder structure that matches the above sections. Each partial should then be `@import`ed in our main SCSS file which should only contain these imports. Think of it as a table of contents.

Partials must be named with an underscore, E.g. `_navigation.scss`. When building SASS into CSS any files that do not have an underscore will be built into a CSS file of the same name.

### BEM
BEM (Block Element Modifier) is a CSS syntax that helps to clarify relations between elements. It's particularly helpful in larger interrelated UIs that need a number of classes. When using ITCSS, this syntax would be used heavily in the 'Components' layer.

As an analogy, imagine that a person is 'Block', a hand is an 'Element' of that block and being tall is a 'Modifier' of the block.

```
.person { }
.person__hair { }
.person--tall { }
```

SASS provides syntax that can make this easier to read and write. Although this syntax appears to be nested the generated CSS will appear as above. In this example we are also using a modifier on an element contained in the person block:

```
.person {
  &__hair {
    &--blonde {

    }
  }
  &--tall {

  }
}
```

A BEM block may only be nested 2 elements deep. In the above example, it would not be permitted to add another element or modifier to `&--blonde`.

BEM syntax can also be extended beyond class names and used when naming variables and values in maps. Anything that has a hierarchy or includes modifications to an original setting can use this naming convention:

```
$colors: (
  background: #ffffff,
  background--aside: #cccccc
);
```

#### State Classes

When using CSS classes to set a state on an element, use a dedicated class instead of adding a modifier. If used across multiple components these state classes can stay in the `utilities` layer to promote reuse:

```
.is-hidden {
  display: none;
}

.is-invisible {
  visibility: hidden;
}
```

Where a state class is specific to a component, nest the state class within the component class after any elements/modifiers:

```
.off-canvas-menu {
  display: none;
  &__item {
    display: inline-block;
  }
  &.is-active {
    display: block;
  }
}
```


## Syntax

### Spacing, indentation, naming conventions and writing styles
* Code should be indented by 2 spaces (soft tabs).
* Leave an empty line between rulesets.
* Selectors should be on their own line with a trailing comma.
* Opening brackets should appear on the same line as the last selector after a space.
* Closing brackets should be on their own line after the last property.
* Each property should appear on its own line.
* Leave a space between the property name and value.
* Classes, mixins and functions should be lowercase and hyphenated.
* Variable names should also be lowercase and hyphenated, but BEM syntax is allowed (and encouraged) for related variables.
* Use single quotes.

### Selectors and class Names
* Never use ID selectors. If you must select an element by ID use an attribute selector instead, as they carry the same specificity as a class selector: `[id=some-id] { }`.
* Do not qualify classes with the element name, such as `div.error`.
* Pseudo-elements must start with double colons: `::before`.
* Pseudo-classes must start with a single colon: `:hover`.
* Avoid leaving empty rulesets in your code.
* When naming classes you should aim for something sensible and ambiguous enough to be reused, yet descriptive of their intent without being overly specific. Class names like `.red` and `.right-column` aren't as good as `.highlighted-text` and `.info-box`.
* HTML5 provides semantic elements such as `header`, `footer`, `nav` etc. While the element name is descriptive of the element's use you should still apply classes for styling as you would for any other `div`.
* Ensure that the intent of your selector matches the selector that you actually write. If styling the main menu in a site's header you could use `header ul { }`. This selector is going to be much further reaching then you intended - using an unambiguous class name on the menu itself is going to fulfil your intent more accurately: `.main-menu { }`.

### Numbers, units and colour values
* Omit leading zeroes from decimal values.
* Omit trailing zeroes from all numbers.
* Unit-less numbers should be uses where possible: `line-height: 1.5;`, `border: 0;`.
* If specifying a zero border value, use `0` rather than `none`.
* Color keywords such as `red` should not be used.
* Hexadecimal colours should be lowercase.
* If multiple values are passed (such as `rgba` or when including a mixin with multiple arguments), leave a space between each value.
* All colours, font-sizes, margin, and padding properties should use a variable.

### Property order
* Place `@extend`s first. Note: You must only extend placeholders: `%some-placeholder`.
* Then `@include` mixins, unless it's for media queries (see below). The mixin name should include brackets when declared or invoked even if it has no arguments.
* Then all other properties. There is no set rule here, but I tend to keep properties like `position` and `display` first, `z-index`, `transition` and `transform` last, and everything else in between making sure to keep like properties together. Placing properties in alphabetical order is illogical. Don't do it.
* Then `@include bp()`. This specific media query mixin needs to appear last, and the linter makes an exception for that.
* Then pseudo elements (such as `::before`) and pseudo classes (such as `:hover`).
* Then additional elements in BEM syntax:
  * Elements (such as `&__element { }`).
  * Modifiers (such as `&--modifier { }`).
* Finally, nested classes (such as `.is-active`).

### Comments
CSS is not a pretty language, and its declarative nature makes it hard to see relations between seemingly separate blocks of code. Other developers and your future self will thank you for clear, helpful comments.
* In SASS, use single line comments. These will not be included in the generated CSS.
* If you need a comment in the generated CSS (such as theme metadata for WordPress) use multiline comments. These will remain in generated CSS but will be removed when minified.
* Ensure comments are explaining something that isn't obvious from the code itself.

### `!important`
Do not use `!important` unless it's is absolutely unavoidable. This should only be the case when working with third party CSS that has already misused this declaration or written selectors using IDs. All instances of `!important` should be accompanied with a comment explaining its purpose.

This declaration _can_ have legitimate uses: If using a helper class such as `.is-hidden { display: none; }` you can use `!important` to ensure that the rule is respected among any other classes applied to the element. Using ITCSS should make this unnecessary as helper classes come last.

Always put a space between the property and the bang (`!`).

## Examples

### Good
```
.class-name {
  @extend %my-element;
  @include underline();
  width: 100%;
  max-width: 500px;
  background: rgba(255, 255, 255, .7);
  z-index: z(class-name);
  @include bp(small) {
    max-width: 320px;
  }
  &:hover {
    color: color(link);
  }
  &__element {
    color: color(type--dark);
  }
}

.highlighted-text,
.marked-text {
  color: color(highlight);
  text-decoration: underline;
  &--quote {
    color: color(highlight--light);
  }
  &.is-active {
    background: color(mark);
  }
}
```

### Not good
```
.className, #another_element
{
width:100%;
max-width:500px;
@include underline;
background:rgba(255,255,255,0.7) }

.red { color:#FF0000; }

```

## Notes

### JavaScript Hooks
* Dedicated classes should be added to the element for JavaScript hooks which are not used for CSS, and should be prefixed `js--`: `<button class="open-menu js--open-menu">Menu</button>`.
* Using IDs is for fine JavaScript hooks, and is actually faster than selecting by class name if you only need a single element. You should still use the `js--` prefixed naming convention for brevity.
* It might be tempting to use data attributes as JS hooks, but this should be avoided. These attributes are intended for storing data and not for selecting elements.

### Bypassing the linter
If it's absolutely necessary to break a rule governed by sass lint you can use a special comment to do so. You must include an additional comment that justifies this - never disable the linter just because the rule is stopping you from adding a quick and dirty fix.

In this example, we need to manually add a vendor prefix as the linter regards a non-standard property as standard:

```
body {
  // font-smoothing is regarded as standard by the linter: https://github.com/sasstools/sass-lint/issues/824
  // sass-lint:disable-block no-vendor-prefixes
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```
