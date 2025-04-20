import { Button } from '@/components/ui/button'
import { API } from '@/lib/axios'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import type { CryptoData } from './home'

interface CryptonDetailsParams {
  [key: string]: string
  id: string
}

interface CryptonDetailsData {
  data: CryptoData
}

export function CryptonDetails() {
  const [crypton, setCrypton] = useState<CryptoData>()

  const { id } = useParams<CryptonDetailsParams>()
  const navigate = useNavigate()

  useEffect(() => {
    async function getCrypton() {
      try {
        const { data } = await API.get<CryptonDetailsData>(`/${id}`)
        setCrypton(data.data)
      } catch (err) {
        console.error('Erro ao buscar criptomoedas:', err)
        navigate('/')
      }
    }

    getCrypton()
  }, [id, navigate])

  if (!crypton) {
    return (
      <div className="flex items-center justify-center flex-col gap-2 min-h-[80vh]">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-slate-300 rounded-full" />
          <div className="absolute inset-0 border-t-4 border-amber-500 rounded-full animate-spin" />
        </div>
        <h1 className="text-muted-foreground font-semibold">
          Carregando informações da criptomoeda...
        </h1>
      </div>
    )
  }

  function IntlFormatNumber(value: number, notation: 'compact' | 'standard') {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation,
    }).format(value)
  }

  return (
    <div className="relative max-w-3xl mx-auto p-6  shadow-xl rounded-2xl mt-8 border">
      <img
        src={`https://static.coincap.io/assets/icons/${crypton.symbol.toLowerCase()}@2x.png`}
        className="absolute size-10 shrink-0 top-4 right-6"
        alt="Logo da criptomoeda"
      />

      <Button variant="ghost" className="rounded" onClick={() => navigate(-1)}>
        <ArrowLeft className="size-5" />
        Voltar
      </Button>

      <h1 className="text-3xl font-bold mb-6 text-center">
        {crypton.name}{' '}
        <span className="text-slate-500">({crypton.symbol})</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl p-4 border hover:border-amber-500/50 transition">
          <p className="text-sm">Preço</p>
          <p className="text-xl font-semibold">
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(Number(crypton.priceUsd))}
          </p>
        </div>

        <div className="rounded-xl p-4 border hover:border-amber-500/50 transition">
          <p className="text-sm">Valor de mercado</p>
          <p className="text-xl font-semibold">
            {IntlFormatNumber(Number(crypton.marketCapUsd), 'compact')}
          </p>
        </div>

        <div className="rounded-xl p-4 border hover:border-amber-500/50 transition">
          <p className="text-sm">Volume (24h)</p>
          <p className="text-xl font-semibold">
            {IntlFormatNumber(Number(crypton.volumeUsd24Hr), 'compact')}
          </p>
        </div>

        <div className="rounded-xl p-4 border hover:border-amber-500/50 transition">
          <p className="text-sm">Variação (24h)</p>
          <p
            className={`text-xl font-semibold ${
              Number(crypton.changePercent24Hr) > 0
                ? 'text-emerald-500'
                : 'text-rose-500'
            }`}
          >
            {Intl.NumberFormat('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
            }).format(Number(crypton.changePercent24Hr))}
            %
          </p>
        </div>
      </div>
    </div>
  )
}
