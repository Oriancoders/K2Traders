import React, { useState } from 'react';
import { X, Trash2, CheckCircle, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const formatPrice = (v) => `$${(Number(v) || 0).toFixed(2)}`;

const CartDrawer = ({ open, onClose }) => {
  const { items, removeItem, updateItem, subtotal, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
    clearCart();
  };

  return (
    <div className={`fixed inset-0 z-[100] ${open ? '' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-green-100/60 via-white/80 to-emerald-100/60 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <aside
        className={`
          fixed right-0 top-0 h-screen w-full sm:w-[420px] max-w-full bg-white/80 backdrop-blur-2xl shadow-2xl rounded-l-3xl
          transition-transform duration-500
          ${open ? 'translate-x-0' : 'translate-x-full'}
          flex flex-col
        `}
        style={{ boxShadow: '0 8px 32px 0 rgba(34,197,94,0.18)' }}
        aria-modal="true"
        role="dialog"
        tabIndex={-1}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 bg-white/70 rounded-tl-3xl">
          <div className="flex items-center gap-2">
            {showCheckout ? (
              <button
                onClick={() => {
                  setShowCheckout(false);
                  setSubmitted(false);
                }}
                className="rounded-full p-2 hover:bg-green-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                aria-label="Back to cart"
              >
                <ArrowLeft className="h-5 w-5 text-green-600" />
              </button>
            ) : (
              <ShoppingCart className="h-6 w-6 text-green-600" />
            )}
            <h3 className="text-lg font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
              {showCheckout ? 'Checkout' : 'Your Cart'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-rose-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
            aria-label="Close cart"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5">
          {!showCheckout ? (
            items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <svg width="72" height="72" fill="none" className="mb-3">
                  <circle cx="36" cy="36" r="32" stroke="#bbf7d0" strokeWidth="6" />
                  <path d="M24 36h24M24 44h12" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <p className="text-xl font-semibold">Your cart is empty.</p>
              </div>
            ) : (
              <ul className="space-y-5">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-4 rounded-2xl border border-gray-100 bg-white/95 p-4 shadow-lg hover:shadow-2xl transition-all group"
                  >
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center border border-green-100 shadow">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <ShoppingCart className="h-8 w-8 text-green-400" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-bold text-gray-900">{item.name}</p>
                      <p className="mt-0.5 text-sm text-gray-500">{formatPrice(item.price)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, e.target.value)}
                          className="w-20 rounded-lg border border-gray-300 px-2 py-1 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 transition"
                          aria-label="Quantity"
                        />
                        <button
                          onClick={() => removeItem(item.id)}
                          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 shadow-sm transition group-hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                          title="Remove"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right flex flex-col justify-between">
                      <p className="text-base font-bold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )
          ) : (
            <div className="flex items-center justify-center min-h-full">
              <div className="w-full max-w-md mx-auto">
                {!submitted ? (
                  <form
                    className="space-y-5 bg-white/95 rounded-2xl shadow-2xl p-6 border border-gray-100 animate-fade-in"
                    onSubmit={handleCheckout}
                  >
                    <h4 className="text-2xl font-extrabold text-gray-900 mb-2 text-center tracking-tight">
                      Shipping Details
                    </h4>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Full Name"
                      value={form.name}
                      onChange={handleFormChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 transition"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email"
                      value={form.email}
                      onChange={handleFormChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 transition"
                    />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Phone"
                      value={form.phone}
                      onChange={handleFormChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 transition"
                    />
                    <textarea
                      name="address"
                      required
                      placeholder="Address"
                      value={form.address}
                      onChange={handleFormChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 transition"
                    />
                    <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 p-3 text-sm text-gray-700 border border-gray-100">
                      <div className="mb-2 font-semibold">Order Summary</div>
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                      <div className="mt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 px-5 py-3 font-extrabold text-white shadow-lg shadow-green-600/20 transition hover:from-green-600 hover:to-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 disabled:opacity-60 active:scale-95"
                    >
                      {submitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Placing order...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-5 w-5" />
                          Place Order
                        </span>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-12 animate-fade-in" aria-live="polite">
                    <CheckCircle className="h-16 w-16 text-green-600 mb-4 animate-bounce" />
                    <div className="text-3xl font-extrabold text-green-700 mb-2">Order Placed!</div>
                    <div className="text-gray-600 text-center mb-4 text-lg">
                      Thank you for your order.<br />We’ll contact you soon.
                    </div>
                    <button
                      onClick={() => {
                        setShowCheckout(false);
                        setSubmitted(false);
                      }}
                      className="rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 px-6 py-3 font-bold text-white shadow hover:from-green-600 hover:to-emerald-600 transition active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                    >
                      Back to Shop
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {!showCheckout && (
          <div className="border-t border-gray-100 px-6 py-5 bg-white/80 rounded-bl-3xl">
            <div className="flex items-center justify-between">
              <span className="text-base text-gray-600 font-semibold">Subtotal</span>
              <span className="text-xl font-extrabold text-gray-900">{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={clearCart}
                disabled={items.length === 0}
                className="w-1/2 rounded-xl border border-gray-200 px-4 py-2 font-bold text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                Clear
              </button>
              <button
                onClick={() => setShowCheckout(true)}
                disabled={items.length === 0}
                className="w-1/2 rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 px-4 py-2 font-bold text-white shadow hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 transition active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </aside>
      {/* Fade-in animation */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px);}
          to { opacity: 1; transform: none;}
        }
      `}</style>
    </div>
  );
};

export default CartDrawer;