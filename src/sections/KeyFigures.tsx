import { FIGURES } from '../data/product';
import { useSite } from '../site/SiteContext';

export function KeyFigures() {
  const { lang } = useSite();

  return (
    <section className="shell" style={{ paddingBlock: '24px 80px' }} aria-label="Key figures">
      <div className="hairline-grid figures">
        {FIGURES[lang].map((fig) => (
          <div key={fig.label} style={{ padding: '26px 22px' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 40, lineHeight: 1, letterSpacing: '-0.01em' }}>
              {fig.value}
            </div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: 10,
                color: 'color-mix(in srgb, var(--color-text) 60%, transparent)',
              }}
            >
              {fig.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
