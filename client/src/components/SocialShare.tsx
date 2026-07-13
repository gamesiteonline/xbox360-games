import { Share2, Facebook, Twitter, Mail } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface SocialShareProps {
  title: string;
  gameId: string;
  url?: string;
}

export default function SocialShare({ title, gameId, url }: SocialShareProps) {
  const [showMenu, setShowMenu] = useState(false);
  const shareUrl = url || `${window.location.origin}/games?game=${gameId}`;
  const shareText = `Check out "${title}" on Gamesiteonline!`;

  const handleShare = (platform: string) => {
    let shareLink = '';

    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'email':
        shareLink = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + '\n' + shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!');
        setShowMenu(false);
        return;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
      setShowMenu(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="btn-crt px-4 py-2 flex items-center gap-2 text-sm"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 panel-crt z-50">
          <button
            onClick={() => handleShare('twitter')}
            className="w-full text-left px-4 py-2 hover:bg-dos-screen/10 flex items-center gap-2 text-sm transition-colors"
          >
            <Twitter className="w-4 h-4" />
            Share on Twitter
          </button>
          <button
            onClick={() => handleShare('facebook')}
            className="w-full text-left px-4 py-2 hover:bg-dos-screen/10 flex items-center gap-2 text-sm transition-colors"
          >
            <Facebook className="w-4 h-4" />
            Share on Facebook
          </button>
          <button
            onClick={() => handleShare('email')}
            className="w-full text-left px-4 py-2 hover:bg-dos-screen/10 flex items-center gap-2 text-sm transition-colors"
          >
            <Mail className="w-4 h-4" />
            Share via Email
          </button>
          <div className="border-t border-dos-screen-dark my-1" />
          <button
            onClick={() => handleShare('copy')}
            className="w-full text-left px-4 py-2 hover:bg-dos-screen/10 flex items-center gap-2 text-sm transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
}
