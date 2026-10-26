import Search from '@/components/Search/Search';

export default function App() {
  return (
    <main className="container py-4 py-md-5">
      <header className="mb-4">
        <h1 className="h3 mb-1">Поиск запчастей</h1>
        <p className="text-secondary mb-0">По артикулу и бренду</p>
      </header>
      <Search />
    </main>
  );
}
