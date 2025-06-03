import { pgTable, text, serial, integer, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content"),
  url: text("url").notNull(),
  urlToImage: text("url_to_image"),
  publishedAt: timestamp("published_at").notNull(),
  source: json("source").$type<{ id: string | null; name: string }>().notNull(),
  category: text("category").notNull(),
  author: text("author"),
});

export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
});

export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;

// Category enum for filtering
export const categories = [
  "technology",
  "politics", 
  "sports",
  "business",
  "health",
  "science"
] as const;

export type Category = typeof categories[number];

// Date filter options
export const dateFilters = [
  "all",
  "today", 
  "week",
  "month"
] as const;

export type DateFilter = typeof dateFilters[number];
