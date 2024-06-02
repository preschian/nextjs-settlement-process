import { create } from 'zustand'

export type EditItem = {
  id: number
  product: string
  price: number
  updatedAt: string | null
}

type EditState = EditItem & {
  editProduct: ({ id, product, price, updatedAt }: EditItem) => void
  reset: () => void
}

export const useEditStore = create<EditState>((set) => ({
  id: 0,
  product: '',
  price: 0,
  updatedAt: '',
  editProduct: ({ id, product, price, updatedAt }) => set({ id, product, price, updatedAt }),
  reset: () => set({ id: 0, product: '', price: 0, updatedAt: '' }),
}))
