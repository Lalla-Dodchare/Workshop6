# HTML Pure - Complete Guide

## Learning Progress
- [ ] Document Structure
- [ ] Text Content
- [ ] Links
- [ ] Images
- [ ] Lists
- [ ] Tables
- [ ] Forms
- [ ] Semantic HTML
- [ ] Media Elements
- [ ] Meta & Head Elements
- [ ] Global Attributes
- [ ] Entities & Special Characters

---

## 1. Document Structure

### Basic Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
    <!-- Content here -->
</body>
</html>
```

### Explanation
| Tag | Purpose |
|-----|---------|
| `<!DOCTYPE html>` | Declares HTML5 document |
| `<html>` | Root element, wraps everything |
| `<head>` | Metadata (not visible on page) |
| `<body>` | Visible content |

### lang attribute
```html
<html lang="en">    <!-- English -->
<html lang="th">    <!-- Thai -->
<html lang="ja">    <!-- Japanese -->
```

**Future use:**
- CSS: styles everything inside `<body>`
- JS: manipulates elements inside `<body>`
- CSS file linked in `<head>` with `<link>`
- JS file linked with `<script>`

---

## 2. Text Content

### Headings (h1-h6)
```html
<h1>Main Title (only 1 per page)</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>
<h4>Sub-subsection</h4>
<h5>Small heading</h5>
<h6>Smallest heading</h6>
```

**Rules:**
- Only ONE `<h1>` per page (SEO important)
- Don't skip levels (h1 -> h3 is bad)
- Use for structure, NOT for styling

**Future use:**
- CSS: change size, color, font
- JS: can change heading text dynamically

### Paragraphs
```html
<p>This is a paragraph. Browser adds space above and below automatically.</p>
<p>Another paragraph here.</p>
```

### Line Break & Horizontal Rule
```html
<p>Line one<br>Line two</p>    <!-- br = break, no closing tag -->
<hr>                           <!-- hr = horizontal rule (line) -->
```

### Text Formatting
```html
<strong>Important text (bold)</strong>      <!-- semantic: important -->
<b>Bold text</b>                            <!-- visual only -->

<em>Emphasized text (italic)</em>           <!-- semantic: emphasis -->
<i>Italic text</i>                          <!-- visual only -->

<mark>Highlighted text</mark>               <!-- yellow background -->
<del>Deleted text</del>                     <!-- strikethrough -->
<ins>Inserted text</ins>                    <!-- underline -->
<sub>Subscript</sub>                        <!-- H<sub>2</sub>O = H2O -->
<sup>Superscript</sup>                      <!-- x<sup>2</sup> = x2 -->
<small>Smaller text</small>
<code>Code snippet</code>                   <!-- monospace font -->
<pre>Preformatted    text</pre>             <!-- keeps spaces/newlines -->
<blockquote>Long quote from another source</blockquote>
<q>Short inline quote</q>                   <!-- adds quotation marks -->
<abbr title="HyperText Markup Language">HTML</abbr>  <!-- abbreviation -->
<address>Contact info</address>
<cite>Title of a work</cite>
<kbd>Keyboard input</kbd>                   <!-- Press <kbd>Ctrl</kbd> -->
<samp>Sample output</samp>
<var>Variable</var>                         <!-- x = <var>y</var> + 2 -->
```

**Semantic vs Visual:**
- `<strong>` = "this is important" (screen readers emphasize)
- `<b>` = "make it bold" (no meaning)
- Prefer semantic tags!

**Future use:**
- CSS: override all these styles
- JS: change text content with `.textContent` or `.innerHTML`

---

## 3. Links (Anchor)

### Basic Link
```html
<a href="https://google.com">Go to Google</a>
```

### Link Targets
```html
<a href="url" target="_self">Same tab (default)</a>
<a href="url" target="_blank">New tab</a>
```

### Link Types
```html
<!-- External link -->
<a href="https://example.com">External Site</a>

<!-- Internal link (same website) -->
<a href="/about.html">About Page</a>
<a href="contact.html">Contact (relative)</a>

<!-- Email link -->
<a href="mailto:hello@example.com">Send Email</a>

<!-- Phone link -->
<a href="tel:+66812345678">Call Us</a>

<!-- Download link -->
<a href="file.pdf" download>Download PDF</a>
<a href="file.pdf" download="custom-name.pdf">Download with custom name</a>

