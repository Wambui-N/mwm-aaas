# Component Structure Documentation

## Overview
The home page has been broken down into reusable components to improve maintainability, reusability, and code organization.

## Directory Structure

```
components/
├── layout/                    # Layout components used across pages
│   ├── Navigation.tsx        # Main navigation bar
│   └── Footer.tsx            # Site footer
├── pages/                    # Full page components
│   └── HomePage.tsx          # Main home page component
├── sections/                 # Individual page sections
│   ├── HeroSection.tsx       # Hero/banner section
│   ├── HowItWorksSection.tsx # How it works process
│   ├── FounderSection.tsx    # Founder/about section
│   ├── WhatToExpectSection.tsx # Timeline/process section
│   ├── WhyChooseSection.tsx  # Features/benefits section
│   ├── TestimonialSection.tsx # Customer testimonial
│   ├── PricingSection.tsx    # Pricing information
│   ├── FAQSection.tsx        # Frequently asked questions
│   └── FinalCTASection.tsx   # Final call-to-action
└── ui/                       # Reusable UI components
    ├── section-header.tsx    # Consistent section headers
    └── cta-button.tsx        # Call-to-action button component

lib/
└── animations.ts             # Shared animation utilities
```

## Component Breakdown

### Layout Components
- **Navigation**: Sticky navigation bar with logo, status indicator, and CTA
- **Footer**: Site footer with links and social media

### Section Components
Each section is self-contained and can be easily modified or reordered:

1. **HeroSection**: Main banner with headline, description, and primary CTAs
2. **HowItWorksSection**: Three-step process explanation
3. **FounderSection**: Founder introduction with photo and bio
4. **WhatToExpectSection**: Detailed timeline of the service process
5. **WhyChooseSection**: Key benefits and features grid
6. **TestimonialSection**: Customer testimonial with star rating
7. **PricingSection**: Pricing card with features list
8. **FAQSection**: Expandable FAQ accordion
9. **FinalCTASection**: Final call-to-action section

### UI Components
- **SectionHeader**: Reusable component for consistent section titles
- **CTAButton**: Standardized call-to-action button with variants

### Shared Utilities
- **animations.ts**: Centralized animation configurations to avoid duplication

## Benefits of This Structure

### 1. Maintainability
- Each section is isolated and can be modified independently
- Changes to one section don't affect others
- Easier to debug and test individual components

### 2. Reusability
- Components can be reused across different pages
- UI components can be shared throughout the site
- Animation utilities prevent code duplication

### 3. Organization
- Clear separation of concerns
- Logical grouping of related components
- Easy to find and modify specific sections

### 4. Performance
- Components can be lazy-loaded if needed
- Smaller bundle sizes for individual sections
- Better tree-shaking opportunities

## How to Modify Components

### Adding a New Section
1. Create a new component in `components/sections/`
2. Follow the existing naming convention: `[Name]Section.tsx`
3. Import and add to `HomePage.tsx` in the desired order

### Modifying Existing Sections
1. Navigate to the specific section component
2. Make changes within that component only
3. Test that changes don't affect other sections

### Updating Shared Elements
1. For animations: Modify `lib/animations.ts`
2. For UI components: Update the specific component in `components/ui/`
3. For layout elements: Modify components in `components/layout/`

## Best Practices

### 1. Component Structure
- Use TypeScript interfaces for props
- Include proper JSDoc comments for complex components
- Follow consistent naming conventions

### 2. Styling
- Use Tailwind CSS classes consistently
- Group related styles together
- Use CSS variables for theme values

### 3. Animations
- Import animations from `lib/animations.ts`
- Use consistent animation timing
- Ensure animations enhance UX, not distract

### 4. Performance
- Use `memo` for components that don't need frequent re-renders
- Lazy load components when appropriate
- Optimize images and assets

## Example: Adding a New Section

```tsx
// components/sections/NewSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { slideInFromBottom } from '@/lib/animations';
import SectionHeader from '@/components/ui/section-header';

export default function NewSection() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader 
          title="New Section Title"
          subtitle="Optional subtitle text"
        />
        
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={slideInFromBottom}
        >
          {/* Section content */}
        </motion.div>
      </div>
    </section>
  );
}
```

Then add to `HomePage.tsx`:
```tsx
import NewSection from '@/components/sections/NewSection';

// Add to the component list
<NewSection />
```

This structure makes the codebase much more maintainable and allows for easy updates and additions to the website. 