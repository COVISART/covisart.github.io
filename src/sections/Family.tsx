import { useState } from 'react';
import { Blueprint } from '../components/Blueprint';
import { VARIANTS } from '../data/product';
import { useSite } from '../site/SiteContext';

export function Family() {
  const { t, lang } = useSite();
  const [variantId, setVariantId] = useState('ngs3');

  const variants = VARIANTS[lang];
  const active = variants.find((v) => v.id === variantId) ?? variants[1];

  return (
    <section className="shell" style={{ paddingBlock: 80 }} aria-labelledby="fam-title">
      <div style={{ marginBottom: 36 }}>
        <div className="kicker">{t.famKicker}</div>
        <h2 id="fam-title" style={{ fontSize: 40, margin: 0 }}>
          {t.famTitle}
        </h2>
      </div>

      <div className="variants" role="tablist" aria-label={t.famTitle}>
        {variants.map((v) => {
          const isActive = v.id === active.id;
          return (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setVariantId(v.id)}
              style={{
                cursor: 'pointer',
                textAlign: 'left',
                font: 'inherit',
                padding: 18,
                border: `1px solid ${isActive ? 'var(--color-accent)' : 'var(--color-divider)'}`,
                background: isActive ? 'var(--color-accent)' : 'transparent',
                color: isActive ? 'var(--color-bg)' : 'var(--color-text)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 22 }}>{v.name}</div>
              <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 6, opacity: 0.75 }}>
                {v.axes}
              </div>
            </button>
          );
        })}
      </div>

      <Blueprint
        className="split"
        style={{ padding: '28px 32px', gridTemplateColumns: 'minmax(0, 4fr) minmax(0, 8fr)', gap: 40, alignItems: 'center' }}
      >
        <div>
          <h3 style={{ margin: '0 0 4px', fontSize: 30 }}>{active.name}</h3>
          <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent-700)' }}>
            {active.axes}
          </div>
        </div>
        <p style={{ margin: 0, fontSize: 15, textWrap: 'pretty', color: 'color-mix(in srgb, var(--color-text) 80%, transparent)' }}>
          {active.body}
        </p>
      </Blueprint>
    </section>
  );
}
