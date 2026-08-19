import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password too short"),
});

export const RegisterSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(12, "Must be 12+ characters")
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[0-9]/, "Must contain number")
    .regex(/[!@#$%^&*]/, "Must contain special char"),
  name: z.string().min(2, "Name too short").max(100, "Name too long"),
});

export const ProductSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  price: z.number().positive("Price must be positive"),
  category: z.string().min(1, "Category required"),
  image: z.string().url("Invalid image URL").optional(),
});

export const ReviewSchema = z.object({
  productId: z.string().min(1, "Product ID required"),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Review too short").max(500),
  userName: z.string().min(2).max(100),
  userEmail: z.string().email(),
});

export const CheckoutSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().positive(),
      price: z.number().positive(),
    })
  ).min(1, "At least one item required"),
  shippingAddress: z.string().min(10, "Complete address required"),
  phone: z.string().regex(/^[0-9+\-\s()]*$/, "Invalid phone number"),
  email: z.string().email(),
});

export const EmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1).max(200),
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});
