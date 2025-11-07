import { cn } from '@fluxwind/core';

function App() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-8">
        <h1 className={cn(
          'text-4xl font-bold text-neutral-900 mb-4',
          'bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent'
        )}>
          Fluxwind UI Playground
        </h1>
        <p className="text-lg text-neutral-600 mb-8">
          A modern, minimal React component library built on Tailwind CSS with signals-based reactivity.
        </p>
        <div className="space-y-4">
          <div className="p-6 bg-white rounded-lg shadow-sm border border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              🚀 Getting Started
            </h2>
            <p className="text-neutral-600">
              This is the playground environment. Components will appear here as they are developed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
