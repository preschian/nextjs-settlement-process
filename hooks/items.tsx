import { SelectDocuments } from '@/db/schema'
import { fetcher } from '@/lib/utils'
import useSWR from 'swr'

export function useItems() {
  const { data }: { data?: { items: SelectDocuments[] } } = useSWR('/api', fetcher, { refreshInterval: 1000 })

  return {
    items: data?.items || [],
  }
}
