import React, { useState, Suspense, lazy, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Map, List, AlertTriangle, RotateCcw, Home, Sparkles } from 'lucide-react';
import { useProperties } from '@/src/api/properties';
import { PropertyFilterParams, Property } from '@/src/types/property';
import { PropertyCard } from '@/src/components/PropertyCard';
import { PropertyFilters } from '@/src/components/PropertyFilters';
import { Header } from '@/src/components/Header';

// Lazy load PropertyMap to keep initial bundle lightweight & safe
const PropertyMap = lazy(() => import('@/src/components/PropertyMap'));

function MapLoadingSkeleton() {
  return (
    <div className="w-full h-full min-h-[420px] bg-cream-surface rounded-editorial-lg flex flex-col items-center justify-center p-6 text-warm-muted animate-pulse border border-warm-hairline">
      <div className="w-8 h-8 rounded-full border-2 border-teal border-t-transparent animate-spin mb-3" />
      <span className="text-xs font-display font-medium">در حال آماده‌سازی نقشه معماری...</span>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="bg-cream-card rounded-editorial-xl border border-warm-hairline p-0 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-cream-surface/70 w-full" />
      <div className="p-6 space-y-3">
        <div className="h-3 bg-cream-surface rounded w-1/3" />
        <div className="h-6 bg-cream-surface rounded w-3/4" />
        <div className="h-4 bg-cream-surface rounded w-full" />
        <div className="h-4 bg-cream-surface rounded w-2/3" />
        <div className="pt-4 border-t border-warm-hairline flex justify-between items-center">
          <div className="h-5 bg-cream-surface rounded w-24" />
          <div className="h-8 bg-cream-surface rounded w-20" />
        </div>
      </div>
    </div>
  );
}

