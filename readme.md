# Game Explorer 🎮

[![Live Demo](https://img.shields.io/badge/Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://game-explorer-taupe.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

**Note: This project is a tech demo.** It serves as a responsive, high-performance video game discovery web application built to showcase modern web development practices using Next.js, TypeScript, and Bootstrap. It is powered by the [RAWG Video Games Database API](https://rawg.io/apidocs).

## ✨ Features

* **Rich Game Discovery:** Browse, search, and filter a massive catalog of video games by genre, platform, release date, and sorting order.

* **Detailed Spec Sheets:** Click on any game card to open a fully responsive, keyboard-accessible modal detailing developers, publishers, Metacritic scores, ESRB ratings, average playtime, and store links.

* **Performance Optimized:** Architected with Next.js Core Web Vitals in mind, featuring selective LCP (Largest Contentful Paint) image preloading for above-the-fold content and native lazy loading for off-screen assets.

* **Robust API Integration:** Standardized server-side API route handlers utilizing `force-dynamic` rendering, `no-store` caching, and dynamic route parameter unwrapping for Next.js 15+ compatibility.

* **Smart Data Handling:** Automatically sanitizes inconsistent API text data (e.g., filtering out unlocalized Cyrillic descriptions) to ensure a clean UI.

* **Developer Mock Mode:** Includes a toggleable local mock data environment to save API credits and allow offline UI development.

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)

* **Language:** [TypeScript](https://www.typescriptlang.org/)

* **Styling:** [Bootstrap 5](https://getbootstrap.com/) & CSS Modules

* **Icons:** Bootstrap Icons

* **Data Source:** [RAWG API](https://rawg.io/apidocs)

## 🚀 Getting Started

### Prerequisites

* Node.js 18.x or higher

* A free API key from [RAWG.io](https://rawg.io/apidocs)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nickpyburn/game-explorer.git
   cd game-explorer
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root of the project and add your RAWG API key:

   ```env
   RAWG_API_KEY=your_api_key_here
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Key Folder Structure

* `src/app/api/games/` - Standardized server-side route handlers for communicating securely with the RAWG API.

* `src/app/components/` - Reusable UI components including the `GameCard`, `GamesDisplay` grid, and the interactive `GameDetailModal`.

* `src/app/types/` - TypeScript interfaces ensuring type safety across RAWG API responses and internal component props.

* `src/app/data/` - Contains the `mockGames.ts` catalog for offline development.

## 💡 Configuration (Mock Mode)

To develop offline or save API requests, you can enable mock mode.
Open `src/app/api/games/route.ts` and set the mock toggle to true:

```typescript
const useMockData = true; 
```

## 📋 Future Improvements (To-Do)

- [ ] Add more platform filters to the sidebar.
- [ ] Show the specific game system/platform in the details modal.

## 🙏 Acknowledgments

* Data and imagery provided by the [RAWG Video Games Database](https://rawg.io/).
