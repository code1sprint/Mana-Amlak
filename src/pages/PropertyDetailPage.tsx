import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  MapPin,
  Check,
  Compass,
  Phone,
  MessageCircle,
  Share2,
  Calendar,
  Layers,
  Sun,
  Hammer,
  Navigation,
  X,
} from 'lucide-react';
import { MOCK_PROPERTIES } from '@/src/data/mockProperties';
import { Property } from '@/src/types/property';
import { Header } from '@/src/components/Header';
import { PropertyGallery } from '@/src/components/PropertyGallery';
import { PropertyContactCard } from '@/src/components/PropertyContactCard';
import { PropertyCard } from '@/src/components/PropertyCard';
import L from 'leaflet';

export const PropertyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Find property by slug or id
  const property = useMemo(() => {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase();
    return (
      MOCK_PROPERTIES.find((p) => p.slug === cleanSlug || p.id.toLowerCase() === cleanSlug) ||
      MOCK_PROPERTIES[0]
    );
  }, [slug]);

  // Similar properties from same neighborhood or featured
  const similarProperties = useMemo(() => {
    if (!property) return [];
    return MOCK_PROPERTIES.filter(
      (p) => p.id !== property.id && (p.neighborhood === property.neighborhood || p.isFeatured)
    ).slice(0, 3);
  }, [property]);

  // Mini neighborhood map container ref
  const miniMapRef = React.useRef<HTMLDivElement>(null);
  const mapInstanceRef = React.useRef<L.Map | null>(null);

  useEffect(() => {
    if (!miniMapRef.current || !property) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const map = L.map(miniMapRef.current, {
      center: [property.coordinates.lat, property.coordinates.lng],
      zoom: 14,
      zoomControl: false,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    const icon = L.divIcon({
      className: 'price-marker-container',
      html: `
        <div class="price-bubble price-bubble-hovered">
          <span>${property.priceShortMarker}</span>
        </div>
      `,
      iconSize: [64, 28],
      iconAnchor: [32, 14],
    });

    L.marker([property.coordinates.lat, property.coordinates.lng], { icon }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [property]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        text: property?.subtitle,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-cream-canvas flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-display font-bold text-warm-charcoal mb-4">
          پرونده ملک مورد نظر یافت نشد
        </h2>
        <Link
          to="/properties"
          className="px-6 py-3 bg-teal text-cream-canvas rounded-editorial-sm text-xs font-medium"
        >
          بازگشت به فهرست عمارت‌ها
        </Link>
      </div>
    );
  }

  // JSON-LD Structured Data for RealEstateListing
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.subtitle,
    image: property.image,
    datePosted: '2026-10-16',
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'IRR',
      businessFunction: property.transactionType === 'sale' ? 'http://purl.org/goodrelations/v1#Sell' : 'http://purl.org/goodrelations/v1#LeaseOut',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: property.coordinates.lat,
      longitude: property.coordinates.lng,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'تهران',
      addressRegion: property.neighborhood,
      streetAddress: property.address,
      addressCountry: 'IR',
    },
  };

  return (
    <div className="min-h-screen bg-cream-canvas text-warm-charcoal font-body antialiased selection:bg-teal selection:text-white flex flex-col">
      {/* Dynamic SEO Meta via react-helmet-async */}
      <Helmet>
        <title>{`${property.title} | املاک مانا`}</title>
        <meta name="description" content={property.subtitle} />
        <meta property="og:title" content={`${property.title} | املاک مانا`} />
        <meta property="og:description" content={property.subtitle} />
        <meta property="og:image" content={property.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
      </Helmet>

      {/* Editorial Header */}
      <Header />

      <main className="flex-1 pt-24 sm:pt-28 lg:pt-32 pb-24 max-w-[1440px] mx-auto w-full px-5 sm:px-10 lg:px-16">
        
        {/* Breadcrumb & Action Strip */}
        <div className="flex items-center justify-between py-3 mb-6 border-b border-warm-hairline text-xs">
          <div className="flex items-center gap-2 text-warm-muted">
            <Link to="/" className="hover:text-warm-charcoal transition-colors">خانه</Link>
            <span>/</span>
            <Link to="/properties" className="hover:text-warm-charcoal transition-colors">عمارت‌ها و ویلاها</Link>
            <span>/</span>
            <span className="text-warm-charcoal font-medium truncate max-w-[200px] sm:max-w-none">
              {property.title}
            </span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-editorial-sm border border-warm-hairline hover:bg-cream-surface transition-colors text-warm-charcoal"
          >
            <Share2 className="w-3.5 h-3.5 text-teal" />
            <span>{copiedLink ? 'لینک کپی شد' : 'اشتراک پرونده'}</span>
          </button>
        </div>

        {/* Story Title & Bold Price Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 text-xs text-warm-muted mb-3 font-medium">
              <span className="text-teal font-semibold">{property.neighborhood}</span>
              <span aria-hidden="true">·</span>
              <span>کد اثر: {property.id}</span>
              <span aria-hidden="true">·</span>
              <span>معمار: {property.architect}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-warm-charcoal tracking-tight leading-[1.2] mb-3">
              {property.title}
            </h1>

            <p className="text-base sm:text-lg text-warm-muted leading-relaxed font-light">
              {property.subtitle}
            </p>
          </div>

          <div className="text-right lg:text-left shrink-0">
            <span className="block text-xs text-warm-muted mb-1">
              {property.transactionType === 'sale' ? 'ارزش کارشناسی اثر' : 'شرایط واگذاری انحصاری'}
            </span>
            <span className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-teal tabular-nums">
              {property.priceFormatted}
            </span>
          </div>
        </div>

        {/* 1. Bento Gallery (Varied Sizes + Swipeable Lightbox) */}
        <section className="mb-14">
          <PropertyGallery images={property.gallery || [property.image]} title={property.title} />
        </section>

        {/* 2. Key Specs as Huge Editorial Numerals in a Single Row */}
        <section className="py-8 sm:py-10 border-y border-warm-hairline mb-14 bg-cream-surface/30 rounded-editorial-xl px-6 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-warm-hairline">
            
            <div className="flex flex-col pt-4 md:pt-0">
              <span className="text-xs text-warm-muted mb-1">مساحت زیربنا</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-5xl font-display font-bold text-warm-charcoal tabular-nums">
                  {property.area}
                </span>
                <span className="text-xs text-teal font-medium">متر مربع</span>
              </div>
            </div>

            <div className="flex flex-col pt-4 md:pt-0 md:pr-6">
              <span className="text-xs text-warm-muted mb-1">تعداد اتاق خواب</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-5xl font-display font-bold text-warm-charcoal tabular-nums">
                  {property.bedrooms}
                </span>
                <span className="text-xs text-teal font-medium">مستر سوئیت</span>
              </div>
            </div>

            <div className="flex flex-col pt-4 md:pt-0 md:pr-6">
              <span className="text-xs text-warm-muted mb-1">سال احداث و پایان‌کار</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-5xl font-display font-bold text-warm-charcoal tabular-nums">
                  {property.yearBuilt}
                </span>
                <span className="text-xs text-teal font-medium">خورشیدی</span>
              </div>
            </div>

            <div className="flex flex-col pt-4 md:pt-0 md:pr-6">
              <span className="text-xs text-warm-muted mb-1">پارکینگ اختصاصی</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-5xl font-display font-bold text-warm-charcoal tabular-nums">
                  {property.parking}
                </span>
                <span className="text-xs text-teal font-medium">جایگاه سندی</span>
              </div>
            </div>

            <div className="flex flex-col pt-4 md:pt-0 md:pr-6">
              <span className="text-xs text-warm-muted mb-1">سرویس بهداشتی و اسپا</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-5xl font-display font-bold text-warm-charcoal tabular-nums">
                  {property.bathrooms}
                </span>
                <span className="text-xs text-teal font-medium">حمام و اسپا</span>
              </div>
            </div>

          </div>
        </section>

        {/* 3. Main Narrative Body + Sticky Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Story Content (7-8 cols, disciplined 68ch column) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-14">
            
            {/* Story Prose (Narrow column max-w-[68ch]) */}
            <div>
              <span className="text-xs font-mono text-teal block mb-2">
                روایت معماری اثر
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-warm-charcoal mb-6">
                همنشینی اصالت و آرامش در خلوت خانه
              </h2>
              
              <div className="text-base sm:text-lg text-warm-muted leading-[2] font-normal space-y-6 max-w-[68ch] text-pretty">
                {property.narrativeStory?.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Architectural Deep-Dive: Light, Structure, and Natural Materials */}
            {property.architecturalDetails && (
              <div className="pt-10 border-t border-warm-hairline space-y-8">
                <h3 className="text-xl font-display font-bold text-warm-charcoal">
                  ارکان مهندسی و مصالح زمین‌زاد
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-cream-card rounded-editorial-lg border border-warm-hairline p-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-teal mb-2.5">
                      <Layers className="w-4 h-4" />
                      <span>مهندسی سازه</span>
                    </div>
                    <p className="text-xs text-warm-muted leading-relaxed">
                      {property.architecturalDetails.structure}
                    </p>
                  </div>

                  <div className="bg-cream-card rounded-editorial-lg border border-warm-hairline p-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-teal mb-2.5">
                      <Sun className="w-4 h-4" />
                      <span>مفهوم نور و اقلیم</span>
                    </div>
                    <p className="text-xs text-warm-muted leading-relaxed">
                      {property.architecturalDetails.lightConcept}
                    </p>
                  </div>

                  <div className="bg-cream-card rounded-editorial-lg border border-warm-hairline p-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-teal mb-2.5">
                      <Hammer className="w-4 h-4" />
                      <span>مصالح اصیل طبیعی</span>
                    </div>
                    <p className="text-xs text-warm-muted leading-relaxed">
                      {property.architecturalDetails.naturalMaterials}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Curated Amenities List with Thin 1px Hairlines */}
            <div className="pt-10 border-t border-warm-hairline">
              <h3 className="text-xl font-display font-bold text-warm-charcoal mb-6">
                امکانات شاخص و پایداری
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 p-3.5 rounded-editorial-md bg-cream-card border border-warm-hairline text-xs font-medium text-warm-charcoal"
                  >
                    <span className="w-5 h-5 rounded-full bg-teal/10 text-teal flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Neighborhood Guide (Leaflet Mini Map + POI Points) */}
            <div className="pt-10 border-t border-warm-hairline space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-display font-bold text-warm-charcoal">
                    موقعیت اقلیمی و پیرامونی
                  </h3>
                  <p className="text-xs text-warm-muted mt-1">
                    {property.address}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-warm-muted font-mono">
                  <MapPin className="w-4 h-4 text-teal" />
                  <span>{property.coordinates.lat.toFixed(3)}, {property.coordinates.lng.toFixed(3)}</span>
                </div>
              </div>

              {/* Leaflet Embedded Map */}
              <div className="h-72 w-full rounded-editorial-xl overflow-hidden border border-warm-hairline shadow-inner">
                <div ref={miniMapRef} className="w-full h-full" />
              </div>

              {/* Neighborhood POI Points */}
              {property.neighborhoodPoints && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {property.neighborhoodPoints.map((poi) => (
                    <div
                      key={poi.title}
                      className="p-3 bg-cream-surface/40 rounded-editorial-sm border border-warm-hairline flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <Navigation className="w-3.5 h-3.5 text-teal shrink-0" />
                        <div>
                          <span className="font-medium text-warm-charcoal block">{poi.title}</span>
                          <span className="text-[10px] text-warm-muted">{poi.category}</span>
                        </div>
                      </div>
                      <div className="text-left font-mono shrink-0">
                        <span className="font-semibold text-warm-charcoal block">{poi.distance}</span>
                        <span className="text-[10px] text-teal">{poi.timeMinutes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Sticky Desktop Contact & Booking Card (4-5 cols) */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4 sticky top-28">
            <PropertyContactCard
              advisor={property.advisor || {
                name: 'مهندس سامان رادمنش',
                role: 'مشاور ارشد معماری مانا',
                phone: '۰۲۱-۲۲۰۰۳۳۴۴',
                whatsapp: '989123456789',
                image: property.image,
              }}
              propertyTitle={property.title}
              propertyId={property.id}
            />
          </div>

        </div>

        {/* 4. Similar Properties ("ملک‌های مشابه") Section */}
        {similarProperties.length > 0 && (
          <section className="mt-24 pt-16 border-t border-warm-hairline">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono text-teal block mb-1">
                  پیشنهادهای گزیده
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-warm-charcoal">
                  عمارت‌های مشابه در حوزه {property.neighborhood}
                </h3>
              </div>
              <Link
                to="/properties"
                className="text-xs font-medium text-warm-muted hover:text-warm-charcoal flex items-center gap-1.5 transition-colors"
              >
                <span>مشاهده تمام آثار</span>
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map((sim) => (
                <div key={sim.id} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <Link to={`/properties/${sim.slug || sim.id}`} className="block h-full">
                    <PropertyCard
                      id={sim.id}
                      title={sim.title}
                      subtitle={sim.subtitle}
                      location={sim.neighborhood}
                      area={`${sim.area} متر`}
                      rooms={`${sim.bedrooms} خواب`}
                      year={`ساخت ${sim.yearBuilt}`}
                      priceLabel="ارزش کارشناسی"
                      priceValue={sim.priceFormatted}
                      image={sim.image}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* 5. Mobile Fixed Bottom Sticky Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-cream-canvas/95 backdrop-blur-md border-t border-warm-hairline p-4 z-40 flex items-center justify-between gap-4 shadow-2xl">
        <div>
          <span className="text-[11px] text-warm-muted block">قیمت کارشناسی</span>
          <span className="text-base font-display font-bold text-teal tabular-nums">
            {property.priceFormatted}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${property.advisor?.phone || '02122003344'}`}
            className="p-3 bg-olive-dark text-cream-canvas rounded-editorial-sm transition-colors"
            aria-label="تماس با مشاور"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => setMobileModalOpen(true)}
            className="px-5 py-3 bg-teal hover:bg-teal-hover text-cream-canvas rounded-editorial-sm text-xs font-medium transition-colors shadow-sm"
          >
            درخواست بازدید
          </button>
        </div>
      </div>

      {/* Mobile Modal for Booking Form */}
      {mobileModalOpen && (
        <div className="fixed inset-0 z-50 bg-warm-charcoal/60 backdrop-blur-sm lg:hidden flex flex-col justify-end">
          <div className="bg-cream-canvas rounded-t-editorial-xl p-6 max-h-[90vh] overflow-y-auto border-t border-warm-hairline shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-warm-hairline">
              <span className="font-display font-bold text-warm-charcoal text-base">
                هماهنگی بازدید اختصاصی
              </span>
              <button
                type="button"
                onClick={() => setMobileModalOpen(false)}
                className="p-1.5 text-warm-muted hover:text-warm-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <PropertyContactCard
              advisor={property.advisor || {
                name: 'مهندس سامان رادمنش',
                role: 'مشاور ارشد معماری مانا',
                phone: '۰۲۱-۲۲۰۰۳۳۴۴',
                whatsapp: '989123456789',
                image: property.image,
              }}
              propertyTitle={property.title}
              propertyId={property.id}
              onSuccess={() => {
                setTimeout(() => setMobileModalOpen(false), 2500);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailPage;
