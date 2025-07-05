import { z } from "zod";

const donorTypes = ["public", "restaurant", "store", "company"] as const;
const foodCategories = ["raw", "cooked", "packaged"] as const;
const quantityUnits = ["kg", "L", "packs"] as const;
const dropLocations = ["center1", "center2", "center3"] as const;
export const donationStatus = [
  "pending",
  "approved",
  "picked_up",
  "delivered",
  "cancelled",
] as const;

export const donationSchema = z
  .object({
    donorName: z.string().min(2, "Donor name is required"),
    donorType: z.enum(donorTypes, {
      required_error: "Select a donor type",
    }),
    contactNumber: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
    email: z.string().email("Enter a valid email").optional(),

    itemType: z.string().min(2, "Enter item name"),
    foodCategory: z.enum(foodCategories, {
      required_error: "Select a food category",
    }),
    quantity: z
      .number({
        required_error: "Enter quantity",
        invalid_type_error: "Quantity must be a number",
      })
      .min(1, "Quantity must be greater than 0"),
    quantityUnit: z.enum(quantityUnits, {
      required_error: "Select a unit (kg/L/packs)",
    }),

    status: z.enum(donationStatus).optional(),

    pickupRequired: z.boolean(),
    isPerishable: z.boolean(),

    address: z.string().optional(),
    dropLocation: z.enum(dropLocations).optional(),

    pickupTime: z.string().optional(),
    notes: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Pickup selected -> address required
    if (data.pickupRequired && !data.address) {
      ctx.addIssue({
        path: ["address"],
        code: z.ZodIssueCode.custom,
        message: "Address is required when pickup is selected",
      });
    }

    // Perishable and no pickup -> drop location required
    if (data.isPerishable && !data.pickupRequired && !data.dropLocation) {
      ctx.addIssue({
        path: ["dropLocation"],
        code: z.ZodIssueCode.custom,
        message:
          "Drop location is required for perishable items when pickup is not selected",
      });
    }
  });

export type DonationFormType = z.infer<typeof donationSchema>;
