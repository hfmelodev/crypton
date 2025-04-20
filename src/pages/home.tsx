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
import { ChevronDown, Link as LinkIcon, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router'

export interface CryptoData {
  id: string
  symbol: string
  name: string
  marketCapUsd: string
  volumeUsd24Hr: string
  priceUsd: string
  changePercent24Hr: string
}

interface CryptoApiResponse {
  data: CryptoData[]
}

export function Home() {
  const [nameCrypton, setNameCrypton] = useState('')
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [page, setPage] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCryptoData(0)
  }, [])

  async function fetchCryptoData(offset: number) {
    try {
      const { data } = await API.get<CryptoApiResponse>('/', {
        params: {
          limit: 10,
          offset,
        },
      })

      const response = data

      // Adiciona os novos dados ao array de criptomoedas
      setCryptoData(prev => [...prev, ...response.data])
    } catch (err) {
      console.error('Erro ao buscar criptomoedas:', err)
    }
  }

  function handleSearchCrypto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (nameCrypton === '') return

    navigate(`/crypton-details/${nameCrypton}`)
  }

  function handleGetMoreCryptons(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    // Seta o offset para pegar os próximos 10
    const newOffset = page + 10
    // Seta o novo offset no state e chama a função
    setPage(newOffset)
    // Chama a função para pegar os próximos 10
    fetchCryptoData(newOffset)
  }

  function IntlFormatNumber(value: number, notation: 'compact' | 'standard') {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation,
    }).format(value)
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
        <Button
          type="submit"
          className="rounded bg-amber-700 hover:bg-amber-600 transition-colors text-white"
        >
          <Search />
        </Button>
      </form>

      <div className="max-w-5xl mx-auto mt-8">
        {/* TABELA PARA DESKTOP */}
        <div className="hidden md:block">
          <div className="rounded border">
            <Table className="min-w-full whitespace-nowrap">
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="min-w-48">Moeda</TableHead>
                  <TableHead>Valor de mercado</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Variação 24h</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {cryptoData && cryptoData.length > 0 ? (
                  cryptoData.map(crypto => (
                    <TableRow key={crypto.id}>
                      <TableCell className="font-medium">
                        <Link
                          to={`/crypton-details/${crypto.id}`}
                          className="flex items-center gap-2 truncate max-w-[200px]"
                        >
                          <img
                            src={`https://static.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`}
                            className="size-5 shrink-0"
                            alt="Logo da criptomoeda"
                          />
                          <span className="truncate">{crypto.name}</span>
                          <LinkIcon className="size-3 shrink-0" />
                        </Link>
                      </TableCell>

                      <TableCell>
                        {IntlFormatNumber(
                          Number(crypto.marketCapUsd),
                          'compact'
                        )}
                      </TableCell>

                      <TableCell>
                        {Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(Number(crypto.priceUsd))}
                      </TableCell>

                      <TableCell>
                        {IntlFormatNumber(
                          Number(crypto.volumeUsd24Hr),
                          'compact'
                        )}
                      </TableCell>

                      <TableCell
                        className={`${
                          Number(crypto.changePercent24Hr) > 0
                            ? 'text-emerald-500'
                            : 'text-rose-500'
                        }`}
                      >
                        {Intl.NumberFormat('en-US', {
                          style: 'decimal',
                          minimumFractionDigits: 2,
                        }).format(Number(crypto.changePercent24Hr))}
                        %
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-sm text-muted-foreground/50"
                    >
                      Nenhuma criptomoeda encontrada
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* CARDS PARA MOBILE */}
        <div className="block md:hidden space-y-4">
          {cryptoData && cryptoData.length > 0 ? (
            cryptoData.map(crypto => (
              <div key={crypto.id} className="border rounded p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={`https://static.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`}
                    className="size-6"
                    alt="Logo da criptomoeda"
                  />
                  <Link
                    to={`/crypton-details/${crypto.id}`}
                    className="font-semibold flex items-center gap-1 text-primary"
                  >
                    {crypto.name}
                    <LinkIcon className="size-3" />
                  </Link>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>
                    <strong>Valor de mercado: </strong>{' '}
                    {IntlFormatNumber(Number(crypto.marketCapUsd), 'compact')}
                  </div>
                  <div>
                    <strong>Preço: </strong>{' '}
                    {Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(Number(crypto.priceUsd))}
                  </div>
                  <div>
                    <strong>Volume: </strong>{' '}
                    {IntlFormatNumber(Number(crypto.volumeUsd24Hr), 'compact')}
                  </div>
                  <div>
                    <strong>Variação 24h: </strong>{' '}
                    <span
                      className={`${
                        Number(crypto.changePercent24Hr) > 0
                          ? 'text-emerald-500'
                          : 'text-rose-500'
                      }`}
                    >
                      {Intl.NumberFormat('en-US', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                      }).format(Number(crypto.changePercent24Hr))}
                      %
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center rounded border text-sm text-muted-foreground/50 py-8">
              Nenhuma criptomoeda encontrada
            </div>
          )}
        </div>

        {/* BOTÃO DE CARREGAR MAIS */}
        <div className="flex justify-center md:justify-start">
          <Button
            type="button"
            variant="outline"
            onClick={handleGetMoreCryptons}
            className="my-6 flex items-center gap-2 px-4 py-2 rounded font-semibold"
          >
            <span>Carregar mais</span>
            <ChevronDown className="size-4 mt-1" />
          </Button>
        </div>
      </div>
    </>
  )
}
