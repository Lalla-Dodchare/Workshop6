# HTML + CSS - Complete Guide

## Learning Progress
- [ ] CSS Syntax & Selectors
- [ ] Box Model
- [ ] Colors & Typography
- [ ] Display & Position
- [ ] Flexbox
- [ ] Grid
- [ ] Responsive & Media Queries
- [ ] Transitions & Animations

---

## 1. CSS Syntax & Selectors

### How to Add CSS

#### Inline CSS (avoid!)
```html
<p style="color: red; font-size: 16px;">Text</p>
```

#### Internal CSS (in `<head>`)
```html
<head>
    <style>
        p {
            color: red;
            font-size: 16px;
        }
    </style>
</head>
```

#### External CSS (best practice!)
```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

```css
/* styles.css */
p {
    color: red;
    font-size: 16px;
}
```

---

### CSS Syntax

```css
selector {
    property: value;
    property: value;
}
```

**Example:**
```css
h1 {
    color: blue;           /* text color */
    font-size: 32px;       /* font size */
    text-align: center;    /* alignment */
}
```

**Rules:**
- End each declaration with `;`
- Use `/* comment */` for comments
- CSS is case-insensitive (but lowercase is convention)

---

### Basic Selectors

#### Element Selector
```css
p {
    color: red;
}
/* Targets ALL <p> elements */
```

#### Class Selector
```css
.button {
    background: blue;
}
/* Targets <element class="button"> */
```

```html
<button class="button">Click</button>
<a class="button">Link</a>
```

#### ID Selector
```css
#header {
    background: gray;
}
/* Targets <element id="header"> */
/* Should be UNIQUE per page */
```

```html
<div id="header">Header</div>
```

#### Universal Selector
```css
* {
    margin: 0;
    padding: 0;
}
/* Targets ALL elements */
```

---

### Multiple Selectors

```css
/* Multiple elements */
h1, h2, h3 {
    color: navy;
}

/* Multiple classes */
.card, .box, .panel {
    border: 1px solid black;
}
```

---

### Combinators

#### Descendant Selector (space)
```css
div p {
    color: red;
}
/* ALL <p> inside <div>, any level deep */
```

```html
<div>
    <p>Red</p>
    <section>
        <p>Also red</p>
    </section>
</div>
```

#### Child Selector (>)
```css
div > p {
    color: blue;
}
/* Only DIRECT children <p> */
```

```html
<div>
    <p>Blue (direct child)</p>
    <section>
        <p>Not blue (grandchild)</p>
    </section>
</div>
```

#### Adjacent Sibling (+)
```css
h1 + p {
    font-weight: bold;
}
/* <p> immediately after <h1> */
```

```html
<h1>Title</h1>
<p>Bold (right after h1)</p>
<p>Not bold</p>
```

#### General Sibling (~)
```css
h1 ~ p {
    color: gray;
}
/* ALL <p> siblings after <h1> */
```

```html
<h1>Title</h1>
<p>Gray</p>
<div>...</div>
<p>Also gray</p>
```

---

### Attribute Selectors

```css
/* Has attribute */
[type] {
    border: 1px solid;
}

/* Exact value */
[type="text"] {
    background: yellow;
}

/* Contains word */
[class~="button"] {
    cursor: pointer;
}

/* Starts with */
[href^="https"] {
    color: green;
}

/* Ends with */
[src$=".jpg"] {
    border: 2px solid;
}

/* Contains substring */
[href*="google"] {
    color: blue;
}
```

```html
<input type="text">              <!-- Yellow background -->
<a href="https://google.com">   <!-- Green AND blue -->
<img src="photo.jpg">            <!-- 2px border -->
```

---

### Pseudo-classes (state)

```css
/* Link states */
a:link { color: blue; }          /* unvisited */
a:visited { color: purple; }     /* visited */
a:hover { color: red; }          /* mouse over */
a:active { color: orange; }      /* being clicked */
a:focus { outline: 2px solid; }  /* keyboard focus */

/* Form states */
input:focus { border-color: blue; }
input:disabled { opacity: 0.5; }
input:checked { background: green; }
input:required { border-left: 3px solid red; }
input:valid { border-color: green; }
input:invalid { border-color: red; }

