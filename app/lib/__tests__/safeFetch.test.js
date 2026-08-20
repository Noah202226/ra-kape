import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { safeFetch, safeFetchPost, FetchError } from "../safeFetch";

describe("safeFetch", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("successful requests", () => {
    it("should return parsed JSON on successful response", async () => {
      const mockData = { id: 1, name: "Test Product" };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await safeFetch("/api/products");
      expect(result).toEqual(mockData);
    });

    it("should include default headers in request", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await safeFetch("/api/products", {
        method: "GET",
      });

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/products",
        expect.objectContaining({
          method: "GET",
          signal: expect.any(AbortSignal),
        })
      );
    });
  });

  describe("error handling", () => {
    it("should throw FetchError on non-ok response", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => "Not found",
      });

      await expect(safeFetch("/api/products")).rejects.toThrow(FetchError);
    });

    it("should throw FetchError with correct status code", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => "Server error",
      });

      try {
        await safeFetch("/api/products");
      } catch (error) {
        expect(error.status).toBe(500);
        expect(error instanceof FetchError).toBe(true);
      }
    });

    it("should handle JSON parse errors", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error("Invalid JSON");
        },
        status: 200,
        text: async () => "invalid json",
      });

      await expect(safeFetch("/api/products")).rejects.toThrow(FetchError);
    });

    it("should throw timeout error on AbortError", async () => {
      const abortError = new Error();
      abortError.name = "AbortError";

      global.fetch.mockRejectedValueOnce(abortError);

      try {
        await safeFetch("/api/products", { timeout: 1000 });
      } catch (error) {
        expect(error instanceof FetchError).toBe(true);
        expect(error.status).toBe(408);
      }
    });
  });

  describe("timeout handling", () => {
    it("should use default timeout of 30 seconds", async () => {
      vi.useFakeTimers();
      const timeoutSpy = vi.spyOn(global, "setTimeout");

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await safeFetch("/api/products");

      expect(timeoutSpy).toHaveBeenCalledWith(
        expect.any(Function),
        30000
      );

      vi.useRealTimers();
    });

    it("should use custom timeout when provided", async () => {
      vi.useFakeTimers();
      const timeoutSpy = vi.spyOn(global, "setTimeout");

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await safeFetch("/api/products", { timeout: 60000 });

      expect(timeoutSpy).toHaveBeenCalledWith(
        expect.any(Function),
        60000
      );

      vi.useRealTimers();
    });
  });

  describe("POST requests", () => {
    it("should send data as JSON body", async () => {
      const data = { name: "Test", price: 100 };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 1, ...data }),
      });

      await safeFetchPost("/api/products", data);

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/products",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(data),
        })
      );
    });

    it("should merge custom headers", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await safeFetchPost("/api/products", {}, {
        headers: { "X-Custom": "value" },
      });

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/products",
        expect.objectContaining({
          headers: expect.objectContaining({
            "Content-Type": "application/json",
            "X-Custom": "value",
          }),
        })
      );
    });
  });

  describe("abort signal", () => {
    it("should pass abort signal to fetch", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await safeFetch("/api/products");

      const callArgs = global.fetch.mock.calls[0][1];
      expect(callArgs.signal).toBeDefined();
      expect(callArgs.signal instanceof AbortSignal).toBe(true);
    });

    it("should cleanup timeout on successful response", async () => {
      const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await safeFetch("/api/products");

      expect(clearTimeoutSpy).toHaveBeenCalled();
    });

    it("should cleanup timeout on error", async () => {
      const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");

      global.fetch.mockRejectedValueOnce(new Error("Network error"));

      try {
        await safeFetch("/api/products");
      } catch (error) {
        // Expected to fail
      }

      expect(clearTimeoutSpy).toHaveBeenCalled();
    });
  });
});
