import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="w-full">
      <section className=" bg-transparent px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-base font-bold tracking-wide text-[#fb6d56] sm:text-lg">
            Contact us
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-3xl font-extrabold tracking-tight text-[#0A033C] sm:mt-4 sm:text-4xl md:text-5xl">
            We&apos;d love to hear from you
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-sm leading-7 text-[#5D5A6F] sm:text-[15px]">
            Have a question about courses, enrollment, or partnerships? Send us
            a message and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-black/5 bg-white/80 p-5 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-[#0A033C] sm:text-2xl">
                Send a message
              </h2>
              <p className="mt-2 text-sm text-[#5D5A6F] sm:text-[15px]">
                Fill out the form and we&apos;ll reply via email.
              </p>

              <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-[#0A033C]">
                      Full name
                    </span>
                    <input
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      required
                      placeholder="Your name"
                      className="min-h-12 rounded-2xl border border-black/10 bg-white/90 px-4 text-sm font-medium text-[#1f2029] outline-none transition focus:border-[#7c5cff]/40 focus:ring-2 focus:ring-[#7c5cff]/20 sm:text-[15px]"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-[#0A033C]">
                      Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      required
                      placeholder="you@example.com"
                      className="min-h-12 rounded-2xl border border-black/10 bg-white/90 px-4 text-sm font-medium text-[#1f2029] outline-none transition focus:border-[#7c5cff]/40 focus:ring-2 focus:ring-[#7c5cff]/20 sm:text-[15px]"
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[#0A033C]">
                    Subject
                  </span>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    required
                    placeholder="How can we help?"
                    className="min-h-12 rounded-2xl border border-black/10 bg-white/90 px-4 text-sm font-medium text-[#1f2029] outline-none transition focus:border-[#7c5cff]/40 focus:ring-2 focus:ring-[#7c5cff]/20 sm:text-[15px]"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[#0A033C]">
                    Message
                  </span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    required
                    placeholder="Write your message..."
                    rows={6}
                    className="resize-y rounded-2xl border border-black/10 bg-white/90 px-4 py-3 text-sm font-medium text-[#1f2029] outline-none transition focus:border-[#7c5cff]/40 focus:ring-2 focus:ring-[#7c5cff]/20 sm:text-[15px]"
                  />
                </label>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-[#5D5A6F] sm:text-sm">
                    By sending this form you agree to be contacted via email.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-2xl bg-[#7c5cff] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6e50ff] sm:text-[15px]"
                  >
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="grid gap-4">
              <div className="rounded-3xl border border-black/5 bg-white/80 p-5 shadow-sm sm:p-6">
                <h3 className="text-lg font-bold text-[#0A033C] sm:text-xl">
                  Contact details
                </h3>
                <ul className="mt-5 grid gap-3">
                  <li className="flex items-start gap-3 rounded-2xl bg-white/70 px-4 py-3">
                    <span className="rounded-xl bg-[#fb6d56]/10 p-2 text-[#fb6d56]">
                      <Mail size={18} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#0A033C]">
                        Email
                      </p>
                      <p className="text-sm text-[#5D5A6F] sm:text-[15px]">
                        support@101.com
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 rounded-2xl bg-white/70 px-4 py-3">
                    <span className="rounded-xl bg-[#fb6d56]/10 p-2 text-[#fb6d56]">
                      <Phone size={18} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#0A033C]">
                        Phone
                      </p>
                      <p className="text-sm text-[#5D5A6F] sm:text-[15px]">
                        +20 11 2881 9687
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 rounded-2xl bg-white/70 px-4 py-3">
                    <span className="rounded-xl bg-[#fb6d56]/10 p-2 text-[#fb6d56]">
                      <MapPin size={18} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#0A033C]">
                        Location
                      </p>
                      <p className="text-sm text-[#5D5A6F] sm:text-[15px]">
                        Remote-first · Available worldwide
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="overflow-hidden rounded-3xl border border-black/5 bg-white/80 shadow-sm">
                <div className="h-full w-full bg-linear-to-br from-[#7c5cff]/15 via-white/40 to-[#fb6d56]/15">
                <div className="p-5 sm:p-6">
                  <p className="text-sm font-semibold text-[#0A033C]">Hours</p>
                  <p className="mt-2 text-sm text-[#5D5A6F] sm:text-[15px]">
                    Sun–Thu: 10:00 AM - 6:00 PM
                    <br />
                    Fri–Sat: Closed
                  </p>
                </div>
                </div>
                
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
