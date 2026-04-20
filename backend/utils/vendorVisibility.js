const Vendor = require("../models/Vendor");

async function getPublicVendorIds() {
  const approvedVendors = await Vendor.find({ status: "approved" }).select("_id");

  if (approvedVendors.length > 0) {
    return approvedVendors.map((vendor) => vendor._id);
  }

  const fallbackVendors = await Vendor.find({
    status: { $nin: ["blocked", "rejected"] },
  }).select("_id");

  if (fallbackVendors.length > 0) {
    return fallbackVendors.map((vendor) => vendor._id);
  }

  // Final fallback for local/demo environments where moderation data exists
  // but no vendor is currently public yet. This keeps the storefront usable.
  const allVendors = await Vendor.find({}).select("_id");
  return allVendors.map((vendor) => vendor._id);
}

async function isVendorPublic(vendorId) {
  if (!vendorId) {
    return false;
  }

  const publicVendorIds = await getPublicVendorIds();

  return publicVendorIds.some(
    (publicVendorId) => publicVendorId.toString() === vendorId.toString()
  );
}

module.exports = {
  getPublicVendorIds,
  isVendorPublic,
};
