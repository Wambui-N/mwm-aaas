'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqData = [
  {
    question: "What kind of tasks can you automate?",
    answer: "Things like lead qualification, client follow-ups, proposal generation, CRM syncing, invoicing, email sequences, and more. If it's repeatable and rules-based, there's a good chance it can be automated."
  },
  {
    question: "I don't know what to automate. Is that a problem?",
    answer: "Not at all. That's exactly what our first call is for. I'll help you identify the bottlenecks and decide where automation can make the biggest impact."
  },
  {
    question: "How many automations do I get?",
    answer: "You can submit unlimited requests, but I work on one active automation at a time to keep quality high and turnaround fast. Most automations are completed in 48–72 hours."
  },
  {
    question: "What tools do you work with?",
    answer: "I use tools like Make, Zapier, Google Sheets, Airtable, Notion, CRMs, and custom APIs, usually whatever you already use."
  },
  {
    question: "How often do we meet?",
    answer: "We'll have a strategy call when you join, and from there we meet weekly or as needed to review progress and decide what to automate next."
  },
  {
    question: "What if something breaks?",
    answer: "I monitor your automations and offer ongoing support. If anything stops working, I'll fix it—no extra charge."
  },
  {
    question: "Can I pause or cancel anytime?",
    answer: "Yes. It's a month-to-month service. You can pause or cancel anytime. No contracts or hidden fees."
  },
  {
    question: "Do I need to give you access to my tools?",
    answer: "Yes, but only the tools we're automating. I'll walk you through safe access-sharing methods so everything stays secure."
  },
  {
    question: "Do you offer team training?",
    answer: "I don't offer formal training, but I include a short video and documentation to explain each automation so your team can use them with confidence."
  }
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What kind of automations do you build?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "I specialize in high-impact business automations: lead qualification systems, email marketing sequences, CRM integrations, data synchronization, reporting dashboards, workflow optimizations, and custom integrations."
                }
              },
              {
                "@type": "Question",
                "name": "How fast will I see results?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most automations are delivered within 48-72 hours. Simple workflows might be ready same-day, while complex multi-system integrations may take up to a week."
                }
              },
              {
                "@type": "Question",
                "name": "What if the automation doesn't work perfectly?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Unlimited revisions are included. I'll keep refining until it's exactly what you need. Plus, I provide 30 days of optimization after delivery."
                }
              },
              {
                "@type": "Question",
                "name": "Can I pause my subscription?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! Pause anytime and resume when you're ready. Perfect for seasonal businesses, funding rounds, or when you need to focus elsewhere."
                }
              },
              {
                "@type": "Question",
                "name": "Do you work with my existing tools?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! I integrate with 500+ business tools including Salesforce, HubSpot, Slack, Zapier, Airtable, Notion, Google Workspace, Microsoft 365, Stripe, and virtually any tool with an API."
                }
              }
            ]
          })
        }}
      />
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-black mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about Made with Make
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6 bg-white">
                <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
} 