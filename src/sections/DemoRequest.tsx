import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Blueprint } from '../components/Blueprint';
import { CONTACT } from '../data/copy';
import { ACCESSORIES, FINISHES, PAYLOAD_SIZES, type FinishId } from '../data/product';
import { submitOrder } from '../site/orders';
import { useSite } from '../site/SiteContext';

interface FormValues {
  name: string;
  org: string;
  email: string;
  phone: string;
  country: string;
  size: string;
  accessory: string;
  use: string;
}

const EMPTY: FormValues = {
  name: '',
  org: '',
  email: '',
  phone: '',
  country: '',
  size: PAYLOAD_SIZES[0],
  accessory: ACCESSORIES[0].id,
  use: '',
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/* Digits with the punctuation an international number is usually written
   with; the API stores the string as typed, so only the shape is checked. */
const PHONE = /^[+()\d][\s+().\-\d]{6,}$/;

type Status = 'idle' | 'sending' | 'sent' | 'failed';

export function DemoRequest() {
  const { t, finish, setFinish } = useSite();
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<Status>('idle');

  const set = (key: keyof FormValues) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name.trim()) next.name = t.fRequired;
    if (!values.email.trim()) next.email = t.fRequired;
    else if (!EMAIL.test(values.email.trim())) next.email = t.fInvalidEmail;
    if (!values.phone.trim()) next.phone = t.fRequired;
    else if (!PHONE.test(values.phone.trim())) next.phone = t.fInvalidPhone;
    if (!values.country.trim()) next.country = t.fRequired;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    /* The order record has no field for the organisation, so it rides along
       in the description rather than being dropped. */
    const description = [
      values.org.trim() && `Organisation: ${values.org.trim()}`,
      values.use.trim(),
    ]
      .filter(Boolean)
      .join('\n\n');

    setStatus('sending');
    try {
      await submitOrder({
        email: values.email.trim(),
        name: values.name.trim(),
        country: values.country.trim(),
        description,
        size: values.size,
        phone: values.phone.trim(),
        accessory: values.accessory,
        color: finish,
        reservedObjects: [],
      });
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  };

  const sending = status === 'sending';

  const field = (key: keyof FormValues, label: string, type = 'text', span = false) => (
    <div className="field" style={span ? { gridColumn: '1 / -1' } : undefined}>
      <label htmlFor={`demo-${key}`}>{label}</label>
      {key === 'use' ? (
        <textarea
          id={`demo-${key}`}
          className="input"
          value={values[key]}
          disabled={sending}
          onChange={(e) => set(key)(e.target.value)}
        />
      ) : (
        <input
          id={`demo-${key}`}
          className="input"
          type={type}
          value={values[key]}
          disabled={sending}
          autoComplete={AUTOCOMPLETE[key]}
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

  const choice = (
    id: string,
    label: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void,
    options: { value: string; label: string }[],
  ) => (
    <div className="field">
      <label htmlFor={`demo-${id}`}>{label}</label>
      <select id={`demo-${id}`} className="input" value={value} disabled={sending} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
          {status === 'sent' ? (
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
                {field('phone', t.fPhone, 'tel')}
                {field('country', t.fCountry)}
                {choice(
                  'size',
                  t.fSize,
                  values.size,
                  (e) => set('size')(e.target.value),
                  PAYLOAD_SIZES.map((size) => ({ value: size, label: `${size} kg` })),
                )}
                {choice(
                  'accessory',
                  t.fAccessory,
                  values.accessory,
                  (e) => set('accessory')(e.target.value),
                  ACCESSORIES.map((accessory) => ({ value: accessory.id, label: t[accessory.labelKey] })),
                )}
                {/* The finish is the site-wide one, so picking it here also
                    repaints the model in the motion-envelope viewer. */}
                {choice(
                  'color',
                  t.finishLabel,
                  finish,
                  (e) => setFinish(e.target.value as FinishId),
                  FINISHES.map((option) => ({ value: option.id, label: t[option.labelKey] })),
                )}
                {field('use', t.fUse, 'text', true)}
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={sending}
                style={{ padding: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}
              >
                {sending ? t.fSending : status === 'failed' ? t.fRetry : t.fSubmit}
              </button>
              <div aria-live="polite">
                {status === 'failed' && (
                  <p className="field-error" style={{ marginTop: 12, marginBottom: 0, fontSize: 12 }}>
                    <strong>{t.fFailedTitle}.</strong> {t.fFailedBody}{' '}
                    <a href={`mailto:${CONTACT.mail}`}>{CONTACT.mail}</a>
                  </p>
                )}
              </div>
              <p style={{ fontSize: 12, margin: '14px 0 0', color: 'var(--text-muted)' }}>
                {t.fNote}
              </p>
            </form>
          )}
        </Blueprint>
      </div>
    </section>
  );
}

/* Browser autofill hints: the sales team gets cleaner data when the browser
   can fill the identity fields itself. */
const AUTOCOMPLETE: Partial<Record<keyof FormValues, string>> = {
  name: 'name',
  org: 'organization',
  email: 'email',
  phone: 'tel',
  country: 'country-name',
};
