# JavaScript - Complete Guide

## สำหรับ AI: คำแนะนำการสอน

### บริบท
- ผู้เรียนกำลังเตรียมตัวทำโปรเจค **"Deep Expense Tracker"** (เว็บจดรายจ่ายแบบเจาะลึก)
- หลังจบ JS จะไปเรียน **TypeScript** ต่อ
- ผู้เรียนเข้าใจ HTML/CSS และ Tailwind แล้ว

### หน้าที่ของ AI
1. สอน JS ตามหัวข้อด้านล่างทีละหัวข้อ
2. อธิบายว่า **ควรใช้/ไม่ควรใช้** อะไร พร้อมเหตุผล
3. ยกตัวอย่างที่เกี่ยวข้องกับโปรเจค Expense Tracker เมื่อเหมาะสม
4. ให้ผู้เรียนลองทำแบบฝึกหัดเล็กๆ หลังจบแต่ละหัวข้อ
5. ตอบสั้นกระชับ ไม่ต้องยืดยาว

### โปรเจคเป้าหมาย: Deep Expense Tracker
- บันทึกรายจ่าย (วันที่, จำนวนเงิน, หมวดหมู่, หมายเหตุ)
- แยกหมวดหมู่ (ค่าข้าว, ค่ารถ, ค่าของใช้, ฯลฯ)
- คำนวณยอดรวม, กรองตามหมวดหมู่/วันที่
- Export ข้อมูล

---

## Learning Progress
- [ ] 1. Variables & Data Types
- [ ] 2. Operators
- [ ] 3. Strings
- [ ] 4. Numbers & Math
- [ ] 5. Arrays (สำคัญมาก!)
- [ ] 6. Objects (สำคัญมาก!)
- [ ] 7. Functions
- [ ] 8. Conditionals
- [ ] 9. Loops
- [ ] 10. Classes
- [ ] 11. Async/Await & Fetch (สำคัญมาก!)
- [ ] 12. Error Handling
- [ ] 13. Modules (Import/Export)
- [ ] 14. DOM Manipulation
- [ ] 15. Local Storage
- [ ] 16. Date & Time
- [ ] 17. JSON
- [ ] 18. Destructuring & Spread
- [ ] 19. Modern JS Features

---

## 1. Variables & Data Types

### Variables (ตัวแปร)

```javascript
// ใช้ const สำหรับค่าที่ไม่เปลี่ยน (แนะนำใช้เป็นหลัก!)
const name = "John";
const PI = 3.14159;

// ใช้ let สำหรับค่าที่ต้องเปลี่ยน
let age = 25;
age = 26; // OK

let count = 0;
count++; // OK

// ห้ามใช้ var (เก่าแล้ว มีปัญหาเรื่อง scope)
// var oldWay = "don't use"; // ❌
```

**กฎ: ใช้ `const` ก่อนเสมอ → ถ้าต้องเปลี่ยนค่าทีหลังค่อยเปลี่ยนเป็น `let`**

### Data Types (ชนิดข้อมูล)

#### Primitive Types (ค่าพื้นฐาน)

```javascript
// String (ข้อความ)
const text = "Hello";
const text2 = 'Hello';
const text3 = `Hello ${name}`; // Template literal (แนะนำ!)

// Number (ตัวเลข - JS ไม่แยก int/float)
const integer = 42;
const decimal = 3.14;
const negative = -10;

// Boolean (จริง/เท็จ)
const isActive = true;
const isDeleted = false;

// Null (ค่าว่างที่ตั้งใจ)
const empty = null;

// Undefined (ยังไม่กำหนดค่า)
let notYet;
console.log(notYet); // undefined

// Symbol (ไม่ค่อยใช้ ข้ามได้)
// BigInt (ตัวเลขใหญ่มาก ไม่ค่อยใช้ ข้ามได้)
```

#### Reference Types (ค่าอ้างอิง)

```javascript
// Array (อาเรย์)
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "two", true, null];

// Object (อ็อบเจกต์)
const user = {
    name: "John",
    age: 25
};

// Function (ฟังก์ชัน)
const greet = () => "Hello";
```

### typeof (เช็คชนิด)

```javascript
typeof "hello"      // "string"
typeof 42           // "number"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof null         // "object" (bug เก่าของ JS!)
typeof []           // "object"
typeof {}           // "object"
typeof (() => {})   // "function"

// เช็ค Array ที่ถูกต้อง
Array.isArray([1, 2, 3]); // true
```

---

## 2. Operators

### Arithmetic (คำนวณ)

```javascript
const a = 10;
const b = 3;

a + b    // 13 (บวก)
a - b    // 7 (ลบ)
a * b    // 30 (คูณ)
a / b    // 3.333... (หาร)
a % b    // 1 (เศษจากการหาร)
a ** b   // 1000 (ยกกำลัง 10^3)

// Increment/Decrement
let count = 0;
count++  // 1 (เพิ่ม 1)
count--  // 0 (ลด 1)
```

### Assignment (กำหนดค่า)

```javascript
let x = 10;
x += 5   // x = x + 5 → 15
x -= 3   // x = x - 3 → 12
x *= 2   // x = x * 2 → 24
x /= 4   // x = x / 4 → 6
x %= 4   // x = x % 4 → 2
```

### Comparison (เปรียบเทียบ)

```javascript
// ใช้ === และ !== เสมอ! (strict equality)
5 === 5      // true
5 === "5"    // false (ต่างชนิด)
5 !== 3      // true

// ห้ามใช้ == และ != (loose equality มีปัญหา)
// 5 == "5"  // true ❌ ไม่ควรใช้!

// เปรียบเทียบ
5 > 3        // true
5 < 3        // false
5 >= 5       // true
5 <= 4       // false
```

### Logical (ตรรกะ)

```javascript
// AND - ต้องจริงทั้งคู่
true && true    // true
true && false   // false

// OR - จริงอย่างน้อยหนึ่ง
true || false   // true
false || false  // false

// NOT - กลับค่า
!true           // false
!false          // true

// ใช้จริง
const age = 25;
const hasLicense = true;

if (age >= 18 && hasLicense) {
    console.log("Can drive");
}
```

