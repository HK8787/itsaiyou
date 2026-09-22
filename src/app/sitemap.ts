import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { jobs } from "@/data/jobs";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/courses/",
    "/jobs/",
    "/guide/",
    "/faq/",
    "/entry/",
    "/about/",
  ];

  const paths = [
    ...staticPaths,
    ...jobs.map((job) => `/jobs/${job.slug}/`),
    ...guides.map((guide) => `/guide/${guide.slug}/`),
  ];

  return paths.map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
