"use client";

import React from "react";
import { redirect } from "next/navigation";
// import { Button } from "@/components/ui/button"

import Link from "next/link";
import {
  FileText,
  CheckCircle,
  Clock,
  CreditCard,
  Download,
  BarChart,
  ArrowRight,
} from "lucide-react";
import { Button } from "../components/ui/button";
import Image from "next/image";

export default function HomePage() {
  // const { user, isLoading } = useAuth();

  // Redirect to dashboard if logged in
  // if (user && !isLoading) {
  //   redirect('/dashboard');
  // }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100">
        <div className="container px-10 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 lg:mx-10 xl:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl text-blue-700 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Professional Invoice Generator
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Create, manage, and send professional invoices in seconds.
                  Streamline your billing process and get paid faster.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/quick-invoice">
                  <Button size="lg" className="bg-blue-700 w-full sm:w-auto">
                    Create Free Account
                  </Button>
                </Link>
                <a href="#features">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl border bg-white shadow-lg md:aspect-[16/9]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  {/* <div className="w-4/5 aspect-[4/3] bg-white rounded-lg shadow-lg flex flex-col p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-32 h-8 bg-gray-200 rounded"></div>
                      <div className="w-20 h-8 bg-blue-500 rounded"></div>
                    </div>
                    <div className="flex justify-between mb-4">
                      <div className="space-y-1">
                        <div className="w-24 h-3 bg-gray-200 rounded"></div>
                        <div className="w-32 h-4 bg-gray-300 rounded"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="w-24 h-3 bg-gray-200 rounded"></div>
                        <div className="w-32 h-4 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                    <div className="flex-grow space-y-2">
                      <div className="w-full h-6 bg-gray-100 rounded flex items-center px-2">
                        <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
                        <div className="ml-auto w-16 h-3 bg-gray-300 rounded"></div>
                      </div>
                      <div className="w-full h-6 bg-gray-100 rounded flex items-center px-2">
                        <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
                        <div className="ml-auto w-16 h-3 bg-gray-300 rounded"></div>
                      </div>
                      <div className="w-full h-6 bg-gray-100 rounded flex items-center px-2">
                        <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
                        <div className="ml-auto w-16 h-3 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-1">
                      <div className="flex justify-end">
                        <div className="w-24 h-3 bg-gray-200 rounded"></div>
                        <div className="w-20 h-3 bg-gray-300 rounded ml-4"></div>
                      </div>
                      <div className="flex justify-end">
                        <div className="w-24 h-3 bg-gray-200 rounded"></div>
                        <div className="w-20 h-3 bg-gray-300 rounded ml-4"></div>
                      </div>
                      <div className="flex justify-end">
                        <div className="w-24 h-4 bg-gray-800 rounded"></div>
                        <div className="w-24 h-4 bg-blue-500 rounded ml-4"></div>
                      </div>
                    </div>
                  </div> */}
                  <Image src="https://cdn.pixabay.com/photo/2017/06/10/12/22/bill-2389803_1280.jpg" alt="invoice image" height={1000} width={1200} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">
                Features  
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Everything you need to manage your invoices
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform provides a comprehensive set of tools for creating,
                managing, and tracking invoices.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-gray-100 p-3">
                <FileText className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold">Custom Branded Invoices</h3>
              <p className="text-center text-gray-500">
                Create professional invoices with your brand logo, colors, and
                custom fields.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-gray-100 p-3">
                <Download className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold">PDF Generation</h3>
              <p className="text-center text-gray-500">
                Export your invoices as professional-looking PDFs to send to
                clients.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-gray-100 p-3">
                <CheckCircle className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold">Client Management</h3>
              <p className="text-center text-gray-500">
                Manage your client information, contact details, and invoicing
                history.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-gray-100 p-3">
                <BarChart className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold">Dashboard & Analytics</h3>
              <p className="text-center text-gray-500">
                Get insights into your invoicing activity with detailed
                analytics and reports.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-gray-100 p-3">
                <Clock className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold">Payment Tracking</h3>
              <p className="text-center text-gray-500">
                Track the status of your invoices and payment due dates.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-gray-100 p-3">
                <CreditCard className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold">Multiple Payment Options</h3>
              <p className="text-center text-gray-500">
                Offer clients various payment methods for their convenience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-700 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to streamline your invoicing?
              </h2>
              <p className="mx-auto max-w-[600px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of businesses that use InvoicePro to create
                professional invoices.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/auth">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-white text-blue-700 hover:bg-white/90"
                >
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 md:py-12 border-t">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold">Product</h3>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Features
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Pricing
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Integrations
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Updates
              </a>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold">Company</h3>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                About
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Blog
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Careers
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Press
              </a>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold">Resources</h3>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Help Center
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Documentation
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Contact
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Community
              </a>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold">Legal</h3>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Cookie Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Security
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between mt-8 pt-8 border-t">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-700 rounded-md flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">InvoicePro</span>
            </div>
            <p className="mt-4 md:mt-0 text-sm text-gray-500">
              © {new Date().getFullYear()} InvoicePro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
