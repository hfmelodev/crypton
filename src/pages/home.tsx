import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { API } from '@/lib/axios'
import { ChevronDown, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

interface CryptoData {
  id: string
  rank: string
  symbol: string
  name: string
  supply: string
  maxSupply: string
  marketCapUsd: string
  volumeUsd24Hr: string
  priceUsd: string
  changePercent24Hr: string
  vwap24Hr: string
  explorer: string
}

interface CryptoApiResponse {
  data: CryptoData[]
}

export function Home() {
  const [nameCrypton, setNameCrypton] = useState('')
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])

  useEffect(() => {
    fetchCryptoData()
  }, [])

  async function fetchCryptoData() {
    try {
      const { data } = await API.get<CryptoApiResponse>('/', {
        params: {
          limit: 10,
          offset: 0,
        },
      })

      const response = data

      setCryptoData(response.data)
    } catch (err) {
      console.error('Error fetching crypto data:', err)
    }
  }

  function handleSearchCrypto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log(nameCrypton)
  }

  function handleGetMoreCryptons(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    console.log('get more cryptons')
  }

  return (
    <>
      <Helmet title="Home" />

      <form
        className="flex items-center gap-2 max-w-5xl mx-auto"
        onSubmit={handleSearchCrypto}
      >
        <Input
          className="rounded focus-visible:ring-1 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50 placeholder:text-sm"
          placeholder="Digite o nome da criptomoeda"
          value={nameCrypton}
          onChange={e => setNameCrypton(e.target.value)}
        />
        <Button type="submit" className="rounded">
          <Search />
        </Button>
      </form>

      <div className="max-w-5xl mx-auto mt-8 overflow-x-auto">
        <div className="border rounded">
          <Table>
            <TableHeader className="border-b bg-muted/40 whitespace-nowrap">
              <TableRow>
                <TableHead>Moeda</TableHead>
                <TableHead>Valor de mercado</TableHead>
                <TableHead className="text-center">Preço</TableHead>
                <TableHead className="text-center">Volume</TableHead>
                <TableHead className="text-center">Variação 24h</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {cryptoData.map(crypto => (
                <TableRow key={crypto.id}>
                  <TableCell className="font-medium">{crypto.name}</TableCell>
                  <TableCell>${crypto.marketCapUsd}</TableCell>
                  <TableCell className="text-right">
                    {Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(Number(crypto.priceUsd))}
                  </TableCell>
                  <TableCell className="text-right">
                    {Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(Number(crypto.volumeUsd24Hr))}
                  </TableCell>
                  <TableCell
                    className={`text-right ${Number(crypto.changePercent24Hr) > 0 ? 'text-emerald-500' : 'text-rose-500'}`}
                  >
                    {Intl.NumberFormat('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                    }).format(Number(crypto.changePercent24Hr))}
                    %
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGetMoreCryptons}
          className="mt-4 rounded font-semibold"
        >
          <span className="mb-1">Carregar mais</span> <ChevronDown />
        </Button>
      </div>
    </>
  )
}
