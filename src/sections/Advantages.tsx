import { Blueprint } from '../components/Blueprint';
import { ADVANTAGES } from '../data/product';
import { useSite } from '../site/SiteContext';

export function Advantages() {
  const { t, lang } = useSite();

  return (
    <section className="shell" style={{ paddingBlock: 80 }} aria-labelledby="adv-title">
      <div className="section-head">
        <h2 id="adv-title">{t.advTitle}</h2>
        <p className="section-lede" style={{ maxWidth: '42ch' }}>
          {t.advBody}
        </p>
      </div>
      <div className="cards-3">
        {ADVANTAGES[lang].map((adv) => (
          <Blueprint key={adv.n} className="card" style={{ padding: 22 }}>
            <div className="card-kicker">{adv.n}</div>
            <div className="card-title" style={{ fontSize: 19 }}>
              {adv.title}
            </div>
            <p className="card-body" style={{ fontSize: 13.5, opacity: 0.85 }}>
              {adv.body}
            </p>
          </Blueprint>
        ))}
      </div>
    </section>
  );
}
