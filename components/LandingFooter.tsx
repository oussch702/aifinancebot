import React from 'react';
import { Wallet, Twitter, Github, Linkedin, Instagram, Youtube } from 'lucide-react';

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { id: 'twitter', Icon: Twitter, href: '#twitter', label: 'Twitter' },
    { id: 'instagram', Icon: Instagram, href: '#instagram', label: 'Instagram' },
    { id: 'tiktok', Icon: () => (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.05A6.34 6.34 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ), href: '#tiktok', label: 'TikTok' },
    { id: 'youtube', Icon: Youtube, href: '#youtube', label: 'YouTube' },
    { id: 'github', Icon: Github, href: '#github', label: 'GitHub' },
    { id: 'linkedin', Icon: Linkedin, href: '#linkedin', label: 'LinkedIn' }
  ];

  const productLinks = [
    { id: 'features', label: 'Features', href: '#features' },
    { id: 'pricing', label: 'Pricing', href: '#pricing' },
    { id: 'security', label: 'Security', href: '#security' },
    { id: 'api', label: 'API', href: '#api' }
  ];

  const companyLinks = [
    { id: 'about', label: 'About', href: '#about' },
    { id: 'blog', label: 'Blog', href: '#blog' },
    { id: 'careers', label: 'Careers', href: '#careers' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ];

  const legalLinks = [
    { id: 'privacy', label: 'Privacy', href: '#privacy' },
    { id: 'terms', label: 'Terms', href: '#terms' },
    { id: 'cookies', label: 'Cookie Policy', href: '#cookies' }
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">FinanceGPT</span>
            </div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Your AI-powered financial advisor, available 24/7 to help you make smarter financial decisions.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Product
            </h3>
            <ul className="mt-4 space-y-4">
              {productLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              {companyLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              {legalLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-base text-gray-400 dark:text-gray-500">
              © {currentYear} FinanceGPT. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map(({ id, Icon, href, label }) => (
                <a
                  key={id}
                  href={href}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}