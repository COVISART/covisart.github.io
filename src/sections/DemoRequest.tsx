import { useState } from 'react';
import type { FormEvent } from 'react';
import { Blueprint } from '../components/Blueprint';
import { CONTACT } from '../data/copy';
import { useSite } from '../site/SiteContext';

interface FormValues {
  name: string;
  org: string;
  email: string;
  country: string;
  use: string;
}

const EMPTY: FormValues = { name: '', org: '', email: '', country: '', use: '' };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function DemoRequest() {
  const { t } = useSite();
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof FormValues) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name.trim()) next.name = t.fRequired;
    if (!values.email.trim()) next.email = t.fRequired;
    else if (!EMAIL.test(values.email.trim())) next.email = t.fInvalidEmail;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // The prototype had no backend and neither does this port: wire the
    // request to the sales endpoint here when one exists.
    setSent(true);
  };

  const field = (key: keyof FormValues, label: string, type = 'text', span = false) => (
    <div className="field" style={span ? { gridColumn: '1 / -1' } : undefined}>
      <label htmlFor={`demo-${key}`}>{label}</label>
      {key === 'use' ? (
        <textarea
          id={`demo-${key}`}
          className="input"
          value={values[key]}
          onChange={(e) => set(key)(e.target.value)}
        />
      ) : (
        <input
          id={`demo-${key}`}
          className="input"
          type={type}
          value={values[key]}
          aria-invalid={errors[key] ? true : undefined}
          aria-describedby={errors[key] ? `demo-${key}-error` : undefined}
          onChange={(e) => set(key)(e.target.value)}
        />
      )}
      {errors[key] && (
        <div className="field-error" id={`demo-${key}-error`} role="alert">
          {errors[key]}
        </div>
      )}
    </div>
  );

  return (
    <section
      id="demo"
      className="rule-top"
      style={{ background: 'color-mix(in srgb, var(--color-accent) 5%, transparent)' }}
      aria-labelledby="demo-title"
    >
      <div className="shell split split-5-7 split-top" style={{ paddingBlock: 80, gap: 56 }}>
        <div>
          <h2 id="demo-title" style={{ fontSize: 40, margin: '0 0 14px' }}>
            {t.demoTitle}
          </h2>
          <p style={{ fontSize: 15, textWrap: 'pretty', color: 'color-mix(in srgb, var(--color-text) 78%, transparent)' }}>
            {t.demoBody}
          </p>
          <div style={{ display: 'grid', gap: 10, marginTop: 26, fontSize: 14 }}>
            <div>
              <span className="micro-label" style={{ display: 'inline-block', width: 92, letterSpacing: '0.12em' }}>Tel</span>
              <a href={`tel:${CONTACT.tel.replace(/\s/g, '')}`}>{CONTACT.tel}</a>
            </div>
            <div>
              <span className="micro-label" style={{ display: 'inline-block', width: 92, letterSpacing: '0.12em' }}>Mail</span>
              <a href={`mailto:${CONTACT.mail}`}>{CONTACT.mail}</a>
            </div>
            <div>
              <span className="micro-label" style={{ display: 'inline-block', width: 92, letterSpacing: '0.12em' }}>Web</span>
              <a href={CONTACT.webHref}>{CONTACT.web}</a>
            </div>
            <div className="contact-line">
              <span className="micro-label" style={{ letterSpacing: '0.12em' }}>{t.address}</span>
              <span>{CONTACT.address}</span>
            </div>
          </div>
        </div>

        <Blueprint style={{ padding: 28, background: 'var(--color-bg)' }}>
          {sent ? (
            <div style={{ padding: '40px 0', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, marginBottom: 8 }}>{t.sentTitle}</div>
              <p style={{ fontSize: 14, margin: '0 auto', maxWidth: '40ch', color: 'color-mix(in srgb, var(--color-text) 70%, transparent)' }}>
                {t.sentBody}
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="form-grid">
                {field('name', t.fName)}
                {field('org', t.fOrg)}
                {field('email', t.fEmail, 'email')}
                {field('country', t.fCountry)}
                {field('use', t.fUse, 'text', true)}
              </div>
              <button type="submit" className="btn btn-primary btn-block" style={{ padding: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {t.fSubmit}
              </button>
              <p style={{ fontSize: 12, margin: '14px 0 0', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)' }}>
                {t.fNote}
              </p>
            </form>
          )}
        </Blueprint>
      </div>
    </section>
  );
}
