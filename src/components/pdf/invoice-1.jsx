"use client"

// components/pdf/invoice-1.tsx (or wherever your file is)
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font, // Import Font
} from '@react-pdf/renderer';
import { format } from 'date-fns'; // For formatting dates if needed

// --- Define Colors (Matching Tailwind Teal-600 and grays) ---
const colors = {
  primary: '#366de2', // teal-600
  textPrimary: '#1F2937', // gray-800
  textHeader: "#FFFFFF",
  textSecondary: '#4B5563', // gray-600
  border: '#366de2', // gray-200
  tableHeaderBg: '#366de2', // gray-100
  tableEvenRowBg: '#FFFFFF', // white
  tableOddRowBg: '#F9FAFB', // gray-50
  white: '#FFFFFF',
};

// --- Register Fonts (Optional but recommended for consistency) ---
// Download font files (e.g., Inter from Google Fonts) and place them in your public folder
// Font.register({
//   family: 'Inter',
//   fonts: [
//     { src: '/fonts/Inter-Regular.ttf' }, // Adjust path as needed
//     { src: '/fonts/Inter-SemiBold.ttf', fontWeight: 'semibold' },
//     { src: '/fonts/Inter-Bold.ttf', fontWeight: 'bold' },
//   ],
// });

// --- Define Styles ---
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica', // Use 'Inter' if registered, otherwise fallback
    fontSize: 9, // Slightly smaller base font size for more content
    lineHeight: 1.4,
    color: colors.textPrimary,
    backgroundColor: colors.white,
  },
  // --- Header ---
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Align items to the top
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logo: {
    width: 70, // Adjusted size
    height: 70,
    objectFit: 'contain',
  },
  invoiceTitleContainer: {
    alignItems: 'flex-end', // Align text to the right
  },
  invoiceTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary, // Teal color
    marginBottom: 8,
  },
  invoiceInfo: {
    fontSize: 9,
    marginTop:3,
    color: colors.textSecondary,
  },
  // --- Addresses ---
  addressesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  addressBlock: {
    width: '48%', // Use slightly less than 50% for spacing
  },
  addressTitle: {
    fontSize: 10,
    fontWeight: 'bold', // Use 'semibold' if font registered
    color: colors.textPrimary,
    marginBottom: 6,
  },
  addressText: {
    fontSize: 9,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  // --- Items Table ---
  table: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 3, // Slight rounding
    overflow: 'hidden', // Clip content to rounded borders
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.tableHeaderBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    padding: 8, // More padding
  },
  tableHeaderCol: {
    fontSize: 8.5,
    fontWeight: 'bold', // Use 'semibold' if font registered
    color: colors.textHeader,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    padding: 8, // More padding
  },
  tableRowEven: {
    backgroundColor: colors.tableEvenRowBg,
  },
  tableRowOdd: {
    backgroundColor: colors.tableOddRowBg,
  },
  tableColDesc: {
    width: '45%', // Adjust widths as needed
    paddingRight: 5,
  },
  tableColQty: {
    width: '10%',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  tableColRate: {
    width: '15%',
    textAlign: 'right',
    paddingHorizontal: 5,
  },
  tableColDiscount: {
    width: '15%',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  tableColAmount: {
    width: '15%',
    textAlign: 'right',
    paddingLeft: 5,
    fontWeight: 'bold', // Use 'semibold' if font registered
  },
  // --- Totals Section ---
  totalsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align totals to the right
    marginTop: 10, // Reduced margin before totals
    marginBottom: 20,
  },
  totalsBox: {
    width: '45%', // Adjust width as needed
    // backgroundColor: colors.tableOddRowBg, // Optional background
    // padding: 10,
    // borderRadius: 3,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: 9,
    color: colors.textSecondary,
  },
  totalValue: {
    fontSize: 9,
    color: colors.textPrimary,
    textAlign: 'right',
  },
  totalSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginVertical: 5,
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingTop: 5,
    // backgroundColor: colors.primary, // Use Teal background for emphasis
    // padding: 8,
    // borderRadius: 3,
  },
  grandTotalLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    // color: colors.white, // White text on Teal background
     color: colors.primary, // Or keep it Teal text
  },
  grandTotalValue: {
    fontSize: 11,
    fontWeight: 'bold',
    // color: colors.white, // White text on Teal background
    color: colors.primary, // Or keep it Teal text
    textAlign: 'right',
  },
  // --- Notes, Terms, Payment ---
  bottomSection: {
    marginTop: 10, // Reduced margin
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold', // Use 'semibold' if font registered
    color: colors.primary, // Teal title
    marginBottom: 6,
  },
  notesText: {
    fontSize: 9,
    color: colors.textSecondary,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  termsText: {
    fontSize: 9,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  paymentDetailsContainer: {
    marginTop: 5,
  },
  paymentText: {
    fontSize: 9,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  // --- Footer ---
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: '#999999', // Lighter gray
  },
  pageNumber: {
    position: 'absolute',
    bottom: 25,
    right: 40,
    fontSize: 8,
    color: '#999999',
  },
});