### Nullish Coalescing (??)

```javascript
// ถ้าค่าซ้ายเป็น null หรือ undefined → ใช้ค่าขวา
const name = null ?? "Guest";        // "Guest"
const name2 = undefined ?? "Guest";  // "Guest"
const name3 = "John" ?? "Guest";     // "John"
const name4 = "" ?? "Guest";         // "" (string ว่างไม่ใช่ null)
const name5 = 0 ?? 100;              // 0 (0 ไม่ใช่ null)
```

### Optional Chaining (?.)

```javascript
const user = {
    name: "John",
    address: {
        city: "Bangkok"
    }
};

// ปกติ - error ถ้า address เป็น undefined
// user.address.city

// Safe - ไม่ error ถ้า null/undefined
user?.address?.city     // "Bangkok"
user?.phone?.number     // undefined (ไม่ error!)

// กับ array
const arr = [1, 2, 3];
arr?.[0]                // 1

// กับ function
const obj = { greet: () => "Hi" };
obj.greet?.()           // "Hi"
obj.missing?.()         // undefined (ไม่ error!)
```

### Ternary Operator (? :)

```javascript
// condition ? valueIfTrue : valueIfFalse
const age = 20;
const status = age >= 18 ? "Adult" : "Minor";  // "Adult"

// ใช้แทน if/else สั้นๆ
const message = isLoggedIn ? "Welcome back!" : "Please login";
```

### Spread Operator (...)

```javascript
// กับ Array
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2];  // [1, 2, 3, 4, 5, 6]
const copy = [...arr1];             // [1, 2, 3] (copy ใหม่)

// กับ Object
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3 };
const merged2 = { ...obj1, ...obj2 };  // { a: 1, b: 2, c: 3 }
const updated = { ...obj1, b: 99 };    // { a: 1, b: 99 }
```

---

## 3. Strings

### สร้าง String

```javascript
const single = 'Hello';
const double = "Hello";
const template = `Hello ${name}`;  // แนะนำ! ใส่ตัวแปรได้

// หลายบรรทัด
const multiline = `
    Line 1
    Line 2
    Line 3
`;
```

### String Methods ที่ใช้บ่อย

```javascript
const str = "  Hello World  ";

// ความยาว
str.length                  // 15

// ตัวพิมพ์
str.toUpperCase()           // "  HELLO WORLD  "
str.toLowerCase()           // "  hello world  "

// ตัดช่องว่าง
str.trim()                  // "Hello World"
str.trimStart()             // "Hello World  "
str.trimEnd()               // "  Hello World"

// ค้นหา
str.includes("World")       // true
str.startsWith("  He")      // true
str.endsWith("  ")          // true
str.indexOf("World")        // 8 (ตำแหน่งที่เจอ)
str.indexOf("xyz")          // -1 (ไม่เจอ)

// ตัด
str.slice(2, 7)             // "Hello"
str.slice(-7, -2)           // "World"
str.substring(2, 7)         // "Hello" (เหมือน slice)

// แทนที่
"hello".replace("l", "L")      // "heLlo" (แค่ตัวแรก)
"hello".replaceAll("l", "L")   // "heLLo" (ทุกตัว)

// แยก
"a,b,c".split(",")          // ["a", "b", "c"]
"hello".split("")           // ["h", "e", "l", "l", "o"]

// รวม
["a", "b", "c"].join("-")   // "a-b-c"

// ซ้ำ
"ab".repeat(3)              // "ababab"

// เติม
"5".padStart(3, "0")        // "005"
"5".padEnd(3, "0")          // "500"

// เข้าถึงตัวอักษร
"hello"[0]                  // "h"
"hello".charAt(0)           // "h"
"hello".at(-1)              // "o" (ตัวสุดท้าย)
```

### Template Literals (สำคัญ!)

```javascript
const name = "John";
const age = 25;

// แบบเก่า (ไม่แนะนำ)
const old = "Hello " + name + ", you are " + age + " years old";

// แบบใหม่ (แนะนำ!)
const modern = `Hello ${name}, you are ${age} years old`;

// ใส่ expression ได้
const calc = `2 + 2 = ${2 + 2}`;  // "2 + 2 = 4"

// เรียก function ได้
const upper = `Name: ${name.toUpperCase()}`;  // "Name: JOHN"
```

---

## 4. Numbers & Math

### Numbers

```javascript
const int = 42;
const float = 3.14;
const negative = -10;
const big = 1_000_000;  // Numeric separator (อ่านง่าย)

// แปลงเป็น Number
Number("42")        // 42
Number("3.14")      // 3.14
Number("hello")     // NaN (Not a Number)
parseInt("42")      // 42
parseInt("42.9")    // 42 (ตัดทศนิยม)
parseFloat("3.14")  // 3.14

// เช็ค
isNaN(NaN)          // true
isNaN("hello")      // true
isFinite(100)       // true
isFinite(Infinity)  // false
Number.isInteger(42)     // true
Number.isInteger(3.14)   // false

// แปลงเป็น String
(42).toString()     // "42"
(3.14159).toFixed(2)  // "3.14" (ทศนิยม 2 ตำแหน่ง)
```

### Math Object

```javascript
// ปัดเศษ
Math.round(3.5)     // 4 (ปัดปกติ)
Math.round(3.4)     // 3
Math.floor(3.9)     // 3 (ปัดลง)
Math.ceil(3.1)      // 4 (ปัดขึ้น)
Math.trunc(3.9)     // 3 (ตัดทศนิยม)

// ค่าสัมบูรณ์
Math.abs(-5)        // 5

// Min/Max
Math.min(1, 2, 3)   // 1
Math.max(1, 2, 3)   // 3
Math.min(...[1, 2, 3])  // 1 (ใช้กับ array)

// ยกกำลัง/ราก
Math.pow(2, 3)      // 8 (2^3)
Math.sqrt(16)       // 4 (รากที่ 2)

// สุ่ม
Math.random()       // 0.0 - 0.999...

// สุ่มเลข 1-100
Math.floor(Math.random() * 100) + 1

// สุ่มเลขในช่วง min-max
const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
```

