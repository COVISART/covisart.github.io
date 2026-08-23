import { AssetImage } from '../components/AssetImage';
import { Blueprint } from '../components/Blueprint';
import { ASSETS } from '../data/assets';
import { APPS } from '../data/product';
import { useSite } from '../site/SiteContext';

export function Applications() {
  const { t, lang } = useSite();

  return (
    <section className="rule-top" aria-labelledby="app-title">
      <div className="shell split split-7-5" style={{ paddingBlock: 80 }}>
        <div>
          <div className="kicker">{t.appKicker}</div>
          <h2 id="app-title" style={{ fontSize: 40, margin: '0 0 14px' }}>
            {t.appTitle}
          </h2>
          <p style={{ fontSize: 15, maxWidth: '52ch', textWrap: 'pretty', color: 'color-mix(in srgb, var(--color-text) 78%, transparent)' }}>
            {t.appBody}
          </p>
          <div className="hairline-grid" style={{ marginTop: 28 }}>
            {APPS[lang].map((app) => (
              <div key={app.title} className="app-row">
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 20 }}>{app.title}</div>
                <div style={{ fontSize: 13.5, color: 'color-mix(in srgb, var(--color-text) 78%, transparent)' }}>{app.body}</div>
              </div>
            ))}
          </div>
        </div>

        <Blueprint
          as="figure"
          style={{ padding: 16, background: 'var(--color-neutral-100)', border: '1px solid var(--color-divider)' }}
        >
          <AssetImage src={ASSETS.operator} alt={t.figOperator} style={{ width: '100%', mixBlendMode: 'multiply' }} />
          <figcaption style={{ letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 10, color: 'var(--color-neutral-700)' }}>
            {t.figOperator}
          </figcaption>
        </Blueprint>
      </div>
    </section>
  );
}
