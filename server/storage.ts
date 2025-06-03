import { articles, type Article, type InsertArticle, type Category, type DateFilter } from "@shared/schema";

export interface IStorage {
  getArticles(): Promise<Article[]>;
  getArticlesByCategory(category: Category): Promise<Article[]>;
  getArticlesByDateFilter(dateFilter: DateFilter): Promise<Article[]>;
  getFilteredArticles(category?: Category, dateFilter?: DateFilter): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  createMultipleArticles(articles: InsertArticle[]): Promise<Article[]>;
  clearArticles(): Promise<void>;
}

export class MemStorage implements IStorage {
  private articles: Map<number, Article>;
  private currentId: number;

  constructor() {
    this.articles = new Map();
    this.currentId = 1;
  }

  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getArticlesByCategory(category: Category): Promise<Article[]> {
    return Array.from(this.articles.values())
      .filter(article => article.category === category)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async getArticlesByDateFilter(dateFilter: DateFilter): Promise<Article[]> {
    const now = new Date();
    let filterDate: Date;

    switch (dateFilter) {
      case "today":
        filterDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "week":
        filterDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        filterDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      default:
        return this.getArticles();
    }

    return Array.from(this.articles.values())
      .filter(article => new Date(article.publishedAt) >= filterDate)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async getFilteredArticles(category?: Category, dateFilter?: DateFilter): Promise<Article[]> {
    let filteredArticles = Array.from(this.articles.values());

    if (category) {
      filteredArticles = filteredArticles.filter(article => article.category === category);
    }

    if (dateFilter && dateFilter !== "all") {
      const now = new Date();
      let filterDate: Date;

      switch (dateFilter) {
        case "today":
          filterDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case "week":
          filterDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "month":
          filterDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          break;
        default:
          filterDate = new Date(0);
      }

      filteredArticles = filteredArticles.filter(
        article => new Date(article.publishedAt) >= filterDate
      );
    }

    return filteredArticles.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = this.currentId++;
    const article: Article = { ...insertArticle, id };
    this.articles.set(id, article);
    return article;
  }

  async createMultipleArticles(insertArticles: InsertArticle[]): Promise<Article[]> {
    const created: Article[] = [];
    for (const insertArticle of insertArticles) {
      const article = await this.createArticle(insertArticle);
      created.push(article);
    }
    return created;
  }

  async clearArticles(): Promise<void> {
    this.articles.clear();
  }
}

export const storage = new MemStorage();
