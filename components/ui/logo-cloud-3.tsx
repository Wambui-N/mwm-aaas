'use client';

import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { cn } from '@/lib/utils';

type Logo = {
  src: string;
  alt: string;
  label?: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<'div'> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        'overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]',
        className
      )}
    >
      <InfiniteSlider gap={48} reverse={false} duration={40} durationOnHover={80}>
        {logos.map((logo) => {
          const label = logo.label ?? logo.alt;
          return (
            <div
              key={`logo-${logo.alt}`}
              className="group pointer-events-none inline-flex items-center gap-2 rounded-full border border-brand-grey/30 bg-white/60 px-3 py-1.5 backdrop-blur-sm shadow-sm"
              aria-hidden="true"
              title={label}
            >
              <img
                alt=""
                aria-hidden="true"
                className="h-5 w-5 select-none opacity-70  transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                height={logo.height ?? 20}
                loading="lazy"
                src={logo.src}
                width={logo.width ?? 20}
              />
              <span className="text-xs font-medium text-brand-black/70 transition-colors duration-300 group-hover:text-brand-black">
                {label}
              </span>
            </div>
          );
        })}
      </InfiniteSlider>
    </div>
  );
}
