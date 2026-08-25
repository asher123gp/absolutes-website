"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { gsap } from "gsap";

function RequestSampleForm() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get("product") || "";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    businessEmail: "",
    phone: "",
    country: "",
    product: initialProduct,
    extractType: "",
    quantity: "",
    application: "",
    deliveryLocation: "",
    message: "",
    website_url: "", // honeypot
  });

  useEffect(() => {
    // Basic entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(".form-stagger", 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/request-sample", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
      } else {
        setErrorMsg(data.error || "We couldn't submit your request right now. Please try again or contact us directly.");
      }
    } catch (err) {
      setErrorMsg("We couldn't submit your request right now. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-[600px] w-full text-center form-stagger mx-auto">
        <div className="w-16 h-px bg-brass mx-auto mb-8" />
        <h1 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] leading-none mb-6">Request Received</h1>
        <p className="font-sans text-[1rem] leading-[1.8] text-ivory/70 font-light mb-12">
          Thank you. Your sample request has been received. Our team will get back to you shortly.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center justify-center font-sans border border-ivory/20 text-ivory px-10 py-4 text-[0.65rem] font-medium tracking-[0.1em] uppercase hover:bg-ivory hover:text-charcoal transition-colors duration-500"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="form-stagger mb-16 border-b border-ivory/10 pb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="w-10 h-px bg-brass/50" />
          <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-brass font-medium">
            Sample Program
          </span>
        </div>
        <h1 className="font-serif text-[clamp(3rem,5vw,4.5rem)] leading-[1.1] tracking-[-0.02em] font-medium max-w-[800px]">
          Request a <em className="italic text-ivory/70 font-light">Sample</em>
        </h1>
        <p className="mt-6 font-sans text-[1rem] leading-[1.8] text-ivory/60 font-light max-w-[600px]">
          Evaluate our pure extracts in your formulation. Please provide your professional details and requirements below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="form-stagger space-y-16">
        {errorMsg && (
          <div className="bg-red-950/30 border border-red-500/20 text-red-200 px-6 py-4 font-sans text-sm rounded-sm">
            {errorMsg}
          </div>
        )}

        {/* Contact Information */}
        <section>
          <h2 className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-ivory/40 mb-8 pb-4 border-b border-ivory/5">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[0.75rem] text-ivory/80 uppercase tracking-widest">Full Name *</label>
              <input required name="fullName" value={formData.fullName} onChange={handleChange} className="bg-transparent border border-ivory/20 px-4 py-3 text-ivory focus:outline-none focus:border-brass transition-colors rounded-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[0.75rem] text-ivory/80 uppercase tracking-widest">Company Name *</label>
              <input required name="companyName" value={formData.companyName} onChange={handleChange} className="bg-transparent border border-ivory/20 px-4 py-3 text-ivory focus:outline-none focus:border-brass transition-colors rounded-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[0.75rem] text-ivory/80 uppercase tracking-widest">Business Email *</label>
              <input required type="email" name="businessEmail" value={formData.businessEmail} onChange={handleChange} className="bg-transparent border border-ivory/20 px-4 py-3 text-ivory focus:outline-none focus:border-brass transition-colors rounded-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[0.75rem] text-ivory/80 uppercase tracking-widest">Phone / WhatsApp</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="bg-transparent border border-ivory/20 px-4 py-3 text-ivory focus:outline-none focus:border-brass transition-colors rounded-none" />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="font-sans text-[0.75rem] text-ivory/80 uppercase tracking-widest">Country *</label>
              <input required name="country" value={formData.country} onChange={handleChange} className="bg-transparent border border-ivory/20 px-4 py-3 text-ivory focus:outline-none focus:border-brass transition-colors rounded-none" />
            </div>
          </div>
        </section>

        {/* Product Information */}
        <section>
          <h2 className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-ivory/40 mb-8 pb-4 border-b border-ivory/5">
            Product Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="font-sans text-[0.75rem] text-ivory/80 uppercase tracking-widest">Product / Extract Required *</label>
              <input required name="product" value={formData.product} onChange={handleChange} placeholder="e.g. Black Pepper Oleoresin" className="bg-transparent border border-ivory/20 px-4 py-3 text-ivory focus:outline-none focus:border-brass transition-colors rounded-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[0.75rem] text-ivory/80 uppercase tracking-widest">Extract Type</label>
              <select name="extractType" value={formData.extractType} onChange={handleChange} className="bg-charcoal border border-ivory/20 px-4 py-3 text-ivory focus:outline-none focus:border-brass transition-colors rounded-none appearance-none">
                <option value="">Select Type</option>
                <option value="Spice Oil">Spice Oil</option>
                <option value="Oleoresin">Oleoresin</option>
                <option value="Absolute">Absolute</option>
                <option value="Not Sure">Not Sure</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[0.75rem] text-ivory/80 uppercase tracking-widest">Intended Application *</label>
              <select required name="application" value={formData.application} onChange={handleChange} className="bg-charcoal border border-ivory/20 px-4 py-3 text-ivory focus:outline-none focus:border-brass transition-colors rounded-none appearance-none">
                <option value="">Select Application</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Flavor & Fragrance">Flavor & Fragrance</option>
                <option value="Nutraceutical">Nutraceutical</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="font-sans text-[0.75rem] text-ivory/80 uppercase tracking-widest">Quantity / Sample Requirement *</label>
              <input required name="quantity" value={formData.quantity} onChange={handleChange} placeholder="e.g. 50g, 100ml" className="bg-transparent border border-ivory/20 px-4 py-3 text-ivory focus:outline-none focus:border-brass transition-colors rounded-none" />
            </div>
          </div>
        </section>

        {/* Delivery & Additional Info */}
        <section>
          <h2 className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-ivory/40 mb-8 pb-4 border-b border-ivory/5">
            Delivery & Details
          </h2>
          <div className="grid grid-cols-1 gap-y-8">
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[0.75rem] text-ivory/80 uppercase tracking-widest">Shipping / Delivery Location *</label>
              <input required name="deliveryLocation" value={formData.deliveryLocation} onChange={handleChange} placeholder="Full shipping address" className="bg-transparent border border-ivory/20 px-4 py-3 text-ivory focus:outline-none focus:border-brass transition-colors rounded-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[0.75rem] text-ivory/80 uppercase tracking-widest">Message / Additional Requirements</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="bg-transparent border border-ivory/20 px-4 py-3 text-ivory focus:outline-none focus:border-brass transition-colors rounded-none resize-y" />
            </div>
          </div>
        </section>

        {/* Honeypot */}
        <input type="text" name="website_url" value={formData.website_url} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="pt-8 border-t border-ivory/10 flex justify-end">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="group relative inline-flex items-center justify-center overflow-hidden font-sans text-[0.75rem] font-medium tracking-[0.1em] uppercase text-charcoal bg-ivory px-12 py-5 transition-transform duration-500 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
          >
            <span className="absolute inset-0 bg-brass translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            <span className="relative z-10 flex items-center gap-3 group-hover:text-charcoal transition-colors duration-500">
              {isSubmitting ? "Submitting..." : "Submit Sample Request"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default function RequestSamplePage() {
  return (
    <main className="min-h-screen bg-charcoal text-ivory grain pt-[20vh] pb-32 px-6">
      <Suspense fallback={<div className="text-center font-sans tracking-widest text-[0.75rem] text-ivory/50 uppercase mt-20">Loading...</div>}>
        <RequestSampleForm />
      </Suspense>
    </main>
  );
}
