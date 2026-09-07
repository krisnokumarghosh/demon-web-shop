# ⚔️ Demon Web Shop

A modern, anime-inspired fashion e-commerce frontend built with **Next.js**, featuring smooth scrolling, immersive animations, responsive layouts, and a visually distinctive shopping experience.

🔗 **Live Demo:** https://demon-web-shop.vercel.app

---

## ✨ Features

* 🎴 Anime-inspired modern UI
* 🛍️ Product collection browsing
* 🔎 Individual product details pages
* 🎨 Multiple product variations
* 📱 Fully responsive design
* 🌀 Smooth scrolling with **Lenis**
* 🎬 Interactive animations with **Framer Motion**
* ⚡ Fast navigation with Next.js App Router
* 🖼️ High-quality product imagery
* 🎞️ Video-based hero section
* 📜 Lookbook section
* 📖 Brand story section
* 🏷️ Latest drops & sale sections
* 📢 Animated marquee sections
* 🎯 Reusable and component-based architecture

---

## 🛠️ Tech Stack

### Frontend

* **Next.js**
* **React**
* **JavaScript**
* **Tailwind CSS**

### UI & Animation

* **HeroUI**
* **Framer Motion**
* **Lenis**
* **Gravity UI Icons**
* **Lucide Icons**

### Deployment

* **Vercel**

---

## 📁 Project Structure

```text
demon-web-shop/
│
├── public/
│   ├── images/
│   │   ├── banner-2.jpg
│   │   ├── Blue-flame-1.avif
│   │   ├── Blue-flame-2.avif
│   │   ├── Blue-flame-3.avif
│   │   ├── Blue-flame-4.avif
│   │   ├── Bushido-1.avif
│   │   ├── Bushido-2.avif
│   │   ├── Bushido-3.avif
│   │   ├── Bushido-4.avif
│   │   ├── Demon-blood-1.avif
│   │   ├── Demon-blood-2.avif
│   │   ├── Demon-blood-3.avif
│   │   ├── Demon-blood-4.avif
│   │   ├── Domain-expansion-1.avif
│   │   ├── Domain-expansion-2.avif
│   │   ├── Domain-expansion-3.avif
│   │   ├── Domain-expansion-4.avif
│   │   ├── Free-soul-1.avif
│   │   ├── Free-soul-2.avif
│   │   ├── Free-soul-5.avif
│   │   ├── Limitless-1.avif
│   │   ├── Limitless-2.avif
│   │   ├── Limitless-3.avif
│   │   ├── Limitless-4.avif
│   │   ├── Paradise-spirit-1.avif
│   │   ├── Paradise-spirit-2.avif
│   │   ├── Paradise-spirit-3.avif
│   │   └── Paradise-spirit-4.avif
│   │
│   ├── data.json
│   ├── hero.mp4
│   ├── katana.png
│   └── ...
│
├── src/
│   ├── app/
│   │   ├── collection/
│   │   │   ├── [id]/
│   │   │   │   └── page.jsx
│   │   │   └── page.jsx
│   │   │
│   │   ├── drop/
│   │   │   └── page.jsx
│   │   │
│   │   ├── lookbook/
│   │   │   └── page.jsx
│   │   │
│   │   ├── story/
│   │   │   └── page.jsx
│   │   │
│   │   ├── globals.css
│   │   ├── icon.png
│   │   ├── layout.js
│   │   └── page.js
│   │
│   ├── components/
│   │   ├── homepage/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── LatestDropsSection.jsx
│   │   │   ├── ManifestoSection.jsx
│   │   │   ├── Marquee.jsx
│   │   │   └── SaleSection.jsx
│   │   │
│   │   ├── shared/
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProductDetailsClient.jsx
│   │   │
│   │   ├── CollectionComponent.jsx
│   │   └── SmoothScroll.jsx
│   │
│   └── lib/
│       └── fonts.js
│
├── package.json
├── package-lock.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/demon-web-shop.git
```

### 2. Navigate to the project

```bash
cd demon-web-shop
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser to view the project.

---

## 🎨 Main Sections

### 🏠 Homepage

The homepage contains:

* Hero section with video background
* Latest product drops
* Brand manifesto
* Animated marquee
* Sale section
* Navigation and footer

### 🛍️ Collection

Users can browse the complete product collection and open individual products for detailed information.

### ⚡ Drops

A dedicated section for showcasing the latest product releases.

### 📸 Lookbook

A visual-focused section designed to showcase the brand and products through imagery.

### 📖 Story

A dedicated brand story section explaining the identity and concept behind Demon Web Shop.

---

## 🌀 Smooth Scrolling

The project uses **Lenis** to create a smooth and premium scrolling experience across the website.

The implementation is separated into a reusable component:

```text
src/components/SmoothScroll.jsx
```

This keeps the scrolling logic independent from the rest of the application.

---

## 🧩 Component Architecture

The project follows a reusable component-based structure.

### Homepage Components

```text
components/homepage/
├── HeroSection.jsx
├── LatestDropsSection.jsx
├── ManifestoSection.jsx
├── Marquee.jsx
└── SaleSection.jsx
```

### Shared Components

```text
components/shared/
├── Navbar.jsx
├── Footer.jsx
├── ProductCard.jsx
└── ProductDetailsClient.jsx
```

This makes the UI easier to maintain and allows common components to be reused across different pages.

---

## 📱 Responsive Design

Demon Web Shop is designed to provide a consistent experience across:

* 📱 Mobile devices
* 📲 Tablets
* 💻 Laptops
* 🖥️ Desktop screens

The layout, typography, imagery, navigation, and animations adapt to different screen sizes.

---

## 🌐 Live Demo

Experience the project here:

**[Demon Web Shop](https://demon-web-shop.vercel.app)**