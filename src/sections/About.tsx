import { AssetImage } from '../components/AssetImage';
import { Blueprint } from '../components/Blueprint';
import { ASSETS } from '../data/assets';
import { CREDENTIALS } from '../data/product';
import { useSite } from '../site/SiteContext';

export function About() {
  const { t, lang } = useSite();

  return (
    <section className="rule-top" aria-labelledby="about-title">
      <div className="shell split split-6-6" style={{ paddingBlock: 80 }}>
        <Blueprint as="figure" className="duotone lighten" style={{ padding: 0, border: '1px solid var(--color-divider)' }}>
          <AssetImage
            src={ASSETS.hq}
            alt="COVISART facility, Ankara"
            style={{ width: '100%', filter: 'grayscale(1) contrast(1.05)' }}
          />
        </Blueprint>

        <div>
          <div className="kicker">{t.aboutKicker}</div>
          <h2 id="about-title" style={{ fontSize: 40, margin: '0 0 16px' }}>
            {t.aboutTitle}
          </h2>
          <p style={{ fontSize: 15, textWrap: 'pretty', color: 'color-mix(in srgb, var(--color-text) 80%, transparent)' }}>
            {t.aboutBody}
          </p>
          <div style={{ display: 'grid', gap: 14, marginTop: 26 }}>
            {CREDENTIALS[lang].map((c) => (
              <div
                key={c.year}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '92px minmax(0, 1fr)',
                  gap: 18,
                  borderTop: '1px solid var(--color-divider)',
                  paddingTop: 12,
                  alignItems: 'baseline',
                }}
              >
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: 'var(--color-accent-700)' }}>{c.year}</div>
                <div style={{ fontSize: 13.5 }}>{c.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