<!-- Jump to section (anchor) -->
<a href="#section1">Jump to Section 1</a>
...
<h2 id="section1">Section 1</h2>

<!-- Jump to top -->
<a href="#">Back to Top</a>
```

### Link with Title (tooltip)
```html
<a href="url" title="This shows on hover">Link</a>
```

### Link Relationships
```html
<a href="url" rel="noopener noreferrer">Safe external link</a>
<a href="url" rel="nofollow">Don't follow (SEO)</a>
```

**Future use:**
- CSS: style `:link`, `:visited`, `:hover`, `:active` states
- JS: prevent default, handle click events

---

## 4. Images

### Basic Image
```html
<img src="photo.jpg" alt="Description of image">
```

### Image Attributes
```html
<img
    src="photo.jpg"           <!-- source (required) -->
    alt="A cat sleeping"      <!-- alternative text (required for accessibility) -->
    width="300"               <!-- width in pixels -->
    height="200"              <!-- height in pixels -->
    title="Hover tooltip"     <!-- shows on hover -->
    loading="lazy"            <!-- lazy load (loads when scrolled to) -->
>
```

### Image Sources
```html
<!-- Local image -->
<img src="images/photo.jpg" alt="...">
<img src="../images/photo.jpg" alt="...">  <!-- parent folder -->

<!-- External image -->
<img src="https://example.com/photo.jpg" alt="...">

<!-- Base64 image (embedded) -->
<img src="data:image/png;base64,..." alt="...">
```

### Figure & Figcaption
```html
<figure>
    <img src="chart.png" alt="Sales chart 2024">
    <figcaption>Figure 1: Sales performance in 2024</figcaption>
</figure>
```

### Image as Link
```html
<a href="https://example.com">
    <img src="logo.png" alt="Company Logo">
</a>
```

### Picture Element (responsive images)
```html
<picture>
    <source media="(min-width: 800px)" srcset="large.jpg">
    <source media="(min-width: 400px)" srcset="medium.jpg">
    <img src="small.jpg" alt="Responsive image">
</picture>
```

**Important:**
- ALWAYS use `alt` attribute (accessibility + SEO)
- Empty `alt=""` for decorative images
- `<img>` is self-closing (no `</img>`)

**Future use:**
- CSS: resize, borders, filters, object-fit
- JS: change src, create galleries, lazy load

---

## 5. Lists

### Unordered List (bullets)
```html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```

### Ordered List (numbers)
```html
<ol>
    <li>First step</li>
    <li>Second step</li>
    <li>Third step</li>
</ol>

<!-- Start from different number -->
<ol start="5">
    <li>This is 5</li>
    <li>This is 6</li>
</ol>

<!-- Reverse order -->
<ol reversed>
    <li>This is 3</li>
    <li>This is 2</li>
    <li>This is 1</li>
</ol>

<!-- Different types -->
<ol type="A">...</ol>  <!-- A, B, C -->
<ol type="a">...</ol>  <!-- a, b, c -->
<ol type="I">...</ol>  <!-- I, II, III -->
<ol type="i">...</ol>  <!-- i, ii, iii -->
```

### Nested Lists
```html
<ul>
    <li>Fruits
        <ul>
            <li>Apple</li>
            <li>Banana</li>
        </ul>
    </li>
    <li>Vegetables
        <ul>
            <li>Carrot</li>
            <li>Broccoli</li>
        </ul>
    </li>
</ul>
```

### Description List
```html
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language - structure of web pages</dd>

    <dt>CSS</dt>
    <dd>Cascading Style Sheets - styling of web pages</dd>

    <dt>JS</dt>
    <dd>JavaScript - interactivity of web pages</dd>
</dl>
```

**Future use:**
- CSS: custom bullets, horizontal lists, styled menus
- JS: add/remove items dynamically, drag & drop

---

## 6. Tables

### Basic Table
```html
<table>
    <tr>
        <th>Name</th>
        <th>Age</th>
        <th>City</th>
    </tr>
    <tr>
        <td>John</td>
        <td>25</td>
        <td>Bangkok</td>
    </tr>
    <tr>
        <td>Jane</td>
        <td>30</td>
        <td>Chiang Mai</td>
    </tr>
