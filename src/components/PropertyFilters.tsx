import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { PropertyFilterParams } from '@/src/types/property';

interface PropertyFiltersProps {
  filters: PropertyFilterParams;
  onFilterChange: (newFilters: Partial<PropertyFilterParams>) => void;
  onResetFilters: () => void;
  totalCount: number;
}

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalCount,
}) => {
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setActivePopover(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const togglePopover = (name: string) => {
    setActivePopover((prev) => (prev === name ? null : name));
  };

  const isFiltered =
    (filters.transactionType && filters.transactionType !== 'all') ||
    (filters.neighborhood && filters.neighborhood !== 'all') ||
    (filters.bedrooms && filters.bedrooms !== 'all') ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.minArea !== undefined ||
    filters.bounds;

  const neighborhoods = [
    { label: 'همه محله‌ها', value: 'all' },
    { label: 'زعفرانیه', value: 'زعفرانیه' },
    { label: 'الهیه و فرشته', value: 'الهیه' },
    { label: 'نیاوران و صاحبقرانیه', value: 'نیاوران' },
    { label: 'کامرانیه و فرمانیه', value: 'کامرانیه' },
    { label: 'ولنجک و محمودیه', value: 'ولنجک' },
    { label: 'لواسانات', value: 'لواسان' },
    { label: 'دروس', value: 'دروس' },
    { label: 'سعادت‌آباد و شهرک غرب', value: 'سعادت‌آباد' },
  ];

  return (
    <div className="w-full relative" ref={popoverRef}>
      {/* Top Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
        
        {/* 1. Transaction Type Chip */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => togglePopover('transaction')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border transition-colors ${
              filters.transactionType && filters.transactionType !== 'all'
                ? 'bg-olive-dark text-cream-canvas border-olive-dark'
                : 'bg-cream-card text-warm-charcoal border-warm-hairline hover:border-warm-muted/40'
            }`}
          >
            <span>
              {filters.transactionType === 'sale'
                ? 'خرید عمارت'
                : filters.transactionType === 'rent'
                ? 'رهن و اجاره'
                : 'نوع معامله'}
            </span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {activePopover === 'transaction' && (
            <div className="absolute top-full right-0 mt-2 w-52 bg-cream-card rounded-editorial-md border border-warm-hairline shadow-xl p-3 z-30 space-y-1">
              {[
                { label: 'همه معاملات', value: 'all' },
                { label: 'خرید و فروش عمارت', value: 'sale' },
                { label: 'رهن و اجاره بااصالت', value: 'rent' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onFilterChange({ transactionType: opt.value as any });
                    setActivePopover(null);
                  }}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-right text-xs transition-colors ${
                    (filters.transactionType || 'all') === opt.value
                      ? 'bg-teal text-cream-canvas font-semibold'
                      : 'text-warm-charcoal hover:bg-cream-surface'
                  }`}
                >
                  <span>{opt.label}</span>
                  {(filters.transactionType || 'all') === opt.value && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. Neighborhood Chip */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => togglePopover('neighborhood')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border transition-colors ${
              filters.neighborhood && filters.neighborhood !== 'all'
                ? 'bg-olive-dark text-cream-canvas border-olive-dark'
                : 'bg-cream-card text-warm-charcoal border-warm-hairline hover:border-warm-muted/40'
            }`}
          >
            <span>{filters.neighborhood && filters.neighborhood !== 'all' ? filters.neighborhood : 'محله'}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {activePopover === 'neighborhood' && (
            <div className="absolute top-full right-0 mt-2 w-56 max-h-64 overflow-y-auto bg-cream-card rounded-editorial-md border border-warm-hairline shadow-xl p-2 z-30 space-y-1">
              {neighborhoods.map((n) => (
                <button
                  key={n.value}
                  type="button"
                  onClick={() => {
                    onFilterChange({ neighborhood: n.value });
                    setActivePopover(null);
                  }}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-right text-xs transition-colors ${
                    (filters.neighborhood || 'all') === n.value
                      ? 'bg-teal text-cream-canvas font-semibold'
                      : 'text-warm-charcoal hover:bg-cream-surface'
                  }`}
                >
                  <span>{n.label}</span>
                  {(filters.neighborhood || 'all') === n.value && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. Price Filter Chip */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => togglePopover('price')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border transition-colors ${
              filters.maxPrice || filters.minPrice
                ? 'bg-olive-dark text-cream-canvas border-olive-dark'
                : 'bg-cream-card text-warm-charcoal border-warm-hairline hover:border-warm-muted/40'
            }`}
          >
            <span>
              {filters.maxPrice
                ? `تا ${Math.round(filters.maxPrice / 1000000000)} میلیارد`
                : 'بازه قیمت'}
            </span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {activePopover === 'price' && (
            <div className="absolute top-full right-0 mt-2 w-72 bg-cream-card rounded-editorial-md border border-warm-hairline shadow-xl p-4 z-30 space-y-3">
              <span className="block text-xs font-semibold text-warm-charcoal">
                حداکثر بودجه خرید یا رهن (تومان)
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'همه قیمت‌ها', max: undefined },
                  { label: 'تا ۵۰ میلیارد', max: 50000000000 },
                  { label: 'تا ۱۵۰ میلیارد', max: 150000000000 },
                  { label: 'تا ۲۵۰ میلیارد', max: 250000000000 },
                  { label: 'تا ۳۵۰ میلیارد', max: 350000000000 },
                ].map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => {
                      onFilterChange({ maxPrice: p.max });
                      setActivePopover(null);
                    }}
                    className={`px-2.5 py-2 rounded text-xs transition-colors text-right ${
                      filters.maxPrice === p.max
                        ? 'bg-teal text-cream-canvas font-semibold'
                        : 'bg-cream-surface text-warm-charcoal hover:bg-cream-canvas'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. Area Filter Chip */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => togglePopover('area')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border transition-colors ${
              filters.minArea
                ? 'bg-olive-dark text-cream-canvas border-olive-dark'
                : 'bg-cream-card text-warm-charcoal border-warm-hairline hover:border-warm-muted/40'
            }`}
          >
            <span>{filters.minArea ? `حداقل ${filters.minArea} متر` : 'متراژ بنا'}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {activePopover === 'area' && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-cream-card rounded-editorial-md border border-warm-hairline shadow-xl p-4 z-30 space-y-3">
              <span className="block text-xs font-semibold text-warm-charcoal">
                حداقل متراژ مورد نظر (متر مربع)
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'هر متراژی', min: undefined },
                  { label: 'از ۲۵۰ متر', min: 250 },
                  { label: 'از ۴۰۰ متر', min: 400 },
                  { label: 'از ۶۰۰ متر', min: 600 },
                  { label: 'از ۸۰۰ متر به بالا', min: 800 },
                ].map((a) => (
                  <button
                    key={a.label}
                    type="button"
                    onClick={() => {
                      onFilterChange({ minArea: a.min });
                      setActivePopover(null);
                    }}
                    className={`px-2.5 py-2 rounded text-xs transition-colors text-right ${
                      filters.minArea === a.min
                        ? 'bg-teal text-cream-canvas font-semibold'
                        : 'bg-cream-surface text-warm-charcoal hover:bg-cream-canvas'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 5. Bedrooms Filter Chip */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => togglePopover('bedrooms')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border transition-colors ${
              filters.bedrooms && filters.bedrooms !== 'all'
                ? 'bg-olive-dark text-cream-canvas border-olive-dark'
                : 'bg-cream-card text-warm-charcoal border-warm-hairline hover:border-warm-muted/40'
            }`}
          >
            <span>
              {filters.bedrooms && filters.bedrooms !== 'all'
                ? `${filters.bedrooms}+ خواب`
                : 'تعداد خواب'}
            </span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {activePopover === 'bedrooms' && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-cream-card rounded-editorial-md border border-warm-hairline shadow-xl p-3 z-30 space-y-2">
              <span className="block text-xs font-semibold text-warm-charcoal mb-1">
                حداقل تعداد اتاق خواب
              </span>
              <div className="flex items-center gap-1 bg-cream-surface p-1 rounded-lg">
                {['all', 2, 3, 4, 5].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => {
                      onFilterChange({ bedrooms: b as any });
                      setActivePopover(null);
                    }}
                    className={`flex-1 py-1.5 text-center text-xs rounded transition-colors ${
                      (filters.bedrooms || 'all') === b
                        ? 'bg-teal text-cream-canvas font-bold shadow-sm'
                        : 'text-warm-charcoal hover:text-teal'
                    }`}
                  >
                    {b === 'all' ? 'همه' : `${b}+`}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sort Select */}
        <div className="relative shrink-0 mr-auto">
          <select
            value={filters.sortBy || 'newest'}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
            className="px-3 py-2 bg-cream-card text-warm-charcoal border border-warm-hairline rounded-full text-xs font-medium cursor-pointer focus:outline-none focus:border-teal"
          >
            <option value="newest">مرتب‌سازی: جدیدترین‌ها</option>
            <option value="price_desc">قیمت: زیاد به کم</option>
            <option value="price_asc">قیمت: کم به زیاد</option>
            <option value="area_desc">بیشترین متراژ</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 text-teal hover:text-teal-hover transition-colors font-medium"
            title="حذف همه فیلترها"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>پاکسازی فیلترها</span>
          </button>
        )}
      </div>

      {/* Result Count and Applied Boundary Indicator */}
      <div className="flex items-center justify-between text-xs text-warm-muted pt-2 border-t border-warm-hairline mt-1">
        <span>
          نمایش <strong className="text-warm-charcoal tabular-nums">{totalCount}</strong> اثر معماری شناسنامه‌دار
        </span>
        {filters.bounds && (
          <span className="text-teal font-medium">محدود به کادر فعلی نقشه</span>
        )}
      </div>
    </div>
  );
};
