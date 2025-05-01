'use client';

import { useState, useRef, useEffect } from "react"; // Added useEffect
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import InvoicePDF from "../../components/pdf/invoice-1"; // Make sure this path is correct
import dynamic from 'next/dynamic';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { UploadCloud, Plus, Trash2, FileText, Download } from 'lucide-react'; // Example using lucide-react for icons

// Helper function to extract currency symbol
const getCurrencySymbol = (currencyString) => {
  const match = currencyString.match(/\((.*?)\)/);
  return match ? match[1] : '$'; // Default to '$' if no symbol found
};

export default function InvoiceCreator() {
  const [invoiceNumber, setInvoiceNumber] = useState("INV-0001");
  const [issueDate, setIssueDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [dueDate, setDueDate] = useState(
    format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd")
  );
  const [currency, setCurrency] = useState("USD ($)");
  const [currencySymbol, setCurrencySymbol] = useState("$"); // State for the symbol
  const [logo, setLogo] = useState(null);
  const [items, setItems] = useState([
    { description: "", qty: 1, rate: 0, discount: 0, amount: 0 },
  ]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0); // Keep tax as percentage value
  const [discountValue, setDiscountValue] = useState(0); // Keep discount as absolute value
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("bank-transfer");
  const [fromDetails, setFromDetails] = useState({
    name: "Your Awesome Company",
    address: "123 Business St, Suite 100\nCityville, ST 54321",
    phone: "+1 (555) 123-4567",
    email: "billing@awesome.com",
    taxId: "ABN 12 345 678 901",
  });
  const [toDetails, setToDetails] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    taxId: "",
  });
  const [bankDetails, setBankDetails] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    swiftCode: "",
    iban: "",
  });
  const [notes, setNotes] = useState("Thank you for your business!");
  const [terms, setTerms] = useState("Payment is due within 30 days.");
  const fileInputRef = useRef(null);

  // --- Effects ---

  // Update currency symbol when currency changes
  useEffect(() => {
    setCurrencySymbol(getCurrencySymbol(currency));
  }, [currency]);

  // Recalculate totals whenever relevant states change
  useEffect(() => {
    calculateTotals(items, discountValue, tax, shipping);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, discountValue, tax, shipping]); // Add dependencies


  // --- Handlers ---

  const handleLogoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Optional: Add file size check
      if (file.size > 1 * 1024 * 1024) { // 1MB limit
         alert("Logo size exceeds 1MB limit.");
         return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogo(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleItemChange = (
    index,
    field, // Use keyof for better type safety
    value
  ) => {
    const newItems = [...items];
    const currentItem = { ...newItems[index] };

    // Ensure numeric fields are numbers
    if (field === 'qty' || field === 'rate' || field === 'discount') {
        currentItem[field] = Number(value) || 0; // Default to 0 if NaN
    } else {
        currentItem[field] = value; // Description is string
    }

    // Calculate amount for the changed item
    const qty = currentItem.qty;
    const rate = currentItem.rate;
    const itemDiscountPercent = currentItem.discount; // Discount specific to this item
    currentItem.amount = qty * rate * (1 - itemDiscountPercent / 100);

    newItems[index] = currentItem;
    setItems(newItems);
    // No need to call calculateTotals here, the useEffect handles it
  };


  const calculateTotals = (
     currentItems = items,
     currentDiscountValue = discountValue,
     currentTaxPercent = tax,
     currentShipping = shipping
   ) => {
    const calculatedSubtotal = currentItems.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    setSubtotal(calculatedSubtotal);

    const taxAmount = (calculatedSubtotal - currentDiscountValue) * (currentTaxPercent / 100);
    const calculatedTotal = calculatedSubtotal - currentDiscountValue + taxAmount + currentShipping;

    setTotal(calculatedTotal < 0 ? 0 : calculatedTotal); // Ensure total is not negative
  };

  const addItem = () => {
    setItems([
      ...items,
      { description: "", qty: 1, rate: 0, discount: 0, amount: 0 },
    ]);
    // useEffect will recalculate totals
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    // useEffect will recalculate totals
  };

  // Format currency utility
   const formatCurrency = (amount) => {
       return `${currencySymbol}${amount.toFixed(2)}`;
   };


  // Placeholder for actual invoice creation/saving logic
  const handleCreateInvoice = () => {
    console.log("Invoice Data:", {
      invoiceNumber, issueDate, dueDate, currency, fromDetails, toDetails,
      items, subtotal, tax, discountValue, shipping, total, paymentMethod,
      bankDetails, notes, terms, logo
    });
    alert("Invoice data logged to console. Implement PDF generation or API call.");
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans">
      {/* Header */}
      {/* <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            ✨ Invoice Generator ✨
          </h1>
          <div className="flex items-center space-x-3">
             <Link href="/dashboard/invoices" className="text-sm text-gray-600 hover:text-blue-600 flex items-center">
               <FileText className="w-4 h-4 mr-1" />
               Recent Invoices
             </Link>
             {/* We'll use the PDFDownloadLink later 
          </div>
        </div>
      </header> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Left Column - Invoice Form */}
          <div className="w-full lg:w-2/3 px-4 mb-8 lg:mb-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-8">

              {/* Invoice Details Section */}
              <section>
                <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">
                  Invoice Details
                </h2>
                <div className="flex flex-wrap -mx-3">
                  {/* Logo Upload */}
                  <div className="w-full md:w-1/3 px-3 mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Company Logo</label>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-36 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 transition duration-150 ease-in-out"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {logo ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={logo}
                            alt="Logo Preview"
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                      ) : (
                        <>
                          <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">
                            <span className="font-semibold text-blue-600">Click to upload</span>
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            PNG, JPG (Max 1MB)
                          </p>
                        </>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        hidden
                        accept="image/png, image/jpeg"
                        onChange={handleLogoUpload}
                      />
                    </div>
                    {logo && (
                       <button
                         onClick={() => setLogo(null)}
                         className="mt-2 w-full text-xs text-red-600 hover:text-red-800 transition"
                       >
                         Remove Logo
                       </button>
                    )}
                  </div>

                  {/* Invoice Number, Dates, Currency */}
                  <div className="w-full md:w-2/3 px-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
                      <div>
                        <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-600 mb-1">
                          Invoice Number
                        </label>
                        <input
                          id="invoiceNumber"
                          type="text"
                          value={invoiceNumber}
                          onChange={(e) => setInvoiceNumber(e.target.value)}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="e.g., INV-0001"
                        />
                      </div>
                      <div>
                        <label htmlFor="paymentTerms" className="block text-sm font-medium text-gray-600 mb-1">
                          Payment Terms
                        </label>
                        <select
                          id="paymentTerms"
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                           // Note: Payment terms logic (like auto-updating due date) is not fully implemented here
                           >
                          <option value="net30">Net 30 Days</option>
                          <option value="net15">Net 15 Days</option>
                          <option value="net7">Net 7 Days</option>
                          <option value="dueOnReceipt">Due on Receipt</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="issueDate" className="block text-sm font-medium text-gray-600 mb-1">
                          Issue Date
                        </label>
                        <input
                          id="issueDate"
                          type="date"
                          value={issueDate}
                          onChange={(e) => setIssueDate(e.target.value)}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-600 mb-1">
                          Due Date
                        </label>
                        <input
                          id="dueDate"
                          type="date"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      </div>
                      <div className="sm:col-span-2">
                         <label htmlFor="currency" className="block text-sm font-medium text-gray-600 mb-1">
                           Currency
                         </label>
                         <select
                           id="currency"
                           value={currency}
                           onChange={(e) => setCurrency(e.target.value)} // useEffect will update the symbol
                           className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                         >
                           <option value="USD ($)">USD ($) - US Dollar</option>
                           <option value="EUR (€)">EUR (€) - Euro</option>
                           <option value="GBP (£)">GBP (£) - British Pound</option>
                           <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                           <option value="CAD (C$)">CAD (C$) - Canadian Dollar</option>
                           <option value="AUD (A$)">AUD (A$) - Australian Dollar</option>
                           {/* Add more currencies as needed */}
                         </select>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* From & To Section */}
              <section>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {/* From Details */}
                   <div>
                     <h3 className="text-lg font-semibold text-gray-700 mb-3">Invoice From</h3>
                     <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50/50">
                       <input type="text" placeholder="Your Business Name" value={fromDetails.name} onChange={(e) => setFromDetails({ ...fromDetails, name: e.target.value })} className="w-full bg-transparent border-0 border-b border-gray-300 pb-1 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400" />
                       <textarea placeholder="Address" value={fromDetails.address} onChange={(e) => setFromDetails({ ...fromDetails, address: e.target.value })} className="w-full bg-transparent border-0 border-b border-gray-300 pb-1 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400 h-16 resize-none" />
                       <input type="text" placeholder="Phone" value={fromDetails.phone} onChange={(e) => setFromDetails({ ...fromDetails, phone: e.target.value })} className="w-full bg-transparent border-0 border-b border-gray-300 pb-1 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400" />
                       <input type="email" placeholder="Email" value={fromDetails.email} onChange={(e) => setFromDetails({ ...fromDetails, email: e.target.value })} className="w-full bg-transparent border-0 border-b border-gray-300 pb-1 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400" />
                       <input type="text" placeholder="TAX ID / VAT Number" value={fromDetails.taxId} onChange={(e) => setFromDetails({ ...fromDetails, taxId: e.target.value })} className="w-full bg-transparent border-0 text-sm focus:outline-none placeholder-gray-400" />
                     </div>
                   </div>
                   {/* To Details */}
                   <div>
                     <h3 className="text-lg font-semibold text-gray-700 mb-3">Bill To</h3>
                     <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50/50">
                       <input type="text" placeholder="Client/Company Name" value={toDetails.name} onChange={(e) => setToDetails({ ...toDetails, name: e.target.value })} className="w-full bg-transparent border-0 border-b border-gray-300 pb-1 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400" />
                       <textarea placeholder="Client Address" value={toDetails.address} onChange={(e) => setToDetails({ ...toDetails, address: e.target.value })} className="w-full bg-transparent border-0 border-b border-gray-300 pb-1 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400 h-16 resize-none" />
                       <input type="text" placeholder="Client Phone" value={toDetails.phone} onChange={(e) => setToDetails({ ...toDetails, phone: e.target.value })} className="w-full bg-transparent border-0 border-b border-gray-300 pb-1 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400" />
                       <input type="email" placeholder="Client Email" value={toDetails.email} onChange={(e) => setToDetails({ ...toDetails, email: e.target.value })} className="w-full bg-transparent border-0 border-b border-gray-300 pb-1 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400" />
                       <input type="text" placeholder="Client TAX ID / VAT Number" value={toDetails.taxId} onChange={(e) => setToDetails({ ...toDetails, taxId: e.target.value })} className="w-full bg-transparent border-0 text-sm focus:outline-none placeholder-gray-400" />
                     </div>
                   </div>
                 </div>
              </section>

              {/* Items Section */}
              <section>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Items</h2>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">Item Description</th>
                        <th className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[80px]">Qty</th>
                        <th className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">Rate</th>
                        <th className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">Discount (%)</th>
                        <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px]">Amount</th>
                        <th className="py-2 px-1 w-10"></th> {/* Action column */}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {items.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition duration-150">
                          <td className="py-2 px-3">
                            <input
                              type="text"
                              placeholder="Describe item or service"
                              value={item.description}
                              onChange={(e) => handleItemChange(index, "description", e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </td>
                          <td className="py-2 px-3">
                            <input
                              type="number"
                              min="0" // Allow 0 for potential free items? Or min="1"
                              step="any" // Allow decimals if needed
                              value={item.qty}
                              onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-center text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </td>
                          <td className="py-2 px-3">
                            <input
                              type="number"
                              min="0"
                              step="0.01" // For currency
                              value={item.rate}
                              onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-center text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </td>
                           <td className="py-2 px-3">
                             <input
                               type="number"
                               min="0"
                               max="100"
                               value={item.discount}
                               onChange={(e) => handleItemChange(index, "discount", e.target.value)}
                               className="w-full px-2 py-1 border border-gray-300 rounded text-center text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              />
                           </td>
                          <td className="py-2 px-3 text-right text-sm text-gray-700 font-medium">
                            {formatCurrency(item.amount)} {/* Use dynamic symbol */}
                          </td>
                          <td className="py-2 px-1 text-center">
                            {items.length > 1 && (
                              <button
                                onClick={() => removeItem(index)}
                                title="Remove item"
                                className="text-gray-400 hover:text-red-500 transition duration-150 p-1 rounded-full hover:bg-red-100"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={addItem}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </button>
              </section>

              {/* Totals & Payment Options */}
              <section>
                 <div className="flex flex-wrap md:flex-nowrap gap-8">
                    {/* Payment Method */}
                   <div className="w-full md:w-1/2 lg:w-2/5">
                     <h3 className="text-lg font-semibold text-gray-700 mb-4">Payment Method</h3>
                     <div className="space-y-3">
                       {(['bank-transfer', 'paypal', 'upi', 'payment-link', 'cash']).map((method) => (
                          <label key={method} className="flex items-center p-3 border rounded-lg hover:border-blue-300 cursor-pointer transition duration-150 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-400">
                           <input
                             type="radio"
                             name="paymentMethod"
                             value={method}
                             checked={paymentMethod === method}
                             onChange={() => setPaymentMethod(method)}
                             className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                           />
                           <span className="ml-3 text-sm font-medium text-gray-700 capitalize">
                             {method.replace('-', ' ')}
                           </span>
                         </label>
                       ))}
                     </div>
                   </div>

                   {/* Totals Calculation */}
                   <div className="w-full md:w-1/2 lg:w-3/5 bg-gray-50 rounded-lg p-6">
                     <div className="space-y-3">
                       {/* Subtotal */}
                       <div className="flex justify-between items-center">
                         <span className="text-sm text-gray-600">Subtotal:</span>
                         <span className="text-sm font-medium text-gray-800">{formatCurrency(subtotal)}</span>
                       </div>

                       {/* Discount */}
                       <div className="flex justify-between items-center">
                         <div className="flex items-center">
                           <span className="text-sm text-gray-600 mr-2">Discount:</span>
                           <div className="relative">
                              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">{currencySymbol}</span>
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                value={discountValue}
                                onChange={(e) => setDiscountValue(Math.max(0, Number(e.target.value)))} // Prevent negative
                                className="w-24 pl-6 pr-2 py-1 border border-gray-300 rounded text-right text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                         </div>
                         <span className="text-sm font-medium text-red-600">-{formatCurrency(discountValue)}</span>
                       </div>

                       {/* Tax */}
                       <div className="flex justify-between items-center">
                          <div className="flex items-center">
                           <span className="text-sm text-gray-600 mr-2">Tax:</span>
                             <input
                               type="number"
                               min="0"
                               max="100"
                               placeholder="0"
                               value={tax}
                               onChange={(e) => setTax(Math.max(0, Number(e.target.value)))} // Prevent negative
                               className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                             />
                           <span className="ml-1 text-gray-500 text-sm">%</span>
                         </div>
                         <span className="text-sm font-medium text-gray-800">
                            {formatCurrency((subtotal - discountValue) * (tax / 100))}
                         </span>
                       </div>

                       {/* Shipping */}
                       <div className="flex justify-between items-center">
                         <div className="flex items-center">
                           <span className="text-sm text-gray-600 mr-2">Shipping:</span>
                           <div className="relative">
                               <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">{currencySymbol}</span>
                               <input
                                 type="number"
                                 min="0"
                                 step="0.01"
                                 placeholder="0.00"
                                 value={shipping}
                                 onChange={(e) => setShipping(Math.max(0, Number(e.target.value)))} // Prevent negative
                                 className="w-24 pl-6 pr-2 py-1 border border-gray-300 rounded text-right text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                               />
                           </div>
                         </div>
                         <span className="text-sm font-medium text-gray-800">{formatCurrency(shipping)}</span>
                       </div>
                     </div>

                     {/* Total */}
                     <div className="mt-5 pt-4 border-t border-gray-300">
                       <div className="flex justify-between items-center">
                         <span className="text-base font-semibold text-gray-800">Total:</span>
                         <span className="text-xl font-bold text-blue-600">{formatCurrency(total)}</span>
                       </div>
                     </div>
                   </div>
                 </div>
              </section>

              {/* Bank Details (Conditional) */}
              {paymentMethod === "bank-transfer" && (
                <section>
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Bank Details</h2>
                  <div className="border border-gray-200 rounded-lg p-5 bg-gray-50/50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                      <input type="text" placeholder="Account Holder Name" value={bankDetails.accountName} onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })} className="w-full bg-transparent border-0 border-b border-gray-300 pb-1 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400" />
                      <input type="text" placeholder="Account Number" value={bankDetails.accountNumber} onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })} className="w-full bg-transparent border-0 border-b border-gray-300 pb-1 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400" />
                      <input type="text" placeholder="Bank Name" value={bankDetails.bankName} onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })} className="w-full bg-transparent border-0 border-b border-gray-300 pb-1 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400" />
                      <input type="text" placeholder="SWIFT Code / BIC" value={bankDetails.swiftCode} onChange={(e) => setBankDetails({ ...bankDetails, swiftCode: e.target.value })} className="w-full bg-transparent border-0 border-b border-gray-300 pb-1 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400" />
                      <input type="text" placeholder="IBAN (Optional)" value={bankDetails.iban} onChange={(e) => setBankDetails({ ...bankDetails, iban: e.target.value })} className="w-full bg-transparent border-0 border-b border-gray-300 pb-1 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400 sm:col-span-2" />
                    </div>
                  </div>
                </section>
              )}

              {/* Notes & Terms */}
              <section>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                       <h3 className="text-lg font-semibold text-gray-700 mb-2">Notes</h3>
                       <textarea
                         placeholder="Add any notes for the client (e.g., project details, thank you message)"
                         value={notes}
                         onChange={(e) => setNotes(e.target.value)}
                         className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm min-h-[100px] resize-y"
                       />
                    </div>
                    <div>
                       <h3 className="text-lg font-semibold text-gray-700 mb-2">Terms & Conditions</h3>
                       <textarea
                         placeholder="Outline payment terms, late fees, or other conditions"
                         value={terms}
                         onChange={(e) => setTerms(e.target.value)}
                         className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm min-h-[100px] resize-y"
                       />
                    </div>
                 </div>
              </section>

              {/* Action Buttons */}
              <section className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end items-center space-y-3 sm:space-y-0 sm:space-x-4">
                 <button
                   type="button" // Prevent form submission if wrapped in form
                   onClick={() => { /* Add cancel logic - e.g., redirect or clear form */ alert('Cancel action'); }}
                   className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150"
                 >
                   Cancel
                 </button>

                 {/* Use PDFDownloadLink for direct download */}
                 <PDFDownloadLink
                    document={
                      <InvoicePDF // Pass all necessary props to your PDF component
                        invoiceNumber={invoiceNumber} issueDate={issueDate} dueDate={dueDate}
                        currency={currencySymbol} // Pass the symbol
                        logo={logo} items={items} subtotal={subtotal} tax={tax}
                        discount={discountValue} // Pass discount value
                        shipping={shipping} total={total} paymentMethod={paymentMethod}
                        fromDetails={fromDetails} toDetails={toDetails}
                        bankDetails={bankDetails} notes={notes} terms={terms}
                      />
                    }
                    fileName={`${invoiceNumber || 'invoice'}.pdf`} // Add fallback filename
                    className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                 >
                   {({ loading }) =>
                     loading ? "Generating PDF..." : (
                       <>
                         <Download className="w-4 h-4 mr-2" />
                         Download Invoice
                       </>
                     )
                   }
                 </PDFDownloadLink>
                  {/* Optional: Add a "Save Draft" button if needed */}
              </section>
            </div>
          </div>

          {/* Right Column - Preview Placeholder / Info */}
          <div className="w-full lg:w-1/3 px-4">
             {/* Can be used for a live preview later, or tips/info */}
            <div className="sticky top-24"> {/* Make it sticky */}
               <div className="bg-white rounded-xl shadow-lg p-6">
                 <div className="flex items-center mb-4 text-blue-700">
                   <FileText className="w-5 h-5 mr-3" />
                   <h2 className="text-lg font-semibold">Invoice Summary</h2>
                 </div>
                 <div className="space-y-3 text-sm text-gray-600">
                    <p><strong>Invoice #:</strong> {invoiceNumber || 'N/A'}</p>
                    <p><strong>Client:</strong> {toDetails.name || <span className="italic text-gray-400">Not specified</span>}</p>
                    <p><strong>Due Date:</strong> {dueDate ? format(new Date(dueDate + 'T00:00:00'), 'PP') : 'N/A'} </p> {/* Format date nicely */}
                    <p className="text-lg font-bold text-blue-600 mt-4 pt-3 border-t">
                       Total: {formatCurrency(total)}
                    </p>
                 </div>
                  <p className="text-xs text-gray-400 mt-5 italic">
                     Ensure all details are correct before downloading. The PDF will reflect the current form data.
                  </p>
               </div>

               {/* Maybe add a tips section */}
               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6 text-blue-800">
                  <h4 className="font-semibold mb-2 text-sm">💡 Quick Tips</h4>
                  <ul className="list-disc list-inside text-xs space-y-1">
                     <li>Upload a high-resolution logo for best results.</li>
                     <li>Clearly describe each line item.</li>
                     <li>Double-check client details and payment terms.</li>
                     <li>Use the 'Notes' section for special instructions.</li>
                  </ul>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}