/* Structural */
li:first-child { font-weight: bold; }
li:last-child { border: none; }
li:nth-child(2) { color: red; }       /* 2nd child */
li:nth-child(odd) { background: #f0f0f0; }
li:nth-child(even) { background: white; }
li:nth-child(3n) { color: blue; }     /* every 3rd */
li:nth-child(3n+1) { color: red; }    /* 1st, 4th, 7th... */

p:first-of-type { font-size: 20px; }
p:last-of-type { margin-bottom: 0; }
p:nth-of-type(2) { color: green; }

div:empty { display: none; }          /* no children */
p:not(.special) { color: gray; }      /* NOT .special */
```

**Hover Example:**
```css
button:hover {
    background: darkblue;
    transform: scale(1.05);
}
```

---

### Pseudo-elements (part of element)

```css
/* First letter */
p::first-letter {
    font-size: 2em;
    font-weight: bold;
}

/* First line */
p::first-line {
    font-variant: small-caps;
}

/* Before element */
.label::before {
    content: "★ ";
    color: gold;
}

/* After element */
.link::after {
    content: " →";
}

/* Selection highlight */
::selection {
    background: yellow;
    color: black;
}

/* Placeholder text */
input::placeholder {
    color: #999;
    font-style: italic;
}
```

**Example:**
```html
<p class="label">Important</p>
<!-- Displays as: ★ Important -->
```

---

### Specificity (priority)

**Higher specificity = wins!**

```css
/* Specificity from low to high */
p { color: red; }                 /* 1 (element) */
.text { color: blue; }            /* 10 (class) */
#main { color: green; }           /* 100 (id) */
p.text { color: orange; }         /* 11 (element + class) */
div p.text { color: purple; }     /* 12 */
#main .text { color: yellow; }    /* 110 (id + class) */
style="color: pink"               /* 1000 (inline) */
color: red !important;            /* 10000 (avoid!) */
```

**Calculation:**
- `style=""` = 1000
- `#id` = 100
- `.class`, `[attr]`, `:hover` = 10
- `element`, `::before` = 1

**Example:**
```css
div p { color: red; }        /* specificity: 2 */
.text { color: blue; }       /* specificity: 10 - WINS! */
```

---

### CSS Variables (Custom Properties)

```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --spacing: 16px;
    --font-main: 'Arial', sans-serif;
}

.button {
    background: var(--primary-color);
    padding: var(--spacing);
    font-family: var(--font-main);
}

.box {
    margin: calc(var(--spacing) * 2);  /* 32px */
}

/* Fallback value */
.text {
    color: var(--text-color, black);
}
```

**Dynamic with JavaScript:**
```javascript
document.documentElement.style.setProperty('--primary-color', '#e74c3c');
```

---

## 2. Box Model

Every element is a box with:
- **Content**: actual content (text, image)
- **Padding**: space inside, around content
- **Border**: edge around padding
- **Margin**: space outside, between elements

```
┌─────────────── margin ────────────────┐
│ ┌───────────── border ─────────────┐ │
│ │ ┌─────────── padding ──────────┐ │ │
│ │ │                               │ │ │
│ │ │          CONTENT              │ │ │
│ │ │                               │ │ │
│ │ └───────────────────────────────┘ │ │
│ └───────────────────────────────────┘ │
└───────────────────────────────────────┘
```

---

### Width & Height

```css
div {
    width: 300px;
    height: 200px;

    /* min/max */
    min-width: 200px;
    max-width: 500px;
    min-height: 100px;
    max-height: 400px;
}
```

**Units:**
```css
/* Absolute */
width: 300px;      /* pixels */
width: 2cm;        /* centimeters */
width: 1in;        /* inches */

/* Relative */
width: 50%;        /* % of parent */
width: 10em;       /* relative to font-size */
width: 2rem;       /* relative to root font-size */
width: 50vw;       /* 50% of viewport width */
width: 100vh;      /* 100% of viewport height */
width: 50vmin;     /* 50% of smaller dimension */
width: 50vmax;     /* 50% of larger dimension */
```

---

### Padding

```css
/* All sides */
padding: 20px;

/* Vertical | Horizontal */
padding: 10px 20px;

/* Top | Horizontal | Bottom */
padding: 10px 20px 15px;

/* Top | Right | Bottom | Left (clockwise) */
padding: 10px 20px 15px 5px;

/* Individual sides */
padding-top: 10px;
padding-right: 20px;
padding-bottom: 15px;
padding-left: 5px;
```

---

### Margin

```css
/* Same syntax as padding */
margin: 20px;
margin: 10px 20px;
margin: 10px 20px 15px 5px;

margin-top: 10px;
margin-right: 20px;
margin-bottom: 15px;
margin-left: 5px;

/* Center element */
margin: 0 auto;        /* horizontal center */

/* Negative margin */
margin-top: -10px;     /* pull element up */
```

**Margin Collapse:**
```css
/* Vertical margins collapse (take larger value) */
.box1 { margin-bottom: 20px; }
.box2 { margin-top: 30px; }
/* Actual space between = 30px (not 50px!) */
```

---

### Border

```css
/* Shorthand */
border: 2px solid black;
/* width | style | color */

/* Individual sides */
border-top: 1px solid red;
border-right: 2px dashed blue;
border-bottom: 3px dotted green;
border-left: 4px double orange;

/* Individual properties */
border-width: 2px;
border-style: solid;
border-color: black;

/* Border styles */
border-style: solid;    /* ─────── */
border-style: dashed;   /* - - - - */
border-style: dotted;   /* ········ */
border-style: double;   /* ═══════ */
border-style: groove;   /* carved in */
border-style: ridge;    /* coming out */
border-style: inset;    /* sunken */
border-style: outset;   /* raised */
border-style: none;     /* no border */
```

---

### Border Radius (rounded corners)

```css
/* All corners */
border-radius: 10px;

/* Top-left, Top-right, Bottom-right, Bottom-left */
border-radius: 10px 20px 30px 40px;

/* Individual corners */
border-top-left-radius: 10px;
border-top-right-radius: 20px;
border-bottom-right-radius: 30px;
border-bottom-left-radius: 40px;

/* Circle */
border-radius: 50%;

/* Pill shape */
border-radius: 9999px;
```

---

### Box Sizing

```css
/* Default (content-box) */
.box {
    width: 300px;
    padding: 20px;
    border: 5px solid;
    /* Total width = 300 + 20*2 + 5*2 = 350px */
}

/* Border-box (includes padding & border) */
.box {
    box-sizing: border-box;
    width: 300px;
    padding: 20px;
    border: 5px solid;
    /* Total width = 300px (easier!) */
}

/* Apply to all elements (recommended!) */
* {
    box-sizing: border-box;
}
```

---

### Outline

```css
/* Like border but doesn't affect layout */
outline: 2px solid red;
outline-offset: 5px;     /* space from element */

/* Remove default focus outline (careful!) */
button:focus {
    outline: none;       /* bad for accessibility */
}

/* Better alternative */
button:focus {
    outline: 2px solid blue;
    outline-offset: 2px;
}
```

---

### Box Shadow

```css
/* Syntax: x y blur spread color */
box-shadow: 5px 5px 10px rgba(0,0,0,0.3);

/* Multiple shadows */
box-shadow:
    0 2px 4px rgba(0,0,0,0.1),
    0 4px 8px rgba(0,0,0,0.1);

/* Inset shadow (inside) */
box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);

/* No shadow */
box-shadow: none;
```

**Examples:**
```css
/* Subtle elevation */
box-shadow: 0 2px 4px rgba(0,0,0,0.1);

/* Card hover effect */
.card:hover {
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

/* Glow effect */
box-shadow: 0 0 20px rgba(59,130,246,0.5);
```

---

## 3. Colors & Typography

### Color Values

```css
/* Named colors */
color: red;
color: blue;
color: transparent;

/* Hexadecimal */
color: #ff0000;      /* red */
color: #f00;         /* shorthand red */
color: #ff0000ff;    /* with alpha (transparency) */

/* RGB */
color: rgb(255, 0, 0);           /* red */
color: rgba(255, 0, 0, 0.5);     /* 50% transparent red */

/* HSL (Hue, Saturation, Lightness) */
color: hsl(0, 100%, 50%);        /* red */
color: hsla(0, 100%, 50%, 0.5);  /* 50% transparent red */

/* Modern syntax */
color: rgb(255 0 0 / 0.5);
color: hsl(0 100% 50% / 0.5);
```

---

### Text Color & Background

```css
.element {
    color: #333;                    /* text color */
    background-color: #f0f0f0;      /* background */
    background: linear-gradient(to right, red, blue);
}
```

---

### Font Family

```css
/* Single font */
font-family: Arial;

/* Font stack (fallbacks) */
font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

/* Generic families (always end with one) */
font-family: serif;       /* Times New Roman, Georgia */
font-family: sans-serif;  /* Arial, Helvetica */
font-family: monospace;   /* Courier, Monaco */
font-family: cursive;     /* Comic Sans, Brush Script */
font-family: fantasy;     /* Impact, Papyrus */
```

**Google Fonts:**
```html
<head>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
</head>
```

```css
body {
    font-family: 'Roboto', sans-serif;
}
```

---

### Font Size

```css
/* Absolute */
font-size: 16px;
font-size: 12pt;

/* Relative */
font-size: 1.5em;     /* 1.5 × parent font size */
font-size: 1.5rem;    /* 1.5 × root font size (usually 16px) */
font-size: 100%;      /* same as parent */

/* Keywords */
font-size: xx-small;
font-size: x-small;
font-size: small;
font-size: medium;
font-size: large;
font-size: x-large;
font-size: xx-large;

/* Relative keywords */
font-size: smaller;
font-size: larger;
```

**Recommended:**
```css
html { font-size: 16px; }    /* base size */
h1 { font-size: 2rem; }      /* 32px */
h2 { font-size: 1.5rem; }    /* 24px */
p { font-size: 1rem; }       /* 16px */
small { font-size: 0.875rem; } /* 14px */
```

---

### Font Weight

```css
font-weight: normal;     /* 400 */
font-weight: bold;       /* 700 */
font-weight: lighter;    /* relative to parent */
font-weight: bolder;     /* relative to parent */

/* Numeric (100-900) */
font-weight: 100;        /* Thin */
font-weight: 300;        /* Light */
font-weight: 400;        /* Normal */
font-weight: 500;        /* Medium */
font-weight: 700;        /* Bold */
font-weight: 900;        /* Black */
```

---

### Font Style

```css
font-style: normal;
font-style: italic;
font-style: oblique;
```

---

### Text Properties

```css
/* Alignment */
text-align: left;
text-align: right;
text-align: center;
text-align: justify;

/* Decoration */
text-decoration: none;
text-decoration: underline;
text-decoration: overline;
text-decoration: line-through;
text-decoration: underline wavy red;

/* Transform */
text-transform: none;
text-transform: uppercase;
text-transform: lowercase;
text-transform: capitalize;

/* Line height */
line-height: 1.5;        /* 1.5 × font size */
line-height: 24px;
line-height: 150%;

/* Letter spacing */
letter-spacing: 1px;
letter-spacing: 0.1em;

/* Word spacing */
word-spacing: 5px;

/* Text indent */
text-indent: 30px;

/* White space handling */
white-space: normal;     /* wrap text */
white-space: nowrap;     /* no wrapping */
white-space: pre;        /* keep spaces/newlines */
white-space: pre-wrap;   /* keep spaces, wrap lines */

/* Text overflow */
text-overflow: clip;
text-overflow: ellipsis; /* ... */
/* Requires: white-space: nowrap; overflow: hidden; */

/* Text shadow */
text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
text-shadow: 0 0 10px blue;
```

**Ellipsis Example:**
```css
.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
}
```

---

### Complete Typography Example

```css
body {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333;
}

h1 {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: #111;
}

p {
    margin-bottom: 1rem;
    line-height: 1.7;
}

.lead {
    font-size: 1.25rem;
    font-weight: 300;
    color: #666;
}

.small {
    font-size: 0.875rem;
    color: #999;
}
```

---

## 4. Display & Position

### Display Property

```css
/* Block: takes full width, new line */
display: block;

/* Inline: only takes needed width, same line */
display: inline;

/* Inline-block: inline but can set width/height */
display: inline-block;

/* None: completely hidden */
display: none;

/* Flex: flexible box layout */
display: flex;

/* Grid: grid layout */
display: grid;

/* Inline variations */
display: inline-flex;
display: inline-grid;
```

**Examples:**
```css
/* Block */
div, p, h1 { display: block; }

/* Inline */
span, a, strong { display: inline; }

/* Inline-block (buttons, badges) */
.button {
    display: inline-block;
    padding: 10px 20px;
}

/* Hide element */
.hidden {
    display: none;  /* removed from layout */
}
```

---

### Visibility

```css
/* Hidden but still takes space */
visibility: hidden;

/* Visible (default) */
visibility: visible;

/* Difference */
display: none;         /* removed from layout */
visibility: hidden;    /* invisible but takes space */
```

---

### Opacity

```css
opacity: 1;       /* fully visible */
opacity: 0.5;     /* 50% transparent */
opacity: 0;       /* invisible but still there */
```

---

### Position Property

```css
position: static;      /* default, normal flow */
position: relative;    /* relative to original position */
position: absolute;    /* relative to positioned parent */
position: fixed;       /* relative to viewport */
position: sticky;      /* hybrid of relative & fixed */
```

---

#### Static (default)

```css
.box {
    position: static;
    /* top, right, bottom, left have NO effect */
}
```

---

#### Relative

```css
.box {
    position: relative;
    top: 20px;       /* moves down 20px from original */
    left: 30px;      /* moves right 30px from original */
}
/* Original space is preserved */
```

---

#### Absolute

```css
.parent {
    position: relative;  /* creates positioning context */
}

.child {
    position: absolute;
    top: 0;
    right: 0;
    /* Positioned relative to .parent */
    /* Removed from normal flow */
}
```

**Examples:**
```css
/* Top-right corner */
.badge {
    position: absolute;
    top: 10px;
    right: 10px;
}

/* Center absolutely */
.centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* Full coverage */
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /* or width: 100%; height: 100%; */
}
```

---

#### Fixed

```css
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    /* Stays in place when scrolling */
}

.fab {
    position: fixed;
    bottom: 20px;
    right: 20px;
    /* Floating action button */
}
```

---

#### Sticky

```css
.header {
    position: sticky;
    top: 0;
    /* Acts relative until scroll reaches top: 0, then becomes fixed */
}

/* Table headers */
th {
    position: sticky;
    top: 0;
    background: white;
}
```

---

### Z-Index (stacking order)

```css
.back {
    position: relative;
    z-index: 1;
}

.front {
    position: relative;
    z-index: 10;  /* higher = on top */
}

/* Only works with positioned elements (not static) */
```

**Common values:**
```css
.dropdown { z-index: 1000; }
.modal-backdrop { z-index: 1040; }
.modal { z-index: 1050; }
.tooltip { z-index: 1060; }
```

---

### Overflow

```css
overflow: visible;    /* default, content can overflow */
overflow: hidden;     /* clip overflowing content */
overflow: scroll;     /* always show scrollbars */
overflow: auto;       /* scrollbars only when needed */

/* Individual axes */
overflow-x: auto;
overflow-y: hidden;
```

**Examples:**
```css
/* Scrollable container */
.container {
    height: 300px;
    overflow-y: auto;
}

/* Hide overflow */
.box {
    overflow: hidden;
}
```

---

### Float (legacy, use Flexbox instead)

```css
float: left;
float: right;
float: none;

/* Clear floats */
clear: left;
clear: right;
clear: both;
```

**Clearfix:**
```css
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
```

---

## 5. Flexbox (VERY IMPORTANT!)

**Flexbox = Flexible Box Layout**
- Best for 1-dimensional layouts (row OR column)
- Perfect for: navbars, cards, buttons, centering

---

### Flex Container (parent)

```css
.container {
    display: flex;  /* or inline-flex */
}
```

---

### Flex Direction

```css
flex-direction: row;             /* → (default) */
flex-direction: row-reverse;     /* ← */
flex-direction: column;          /* ↓ */
flex-direction: column-reverse;  /* ↑ */
```

**Example:**
```css
.navbar {
    display: flex;
    flex-direction: row;  /* items in a row → */
}

.sidebar {
    display: flex;
    flex-direction: column;  /* items in a column ↓ */
}
```

---

### Justify Content (main axis)

```css
justify-content: flex-start;     /* ▐■■■      (default) */
justify-content: flex-end;       /*      ■■■▌ */
justify-content: center;         /*   ■■■    */
justify-content: space-between;  /* ■   ■   ■ */
justify-content: space-around;   /*  ■  ■  ■  */
justify-content: space-evenly;   /*  ■  ■  ■  */
```

**Example:**
```css
/* Center horizontally */
.container {
    display: flex;
    justify-content: center;
}

/* Space between items */
.navbar {
    display: flex;
    justify-content: space-between;
}
```

---

### Align Items (cross axis)

```css
align-items: stretch;       /* |■| (default, fill height) */
align-items: flex-start;    /* |■‾ (top) */
align-items: flex-end;      /* |_■ (bottom) */
align-items: center;        /* |-■ (middle) */
align-items: baseline;      /* |■■ (text baseline) */
```

**Example:**
```css
/* Center vertically */
.container {
    display: flex;
    align-items: center;
}

/* Center both ways */
.container {
    display: flex;
    justify-content: center;  /* horizontal */
    align-items: center;      /* vertical */
    height: 100vh;
}
```

---

### Flex Wrap

```css
flex-wrap: nowrap;      /* ■■■■■■ (default, single line) */
flex-wrap: wrap;        /* ■■■
                           ■■■ (multiple lines) */
flex-wrap: wrap-reverse;
```

**Example:**
```css
.cards {
    display: flex;
    flex-wrap: wrap;  /* cards wrap to next line */
    gap: 20px;
}
```

---

### Align Content (multiple lines)

```css
/* Only works with flex-wrap: wrap */
align-content: flex-start;
align-content: flex-end;
align-content: center;
align-content: space-between;
align-content: space-around;
align-content: stretch;
```

---

### Gap (spacing between items)

```css
gap: 20px;              /* same for row and column */
gap: 10px 20px;         /* row-gap column-gap */

row-gap: 10px;
column-gap: 20px;
```

**Example:**
```css
.container {
    display: flex;
    gap: 16px;  /* 16px space between all items */
}
```

---

### Flex Items (children)

#### Flex Grow

```css
.item {
    flex-grow: 0;  /* default, don't grow */
    flex-grow: 1;  /* grow to fill space */
    flex-grow: 2;  /* grow 2× more than flex-grow: 1 */
}
```

**Example:**
```css
.sidebar {
    flex-grow: 0;  /* fixed width */
}

.main {
    flex-grow: 1;  /* takes remaining space */
}
```

---

#### Flex Shrink

```css
.item {
    flex-shrink: 1;  /* default, can shrink */
    flex-shrink: 0;  /* don't shrink */
}
```

---

#### Flex Basis

```css
.item {
    flex-basis: auto;     /* default */
    flex-basis: 200px;    /* initial size */
    flex-basis: 50%;      /* % of container */
}
```

---

#### Flex Shorthand

```css
/* flex: grow shrink basis */
flex: 0 1 auto;      /* default */
flex: 1;             /* grow: 1, shrink: 1, basis: 0 */
flex: 1 0 200px;     /* grow: 1, shrink: 0, basis: 200px */

/* Common patterns */
flex: 1;             /* flexible, fills space */
flex: 0 0 auto;      /* inflexible, natural size */
flex: 0 0 200px;     /* fixed width */
```

---

#### Align Self

```css
/* Override align-items for individual item */
.item {
    align-self: auto;        /* default, inherit from parent */
    align-self: flex-start;
    align-self: flex-end;
    align-self: center;
    align-self: stretch;
}
```

---

#### Order

```css
.item1 { order: 2; }
.item2 { order: 1; }  /* appears first */
.item3 { order: 3; }
/* Default order: 0 */
```

---

### Flexbox Examples

#### Navbar
```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

.nav-links {
    display: flex;
    gap: 2rem;
}
```

#### Card Grid
```css
.cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.card {
    flex: 0 0 calc(33.333% - 20px);  /* 3 columns */
}

/* Responsive */
@media (max-width: 768px) {
    .card {
        flex: 0 0 100%;  /* 1 column */
    }
}
```

#### Perfect Center
```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
```

#### Sticky Footer
```css
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

main {
    flex: 1;  /* takes remaining space */
}
```

---

## 6. Grid

**Grid = 2-dimensional layout**
- Best for complex layouts (rows AND columns)
- Perfect for: page layouts, dashboards, galleries

---

### Grid Container

```css
.container {
    display: grid;  /* or inline-grid */
}
```

---

### Grid Template Columns

```css
/* Fixed sizes */
grid-template-columns: 200px 200px 200px;  /* 3 columns, 200px each */

/* Auto-fill remaining space */
grid-template-columns: 200px 1fr;  /* 200px + fill remaining */
grid-template-columns: 1fr 1fr 1fr;  /* 3 equal columns */
grid-template-columns: 1fr 2fr 1fr;  /* middle column 2× wider */

/* Repeat notation */
grid-template-columns: repeat(3, 1fr);  /* 3 equal columns */
grid-template-columns: repeat(4, 100px);  /* 4 columns, 100px each */

/* Mixed */
grid-template-columns: 100px repeat(3, 1fr) 100px;

/* Auto-fit/Auto-fill (responsive) */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
grid-template-columns: repeat(auto-fill, 100px);
```

---

### Grid Template Rows

```css
/* Same syntax as columns */
grid-template-rows: 100px 200px;
grid-template-rows: repeat(3, 1fr);
grid-template-rows: auto 1fr auto;  /* header, content, footer */
```

---

### Gap (spacing)

```css
gap: 20px;              /* row and column gap */
gap: 10px 20px;         /* row-gap column-gap */

row-gap: 10px;
column-gap: 20px;
```

---

### Grid Areas (named layout)

```css
.container {
    display: grid;
    grid-template-areas:
        "header header header"
        "sidebar main main"
        "footer footer footer";
    grid-template-columns: 200px 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    gap: 20px;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

---

### Justify & Align (container)

```css
/* Horizontal alignment of grid */
justify-content: start;
justify-content: end;
justify-content: center;
justify-content: space-between;
justify-content: space-around;
justify-content: space-evenly;

/* Vertical alignment of grid */
align-content: start;
align-content: end;
align-content: center;
align-content: space-between;
align-content: space-around;
align-content: space-evenly;

/* Horizontal alignment of items in cells */
justify-items: start;
justify-items: end;
justify-items: center;
justify-items: stretch;  /* default */

/* Vertical alignment of items in cells */
align-items: start;
align-items: end;
align-items: center;
align-items: stretch;  /* default */

/* Shorthand */
place-content: center;        /* both justify & align content */
place-items: center;          /* both justify & align items */
```

---

### Grid Items (children)

#### Grid Column

```css
/* Start and end lines */
.item {
    grid-column-start: 1;
    grid-column-end: 3;  /* spans columns 1-2 */
}

/* Shorthand */
.item {
    grid-column: 1 / 3;  /* start / end */
    grid-column: 1 / span 2;  /* start / span */
    grid-column: span 2;  /* span 2 columns */
}
```

#### Grid Row

```css
.item {
    grid-row: 1 / 3;  /* spans rows 1-2 */
    grid-row: span 2;  /* spans 2 rows */
}
```

#### Grid Area

```css
.item {
    grid-area: 1 / 1 / 3 / 3;
    /* row-start / col-start / row-end / col-end */
}
```

---

#### Justify & Align Self

```css
/* Override container's justify-items/align-items */
.item {
    justify-self: start;
    justify-self: end;
    justify-self: center;
    justify-self: stretch;

    align-self: start;
    align-self: end;
    align-self: center;
    align-self: stretch;

    place-self: center;  /* both */
}
```

---

### Grid Examples

#### 3-Column Layout
```css
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}
```

#### Responsive Grid (auto-fit)
```css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}
/* Automatically adjusts number of columns */
```

#### Dashboard Layout
```css
.dashboard {
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: 60px 1fr 40px;
    grid-template-areas:
        "sidebar header"
        "sidebar main"
        "sidebar footer";
    gap: 20px;
    height: 100vh;
}

