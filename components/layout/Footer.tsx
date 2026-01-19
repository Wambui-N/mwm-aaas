"use client";

import React from "react";
import { Workflow, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
              className="flex items-center space-x-2 focus:outline-none"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              <span className="w-8 h-8 flex items-center justify-center">
                <svg
                  width="32"
                  height="28"
                  viewBox="0 0 539 468"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M219.95 185.773C195.606 227.866 6.57676 154.931 0.175575 172.583C-1.66719 177.432 10.8442 188.198 44.8869 207.498C80.9172 227.851 110.851 257.466 131.587 293.277C152.323 329.088 163.108 369.792 162.824 411.172C162.824 449.967 165.539 466.358 170.68 467.134C189.204 470.238 220.434 270.249 269.122 270.249C317.81 270.249 349.04 470.238 367.565 467.134C372.705 466.358 375.809 450.064 375.421 410.881C375.136 369.501 385.921 328.797 406.657 292.986C427.394 257.176 457.327 227.56 493.358 207.207C527.4 187.81 540.009 177.141 538.166 172.292C531.474 154.64 342.736 227.575 318.392 185.482C294.048 143.39 451.556 16.2389 439.626 1.20579C436.329 -2.7707 420.229 2.75759 386.768 22.737C351.048 43.7885 310.342 54.891 268.88 54.891C227.418 54.891 186.712 43.7885 150.991 22.737C117.434 3.33952 101.916 -2.47973 98.618 1.49676C86.6885 16.7238 243.905 143.584 219.95 185.773Z"
                    fill="currentColor"
                    className="text-black"
                  />
                </svg>
              </span>
              <span className="text-lg font-semibold">Made with Make</span>
            </button>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="/terms"
              className="text-gray-500 hover:text-black transition-colors text-sm"
            >
              Terms
            </a>
            <a
              href="/privacy"
              className="text-gray-500 hover:text-black transition-colors text-sm"
            >
              Privacy
            </a>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.linkedin.com/company/made-with-make/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-black transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:wambui@madewithmake.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-black transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-8">
          <p className="text-center text-gray-700 font-medium mb-4">
            Consult. Build. Execute.
          </p>
          <p className="text-gray-500 text-sm text-center">
            © 2025 Made with Make. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
