import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Property } from '@/src/types/property';
import { RefreshCw, X, MapPin } from 'lucide-react';

interface PropertyMapProps {
  properties: Property[];
  hoveredId: string | null;
  onHoverProperty: (id: string | null) => void;
  onSelectProperty: (id: string) => void;
  onSearchThisArea: (bounds: { north: number; south: number; east: number; west: number }) => void;
  onClearAreaFilter: () => void;
  isAreaFilterActive: boolean;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  hoveredId,
  onHoverProperty,
  onSelectProperty,
  onSearchThisArea,
  onClearAreaFilter,
  isAreaFilterActive,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const [mapMoved, setMapMoved] = useState(false);
  const currentBoundsRef = useRef<{ north: number; south: number; east: number; west: number } | null>(null);

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Default center: Shemiranat / Northern Tehran
    const map = L.map(mapContainerRef.current, {
      center: [35.808, 51.435],
      zoom: 13,
      zoomControl: false,
    });

    // Add zoom control to top-left (so in RTL it stays accessible)
    L.control.zoom({ position: 'topleft' }).addTo(map);

    // Warm, elegant CartoDB Voyager tiles (clean architectural map)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Detect user pan/zoom movements
    const handleMoveEnd = () => {
      const b = map.getBounds();
      currentBoundsRef.current = {
        north: b.getNorth(),
        south: b.getSouth(),
        east: b.getEast(),
        west: b.getWest(),
      };
      setMapMoved(true);
    };

    map.on('moveend', handleMoveEnd);

    return () => {
      map.off('moveend', handleMoveEnd);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers when properties change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    properties.forEach((prop) => {
      const isHovered = hoveredId === prop.id;

      // Custom HTML Price Bubble Marker
      const icon = L.divIcon({
        className: 'price-marker-container',
        html: `
          <div class="price-bubble ${isHovered ? 'price-bubble-hovered' : ''}" id="marker-${prop.id}">
            <span>${prop.priceShortMarker}</span>
          </div>
        `,
        iconSize: [64, 28],
        iconAnchor: [32, 14],
      });

      const marker = L.marker([prop.coordinates.lat, prop.coordinates.lng], {
        icon,
        zIndexOffset: isHovered ? 1000 : 10,
      });

      // Marker popup with editorial micro-card
      const popupHtml = `
        <div style="width: 220px; font-family: var(--font-body); direction: rtl; text-align: right;">
          <div style="height: 110px; width: 100%; overflow: hidden; background: #EDE4D8;">
            <img src="${prop.image}" alt="${prop.title}" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <div style="padding: 12px;">
            <div style="font-size: 10px; color: #5C554B; margin-bottom: 4px;">${prop.neighborhood} · ${prop.area} متر</div>
            <div style="font-size: 13px; font-weight: 700; color: #1F1B16; font-family: var(--font-display); line-height: 1.3; margin-bottom: 8px;">${prop.title}</div>
            <div style="font-size: 12px; font-weight: 700; color: #2F6F6A; font-family: var(--font-display);">${prop.priceFormatted}</div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        closeButton: true,
        offset: [0, -12],
      });

      // Events
      marker.on('click', () => {
        onSelectProperty(prop.id);
      });

      marker.on('mouseover', () => {
        onHoverProperty(prop.id);
      });

      marker.on('mouseout', () => {
        onHoverProperty(null);
      });

      marker.addTo(map);
      markersRef.current[prop.id] = marker;
    });
  }, [properties, onSelectProperty, onHoverProperty]);

  // Synchronize hover state from list to map marker
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const el = document.getElementById(`marker-${id}`);
      if (el) {
        if (id === hoveredId) {
          el.classList.add('price-bubble-hovered');
          marker.setZIndexOffset(1000);
        } else {
          el.classList.remove('price-bubble-hovered');
          marker.setZIndexOffset(10);
        }
      }
    });

    // Optionally center map on hovered property
    if (hoveredId && mapInstanceRef.current && markersRef.current[hoveredId]) {
      const targetMarker = markersRef.current[hoveredId];
      const latLng = targetMarker.getLatLng();
      const currentBounds = mapInstanceRef.current.getBounds();
      if (!currentBounds.contains(latLng)) {
        mapInstanceRef.current.panTo(latLng, { animate: true, duration: 0.5 });
      }
    }
  }, [hoveredId]);

  const handleSearchCurrentArea = () => {
    if (currentBoundsRef.current) {
      onSearchThisArea(currentBoundsRef.current);
      setMapMoved(false);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[420px] bg-cream-surface rounded-editorial-lg overflow-hidden border border-warm-hairline">
      {/* Map DOM Element */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating "Search in this area" Action Pill on Map Movement */}
      {mapMoved && (
        <div className="absolute top-4 inset-x-0 flex justify-center z-20 pointer-events-none">
          <button
            type="button"
            onClick={handleSearchCurrentArea}
            className="pointer-events-auto shadow-lg flex items-center gap-2 px-5 py-2.5 bg-olive-dark hover:bg-olive-deep text-cream-canvas text-xs font-medium rounded-full transition-all duration-200 active:scale-95 border border-olive-hairline"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin-reverse" />
            <span>جستجو در این محدوده نقشه</span>
          </button>
        </div>
      )}

      {/* Active Boundary Indicator & Clear Filter button */}
      {isAreaFilterActive && (
        <div className="absolute bottom-5 inset-x-4 flex justify-between items-center z-20 pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 bg-cream-card/95 backdrop-blur-md rounded-full border border-warm-hairline text-xs font-medium text-warm-charcoal shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-teal" />
            <span>محدوده نقشه فعال است</span>
          </div>

          <button
            type="button"
            onClick={onClearAreaFilter}
            className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 bg-cream-card hover:bg-cream-surface text-warm-charcoal text-xs font-medium rounded-full border border-warm-hairline shadow-sm transition-colors"
          >
            <X className="w-3.5 h-3.5 text-warm-muted" />
            <span>نمایش همه مناطق</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;
