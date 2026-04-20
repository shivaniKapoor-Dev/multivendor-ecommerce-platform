const Cart = require("../models/Cart");
const { getPublicVendorIds } = require("./vendorVisibility");

async function buildOrderFromCart(userId) {
  const cartItems = await Cart.find({ userId }).populate("productId");
  const publicVendorIds = await getPublicVendorIds();
  const publicVendorIdSet = new Set(
    publicVendorIds.map((vendorId) => vendorId.toString())
  );

  if (!cartItems.length) {
    return { cartItems, items: [] };
  }

  const items = cartItems
    .filter((item) => {
      const product = item.productId;

      return (
        product &&
        !product.isBlocked &&
        product.inStock !== false &&
        publicVendorIdSet.has(product.vendor?.toString())
      );
    })
    .map((item) => {
      const price = Number(item.productId.price) || 0;
      const quantity = Number(item.quantity) || 1;

      return {
        productId: item.productId._id,
        vendorId: item.productId.vendor,
        quantity,
        lineTotal: price * quantity,
      };
    });

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const shipping = items.length ? (subtotal > 1000 ? 0 : 99) : 0;
  const tax = Math.round(subtotal * 0.05);
  const totalAmount = subtotal + shipping + tax;

  return {
    cartItems,
    items,
    subtotal,
    shipping,
    tax,
    totalAmount,
  };
}

module.exports = {
  buildOrderFromCart,
};
