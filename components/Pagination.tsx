export default function Pagination({
  pages,
  setCurrentPage,
}: {
  pages: number[];
  setCurrentPage: (page: number) => void;
}) {
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="flex items-center justify-center gap-2 m-10">
      {pages.map((page) => (
        <button
          onClick={() => handlePageChange(page)}
          className="p-3 bg-[#fb6d56] text-white rounded-xl"
          key={page}
        >
          {page}
        </button>
      ))}
    </section>
  );
}
