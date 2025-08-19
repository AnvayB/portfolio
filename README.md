# 🚀 Awwwards-Style Portfolio

A cutting-edge portfolio website featuring immersive 3D elements, smooth animations, and modern design principles. Built with React, Three.js, and advanced web technologies.

## ✨ Features

- **3D Interactive Elements**: Floating text, particle systems, and distorted spheres using React Three Fiber
- **Smooth Animations**: Framer Motion-powered transitions with custom timing functions
- **Responsive Design**: Mobile-first approach with beautiful layouts on all devices
- **Performance Optimized**: Lazy loading, efficient rendering, and minimal bundle size
- **Modern Design System**: Dark theme with cyan/purple gradients and glass morphism effects
- **Filterable Portfolio**: Dynamic project filtering with smooth transitions
- **Interactive Timeline**: Professional experience with elegant animations
- **Contact Form**: Functional form with 3D background elements

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **3D Graphics**: React Three Fiber, Three.js, Drei
- **Animations**: Framer Motion, GSAP
- **Styling**: Tailwind CSS, Custom Design System
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React
- **Build Tool**: Vite with SWC

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── HeroSection.tsx     # 3D hero with floating text
│   ├── Navigation.tsx      # Animated navigation bar
│   ├── PortfolioSection.tsx # Filterable project grid
│   ├── ExperienceSection.tsx # Timeline with achievements
│   ├── EducationSection.tsx # Academic background & certs
│   └── ContactSection.tsx  # Contact form with 3D bg
├── pages/
│   ├── Index.tsx          # Main portfolio page
│   ├── Portfolio.tsx      # Portfolio layout
│   └── NotFound.tsx       # 404 error page
├── hooks/
│   ├── use-mobile.tsx     # Mobile detection hook
│   └── use-toast.ts       # Toast notifications
├── lib/
│   └── utils.ts           # Utility functions
├── index.css              # Design system & global styles
└── main.tsx               # App entry point
```

## 🎨 Design System

The portfolio uses a comprehensive design system with:

- **Colors**: HSL-based color palette with cyan/purple gradients
- **Typography**: Inter font family with display and body variants
- **Animations**: Custom keyframes and timing functions
- **Effects**: Glass morphism, glows, and backdrop blur
- **Responsive**: Mobile-first breakpoints and fluid typography

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Customization Guide

### Colors & Branding
Edit `src/index.css` to customize the color palette:
```css
:root {
  --primary: 185 90% 55%;        /* Main brand color */
  --secondary: 280 90% 70%;      /* Secondary color */
  --background: 240 10% 3.9%;    /* Background */
  --foreground: 0 0% 98%;        /* Text color */
}
```

### Content
1. **Hero Section**: Update name and tagline in `HeroSection.tsx`
2. **Portfolio Items**: Modify the `portfolioItems` array in `PortfolioSection.tsx`
3. **Experience**: Update the `experiences` array in `ExperienceSection.tsx`
4. **Education**: Modify the `education` and `certifications` arrays
5. **Contact Info**: Update contact details in `ContactSection.tsx`

### 3D Elements
- **Particles**: Adjust count and behavior in `HeroSection.tsx`
- **Floating Text**: Modify 3D text properties and animations
- **Background Spheres**: Customize distortion and materials in `ContactSection.tsx`

### Animations
- **Timing**: Modify easing functions in `tailwind.config.ts`
- **Delays**: Adjust stagger delays in component animations
- **Keyframes**: Add custom animations in `index.css`

## 📱 Mobile Optimization

- Responsive 3D elements with performance considerations
- Touch-friendly navigation and interactions
- Optimized animations for mobile devices
- Fallback experiences for lower-end devices

## 🔧 Performance Tips

1. **Image Optimization**: Use modern formats (WebP, AVIF)
2. **Lazy Loading**: Implement for non-critical sections
3. **3D Optimization**: Reduce polygon count for mobile
4. **Bundle Splitting**: Code splitting for route-based chunks

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

## 📞 Contact

- **Email**: hello@yourname.com
- **LinkedIn**: [Your LinkedIn](https://linkedin.com/in/yourname)
- **GitHub**: [Your GitHub](https://github.com/yourname)

---

Built with ❤️ using React, Three.js, and modern web technologies.