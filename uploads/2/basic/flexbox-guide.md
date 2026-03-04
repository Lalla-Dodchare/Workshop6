# CSS Flexbox คืออะไร?

Flexbox เป็นระบบ layout ที่ช่วยจัดเรียง elements ใน **แถวเดียว** (row) หรือ **คอลัมน์เดียว** (column) ได้ง่าย

## หลักการสำคัญ

```css
.container {
  display: flex;  /* เปิดใช้ Flexbox */
}
```

เมื่อใส่ `display: flex` ลงใน parent element:
- Parent = **Flex Container**
- Children = **Flex Items**

---

## 5 Properties ที่ต้องรู้

### 1. `flex-direction` - กำหนดทิศทาง

```css
.container {
  display: flex;
  flex-direction: row;      /* default: เรียงซ้าย→ขวา */
  flex-direction: column;   /* เรียงบน→ล่าง */
}
```

### 2. `justify-content` - จัดเรียงตาม **แกนหลัก** (Main Axis)

```css
.container {
  justify-content: flex-start;    /* ชิดซ้าย (default) */
  justify-content: center;        /* กลาง */
  justify-content: flex-end;      /* ชิดขวา */
  justify-content: space-between; /* กระจายห่างเท่ากัน */
  justify-content: space-around;  /* มีช่องว่างรอบทุกตัว */
}
```

### 3. `align-items` - จัดเรียงตาม **แกนตั้ง** (Cross Axis)

```css
.container {
  align-items: stretch;     /* ยืดเต็ม (default) */
  align-items: flex-start;  /* ชิดบน */
  align-items: center;      /* กลาง */
  align-items: flex-end;    /* ชิดล่าง */
}
```

### 4. `gap` - ระยะห่างระหว่าง items

```css
.container {
  gap: 20px;         /* ห่าง 20px ทุกทิศ */
  gap: 10px 20px;    /* row-gap column-gap */
}
```

### 5. `flex-wrap` - ให้ items ขึ้นบรรทัดใหม่ได้

```css
.container {
  flex-wrap: nowrap;  /* default: บีบอัดอยู่บรรทัดเดียว */
  flex-wrap: wrap;    /* ขึ้นบรรทัดใหม่ถ้าไม่พอ */
}
```

---

## ตัวอย่างที่ใช้บ่อย

### Center ทั้งแนวนอนและแนวตั้ง

```css
.container {
  display: flex;
  justify-content: center;  /* แนวนอน */
  align-items: center;      /* แนวตั้ง */
  height: 100vh;
}
```

### Navbar (logo ซ้าย, menu ขวา)

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}
```

### Card Layout (กระจายเท่ากัน)

```css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px;  /* grow, shrink, min-width */
}
```

---

## เคล็ดลับจำ justify vs align

| flex-direction | justify-content | align-items |
|----------------|-----------------|-------------|
| `row` (default)| แนวนอน ← → | แนวตั้ง ↑ ↓ |
| `column` | แนวตั้ง ↑ ↓ | แนวนอน ← → |

**จำง่ายๆ:** justify = แกนหลัก, align = แกนตั้งฉาก

---

## ลองทำ

1. **Navbar** ที่มี logo ซ้าย, menu ขวา
2. **3 Cards** เรียงกัน กระจายเท่ากัน
3. **Center** ข้อความกลางหน้าจอ
