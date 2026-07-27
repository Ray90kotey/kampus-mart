import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { createOrder } from "../services/orders";

export function useCartActions() {
	const navigate = useNavigate();

	const clearCart = useCartStore((s) => s.clearCart);

	const checkout = useCallback(
		async (opts: { deliveryOption?: string; deliveryAddress?: string; paymentMethod?: string }) => {
			const items = useCartStore.getState().items;
			if (!items || items.length === 0) {
				throw new Error("Cart is empty");
			}
			const total = items.reduce((sum, it) => sum + it.product.price * it.quantity, 0);
			const order = await createOrder({
				items,
				total,
				deliveryOption: opts.deliveryOption,
				deliveryAddress: opts.deliveryAddress,
				paymentMethod: opts.paymentMethod || "Cash on delivery",
			});
			clearCart();
			// Simple UX: navigate to dashboard or orders page
			navigate("/dashboard");
			return order;
		},
		[clearCart, navigate]
	);

	return { checkout };
}

export default useCartActions;
