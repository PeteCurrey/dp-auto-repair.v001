import { MetadataRoute } from 'next'
import { marketingServices } from '@/data/marketing-services'
import { marketingVehicles } from '@/data/marketing-vehicles'
import { marketingAreas } from '@/data/marketing-areas'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dpautorepair.co.uk'
  
  // 1. Static Routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/services',
    '/vehicles',
    '/areas',
    '/book',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // 2. Individual Service Pages
  const serviceRoutes = Object.keys(marketingServices).map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // 3. Individual Vehicle Pages
  const vehicleRoutes = Object.keys(marketingVehicles).map((slug) => ({
    url: `${baseUrl}/vehicles/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // 4. Individual Area Pages
  const areaRoutes = Object.keys(marketingAreas).map((slug) => ({
    url: `${baseUrl}/areas/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // 5. Combination Pages (Make + Service)
  const combinationServices = [
    "car-servicing",
    "mot-preparation",
    "engine-diagnostics",
    "brake-repairs",
    "clutch-replacement",
    "cam-belt-replacement"
  ];
  
  const combinationRoutes: MetadataRoute.Sitemap = [];
  Object.keys(marketingVehicles).forEach(make => {
    combinationServices.forEach(service => {
      combinationRoutes.push({
        url: `${baseUrl}/${make}/${service}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    });
  });

  return [
    ...staticRoutes, 
    ...serviceRoutes, 
    ...vehicleRoutes, 
    ...areaRoutes, 
    ...combinationRoutes
  ]
}
