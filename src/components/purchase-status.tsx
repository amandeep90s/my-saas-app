import { usePurchaseStatus } from '@/hooks/use-purchase-status';

export function PurchaseStatus() {
  const { data: purchase, isLoading, error } = usePurchaseStatus();

  if (isLoading) {
    return <p>Loading purchase status...</p>;
  }

  if (error) {
    return <p>Failed to load purchase status.</p>;
  }

  if (!purchase || 'error' in purchase) {
    return (
      <div className="rounded-lg border p-6">
        <h2 className="text-lg font-semibold">No Active Purchase</h2>
        <p className="mt-2 text-gray-600">
          You have not purchased any plan yet. Please visit the pricing page to
          choose a plan that suits your needs.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-lg font-semibold">
        {purchase.tier.charAt(0).toUpperCase() + purchase.tier.slice(1)} Plan
      </h2>

      <p className="mt-2 text-gray-600">Status: {purchase.status}</p>

      <p className="text-sm text-gray-500">
        {new Date(purchase.purchasedAt).toLocaleDateString()}
      </p>
    </div>
  );
}
