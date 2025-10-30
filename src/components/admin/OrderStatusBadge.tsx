import { Badge } from "@/components/ui/badge";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";
type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const statusConfig = {
    pending: { label: "En attente", className: "bg-yellow-500/20 text-yellow-200 border-yellow-500/40 dark:text-yellow-300" },
    processing: { label: "En cours", className: "bg-blue-500/20 text-blue-200 border-blue-500/40 dark:text-blue-300" },
    shipped: { label: "Expédié", className: "bg-purple-500/20 text-purple-200 border-purple-500/40 dark:text-purple-300" },
    delivered: { label: "Livré", className: "bg-green-500/20 text-green-200 border-green-500/40 dark:text-green-300" },
    cancelled: { label: "Annulé", className: "bg-red-500/20 text-red-200 border-red-500/40 dark:text-red-300" },
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

export const PaymentStatusBadge = ({ status }: PaymentStatusBadgeProps) => {
  const statusConfig = {
    pending: { label: "En attente", className: "bg-yellow-500/20 text-yellow-200 border-yellow-500/40 dark:text-yellow-300" },
    paid: { label: "Payé", className: "bg-green-500/20 text-green-200 border-green-500/40 dark:text-green-300" },
    failed: { label: "Échoué", className: "bg-red-500/20 text-red-200 border-red-500/40 dark:text-red-300" },
    refunded: { label: "Remboursé", className: "bg-gray-500/20 text-gray-200 border-gray-500/40 dark:text-gray-300" },
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};
