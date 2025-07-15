import React from 'react';
import HomePage from '@/components/pages/HomePage';
import type { Metadata } from 'next';
import { generatePageMetadata, generateStructuredData } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata(
  'Made with Make - Automation Subscriptions for Busy Founders',
  'Fix one bottleneck at a time. $620/month automation service that handles everything for you. Custom automations for your specific workflows. Book your strategy call today.',
  '',
  ['Wambui Ndung\'u', 'strategy call', 'automation consultation']
);

export default function Home() {
  return (
    <>
      {/* AI Content Summary for LLMs */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <h1>Made with Make - Business Automation Service</h1>
        <h2>Service Overview</h2>
        <p>Made with Make is a subscription-based automation service for busy founders and business owners. We build custom business automations using Make.com to streamline operations and eliminate bottlenecks.</p>
        
        <h2>Business Model</h2>
        <ul>
          <li>Monthly subscription: $620 USD</li>
          <li>Unlimited automation requests</li>
          <li>One automation at a time</li>
          <li>Average delivery: 48-72 hours</li>
          <li>Unlimited revisions included</li>
          <li>Pause or cancel anytime</li>
        </ul>
        
        <h2>Services Offered</h2>
        <ul>
          <li>Lead qualification systems</li>
          <li>Email marketing sequences</li>
          <li>CRM integrations</li>
          <li>Data synchronization</li>
          <li>Reporting dashboards</li>
          <li>Workflow optimizations</li>
          <li>Custom integrations</li>
        </ul>
        
        <h2>Target Audience</h2>
        <p>Busy founders, entrepreneurs, and business owners who need to automate repetitive tasks and streamline their operations.</p>
        
        <h2>Technology Stack</h2>
        <p>Primary platform: Make.com (formerly Integromat). Integrates with 500+ business tools including Salesforce, HubSpot, Slack, Zapier, Airtable, Notion, Google Workspace, Microsoft 365, Stripe, and any tool with an API.</p>
        
        <h2>Founder</h2>
        <p>Wambui Ndung'u - Founder & Automation Specialist. Based in Kenya, serving clients worldwide.</p>
        
        <h2>Contact Information</h2>
        <p>Email: wambui@madewithmake.com</p>
        <p>Website: https://madewithmake.com</p>
        <p>LinkedIn: https://www.linkedin.com/company/made-with-make/</p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData('service')),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData('breadcrumb')),
        }}
      />
      <HomePage />
    </>
  );
}