// --- Helper Function ---
const formatDate = (dateString) => {
  try {
    // Add time component to avoid timezone issues if dateString is just 'YYYY-MM-DD'
    return format(new Date(dateString + 'T00:00:00'), 'MMM dd, yyyy');
  } catch (e) {
    return dateString; // Fallback to original string if formatting fails
  }
};

// --- Component ---
const InvoicePDF = ({
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
}) => {
  // Calculate tax amount based on percentage
  // Apply tax after discount
  const taxAmount = tax > 0 ? (subtotal - discount) * (tax / 100) : 0;

  return (
    <Document title={`Invoice ${invoiceNumber}`}>
      <Page size="A4" style={styles.page}>
        {/* --- Header --- */}
        <View style={styles.headerContainer}>
          {/* Logo */}
          {logo && <Image src={logo} style={styles.logo} cache={false} />}
          {/* Invoice Title & Info */}
          <View style={styles.invoiceTitleContainer}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceInfo}>Invoice #: {invoiceNumber}</Text>
            <Text style={styles.invoiceInfo}>
              Issue Date: {formatDate(issueDate)}
            </Text>
            <Text style={styles.invoiceInfo}>
              Due Date: {formatDate(dueDate)}
            </Text>
          </View>
        </View>

        {/* --- Addresses --- */}
        <View style={styles.addressesContainer}>
          {/* From Address */}
          <View style={styles.addressBlock}>
            <Text style={styles.addressTitle}>From:</Text>
            <Text style={styles.addressText}>{fromDetails.name}</Text>
            {/* Split address string into lines */}
            {fromDetails.address
              .split('\n')
              .map((line, i) => (
                <Text key={i} style={styles.addressText}>
                  {line}
                </Text>
              ))}
            {fromDetails.phone && (
              <Text style={styles.addressText}>Phone: {fromDetails.phone}</Text>
            )}
            {fromDetails.email && (
              <Text style={styles.addressText}>Email: {fromDetails.email}</Text>
            )}
            {fromDetails.taxId && (
              <Text style={styles.addressText}>Tax ID: {fromDetails.taxId}</Text>
            )}
          </View>
          {/* To Address */}
          <View style={styles.addressBlock}>
            <Text style={styles.addressTitle}>Bill To:</Text>
            <Text style={styles.addressText}>{toDetails.name}</Text>
            {toDetails.address
              .split('\n')
              .map((line, i) => (
                <Text key={i} style={styles.addressText}>
                  {line}
                </Text>
              ))}
            {toDetails.phone && (
              <Text style={styles.addressText}>Phone: {toDetails.phone}</Text>
            )}
            {toDetails.email && (
              <Text style={styles.addressText}>Email: {toDetails.email}</Text>
            )}
            {toDetails.taxId && (
              <Text style={styles.addressText}>Tax ID: {toDetails.taxId}</Text>
            )}
          </View>
        </View>

        {/* --- Items Table --- */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCol, styles.tableColDesc]}>
              Description
            </Text>
            <Text style={[styles.tableHeaderCol, styles.tableColQty]}>
              Qty
            </Text>
            <Text style={[styles.tableHeaderCol, styles.tableColRate]}>
              Rate
            </Text>
            <Text style={[styles.tableHeaderCol, styles.tableColDiscount]}>
              Item Disc. (%)
            </Text>
            <Text style={[styles.tableHeaderCol, styles.tableColAmount]}>
              Amount
            </Text>
          </View>
          {/* Table Rows */}
          {items.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.tableRow,
                idx % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
              ]}
              wrap={false} // Prevent row breaking across pages if possible
            >
              <Text style={styles.tableColDesc}>{item.description}</Text>
              <Text style={styles.tableColQty}>{item.qty}</Text>
              <Text style={styles.tableColRate}>
                {currency}
                {item.rate.toFixed(2)}
              </Text>
              <Text style={styles.tableColDiscount}>
                {item.discount > 0 ? `${item.discount.toFixed(1)}%` : '-'}
              </Text>
              {/* Use item.amount which already includes item discount */}
              <Text style={styles.tableColAmount}>
                {currency}
                {item.amount.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* --- Totals --- */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalsBox}>
            {/* Subtotal */}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal:</Text>
              <Text style={styles.totalValue}>
                {currency} {subtotal.toFixed(2)}
              </Text>
            </View>
            {/* Discount (Overall) */}
            {discount > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Discount:</Text>
                <Text style={[styles.totalValue, { color: '#DC2626' }]}> {/* Red color for discount */}
                  - {currency} {discount.toFixed(2)}
                </Text>
              </View>
            )}
             {/* Tax */}
             {tax > 0 && (
               <View style={styles.totalRow}>
                 <Text style={styles.totalLabel}>Tax ({tax}%):</Text>
                 {/* Display calculated tax amount */}
                 <Text style={styles.totalValue}>
                   {currency} {taxAmount.toFixed(2)}
                 </Text>
               </View>
             )}
            {/* Shipping */}
            {shipping > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Shipping:</Text>
                <Text style={styles.totalValue}>
                  {currency} {shipping.toFixed(2)}
                </Text>
              </View>
            )}
            {/* Separator */}
            {(discount > 0 || tax > 0 || shipping > 0) && (
               <View style={styles.totalSeparator} />
            )}
            {/* Grand Total */}
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Total Due:</Text>
              <Text style={styles.grandTotalValue}>
                {currency} {total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* --- Notes, Terms, Payment Details --- */}
        <View style={styles.bottomSection}>
          {/* Notes */}
          {notes && (
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.sectionTitle}>Notes</Text>
              <Text style={styles.notesText}>{notes}</Text>
            </View>
          )}
          {/* Terms */}
          {terms && (
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.sectionTitle}>Terms & Conditions</Text>
              <Text style={styles.termsText}>{terms}</Text>
            </View>
          )}
          {/* Payment Details */}
          <View>
            <Text style={styles.sectionTitle}>Payment Details</Text>
            <Text style={styles.paymentText}>
              Preferred Method: {paymentMethod.replace('-', ' ')}
            </Text>
            {paymentMethod === 'bank-transfer' && (
              <View style={styles.paymentDetailsContainer}>
                {bankDetails.bankName && <Text style={styles.paymentText}>Bank: {bankDetails.bankName}</Text>}
                {bankDetails.accountName && <Text style={styles.paymentText}>Account Name: {bankDetails.accountName}</Text>}
                {bankDetails.accountNumber && <Text style={styles.paymentText}>Account Number: {bankDetails.accountNumber}</Text>}
                {bankDetails.swiftCode && <Text style={styles.paymentText}>SWIFT/BIC: {bankDetails.swiftCode}</Text>}
                {bankDetails.iban && <Text style={styles.paymentText}>IBAN: {bankDetails.iban}</Text>}
              </View>
            )}
            {/* Add details for other payment methods if applicable (e.g., PayPal email, UPI ID) */}
          </View>
        </View>

        {/* --- Footer --- */}
        <Text
            style={styles.footer}
            fixed // Keep footer at the bottom even with page breaks
        >
            Thank you for your business!
        </Text>
        <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
            fixed
        />
      </Page>
    </Document>
  );
};

export default InvoicePDF;

