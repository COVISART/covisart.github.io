import { AssetImage } from '../components/AssetImage';
import { Blueprint } from '../components/Blueprint';
import { ASSETS } from '../data/assets';
import { SUPPLY } from '../data/product';
import { useReverseColors, useSite } from '../site/SiteContext';

export function Software() {
  const { t, lang } = useSite();
  const reverse = useReverseColors();

  return (
    <section className="rule-top reverse" style={{ color: reverse.fg }} aria-labelledby="sw-title">
      <div className="shell split split-5-7 split-top" style={{ paddingBlock: 80, gap: 56 }}>
        <div>
          <div className="kicker" style={{ color: 'var(--color-accent-300)' }}>{t.swKicker}</div>
          <h2 id="sw-title" style={{ fontSize: 40, margin: '0 0 16px', color: reverse.fg }}>
            {t.swTitle}
          </h2>
          <p style={{ fontSize: 15, textWrap: 'pretty', color: reverse.soft }}>{t.swBody}</p>
          <Blueprint
            as="figure"
            style={{ marginTop: 28, padding: 14, background: 'var(--color-neutral-100)', border: '1px solid var(--color-divider)' }}
          >
            <AssetImage
              src={ASSETS.cockpit}
              alt="NGS-360-3 gondola with mission display and HOTAS controls"
              style={{ width: '100%', mixBlendMode: 'multiply' }}
            />
          </Blueprint>
        </div>

        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-300)',
              marginBottom: 18,
            }}
          >
            {t.supplyTitle}
          </div>
          <div className="cols-2">
            {SUPPLY[lang].map((s) => (
              <div key={s.title} style={{ borderTop: `1px solid ${reverse.rule}`, paddingTop: 12 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: reverse.fg }}>{s.title}</div>
                <div style={{ fontSize: 13, marginTop: 4, color: reverse.muted }}>{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
