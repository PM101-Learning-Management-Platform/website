export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 shadow-xl flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-red-600 bg-[#f3f3f3]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <p className="text-black font-semibold text-center">{message}</p>
      </div>
    </div>
  );
}
