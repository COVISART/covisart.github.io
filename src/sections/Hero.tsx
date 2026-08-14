import { Blueprint } from '../components/Blueprint';
import { ASSETS } from '../data/assets';
import { MODEL_NAME } from '../data/copy';
import { useSite } from '../site/SiteContext';
import { useGoToDemo } from '../site/useGoToDemo';
import { LazyNgsModel } from '../viewer/LazyNgsModel';

export function Hero() {
  const { t, dark, finishHex, setView } = useSite();
  const goToDemo = useGoToDemo();
  const viewerBg = dark ? 'var(--color-neutral-800)' : 'transparent';

  return (
    <section className="shell split split-5-7" style={{ paddingBlock: '72px 40px' }} aria-labelledby="hero-title">
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
          <span style={{ width: 34, height: 1, background: 'var(--color-accent)' }} />
          <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-accent-700)' }}>
            {t.kicker}
          </span>
        </div>
        <h1 id="hero-title" className="hero-title" style={{ fontSize: 68, letterSpacing: '-0.02em', margin: '0 0 6px' }}>
          {MODEL_NAME}
        </h1>
        <p
          className="hero-lede"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 25, lineHeight: 1.15, margin: '0 0 20px', color: 'var(--color-accent-800)' }}
        >
          {t.heroLede}
        </p>
        <p
          style={{
            fontSize: 15,
            maxWidth: '46ch',
            textWrap: 'pretty',
            margin: '0 0 28px',
            color: 'color-mix(in srgb, var(--color-text) 78%, transparent)',
          }}
        >
          {t.heroBody}
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-primary uc" style={{ padding: '11px 20px' }} onClick={goToDemo}>
            {t.ctaPrimary}
          </button>
          <button type="button" className="btn btn-secondary uc" style={{ padding: '11px 20px' }} onClick={() => setView('specs')}>
            {t.ctaSecondary}
          </button>
        </div>
      </div>

      <Blueprint as="figure" style={{ padding: 18, background: 'transparent' }}>
        <div style={{ background: viewerBg }}>
          <LazyNgsModel
            src={ASSETS.model}
            height={470}
            autorotate
            finish={finishHex}
            label={t.figHero}
            fallback={t.figHero}
          />
        </div>
        <figcaption style={{ letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 10 }}>{t.figHero}</figcaption>
      </Blueprint>
    </section>
  );
}
