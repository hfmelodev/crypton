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
import { Link as Link2, Search } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'

export function Home() {
  return (
    <>
      <Helmet title="Home" />

      <div className="flex items-center gap-2 max-w-5xl mx-auto">
        <Input
          className="rounded focus-visible:ring-1 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50 placeholder:text-sm"
          placeholder="Digite o nome da criptomoeda"
        />
        <Button className="rounded">
          <Search />
        </Button>
      </div>

      <div className="max-w-5xl mx-auto mt-8 border rounded overflow-hidden overflow-x-auto">
        <Table>
          <TableHeader className="border-b bg-muted/40 whitespace-nowrap">
            <TableHead>Moeda</TableHead>
            <TableHead>Valor de mercado</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Variação 24h</TableHead>
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
                <TableCell>1.000.000</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
