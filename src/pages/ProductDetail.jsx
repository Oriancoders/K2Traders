import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import { Star, CheckCircle, ArrowLeft, Shield, Truck, Phone } from 'lucide-react';

const formatPrice = (v) => {
  if (v == null) return '';
  const n = Number(v);
  return isNaN(n) ? v : `$${n.toFixed(2)}`;
};

const Rating = ({ value = 0 }) => {
  const full = Math.round(Number(value) || 0);
  return (
    <div className="flex items-center gap-1" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < full ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
      {Number.isFinite(value) && <span className="ml-1 text-sm text-gray-500">{value}</span>}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = useMemo(() => products.find((p) => String(p.id) === String(id)), [id]);

  const { addItem } = useCart();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: 1,
    address: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (product?.name) {
      const prev = document.title;
      document.title = `${product.name} — ${product.category || 'Product'}`;
      return () => {
        document.title = prev;
      };
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link to="/shop" className="inline-flex items-center text-green-700 hover:text-green-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to shop
        </Link>
        <h1 className="mt-6 text-2xl font-bold text-gray-900">Product not found</h1>
        <p className="mt-2 text-gray-600">Please return to the shop and try another item.</p>
      </div>
    );
  }

  const image =
    product.image ||
    product.imageUrl ||
    (Array.isArray(product.images) ? product.images[0] : null);

  const safeQuantity = (v) => {
    const n = Number(v);
    return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === 'quantity' ? safeQuantity(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setSubmitting(true);

    await new Promise((r) => setTimeout(r, 700));
    const payload = {
      productId: product.id,
      productName: product.name || product.title,
      unitPrice: product.price,
      ...form,
      createdAt: new Date().toISOString(),
    };

    try {
      const key = 'orders';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify([...prev, payload]));
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', quantity: 1, address: '', notes: '' });
    } catch {
      // ignore storage errors
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-gradient-to-b from-white via-green-50/40 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/shop"
          className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to shop
        </Link>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image + info */}
          <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm">
            <div className="relative h-80 sm:h-[28rem] w-full overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt={product.name || product.title || 'Product'}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-100 to-green-200 text-green-700">
                  <span className="text-sm font-medium">No image</span>
                </div>
              )}
              {product.featured && (
                <span className="absolute left-4 top-4 rounded-full bg-green-600/90 px-3 py-1 text-xs font-semibold text-white shadow">
                  Featured
                </span>
              )}
            </div>

            <div className="p-6 border-t border-gray-100">
              <h1 className="text-2xl font-bold text-gray-900">
                {product.name || product.title || 'Product'}
              </h1>
              <div className="mt-3 flex items-center justify-between">
                <Rating value={Number(product.rating) || 0} />
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-extrabold text-gray-900">{formatPrice(product.price)}</p>
                  {(product.compareAtPrice || product.oldPrice) && (
                    <p className="text-sm font-medium text-gray-400 line-through">
                      {formatPrice(product.compareAtPrice || product.oldPrice)}
                    </p>
                  )}
                </div>
              </div>
              {product.category && (
                <p className="mt-2 text-sm text-gray-500">Category: {product.category}</p>
              )}
              {product.description && (
                <p className="mt-4 text-gray-700 leading-relaxed">{product.description}</p>
              )}

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/60 px-3 py-2">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Fast delivery</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/60 px-3 py-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Secure checkout</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/60 px-3 py-2">
                  <Phone className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Support available</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => addItem(product, safeQuantity(form.quantity))}
                  className="inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-3 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          {/* Order form */}
          <div className="lg:pl-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">Order this product</h2>
              <p className="mt-1 text-sm text-gray-600">
                Fill the form and we will confirm your order shortly.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4" aria-label="Order form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500"
                      placeholder="+1 555 000 1234"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      min={1}
                      value={form.quantity}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    placeholder="Street, City, Country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    placeholder="Any extra info or request"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-green-600 px-5 py-3 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 disabled:opacity-60"
                >
                  {submitting ? 'Placing order...' : `Place order - ${formatPrice(product.price)}`}
                </button>

                <div aria-live="polite" className="min-h-[1.25rem]">
                  {submitted && (
                    <div className="mt-4 inline-flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                      <CheckCircle className="h-4 w-4" />
                      Your order request has been submitted. We’ll contact you soon!
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Contact hint */}
            <div className="mt-4 text-sm text-gray-600">
              Prefer talking? Reach us via the contact page for urgent orders.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
