import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/staff-login/'],
    },
    sitemap: 'https://dpautorepair.co.uk/sitemap.xml',
  }
}
