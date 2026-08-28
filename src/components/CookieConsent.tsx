import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';

export const CONSENT_KEY = 'interdot_cookie_consent_v4';
export type ConsentValue = 'accepted' | 'essential';

export function getCookieConsent(): ConsentValue | null {
  try {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (saved === 'accepted' || saved === 'essential') return saved;
  } catch {
    // ignore
  }
  return null;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookieConsent()) setVisible(true);
  }, []);

  const save = (value: ConsentValue) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // ignore
    }
    window.dispatchEvent(new CustomEvent('interdot-consent', { detail: value }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] p-4 md:p-6 pointer-events-none">
      <div className="max-w-3xl mx-auto pointer-events-auto paper-card p-5 md:p-6 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5 text-brand-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-serif font-semibold text-lg mb-2">Privacy &amp; cookie choices</h2>
            <p className="text-sm text-brand-muted leading-relaxed mb-4">
              We use essential storage for your cookie choice. With your permission we also use Google
              Analytics and Google AdSense (via Google Funding Choices, a certified CMP). Reject all
              keeps non-essential cookies off. Details in our{' '}
              <Link to="/privacy" className="text-brand-accent font-semibold hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2">
              <button
                type="button"
                onClick={() => save('accepted')}
                className="bg-brand-accent hover:bg-brand-accent-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={() => save('essential')}
                className="border border-brand-line text-brand-ink px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-bg"
              >
                Reject all
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
