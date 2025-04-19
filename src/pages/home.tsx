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
import { ChevronDown, Link as Link2, Search } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'

export function Home() {
  const [nameCrypton, setNameCrypton] = useState('')

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

      <div className="max-w-5xl mx-auto mt-8 border rounded overflow-x-auto">
        <Table>
          <TableHeader className="border-b bg-muted/40 whitespace-nowrap">
            <TableRow>
              <TableHead>Moeda</TableHead>
              <TableHead>Valor de mercado</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead>Variação 24h</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <TableRow key={index}>
                <TableCell>
                  <Link
                    to="/crypton-details/:id"
                    className="flex items-center gap-1.5"
                  >
                    Ethereum
                    <Link2 className="size-3 text-muted-foreground" />
                  </Link>
                </TableCell>
                <TableCell>USD</TableCell>
                <TableCell>1.000.000</TableCell>
                <TableCell>1.000.000</TableCell>
                <TableCell className="text-green-500">1.000.000</TableCell>
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
    </>
  )
}
