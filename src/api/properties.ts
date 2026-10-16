import { useQuery } from '@tanstack/react-query';
import { Property, PropertyFilterParams } from '@/src/types/property';
import { MOCK_PROPERTIES } from '@/src/data/mockProperties';

/**
 * Simulated API fetch with realistic network latency
 */
export async function fetchProperties(params: PropertyFilterParams): Promise<Property[]> {
  // Simulate network latency (350ms)
  await new Promise((resolve) => setTimeout(resolve, 350));

  let results = [...MOCK_PROPERTIES];

  // 1. Transaction Type filter
  if (params.transactionType && params.transactionType !== 'all') {
    results = results.filter((p) => p.transactionType === params.transactionType);
  }

  // 2. Neighborhood filter
  if (params.neighborhood && params.neighborhood !== 'all') {
    results = results.filter((p) => p.neighborhood === params.neighborhood);
  }

  // 3. Price min/max filter
  if (params.minPrice !== undefined && params.minPrice > 0) {
    results = results.filter((p) => p.price >= params.minPrice!);
  }
  if (params.maxPrice !== undefined && params.maxPrice > 0) {
    results = results.filter((p) => p.price <= params.maxPrice!);
  }

  // 4. Area min/max filter
  if (params.minArea !== undefined && params.minArea > 0) {
    results = results.filter((p) => p.area >= params.minArea!);
  }
  if (params.maxArea !== undefined && params.maxArea > 0) {
    results = results.filter((p) => p.area <= params.maxArea!);
  }

  // 5. Bedrooms filter
  if (params.bedrooms && params.bedrooms !== 'all') {
    const minBeds = Number(params.bedrooms);
    if (!isNaN(minBeds)) {
      results = results.filter((p) => p.bedrooms >= minBeds);
    }
  }

  // 6. Map Bounding Box filter (when "جستجو در این محدوده" is active)
  if (params.bounds) {
    const { north, south, east, west } = params.bounds;
    results = results.filter(
      (p) =>
        p.coordinates.lat <= north &&
        p.coordinates.lat >= south &&
        p.coordinates.lng <= east &&
        p.coordinates.lng >= west
    );
  }

  // 7. Sort
  if (params.sortBy) {
    switch (params.sortBy) {
      case 'price_asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'area_desc':
        results.sort((a, b) => b.area - a.area);
        break;
      case 'newest':
      default:
        results.sort((a, b) => b.yearBuilt - a.yearBuilt);
        break;
    }
  }

  return results;
}

/**
 * TanStack Query Hook for Properties
 */
export function useProperties(params: PropertyFilterParams) {
  return useQuery({
    queryKey: ['properties', params],
    queryFn: () => fetchProperties(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
