import { useState } from 'react';
import { ChevronDown, Download, Zap, HelpCircle } from 'lucide-react';

const guides = [
  {
    id: 1,
    title: 'Getting Started with DOSBox',
    category: 'setup',
    content: `
# Getting Started with DOSBox

DOSBox is the most popular emulator for playing DOS games. Follow these steps to get started.

## Installation

1. Download DOSBox from the official website
2. Install it on your computer
3. Create a folder for your games (e.g., C:\\Games\\DOS)

## Configuration

1. Open DOSBox
2. Mount your games folder:
   \`\`\`
   mount c: C:\\Games\\DOS
   c:
   \`\`\`
3. Navigate to your game folder and run the game executable

## Tips

- Use DOSBox-X for better compatibility
- Adjust CPU cycles for better performance
- Use fullscreen mode for authentic experience
    `,
  },
  {
    id: 2,
    title: 'System Requirements',
    category: 'requirements',
    content: `
# System Requirements for DOS Games

## Minimum Requirements

- **CPU**: Any modern processor (1 GHz+)
- **RAM**: 512 MB
- **Storage**: 1-2 GB for game collection
- **OS**: Windows 7+, macOS 10.5+, Linux

## Recommended Requirements

- **CPU**: Multi-core processor (2 GHz+)
- **RAM**: 2-4 GB
- **Storage**: SSD for faster loading
- **GPU**: Dedicated graphics card (optional)

## Emulator Performance

Different emulators have different requirements:

- **DOSBox**: Very lightweight, runs on any system
- **DOSBox-X**: Slightly more demanding, better compatibility
- **Staging**: Modern fork with enhanced features
    `,
  },
  {
    id: 3,
    title: 'Troubleshooting Common Issues',
    category: 'troubleshooting',
    content: `
# Troubleshooting Common Issues

## Game Won't Start

1. Check if DOSBox is properly installed
2. Verify the game file is not corrupted
3. Try running in compatibility mode
4. Check CPU cycles setting

## Audio Issues

1. Update your sound drivers
2. Try different audio settings in DOSBox
3. Disable sound and try again
4. Check volume settings

## Performance Problems

1. Reduce graphics resolution
2. Adjust CPU cycles
3. Close other applications
4. Update emulator to latest version

## Keyboard/Controller Issues

1. Remap controls in game settings
2. Try different input devices
3. Update controller drivers
4. Check DOSBox controller configuration
    `,
  },
  {
    id: 4,
    title: 'Frequently Asked Questions',
    category: 'faq',
    content: `
# Frequently Asked Questions

## Is it legal to play DOS games?

Most DOS games are abandonware. Check the specific game's copyright status before playing.

## Can I play these games on modern systems?

Yes! DOSBox allows you to play DOS games on Windows, macOS, and Linux.

## What's the best emulator to use?

DOSBox is the most popular and recommended. DOSBox-X offers better compatibility.

## How do I save my games?

Most games have built-in save functions. Use the in-game save feature or save states in the emulator.

## Can I use a controller?

Yes! Most emulators support modern controllers. Configure them in the emulator settings.

## Where can I find more games?

Check our collection of 4650+ DOS games available for download.
    `,
  },
];

export default function Guides() {
  const [selectedGuide, setSelectedGuide] = useState(guides[0]);
  const [expandedCategory, setExpandedCategory] = useState('setup');

  const categories = [
    { id: 'setup', label: 'Setup & Installation', icon: Download },
    { id: 'requirements', label: 'System Requirements', icon: Zap },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: HelpCircle },
    { id: 'faq', label: 'FAQ', icon: ChevronDown },
  ];

  const categoryGuides = guides.filter(g => g.category === expandedCategory);

  return (
    <div className="min-h-screen bg-dos-bg py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-dos-screen mb-2 font-courier">Platform Guides</h1>
          <p className="text-dos-screen-light font-courier">Learn how to set up emulators and play DOS games</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="panel-crt">
              <h2 className="text-lg font-bold text-dos-screen mb-4 font-courier">Categories</h2>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setExpandedCategory(cat.id)}
                    className={`w-full text-left px-4 py-2 rounded transition-colors flex items-center gap-2 text-sm font-courier ${
                      expandedCategory === cat.id
                        ? 'bg-dos-screen text-dos-bg'
                        : 'bg-dos-bg hover:bg-dos-screen/20 text-dos-screen'
                    }`}
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Guides in category */}
              <div className="mt-6 pt-6 border-t border-dos-screen-dark">
                <h3 className="text-sm font-bold text-dos-screen mb-3 font-courier">Guides</h3>
                <div className="space-y-2">
                  {categoryGuides.map(guide => (
                    <button
                      key={guide.id}
                      onClick={() => setSelectedGuide(guide)}
                      className={`w-full text-left px-3 py-2 rounded text-xs transition-colors ${
                        selectedGuide.id === guide.id
                          ? 'bg-dos-screen text-dos-bg'
                          : 'bg-dos-bg hover:bg-dos-screen/10 text-dos-screen-light hover:text-dos-screen'
                      }`}
                    >
                      {guide.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="panel-crt">
              <h2 className="text-2xl font-bold text-dos-screen mb-6 font-courier">
                {selectedGuide.title}
              </h2>

              <div className="prose prose-invert max-w-none text-dos-screen-light">
                <div className="whitespace-pre-wrap font-courier text-sm leading-relaxed">
                  {selectedGuide.content}
                </div>
              </div>

              {/* Related Links */}
              <div className="mt-8 pt-8 border-t border-dos-screen-dark">
                <h3 className="text-lg font-bold text-dos-screen mb-4 font-courier">Related Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="#" className="panel-crt hover:shadow-lg transition-all">
                    <div className="font-bold text-dos-screen mb-2">DOSBox Official</div>
                    <p className="text-xs text-dos-screen-light">Download DOSBox from the official website</p>
                  </a>
                  <a href="#" className="panel-crt hover:shadow-lg transition-all">
                    <div className="font-bold text-dos-screen mb-2">DOSBox-X</div>
                    <p className="text-xs text-dos-screen-light">Enhanced DOSBox fork with better compatibility</p>
                  </a>
                  <a href="#" className="panel-crt hover:shadow-lg transition-all">
                    <div className="font-bold text-dos-screen mb-2">Game Database</div>
                    <p className="text-xs text-dos-screen-light">Browse our collection of 4650+ games</p>
                  </a>
                  <a href="#" className="panel-crt hover:shadow-lg transition-all">
                    <div className="font-bold text-dos-screen mb-2">Community Forum</div>
                    <p className="text-xs text-dos-screen-light">Ask questions and share tips with other players</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
