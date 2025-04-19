import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'
import { Header } from './components/app/header'
import { Button } from './components/ui/button'

export function NotFound() {
  return (
    <>
      <Helmet title="404" />

      <div className="min-h-screen container mx-auto flex flex-col gap-4">
        <Header />

        <div className="flex-1 mt-32 px-8 sm:px-4 max-w-5xl mx-auto">
          <div className="text-center bg-muted-foreground/5 p-10 rounded-xl">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="mt-4 text-xl">Página não encontrada</p>
            <p className="mt-2">
              A página que você está procurando não existe ou foi movida.
            </p>

            <Button asChild className="mt-8 rounded">
              <Link to="/" className="px-6 py-2 font-bold shadow transition">
                Voltar para o início
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