</table>
```

### Complete Table Structure
```html
<table>
    <caption>Employee List</caption>

    <thead>
        <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <td>John</td>
            <td>Developer</td>
            <td>50,000</td>
        </tr>
        <tr>
            <td>Jane</td>
            <td>Designer</td>
            <td>45,000</td>
        </tr>
    </tbody>

    <tfoot>
        <tr>
            <td colspan="2">Total</td>
            <td>95,000</td>
        </tr>
    </tfoot>
</table>
```

### Table Elements
| Tag | Purpose |
|-----|---------|
| `<table>` | Table container |
| `<caption>` | Table title |
| `<thead>` | Header section |
| `<tbody>` | Body section |
| `<tfoot>` | Footer section |
| `<tr>` | Table row |
| `<th>` | Header cell (bold, centered) |
| `<td>` | Data cell |

### Spanning Cells
```html
<!-- Colspan: merge columns -->
<tr>
    <td colspan="2">This spans 2 columns</td>
</tr>

<!-- Rowspan: merge rows -->
<tr>
    <td rowspan="3">This spans 3 rows</td>
    <td>Row 1</td>
</tr>
<tr>
    <td>Row 2</td>
</tr>
<tr>
    <td>Row 3</td>
</tr>
```

### Table with Scope (accessibility)
```html
<table>
    <tr>
        <th scope="col">Name</th>
        <th scope="col">Age</th>
    </tr>
    <tr>
        <th scope="row">John</th>
        <td>25</td>
    </tr>
</table>
```

**Future use:**
- CSS: borders, colors, hover effects, responsive tables
- JS: sort, filter, pagination, editable cells

---

## 7. Forms (IMPORTANT!)

### Basic Form
```html
<form action="/submit" method="POST">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    <button type="submit">Submit</button>
</form>
```

### Form Attributes
```html
<form
    action="/api/submit"      <!-- where to send data -->
    method="POST"             <!-- POST or GET -->
    enctype="multipart/form-data"  <!-- needed for file upload -->
    autocomplete="off"        <!-- disable autocomplete -->
    novalidate                <!-- disable HTML validation -->
>
```

### Input Types
```html
<!-- Text inputs -->
<input type="text" placeholder="Enter name">
<input type="email" placeholder="Enter email">
<input type="password" placeholder="Enter password">
<input type="tel" placeholder="Phone number">
<input type="url" placeholder="Website URL">
<input type="search" placeholder="Search...">

<!-- Number inputs -->
<input type="number" min="0" max="100" step="1">
<input type="range" min="0" max="100" value="50">

<!-- Date/Time inputs -->
<input type="date">
<input type="time">
<input type="datetime-local">
<input type="month">
<input type="week">

<!-- Selection inputs -->
<input type="checkbox" id="agree">
<input type="radio" name="gender" value="male">
<input type="radio" name="gender" value="female">

<!-- Other inputs -->
<input type="color">
<input type="file" accept="image/*">
<input type="file" accept=".pdf,.doc" multiple>
<input type="hidden" name="token" value="abc123">
```

### Input Attributes
```html
<input
    type="text"
    id="username"             <!-- for label connection -->
    name="username"           <!-- sent to server -->
    value="default"           <!-- default value -->
    placeholder="Enter..."    <!-- hint text -->
    required                  <!-- must fill -->
    disabled                  <!-- can't edit -->
    readonly                  <!-- can't edit but sent -->
    autofocus                 <!-- focus on page load -->
    autocomplete="off"
    minlength="3"
    maxlength="20"
    pattern="[A-Za-z]+"       <!-- regex validation -->
    size="30"                 <!-- visible width -->
>

<!-- Number specific -->
<input type="number" min="1" max="100" step="5">

<!-- File specific -->
<input type="file" accept="image/*" multiple>
```

### Labels (Important for accessibility!)
```html
<!-- Method 1: for/id connection -->
<label for="email">Email:</label>
<input type="email" id="email" name="email">

<!-- Method 2: wrap input -->
<label>
    Email:
    <input type="email" name="email">
</label>
```

### Textarea
```html
<textarea
    name="message"
    rows="5"
    cols="30"
    placeholder="Enter your message..."
    maxlength="500"
></textarea>
```

### Select Dropdown
```html
<label for="country">Country:</label>
<select id="country" name="country">
    <option value="">-- Select --</option>
    <option value="th">Thailand</option>
    <option value="jp" selected>Japan</option>
    <option value="us">USA</option>
</select>