### ตัวอย่างสำหรับ Expense Tracker

```javascript
// คำนวณยอดรวม
const expenses = [100, 250.50, 75.25, 200];
const total = expenses.reduce((sum, n) => sum + n, 0);  // 625.75

// แสดงเงินบาท
const formatMoney = (amount) => {
    return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
formatMoney(1234567.89);  // "1,234,567.89"

// หรือใช้ Intl (แนะนำ!)
const formatTHB = (amount) => {
    return new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB'
    }).format(amount);
};
formatTHB(1234.50);  // "฿1,234.50"
```

---

## 5. Arrays (สำคัญมาก!)

### สร้าง Array

```javascript
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "two", true, null, { name: "obj" }];
const empty = [];
const filled = new Array(5).fill(0);  // [0, 0, 0, 0, 0]
```

### Basic Operations

```javascript
const arr = [1, 2, 3];

// เข้าถึง
arr[0]              // 1
arr[arr.length - 1] // 3 (ตัวสุดท้าย)
arr.at(-1)          // 3 (ตัวสุดท้าย - modern)

// เพิ่ม/ลบ
arr.push(4)         // เพิ่มท้าย → [1, 2, 3, 4]
arr.pop()           // ลบท้าย → [1, 2, 3]
arr.unshift(0)      // เพิ่มหน้า → [0, 1, 2, 3]
arr.shift()         // ลบหน้า → [1, 2, 3]

// รวม array
const merged = [...arr, 4, 5];  // [1, 2, 3, 4, 5]
const merged2 = arr.concat([4, 5]);  // เหมือนกัน

// ตัด
arr.slice(1, 3)     // [2, 3] (index 1 ถึง 2)
arr.slice(-2)       // [2, 3] (2 ตัวสุดท้าย)

// แก้ไข (mutate)
arr.splice(1, 1)           // ลบ 1 ตัวที่ index 1
arr.splice(1, 0, "new")    // แทรก "new" ที่ index 1
arr.splice(1, 1, "replace") // แทนที่ตัวที่ index 1

// ค้นหา
arr.includes(2)     // true
arr.indexOf(2)      // 1 (index ที่เจอ)
arr.indexOf(99)     // -1 (ไม่เจอ)

// เรียงลำดับ
arr.reverse()       // กลับด้าน [3, 2, 1]
arr.sort()          // เรียง (เป็น string!)
arr.sort((a, b) => a - b)  // เรียงตัวเลขน้อยไปมาก
arr.sort((a, b) => b - a)  // เรียงตัวเลขมากไปน้อย
```

### Higher-Order Array Methods (สำคัญมาก!)

#### forEach - วนลูป (ไม่ return อะไร)

```javascript
const numbers = [1, 2, 3];

numbers.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});
// Index 0: 1
// Index 1: 2
// Index 2: 3
```

#### map - แปลงทุกตัว (return array ใหม่)

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

const strings = numbers.map(n => `Number: ${n}`);
// ["Number: 1", "Number: 2", ...]

// ใช้กับ object
const users = [
    { name: "John", age: 25 },
    { name: "Jane", age: 30 }
];

const names = users.map(user => user.name);
// ["John", "Jane"]
```

#### filter - กรอง (return array ที่ผ่านเงื่อนไข)

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

const evens = numbers.filter(n => n % 2 === 0);
// [2, 4, 6]

const bigNumbers = numbers.filter(n => n > 3);
// [4, 5, 6]

// กรอง expenses ตามหมวดหมู่
const expenses = [
    { amount: 100, category: "food" },
    { amount: 50, category: "transport" },
    { amount: 200, category: "food" }
];

const foodExpenses = expenses.filter(e => e.category === "food");
// [{ amount: 100, category: "food" }, { amount: 200, category: "food" }]
```

#### reduce - รวมเป็นค่าเดียว (return ค่าเดียว)

```javascript
const numbers = [1, 2, 3, 4, 5];

// รวมทั้งหมด
const sum = numbers.reduce((total, n) => total + n, 0);
// 15

// หาค่ามากสุด
const max = numbers.reduce((max, n) => n > max ? n : max, numbers[0]);
// 5

// นับจำนวน
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
// { apple: 3, banana: 2, orange: 1 }

// รวมยอด expenses
const expenses = [
    { amount: 100, category: "food" },
    { amount: 50, category: "transport" },
    { amount: 200, category: "food" }
];

const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
// 350

// รวมยอดตามหมวดหมู่
const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
}, {});
// { food: 300, transport: 50 }
```

#### find & findIndex - หาตัวแรกที่เจอ

```javascript
const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" }
];

const user = users.find(u => u.id === 2);
// { id: 2, name: "Jane" }

const index = users.findIndex(u => u.id === 2);
// 1

const notFound = users.find(u => u.id === 99);
// undefined
```

#### some & every - เช็คเงื่อนไข

```javascript
const numbers = [1, 2, 3, 4, 5];

// some - มีบางตัวผ่านไหม
numbers.some(n => n > 3);   // true
numbers.some(n => n > 10);  // false

// every - ทุกตัวผ่านไหม
numbers.every(n => n > 0);  // true
numbers.every(n => n > 3);  // false
```

#### Chaining - ต่อกันหลาย methods

```javascript
const expenses = [
    { amount: 100, category: "food", date: "2024-01-01" },
    { amount: 50, category: "transport", date: "2024-01-01" },
    { amount: 200, category: "food", date: "2024-01-02" },
    { amount: 75, category: "entertainment", date: "2024-01-02" }
];

// กรอง food → เอาแค่ amount → รวม
const totalFood = expenses
    .filter(e => e.category === "food")
    .map(e => e.amount)
    .reduce((sum, n) => sum + n, 0);
// 300
```

