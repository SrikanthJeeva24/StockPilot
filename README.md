# 📦 **Stock Pilot — Inventory & Order Management Dashboard**

A modern **Angular 21 + TailwindCSS** dashboard with product management, order management, filtering, sorting, and mock APIs.

## 🚀 **Tech Stack**

### **Frontend**

- **Angular 21** (Standalone API, typed routes)
- **TailwindCSS** (Utility-first styling)
- **Lucide Icons via ng-icons**
- **ApexCharts (vanilla)** for charts*(Wrapper not used due to Angular 21 compatibility)*
- Responsive Layout with Sidebar & Header
- Debounced Search, Sort, Filters, Pagination

### **Mock API**

- **json-server**
- Fake Products & Orders data (db.json)
- REST endpoints:

  - /products
  - /orders

- Supports **CRUD operations**

## 🧱 **Project Features (Implemented So Far)**

### ✔ **Responsive Admin Layout**

- Dedicated LayoutComponent
- Sidebar navigation
- Mobile slide-in sidebar
- Header bar for small screens
- Nested child routing under the layout

### ✔ **Product Management**

Product listing with:

- Search (debounced)
- Category filter
- Stock filter
- Sorting (Price, Name)
- Pagination

UI Components:

- ProductListComponent
- ProductCardComponent
- ProductFiltersComponent

Other:

- Clean filtering pipeline (client-side for now)

### ✔ **Order Management (API Ready)**

- Endpoint mapping ready for listing orders
- Structure prepared for CRUD pages

### ✔ **Standalone Architecture**

- No NgModules
- Lazy-loaded components via routes
- provideHttpClient(), provideRouter() in main.ts

## 📂 **Project Structure**

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML` src/   ├─ app/   │   ├─ layout/   │   │    ├─ layout.component.ts   │   │    └─ layout.component.html   │   │   │   ├─ pages/   │   │    ├─ products/   │   │    │    ├─ product-list.component.ts   │   │    │    ├─ product-card.component.ts   │   │    │    ├─ product-filters.component.ts   │   │    │    └─ product.routes.ts (optional)   │   │    │   │   │    ├─ orders/   │   │    └─ dashboard/   │   │   │   ├─ services/   │   │    └─ product.service.ts   │   │   │   ├─ models/   │   │    └─ product.model.ts   │   │   │   └─ app.routes.ts   │   ├─ assets/   │   ├─ styles.css   ├─ main.ts   └─ db.json `

## 🛠 **Setting Up the Fake API**

Install **json-server**:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML` npm install -g json-server `

Start API:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML` json-server --watch db.json --port 3000 `

Mock endpoints:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML` GET  /products  GET  /products/:id  POST /products  PUT  /products/:id  DELETE /products/:id  GET  /orders  GET  /orders/:id `

## 🚦 **How to Run the App**

Install dependencies:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML` npm install `

Start the fake API:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML` json-server --watch db.json --port 5000 `

Run Angular dev server:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML` ng serve `

Open:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML` http://localhost:4200 `

## 🧠 **Routing Approach**

Uses nested routes under a layout shell:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML` {    path: '',    component: LayoutComponent,    children: [      { path: 'products', loadComponent: () => import(...) },      { path: 'orders', loadComponent: () => import(...) },      { path: '', loadComponent: () => import(...) } // dashboard    ]  } `

Supports modular expansion via dedicated route files:

**product.routes.ts**

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML` export const PRODUCT_ROUTES = [    { path: '', loadComponent: ... },    { path: 'add', loadComponent: ... },    { path: ':id', loadComponent: ... }  ]; `

## 🎨 **UI / UX Highlights**

- Fully mobile responsive
- Product cards adapt to screen size
- Filters collapse naturally on small screens
- Clean, modern Tailwind styling
- Minimalistic dashboard feel
- Lucide icons for consistency

## 🧩 **Next Features (Planned)**

- Order list page UI
- Order details page
- Add/Edit product forms
- Server-side filtering & pagination
- Chart dashboard (ApexCharts)
- Auth layout + login form
- Dark mode toggle
- Global toast notifications service
