import { describe, it, expect } from "vitest";
import { z } from "zod";
import {
  LoginSchema,
  RegisterSchema,
  ProductSchema,
  ReviewSchema,
  CheckoutSchema,
  EmailSchema,
} from "../validationSchemas";

describe("Validation Schemas", () => {
  describe("LoginSchema", () => {
    it("should accept valid email and password", () => {
      const valid = {
        email: "user@example.com",
        password: "password123",
      };
      expect(() => LoginSchema.parse(valid)).not.toThrow();
    });

    it("should reject invalid email", () => {
      const invalid = {
        email: "not-an-email",
        password: "password123",
      };
      expect(() => LoginSchema.parse(invalid)).toThrow();
    });

    it("should reject short password", () => {
      const invalid = {
        email: "user@example.com",
        password: "short",
      };
      expect(() => LoginSchema.parse(invalid)).toThrow();
    });

    it("should reject missing email", () => {
      const invalid = { password: "password123" };
      expect(() => LoginSchema.parse(invalid)).toThrow();
    });
  });

  describe("RegisterSchema", () => {
    it("should accept valid registration data", () => {
      const valid = {
        email: "user@example.com",
        password: "SecurePass123!",
        name: "John Doe",
      };
      expect(() => RegisterSchema.parse(valid)).not.toThrow();
    });

    it("should reject password without uppercase", () => {
      const invalid = {
        email: "user@example.com",
        password: "securepass123!",
        name: "John Doe",
      };
      expect(() => RegisterSchema.parse(invalid)).toThrow();
    });

    it("should reject password without number", () => {
      const invalid = {
        email: "user@example.com",
        password: "SecurePass!",
        name: "John Doe",
      };
      expect(() => RegisterSchema.parse(invalid)).toThrow();
    });

    it("should reject password without special character", () => {
      const invalid = {
        email: "user@example.com",
        password: "SecurePass123",
        name: "John Doe",
      };
      expect(() => RegisterSchema.parse(invalid)).toThrow();
    });

    it("should reject password shorter than 12 characters", () => {
      const invalid = {
        email: "user@example.com",
        password: "Pass123!",
        name: "John Doe",
      };
      expect(() => RegisterSchema.parse(invalid)).toThrow();
    });

    it("should reject short name", () => {
      const invalid = {
        email: "user@example.com",
        password: "SecurePass123!",
        name: "J",
      };
      expect(() => RegisterSchema.parse(invalid)).toThrow();
    });

    it("should reject name longer than 100 characters", () => {
      const invalid = {
        email: "user@example.com",
        password: "SecurePass123!",
        name: "a".repeat(101),
      };
      expect(() => RegisterSchema.parse(invalid)).toThrow();
    });
  });

  describe("ProductSchema", () => {
    it("should accept valid product data", () => {
      const valid = {
        name: "Espresso",
        description: "Strong Italian coffee",
        price: 3.5,
        category: "coffee",
        image: "https://example.com/espresso.jpg",
      };
      expect(() => ProductSchema.parse(valid)).not.toThrow();
    });

    it("should reject negative price", () => {
      const invalid = {
        name: "Espresso",
        price: -5,
        category: "coffee",
      };
      expect(() => ProductSchema.parse(invalid)).toThrow();
    });

    it("should reject zero price", () => {
      const invalid = {
        name: "Espresso",
        price: 0,
        category: "coffee",
      };
      expect(() => ProductSchema.parse(invalid)).toThrow();
    });

    it("should reject missing category", () => {
      const invalid = {
        name: "Espresso",
        price: 3.5,
      };
      expect(() => ProductSchema.parse(invalid)).toThrow();
    });

    it("should reject invalid image URL", () => {
      const invalid = {
        name: "Espresso",
        price: 3.5,
        category: "coffee",
        image: "not-a-url",
      };
      expect(() => ProductSchema.parse(invalid)).toThrow();
    });

    it("should allow optional image", () => {
      const valid = {
        name: "Espresso",
        price: 3.5,
        category: "coffee",
      };
      expect(() => ProductSchema.parse(valid)).not.toThrow();
    });
  });

  describe("ReviewSchema", () => {
    it("should accept valid review data", () => {
      const valid = {
        productId: "prod123",
        rating: 5,
        comment: "This is an excellent product!",
        userName: "John Doe",
        userEmail: "john@example.com",
      };
      expect(() => ReviewSchema.parse(valid)).not.toThrow();
    });

    it("should reject rating below 1", () => {
      const invalid = {
        productId: "prod123",
        rating: 0,
        comment: "This product is bad",
        userName: "John",
        userEmail: "john@example.com",
      };
      expect(() => ReviewSchema.parse(invalid)).toThrow();
    });

    it("should reject rating above 5", () => {
      const invalid = {
        productId: "prod123",
        rating: 6,
        comment: "This product is amazing",
        userName: "John",
        userEmail: "john@example.com",
      };
      expect(() => ReviewSchema.parse(invalid)).toThrow();
    });

    it("should reject short comment", () => {
      const invalid = {
        productId: "prod123",
        rating: 5,
        comment: "Good",
        userName: "John",
        userEmail: "john@example.com",
      };
      expect(() => ReviewSchema.parse(invalid)).toThrow();
    });

    it("should reject long comment", () => {
      const invalid = {
        productId: "prod123",
        rating: 5,
        comment: "a".repeat(501),
        userName: "John",
        userEmail: "john@example.com",
      };
      expect(() => ReviewSchema.parse(invalid)).toThrow();
    });
  });

  describe("CheckoutSchema", () => {
    it("should accept valid checkout data", () => {
      const valid = {
        items: [
          { productId: "prod1", quantity: 2, price: 3.5 },
          { productId: "prod2", quantity: 1, price: 5.0 },
        ],
        shippingAddress: "123 Main Street, Springfield, USA",
        phone: "+1-555-123-4567",
        email: "user@example.com",
      };
      expect(() => CheckoutSchema.parse(valid)).not.toThrow();
    });

    it("should reject empty items array", () => {
      const invalid = {
        items: [],
        shippingAddress: "123 Main Street",
        phone: "+1-555-123-4567",
        email: "user@example.com",
      };
      expect(() => CheckoutSchema.parse(invalid)).toThrow();
    });

    it("should reject negative quantity", () => {
      const invalid = {
        items: [{ productId: "prod1", quantity: -1, price: 3.5 }],
        shippingAddress: "123 Main Street",
        phone: "+1-555-123-4567",
        email: "user@example.com",
      };
      expect(() => CheckoutSchema.parse(invalid)).toThrow();
    });

    it("should reject negative price", () => {
      const invalid = {
        items: [{ productId: "prod1", quantity: 1, price: -3.5 }],
        shippingAddress: "123 Main Street",
        phone: "+1-555-123-4567",
        email: "user@example.com",
      };
      expect(() => CheckoutSchema.parse(invalid)).toThrow();
    });

    it("should reject short address", () => {
      const invalid = {
        items: [{ productId: "prod1", quantity: 1, price: 3.5 }],
        shippingAddress: "123 Main",
        phone: "+1-555-123-4567",
        email: "user@example.com",
      };
      expect(() => CheckoutSchema.parse(invalid)).toThrow();
    });

    it("should reject invalid phone number", () => {
      const invalid = {
        items: [{ productId: "prod1", quantity: 1, price: 3.5 }],
        shippingAddress: "123 Main Street, Springfield, USA",
        phone: "not-a-phone",
        email: "user@example.com",
      };
      expect(() => CheckoutSchema.parse(invalid)).toThrow();
    });

    it("should accept various phone formats", () => {
      const valid = {
        items: [{ productId: "prod1", quantity: 1, price: 3.5 }],
        shippingAddress: "123 Main Street, Springfield, USA",
        phone: "(555) 123-4567",
        email: "user@example.com",
      };
      expect(() => CheckoutSchema.parse(valid)).not.toThrow();
    });
  });

  describe("EmailSchema", () => {
    it("should accept valid email data", () => {
      const valid = {
        to: "admin@rakape.com",
        subject: "Customer Inquiry",
        name: "John Doe",
        email: "john@example.com",
        message: "I have a question about your products",
      };
      expect(() => EmailSchema.parse(valid)).not.toThrow();
    });

    it("should reject invalid recipient email", () => {
      const invalid = {
        to: "not-an-email",
        subject: "Subject",
        name: "John",
        email: "john@example.com",
        message: "This is a message that is long enough",
      };
      expect(() => EmailSchema.parse(invalid)).toThrow();
    });

    it("should reject invalid sender email", () => {
      const invalid = {
        to: "admin@rakape.com",
        subject: "Subject",
        name: "John",
        email: "not-an-email",
        message: "This is a message that is long enough",
      };
      expect(() => EmailSchema.parse(invalid)).toThrow();
    });

    it("should reject short message", () => {
      const invalid = {
        to: "admin@rakape.com",
        subject: "Subject",
        name: "John",
        email: "john@example.com",
        message: "short",
      };
      expect(() => EmailSchema.parse(invalid)).toThrow();
    });

    it("should reject long message", () => {
      const invalid = {
        to: "admin@rakape.com",
        subject: "Subject",
        name: "John",
        email: "john@example.com",
        message: "a".repeat(1001),
      };
      expect(() => EmailSchema.parse(invalid)).toThrow();
    });

    it("should reject long subject", () => {
      const invalid = {
        to: "admin@rakape.com",
        subject: "a".repeat(201),
        name: "John",
        email: "john@example.com",
        message: "This is a valid message",
      };
      expect(() => EmailSchema.parse(invalid)).toThrow();
    });
  });
});
