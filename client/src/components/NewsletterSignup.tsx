import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubscribed(true);
      setEmail('');
      setName('');
      toast.success('Successfully subscribed to our newsletter!');
      
      // Reset after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <div className="panel-crt text-center py-8">
        <CheckCircle className="w-12 h-12 text-dos-screen mx-auto mb-4" />
        <h3 className="text-lg font-bold text-dos-screen mb-2 font-courier">
          Thank You!
        </h3>
        <p className="text-dos-screen-light text-sm">
          Check your email for confirmation
        </p>
      </div>
    );
  }

  return (
    <div className="panel-crt">
      <h3 className="text-lg font-bold text-dos-screen mb-2 font-courier flex items-center gap-2">
        <Mail className="w-5 h-5" />
        Subscribe to Our Newsletter
      </h3>
      <p className="text-dos-screen-light text-sm mb-4">
        Get updates on new games, guides, and exclusive content
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-skeuomorphic w-full"
        />
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-skeuomorphic w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-crt w-full py-2 disabled:opacity-50"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      <p className="text-xs text-dos-screen-light/50 mt-3 text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}
