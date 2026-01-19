'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqData = [
  {
    question: "What's the difference between consulting and execution?",
    answer: "Consulting includes process audits, opportunity assessment, and strategy design. Execution means we actually build, test, and deploy the systems ourselves. We do both , from insight to implementation."
  },
  {
    question: "I don't know what to automate. Can you help?",
    answer: "Absolutely. That's what the discovery and consulting phase is for. We'll audit your operations, identify opportunities, and prioritize what will create the most value."
  },
  {
    question: "What tools and platforms do you work with?",
    answer: "We primarily use Make.com, along with AI tools, APIs, and modern automation platforms. We integrate with your existing systems , CRMs, spreadsheets, databases, and business tools."
  },
  {
    question: "How are engagements structured?",
    answer: "Each engagement is tailored to your needs. Typically, there's a consulting phase (discovery and strategy), an implementation phase (building and deploying), and an optimization phase (refinement). Projects are scoped clearly and priced transparently."
  },
  {
    question: "What happens after implementation?",
    answer: "We validate performance, document the systems, and ensure your team understands what was built. We also provide handover support so you can confidently use and maintain the automations."
  },
  {
    question: "Do you only provide strategy, or do you build too?",
    answer: "We do both. Unlike traditional consultants, we own the execution. We don't hand you a deck and disappear , we build, test, and deploy the systems ourselves."
  },
  {
    question: "What if our workflows change or systems break?",
    answer: "We design systems for reliability and can support optimization and scaling as your business evolves. Ongoing support can be included in your engagement or arranged separately."
  },
  {
    question: "Do I need to provide access to our tools?",
    answer: "Yes, but only to the systems we're working on. We follow secure access protocols and work with you to ensure everything stays protected."
  },
  {
    question: "Is this a good fit for early-stage companies?",
    answer: "It depends. If you're a founder or leadership team serious about operational efficiency and ready to invest in automation, we can help. If you're just exploring ideas or need templates, we're probably not the right fit."
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