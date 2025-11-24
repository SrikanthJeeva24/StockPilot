📦 Stock Pilot — Inventory & Order Management Dashboard

A modern Angular 21 + TailwindCSS dashboard with product management, order management, filtering, sorting, and mock APIs.

🚀 Tech Stack
Frontend

Angular 21 (Standalone API, typed routes)

TailwindCSS (Utility-first styling)

Lucide Icons via ng-icons

ApexCharts (vanilla) for charts (wrapper not used due to Angular 21 compatibility)

Responsive Layout with Sidebar & Header

Debounced Search, Sort, Filters, Pagination

Mock API

json-server

Fake Products & Orders data (db.json)

REST endpoints:

/products

/orders

/products/:id

/orders/:id

Supports CRUD operations

🧱 Project Features (Implemented So Far)
✔ Responsive Admin Layout

Dedicated LayoutComponent

Sidebar navigation

Mobile slide-in sidebar

Header bar for small screens

Nested child routing under the layout

✔ Product Management

Product listing with:

Search (debounced)

Category filter

Stock filter

Sorting (Price, Name)

Pagination

Product Card UI (image placeholder, details, stock badges)

Modular component structure:

ProductListComponent

ProductCardComponent

ProductFiltersComponent

Clean filtering pipeline (client-side for now)

✔ Order Management (API Ready)

Endpoint mapping ready for listing orders

Structure prepared for CRUD pages

✔ Standalone Architecture

No NgModules

Lazy-loaded components via routes

provideHttpClient(), provideRouter() in main.ts

📂 Project Structure
src/
├─ app/
│ ├─ layout/
│ │ ├─ layout.component.ts
│ │ └─ layout.component.html
│ │
│ ├─ pages/
│ │ ├─ products/
│ │ │ ├─ product-list.component.ts
│ │ │ ├─ product-card.component.ts
│ │ │ ├─ product-filters.component.ts
│ │ │ └─ product.routes.ts (optional)
│ │ │
│ │ ├─ orders/
│ │ └─ dashboard/
│ │
│ ├─ services/
│ │ └─ product.service.ts
│ │
│ ├─ models/
│ │ └─ product.model.ts
│ │
│ └─ app.routes.ts
│
├─ assets/
│
├─ styles.css
├─ main.ts
└─ db.json

🛠 Setting Up the Fake API

Install json-server:

npm install -g json-server

Start API:

json-server --watch db.json --port 5000

Your mock endpoints:

GET /products
GET /products/:id
POST /products
PUT /products/:id
DELETE /products/:id

GET /orders
GET /orders/:id

🚦 How to Run the App

Install dependencies:

npm install

Start the fake API:

json-server --watch db.json --port 5000

Run Angular dev server:

ng serve

Open:

http://localhost:4200

🧠 Routing Approach

Uses nested routes under a layout shell:

{
path: '',
component: LayoutComponent,
children: [
{ path: 'products', loadComponent: () => import(...) },
{ path: 'orders', loadComponent: () => import(...) },
{ path: '', loadComponent: () => import(...) }, // dashboard
]
}

Supports modular expansion via dedicated route files:

product.routes.ts

export const PRODUCT_ROUTES = [
{ path: '', loadComponent: ... },
{ path: 'add', loadComponent: ... },
{ path: ':id', loadComponent: ... }
];

🎨 UI / UX Highlights

Fully mobile responsive

Product cards adapt to screen size

Filters collapse naturally on small screens

Clean, modern Tailwind styling

Minimalistic dashboard feel

Lucide icons consistency

🧩 Next Features (Planned)

Order list page UI

Order details page

Add/Edit product forms

Server-side filtering & pagination

Chart dashboard (ApexCharts)

Auth layout + login form

Dark mode toggle

Global toast notifications service
