'use client';

export function EnvTest() {
  return (
    <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
      <h2 className="text-lg font-bold mb-2">Environment Variables Test</h2>
      <div>
        <p><strong>SPACE_ID:</strong> {process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || 'undefined'}</p>
        <p><strong>ACCESS_TOKEN:</strong> {process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || 'undefined'}</p>
      </div>
    </div>
  );
}