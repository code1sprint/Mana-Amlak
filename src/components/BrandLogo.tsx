import React from 'react';
import { Link } from 'react-router-dom';
import manaLogo from '@/src/assets/images/mana-logo.webp';
import { APP_CONFIG } from '@/src/constants/content';

type BrandLogoProps = {
  /** Visual height of the mark; width follows aspect ratio */
  className?: string;
  imgClassName?: string;
  /** When true, wraps in a home Link */
  asLink?: boolean;
  /** Accessible label override */
  alt?: string;
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  imgClassName = 'h-16 sm:h-[4.5rem] w-auto',
  asLink = true,
  alt = `${APP_CONFIG.agencyName} — ${APP_CONFIG.agencySubtitle}`,
}) => {
  const mark = (
    <img
      src={manaLogo}
      alt={alt}
      width={555}
      height={720}
      decoding="async"
      className={`object-contain object-center select-none ${imgClassName}`}
    />
  );

  if (!asLink) {
    return <span className={`inline-flex items-center shrink-0 ${className}`}>{mark}</span>;
  }

  return (
    <Link
      to="/"
      className={`inline-flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal rounded-editorial-sm ${className}`}
      aria-label={APP_CONFIG.agencyName}
    >
      {mark}
    </Link>
  );
};
