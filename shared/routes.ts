
import { z } from 'zod';
import { profiles, services, settings } from './schema';

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  notFound: z.object({ message: z.string() }),
  unauthorized: z.object({ message: z.string() }),
};

export const api = {
  auth: {
    me: { method: 'GET' as const, path: '/api/me', responses: { 200: z.any() } }
  },
  profiles: {
    list: {
      method: 'GET' as const,
      path: '/api/profiles',
      input: z.object({ gender: z.string().optional(), isPublic: z.boolean().optional(), isFeatured: z.boolean().optional() }).optional(),
      responses: { 200: z.array(z.custom<typeof profiles.$inferSelect>()) }
    },
    get: {
      method: 'GET' as const,
      path: '/api/profiles/:id',
      responses: { 200: z.custom<typeof profiles.$inferSelect>(), 404: errorSchemas.notFound }
    },
    create: {
      method: 'POST' as const,
      path: '/api/profiles',
      input: z.any(),
      responses: { 201: z.custom<typeof profiles.$inferSelect>(), 400: errorSchemas.validation }
    },
    update: {
      method: 'PUT' as const,
      path: '/api/profiles/:id',
      input: z.any(),
      responses: { 200: z.custom<typeof profiles.$inferSelect>(), 404: errorSchemas.notFound }
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/profiles/:id',
      responses: { 204: z.void(), 404: errorSchemas.notFound }
    },
    uploadImage: {
      method: 'POST' as const,
      path: '/api/profiles/:id/image',
      responses: { 200: z.object({ url: z.string() }) }
    }
  },
  services: {
    list: { method: 'GET' as const, path: '/api/services', responses: { 200: z.array(z.custom<typeof services.$inferSelect>()) } },
    create: { method: 'POST' as const, path: '/api/services', input: z.any(), responses: { 201: z.custom<typeof services.$inferSelect>() } },
    update: { method: 'PUT' as const, path: '/api/services/:id', input: z.any(), responses: { 200: z.custom<typeof services.$inferSelect>() } },
    delete: { method: 'DELETE' as const, path: '/api/services/:id', responses: { 204: z.void() } }
  },
  settings: {
    get: { method: 'GET' as const, path: '/api/settings', responses: { 200: z.custom<typeof settings.$inferSelect>() } },
    update: { method: 'PUT' as const, path: '/api/settings', input: z.any(), responses: { 200: z.custom<typeof settings.$inferSelect>() } }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value));
    });
  }
  return url;
}