.sidebar { grid-area: sidebar; }
.header { grid-area: header; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

#### Gallery with Featured Item
```css
.gallery {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

.featured {
    grid-column: span 2;
    grid-row: span 2;
}
```

---

## 7. Responsive & Media Queries

### Mobile-First Approach

```css
/* Base styles (mobile) */
.container {
    padding: 10px;
    font-size: 14px;
}

/* Tablet and up */
@media (min-width: 768px) {
    .container {
        padding: 20px;
        font-size: 16px;
    }
}

/* Desktop and up */
@media (min-width: 1024px) {
    .container {
        padding: 40px;
        font-size: 18px;
    }
}
```

---

### Common Breakpoints

```css
/* Extra small (phones) */
@media (min-width: 0px) { }

/* Small (large phones) */
@media (min-width: 576px) { }

/* Medium (tablets) */
@media (min-width: 768px) { }

/* Large (laptops) */
@media (min-width: 1024px) { }

/* Extra large (desktops) */
@media (min-width: 1280px) { }

/* 2X large */
@media (min-width: 1536px) { }
```

---

### Media Query Types

```css
/* Screen */
@media screen { }

/* Print */
@media print { }

/* Screen AND min-width */
@media screen and (min-width: 768px) { }

/* Max-width (desktop-first) */
@media (max-width: 767px) { }

/* Range */
@media (min-width: 768px) and (max-width: 1023px) { }

/* Orientation */
@media (orientation: portrait) { }
@media (orientation: landscape) { }

/* Pixel density (retina) */
@media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 192dpi) { }

/* Prefer dark mode */
@media (prefers-color-scheme: dark) { }

/* Prefer reduced motion (accessibility) */
@media (prefers-reduced-motion: reduce) { }
```

---

### Responsive Images

```css
img {
    max-width: 100%;
    height: auto;
}
```

---

### Responsive Typography

```css
/* Base size */
html {
    font-size: 14px;
}

/* Scale up for larger screens */
@media (min-width: 768px) {
    html {
        font-size: 16px;
    }
}

@media (min-width: 1024px) {
    html {
        font-size: 18px;
    }
}

/* Now use rem for everything */
h1 { font-size: 2rem; }  /* Scales automatically */
```

---

### Container Queries (modern)

```css
.container {
    container-type: inline-size;
    container-name: card;
}

@container card (min-width: 400px) {
    .card-title {
        font-size: 2rem;
    }
}
```

---

### Responsive Layout Example

```css
/* Mobile: single column */
.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Large desktop: 4 columns */
@media (min-width: 1280px) {
    .grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

---

### Hide/Show on Different Screens

```css
/* Show only on mobile */
.mobile-only {
    display: block;
}

@media (min-width: 768px) {
    .mobile-only {
        display: none;
    }
}

/* Show only on desktop */
.desktop-only {
    display: none;
}

@media (min-width: 1024px) {
    .desktop-only {
        display: block;
    }
}
```

---

### Print Styles

```css
@media print {
    /* Hide navigation, buttons */
    nav, button, .no-print {
        display: none;
    }

    /* Black text on white background */
    body {
        color: black;
        background: white;
    }

    /* Expand links */
    a::after {
        content: " (" attr(href) ")";
    }

    /* Page breaks */
    h1, h2, h3 {
        page-break-after: avoid;
    }
}
```

---

### Dark Mode

```css
/* Default (light mode) */
:root {
    --bg-color: white;
    --text-color: black;
}

body {
    background: var(--bg-color);
    color: var(--text-color);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
    :root {
        --bg-color: #1a1a1a;
        --text-color: #f0f0f0;
    }
}
```

---

## 8. Transitions & Animations

### Transitions (state change)

```css
/* Syntax: property duration timing-function delay */
transition: all 0.3s ease 0s;

/* Individual properties */
transition-property: background-color;
transition-duration: 0.3s;
transition-timing-function: ease;
transition-delay: 0s;

/* Multiple properties */
transition: background 0.3s ease, transform 0.2s ease-in-out;
```

---

### Transition Properties

```css
/* All properties */
transition-property: all;

/* Specific properties */
transition-property: background-color;
transition-property: transform;
transition-property: opacity;

/* Multiple */
transition-property: background, color, transform;
```

---

### Timing Functions

```css
transition-timing-function: ease;         /* slow, fast, slow */
transition-timing-function: linear;       /* constant speed */
transition-timing-function: ease-in;      /* slow start */
transition-timing-function: ease-out;     /* slow end */
transition-timing-function: ease-in-out;  /* slow start & end */

/* Custom bezier curve */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* Steps */
transition-timing-function: steps(4, end);
```

---

### Transition Examples

```css
/* Button hover */
.button {
    background: blue;
    color: white;
    transition: all 0.3s ease;
}

.button:hover {
    background: darkblue;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

/* Link underline */
a {
    position: relative;
    text-decoration: none;
}

a::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: blue;
    transition: width 0.3s ease;
}

a:hover::after {
    width: 100%;
}

/* Fade in/out */
.modal {
    opacity: 0;
    transition: opacity 0.3s ease;
}

.modal.show {
    opacity: 1;
}
```

---

### Transforms

```css
/* Translate (move) */
transform: translateX(50px);      /* move right */
transform: translateY(-20px);     /* move up */
transform: translate(50px, -20px); /* x, y */

/* Scale (resize) */
transform: scale(1.5);            /* 1.5× larger */
transform: scale(0.5);            /* half size */
transform: scaleX(2);             /* stretch horizontally */
transform: scaleY(0.5);           /* compress vertically */
transform: scale(1.2, 0.8);       /* x, y */

/* Rotate */
transform: rotate(45deg);         /* clockwise */
transform: rotate(-90deg);        /* counter-clockwise */

/* Skew (slant) */
transform: skewX(20deg);
transform: skewY(10deg);
transform: skew(20deg, 10deg);

/* Multiple transforms */
transform: translate(50px, 100px) rotate(45deg) scale(1.5);

/* 3D transforms */
transform: rotateX(45deg);
transform: rotateY(45deg);
transform: rotateZ(45deg);  /* same as rotate() */
transform: translateZ(50px);
transform: perspective(500px) rotateY(45deg);
```

---

### Transform Origin

```css
/* Default: center */
transform-origin: center;

/* Keywords */
transform-origin: top left;
transform-origin: bottom right;
transform-origin: center center;

/* Precise */
transform-origin: 50% 50%;
transform-origin: 0 0;  /* top-left */
```

---

### Animations (keyframes)

```css
/* Define animation */
@keyframes slideIn {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Use animation */
.element {
    animation: slideIn 0.5s ease;
}
```

---

### Keyframes with Percentages

```css
@keyframes bounce {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px);
    }
    100% {
        transform: translateY(0);
    }
}

