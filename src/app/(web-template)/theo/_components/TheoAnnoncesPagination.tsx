import Link from 'next/link';

interface Props {
  page: number;
  totalPages: number;
}

export default function TheoAnnoncesPagination({ page, totalPages }: Props) {
  if (totalPages <= 1) return null;

  const prev = page > 1 ? page - 1 : 1;
  const next = page < totalPages ? page + 1 : totalPages;

  return (
    <div className="flex justify-center items-center gap-4 mt-10">
      <Link
        href={`?page=${prev}`}
        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${page === 1 ? 'bg-gray-200 text-gray-400 pointer-events-none' : 'bg-white hover:bg-gray-100 text-gray-700'}`}
        aria-disabled={page === 1}
      >
        Précédent
      </Link>
      <span className="text-gray-600 text-sm">
        Page {page} / {totalPages}
      </span>
      <Link
        href={`?page=${next}`}
        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${page === totalPages ? 'bg-gray-200 text-gray-400 pointer-events-none' : 'bg-white hover:bg-gray-100 text-gray-700'}`}
        aria-disabled={page === totalPages}
      >
        Suivant
      </Link>
    </div>
  );
}
