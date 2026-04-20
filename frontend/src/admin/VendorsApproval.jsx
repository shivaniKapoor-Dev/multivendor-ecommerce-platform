import { CheckCircle, XCircle, Lock, Unlock } from "lucide-react";
import { useState, useEffect } from "react";
import { VendorApprove, Vendors } from "../api/callApi";

export default function VendorsApproval() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await Vendors();
        setVendors(res.data?.vendor || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const updateApprove = async (id, status) => {
    try {
      await VendorApprove(id, { status });

      setVendors((prev) =>
        prev.map((v) =>
          v._id === id ? { ...v, status } : v
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Vendor Approvals
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Review and manage vendor registrations
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading vendors...
        </div>
      ) : (
        <>
          {/* ================= DESKTOP ================= */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="p-4 text-left">Store</th>
                    <th className="p-4 text-left">Owner</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Address</th>
                    <th className="p-4 text-left">PAN</th>
                    <th className="p-4 text-left">GST</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {vendors.length === 0 && (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center py-10 text-gray-400"
                      >
                        No vendors found
                      </td>
                    </tr>
                  )}

                  {vendors.map((v) => (
                    <tr
                      key={v._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-4 font-semibold text-gray-800">
                        {v.storeName}
                      </td>
                      <td className="p-4">{v.userId?.name}</td>
                      <td className="p-4 text-gray-600">
                        {v.userId?.email}
                      </td>
                      <td className="p-4 text-gray-600">
                        {v.address?.city}, {v.address?.state},{" "}
                        {v.address?.country}
                      </td>
                      <td className="p-4">{v.panNumber}</td>
                      <td className="p-4">{v.gstNumber}</td>
                      <td className="p-4">
                        <StatusBadge status={v.status} />
                      </td>

                      <td className="p-4 text-right space-x-2">
                        {/* Pending */}
                        {v.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                updateApprove(v._id, "approved")
                              }
                              className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition"
                            >
                              <CheckCircle
                                className="text-green-700"
                                size={20}
                              />
                            </button>

                            <button
                              onClick={() =>
                                updateApprove(v._id, "rejected")
                              }
                              className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
                            >
                              <XCircle
                                className="text-red-700"
                                size={20}
                              />
                            </button>
                          </>
                        )}

                        {/* Approved */}
                        {v.status === "approved" && (
                          <button
                            onClick={() =>
                              updateApprove(v._id, "blocked")
                            }
                            className="p-2 text-yellow-600 font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                          >
                           Block
                          </button>
                        )}

                        {/* Blocked */}
                        {v.status === "blocked" && (
                          <button
                            onClick={() =>
                              updateApprove(v._id, "approved")
                            }
                            className="p-2 font-semibold text-yellow-600 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                          >
                            Unblock
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ================= MOBILE ================= */}
          <div className="lg:hidden space-y-5">
            {vendors.map((v) => (
              <div
                key={v._id}
                className="bg-white rounded-2xl shadow-md border p-5 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">
                    {v.storeName}
                  </h3>
                  <StatusBadge status={v.status} />
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Owner:</strong> {v.userId?.name}</p>
                  <p><strong>Email:</strong> {v.userId?.email}</p>
                  <p><strong>PAN:</strong> {v.panNumber}</p>
                  <p><strong>GST:</strong> {v.gstNumber}</p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {v.address?.city}, {v.address?.state},{" "}
                    {v.address?.country}
                  </p>
                </div>

                <div className="flex gap-3 pt-3">
                  {v.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          updateApprove(v._id, "approved")
                        }
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl text-sm font-medium transition"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateApprove(v._id, "rejected")
                        }
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl text-sm font-medium transition"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {v.status === "approved" && (
                    <button
                      onClick={() =>
                        updateApprove(v._id, "blocked")
                      }
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-xl text-sm font-medium transition"
                    >
                      Block
                    </button>
                  )}

                  {v.status === "blocked" && (
                    <button
                      onClick={() =>
                        updateApprove(v._id, "approved")
                      }
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-medium transition"
                    >
                      Unblock
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ===== STATUS BADGE ===== */
function StatusBadge({ status }) {
  const styles =
    status === "approved"
      ? "bg-green-100 text-green-700"
      : status === "rejected"
      ? "bg-red-100 text-red-700"
      : status === "blocked"
      ? "bg-gray-200 text-gray-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles}`}>
      {status || "pending"}
    </span>
  );
}