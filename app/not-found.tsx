import Link from 'next/link';
import PageContainer from '@/components/page-container';

export default function NotFound() {
  return (
    <PageContainer variant="wood">
      <div className="container text-center card-rbx max-w-lg mx-auto">
        <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
        <p className="mb-6">
          A página que você procura não existe ou foi movida.
        </p>
        <Link
          href="/"
          className="text-sky-600 underline hover:text-sky-800"
        >
          Voltar para a Home
        </Link>
      </div>
    </PageContainer>
  );
}
