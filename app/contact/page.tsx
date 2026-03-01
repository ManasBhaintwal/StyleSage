"use client";

import { ContentLayout } from "@/components/content/ContentLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <ContentLayout title="Contact Us" subtitle="We'd love to hear from you.">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Form */}
        <div className="space-y-6 bg-surface p-8 rounded-2xl border border-white/5">
          <div className="space-y-2">
            <label
              htmlFor="contact-name"
              className="text-sm font-bold uppercase"
            >
              Name
            </label>
            <Input id="contact-name" placeholder="Your Name" />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="contact-email"
              className="text-sm font-bold uppercase"
            >
              Email
            </label>
            <Input
              id="contact-email"
              type="email"
              placeholder="name@example.com"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="contact-message"
              className="text-sm font-bold uppercase"
            >
              Message
            </label>
            <Textarea
              id="contact-message"
              placeholder="How can we help?"
              className="min-h-[150px]"
            />
          </div>
          <Button size="lg" className="w-full" variant="neon">
            Send Message
          </Button>
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div>
            <h3 className="font-heading text-xl font-bold uppercase mb-2">
              Support
            </h3>
            <p className="text-muted-foreground">help@stylesage.com</p>
            <p className="text-muted-foreground">+91 98765 43210</p>
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold uppercase mb-2">
              Business
            </h3>
            <p className="text-muted-foreground">partnerships@stylesage.com</p>
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold uppercase mb-2">
              Socials
            </h3>
            <div className="flex gap-4">
              <Button variant="outline" size="sm">
                Instagram
              </Button>
              <Button variant="outline" size="sm">
                Twitter
              </Button>
              <Button variant="outline" size="sm">
                Discord
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
