import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import TurnDown from "turndown";

const turndownService = new TurnDown();
export const sanitizeMarkdown = async(markdown: string): Promise<string> => {

    if(!markdown || markdown.trim() === "" || typeof markdown !== "string") {
        return "";
    }
    // Basic sanitization to prevent XSS attacks
    try {
       const convertedHtml =await marked.parse(markdown);
       const sanitizedHtml = sanitizeHtml(convertedHtml as string , {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'pre', 'code',  ]),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            img: ['src', 'alt', 'title'], 
            a: ['href', 'name', 'target'],
            code: ['class'],
            pre: ['class']
        },
        allowedSchemes: ['http', 'https', 'mailto', 'tel'],
        allowedSchemesByTag: {
            img: ['http', 'https', 'data']
        }
       });

       const tds = turndownService.turndown(sanitizedHtml);
       return tds;
    } catch (error) {
        console.error("Error sanitizing markdown:", error);
        return "";
    }
};