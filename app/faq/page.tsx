
import { ContentLayout } from "@/components/content/ContentLayout";
import { FAQItem } from "@/components/content/FAQItem";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | StyleSage Support",
  description: "Find answers about shipping, returns, sizing, and print quality. StyleSage offers premium anime streetwear with worldwide shipping.",
};

const FAQS = [
  {
    question: "How long does shipping take?",
    answer: "Domestic orders (India) typically arrive within 3-5 business days. International orders may take 7-14 days depending on customs.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 7-day hassle-free return policy. If the item is unused and in original packaging, you can return it for a full refund or exchange.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes! We ship to over 50 countries worldwide including USA, UK, Canada, and Australia.",
  },
  {
    question: "How do I care for my printed tees?",
    answer: "Machine wash cold, inside out. Do not tumble dry. Do not iron directly on the print to ensure longevity.",
  },
];

export default function FAQPage() {
  return (
    <ContentLayout
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about our products and services."
    >
      <div className="space-y-2">
        {FAQS.map((faq, i) => (
          <FAQItem key={i} {...faq} />
        ))}
      </div>
    </ContentLayout>
  );
}
