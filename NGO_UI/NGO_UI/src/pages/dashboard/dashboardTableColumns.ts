import type { ColumnDef } from "@tanstack/react-table";
import type { DonationFormType } from "@/form/donateForm";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash } from "lucide-react";
import { createElement } from "react";

export const donationColumns = (
  onView: (data: DonationFormType) => void,
  onEdit: (data: DonationFormType) => void
): ColumnDef<DonationFormType>[] =>  [
  {
    accessorKey: "donorName",
    header: "Donor Name",
  },
  {
    accessorKey: "donorType",
    header: "Donor Type",
  },
  {
    accessorKey: "itemType",
    header: "Item",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const { quantity, quantityUnit } = row.original;
      return `${quantity} ${quantityUnit}`;
    },
  },
  {
    accessorKey: "foodCategory",
    header: "Food Category",
  },
  {
    accessorKey: "isPerishable",
    header: "Perishable",
    cell: ({ row }) => (row.original.isPerishable ? "Yes" : "No"),
  },
  {
    accessorKey: "pickupRequired",
    header: "Pickup Required",
    cell: ({ row }) => (row.original.pickupRequired ? "Yes" : "No"),
  },
  {
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => {
    const status = row.original.status || "pending";
    const colorMap: Record<string, string> = {
      pending: "text-yellow-500",
      approved: "text-blue-500",
      picked_up: "text-orange-500",
      delivered: "text-green-600",
      cancelled: "text-red-500",
    };
    return createElement(
      "span",
      { className: `font-medium ${colorMap[status]}` },
      status
    );
  },
},

  {
    accessorKey: "pickupTime",
    header: "Pickup Time",
    cell: ({ row }) =>
      row.original.pickupTime
        ? new Date(row.original.pickupTime).toLocaleString()
        : "—",
  },
  {
    accessorKey: "dropLocation",
    header: "Drop Location",
    cell: ({ row }) => row.original.dropLocation || "—",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;
      return createElement(
        "div",
        { className: "flex gap-2" },
        createElement(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: () => onView(data)
          },
          createElement(Eye, { className: "h-4 w-4" })
        ),
        createElement(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: () => onEdit(data)
          },
          createElement(Pencil, { className: "h-4 w-4" })
        ),
        createElement(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "text-destructive",
            onClick: () => console.log("Delete", data)
          },
          createElement(Trash, { className: "h-4 w-4" })
        )
      );
    },
  },
];
