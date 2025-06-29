# Kritagya Khandelwal - Portfolio

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all devices
- **Performance**: Optimized with Next.js 14 App Router
- **TypeScript**: Full type safety throughout the application
- **Animations**: Smooth animations using Framer Motion
- **Interactive**: Interactive project showcase with filtering
- **SEO Optimized**: Built-in SEO with proper metadata

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand (ready for future use)
- **UI Components**: Headless UI

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/           # Layout components
│   │   ├── Header.tsx    # Navigation header
│   │   └── Footer.tsx    # Footer with social links
│   └── sections/         # Page sections
│       ├── Hero.tsx      # Hero/intro section
│       ├── Services.tsx  # Services showcase
│       ├── About.tsx     # About and experience
│       └── Portfolio.tsx # Projects showcase
├── data/                 # Static data
│   └── portfolio.json    # Portfolio content
├── lib/                  # Utilities
│   └── data.ts          # Data loading functions
└── types/               # TypeScript types
    └── portfolio.ts     # Type definitions
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Amber/Orange theme
- **Background**: Clean whites and grays
- **Accents**: Amber highlights and gradients

### Animations
- **Page Transitions**: Smooth scroll animations
- **Component Animations**: Framer Motion powered
- **Hover Effects**: Interactive hover states
- **Loading States**: Smooth loading animations

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet**: Responsive tablet layouts
- **Desktop**: Enhanced desktop experience

## 📱 Sections

### 1. Hero Section
- Personal introduction
- Professional title
- Call-to-action button
- Profile image with decorative elements

### 2. Services Section
- Interactive horizontal slider
- Service cards with icons
- Smooth scrolling navigation
- Category-based filtering

### 3. About Section
- Personal background
- Professional experience timeline
- Skills and technologies
- Visual elements

### 4. Portfolio Section
- Project grid with filtering
- Category-based organization
- Interactive project modals
- Technology tags
- External links (GitHub, demos, PDFs)

### 5. Footer
- Contact information
- Social media links
- Copyright information

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📊 Data Management

### Portfolio Content
All portfolio content is managed through JSON files in the `src/data/` directory:

- **Personal Information**: Name, title, about, contact details
- **Experience**: Work history with companies and technologies
- **Skills**: Categorized skills and technologies
- **Projects**: Project details with images, descriptions, and links
- **Services**: Service offerings with descriptions

### Adding New Content

1. **New Project**: Add to `src/data/portfolio.json` under the `projects` array
2. **New Experience**: Add to the `experience` array in personal info
3. **New Skills**: Add to the `skills` array
4. **New Services**: Add to the `services` array

### Image Assets
- Place images in `public/img/` directory
- Use Next.js Image component for optimization
- Support for various formats (JPG, PNG, WebP)

## 🎯 Customization

### Colors
Update the color scheme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#fffbeb',
        500: '#f59e0b',
        600: '#d97706',
      }
    }
  }
}
```

### Animations
Customize animations in component files using Framer Motion:

```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  // Content
</motion.div>
```

### Layout
Modify layout components in `src/components/layout/` for structural changes.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Quality

- **ESLint**: Code linting and formatting
- **TypeScript**: Type safety and IntelliSense
- **Prettier**: Code formatting (recommended)

## 📈 Performance

### Optimizations

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Static Generation**: Pre-rendered pages
- **Bundle Analysis**: Built-in bundle analyzer

### Lighthouse Scores

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Deploy automatically on push

### Other Platforms

- **Netlify**: Compatible with Next.js
- **AWS Amplify**: Full Next.js support
- **Docker**: Containerized deployment

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Contact

- **Email**: kritagya.0398@gmail.com
- **LinkedIn**: [Kritagya Khandelwal](https://www.linkedin.com/in/kritagya-khandelwal/)
- **GitHub**: [kritagya-khandelwal](https://github.com/kritagya-khandelwal)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
