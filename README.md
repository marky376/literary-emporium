# Literary Emporium# Literary Emporium — minimal frontend scaffold



A modern, boutique e-commerce platform for book lovers. Built with React, Vite, and deployed on Vercel with serverless API functions.This repository is a small Vite + React scaffold for a classic-themed e-commerce UI for books.



## 🎯 Features# Quick start (Windows PowerShell):



✨ **AI-Powered Recommendations** - Personalized book suggestions based on cart contents and reading preferences  ```powershell

🔍 **Advanced Filtering** - Filter by genre, rating, sale items, and sort by price or rating  npm install

🎨 **Featured Collections** - Curated collections with beautiful carousel UI  npm run dev

🛒 **Full E-Commerce Flow** - Browse → Add to Cart → Checkout → Order Confirmation  ```

📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile  

🎯 **Modern UI/UX** - Clean typography, smooth animations, toast notificationsThe app runs at http://localhost:5173 by default.



## 🚀 Tech StackNotes:

- This is a minimal frontend prototype with sample data in `src/data/books.json`.

- **Frontend**: React 18, React Router v6- Cart is stored in `localStorage` for demo purposes. A mock serverless checkout endpoint is provided for demo only.

- **Build Tool**: Vite

- **Styling**: Custom CSS with CSS variablesDeploying to Vercel

- **Backend**: Vercel Serverless Functions (Node.js)

- **Deployment**: VercelThis project is ready to deploy to Vercel as a static site with a small serverless function for checkout.



## 📁 Project Structure1) From the project root you can build locally:



``````powershell

literary-emporium/npm run build

├── api/                          # Serverless functions```

│   ├── checkout.js              # Order processing endpoint

│   └── recommendations.js       # AI recommendation engine2) To deploy, either connect this GitHub repository to Vercel (recommended) or deploy from the CLI:

├── src/

│   ├── components/              # React components```powershell

│   │   ├── Carousel.jsx        # Horizontal scroll carouselnpm i -g vercel

│   │   ├── Featured.jsx        # Featured collections sectionvercel login

│   │   ├── Hero.jsx            # Hero bannervercel --prod

│   │   └── Toast.jsx           # Toast notification system```

│   ├── pages/                   # Page components

│   │   ├── Catalog.jsx         # Main catalog with filtersVercel will run `npm run build` and use the `dist` directory. The `vercel.json` in this repo instructs Vercel to treat files under `api/` as serverless Node functions (the mock checkout endpoint lives at `/api/checkout`).

│   │   ├── BookDetail.jsx      # Individual book page

│   │   ├── Cart.jsx            # Shopping cartSecurity & notes

│   │   ├── Order.jsx           # Order confirmation- The checkout endpoint is a demo-only serverless function and does not process payments or persist data. Replace with a real payment provider (Stripe, PayPal) and a database for production.

│   │   └── Recommendations.jsx # AI recommendations page

│   ├── data/# literary-emporium
│   │   └── books.json          # Book catalog data
│   ├── App.jsx                 # Main app component
│   ├── main.jsx               # App entry point
│   └── styles.css             # Global styles
├── index.html                  # HTML template
├── package.json               # Dependencies and scripts
├── vite.config.js            # Vite configuration
└── vercel.json               # Vercel deployment config
```

## 🛠️ Local Development

### Prerequisites
- Node.js 16+ and npm

### Setup & Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/marky376/literary-emporium.git
   cd literary-emporium
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open http://localhost:5173 in your browser.

4. **Build for production**
   ```bash
   npm run build
   ```

## 🚀 Deployment to Vercel

### Option 1: Deploy via Vercel CLI (Quick)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

Your site will be live in seconds! 🎉

### Option 2: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository: `marky376/literary-emporium`
4. Vercel will auto-detect Vite settings
5. Click **"Deploy"**

**That's it!** Your site will be live at: `https://literary-emporium-[your-id].vercel.app`

