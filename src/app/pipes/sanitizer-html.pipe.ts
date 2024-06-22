import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({
  name: "sanitizerHtml",
  standalone: true
})
export class SanitizerHtmlPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  transform(value: string, validate: "http" | "html"): SafeHtml | string {
    const sanitizedContent: string = this.sanitizeHtml(value);
    return validate === "http"
      ? sanitizedContent
      : this._sanitizer.bypassSecurityTrustHtml(sanitizedContent);
  }

  private sanitizeHtml(value: string): string {
    // Remove script, style, iframe, object, embed tags
    let sanitized: string = value.replace(
      /<(script|style|iframe|object|embed|frame|frameset|applet|meta|link|base|form|input|button|textarea|select|option|isindex|keygen|source|track|wbr|data|time|output|progress|meter|details|summary|menu|menuitem|fieldset|legend|datalist|optgroup|map|area|blockquote|q|ins|del|caption|col|colgroup|thead|tbody|tfoot|tr|th|td|template|canvas|svg|audio|video|img|math|annotation|annotation-xml|maction|maligngroup|malignmark|menclose|merror|mfenced|mfrac|mglyph|mi|mlabeledtr|mmultiscripts|mn|mo|mover|mpadded|mphantom|mroot|mrow|ms|mspace|msqrt|mstyle|msub|msup|msubsup|mtable|mtd|mtext|mtr|munder|munderover|mprescripts|none|semantics|noembed|noframes|noscript)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/gi,
      ""
    );

    // Remove event handler attributes
    sanitized = sanitized.replace(/ on\w+="[^"]*"/gi, "");

    // Escape special characters to prevent injection
    sanitized = sanitized
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    return sanitized;
  }

  sanitizeFormValues(values: Record<string, string>): Record<string, string> {
    const sanitizedValues: Record<string, string> = {};
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        sanitizedValues[key] = this.transform(values[key], "http") as string;
      }
    }
    return sanitizedValues;
  }
}