---

## 6. Objects (สำคัญมาก!)

### สร้าง Object

```javascript
// Object literal
const user = {
    name: "John",
    age: 25,
    email: "john@example.com"
};

// Shorthand property
const name = "John";
const age = 25;
const user2 = { name, age };  // { name: "John", age: 25 }

// Computed property
const key = "email";
const obj = { [key]: "john@example.com" };  // { email: "john@example.com" }
```

### เข้าถึง/แก้ไข

```javascript
const user = {
    name: "John",
    age: 25,
    address: {
        city: "Bangkok",
        zip: "10110"
    }
};

// Dot notation
user.name               // "John"
user.address.city       // "Bangkok"

// Bracket notation
user["name"]            // "John"
user["address"]["city"] // "Bangkok"

// Optional chaining (safe access)
user?.address?.city     // "Bangkok"
user?.phone?.number     // undefined (ไม่ error)

// แก้ไข
user.name = "Jane";
user.age = 26;

// เพิ่ม property ใหม่
user.phone = "0812345678";

// ลบ property
delete user.phone;

// เช็คว่ามี property ไหม
"name" in user          // true
user.hasOwnProperty("name")  // true
```

### Destructuring (สำคัญมาก!)

```javascript
const user = {
    name: "John",
    age: 25,
    address: {
        city: "Bangkok"
    }
};

// Basic
const { name, age } = user;
console.log(name);  // "John"

// Rename
const { name: userName } = user;
console.log(userName);  // "John"

// Default value
const { phone = "N/A" } = user;
console.log(phone);  // "N/A"

// Nested
const { address: { city } } = user;
console.log(city);  // "Bangkok"

// ใช้ใน function parameter
const printUser = ({ name, age }) => {
    console.log(`${name} is ${age} years old`);
};
printUser(user);
```

### Spread Operator

```javascript
const user = { name: "John", age: 25 };

// Copy object
const copy = { ...user };

// Merge objects
const extra = { email: "john@example.com" };
const merged = { ...user, ...extra };
// { name: "John", age: 25, email: "john@example.com" }

// Update (immutable way)
const updated = { ...user, age: 26 };
// { name: "John", age: 26 }

// ลำดับสำคัญ! ค่าหลังทับค่าก่อน
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged2 = { ...obj1, ...obj2 };
// { a: 1, b: 3, c: 4 }
```

### Object Methods

```javascript
const user = { name: "John", age: 25 };

// เอา keys
Object.keys(user)       // ["name", "age"]

// เอา values
Object.values(user)     // ["John", 25]

// เอา entries (key-value pairs)
Object.entries(user)    // [["name", "John"], ["age", 25]]

// สร้าง object จาก entries
Object.fromEntries([["a", 1], ["b", 2]])  // { a: 1, b: 2 }

// Assign (merge/copy)
Object.assign({}, user, { age: 26 })  // { name: "John", age: 26 }

// Freeze (ห้ามแก้ไข)
Object.freeze(user);
user.age = 30;  // ไม่มีผล (strict mode จะ error)
```

### ตัวอย่างสำหรับ Expense Tracker

```javascript
// Expense object
const expense = {
    id: 1,
    amount: 150.50,
    category: "food",
    description: "ข้าวมันไก่",
    date: "2024-01-15",
    createdAt: new Date().toISOString()
};

// Array of expenses
const expenses = [
    { id: 1, amount: 100, category: "food" },
    { id: 2, amount: 50, category: "transport" },
    { id: 3, amount: 200, category: "food" }
];

// เพิ่ม expense ใหม่ (immutable)
const newExpense = { id: 4, amount: 75, category: "entertainment" };
const updatedExpenses = [...expenses, newExpense];

// แก้ไข expense (immutable)
const editedExpenses = expenses.map(e =>
    e.id === 2 ? { ...e, amount: 60 } : e
);

// ลบ expense (immutable)
const deletedExpenses = expenses.filter(e => e.id !== 2);
```

---

## 7. Functions

### Arrow Functions (แนะนำ!)

```javascript
// Basic
const greet = () => {
    return "Hello";
};

// Short (implicit return)
const greet2 = () => "Hello";

// With parameter
const greet3 = (name) => `Hello ${name}`;

// Single param (ไม่ต้องวงเล็บ)
const greet4 = name => `Hello ${name}`;

// Multiple params
const add = (a, b) => a + b;

// Return object (ต้องใส่วงเล็บ)
const createUser = (name, age) => ({ name, age });
```

### Default Parameters

```javascript
const greet = (name = "Guest") => `Hello ${name}`;

greet();        // "Hello Guest"
greet("John");  // "Hello John"

const createExpense = (amount, category = "other", date = new Date()) => {
    return { amount, category, date };
};
```

### Rest Parameters

```javascript
const sum = (...numbers) => {
    return numbers.reduce((total, n) => total + n, 0);
};

sum(1, 2, 3);       // 6
sum(1, 2, 3, 4, 5); // 15

// รวมกับ params อื่น
const log = (prefix, ...messages) => {
    messages.forEach(msg => console.log(`${prefix}: ${msg}`));
};
log("INFO", "msg1", "msg2", "msg3");
```

### Callback Functions

```javascript
// Function ที่รับ function เป็น parameter
const doSomething = (callback) => {
    const result = "Done!";
    callback(result);
};

doSomething((result) => {
    console.log(result);  // "Done!"
});

// ใช้จริง
const processExpenses = (expenses, processor) => {
    return expenses.map(processor);
};

const doubled = processExpenses(
    [{ amount: 100 }, { amount: 200 }],
    (e) => ({ ...e, amount: e.amount * 2 })
);
```

### Higher-Order Functions

```javascript
// Function ที่ return function
const multiplier = (factor) => {
    return (number) => number * factor;
};

const double = multiplier(2);
const triple = multiplier(3);

double(5);  // 10
triple(5);  // 15

// ใช้จริง - createFilter
const createFilter = (category) => {
    return (expense) => expense.category === category;
};

const isFoodExpense = createFilter("food");
expenses.filter(isFoodExpense);
```

