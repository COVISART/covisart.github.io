import { CONTACT } from '../data/copy';
import { useReverseColors, useSite } from '../site/SiteContext';

export function Footer() {
  const { t } = useSite();
  const reverse = useReverseColors();

  return (
    <footer className="site-footer" style={{ color: reverse.fg }}>
      <div className="shell">
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 20, letterSpacing: '0.16em' }}>COVISART</div>
        <div style={{ fontSize: 13, color: reverse.muted }}>{t.footerTag}</div>
        <div style={{ fontSize: 12, color: reverse.faint }}>{CONTACT.legal}</div>
      </div>
    </footer>
  );
}
