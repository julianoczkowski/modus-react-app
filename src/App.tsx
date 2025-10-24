import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ModusProvider from "./components/ModusProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import ComponentsDemo from "./pages/ComponentsGalleryPage";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import ColorPalettePage from "./pages/ColorPalettePage";
import { demoRoutes } from "./config/routes";

// Lazy load main demo pages
const ComponentsDemoPage = lazy(() => import("./demos/components-demo/page"));

function App() {
  return (
    <ThemeProvider>
      <ModusProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <AppHeader />
            <main className="flex-1">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center min-h-screen">
                    Loading...
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<></>} />
                  <Route path="/components" element={<ComponentsDemo />} />
                  <Route
                    path="/demos/components-demo"
                    element={<ComponentsDemoPage />}
                  />
                  {/* Dynamically generated demo routes */}
                  {demoRoutes.map(({ path, component: Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                  ))}
                  <Route path="/color-palette" element={<ColorPalettePage />} />
                </Routes>
              </Suspense>
            </main>
            <AppFooter />
          </div>
        </Router>
      </ModusProvider>
    </ThemeProvider>
  );
}

export default App;