---

## 8. Conditionals

### if/else

```javascript
const age = 20;

if (age >= 18) {
    console.log("Adult");
} else if (age >= 13) {
    console.log("Teen");
} else {
    console.log("Child");
}

// Short (single line)
if (age >= 18) console.log("Adult");
```

### Ternary Operator

```javascript
const status = age >= 18 ? "Adult" : "Minor";

// Nested (หลีกเลี่ยงถ้าซับซ้อน)
const category = age >= 18 ? "adult" : age >= 13 ? "teen" : "child";

// ใช้ใน JSX/Template
const message = `You are ${isLoggedIn ? "logged in" : "not logged in"}`;
```

### Switch

```javascript
const day = "Monday";

switch (day) {
    case "Monday":
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
    case "Friday":
        console.log("Weekday");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend");
        break;
    default:
        console.log("Invalid day");
}
```

### Logical Operators for Control Flow

```javascript
// Short-circuit AND
const user = { name: "John" };
user && console.log(user.name);  // ถ้า user มีค่า → log

// Short-circuit OR
const name = user.name || "Guest";  // ถ้า falsy → ใช้ "Guest"

// Nullish coalescing
const name2 = user.name ?? "Guest";  // ถ้า null/undefined → ใช้ "Guest"

// Logical assignment
user.name ||= "Guest";  // ถ้า name เป็น falsy → assign "Guest"
user.name ??= "Guest";  // ถ้า name เป็น null/undefined → assign "Guest"
```

### Guard Clauses (แนะนำ!)

```javascript
// แทนที่จะ nested if
const processExpense = (expense) => {
    if (!expense) return null;
    if (expense.amount <= 0) return null;
    if (!expense.category) return null;

    // process...
    return expense;
};

// ดีกว่า nested:
const bad = (expense) => {
    if (expense) {
        if (expense.amount > 0) {
            if (expense.category) {
                // process...
            }
        }
    }
};
```

---

## 9. Loops

### for Loop

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);  // 0, 1, 2, 3, 4
}

// นับถอยหลัง
for (let i = 5; i > 0; i--) {
    console.log(i);  // 5, 4, 3, 2, 1
}
```

### for...of (ใช้กับ Array)

```javascript
const fruits = ["apple", "banana", "orange"];

for (const fruit of fruits) {
    console.log(fruit);
}

// พร้อม index
for (const [index, fruit] of fruits.entries()) {
    console.log(`${index}: ${fruit}`);
}
```

### for...in (ใช้กับ Object)

```javascript
const user = { name: "John", age: 25 };

for (const key in user) {
    console.log(`${key}: ${user[key]}`);
}
// name: John
// age: 25
```

### while

```javascript
let count = 0;

while (count < 5) {
    console.log(count);
    count++;
}
```

### do...while

```javascript
let count = 0;

do {
    console.log(count);
    count++;
} while (count < 5);
```

### break & continue

```javascript
// break - หยุดลูป
for (let i = 0; i < 10; i++) {
    if (i === 5) break;
    console.log(i);  // 0, 1, 2, 3, 4
}

// continue - ข้ามรอบนี้
for (let i = 0; i < 5; i++) {
    if (i === 2) continue;
    console.log(i);  // 0, 1, 3, 4
}
```

### ใช้ Array Methods แทน (แนะนำ!)

```javascript
const numbers = [1, 2, 3, 4, 5];

// แทน for loop
// for → forEach
numbers.forEach(n => console.log(n));

// for + push → map
const doubled = numbers.map(n => n * 2);

// for + if + push → filter
const evens = numbers.filter(n => n % 2 === 0);

// for + sum → reduce
const total = numbers.reduce((sum, n) => sum + n, 0);
```

---

## 10. Classes

### Basic Class

```javascript
class Expense {
    constructor(amount, category, description = "") {
        this.id = Date.now();
        this.amount = amount;
        this.category = category;
        this.description = description;
        this.createdAt = new Date();
    }

    // Method
    getInfo() {
        return `${this.category}: ${this.amount} บาท`;
    }

    // Getter
    get formattedAmount() {
        return `฿${this.amount.toFixed(2)}`;
    }

    // Setter
    set newAmount(value) {
        if (value < 0) throw new Error("Amount must be positive");
        this.amount = value;
    }

    // Static method (เรียกจาก class ไม่ใช่ instance)
    static createFood(amount, description) {
        return new Expense(amount, "food", description);
    }
}

// Usage
const expense = new Expense(150, "food", "ข้าวมันไก่");
expense.getInfo();          // "food: 150 บาท"
expense.formattedAmount;    // "฿150.00"

const food = Expense.createFood(100, "ก๋วยเตี๋ยว");
```

### Inheritance

```javascript
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    greet() {
        return `Hello, I'm ${this.name}`;
    }
}

class Admin extends User {
    constructor(name, email, role) {
        super(name, email);  // เรียก parent constructor
        this.role = role;
    }

    greet() {
        return `${super.greet()}, I'm an ${this.role}`;
    }

    deleteUser(userId) {
        console.log(`Admin ${this.name} deleted user ${userId}`);
    }
}

const admin = new Admin("John", "john@admin.com", "Super Admin");
admin.greet();  // "Hello, I'm John, I'm an Super Admin"
```

### Private Fields (Modern)

```javascript
class BankAccount {
    #balance = 0;  // Private field

    constructor(initialBalance) {
        this.#balance = initialBalance;
    }

    deposit(amount) {
        this.#balance += amount;
    }

    withdraw(amount) {
        if (amount > this.#balance) {
            throw new Error("Insufficient funds");
        }
        this.#balance -= amount;
    }

    get balance() {
        return this.#balance;
    }
}

