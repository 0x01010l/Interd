import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';

export const CONSENT_KEY = 'interdot_cookie_consent_v2';
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
      <div className="max-w-3xl mx-auto pointer-events-auto glass rounded-2xl border-brand-border p-5 md:p-6 shadow-2xl shadow-black/40">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-accent/15 flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5 text-brand-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold mb-2">Cookie preferences</h2>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              We use essential cookies to run the site. With your permission we also use Google
              Analytics measurement cookies, and may use advertising cookies for Google AdSense.
              Choose Accept all or Essential only. Details are in our{' '}
              <Link to="/privacy-policy" className="text-brand-accent hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => save('accepted')}
                className="bg-brand-accent hover:bg-brand-accent/90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={() => save('essential')}
                className="glass hover:bg-white/5 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border border-brand-border"
              >
                Essential only
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
