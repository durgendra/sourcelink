import axios from "axios";
import * as cheerio from "cheerio";
import { cleanText } from "./textCleaner.service";

export const parseWebpage = async (url: string) => {
  const response = await axios.get<string>(url, { timeout: 10_000 });
  const $ = cheerio.load(response.data);

  $("script, style, nav, footer").remove();

  const title = cleanText($("title").text());
  const headings = cleanText($("h1, h2, h3").text());
  const bodyText = cleanText($("body").text());
  const metaDescription = cleanText($("meta[name='description']").attr("content") ?? "");

  return {
    title,
    headings,
    bodyText,
    metaDescription,
    rawText: cleanText([title, metaDescription, headings, bodyText].filter(Boolean).join(" ")),
    metadata: { title, metaDescription }
  };
};
