'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface EnvStatus {
  key: string;
  value: string | undefined;
  status: 'present' | 'missing' | 'empty';
  isPublic: boolean;
}

export function EnvChecker() {
  const [envStatus, setEnvStatus] = useState<EnvStatus[]>([]);

  useEffect(() => {
    const checkEnvVars = () => {
      const envVars = [
        'NEXT_PUBLIC_SUPABASE_URL',
        'NEXT_PUBLIC_SUPABASE_ANON_KEY',
        'NEXT_PUBLIC_CALCOM_API_KEY',
        'NEXT_PUBLIC_GOOGLE_ANALYTICS_ID',
      ];

      const status: EnvStatus[] = envVars.map(key => {
        const value = process.env[key];
        return {
          key,
          value,
          status: !value ? 'missing' : value.trim() === '' ? 'empty' : 'present',
          isPublic: key.startsWith('NEXT_PUBLIC_'),
        };
      });

      setEnvStatus(status);
    };

    checkEnvVars();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'empty':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'missing':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge variant="default" className="bg-green-100 text-green-800">Present</Badge>;
      case 'empty':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Empty</Badge>;
      case 'missing':
        return <Badge variant="destructive">Missing</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Environment Variables Status</CardTitle>
        <CardDescription>
          Check if your environment variables are properly loaded
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {envStatus.map((env) => (
            <div key={env.key} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(env.status)}
                <div>
                  <div className="font-medium">{env.key}</div>
                  <div className="text-sm text-gray-500">
                    {env.isPublic ? 'Public (client-side)' : 'Private (server-side)'}
                  </div>
                  {env.value && env.status === 'present' && (
                    <div className="text-xs text-gray-400 font-mono mt-1">
                      {env.value.substring(0, 20)}...
                    </div>
                  )}
                </div>
              </div>
              {getStatusBadge(env.status)}
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Troubleshooting Tips:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Make sure you have a <code>.env.local</code> file in your project root</li>
            <li>• Client-side variables must start with <code>NEXT_PUBLIC_</code></li>
            <li>• Restart your development server after adding new environment variables</li>
            <li>• Check that there are no spaces around the = sign in your .env file</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}