export const PropertiesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');

  // Parse filters from URL search params
  const filters: PropertyFilterParams = useMemo(() => {
    const transactionType = searchParams.get('type') as any || 'all';
    const neighborhood = searchParams.get('neighborhood') || 'all';
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const minArea = searchParams.get('minArea') ? Number(searchParams.get('minArea')) : undefined;
    const bedrooms = searchParams.get('bedrooms') ? (searchParams.get('bedrooms') === 'all' ? 'all' : Number(searchParams.get('bedrooms'))) : 'all';
    const sortBy = (searchParams.get('sort') as any) || 'newest';

    const boundsParam = searchParams.get('bounds');
    let bounds = null;
    if (boundsParam) {
      try {
        bounds = JSON.parse(decodeURIComponent(boundsParam));
      } catch (e) {
        bounds = null;
      }
    }

    return {
      transactionType,
      neighborhood,
      minPrice,
      maxPrice,
      minArea,
      bedrooms,
      sortBy,
      bounds,
    };
  }, [searchParams]);

  // Update URL search parameters
  const updateFilters = (newFilters: Partial<PropertyFilterParams>) => {
    const params = new URLSearchParams(searchParams);

    if (newFilters.transactionType !== undefined) {
      if (newFilters.transactionType === 'all') params.delete('type');
      else params.set('type', newFilters.transactionType);
    }

    if (newFilters.neighborhood !== undefined) {
      if (newFilters.neighborhood === 'all') params.delete('neighborhood');
      else params.set('neighborhood', newFilters.neighborhood);
    }

    if (newFilters.maxPrice !== undefined) {
      if (!newFilters.maxPrice) params.delete('maxPrice');
      else params.set('maxPrice', String(newFilters.maxPrice));
    }

    if (newFilters.minArea !== undefined) {
      if (!newFilters.minArea) params.delete('minArea');
      else params.set('minArea', String(newFilters.minArea));
    }

    if (newFilters.bedrooms !== undefined) {
      if (newFilters.bedrooms === 'all') params.delete('bedrooms');
      else params.set('bedrooms', String(newFilters.bedrooms));
    }

    if (newFilters.sortBy !== undefined) {
      if (newFilters.sortBy === 'newest') params.delete('sort');
      else params.set('sort', newFilters.sortBy);
    }

    if (newFilters.bounds !== undefined) {
      if (!newFilters.bounds) params.delete('bounds');
      else params.set('bounds', encodeURIComponent(JSON.stringify(newFilters.bounds)));
    }

    setSearchParams(params, { replace: true });
  };

  const resetAllFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  // TanStack Query API fetch
  const { data: properties = [], isLoading, isError, error, refetch } = useProperties(filters);

  // Scroll to property card when selected from map marker
  const handleSelectFromMap = (id: string) => {
    setHoveredPropertyId(id);
    const element = document.getElementById(`property-card-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSearchThisArea = (bounds: { north: number; south: number; east: number; west: number }) => {
    updateFilters({ bounds });
  };

  const handleClearAreaFilter = () => {
    updateFilters({ bounds: null });
  };

  return (
    <div className="min-h-screen bg-cream-canvas text-warm-charcoal font-body antialiased flex flex-col selection:bg-teal selection:text-white">
      {/* Editorial Header */}
      <Header />

      {/* Main Split-Screen Container */}
      <main className="flex-1 pt-24 sm:pt-28 lg:pt-32 max-w-[1720px] mx-auto w-full px-4 sm:px-8 lg:px-12 pb-24">
        
        {/* Page Title & Breadcrumb */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-warm-muted mb-1.5">
              <Link to="/" className="hover:text-warm-charcoal transition-colors">خانه</Link>
              <span>/</span>
              <span className="text-warm-charcoal font-medium">فهرست عمارت‌ها و ویلاها</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-warm-charcoal tracking-tight">
              گزیده املاک و خانه‌های بااصالت
            </h1>
          </div>
          <p className="text-xs text-warm-muted max-w-md">
            هر اثر دارای شناسنامه معماری معتبر و ارزیابی استانداردهای ساخت پایدار در منطقه ۱ و لواسانات است.
          </p>
        </div>

        {/* Filter Chips Bar */}
        <div className="mb-6 p-3 sm:p-4 bg-cream-card rounded-editorial-lg border border-warm-hairline">
          <PropertyFilters
            filters={filters}
            onFilterChange={updateFilters}
            onResetFilters={resetAllFilters}
            totalCount={properties.length}
          />
        </div>

        {/* Split Screen Grid: Left = Cards List, Right = Leaflet Map (In RTL: Right side is Cards, Left side is Map) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative min-h-[650px]">
          
          {/* Properties Cards Column (7 cols in desktop) */}
          <div
            className={`lg:col-span-7 flex flex-col space-y-6 ${
              mobileView === 'map' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Loading Skeleton */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="bg-red-50 border border-red-200 text-red-900 rounded-editorial-xl p-8 text-center space-y-4">
                <AlertTriangle className="w-8 h-8 text-red-600 mx-auto" />
                <h3 className="text-lg font-display font-bold">خطا در بارگذاری پرونده‌ها</h3>
                <p className="text-xs text-red-700">
                  {error instanceof Error ? error.message : 'ارتباط با سرور کارگزاری برقرار نشد.'}
                </p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-editorial-sm text-xs font-medium transition-colors"
                >
                  تلاش مجدد
                </button>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !isError && properties.length === 0 && (
              <div className="bg-cream-card border border-warm-hairline rounded-editorial-xl p-12 text-center space-y-4 my-8">
                <div className="w-14 h-14 mx-auto rounded-full bg-cream-surface flex items-center justify-center text-warm-muted">
                  <Home className="w-6 h-6 text-teal" />
                </div>
                <h3 className="text-xl font-display font-bold text-warm-charcoal">
                  اثری با این مشخصات یافت نشد
                </h3>
                <p className="text-xs text-warm-muted max-w-sm mx-auto leading-relaxed">
                  فیلترهای انتخابی شما بسیار محدودکننده است. لطفاً بازه قیمت، متراژ یا محدوده نقشه را تغییر دهید.
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-teal hover:bg-teal-hover text-cream-canvas rounded-editorial-sm text-xs font-medium transition-colors shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>حذف فیلترها و مشاهده همه آثار</span>
                </button>
              </div>
            )}

            {/* Property Cards Grid */}
            {!isLoading && !isError && properties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((prop) => (
                  <div
                    key={prop.id}
                    id={`property-card-${prop.id}`}
                    onMouseEnter={() => setHoveredPropertyId(prop.id)}
                    onMouseLeave={() => setHoveredPropertyId(null)}
                    className={`transition-all duration-200 rounded-editorial-xl ${
                      hoveredPropertyId === prop.id
                        ? 'ring-2 ring-teal shadow-xl scale-[1.01]'
                        : ''
                    }`}
                  >
                    <PropertyCard
                      id={prop.id}
                      title={prop.title}
                      subtitle={prop.subtitle}
                      location={prop.neighborhood}
                      area={`${prop.area} متر مربع`}
                      rooms={`${prop.bedrooms} اتاق خواب`}
                      year={`ساخت ${prop.yearBuilt}`}
                      priceLabel={prop.transactionType === 'sale' ? 'قیمت اعلامی' : 'شرایط واگذاری'}
                      priceValue={prop.priceFormatted}
                      image={prop.image}
                      onExplore={() => {
                        alert(`پرونده معماری «${prop.title}» — معمار: ${prop.architect}`);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sticky Leaflet Map Column (5 cols in desktop) */}
          <div
            className={`lg:col-span-5 h-[520px] lg:h-[calc(100vh-210px)] lg:sticky lg:top-28 ${
              mobileView === 'list' ? 'hidden lg:block' : 'block'
            }`}
          >
            <Suspense fallback={<MapLoadingSkeleton />}>
              <PropertyMap
                properties={properties}
                hoveredId={hoveredPropertyId}
                onHoverProperty={setHoveredPropertyId}
                onSelectProperty={handleSelectFromMap}
                onSearchThisArea={handleSearchThisArea}
                onClearAreaFilter={handleClearAreaFilter}
                isAreaFilterActive={!!filters.bounds}
              />
            </Suspense>
          </div>

        </div>

      </main>

      {/* Floating Mobile Toggle Button: "مشاهده نقشه / مشاهده لیست" */}
      <div className="fixed bottom-6 inset-x-0 flex justify-center z-40 lg:hidden pointer-events-none">
        <button
          type="button"
          onClick={() => setMobileView((prev) => (prev === 'list' ? 'map' : 'list'))}
          className="pointer-events-auto shadow-2xl flex items-center gap-2.5 px-6 py-3.5 bg-warm-charcoal hover:bg-black text-cream-canvas rounded-full text-xs font-semibold tracking-wide border border-warm-muted/40 transition-transform active:scale-95"
        >
          {mobileView === 'list' ? (
            <>
              <Map className="w-4 h-4 text-teal-light" />
              <span>مشاهده روی نقشه ({properties.length})</span>
            </>
          ) : (
            <>
              <List className="w-4 h-4 text-teal-light" />
              <span>مشاهده لیست فایل‌ها ({properties.length})</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PropertiesPage;
