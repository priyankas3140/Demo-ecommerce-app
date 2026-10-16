# Seora | E-commerce Storefront

Seora is a modern fashion e-commerce storefront prototype. It demonstrates the shopping journey from product discovery through checkout in a single responsive, frontend-only experience.

The interface is designed around an editorial retail aesthetic: an announcement bar, seasonal hero section, curated catalogue, product recommendations, brand storytelling, and newsletter sign-up.

## Live demo

Open the deployed storefront: **[priyankas3140.github.io/Demo-ecommerce-app](https://priyankas3140.github.io/Demo-ecommerce-app/)**

Open the product-development workspace: **[NPD Hub](https://priyankas3140.github.io/Demo-ecommerce-app/npd.html)**

## NPD Hub

The project also includes an NPD (New Product Development) workspace for managing products before they reach the store. It has a product-idea portfolio, research library, development roadmap, launch-readiness centre, and quick metrics dashboard.

Its data is stored in **IndexedDB**, the browser's built-in database. New product concepts, research findings, and roadmap tasks remain saved on the device after refresh, without requiring a server or account.

## What you can do

### Discover products

- Browse eight sample fashion products across tops, knitwear, bottoms, and accessories.
- Filter products by category and price.
- Use category chips for quick browsing.
- Sort products by featured status, price, or rating.
- Search the catalogue with live product suggestions.

### Explore a product

- Open any product card to view a product-detail panel.
- Review price, colour, category, customer rating, shipping, and return information.
- Choose a size before adding an item to the shopping bag.
- Save items to a wishlist.

### Shop and check out

- Add items using the Quick add button or product-detail panel.
- Change quantities or remove items in the bag.
- Keep bag items after refreshing the page using browser local storage.
- Apply the demo offer code `WELCOME10` for 10% off.
- Complete a simulated checkout form and receive an order confirmation.

## Built with

| Technology | Purpose |
| --- | --- |
| HTML5 | Page structure, product UI, forms, and modal content |
| CSS3 | Responsive layout, typography, styling, transitions, cart drawer, and dialogs |
| Vanilla JavaScript | Product data, filtering, search, wishlist, local cart, coupon logic, and checkout interactions |

No framework, package manager, build step, or backend is needed to run this demo.

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. Start browsing. All demo interactions work in the browser.

## Project structure

```text
Demo-ecommerce-app/
|-- index.html   # Page markup, storefront sections, cart, account and checkout dialogs
|-- style.css    # Desktop/mobile design system and interactive UI styles
|-- app.js       # Product catalogue and all storefront interactions
`-- README.md    # Project documentation
```

## Key implementation details

- The product catalogue is defined in the `products` array in `app.js`, making it easy to swap in an API later.
- Cart contents use `localStorage` under the `seora-cart` key, so they remain available after refresh in the same browser.
- Product images are loaded from Unsplash for demonstration purposes.
- Checkout and sign-in are visual flows only; they do not process a real card or create a real account.

## Production roadmap

To turn Seora into a full e-commerce application, the next steps would be:

1. Migrate the frontend to Next.js and TypeScript for reusable components, routing, and SEO.
2. Add a database such as PostgreSQL for products, users, inventory, orders, and reviews.
3. Integrate secure authentication (for example, Clerk, Auth0, or NextAuth).
4. Use Stripe or Razorpay for live payments.
5. Add an admin dashboard for product management, stock levels, fulfilment, and customer orders.
6. Replace local search with Algolia, Meilisearch, or Elasticsearch for scalable search and recommendations.

## Demo limitations

This repository is intentionally a frontend prototype. It does not store user accounts or orders on a server, validate real payments, manage stock, or send emails.

---

Created as a portfolio-ready e-commerce interface project.
