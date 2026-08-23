import { LANGS, MODEL_NAME } from '../data/copy';
import { useSite } from '../site/SiteContext';
import { useGoToDemo } from '../site/useGoToDemo';

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  );
}

export function Header() {
  const { t, lang, setLang, dark, toggleTheme, view, setView } = useSite();
  const goToDemo = useGoToDemo();

  return (
    <header className="site-header">
      <div className="shell">
        <div className="brand">
          <span className="brand-name">COVISART</span>
          <span className="brand-model">{MODEL_NAME}</span>
        </div>

        <nav className="site-nav" aria-label="Primary">
          <button
            type="button"
            className="nav-link"
            aria-current={view === 'overview' ? 'page' : undefined}
            onClick={() => setView('overview')}
          >
            {t.navOverview}
          </button>
          <button
            type="button"
            className="nav-link"
            aria-current={view === 'specs' ? 'page' : undefined}
            onClick={() => setView('specs')}
          >
            {t.navSpecs}
          </button>
        </nav>

        <button
          type="button"
          className="btn btn-secondary btn-icon"
          onClick={toggleTheme}
          title={t.themeToggle}
          aria-label={t.themeToggle}
          style={{ flex: 'none' }}
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* The prototype pinned the checked segment's colours inline because
            both stylesheets were live at once; here the dark system is scoped,
            so .seg-opt:has(input:checked) resolves correctly on its own. */}
        <div className="seg" style={{ flex: 'none' }}>
          {LANGS.map((code) => (
            <label key={code} className="seg-opt" style={{ letterSpacing: '0.06em' }}>
              <input
                type="radio"
                name="lang"
                value={code}
                checked={lang === code}
                onChange={() => setLang(code)}
              />
              {code.toUpperCase()}
            </label>
          ))}
        </div>

        <button type="button" className="btn btn-primary header-cta" onClick={goToDemo}>
          {t.navCta}
        </button>
      </div>
    </header>
  );
}