.ball {
    animation: bounce 1s infinite;
}
```

---

### Animation Properties

```css
/* Shorthand: name duration timing-function delay iteration-count direction fill-mode */
animation: fadeIn 1s ease 0s 1 normal forwards;

/* Individual properties */
animation-name: fadeIn;
animation-duration: 1s;
animation-timing-function: ease;
animation-delay: 0s;
animation-iteration-count: 1;        /* or infinite */
animation-direction: normal;         /* or reverse, alternate, alternate-reverse */
animation-fill-mode: forwards;       /* or backwards, both, none */
animation-play-state: running;       /* or paused */
```

---

### Animation Examples

```css
/* Fade in */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.fade-in {
    animation: fadeIn 0.5s ease;
}

/* Slide in from left */
@keyframes slideInLeft {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}

/* Pulse */
@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

.pulse {
    animation: pulse 2s infinite;
}

/* Spin */
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.spinner {
    animation: spin 1s linear infinite;
}

/* Shake */
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
}

.shake {
    animation: shake 0.5s;
}

/* Loading dots */
@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

.dot {
    animation: blink 1.4s infinite;
}

.dot:nth-child(2) {
    animation-delay: 0.2s;
}

.dot:nth-child(3) {
    animation-delay: 0.4s;
}
```

---

### Performance Tips

```css
/* Use transform & opacity for best performance */
/* GOOD */
.element {
    transition: transform 0.3s, opacity 0.3s;
}

