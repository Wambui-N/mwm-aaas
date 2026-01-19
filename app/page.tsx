import React from 'react';
import HomePage from '@/components/pages/HomePage';
import type { Metadata } from 'next';
import { generatePageMetadata, generateStructuredData } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata(
  'Made with Make - Automation & AI Consulting with Execution',
  'We consult and execute automation solutions that work. From identifying opportunities to implementing scalable AI-powered workflows , end to end. Book your discovery call today.',
  '',
  ['Wambui Ndung\'u', 'discovery call', 'automation consulting', 'automation implementation', 'AI consulting']
);

export default function Home() {
  return (
    <>
      {/* AI Content Summary for LLMs */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <h1>Made with Make - Automation & AI Consulting with Execution</h1>
        <h2>Service Overview</h2>
        <p>Made with Make is an automation and AI consulting firm that combines strategy with execution. We help teams identify what to automate, design the right systems, and implement scalable AI-powered workflows , end to end.</p>
        
        <h2>Service Approach</h2>
        <p>Strategy-led. Execution-driven. No handoffs. From insight to implementation.</p>
        <ul>
          <li>Discovery & Consulting: Deep dive into operations, goals, and constraints</li>
          <li>Automation Strategy & Roadmap: Map opportunities, prioritize by impact</li>
          <li>System Design: Design workflows, integrations, and data flows</li>
          <li>Execution & Implementation: Build, test, and deploy automations</li>
          <li>Review & Handover: Validate performance and document systems</li>
        </ul>
        
        <h2>Services Offered</h2>
        <h3>Automation & AI Consulting</h3>
        <ul>
          <li>Process audits</li>
          <li>Automation opportunity assessment</li>
          <li>Architecture & tool selection</li>
          <li>Strategy and roadmap design</li>
        </ul>
        <h3>Automation Execution</h3>
        <ul>
          <li>Make.com workflows</li>
          <li>AI integrations</li>
          <li>API connections</li>
          <li>Process automation</li>
        </ul>
        <h3>Optimization & Scaling</h3>
        <ul>
          <li>Performance improvements</li>
          <li>System refinement</li>
          <li>Expansion as business grows</li>
        </ul>
        
        <h2>Target Audience</h2>
        <p>Founders and leadership teams, growing businesses, organizations seeking operational efficiency, teams that want a partner not just advice.</p>
        
        <h2>Technology Stack</h2>
        <p>Primary platform: Make.com (formerly Integromat). We also work with AI tools, APIs, and modern automation platforms. Integrates with 500+ business tools including Salesforce, HubSpot, Slack, Airtable, Notion, Google Workspace, Microsoft 365, Stripe, and any tool with an API.</p>
        
        <h2>Founder</h2>
        <p>Wambui Ndung'u - Founder & Automation Consultant. Based in Kenya, serving clients worldwide.</p>
        
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