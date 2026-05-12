import checked from "../src/assets/images/checked.gif";

export default function SuccessMessage({ message }: { message: string }) {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40">
      <div className="bg-white w-75 h-50 rounded-2xl p-6 shadow-xl flex flex-col items-center gap-3">
        <img src={checked} alt="checked" className="w-20 h-20" />
        <p className="text-black font-semibold text-center">{message}</p>
      </div>
    </div>
  );
}
