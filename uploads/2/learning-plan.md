# Full-Stack Web Developer Learning Path

## How to Use This File
- ใช้เป็น checklist ติดตามความคืบหน้า
- ✅ เมื่อเรียนจบแล้ว ให้ถาม Claude: "ช่วยอธิบาย [topic] ให้ฟังหน่อย"
- 💡 ถ้าติดปัญหา ให้ถาม Claude ทันที
- 📚 Resource ที่แนะนำคือแหล่งเรียนหลัก (อ่านเอง)
- 🎯 Claude จะช่วย: อธิบายเพิ่มเติม, ตัวอย่างโค้ด, แก้ bug, code review

## Status Legend
- ⬜ ยังไม่เริ่ม
- 🟨 กำลังเรียน (อ่าน docs/ดูวิดีโอ)
- ✅ เรียนจบแล้ว (เข้าใจ + ฝึกแล้ว)
- ⭐ สำคัญมาก
- 📚 อ่าน docs เอง
- 💬 ถาม Claude ได้

---

## Phase 1: HTML Fundamentals

### Core Concepts
- ⬜ HTML Structure (DOCTYPE, html, head, body) ⭐
- ⬜ Semantic HTML (header, nav, main, section, article, footer) ⭐⭐
- ⬜ Headings & Text (h1-h6, p, strong, em)
- ⬜ Links (a, href, target)
- ⬜ Images (img, alt, width, height)
- ⬜ Lists (ul, ol, li)
- ⬜ Tables (table, tr, td, th)
- ⬜ Forms ⭐⭐⭐
  - ⬜ form, input, textarea, select, button
  - ⬜ Input types (text, email, password, number, date, checkbox, radio)
  - ⬜ Attributes (required, placeholder, disabled)
- ⬜ Divs & Spans
- ⬜ Classes & IDs ⭐⭐

