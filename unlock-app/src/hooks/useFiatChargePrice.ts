import { useQuery } from '@tanstack/react-query'
import { storage } from '~/config/storage'

interface Options {
  network: number
  tokenAddress?: string
  amount: number
  enabled?: boolean
  lockAddress: string
}

/**
 * It includes fees (processor, ours... etc) in fiat.
 * @param param0
 * @returns
 */
export const useFiatChargePrice = ({
  network,
  tokenAddress,
  lockAddress,
  amount,
  enabled = true,
}: Options) => {
  return useQuery(
    ['purchasePrice', network, lockAddress, tokenAddress, amount],
    async () => {
      const response = await storage.getTotalPrice(
        network,
        lockAddress,
        amount,
        tokenAddress
      )
      return response.data
    },
    {
      enabled,
    }
  )
}
