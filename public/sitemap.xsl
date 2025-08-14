<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"/>
  
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: Arial, sans-serif;
            font-size: 13px;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .header {
            background-color: #0066cc;
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .header p {
            margin: 5px 0 0 0;
            opacity: 0.9;
          }
          .stats {
            background-color: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background-color: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          th {
            background-color: #f1f3f4;
            padding: 12px;
            text-align: left;
            font-weight: bold;
            border-bottom: 2px solid #e0e0e0;
          }
          td {
            padding: 12px;
            border-bottom: 1px solid #e0e0e0;
          }
          tr:hover {
            background-color: #f8f9fa;
          }
          .url {
            color: #0066cc;
            text-decoration: none;
            word-break: break-all;
          }
          .url:hover {
            text-decoration: underline;
          }
          .priority {
            font-weight: bold;
          }
          .priority-high {
            color: #d93025;
          }
          .priority-medium {
            color: #f9ab00;
          }
          .priority-low {
            color: #34a853;
          }
          .changefreq {
            font-style: italic;
            color: #666;
          }
          .lastmod {
            color: #666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>XML Sitemap</h1>
          <p>This sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs for dpautorepair.co.uk</p>
        </div>
        
        <div class="stats">
          <strong>Sitemap Statistics:</strong>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Total URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></li>
            <li>High Priority (≥0.8): <xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority >= 0.8])"/></li>
            <li>Medium Priority (0.6-0.7): <xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority >= 0.6 and sitemap:priority &lt; 0.8])"/></li>
            <li>Lower Priority (&lt;0.6): <xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority &lt; 0.6])"/></li>
          </ul>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 50%;">URL</th>
              <th style="width: 20%;">Last Modified</th>
              <th style="width: 15%;">Change Frequency</th>
              <th style="width: 15%;">Priority</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <xsl:sort select="sitemap:priority" order="descending"/>
              <tr>
                <td>
                  <a href="{sitemap:loc}" class="url" target="_blank">
                    <xsl:value-of select="sitemap:loc"/>
                  </a>
                </td>
                <td class="lastmod">
                  <xsl:value-of select="sitemap:lastmod"/>
                </td>
                <td class="changefreq">
                  <xsl:value-of select="sitemap:changefreq"/>
                </td>
                <td>
                  <xsl:variable name="priority" select="sitemap:priority"/>
                  <span>
                    <xsl:attribute name="class">
                      priority
                      <xsl:choose>
                        <xsl:when test="$priority >= 0.8"> priority-high</xsl:when>
                        <xsl:when test="$priority >= 0.6"> priority-medium</xsl:when>
                        <xsl:otherwise> priority-low</xsl:otherwise>
                      </xsl:choose>
                    </xsl:attribute>
                    <xsl:value-of select="$priority"/>
                  </span>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
        
        <div style="margin-top: 20px; padding: 15px; background-color: white; border-radius: 8px; font-size: 12px; color: #666; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p><strong>About XML Sitemaps:</strong></p>
          <p>This is an XML Sitemap which is supposed to be processed by search engines which follow the XML sitemaps standard like Ask.com, Bing, Google and Yahoo.</p>
          <p>It was generated using a custom XSL stylesheet to make it human-readable. The actual sitemap data is in XML format for search engine consumption.</p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>