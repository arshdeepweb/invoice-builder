import { FileText } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";


export default function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-700 rounded-md flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold">InvoicePro</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Home
          </Link>
          <a
            href="#features"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Features
          </a>
          <Link
            href="/quick-invoice"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Quick Invoice
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/quick-invoice">
            <Button className="bg-blue-700 hidden sm:flex">
              Generate Invoice
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
