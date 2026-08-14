import { useEffect, useState } from 'react';
import { Blueprint } from '../components/Blueprint';
import { ASSETS } from '../data/assets';
import { AXES, FINISHES, NEUTRAL_POSE } from '../data/product';
import type { AxisKey } from '../data/product';
import { useSite } from '../site/SiteContext';
import { LazyNgsModel } from '../viewer/LazyNgsModel';

const deg = (v: number) => `${Math.round(v)}°`;

export function MotionEnvelope() {
  const { t, lang, dark, finish, setFinish, finishHex } = useSite();
  const [pose, setPose] = useState<Record<AxisKey, number>>(NEUTRAL_POSE);
  const [running, setRunning] = useState(false);

  /* The demo profile: a 24 ms tick sweeping roll and yaw continuously while
     pitch oscillates, exactly as the prototype drove it. */
  useEffect(() => {
    if (!running) return;
    const t0 = Date.now();
    const id = window.setInterval(() => {
      const e = (Date.now() - t0) / 1000;
      const r = (v: number) => Math.round(v * 10) / 10;
      setPose({ roll: r((e * 46) % 360), pitch: r(52 * Math.sin(e * 0.9)), yaw: r((e * 19) % 360) });
    }, 24);
    return () => window.clearInterval(id);
  }, [running]);

  const driveAxis = (key: AxisKey, value: number) => {
    setRunning(false); // a hand on a slider stops the profile
    setPose((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => {
    setRunning(false);
    setPose(NEUTRAL_POSE);
  };

  const axes = AXES[lang];
  const viewerBg = dark ? 'var(--color-neutral-800)' : 'transparent';

  return (
    <section
      className="rule-top"
      style={{
        borderBottom: '1px solid var(--color-divider)',
        background: 'color-mix(in srgb, var(--color-accent) 4%, transparent)',
      }}
      aria-labelledby="envelope-title"
    >
      <div className="shell" style={{ paddingBlock: 76 }}>
        <div className="section-head" style={{ marginBottom: 40 }}>
          <div>
            <div className="kicker">{t.envelopeKicker}</div>
            <h2 id="envelope-title">{t.envelopeTitle}</h2>
          </div>
          <p className="section-lede">{t.envelopeBody}</p>
        </div>

        <div className="split split-6-6 split-top" style={{ gap: 40 }}>
          <Blueprint style={{ padding: 20, background: 'var(--color-bg)' }}>
            <div className="viewer-frame" style={{ background: viewerBg }}>
              <LazyNgsModel
                src={ASSETS.model}
                height={440}
                roll={pose.roll}
                pitch={pose.pitch}
                yaw={pose.yaw}
                finish={finishHex}
                label={t.envelopeTitle}
                fallback={t.envelopeTitle}
              />
              <div className="orbit-hint">{t.orbitHint}</div>
            </div>

            <div className="finish-row">
              <span className="micro-label">{t.finishLabel}</span>
              {FINISHES.map((f) => {
                const active = f.id === finish;
                return (
                  <button
                    key={f.id}
                    type="button"
                    className="finish-btn"
                    aria-pressed={active}
                    title={t[f.labelKey]}
                    onClick={() => setFinish(f.id)}
                    style={{ border: `1px solid ${active ? 'var(--color-accent)' : 'var(--color-divider)'}` }}
                  >
                    <span className="finish-chip" style={{ background: f.hex }} />
                    {t[f.labelKey]}
                  </button>
                );
              })}
            </div>

            <div
              className="axis-readouts"
              style={{ marginTop: 18, borderTop: '1px solid var(--color-divider)', paddingTop: 14 }}
            >
              {axes.map((ax) => (
                <div key={ax.key}>
                  <div className="micro-label">{ax.name}</div>
                  <div className="num" style={{ fontFamily: 'var(--font-heading)', fontSize: 22 }}>
                    {deg(pose[ax.key])}
                  </div>
                </div>
              ))}
            </div>
          </Blueprint>

          <div>
            {axes.map((ax) => (
              <div key={ax.key} className="axis-control">
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16 }}>
                  <h4 style={{ margin: 0, fontSize: 20 }}>
                    <label htmlFor={`axis-${ax.key}`}>{ax.title}</label>
                  </h4>
                  <span className="tag tag-outline" style={{ whiteSpace: 'nowrap' }}>
                    {ax.excursion}
                  </span>
                </div>
                <input
                  id={`axis-${ax.key}`}
                  type="range"
                  min={ax.min}
                  max={ax.max}
                  step={1}
                  value={pose[ax.key]}
                  onChange={(ev) => driveAxis(ax.key, Number(ev.target.value))}
                  aria-valuetext={deg(pose[ax.key])}
                />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, fontSize: 13 }}>
                  <div>
                    <span className="micro-label" style={{ display: 'block', letterSpacing: '0.12em' }}>{t.colVelocity}</span>
                    {ax.velocity}
                  </div>
                  <div>
                    <span className="micro-label" style={{ display: 'block', letterSpacing: '0.12em' }}>{t.colAccel}</span>
                    {ax.accel}
                  </div>
                  <div>
                    <span className="micro-label" style={{ display: 'block', letterSpacing: '0.12em' }}>{t.colJerk}</span>
                    {ax.jerk}
                  </div>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-primary uc" style={{ padding: '10px 18px' }} onClick={() => setRunning((r) => !r)}>
                {running ? t.stop : t.run}
              </button>
              <button type="button" className="btn btn-secondary uc" style={{ padding: '10px 18px' }} onClick={reset}>
                {t.reset}
              </button>
              <span style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 55%, transparent)' }}>
                {t.envelopeNote}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
