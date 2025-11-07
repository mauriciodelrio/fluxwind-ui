import { cn } from '@fluxwind/core';

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50">
      <div className="mx-auto max-w-2xl p-8">
        <h1
          className={cn(
            'mb-4 text-4xl font-bold text-neutral-900',
            'from-primary-600 to-primary-400 bg-gradient-to-r bg-clip-text text-transparent'
          )}
        >
          Fluxwind UI Playground
        </h1>
        <p className="mb-8 text-lg text-neutral-600">
          A modern, minimal React component library built on Tailwind CSS with signals-based
          reactivity.
        </p>
        <div className="space-y-4">
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold text-neutral-900">🚀 Getting Started</h2>
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
