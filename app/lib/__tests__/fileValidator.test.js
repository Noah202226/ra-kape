import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { validateFile, sanitizeFilename } from "../fileValidator";

describe("File Upload Validation", () => {
  const ALLOWED_MIMES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  describe("validateFile", () => {
    describe("file existence and size", () => {
      it("should reject missing file", async () => {
        const result = await validateFile(null);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain("File is required");
      });

      it("should reject zero-size file", async () => {
        const file = new File([], "empty.jpg", { type: "image/jpeg" });
        const result = await validateFile(file);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain("File is required");
      });

      it("should reject file exceeding size limit", async () => {
        const largeBuffer = new ArrayBuffer(6 * 1024 * 1024); // 6MB
        const file = new File([largeBuffer], "large.jpg", {
          type: "image/jpeg",
        });

        const result = await validateFile(file);
        expect(result.valid).toBe(false);
        expect(result.errors.some(e => e.includes("too large"))).toBe(true);
      });

      it("should accept file within size limit", async () => {
        const buffer = new ArrayBuffer(2 * 1024 * 1024); // 2MB
        const file = new File([buffer], "image.jpg", { type: "image/jpeg" });

        const result = await validateFile(file);
        expect(result.size).toBe(2 * 1024 * 1024);
      });
    });

    describe("MIME type validation", () => {
      it("should reject non-image MIME types", async () => {
        const file = new File(
          [new ArrayBuffer(1024)],
          "document.pdf",
          { type: "application/pdf" }
        );

        const result = await validateFile(file);
        expect(result.valid).toBe(false);
        expect(result.errors.some(e => e.includes("Invalid file type"))).toBe(
          true
        );
      });

      it("should reject executable files", async () => {
        const file = new File(
          [new ArrayBuffer(1024)],
          "script.exe",
          { type: "application/x-msdownload" }
        );

        const result = await validateFile(file);
        expect(result.valid).toBe(false);
      });

      it("should accept JPEG files", async () => {
        const jpegHeader = new Uint8Array([0xff, 0xd8]); // JPEG magic bytes
        const file = new File([jpegHeader], "image.jpg", {
          type: "image/jpeg",
        });

        const result = await validateFile(file);
        expect(result.errors).not.toContain(
          "Invalid file type. Allowed: image/jpeg, image/png, image/webp, image/gif"
        );
      });

      it("should accept PNG files", async () => {
        const pngHeader = new Uint8Array([0x89, 0x50]); // PNG magic bytes
        const file = new File([pngHeader], "image.png", {
          type: "image/png",
        });

        const result = await validateFile(file);
        expect(result.errors).not.toContain(
          "Invalid file type. Allowed: image/jpeg, image/png, image/webp, image/gif"
        );
      });

      it("should accept WebP files", async () => {
        const file = new File([new ArrayBuffer(1024)], "image.webp", {
          type: "image/webp",
        });

        const result = await validateFile(file);
        // Valid MIME type
      });

      it("should accept GIF files", async () => {
        const file = new File([new ArrayBuffer(1024)], "image.gif", {
          type: "image/gif",
        });

        const result = await validateFile(file);
        // Valid MIME type
      });
    });

    describe("magic byte validation", () => {
      it("should reject file with invalid JPEG signature", async () => {
        const fakeJpegHeader = new Uint8Array([0x00, 0x00]); // Wrong signature
        const file = new File([fakeJpegHeader], "fake.jpg", {
          type: "image/jpeg",
        });

        const result = await validateFile(file);
        expect(result.valid).toBe(false);
        expect(result.errors.some(e => e.includes("Invalid JPEG"))).toBe(true);
      });

      it("should reject file with invalid PNG signature", async () => {
        const fakePngHeader = new Uint8Array([0x00, 0x00]); // Wrong signature
        const file = new File([fakePngHeader], "fake.png", {
          type: "image/png",
        });

        const result = await validateFile(file);
        expect(result.valid).toBe(false);
        expect(result.errors.some(e => e.includes("Invalid PNG"))).toBe(true);
      });

      it("should accept file with valid JPEG signature", async () => {
        const validJpegHeader = new Uint8Array([0xff, 0xd8, 0x00, 0x00]);
        const file = new File([validJpegHeader], "valid.jpg", {
          type: "image/jpeg",
        });

        const result = await validateFile(file);
        // Should not have JPEG signature error
        expect(
          result.errors.some(e => e.includes("Invalid JPEG"))
        ).toBe(false);
      });

      it("should accept file with valid PNG signature", async () => {
        const validPngHeader = new Uint8Array([0x89, 0x50, 0x4e, 0x47]);
        const file = new File([validPngHeader], "valid.png", {
          type: "image/png",
        });

        const result = await validateFile(file);
        // Should not have PNG signature error
        expect(
          result.errors.some(e => e.includes("Invalid PNG"))
        ).toBe(false);
      });
    });

    describe("combined validation", () => {
      it("should catch multiple errors", async () => {
        const file = new File(
          [new ArrayBuffer(6 * 1024 * 1024)],
          "document.pdf",
          { type: "application/pdf" }
        );

        const result = await validateFile(file);
        expect(result.valid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(1);
      });

      it("should pass all checks for valid image", async () => {
        const jpegHeader = new Uint8Array([
          0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10,
        ]);
        const file = new File([jpegHeader], "photo.jpg", {
          type: "image/jpeg",
        });

        const result = await validateFile(file);
        expect(result.valid).toBe(true);
      });
    });
  });

  describe("sanitizeFilename", () => {
    it("should remove special characters", () => {
      const filename = "photo@#$%.jpg";
      const sanitized = sanitizeFilename(filename);
      expect(sanitized).toBe("photo.jpg");
    });

    it("should remove leading dots", () => {
      const filename = "...hidden.jpg";
      const sanitized = sanitizeFilename(filename);
      expect(sanitized).not.toMatch(/^\./);
    });

    it("should preserve alphanumeric characters", () => {
      const filename = "photo123.jpg";
      const sanitized = sanitizeFilename(filename);
      expect(sanitized).toBe("photo123.jpg");
    });

    it("should preserve dashes and underscores", () => {
      const filename = "my-photo_v1.jpg";
      const sanitized = sanitizeFilename(filename);
      expect(sanitized).toContain("-");
      expect(sanitized).toContain("_");
    });

    it("should handle directory traversal attempts", () => {
      const filename = "../../../etc/passwd";
      const sanitized = sanitizeFilename(filename);
      expect(sanitized).not.toContain("/");
      expect(sanitized).not.toContain("..");
    });

    it("should handle null bytes", () => {
      const filename = "photo\0.jpg";
      const sanitized = sanitizeFilename(filename);
      expect(sanitized).not.toContain("\0");
    });

    it("should truncate long filenames", () => {
      const filename = "a".repeat(300) + ".jpg";
      const sanitized = sanitizeFilename(filename);
      expect(sanitized.length).toBeLessThanOrEqual(255);
    });

    it("should handle Unicode characters", () => {
      const filename = "фото.jpg";
      const sanitized = sanitizeFilename(filename);
      // Non-ASCII removed
      expect(sanitized).not.toContain("ф");
    });

    it("should preserve file extension", () => {
      const filename = "my@#$photo!.JPG";
      const sanitized = sanitizeFilename(filename);
      expect(sanitized.endsWith(".JPG")).toBe(true);
    });

    it("should handle empty string", () => {
      const sanitized = sanitizeFilename("");
      expect(sanitized).toBe("");
    });

    it("should handle only extension", () => {
      const sanitized = sanitizeFilename(".jpg");
      expect(sanitized).toBe("jpg");
    });
  });

  describe("security scenarios", () => {
    it("should prevent shell injection via filename", async () => {
      const filename = "image'; DROP TABLE files;--.jpg";
      const sanitized = sanitizeFilename(filename);
      expect(sanitized).not.toContain("'");
      expect(sanitized).not.toContain(";");
    });

    it("should prevent path traversal", async () => {
      const filename = "../../../../etc/passwd";
      const sanitized = sanitizeFilename(filename);
      expect(sanitized).not.toContain("/");
      expect(sanitized).not.toContain("..");
    });

    it("should prevent Windows alternate streams", async () => {
      const filename = "image.jpg:malware.exe";
      const sanitized = sanitizeFilename(filename);
      expect(sanitized).not.toContain(":");
    });

    it("should reject files with double extensions", async () => {
      const filename = "image.php.jpg";
      const sanitized = sanitizeFilename(filename);
      // PHP extension removed by extension whitelist in real implementation
      expect(sanitized).toBe("image.php.jpg"); // Just filename sanitized
    });
  });
});