<!-- With groups -->
<select name="car">
    <optgroup label="Japanese">
        <option value="toyota">Toyota</option>
        <option value="honda">Honda</option>
    </optgroup>
    <optgroup label="German">
        <option value="bmw">BMW</option>
        <option value="mercedes">Mercedes</option>
    </optgroup>
</select>

<!-- Multiple selection -->
<select name="skills" multiple size="4">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
</select>
```

### Datalist (autocomplete suggestions)
```html
<input list="browsers" name="browser">
<datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
    <option value="Safari">
    <option value="Edge">
</datalist>
```

### Buttons
```html
<button type="submit">Submit Form</button>
<button type="reset">Reset Form</button>
<button type="button">Just a Button</button>

<!-- Input buttons (old way) -->
<input type="submit" value="Submit">
<input type="reset" value="Reset">
<input type="button" value="Click me">
```

### Fieldset & Legend (grouping)
```html
<fieldset>
    <legend>Personal Information</legend>

    <label for="fname">First Name:</label>
    <input type="text" id="fname" name="fname">

    <label for="lname">Last Name:</label>
    <input type="text" id="lname" name="lname">
</fieldset>

<fieldset disabled>
    <legend>Disabled Section</legend>
    <!-- all inputs here are disabled -->
</fieldset>
```

### Output Element
```html
<form oninput="result.value = parseInt(a.value) + parseInt(b.value)">
    <input type="number" id="a" value="0"> +
    <input type="number" id="b" value="0"> =
    <output name="result" for="a b">0</output>
</form>
```

### Progress & Meter
```html
<!-- Progress bar -->
<progress value="70" max="100">70%</progress>

<!-- Meter (gauge) -->
<meter value="0.7" min="0" max="1" low="0.3" high="0.7" optimum="0.8">70%</meter>
```

### Complete Form Example
```html
<form action="/register" method="POST">
    <fieldset>
        <legend>Registration Form</legend>

        <div>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required minlength="3">
        </div>

        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>

        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required minlength="8">
        </div>

        <div>
            <label for="dob">Date of Birth:</label>
            <input type="date" id="dob" name="dob">
        </div>

        <div>
            <label>Gender:</label>
            <input type="radio" id="male" name="gender" value="male">
            <label for="male">Male</label>
            <input type="radio" id="female" name="gender" value="female">
            <label for="female">Female</label>
        </div>

        <div>
            <label for="country">Country:</label>
            <select id="country" name="country">
                <option value="">Select...</option>
                <option value="th">Thailand</option>
                <option value="jp">Japan</option>
            </select>
        </div>

        <div>
            <input type="checkbox" id="agree" name="agree" required>
            <label for="agree">I agree to terms</label>
        </div>

        <div>
            <button type="submit">Register</button>
            <button type="reset">Clear</button>
        </div>
    </fieldset>
</form>
```

**Future use:**
- CSS: beautiful form styling, custom checkboxes/radios
- JS: validation, submit handling, dynamic forms

---

## 8. Semantic HTML

### Page Structure
```html
<body>
    <header>
        <!-- Logo, site title, main navigation -->
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <!-- Main content (only ONE per page) -->

        <article>
            <!-- Self-contained content (blog post, news article) -->
            <header>
                <h1>Article Title</h1>
                <time datetime="2024-01-15">January 15, 2024</time>
            </header>

            <section>
                <!-- Thematic grouping -->
                <h2>Section Title</h2>
                <p>Content...</p>
            </section>

            <footer>
                <p>Written by John Doe</p>
            </footer>
        </article>

        <aside>
            <!-- Sidebar content, related info -->
        </aside>
    </main>

    <footer>
        <!-- Copyright, links, contact -->
        <p>&copy; 2024 Company Name</p>
    </footer>
</body>
```

### Semantic Elements
| Tag | Purpose | When to use |
|-----|---------|-------------|
| `<header>` | Introductory content | Top of page, top of article |
| `<nav>` | Navigation links | Main menu, breadcrumbs |
| `<main>` | Main content | Only ONE per page |
| `<article>` | Self-contained content | Blog post, news, comment |
| `<section>` | Thematic grouping | Chapters, tabs |
| `<aside>` | Side content | Sidebar, related links |
| `<footer>` | Footer content | Bottom of page/article |
| `<figure>` | Image with caption | Illustrations, diagrams |
| `<figcaption>` | Caption for figure | |
| `<time>` | Date/time | `<time datetime="2024-01-15">` |
| `<address>` | Contact info | |
| `<details>` | Collapsible content | FAQ, spoilers |
| `<summary>` | Summary for details | |
| `<dialog>` | Dialog box/modal | Popups |

### Details & Summary (collapsible)
```html
<details>
    <summary>Click to expand</summary>
    <p>Hidden content here...</p>