const account = new BankAccount(1000);
account.deposit(500);
account.balance;     // 1500
// account.#balance; // Error! Private field
```

---

## 11. Async/Await & Fetch (สำคัญมาก!)

### Promise Basics

```javascript
// สร้าง Promise
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;
            if (success) {
                resolve({ data: "Hello" });
            } else {
                reject(new Error("Failed"));
            }
        }, 1000);
    });
};

// ใช้ .then/.catch (แบบเก่า)
fetchData()
    .then(result => console.log(result))
    .catch(error => console.error(error));
```

### Async/Await (แนะนำ!)

```javascript
// Async function
const getData = async () => {
    try {
        const result = await fetchData();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// เรียกใช้
getData();

// หรือใช้ IIFE
(async () => {
    const data = await getData();
})();
```

### Fetch API

```javascript
// GET request
const getUsers = async () => {
    try {
        const response = await fetch("https://api.example.com/users");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};

// POST request
const createUser = async (userData) => {
    try {
        const response = await fetch("https://api.example.com/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Create error:", error);
        throw error;
    }
};

// PUT request
const updateUser = async (id, userData) => {
    const response = await fetch(`https://api.example.com/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return response.json();
};

// DELETE request
const deleteUser = async (id) => {
    const response = await fetch(`https://api.example.com/users/${id}`, {
        method: "DELETE",
    });
    return response.ok;
};
```

### Parallel Requests

```javascript
// รอทั้งหมดพร้อมกัน
const fetchAll = async () => {
    const [users, posts, comments] = await Promise.all([
        fetch("/api/users").then(r => r.json()),
        fetch("/api/posts").then(r => r.json()),
        fetch("/api/comments").then(r => r.json()),
    ]);

    return { users, posts, comments };
};

// Promise methods
Promise.all([p1, p2, p3])      // รอทุกอัน, error ถ้ามี 1 ตัว fail
Promise.allSettled([p1, p2])   // รอทุกอัน, ได้ผลทุกตัว
Promise.race([p1, p2, p3])     // ได้ตัวแรกที่เสร็จ (success หรือ fail)
Promise.any([p1, p2, p3])      // ได้ตัวแรกที่สำเร็จ
```

---

## 12. Error Handling

### try/catch/finally

```javascript
const fetchData = async () => {
    try {
        const response = await fetch("/api/data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error.message);
        // Handle error (show notification, etc.)
        return null;
    } finally {
        // Always runs
        console.log("Fetch completed");
    }
};
```

### Throwing Errors

```javascript
const validateExpense = (expense) => {
    if (!expense) {
        throw new Error("Expense is required");
    }
    if (expense.amount <= 0) {
        throw new Error("Amount must be positive");
    }
    if (!expense.category) {
        throw new Error("Category is required");
    }
    return true;
};

// Usage
try {
    validateExpense({ amount: -100 });
} catch (error) {
    console.error(error.message);  // "Amount must be positive"
}
```

### Custom Error Classes

```javascript
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}

class NetworkError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "NetworkError";
        this.statusCode = statusCode;
    }
}

// Usage
const validateAmount = (amount) => {
    if (amount <= 0) {
        throw new ValidationError("Amount must be positive", "amount");
    }
};

try {
    validateAmount(-100);
} catch (error) {
    if (error instanceof ValidationError) {
        console.log(`Validation failed for ${error.field}: ${error.message}`);
    } else {
        throw error;
    }
}
```

---

## 13. Modules (Import/Export)

### Named Export

```javascript
// utils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

export const formatMoney = (amount) => {
    return `฿${amount.toFixed(2)}`;
};
```

### Default Export

```javascript
// Expense.js
export default class Expense {
    constructor(amount, category) {
        this.amount = amount;
        this.category = category;
    }
}

// หรือ
const Expense = class { /* ... */ };
export default Expense;
```

### Import

```javascript
// Named import
import { add, subtract } from "./utils.js";

// Rename
import { add as plus } from "./utils.js";

// Import all
import * as utils from "./utils.js";
utils.add(1, 2);

// Default import
import Expense from "./Expense.js";

// Mixed
import Expense, { formatMoney } from "./expense-utils.js";
```

### Re-export

```javascript
// index.js (barrel file)
export { add, subtract } from "./math.js";
export { formatMoney } from "./format.js";
export { default as Expense } from "./Expense.js";

// Usage
import { add, formatMoney, Expense } from "./utils/index.js";
```

---

## 14. DOM Manipulation

### Selecting Elements

```javascript
// By ID
const header = document.getElementById("header");

// By CSS selector (single)
const button = document.querySelector(".btn");
const nav = document.querySelector("nav");
const specific = document.querySelector("#main .content p");

// By CSS selector (multiple)
const allButtons = document.querySelectorAll(".btn");
const allParagraphs = document.querySelectorAll("p");
```

### Creating & Modifying Elements

```javascript
// Create
const div = document.createElement("div");
const p = document.createElement("p");

// Set content
div.textContent = "Plain text";  // ปลอดภัยจาก XSS
div.innerHTML = "<span>HTML</span>";  // ระวัง XSS!

// Set attributes
div.id = "my-div";
div.className = "container active";
div.setAttribute("data-id", "123");

// Classes
div.classList.add("new-class");
div.classList.remove("old-class");
div.classList.toggle("active");
div.classList.contains("active");  // true/false

// Styles
div.style.color = "red";
div.style.backgroundColor = "blue";
div.style.cssText = "color: red; background: blue;";
```

### Adding & Removing Elements

```javascript
const parent = document.querySelector("#container");
const child = document.createElement("div");

// Add
parent.appendChild(child);
parent.append(child1, child2, "text");  // Multiple
parent.prepend(child);  // Add at start
parent.insertBefore(newNode, referenceNode);

// Insert adjacent
element.insertAdjacentHTML("beforebegin", "<p>Before</p>");
element.insertAdjacentHTML("afterbegin", "<p>First child</p>");
element.insertAdjacentHTML("beforeend", "<p>Last child</p>");
element.insertAdjacentHTML("afterend", "<p>After</p>");

