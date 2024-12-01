import { format } from "date-fns";

interface DateFormatterProps {
  date: string;
}

export function DateFormatter({ date }: DateFormatterProps) {
  const formattedDate = format(new Date(date), "dd/MM/yyyy");
  return <span>{formattedDate}</span>;
}