</details>

<details open>
    <summary>Already open</summary>
    <p>Visible by default</p>
</details>
```

### Dialog (modal)
```html
<dialog id="myDialog">
    <h2>Dialog Title</h2>
    <p>Dialog content here</p>
    <button onclick="this.parentElement.close()">Close</button>
</dialog>

<button onclick="document.getElementById('myDialog').showModal()">
    Open Dialog
</button>
```

### Time Element
```html
<time datetime="2024-01-15">January 15, 2024</time>
<time datetime="14:30">2:30 PM</time>
<time datetime="2024-01-15T14:30">Jan 15, 2024 at 2:30 PM</time>
<time datetime="P3D">3 days</time>
```

**Why Semantic HTML?**
1. **SEO**: Search engines understand content better
2. **Accessibility**: Screen readers can navigate
3. **Maintainability**: Code is self-documenting
4. **Consistency**: Standard structure

**Future use:**
- CSS: target semantic elements directly
- JS: navigate DOM structure meaningfully

---

## 9. Media Elements

### Audio
```html
<audio src="song.mp3" controls></audio>

<!-- With fallbacks -->
<audio controls>
    <source src="song.mp3" type="audio/mpeg">
    <source src="song.ogg" type="audio/ogg">
    Your browser doesn't support audio.
</audio>

<!-- All attributes -->
<audio
    src="song.mp3"
    controls              <!-- show controls -->
    autoplay              <!-- auto play (usually blocked) -->
    loop                  <!-- repeat -->
    muted                 <!-- start muted -->
    preload="auto"        <!-- auto, metadata, none -->
></audio>
```

### Video
```html
<video src="video.mp4" controls width="640" height="360"></video>

<!-- With fallbacks -->
<video controls width="640" height="360">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    Your browser doesn't support video.
</video>

<!-- All attributes -->
<video
    src="video.mp4"
    controls
    autoplay
    loop
    muted
    poster="thumbnail.jpg"   <!-- preview image -->
    preload="auto"
    width="640"
    height="360"
    playsinline              <!-- for mobile (no fullscreen) -->
></video>

<!-- With subtitles -->
<video controls>
    <source src="video.mp4" type="video/mp4">
    <track src="subtitles_en.vtt" kind="subtitles" srclang="en" label="English">
    <track src="subtitles_th.vtt" kind="subtitles" srclang="th" label="Thai" default>
</video>
```

### Embed External Content
```html
<!-- YouTube -->
<iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/VIDEO_ID"
    frameborder="0"
    allowfullscreen
></iframe>

<!-- Google Maps -->
<iframe
    src="https://www.google.com/maps/embed?..."
    width="600"
    height="450"
    loading="lazy"
></iframe>

<!-- Any webpage -->
<iframe src="https://example.com" width="100%" height="500"></iframe>
```

### Object & Embed (legacy)
```html
<!-- PDF -->
<object data="document.pdf" type="application/pdf" width="600" height="400">
    <p>PDF cannot be displayed. <a href="document.pdf">Download</a></p>
</object>

<!-- Embed (legacy) -->
<embed src="game.swf" type="application/x-shockwave-flash">
```

### Canvas (for drawing with JS)
```html
<canvas id="myCanvas" width="400" height="300">
    Your browser doesn't support canvas.
</canvas>
```

### SVG (vector graphics)
```html
<!-- Inline SVG -->
<svg width="100" height="100">
    <circle cx="50" cy="50" r="40" fill="red" />
</svg>

<!-- External SVG -->
<img src="icon.svg" alt="Icon">

<!-- SVG as object (can style with CSS) -->
<object data="icon.svg" type="image/svg+xml"></object>
```

**Future use:**
- CSS: resize, filters, responsive media
- JS: play/pause, current time, custom controls

---

## 10. Meta & Head Elements

### Essential Meta Tags
```html
<head>
    <!-- Character encoding (MUST be first) -->
    <meta charset="UTF-8">

    <!-- Responsive viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Page title -->
    <title>Page Title - Site Name</title>

    <!-- Description (shows in search results) -->
    <meta name="description" content="A brief description of the page content.">

    <!-- Keywords (not important for SEO anymore) -->
    <meta name="keywords" content="html, css, javascript">

    <!-- Author -->
    <meta name="author" content="John Doe">
