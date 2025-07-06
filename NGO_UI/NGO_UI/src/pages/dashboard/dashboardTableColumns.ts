import { Button } from "@/components/ui/button";
import type { DonationFormType } from "@/form/donateForm";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash } from "lucide-react";
import { createElement } from "react";

export const donationColumns = (
  onView: (data: DonationFormType) => void,
  onEdit: (data: DonationFormType) => void,
  onDelete: (data: DonationFormType) => void,
  role: string
) => {
  const baseColumns: ColumnDef<DonationFormType>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "donorName", header: "Donor Name" },
    { accessorKey: "donorType", header: "Donor Type" },
    { accessorKey: "itemType", header: "Item" },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => {
        const { quantity, quantityUnit } = row.original;
        return `${quantity} ${quantityUnit}`;
      },
    },
    { accessorKey: "foodCategory", header: "Food Category" },
    {
      accessorKey: "isPerishable",
      header: "Perishable",
      cell: ({ row }) => (row.original.isPerishable ? "Yes" : "No"),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status || "pending";
        const colorMap: Record<string, string> = {
          pending: "text-yellow-600",
          approved: "text-blue-600",
          picked_up: "text-purple-600",
          delivered: "text-green-600",
          cancelled: "text-red-600",
        };
        return createElement(
          "span",
          { className: colorMap[status] || "" },
          status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")
        );
      },
    },
    {
      accessorKey: "pickupRequired",
      header: "Pickup Required",
      cell: ({ row }) => (row.original.pickupRequired ? "Yes" : "No"),
    },
    {
      accessorKey: "DonateTime",
      header: "Pickup Time",
      cell: ({ row }) =>
        row.original.DonateTime
          ? new Date(row.original.DonateTime).toLocaleString()
          : "—",
    },
    {
      accessorKey: "drop_location",
      header: "Drop Location",
      cell: ({ row }) => row.original.drop_location || "—",
    },
  ];

  if (role === "ngo_admin") {
    baseColumns.push({
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
              onClick: () => onView(data),
            },
            createElement(Eye, { className: "h-4 w-4" })
          ),
          createElement(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => onEdit(data),
            },
            createElement(Pencil, { className: "h-4 w-4" })
          ),
          createElement(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "text-destructive",
              onClick: () => onDelete(data),
            },
            createElement(Trash, { className: "h-4 w-4" })
          )
        );
      },
    });
  }

  return baseColumns;
};
