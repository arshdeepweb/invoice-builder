// components/ClientPDFDownload.tsx
"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "./invoice-1"; // Your custom PDF document

export default function ClientPDFDownload({
  invoiceNumber,
  issueDate,
  dueDate,
  currency, // This is the currency *symbol* now (e.g., "$")
  logo,
  items,
  subtotal,
  tax, // Tax *percentage*
  discount, // Discount *value*
  shipping,
  total,
  paymentMethod,
  fromDetails,
  toDetails,
  bankDetails,
  notes,
  terms,
}) {
  return (
    <PDFDownloadLink
      document={
        <InvoicePDF
          invoiceNumber={invoiceNumber}
          issueDate={issueDate}
          dueDate={dueDate}
          currency={currency} // Pass the symbol
          logo={logo}
          items={items}
          subtotal={subtotal}
          tax={tax}
          discount={discount} // Pass discount value
          shipping={shipping}
          total={total}
          paymentMethod={paymentMethod}
          fromDetails={fromDetails}
          toDetails={toDetails}
          bankDetails={bankDetails}
          notes={notes}
          terms={terms}
        />
      }
      fileName="invoice.pdf"
    >
      {({ loading }) => (loading ? "Loading document..." : "Download Invoice")}
    </PDFDownloadLink>
  );
}