</head>
```

### SEO & Social Meta Tags
```html
<head>
    <!-- Open Graph (Facebook, LinkedIn) -->
    <meta property="og:title" content="Page Title">
    <meta property="og:description" content="Description">
    <meta property="og:image" content="https://example.com/image.jpg">
    <meta property="og:url" content="https://example.com/page">
    <meta property="og:type" content="website">

    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Page Title">
    <meta name="twitter:description" content="Description">
    <meta name="twitter:image" content="https://example.com/image.jpg">
</head>
```

### Favicon
```html
<head>
    <!-- Basic favicon -->
    <link rel="icon" href="/favicon.ico">

    <!-- Modern favicons -->
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

    <!-- SVG favicon (modern browsers) -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
</head>
```

### Linking Resources
```html
<head>
    <!-- CSS stylesheet -->
    <link rel="stylesheet" href="styles.css">

    <!-- Preload important resources -->
    <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>

    <!-- Preconnect to external domains -->
    <link rel="preconnect" href="https://fonts.googleapis.com">

    <!-- DNS prefetch -->
    <link rel="dns-prefetch" href="https://api.example.com">

    <!-- Canonical URL (SEO) -->
    <link rel="canonical" href="https://example.com/page">

    <!-- Alternate languages -->
    <link rel="alternate" hreflang="th" href="https://example.com/th/page">
    <link rel="alternate" hreflang="en" href="https://example.com/en/page">
</head>
```

### Other Meta Tags
```html
<head>
    <!-- Refresh/Redirect -->
    <meta http-equiv="refresh" content="5">                    <!-- refresh after 5s -->
    <meta http-equiv="refresh" content="0; url=https://...">   <!-- immediate redirect -->

    <!-- Robots (search engines) -->
    <meta name="robots" content="index, follow">               <!-- default -->
    <meta name="robots" content="noindex, nofollow">           <!-- don't index -->

    <!-- Theme color (mobile browser) -->
    <meta name="theme-color" content="#4285f4">

    <!-- Disable phone number detection (iOS) -->
    <meta name="format-detection" content="telephone=no">
</head>
```

### Script Tags
```html
<!-- In head (blocks rendering) -->
<script src="script.js"></script>

<!-- Defer (waits for HTML to parse) -->
<script src="script.js" defer></script>

<!-- Async (loads in parallel) -->
<script src="analytics.js" async></script>

<!-- Inline script -->
<script>
    console.log('Hello');
</script>

<!-- Module script -->
<script type="module" src="app.js"></script>

<!-- At end of body (traditional) -->
<body>
    ...
    <script src="script.js"></script>
</body>
```

### Base URL
```html
<head>
    <base href="https://example.com/" target="_blank">
    <!-- All relative URLs will use this base -->
</head>
```

---

## 11. Global Attributes

These attributes can be used on ANY HTML element:

```html
<div
    id="unique-id"           <!-- unique identifier -->
    class="class1 class2"    <!-- CSS classes (can have multiple) -->
    style="color: red;"      <!-- inline CSS (avoid!) -->
    title="Tooltip text"     <!-- hover tooltip -->
    hidden                   <!-- hide element -->
    tabindex="1"             <!-- tab order -->
    contenteditable="true"   <!-- make editable -->
    draggable="true"         <!-- make draggable -->
    spellcheck="true"        <!-- enable spell check -->
    translate="no"           <!-- don't translate -->
    dir="ltr"                <!-- text direction (ltr/rtl) -->
    lang="en"                <!-- language -->
>
```

### Data Attributes (custom data)
```html
<div
    data-id="123"
    data-user-name="john"
    data-is-active="true"
>
    <!-- Access with JS: element.dataset.id, element.dataset.userName -->
</div>
```

### ARIA Attributes (accessibility)
```html
<button aria-label="Close">X</button>
<div role="alert" aria-live="polite">Message here</div>
<nav aria-labelledby="nav-title">
    <h2 id="nav-title">Main Navigation</h2>
