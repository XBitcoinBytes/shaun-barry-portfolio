import type { MetadataRoute } from "next";
import { SITE_PAGES, SITE_URL } from "@/content/canonical";

export default function sitemap(): MetadataRoute.Sitemap {
  return SITE_PAGES.map((path) => ({
    url: path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
