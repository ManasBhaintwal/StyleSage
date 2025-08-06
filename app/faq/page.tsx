import { Metadata } from "next";
import { createMetadata, generateFAQStructuredData } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "Frequently Asked Questions - StyleSage T-Shirts",
  description:
    "Find answers to common questions about our premium custom t-shirts, shipping, sizing, returns, and more. Get help with your StyleSage order.",
  path: "/faq",
  keywords: [
    "StyleSage FAQ",
    "t-shirt questions",
    "shipping info",
    "size guide",
    "returns policy",
    "custom t-shirt help",
    "order questions",
    "material information",
  ],
});

export default function FAQPage() {
  const faqData = [
    {
      category: "Products & Quality",
      questions: [
        {
          question: "What materials do you use for your t-shirts?",
          answer:
            "We use premium quality 100% organic cotton and cotton blends that are soft, durable, and comfortable. All our materials are ethically sourced and eco-friendly. Our fabric is pre-shrunk and maintains its shape and color after multiple washes.",
        },
        {
          question: "What printing techniques do you use?",
          answer:
            "We use high-quality screen printing and digital printing techniques depending on the design. Our prints are durable, fade-resistant, and maintain their vibrancy even after many washes. For custom designs, we use advanced DTG (Direct-to-Garment) printing for the best quality.",
        },
        {
          question: "Are your t-shirts ethically made?",
          answer:
            "Yes, we are committed to ethical manufacturing. We work with certified suppliers who ensure fair wages, safe working conditions, and environmentally responsible practices. Our organic cotton is sourced from sustainable farms.",
        },
      ],
    },
    {
      category: "Sizing & Fit",
      questions: [
        {
          question: "What sizes do you offer?",
          answer:
            "We offer inclusive sizing from XS to 5XL to ensure everyone can find their perfect fit. Each product page includes detailed size charts with measurements for chest, length, and sleeve length. We believe fashion should be accessible to all body types.",
        },
        {
          question: "How do I choose the right size?",
          answer:
            "Please refer to our detailed size chart on each product page. Measure your chest circumference and length preference, then compare with our measurements. If you're between sizes, we generally recommend sizing up for a more comfortable fit.",
        },
        {
          question: "Do your t-shirts shrink?",
          answer:
            "Our t-shirts are pre-shrunk during manufacturing to minimize shrinkage. However, we recommend washing in cold water and air drying to maintain the best fit and quality. Following our care instructions will ensure your t-shirt stays true to size.",
        },
      ],
    },
    {
      category: "Shipping & Delivery",
      questions: [
        {
          question: "How long does shipping take?",
          answer:
            "We offer fast shipping across India with delivery typically within 3-7 business days for metro cities and 5-10 business days for other locations. Express shipping options are available for faster delivery. Custom designs may take 1-2 additional days for production.",
        },
        {
          question: "What are your shipping charges?",
          answer:
            "We offer free shipping on orders above ₹999. For smaller orders, shipping charges are ₹99 for standard delivery and ₹199 for express delivery. Shipping to remote areas may incur additional charges.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Currently, we only ship within India. However, we're working on expanding our shipping to international destinations. Please follow our social media or subscribe to our newsletter for updates on international shipping.",
        },
      ],
    },
    {
      category: "Orders & Customization",
      questions: [
        {
          question: "Can I customize my own design?",
          answer:
            "Yes! We offer custom design services where you can upload your own artwork or text. Our design team can also help create unique designs based on your requirements. Custom orders require a minimum quantity and may take 3-5 additional business days.",
        },
        {
          question: "What file formats do you accept for custom designs?",
          answer:
            "We accept high-resolution images in PNG, JPG, SVG, and PDF formats. For best quality, please provide images at 300 DPI resolution. Our design team will review your file and may suggest optimizations for the best print quality.",
        },
        {
          question: "Can I track my order?",
          answer:
            "Yes, once your order is shipped, you'll receive a tracking number via email and SMS. You can track your order status in real-time through our website or the courier partner's tracking system.",
        },
      ],
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy for all products. Items must be in original condition with tags attached and unworn. Custom personalized items can only be returned if there's a manufacturing defect or error in printing.",
        },
        {
          question: "How do I initiate a return?",
          answer:
            "To initiate a return, contact our customer service team within 30 days of delivery. We'll provide you with a return authorization number and instructions. Returns are processed within 5-7 business days of receiving the item.",
        },
        {
          question: "Who pays for return shipping?",
          answer:
            "If the return is due to our error (wrong item, defective product), we'll provide a prepaid return label. For size exchanges or change of mind, return shipping costs are borne by the customer.",
        },
      ],
    },
    {
      category: "Payment & Security",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept multiple payment methods including Cash on Delivery, UPI, Credit/Debit cards, Net Banking, and popular digital wallets like Paytm, PhonePe, and Google Pay. All online payments are processed through secure, encrypted gateways.",
        },
        {
          question: "Is it safe to use my credit card on your website?",
          answer:
            "Yes, absolutely! We use industry-standard SSL encryption and work with trusted payment gateways that comply with PCI DSS standards. Your payment information is never stored on our servers and is processed securely.",
        },
        {
          question: "Can I pay after delivery?",
          answer:
            "Yes, we offer Cash on Delivery (COD) for most locations across India. COD orders require phone verification and may have additional charges. COD is available for orders up to ₹5,000.",
        },
      ],
    },
  ];

  const faqStructuredData = generateFAQStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-3 mb-2">
                <HelpCircle className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Find answers to common questions about StyleSage t-shirts,
                orders, and policies.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {faqData.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="overflow-hidden">
                <CardHeader className="bg-gray-100 dark:bg-gray-700">
                  <CardTitle className="text-xl text-gray-900 dark:text-white">
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem
                        key={faqIndex}
                        value={`${categoryIndex}-${faqIndex}`}
                        className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                      >
                        <AccordionTrigger className="px-6 py-4 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <Card className="max-w-4xl mx-auto mt-12">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Still have questions?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Can't find the answer you're looking for? Our customer support
                team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Support
                </Link>
                <Link
                  href="mailto:support@stylesage.com"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Email Us
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