### Vercel Configuration

The included `vercel.json` configures:
- Static site build from `dist/`
- Serverless functions from `api/` directory
- Automatic deployment on git push

## 📡 API Endpoints

### POST /api/checkout
Processes orders and returns order confirmation.

**Request:**
```json
{
  "cart": [
    {"id": "1", "title": "Book Title", "price": 14.99, "qty": 1}
  ]
}
```

**Response:**
```json
{
  "orderId": "ORD-1730563200000",
  "total": 14.99,
  "cart": [...]
}
```

### POST /api/recommendations
Returns personalized book recommendations based on cart contents.

**Request:**
```json
{
  "cart": [
    {"id": "1", "genre": "fiction"}
  ]
}
```

**Response:**
```json
{
  "recommendations": [
    {"id": "5", "title": "...", "genre": "fiction", "rating": 4.6, ...}
  ]
}
```

## ✨ Key Features

### Catalog with Advanced Filtering
- **Genre filter**: Browse by science-fiction, fiction, fantasy, memoir, historical, mystery, dystopian
- **Sale filter**: Show only discounted items
- **Rating filter**: Minimum rating threshold (4+, 4.5+)
- **Sort options**: Featured, Price (Low→High, High→Low), Top Rated
- **Search**: Real-time search by title and author
- **Clear filters**: Reset all filters with one click
- **Results count**: Live count of filtered results

### AI-Powered Recommendations
- Analyzes cart contents (genres, ratings)
- Scores books based on genre match, rating, and sale status
- Returns top 8 personalized recommendations
- Graceful client-side fallback if API unavailable
- Updates dynamically as cart changes

### Featured Collections
- Curated themed collections (Curator's Picks, Cosmic Frontiers, Midnight Romances)
- Beautiful horizontal carousel with smooth scrolling
- Direct links to filtered catalog views
- Preview thumbnails of collection books
- Boutique editorial copy

### Shopping Experience
- Add to cart with toast notifications
- Persistent cart (localStorage)
- Full checkout flow
- Order confirmation page
- Responsive design for all screen sizes

## 📚 For Project Submission

### GitHub Repository
**URL**: https://github.com/marky376/literary-emporium

### Live Deployment
**URL**: [Add your Vercel deployment URL here after deploying]

### What to Submit
1. ✅ **GitHub repository link** - https://github.com/marky376/literary-emporium
2. ✅ **Live deployment URL** - Deploy to Vercel and add the URL
3. ✅ **README** - This file with complete setup and deployment instructions

### Quick Deployment Checklist
- [x] Code pushed to GitHub
- [ ] Deploy to Vercel (via CLI or dashboard)
- [ ] Add live URL to this README
- [ ] Test live site (browse, filter, cart, checkout, recommendations)
- [ ] Submit GitHub URL + Live URL

## 🎨 Screenshots

Visit the live site to explore:
- Browse 14+ curated books with beautiful cover images
- Filter by genre (science-fiction, fiction, fantasy, memoir, etc.)
- Add items to cart and complete checkout
- Get personalized AI recommendations
- Explore featured collections with carousel UI

## 💡 Technical Highlights

- **React Router**: Client-side routing with dynamic routes
- **Vite**: Lightning-fast dev server and optimized builds
- **Serverless Functions**: Auto-scaling API endpoints
- **CSS Variables**: Consistent theming throughout
- **LocalStorage**: Persistent cart across sessions
- **Toast System**: Non-intrusive user notifications
- **Responsive Grid**: Auto-fill layout adapts to screen size
- **Image Optimization**: Unsplash CDN with auto-format

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Run dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod
```

## 📝 Notes

- Cart data stored in `localStorage` (client-side only)
- Checkout endpoint is demo-only (no real payment processing)
- For production: Add Stripe/PayPal integration and database
- Serverless functions deploy automatically with Vercel

## 📄 License

MIT

---

**Built with ❤️ for book lovers by marky376**