</nav>
<input aria-required="true" aria-invalid="false">
```

### Event Attributes (prefer JS instead)
```html
<button onclick="handleClick()">Click</button>
<input onchange="handleChange()">
<form onsubmit="handleSubmit()">
<div onmouseover="handleHover()">
```

**Future use:**
- CSS: target by id (`#id`), class (`.class`), attribute (`[data-id]`)
- JS: `getElementById`, `querySelector`, `dataset`

---

## 12. Entities & Special Characters

### Common Entities
```html
&nbsp;      <!-- non-breaking space -->
&lt;        <!-- < -->
&gt;        <!-- > -->
&amp;       <!-- & -->
&quot;      <!-- " -->
&apos;      <!-- ' -->
&copy;      <!-- © -->
&reg;       <!-- ® -->
&trade;     <!-- ™ -->
```

### Arrows
```html
&larr;      <!-- ← -->
&rarr;      <!-- → -->
&uarr;      <!-- ↑ -->
&darr;      <!-- ↓ -->
```

### Math
```html
&plus;      <!-- + -->
&minus;     <!-- − -->
&times;     <!-- × -->
&divide;    <!-- ÷ -->
&ne;        <!-- ≠ -->
&le;        <!-- ≤ -->
&ge;        <!-- ≥ -->
```

### Currency
```html
&euro;      <!-- € -->
&pound;     <!-- £ -->
&yen;       <!-- ¥ -->
&cent;      <!-- ¢ -->
```

### Other Useful
```html
&bull;      <!-- • bullet -->
&hellip;    <!-- … ellipsis -->
&mdash;     <!-- — em dash -->
&ndash;     <!-- – en dash -->
&deg;       <!-- ° degree -->
&para;      <!-- ¶ paragraph -->
&sect;      <!-- § section -->
```

### Unicode (alternative)
```html
&#60;       <!-- < (decimal) -->
&#x3C;      <!-- < (hex) -->
&#169;      <!-- © -->
&#x00A9;    <!-- © -->
```

---

## Deprecated/Obsolete Tags (Don't Use!)

These are OLD HTML tags - use CSS instead:

| Old Tag | Use Instead |
|---------|-------------|
| `<center>` | CSS `text-align: center` |
| `<font>` | CSS `font-family`, `color`, `font-size` |
| `<big>` | CSS `font-size` |
| `<strike>`, `<s>` | `<del>` or CSS |
| `<u>` | CSS `text-decoration` |
| `<frame>`, `<frameset>` | `<iframe>` |
| `<marquee>` | CSS animations |
| `<blink>` | CSS animations |

---

## HTML Best Practices

1. **Always use DOCTYPE**: `<!DOCTYPE html>`
2. **Always specify lang**: `<html lang="en">`
3. **Always use UTF-8**: `<meta charset="UTF-8">`
4. **Always use alt on images**: For accessibility
5. **Use semantic HTML**: `<header>`, `<main>`, `<footer>`, etc.
6. **One H1 per page**: For SEO
7. **Don't skip heading levels**: h1 → h2 → h3
8. **Use labels for form inputs**: For accessibility
9. **Validate your HTML**: Use W3C validator
10. **Keep it clean**: Proper indentation, lowercase tags

---

## Quick Reference

### Self-Closing Tags (no closing tag)
```html
<br>
<hr>
<img>
<input>
<meta>
<link>
<source>
<track>
<area>
<base>
<col>
<embed>
<param>
<wbr>
```

### Block vs Inline Elements

**Block** (takes full width, new line):
- `<div>`, `<p>`, `<h1>`-`<h6>`
- `<ul>`, `<ol>`, `<li>`
- `<table>`, `<form>`
- `<header>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<aside>`, `<nav>`
- `<blockquote>`, `<pre>`, `<hr>`

**Inline** (only takes needed width, same line):
- `<span>`, `<a>`, `<img>`
- `<strong>`, `<em>`, `<b>`, `<i>`
- `<code>`, `<kbd>`, `<sub>`, `<sup>`
- `<input>`, `<button>`, `<label>`, `<select>`, `<textarea>`
- `<br>`, `<mark>`, `<small>`

---

## Next Steps

After mastering HTML:
1. **HTML + CSS**: Learn styling (see html-css.md)
2. **HTML + Tailwind**: Utility-first CSS (see html-tailwind.md)
3. **HTML + JS**: Add interactivity (see html-js.md)
4. **HTML + CSS + JS**: Complete frontend (see html-css-js.md)
