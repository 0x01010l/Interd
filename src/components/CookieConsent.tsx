import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

const CONSENT_KEY = 'interdot_cookie_consent_v1';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONSENT_KEY);
      if (!saved) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (value: 'accepted' | 'essential') => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // ignore
    }
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
            <h2 className="font-bold mb-2">Cookies &amp; ads</h2>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              We use cookies for site functionality, Google Analytics measurement, and may use
              them for AdSense advertising. See our{' '}
              <Link to="/privacy-policy" className="text-brand-accent hover:underline">
                Privacy Policy
              </Link>{' '}
              for details.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => save('accepted')}
                className="bg-brand-accent hover:bg-brand-accent/90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              >
                Got it
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => save('accepted')}
            className="text-white/40 hover:text-white shrink-0"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
