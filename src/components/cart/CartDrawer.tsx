'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import QuantitySelector from '@/components/ui/QuantitySelector';
import Button from '@/components/ui/Button';
import { X, ShoppingCart, Trash2, Package } from 'lucide-react';

export default function CartDrawer() {
  const t = useTranslations('cart');
  const {
    items,
    subtotal,
    totalItems,
    removeItem,
    updateQuantity,
    isDrawerOpen,
    toggleDrawer,
  } = useCartStore();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  const subtotalAmount = subtotal();
  const itemCount = totalItems();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={toggleDrawer}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                <h2 className="text-lg font-bold text-gray-900">
                  {t('title')}
                </h2>
                {itemCount > 0 && (
                  <span className="bg-amber-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={toggleDrawer}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <ShoppingCart className="w-7 h-7 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">{t('empty')}</p>
                  <p className="text-sm text-gray-400 mt-1">{t('emptyDesc')}</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <li key={item.product.id} className="p-4">
                      <div className="flex gap-3">
                        {/* Image */}
                        <div className="shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                          {item.product.images[0] ? (
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="w-6 h-6 text-gray-400" />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.product.brand}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <QuantitySelector
                              value={item.quantity}
                              onChange={(qty) =>
                                updateQuantity(item.product.id, qty)
                              }
                              min={1}
                              max={99}
                              size="sm"
                            />
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-900">
                                {formatPrice(item.product.price * item.quantity)}
                              </span>
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                                aria-label={t('remove')}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('subtotal')}</span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(subtotalAmount)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <Link href="/checkout" onClick={toggleDrawer}>
                    <Button variant="primary" size="lg" className="w-full">
                      {t('checkout')}
                    </Button>
                  </Link>
                  <Link href="/cart" onClick={toggleDrawer}>
                    <Button variant="outline" size="lg" className="w-full">
                      {t('viewCart')}
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
