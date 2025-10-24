import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import ModusProvider from "./components/ModusProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import ComponentsDemo from "./pages/ComponentsGalleryPage";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import ColorPalettePage from "./pages/ColorPalettePage";
import { demoRoutes } from "./config/routes";

function App() {
  return (
    <ThemeProvider>
      <ModusProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <AppHeader />
            <div className="flex-1">
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
                  {/* Dynamically generated demo routes */}
                  {demoRoutes.map(({ path, component: Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                  ))}
                  <Route path="/color-palette" element={<ColorPalettePage />} />
                </Routes>
              </Suspense>
            </div>
            <AppFooter />
          </div>
        </Router>
      </ModusProvider>
    </ThemeProvider>
  );
}

export default App;
