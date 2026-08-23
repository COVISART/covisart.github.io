import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { About } from './sections/About';
import { Advantages } from './sections/Advantages';
import { Applications } from './sections/Applications';
import { DemoRequest } from './sections/DemoRequest';
import { Family } from './sections/Family';
import { Hero } from './sections/Hero';
import { KeyFigures } from './sections/KeyFigures';
import { MotionEnvelope } from './sections/MotionEnvelope';
import { Software } from './sections/Software';
import { Specifications } from './sections/Specifications';
import { useSite } from './site/SiteContext';

export function App() {
  const { view, t } = useSite();

  return (
    <div className="page">
      <a className="skip-link" href="#main">
        {t.skipToContent}
      </a>
      <Header />
      {view === 'overview' ? (
        <main id="main">
          <Hero />
          <KeyFigures />
          <MotionEnvelope />
          <Advantages />
          <Applications />
          <Software />
          <Family />
          <About />
          <DemoRequest />
        </main>
      ) : (
        <Specifications />
      )}
      <Footer />
    </div>
  );
}
