import { HttpParams } from "@angular/common/http";
import { SanitizerHtmlPipe } from "../pipes/sanitizer-html.pipe";

export const setParams = (
  filters: Record<string, string>,
  sanitizerHtml: SanitizerHtmlPipe
): HttpParams => {
  let params: HttpParams = new HttpParams();
  for (const key in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, key)) {
      const value: string = sanitizerHtml.transform(
        filters[key],
        "http"
      ) as string;
      params = params.append(key, value);
    }
  }
  return params;
};
