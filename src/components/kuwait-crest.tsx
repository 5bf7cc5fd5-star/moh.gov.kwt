export function KuwaitCrest({ className }: { className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-full bg-[#09283C] ring-1 ring-white/25 ${className ?? "size-16"}`}
    >
      <img
        src="/moh/crest.png"
        alt=""
        width={80}
        height={80}
        className="h-[82%] w-[82%] object-contain"
        decoding="async"
      />
    </span>
  );
}
