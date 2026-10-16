import { z } from 'zod';

export const CoordinatesSchema = z.object({
  lat: z.number().min(35.5).max(36.1),
  lng: z.number().min(51.1).max(51.9),
});

export const NeighborhoodPointSchema = z.object({
  title: z.string(),
  category: z.string(),
  distance: z.string(),
  timeMinutes: z.string(),
});

export const AdvisorSchema = z.object({
  name: z.string(),
  role: z.string(),
  phone: z.string(),
  whatsapp: z.string(),
  image: z.string(),
});

export const PropertySchema = z.object({
  id: z.string(),
  slug: z.string().optional(),
  title: z.string().min(3),
  subtitle: z.string(),
  neighborhood: z.string(),
  address: z.string(),
  transactionType: z.enum(['sale', 'rent']),
  price: z.number().positive(),
  priceFormatted: z.string(),
  priceShortMarker: z.string(),
  rentMonthly: z.number().optional(),
  area: z.number().positive(),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().int().nonnegative(),
  parking: z.number().int().nonnegative(),
  yearBuilt: z.number().int(),
  architect: z.string(),
  features: z.array(z.string()),
  coordinates: CoordinatesSchema,
  image: z.string(),
  gallery: z.array(z.string()).optional(),
  isFeatured: z.boolean().default(false),
  narrativeStory: z.string().optional(),
  architecturalDetails: z
    .object({
      structure: z.string(),
      lightConcept: z.string(),
      naturalMaterials: z.string(),
    })
    .optional(),
  neighborhoodPoints: z.array(NeighborhoodPointSchema).optional(),
  advisor: AdvisorSchema.optional(),
});

export type Property = z.infer<typeof PropertySchema>;
export type Coordinates = z.infer<typeof CoordinatesSchema>;
export type NeighborhoodPoint = z.infer<typeof NeighborhoodPointSchema>;
export type Advisor = z.infer<typeof AdvisorSchema>;

export const BookingRequestSchema = z.object({
  fullName: z.string().min(3, 'لطفاً نام و نام خانوادگی خود را کامل وارد کنید'),
  phone: z
    .string()
    .min(10, 'شماره همراه باید حداقل ۱۰ رقم باشد')
    .regex(/^(\+98|0)?9\d{9}$/, 'فرمت شماره همراه نامعتبر است (مثال: ۰۹۱۲۳۴۵۶۷۸۹)'),
  email: z.string().email('آدرس ایمیل معتبر نیست').optional().or(z.literal('')),
  preferredDate: z.string().min(1, 'لطفاً تاریخ پیشنهادی بازدید را تعیین کنید'),
  preferredTime: z.string().min(1, 'لطفاً بازه زمانی را انتخاب کنید'),
  notes: z.string().optional(),
});

export type BookingRequest = z.infer<typeof BookingRequestSchema>;

export interface PropertyFilterParams {
  transactionType?: 'all' | 'sale' | 'rent';
  neighborhood?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  bedrooms?: number | 'all';
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'area_desc';
  bounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  } | null;
}
