import { AssetImage } from '../components/AssetImage';
import { ASSETS } from '../data/assets';
import { AXES, DIMS, ELECTRICAL, IFACES, OPTIONS, SUPPLY } from '../data/product';
import { useSite } from '../site/SiteContext';
import { useGoToDemo } from '../site/useGoToDemo';

export function Specifications() {
  const { t, lang } = useSite();
  const goToDemo = useGoToDemo();
  const axes = AXES[lang];

  return (
    <main id="main" className="shell" style={{ paddingBlock: '64px 96px' }}>
      <div
        className="split split-5-7"
        style={{ alignItems: 'end', paddingBottom: 40, borderBottom: '1px solid var(--color-divider)' }}
      >
        <div>
          <div className="kicker">{t.kicker}</div>
          <h1 className="spec-title" style={{ fontSize: 52, margin: '0 0 8px' }}>
            {t.specTitle}
          </h1>
          <p style={{ fontSize: 14, margin: 0, color: 'color-mix(in srgb, var(--color-text) 70%, transparent)' }}>
            {t.specNote}
          </p>
        </div>
        <figure style={{ margin: 0, padding: 14, background: 'var(--color-neutral-100)', border: '1px solid var(--color-divider)' }}>
          <AssetImage src={ASSETS.front} alt={t.figFront} style={{ width: '100%', mixBlendMode: 'multiply' }} />
          <figcaption style={{ letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-neutral-700)' }}>
            {t.figFront}
          </figcaption>
        </figure>
      </div>

      <section style={{ padding: '48px 0', borderBottom: '1px solid var(--color-divider)' }}>
        <h3 style={{ fontSize: 24, margin: '0 0 4px' }}>{t.perfTitle}</h3>
        <p style={{ fontSize: 13, margin: '0 0 20px', color: 'color-mix(in srgb, var(--color-text) 60%, transparent)' }}>
          {t.perfNote}
        </p>
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>{t.colAxis}</th>
                <th>{t.colAccel}</th>
                <th>{t.colJerk}</th>
                <th>{t.colVelocity}</th>
                <th>{t.colExcursion}</th>
              </tr>
            </thead>
            <tbody>
              {axes.map((ax) => (
                <tr key={ax.key}>
                  <td style={{ fontFamily: 'var(--font-heading)', fontSize: 17 }}>{ax.title}</td>
                  <td className="num">{ax.accel}</td>
                  <td className="num">{ax.jerk}</td>
                  <td className="num">{ax.velocity}</td>
                  <td className="num">{ax.excursion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="cols-3" style={{ padding: '48px 0', borderBottom: '1px solid var(--color-divider)' }}>
        <div>
          <h3 style={{ fontSize: 24, margin: '0 0 18px' }}>{t.dimTitle}</h3>
          {DIMS[lang].map((d) => (
            <div key={d.label} className="spec-row">
              <span style={{ color: 'color-mix(in srgb, var(--color-text) 65%, transparent)' }}>{d.label}</span>
              <span className="num">{d.value}</span>
            </div>
          ))}
        </div>

        <div>
          <h3 style={{ fontSize: 24, margin: '0 0 18px' }}>{t.elecTitle}</h3>
          <div className="table-scroll">
            <table className="table">
              <thead>
                <tr>
                  <th>{t.colAxis}</th>
                  <th>{t.colPower}</th>
                  <th>{t.colVoltage}</th>
                </tr>
              </thead>
              <tbody>
                {ELECTRICAL.map((e, i) => (
                  <tr key={axes[i].key}>
                    <td>{axes[i].name}</td>
                    <td className="num">{e.power}</td>
                    <td className="num">{e.voltage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 18, fontSize: 13, color: 'color-mix(in srgb, var(--color-text) 70%, transparent)' }}>
            {t.generalSpecs}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: 24, margin: '0 0 18px' }}>{t.ifaceTitle}</h3>
          {IFACES[lang].map((i) => (
            <div
              key={i.label}
              style={{
                display: 'flex',
                gap: 12,
                padding: '8px 0',
                borderBottom: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)',
                fontSize: 14,
              }}
            >
              <span style={{ color: 'var(--color-accent-text)' }} aria-hidden="true">
                +
              </span>
              <span>{i.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="split split-6-6" style={{ padding: '48px 0', alignItems: 'start' }}>
        <div>
          <h3 style={{ fontSize: 24, margin: '0 0 18px' }}>{t.supplyTitle}</h3>
          {SUPPLY[lang].map((s) => (
            <div key={s.title} style={{ padding: '12px 0', borderTop: '1px solid var(--color-divider)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: 'color-mix(in srgb, var(--color-text) 70%, transparent)' }}>{s.body}</div>
            </div>
          ))}
        </div>

        <div>
          <h3 style={{ fontSize: 24, margin: '0 0 18px' }}>{t.optTitle}</h3>
          <div style={{ display: 'grid', gap: 10 }}>
            {OPTIONS[lang].map((o) => (
              <div key={o.title} style={{ display: 'grid', gridTemplateColumns: '16px minmax(0, 1fr)', gap: 10, fontSize: 14 }}>
                <span style={{ color: 'var(--color-accent-text)' }} aria-hidden="true">
                  +
                </span>
                <span>
                  <strong style={{ fontWeight: 500 }}>{o.title}</strong> —{' '}
                  <span style={{ color: 'color-mix(in srgb, var(--color-text) 70%, transparent)' }}>{o.body}</span>
                </span>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: 28, padding: '12px 20px', textTransform: 'uppercase', letterSpacing: '0.08em' }}
            onClick={goToDemo}
          >
            {t.ctaPrimary}
          </button>
        </div>
      </section>
    </main>
  );
}
