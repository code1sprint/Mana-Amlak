import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Maximize2, BedDouble } from 'lucide-react';

export type PropertyCardVariant = 'wide' | 'standard' | 'tall';

const IMAGE_ASPECT: Record<PropertyCardVariant, string> = {
  wide: 'aspect-[16/10]',
  standard: 'aspect-[4/3]',
  tall: 'aspect-[5/4]',
};

export interface PropertyCardProps {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  area: string;
  rooms: string;
  year: string;
  priceLabel: string;
  priceValue: string;
  image: string;
  badge?: string;
  variant?: PropertyCardVariant;
  className?: string;
  onExplore?: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  subtitle,
  location,
  area,
  rooms,
  year,
  priceLabel,
  priceValue,
  image,
  badge,
  variant = 'standard',
  className = '',
  onExplore,
}) => {
  const propertyUrl = `/properties/${id.toLowerCase()}`;
  const isWide = variant === 'wide';

  return (
    <article
      className={`group relative bg-cream-card rounded-editorial-xl border border-warm-hairline overflow-hidden transition-all duration-300 hover:border-warm-muted/40 hover:shadow-[0_12px_32px_-16px_rgba(31,27,22,0.08)] flex flex-col h-full ${className}`}
    >
      <Link
        to={propertyUrl}
        className={`relative ${IMAGE_ASPECT[variant]} w-full overflow-hidden bg-cream-surface/60 rounded-t-editorial-xl block`}
      >
        <img
          src={image}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        {badge ? (
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-teal text-cream-canvas rounded-editorial-sm text-xs font-medium shadow-md">
            {badge}
          </div>
        ) : null}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-cream-canvas/90 backdrop-blur-sm rounded-editorial-sm border border-warm-hairline text-xs font-medium text-warm-charcoal flex items-center gap-1.5 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-teal" />
          <span>{location}</span>
        </div>
      </Link>

      <div className={`flex flex-col flex-1 justify-between ${isWide ? 'p-6 sm:p-8' : 'p-5 sm:p-6'}`}>
        <div>
          <div className="flex items-center flex-wrap gap-2 text-xs text-warm-muted mb-3">
            <span>{year}</span>
            <span aria-hidden="true" className="text-warm-hairline">·</span>
            <span>کد اثر: {id}</span>
          </div>

          <Link to={propertyUrl}>
            <h3
              className={`font-display font-bold text-warm-charcoal group-hover:text-teal transition-colors mb-2 ${
                isWide ? 'text-xl sm:text-2xl lg:text-[1.65rem]' : 'text-lg sm:text-xl'
              }`}
            >
              {title}
            </h3>
          </Link>

          <p className="text-sm text-warm-muted line-clamp-2 leading-relaxed mb-5">
            {subtitle}
          </p>

          <div className="pt-4 border-t border-warm-hairline grid grid-cols-2 gap-3 text-xs text-warm-muted">
            <div className="flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-warm-muted/70 shrink-0" />
              <span className="truncate">{area}</span>
            </div>
            <div className="flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-warm-muted/70 shrink-0" />
              <span className="truncate">{rooms}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-warm-hairline flex items-center justify-between gap-4">
          <div>
            <span className="block text-[11px] text-warm-muted font-normal">
              {priceLabel}
            </span>
            <span
              className={`font-display font-bold text-warm-charcoal tabular-nums ${
                isWide ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
              }`}
            >
              {priceValue}
            </span>
          </div>

          <Link
            to={propertyUrl}
            onClick={() => onExplore?.(id)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-olive-dark hover:bg-olive-deep text-cream-canvas text-xs font-medium rounded-editorial-sm transition-colors shrink-0"
          >
            <span>بررسی پرونده</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
