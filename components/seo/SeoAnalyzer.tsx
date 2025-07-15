'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface SeoCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  description: string;
  value?: string;
}

export function SeoAnalyzer() {
  const [seoChecks, setSeoChecks] = useState<SeoCheck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performSeoChecks = () => {
      const checks: SeoCheck[] = [];

      // Check for title tag
      const title = document.title;
      checks.push({
        name: 'Page Title',
        status: title && title.length > 10 && title.length < 60 ? 'pass' : 'fail',
        description: title ? `Title: "${title}" (${title.length} characters)` : 'No title found',
        value: title
      });

      // Check for meta description
      const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      const description = metaDescription?.content;
      checks.push({
        name: 'Meta Description',
        status: description && description.length > 50 && description.length < 160 ? 'pass' : 'fail',
        description: description ? `Description: "${description}" (${description.length} characters)` : 'No meta description found',
        value: description
      });

      // Check for canonical URL
      const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      checks.push({
        name: 'Canonical URL',
        status: canonical?.href ? 'pass' : 'fail',
        description: canonical?.href ? `Canonical: ${canonical.href}` : 'No canonical URL found',
        value: canonical?.href
      });

      // Check for Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
      const ogDescription = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
      const ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
      
      checks.push({
        name: 'Open Graph Tags',
        status: ogTitle && ogDescription && ogImage ? 'pass' : 'warning',
        description: `OG Title: ${ogTitle?.content ? '✓' : '✗'}, OG Description: ${ogDescription?.content ? '✓' : '✗'}, OG Image: ${ogImage?.content ? '✓' : '✗'}`,
      });

      // Check for Twitter Card tags
      const twitterCard = document.querySelector('meta[name="twitter:card"]') as HTMLMetaElement;
      const twitterTitle = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement;
      
      checks.push({
        name: 'Twitter Card Tags',
        status: twitterCard && twitterTitle ? 'pass' : 'warning',
        description: `Twitter Card: ${twitterCard?.content ? '✓' : '✗'}, Twitter Title: ${twitterTitle?.content ? '✓' : '✗'}`,
      });

      // Check for structured data
      const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
      checks.push({
        name: 'Structured Data',
        status: structuredData.length > 0 ? 'pass' : 'fail',
        description: `${structuredData.length} structured data script(s) found`,
        value: structuredData.length.toString()
      });

      // Check for robots meta tag
      const robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
      checks.push({
        name: 'Robots Meta Tag',
        status: robots?.content ? 'pass' : 'warning',
        description: robots?.content ? `Robots: ${robots.content}` : 'No robots meta tag found',
        value: robots?.content
      });

      // Check for viewport meta tag
      const viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
      checks.push({
        name: 'Viewport Meta Tag',
        status: viewport?.content ? 'pass' : 'fail',
        description: viewport?.content ? `Viewport: ${viewport.content}` : 'No viewport meta tag found',
        value: viewport?.content
      });

      // Check for charset
      const charset = document.querySelector('meta[charset]') as HTMLMetaElement;
      const charsetValue = (charset?.getAttribute('charset') ?? undefined) as string | undefined;
      checks.push({
        name: 'Character Encoding',
        status: charsetValue === 'utf-8' ? 'pass' : 'fail',
        description: `Charset: ${charsetValue || 'Not found'}`,
        value: charsetValue
      });

      // Check for language attribute
      const html = document.documentElement;
      checks.push({
        name: 'Language Attribute',
        status: html.lang ? 'pass' : 'fail',
        description: `Language: ${html.lang || 'Not set'}`,
        value: html.lang
      });

      setSeoChecks(checks);
      setLoading(false);
    };

    performSeoChecks();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'fail':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <Info className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pass':
        return <Badge variant="default" className="bg-green-100 text-green-800">Pass</Badge>;
      case 'fail':
        return <Badge variant="destructive">Fail</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>SEO Analysis</CardTitle>
          <CardDescription>Analyzing page SEO elements...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const passCount = seoChecks.filter(check => check.status === 'pass').length;
  const failCount = seoChecks.filter(check => check.status === 'fail').length;
  const warningCount = seoChecks.filter(check => check.status === 'warning').length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          SEO Analysis
          <div className="flex gap-1">
            <Badge variant="default" className="bg-green-100 text-green-800">{passCount}</Badge>
            <Badge variant="destructive">{failCount}</Badge>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">{warningCount}</Badge>
          </div>
        </CardTitle>
        <CardDescription>
          Real-time SEO analysis of the current page
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {seoChecks.map((check, index) => (
            <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
              <div className="flex items-start gap-3 flex-1">
                {getStatusIcon(check.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{check.name}</h4>
                    {getStatusBadge(check.status)}
                  </div>
                  <p className="text-sm text-gray-600">{check.description}</p>
                  {check.value && (
                    <p className="text-xs text-gray-500 mt-1 font-mono bg-gray-100 p-1 rounded">
                      {check.value}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 