/* AVOID (causes reflow) */
.element {
    transition: width 0.3s, height 0.3s, left 0.3s;
}

/* Enable hardware acceleration */
.element {
    transform: translateZ(0);
    will-change: transform;
}
```

---

## Complete Example: Animated Card

```css
.card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    transform: translateY(0);
}

.card:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
    transition: transform 0.3s ease;
}

.card:hover .card-image {
    transform: scale(1.05);
}

.card-title {
    font-size: 1.5rem;
    margin: 16px 0 8px;
    transition: color 0.3s ease;
}

.card:hover .card-title {
    color: #3498db;
}
```

---

## CSS Best Practices

1. **Use external CSS files** - Better organization and caching
2. **Use classes over IDs** - More reusable
3. **Use `box-sizing: border-box`** - Easier layouts
4. **Mobile-first responsive** - Start with mobile, scale up
5. **Use CSS variables** - Easier theming and maintenance
6. **Avoid `!important`** - Causes specificity problems
7. **Use Flexbox/Grid** - Avoid floats and absolute positioning
8. **Use semantic naming** - `.card` not `.box-style-1`
9. **Keep specificity low** - Easier to override
10. **Use shorthand** - `margin: 10px` not `margin-top: 10px; ...`

---

## Quick Reference

### Common Patterns

```css
/* Center absolutely */
.center-absolute {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* Center with flexbox */
.center-flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Full viewport */
.full-viewport {
    width: 100vw;
    height: 100vh;
}

/* Truncate text */
.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Circle */
.circle {
    border-radius: 50%;
    width: 100px;
    height: 100px;
}

/* Aspect ratio */
.aspect-ratio-16-9 {
    aspect-ratio: 16 / 9;
}

/* Sticky footer */
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

main {
    flex: 1;
}
```

---

## Next Steps

After mastering HTML + CSS:
1. **HTML + Tailwind**: Utility-first CSS (see [html-tailwind.md](html-tailwind.md))
2. **HTML + JS**: Add interactivity (see [html-js.md](html-js.md))
3. **HTML + CSS + JS**: Complete frontend (see [html-css-js.md](html-css-js.md))
4. **CSS Frameworks**: Bootstrap, Tailwind CSS
5. **CSS Preprocessors**: Sass, Less
6. **CSS-in-JS**: Styled Components, Emotion