// Remove
child.remove();
parent.removeChild(child);

// Replace
parent.replaceChild(newChild, oldChild);
```

### Event Listeners

```javascript
const button = document.querySelector(".btn");

// Add event
button.addEventListener("click", (event) => {
    event.preventDefault();  // ยกเลิก default behavior
    event.stopPropagation();  // หยุดไม่ให้ bubble up

    console.log(event.target);  // Element ที่ถูก click
    console.log(event.currentTarget);  // Element ที่ผูก listener
});

// Remove event
const handleClick = () => console.log("clicked");
button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);

// Common events
// click, dblclick, mouseenter, mouseleave, mouseover, mouseout
// keydown, keyup, keypress
// submit, change, input, focus, blur
// load, DOMContentLoaded, scroll, resize
```

### Event Delegation

```javascript
// แทนที่จะผูก event กับทุก item
// ผูกที่ parent แล้วเช็ค target
const list = document.querySelector("#expense-list");

list.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest(".delete-btn");
    if (deleteBtn) {
        const expenseId = deleteBtn.dataset.id;
        deleteExpense(expenseId);
    }
});
```

### Example: Expense List

```javascript
const renderExpenses = (expenses) => {
    const list = document.querySelector("#expense-list");
    list.innerHTML = "";  // Clear

    expenses.forEach(expense => {
        const item = document.createElement("div");
        item.className = "expense-item";
        item.innerHTML = `
            <span class="category">${expense.category}</span>
            <span class="amount">฿${expense.amount}</span>
            <button class="delete-btn" data-id="${expense.id}">ลบ</button>
        `;
        list.appendChild(item);
    });
};

// Event delegation for delete
document.querySelector("#expense-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const id = e.target.dataset.id;
        // Delete expense...
    }
});
```

---

## 15. Local Storage

### Basic Operations

```javascript
// Save string
localStorage.setItem("username", "John");

// Get string
const username = localStorage.getItem("username");  // "John"

// Remove
localStorage.removeItem("username");

// Clear all
localStorage.clear();
```

### Save/Load Objects & Arrays

```javascript
// Save object/array (ต้องแปลงเป็น JSON)
const expenses = [
    { id: 1, amount: 100, category: "food" },
    { id: 2, amount: 50, category: "transport" }
];

localStorage.setItem("expenses", JSON.stringify(expenses));

// Load (ต้องแปลงกลับเป็น object)
const loaded = JSON.parse(localStorage.getItem("expenses"));
// หรือถ้าไม่มีให้เป็น array ว่าง
const expenses2 = JSON.parse(localStorage.getItem("expenses")) || [];
```

### Helper Functions

```javascript
const storage = {
    get: (key, defaultValue = null) => {
        const item = localStorage.getItem(key);
        if (!item) return defaultValue;
        try {
            return JSON.parse(item);
        } catch {
            return item;
        }
    },

    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },

    remove: (key) => {
        localStorage.removeItem(key);
    },

    clear: () => {
        localStorage.clear();
    }
};

// Usage
storage.set("expenses", expenses);
const loaded = storage.get("expenses", []);
```

### Session Storage

```javascript
// เหมือน localStorage แต่หายเมื่อปิด tab/browser
sessionStorage.setItem("temp", "value");
sessionStorage.getItem("temp");
```

---

## 16. Date & Time

### Creating Dates

```javascript
const now = new Date();
const specific = new Date("2024-01-15");
const withTime = new Date("2024-01-15T10:30:00");
const fromParts = new Date(2024, 0, 15);  // Month is 0-indexed!
const timestamp = Date.now();  // milliseconds since 1970
```

### Getting Values

```javascript
const date = new Date();

date.getFullYear()   // 2024
date.getMonth()      // 0-11 (January = 0!)
date.getDate()       // 1-31 (day of month)
date.getDay()        // 0-6 (Sunday = 0)
date.getHours()      // 0-23
date.getMinutes()    // 0-59
date.getSeconds()    // 0-59
date.getTime()       // timestamp (milliseconds)
```

### Formatting

```javascript
const date = new Date();

// Built-in (locale-aware)
date.toLocaleDateString("th-TH")  // "15/1/2567"
date.toLocaleTimeString("th-TH")  // "10:30:00"
date.toLocaleString("th-TH")      // "15/1/2567 10:30:00"

// ISO format
date.toISOString()    // "2024-01-15T03:30:00.000Z"
date.toDateString()   // "Mon Jan 15 2024"
date.toTimeString()   // "10:30:00 GMT+0700"

// Custom format (manual)
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
formatDate(new Date());  // "2024-01-15"
```

### Intl.DateTimeFormat (แนะนำ!)

```javascript
const date = new Date();

// Thai format
new Intl.DateTimeFormat("th-TH").format(date);
// "15/1/2567"

// Custom options
new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
}).format(date);
// "วันจันทร์ที่ 15 มกราคม 2567"
```

### Date Calculations

```javascript
const date = new Date();

// Add days
date.setDate(date.getDate() + 7);  // +7 days

// Add months
date.setMonth(date.getMonth() + 1);  // +1 month

// Difference between dates
const date1 = new Date("2024-01-01");
const date2 = new Date("2024-01-15");
const diffTime = date2 - date1;  // milliseconds
const diffDays = diffTime / (1000 * 60 * 60 * 24);  // 14 days
```

---

## 17. JSON

### Parse & Stringify

```javascript
// Object → JSON string
const user = { name: "John", age: 25 };
const jsonString = JSON.stringify(user);
// '{"name":"John","age":25}'

// Pretty print
const pretty = JSON.stringify(user, null, 2);
/*
{
  "name": "John",
  "age": 25
}
*/

// JSON string → Object
const parsed = JSON.parse(jsonString);
// { name: "John", age: 25 }

// Safe parse (with default)
const safeParse = (str, defaultValue = null) => {
    try {
        return JSON.parse(str);
    } catch {
        return defaultValue;
    }
};
```

### Deep Clone

```javascript
// Shallow copy (ไม่ copy nested)
const shallow = { ...user };