### Resources 📚
- [MDN HTML Tutorial](https://developer.mozilla.org/en-US/docs/Learn/HTML)
- [W3Schools HTML](https://www.w3schools.com/html/)

### Practice Projects
- ⬜ Profile Page (HTML only)
- ⬜ Contact Form Page

### Ask Claude 💬
- "ช่วยอธิบาย semantic HTML ให้ฟังหน่อย"
- "Form attributes ที่สำคัญมีอะไรบ้าง"
- "ช่วย review HTML code ของฉันหน่อย"

**My Notes:**


---

## Phase 2: CSS Fundamentals

### Basics
- ⬜ CSS Syntax (selectors, properties, values) ⭐
- ⬜ How to add CSS (inline, internal, external)
- ⬜ Selectors ⭐⭐⭐
  - ⬜ Element (p, h1)
  - ⬜ Class (.className)
  - ⬜ ID (#idName)
  - ⬜ Descendant (div p)
  - ⬜ Pseudo-classes (:hover, :focus, :active)
- ⬜ Colors (hex, rgb, rgba)
- ⬜ Typography (font-family, font-size, font-weight, line-height)

### Box Model ⭐⭐⭐⭐⭐
- ⬜ Content, Padding, Border, Margin
- ⬜ box-sizing: border-box ⭐

### Layout
- ⬜ Display (block, inline, inline-block)
- ⬜ Position (relative, absolute, fixed, sticky)

### Flexbox ⭐⭐⭐⭐⭐
- ⬜ display: flex
- ⬜ flex-direction (row, column)
- ⬜ justify-content
- ⬜ align-items
- ⬜ flex-wrap
- ⬜ gap

### Grid (basics) ⭐⭐⭐
- ⬜ display: grid
- ⬜ grid-template-columns/rows
- ⬜ gap

### Responsive Design ⭐⭐⭐⭐⭐
- ⬜ Media Queries (@media)
- ⬜ Breakpoints (mobile, tablet, desktop)
- ⬜ Mobile-first approach

### Others
- ⬜ Transitions & Animations
- ⬜ Transform

### Resources 📚
- [MDN CSS Tutorial](https://developer.mozilla.org/en-US/docs/Learn/CSS)
- [CSS Tricks - Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Tricks - Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- Kevin Powell (YouTube)

### Practice Projects
- ⬜ Styled Profile Page
- ⬜ Landing Page (Flexbox + Responsive)
- ⬜ Card Layout (Grid)

### Ask Claude 💬
- "ช่วยอธิบาย Box Model ให้ฟังหน่อย"
- "Flexbox justify-content vs align-items ต่างกันยังไง"
- "ช่วยดู CSS layout ของฉันหน่อย มันไม่ center"
- "Media queries เขียนยังไงดี"

**My Notes:**


---

## Phase 3: JavaScript Fundamentals

### Basics
- ⬜ Variables (let, const) ⭐⭐
- ⬜ Data Types (string, number, boolean, array, object)
- ⬜ Operators
- ⬜ if/else, switch
- ⬜ Loops (for, while, for...of) ⭐⭐

### Functions ⭐⭐⭐⭐
- ⬜ Function declaration
- ⬜ Arrow functions
- ⬜ Parameters & Return
- ⬜ Default parameters

### Arrays ⭐⭐⭐⭐⭐
- ⬜ Creating & accessing
- ⬜ push, pop, shift, unshift
- ⬜ map ⭐⭐⭐⭐⭐
- ⬜ filter ⭐⭐⭐⭐⭐
- ⬜ reduce ⭐⭐⭐⭐
- ⬜ forEach, find, findIndex

### Objects ⭐⭐⭐⭐
- ⬜ Creating objects
- ⬜ Accessing properties
- ⬜ Destructuring ⭐⭐⭐
- ⬜ Spread operator (...) ⭐⭐⭐

### ES6+ Features ⭐⭐⭐⭐⭐
- ⬜ Template literals
- ⬜ Arrow functions
- ⬜ Destructuring
- ⬜ Spread/Rest
- ⬜ Optional chaining (?.)
- ⬜ Nullish coalescing (??)

### DOM Manipulation ⭐⭐⭐⭐⭐
- ⬜ querySelector, querySelectorAll ⭐⭐⭐
- ⬜ innerHTML, textContent
- ⬜ setAttribute, classList
- ⬜ createElement, appendChild, remove

### Events ⭐⭐⭐⭐⭐
- ⬜ addEventListener ⭐⭐⭐
- ⬜ Event types (click, submit, change, input)
- ⬜ e.target, e.preventDefault()

### Async JavaScript ⭐⭐⭐⭐⭐
- ⬜ Promises
- ⬜ async/await ⭐⭐⭐⭐⭐
- ⬜ try/catch
- ⬜ Fetch API ⭐⭐⭐⭐⭐
- ⬜ JSON.parse, JSON.stringify

### Resources 📚
- [JavaScript.info](https://javascript.info/) ⭐⭐⭐⭐⭐
- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- freeCodeCamp JavaScript Course
- Traversy Media (YouTube)

### Practice Projects
- ⬜ Todo List (DOM + Events)
- ⬜ Calculator
- ⬜ Form Validation
- ⬜ Weather App (Fetch API)

### Ask Claude 💬
- "ช่วยอธิบาย map vs forEach ต่างกันยังไง"
- "async/await ใช้ยังไง ให้ตัวอย่างหน่อย"
- "ช่วยแก้ bug นี้หน่อย [paste code]"
- "ช่วย review code JavaScript ของฉันหน่อย"
- "Fetch API เขียนยังไงดี"

**My Notes:**


---

## Phase 4: TypeScript

### Core TypeScript ⭐⭐⭐⭐⭐
- ⬜ Basic Types (string, number, boolean, array)
- ⬜ Type Annotations ⭐⭐⭐
- ⬜ Interfaces ⭐⭐⭐⭐
- ⬜ Type Aliases ⭐⭐⭐
- ⬜ Union Types ⭐⭐⭐
- ⬜ Generics ⭐⭐⭐⭐
- ⬜ Function Types ⭐⭐⭐
- ⬜ Utility Types (Partial, Pick, Omit) ⭐⭐⭐

### Resources 📚
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/) ⭐⭐⭐⭐⭐
- Matt Pocock (YouTube)
- [Total TypeScript](https://www.totaltypescript.com/)

### Practice
- ⬜ Convert Todo App to TypeScript
- ⬜ Type-safe API calls

### Ask Claude 💬
- "ช่วยอธิบาย Interfaces vs Type Aliases ต่างกันยังไง"
- "Generics คืออะไร ให้ตัวอย่างหน่อย"
- "ช่วย fix TypeScript error นี้หน่อย [paste error]"
- "ช่วยเขียน type สำหรับ object นี้หน่อย"

**My Notes:**


---

## Phase 5: Tailwind CSS

### Core Concepts ⭐⭐⭐⭐⭐
- ⬜ Setup & Configuration
- ⬜ Utility Classes
- ⬜ Spacing (p-, m-, gap-)
- ⬜ Colors (bg-, text-, border-)
- ⬜ Typography (text-, font-)
- ⬜ Flexbox utilities ⭐⭐⭐⭐
- ⬜ Grid utilities ⭐⭐⭐
- ⬜ Responsive (sm:, md:, lg:, xl:) ⭐⭐⭐⭐⭐
- ⬜ Hover & Focus states
- ⬜ Dark mode
- ⬜ Custom colors

### Resources 📚
- [Tailwind CSS Docs](https://tailwindcss.com/docs) ⭐⭐⭐⭐⭐
- [Tailwind UI](https://tailwindui.com/) (examples)
- Tailwind Labs (YouTube)

### Practice
- ⬜ Landing Page (Tailwind)
- ⬜ Convert previous projects to Tailwind
- ⬜ Component Library (Button, Card)

### Ask Claude 💬
- "Tailwind responsive breakpoints ทำงานยังไง"
- "ช่วยแปลง CSS นี้เป็น Tailwind หน่อย [paste CSS]"
- "ช่วยสร้าง Button component ด้วย Tailwind หน่อย"
- "Dark mode ใน Tailwind ทำยังไง"

**My Notes:**


---

## Phase 6: React

### React Basics ⭐⭐⭐⭐⭐
- ⬜ JSX
- ⬜ Components (Functional)
- ⬜ Props ⭐⭐⭐⭐
- ⬜ Children props
- ⬜ Component Composition

### Hooks ⭐⭐⭐⭐⭐
- ⬜ useState ⭐⭐⭐⭐⭐
- ⬜ useEffect ⭐⭐⭐⭐⭐
- ⬜ useContext ⭐⭐⭐⭐
- ⬜ useReducer ⭐⭐⭐
- ⬜ useCallback ⭐⭐⭐
- ⬜ useMemo ⭐⭐⭐
- ⬜ Custom Hooks ⭐⭐⭐⭐

### Advanced
- ⬜ Conditional Rendering
- ⬜ Lists & Keys
- ⬜ Forms (Controlled Components)
- ⬜ Event Handling

### Resources 📚
- [React.dev](https://react.dev/) ⭐⭐⭐⭐⭐ (Official Docs)
- [React.dev Tutorial](https://react.dev/learn)
- Web Dev Simplified (YouTube)
- Net Ninja React (YouTube)

### Practice (React + TypeScript + Tailwind)
- ⬜ Todo App
- ⬜ Weather App
- ⬜ Movie Search App

### Ask Claude 💬
- "useState vs useReducer เมื่อไหร่ใช้อะไร"
- "useEffect dependency array ทำงานยังไง"
- "ช่วยสร้าง custom hook สำหรับ fetch data หน่อย"
- "ช่วย review React component นี้หน่อย [paste code]"
- "React re-render เกิดเมื่อไหร่"

**My Notes:**


---

## Phase 7: Node.js + Express

### Node.js Basics
- ⬜ Node.js Architecture
- ⬜ Modules (import/export)
- ⬜ npm & package.json ⭐⭐⭐
- ⬜ Environment Variables (.env) ⭐⭐⭐

### Express.js ⭐⭐⭐⭐⭐
- ⬜ Setup
- ⬜ Routing (GET, POST, PUT, DELETE) ⭐⭐⭐⭐
- ⬜ Middleware ⭐⭐⭐⭐
- ⬜ Request & Response
- ⬜ Body Parsing (JSON)
- ⬜ Error Handling ⭐⭐⭐⭐
- ⬜ CORS
- ⬜ Input Validation

### Resources 📚
- [Node.js Docs](https://nodejs.org/docs)
- [Express.js Docs](https://expressjs.com/) ⭐⭐⭐⭐⭐
- freeCodeCamp Node.js Course
- Traversy Media Node.js (YouTube)

### Practice
- ⬜ Simple REST API
- ⬜ Blog API (in-memory)

### Ask Claude 💬
- "Middleware คืออะไร ทำงานยังไง"
- "Error handling ใน Express ทำยังไง"
- "ช่วยสร้าง REST API สำหรับ Todo หน่อย"
- "CORS คืออะไร แก้ยังไง"

**My Notes:**


---

## Phase 8: MySQL + Prisma

### SQL Basics ⭐⭐⭐⭐⭐
- ⬜ SELECT, INSERT, UPDATE, DELETE
- ⬜ WHERE, ORDER BY, LIMIT
- ⬜ JOINs (INNER, LEFT) ⭐⭐⭐⭐
- ⬜ Relationships

### Prisma ⭐⭐⭐⭐⭐
- ⬜ Setup
- ⬜ Schema definition ⭐⭐⭐⭐⭐
- ⬜ Migrations ⭐⭐⭐⭐
- ⬜ Prisma Client ⭐⭐⭐⭐⭐
- ⬜ CRUD operations
- ⬜ Relations ⭐⭐⭐⭐
- ⬜ Transactions

### Resources 📚
- [MySQL Tutorial](https://www.mysqltutorial.org/)
- [Prisma Docs](https://www.prisma.io/docs) ⭐⭐⭐⭐⭐
- Prisma YouTube

### Practice
- ⬜ Todo API (Express + MySQL + Prisma)
- ⬜ Blog API (Express + MySQL + Prisma)

### Ask Claude 💬
- "SQL JOINs ต่างกันยังไง ให้ตัวอย่างหน่อย"
- "Prisma schema เขียนยังไง สำหรับ 1-to-many"
- "ช่วยสร้าง Prisma schema สำหรับ Blog (User, Post, Comment)"
- "Prisma migrations ทำงานยังไง"

**My Notes:**


---

## Phase 9: Next.js

### Next.js Basics ⭐⭐⭐⭐⭐
- ⬜ App Router (Next.js 14+)
- ⬜ File-based Routing ⭐⭐⭐⭐
- ⬜ Pages & Layouts
- ⬜ Dynamic Routes ([id]) ⭐⭐⭐⭐
- ⬜ Link & Navigation
- ⬜ Server vs Client Components ⭐⭐⭐⭐⭐
- ⬜ Loading & Error States

### Data & API
- ⬜ API Routes (Route Handlers) ⭐⭐⭐⭐⭐
- ⬜ Server Actions ⭐⭐⭐⭐
- ⬜ Data Fetching
- ⬜ Revalidation

### Advanced
- ⬜ Image Optimization
- ⬜ Metadata (SEO) ⭐⭐⭐
- ⬜ Form Handling

### Resources 📚
- [Next.js Docs](https://nextjs.org/docs) ⭐⭐⭐⭐⭐
- [Next.js Learn](https://nextjs.org/learn)
- Lee Robinson (YouTube)
- Theo - t3.gg (YouTube)

### Practice
- ⬜ Blog (Next.js + static data)
- ⬜ Blog (Next.js + API Routes)

### Ask Claude 💬
- "Server Components vs Client Components ต่างกันยังไง"
- "Server Actions ใช้ทำอะไรได้บ้าง"
- "ช่วยสร้าง dynamic route สำหรับ blog post หน่อย"
- "Metadata ใน Next.js ทำยังไง"

**My Notes:**


---

## Phase 10: Full-Stack (Next.js + MySQL + Auth)

### Database Integration
- ⬜ Prisma in Next.js ⭐⭐⭐⭐⭐
- ⬜ API Routes + Database
- ⬜ Server Actions + Database

### NextAuth.js ⭐⭐⭐⭐⭐
- ⬜ Setup
- ⬜ Providers (Email/Password, Google, GitHub)
- ⬜ Prisma Adapter ⭐⭐⭐⭐
- ⬜ Session Management ⭐⭐⭐⭐
- ⬜ Protected Routes ⭐⭐⭐⭐⭐
- ⬜ Login/Register Pages

### File Upload
- ⬜ UploadThing setup
- ⬜ Image upload

### Resources 📚
- [NextAuth.js Docs](https://next-auth.js.org/) ⭐⭐⭐⭐⭐
- [UploadThing Docs](https://docs.uploadthing.com/)

### Practice (Full-Stack)
- ⬜ Todo App (Next.js + MySQL + Auth)
- ⬜ E-commerce (Next.js + MySQL + Auth)
- ⬜ Dashboard (Next.js + MySQL + Charts)
- ⬜ Portfolio Website

### Ask Claude 💬
- "NextAuth.js setup ยังไงบ้าง step by step"
- "Protected routes ทำยังไง"
- "ช่วยสร้าง login page ด้วย NextAuth หน่อย"
- "Session management ทำงานยังไง"
- "ช่วย integrate Prisma กับ NextAuth หน่อย"

**My Notes:**


---

## Phase 11: Deployment

### Git & GitHub ⭐⭐⭐⭐⭐
- ⬜ Git basics (add, commit, push, pull)
- ⬜ Branches
- ⬜ README.md ⭐⭐⭐⭐
- ⬜ .gitignore

### Deployment ⭐⭐⭐⭐⭐
- ⬜ Vercel (Frontend + Next.js)
- ⬜ PlanetScale/Railway (MySQL)
- ⬜ Environment Variables

### Resources 📚
- [Vercel Docs](https://vercel.com/docs)
- [PlanetScale Docs](https://planetscale.com/docs)
- [Railway Docs](https://docs.railway.app/)

### Practice
- ⬜ Deploy all projects
- ⬜ Write README for all projects

### Ask Claude 💬
- "ช่วยเขียน README สำหรับโปรเจค [project name] หน่อย"
- "Environment variables ใน Vercel ตั้งยังไง"
- "Deploy Next.js + MySQL ยังไงบ้าง step by step"
- "ช่วย troubleshoot deployment error หน่อย [paste error]"

**My Notes:**


---

## Portfolio Checklist (10+ Projects)

- ⬜ 1. Landing Page (HTML + CSS + Flexbox + Responsive)
- ⬜ 2. Todo List (HTML + CSS + JS + DOM)
- ⬜ 3. Calculator (JS)
- ⬜ 4. Weather App (JS + Fetch API)
- ⬜ 5. Todo App (React + TypeScript + Tailwind)
- ⬜ 6. Movie/Product Search (React + TypeScript + API)
- ⬜ 7. Blog API (Express + MySQL + Prisma)
- ⬜ 8. Todo Full-Stack (Next.js + MySQL + Auth)
- ⬜ 9. E-commerce (Next.js + MySQL + Full Features)
- ⬜ 10. Dashboard (Next.js + MySQL + Charts)
- ⬜ 11. Portfolio Website (Next.js + Tailwind)

### Each Project Must Have:
- ⬜ Clean code + comments
- ⬜ TypeScript (when applicable)
- ⬜ Good README
- ⬜ Screenshots
- ⬜ Live Demo (deployed)
- ⬜ Responsive

**My Notes:**


---

## How to Ask Claude for Help 💬

### Good Questions Examples:
```
✅ "ช่วยอธิบาย [concept] ให้ฟังหน่อย พร้อมตัวอย่างโค้ด"
✅ "ช่วยแก้ bug นี้หน่อย [paste code + error]"
✅ "ช่วย review code นี้หน่อย มี best practice อะไรที่ควรปรับมั้ย"
✅ "ช่วยสร้าง [feature] ให้หน่อย ด้วย TypeScript + Tailwind"
✅ "[A] vs [B] ต่างกันยังไง เมื่อไหร่ใช้อะไร"
✅ "ช่วยเขียน README สำหรับโปรเจคนี้หน่อย"
```

### What Claude Can Help:
- อธิบายแนวคิด (concepts) ให้เข้าใจง่ายขึ้น
- ให้ตัวอย่างโค้ดที่ทำงานได้จริง
- แก้ bug + อธิบายว่าทำไมเกิด
- Code review + แนะนำ best practices
- สร้างโค้ดตามที่ต้องการ (components, API, etc.)
- เปรียบเทียบเทคโนโลยี/แนวทาง
- เขียน documentation (README, comments)

---

## Currently Learning 🟨

### 🎯 Phase 1: HTML + CSS Foundation (ก่อนทำโปรเจค 1)

**เป้าหมาย:** เคลียร์พื้นฐานให้แน่น → พร้อมทำ Landing Page

**กำลังเรียน:**
- 🟨 HTML (Semantic, Forms, Class/ID)
- 🟨 CSS Flexbox ⭐ (จุดอ่อนหลัก - ต้องจัดได้คล่อง)
- ⬜ CSS Grid
- ⬜ Responsive (Media Queries)

**โปรเจค 1:** Landing Page (ทำกับเพื่อน - แนวท่องเที่ยว/โรงแรม)

**หลังจากนั้น:**
- JavaScript + DOM
- โปรเจค 2: Todo App
- โปรเจค 3: เว็บดึง API

---

## Questions / Stuck ❓


---

## Notes / Ideas 💡