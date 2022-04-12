---
title: Adding copy button to astro code snippets
date: 1645853484300
thumbnail: /images/blogs/adding-copy-button-to-astro-code-snippets.jpg
tags:
  - astro
  - markdown
  - javascript
  - webdevelopment
language: en
shortInfo: Lets fix the problem of Astro's markdown syntax Highlighting
titlePer: "اضافه کردن دکمه کپی به استرو"
shortInfoPer: "بیاید یک مشکل با سینتکس هایلایتینگ استرو رو حل کنیم"
---

## Problem

In [prevues](./astro-syntax-highlighting) blog posts, we spoke about how to add syntax highlighting to [Astro](https://astro.build), now we want to add the copy button which is almost present most the documenting websites.

## Problems with this approach
The biggest problem with the following approach is that, it is fully client side, and it might lead to performance decrease on low end / pages with a lot of code elements. 


## Process

we need to add a script to markdown pages layout, then get every "pre" element, then add the Copy button, we also need to add 2 event listeners to button, one for copying the content of the "pre" element to clip board, another one to re-position copy button on pre tag horizontal scroll.

### Getting pre tags
```javascript
const elements = document.getElementsByTagName('pre'); // getting every pre tag element on the current page
```

### Looping throw each element
```javascript
for( let i = 0; i < elements.length; i++ ) {
  // here, we need to create a button and add the required event listeners to it!
}
```

### Saving the pre Element and it's inner text to a variable
```javascript
const preElement = elements[i];
const innerText = preElement.innerText; // we need to save it before appending button element to it, other wise we need to remove button inner text from it
```

### Creating button element
```javascript
const button = document.createElement('button');
button.innerText = 'Copy';
button.setAttribute('class', 'copy-button'); // for styling purposes
```

### Adding event listeners
```javascript
// re-positions button on scroll of preElement
preElement.addEventListener('scroll', (e) => {
  button.style = `transform:translateX(${e.target.scrollLeft}px)`
});

// copies preElement inner tex to the clipboard
button.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(innerText);

    // the following part is only for visuals
    if( button.innerText === 'Copied') return;
    button.innerText = 'Copied';
    setTimeout( () => {
      button.innerText = 'Copy';
    }, 1000 );

  } catch( err ) {
    console.error(err)
  }
})
```

### Adding button to the preElement
```javascript
preElement && preElement.appendChild(button);
```

### Putting it all together

your astro component script tag should look like something like this.

```astro
<script>
  const elements = document.getElementsByTagName('pre');
  for( let i = 0; i < elements.length; i++ ) {
    const preElement = elements[i];
    const innerText = preElement.innerText;
    const button = document.createElement('button');
    button.innerText = 'Copy';
    button.setAttribute('class', 'copy-button');
    preElement.addEventListener('scroll', (e) => {
      button.style = `transform:translateX(${e.target.scrollLeft}px)`
    });
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(innerText);
        if( button.innerText === 'Copied') return;
        button.innerText = 'Copied';
        setTimeout( () => {
          button.innerText = 'Copy';
        }, 1000 );
      } catch( err ) {
        console.error(err)
      }
    })
    preElement && preElement.appendChild(button);
  }
</script>
```