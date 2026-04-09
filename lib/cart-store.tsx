'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { ReactNode } from 'react'

export interface CartItem {
  id: string // unique: photoId-productId-sizeId
  photoId: string
  photoTitle: string
  imageUrl: string
  productId: string
  productLabel: string
  sizeId: string
  sizeLabel: string
  quantity: number
  price: number // cents per unit
  prodigiSku: string
}

interface CartContextValue {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  total: number
  count: number
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'raz-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items])

  const addItem = useCallback((item: Omit<CartItem, 'id' | 'quantity'>) => {
    const id = `${item.photoId}-${item.productId}-${item.sizeId}`
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id)
      if (existing) {
        return prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, id, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) return
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity: qty } : i))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