// Deep clone (copy ทุกระดับ)
const deep = JSON.parse(JSON.stringify(user));

// Modern way (if available)
const deep2 = structuredClone(user);
```

---

## 18. Destructuring & Spread

### Array Destructuring

```javascript
const numbers = [1, 2, 3, 4, 5];

// Basic
const [first, second] = numbers;  // first=1, second=2

// Skip
const [, , third] = numbers;  // third=3

// Rest
const [head, ...tail] = numbers;  // head=1, tail=[2,3,4,5]

// Default
const [a, b, c = 0] = [1, 2];  // c=0

// Swap
let x = 1, y = 2;
[x, y] = [y, x];  // x=2, y=1
```

### Object Destructuring

```javascript
const user = {
    name: "John",
    age: 25,
    address: {
        city: "Bangkok",
        zip: "10110"
    }
};

// Basic
const { name, age } = user;

// Rename
const { name: userName } = user;

// Default
const { phone = "N/A" } = user;

// Nested
const { address: { city } } = user;

// Rest
const { name, ...rest } = user;  // rest = { age: 25, address: {...} }

// In function params
const greet = ({ name, age }) => {
    return `${name} is ${age}`;
};
greet(user);
```

### Spread Operator

```javascript
// Array
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2];  // [1,2,3,4,5,6]
const copy = [...arr1];  // [1,2,3]
const withNew = [...arr1, 0, ...arr2];  // [1,2,3,0,4,5,6]

// Object
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3 };
const merged2 = { ...obj1, ...obj2 };  // { a:1, b:2, c:3 }
const updated = { ...obj1, b: 99 };  // { a:1, b:99 }

// Function args
const numbers = [1, 2, 3];
Math.max(...numbers);  // 3
```

---

## 19. Modern JS Features

### Optional Chaining (?.)

```javascript
const user = {
    name: "John",
    address: {
        city: "Bangkok"
    }
};

user?.address?.city      // "Bangkok"
user?.phone?.number      // undefined (ไม่ error)
user?.getInfo?.()        // undefined (ไม่ error)
```

### Nullish Coalescing (??)

```javascript
const name = null ?? "Guest";      // "Guest"
const name2 = undefined ?? "Guest"; // "Guest"
const name3 = "" ?? "Guest";       // "" (empty string ไม่ใช่ nullish)
const count = 0 ?? 10;             // 0 (0 ไม่ใช่ nullish)
```

### Logical Assignment

```javascript
let user = { name: null };

user.name ||= "Guest";   // ถ้า falsy → assign
user.name ??= "Guest";   // ถ้า nullish → assign
user.isAdmin &&= false;  // ถ้า truthy → assign
```

### Array Methods

```javascript
// at() - negative index
const arr = [1, 2, 3, 4, 5];
arr.at(-1);   // 5 (last)
arr.at(-2);   // 4 (second last)

// flat() - flatten nested
[[1, 2], [3, 4]].flat();  // [1, 2, 3, 4]
[1, [2, [3]]].flat(2);    // [1, 2, 3]

// flatMap() - map + flat
[1, 2, 3].flatMap(x => [x, x * 2]);  // [1, 2, 2, 4, 3, 6]

// Array.from()
Array.from("hello");         // ["h", "e", "l", "l", "o"]
Array.from({ length: 5 }, (_, i) => i);  // [0, 1, 2, 3, 4]
```

### Object Methods

```javascript
// Object.fromEntries()
Object.fromEntries([["a", 1], ["b", 2]]);  // { a: 1, b: 2 }

// Object.hasOwn() (แนะนำแทน hasOwnProperty)
Object.hasOwn(obj, "name");  // true/false
```

### String Methods

```javascript
// replaceAll()
"aaa".replaceAll("a", "b");  // "bbb"

// at()
"hello".at(-1);  // "o"

// trimStart(), trimEnd()
"  hello  ".trimStart();  // "hello  "
"  hello  ".trimEnd();    // "  hello"
```

### Numeric Separators

```javascript
const billion = 1_000_000_000;
const bytes = 0xFF_FF_FF;
const binary = 0b1010_0001;
```

---

## ตัวอย่าง: Expense Tracker Functions

```javascript
// Data
let expenses = [];

// Add expense
const addExpense = (amount, category, description = "") => {
    const expense = {
        id: Date.now(),
        amount,
        category,
        description,
        date: new Date().toISOString(),
    };
    expenses = [...expenses, expense];
    saveToStorage();
    return expense;
};

// Edit expense
const editExpense = (id, updates) => {
    expenses = expenses.map(e =>
        e.id === id ? { ...e, ...updates } : e
    );
    saveToStorage();
};

// Delete expense
const deleteExpense = (id) => {
    expenses = expenses.filter(e => e.id !== id);
    saveToStorage();
};

// Get by category
const getByCategory = (category) => {
    return expenses.filter(e => e.category === category);
};

// Get total
const getTotal = (expenseList = expenses) => {
    return expenseList.reduce((sum, e) => sum + e.amount, 0);
};

// Get total by category
const getTotalByCategory = () => {
    return expenses.reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
    }, {});
};

// Get by date range
const getByDateRange = (startDate, endDate) => {
    return expenses.filter(e => {
        const date = new Date(e.date);
        return date >= new Date(startDate) && date <= new Date(endDate);
    });
};

// Storage
const saveToStorage = () => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
};

const loadFromStorage = () => {
    expenses = JSON.parse(localStorage.getItem("expenses")) || [];
};

// Format
const formatMoney = (amount) => {
    return new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB"
    }).format(amount);
};
```

---

## Next Steps

หลังจบ JavaScript:
1. **TypeScript** - JavaScript + Type safety
2. **React/Vue/Svelte** - Frontend framework
3. **Node.js** - Backend JavaScript
4. **Build "Deep Expense Tracker"** - โปรเจคจริง!
