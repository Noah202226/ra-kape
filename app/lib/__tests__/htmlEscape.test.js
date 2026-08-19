import { describe, it, expect } from "vitest";
import { escapeHtml, sanitizeText } from "../htmlEscape";

describe("HTML Escape & XSS Prevention", () => {
  describe("escapeHtml", () => {
    it("should escape ampersands", () => {
      expect(escapeHtml("Tom & Jerry")).toBe("Tom &amp; Jerry");
    });

    it("should escape less-than symbols", () => {
      expect(escapeHtml("a < b")).toBe("a &lt; b");
    });

    it("should escape greater-than symbols", () => {
      expect(escapeHtml("a > b")).toBe("a &gt; b");
    });

    it("should escape double quotes", () => {
      expect(escapeHtml('He said "Hello"')).toBe("He said &quot;Hello&quot;");
    });

    it("should escape single quotes", () => {
      expect(escapeHtml("It's fine")).toBe("It&#039;s fine");
    });

    it("should prevent XSS injection", () => {
      const malicious = '<img src=x onerror="alert(\'XSS\')">';
      const escaped = escapeHtml(malicious);
      expect(escaped).toBe(
        "&lt;img src=x onerror=&quot;alert(&#039;XSS&#039;)&quot;&gt;"
      );
      expect(escaped).not.toContain("<");
      expect(escaped).not.toContain(">");
    });

    it("should handle script tags", () => {
      const malicious = "<script>alert('XSS')</script>";
      const escaped = escapeHtml(malicious);
      expect(escaped).toContain("&lt;script&gt;");
      expect(escaped).not.toContain("<script>");
    });

    it("should handle event handlers", () => {
      const malicious = "<div onclick=alert('XSS')>Click me</div>";
      const escaped = escapeHtml(malicious);
      expect(escaped).not.toContain("onclick=");
    });

    it("should handle empty string", () => {
      expect(escapeHtml("")).toBe("");
    });

    it("should handle null/undefined", () => {
      expect(escapeHtml(null)).toBe("");
      expect(escapeHtml(undefined)).toBe("");
    });

    it("should handle normal text", () => {
      const normal = "Hello, this is a test message";
      expect(escapeHtml(normal)).toBe(normal);
    });

    it("should handle multiple special characters", () => {
      const input = '<div class="test" data-value="5 < 10 & 20 > 15">';
      const output = escapeHtml(input);
      expect(output).toBe(
        "&lt;div class=&quot;test&quot; data-value=&quot;5 &lt; 10 &amp; 20 &gt; 15&quot;&gt;"
      );
    });
  });

  describe("sanitizeText", () => {
    it("should escape HTML and preserve newlines as br tags", () => {
      const input = "Line 1\nLine 2";
      const output = sanitizeText(input);
      expect(output).toContain("<br>");
      expect(output).not.toContain("\n");
    });

    it("should prevent script injection and format newlines", () => {
      const malicious = "<script>alert('XSS')</script>\nNew line";
      const sanitized = sanitizeText(malicious);
      expect(sanitized).not.toContain("<script>");
      expect(sanitized).toContain("<br>");
    });

    it("should handle multiple newlines", () => {
      const input = "Line 1\n\nLine 2";
      const output = sanitizeText(input);
      expect(output.match(/<br>/g).length).toBe(2);
    });

    it("should handle null/undefined", () => {
      expect(sanitizeText(null)).toBe("");
      expect(sanitizeText(undefined)).toBe("");
    });

    it("should preserve safe HTML entities in escaped form", () => {
      const input = "Price: $5 < $10";
      const output = sanitizeText(input);
      expect(output).toContain("&lt;");
      expect(output).not.toContain("<");
    });
  });

  describe("Email template safety", () => {
    it("should safely handle user email in template", () => {
      const userEmail = '<img src=x onerror="alert(1)">';
      const escaped = escapeHtml(userEmail);
      const html = `<p>Email: ${escaped}</p>`;
      
      expect(html).not.toContain("<img");
      expect(html).not.toContain("onerror");
    });

    it("should safely handle user name in template", () => {
      const userName = "John'; DROP TABLE users;--";
      const escaped = escapeHtml(userName);
      const html = `<p>Hello ${escaped}</p>`;
      
      expect(html).toContain("John&#039;");
      expect(html).not.toContain("DROP TABLE");
    });

    it("should safely handle message content", () => {
      const message = "Check this: <a href='javascript:alert(1)'>click</a>";
      const sanitized = sanitizeText(message);
      
      expect(sanitized).not.toContain("<a");
      expect(sanitized).not.toContain("javascript:");
    });
  });
});
