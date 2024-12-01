import BookList from "@/src/components/book-list";

export default function Home() {
  return (
    <div className="p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <BookList />
    </div>
  );
}
