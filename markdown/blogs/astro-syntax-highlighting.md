---
title: Astro syntax highlighting
date: 1645853424300
thumbnail: /images/blogs/astro-syntax-highlighting.jpg
tags:
  - astro
  - markdown
  - javascript
  - webdevelopment
shortInfo: Lets fix the problem of Astro's markdown syntax Highlighting
---

## Problem

[Astro](https://astro.build) is great static site builder, which lets you create fast website's. but there is a small problem with it's markdown parsing process, code snippets don't get syntax highlighting by default, but there is an easy fix for it.

![ without highlighting ](/images/blogs-assets/astro-syntax-highlighting-0.jpg)

## Fix

you need to create a css/sass file with the following styles included: 
```scss
$background-code: #292D3E;
$white-code: #ffffff;
$black-code: #000000;
$red-code: #f07178;
$orange-code: #F78C6C;
$yellow-code: #FFCB6B;
$green-code: #C3E88D;
$cyan-code: #89DDFF;
$blue-code: #82AAFF;
$paleblue-code: #B2CCD6;
$purple-code: #C792EA;
$brown-code: #916b53;
$pink-code: #ff9cac;
$violet-code: #bb80b3;

// pre styling in not required //
pre { 
	padding: 2rem;
	background-color: $background-code;
	border-radius: .5rem;
	color: $white-code;
	overflow-x: scroll;
}

.language-css > code,
.language-sass > code,
.language-scss > code {
	color: $orange-code;
}


[class*='language-'] .namespace {
	opacity: 0.7;
}

.token.plain-text,
[class*='language-bash'] span.token,
[class*='language-shell'] span.token {
	color: $paleblue-code;
}

[class*='language-bash'] span.token,
[class*='language-shell'] span.token {
	font-style: bold;
}

.token.prolog,
.token.comment,
[class*='language-bash'] span.token.comment,
[class*='language-shell'] span.token.comment {
	color: $paleblue-code;
}

.token.selector,
.token.tag,
.token.unit,
.token.url,
.token.variable,
.token.entity,
.token.deleted {
	color: $red-code;
}

.token.boolean,
.token.constant,
.token.doctype,
.token.number,
.token.regex,
.token.builtin,
.token.class,
.token.hexcode,
.token.class-name,
.token.attr-name {
	color: $yellow-code;
}

.token.atrule,
.token.attribute,
.token.attr-value .token.punctuation,
.token.attr-value,
.token.pseudo-class,
.token.pseudo-element,
.token.string {
	color: $green-code;
}

.token.symbol,
.token.function,
.token.id,
.token.important {
	color: $blue-code;
}

.token.important,
.token.id {
	font-weight: bold;
}

.token.cdata,
.token.char,
.token.property {
	color: $cyan-code;
}

.token.inserted {
	color: $green-code;
}

.token.keyword {
	color: $cyan-code;
	font-style: italic;
}

.token.operator {
	color: $paleblue-code;
}

.token.attr-value .token.attr-equals,
.token.punctuation {
	color: $paleblue-code;
}
```

then you need to import it into your [markdown layout](https://docs.astro.build/en/core-concepts/layouts/#markdown-layouts) component:
```astro
---
import './code.scss'; // path to your styling file
---
<!-- rest of your component -->
```

## Enjoy

now your markdown code snippets must be highlighted, feel free to change the colors in scss file.

![ with highlighting ](/images/blogs-assets/astro-syntax-highlighting-1.jpg)

## Trouble shooting

make sure your code langues are typed correctly! 