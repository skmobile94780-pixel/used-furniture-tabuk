import { useState, useEffect, useCallback } from 'react';
import { LangProvider, useLang } from './lib/i18n';
import { SettingsProvider } from './lib/settings';
import { updatePageSEO } from './lib/seo';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

type Page = 'home' | 'about' | 'blog' | 'contact';

function AppContent() {
  const [page, setPage] = useState<Page>('home');
  const { lang } = useLang();

  useEffect(() => {
    updatePageSEO(page, lang);
  }, [page, lang]);

  const goHome = useCallback(() => {
    setPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header current={page} onNavigate={setPage} />
      <main className="flex-1">
        {page === 'home' && <Home />}
        {page === 'about' && <About onNavigateHome={goHome} />}
        {page === 'blog' && <Blog onNavigateHome={goHome} />}
        {page === 'contact' && <Contact onNavigateHome={goHome} />}
      </main>
      <Footer onNavigate={setPage} />
      <FloatingButtons />
    </div>
  );
}

function App() {
  return (
    <LangProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </LangProvider>
  );
}

export default App;
