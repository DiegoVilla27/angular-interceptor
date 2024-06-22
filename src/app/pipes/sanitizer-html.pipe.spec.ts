import { inject } from "@angular/core";
import { SanitizerHtmlPipe } from "./sanitizer-html.pipe";
import { DomSanitizer } from "@angular/platform-browser";

describe("SanitizerHtmlPipe", () => {
  it("create an instance", () => {
    const pipe = new SanitizerHtmlPipe(inject(DomSanitizer));
    expect(pipe).toBeTruthy();
  });
});
