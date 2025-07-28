"use client";

import React, { useRef, useState } from "react";

interface Status {
  type: "success" | "error";
  message: string;
}

export default function NewsletterSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    const form = formRef.current;
    if (!form) return;
    const email = (form.elements.namedItem("fields[email]") as HTMLInputElement)
      ?.value;

    if (!email) {
      setStatus({ type: "error", message: "Please enter your email." });
      return;
    }

    // Build the form data as expected by MailerLite
    const formData = new FormData();
    formData.append("fields[email]", email);
    formData.append("ml-submit", "1");
    formData.append("anticsrf", "true");

    try {
      const response = await fetch(
        "https://assets.mailerlite.com/jsonp/1316698/forms/157651152273409090/subscribe",
        {
          method: "POST",
          body: formData,
        }
      );

      // MailerLite returns JSON with success or error
      const result = await response.json();

      if (result.success) {
        setStatus({ type: "success", message: "Thank you for subscribing!" });
        form.reset();
      } else {
        // Show the first error message
        const errorMsg =
          result.errors?.fields?.email?.[0] ||
          "There was an error. Please try again.";
        setStatus({ type: "error", message: errorMsg });
      }
    } catch (err) {
      setStatus({ type: "error", message: "Network error. Please try again." });
    }
  };

  return (
    <section id="newsletter" className="py-24 bg-gray-50">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-black mb-6">
          Making It Make Sense Newsletter
        </h2>
        <p className="mb-4 text-gray-600">
          Because you didn’t build a business just to become its busiest
          employee. <br />
          Weekly automations, systems, and AI tips, for founders who value time,
          clarity, and momentum.
        </p>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <input
            type="email"
            name="fields[email]"
            placeholder="Email"
            autoComplete="email"
            className="flex-1 border border-gray-300 rounded px-4 py-2"
            required
          />
          <button
            type="submit"
            className="bg-black text-white rounded px-6 py-2 font-semibold"
          >
            Subscribe
          </button>
        </form>
        {status && (
          <div
            className={`mt-4 text-center ${
              status.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.message}
          </div>
        )}
      </div>
    </section>
  );
}
