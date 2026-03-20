"use client"


import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight, Phone, Mail, MapPin, ChevronRight, Award, Clock, Building2, Users, CheckCircle, MessageCircle, Send, Shield, Star, Landmark, Droplets, GraduationCap, HeartPulse, Factory } from "lucide-react";

const navLinks = ["Projects", "Services", "Process", "Guarantee", "Contact"] as const;
type NavLink = typeof navLinks[number];

const stats = [
  { value: 147, suffix: "+", label: "Projects Delivered" },
  { value: 12, suffix: "yrs", label: "Years of Excellence" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 0, suffix: " delays", label: "Penalty Claims Filed" },
];

const industries = [
  { icon: Building2, label: "Real Estate" },
  { icon: Landmark, label: "Banking & Finance" },
  { icon: Droplets, label: "Oil & Gas" },
  { icon: GraduationCap, label: "Education" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: Factory, label: "Manufacturing" },
];

const projects = [
  { name: "Eko Atlantic Tower C", location: "Victoria Island, Lagos", category: "Commercial", year: "2024", budget: "₦2.4B", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80" },
  { name: "Maitama Heights Estate", location: "Maitama, Abuja", category: "Residential", year: "2024", budget: "₦890M", img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80" },
  { name: "Meridian Business Park", location: "GRA, Port Harcourt", category: "Mixed-Use", year: "2023", budget: "₦1.7B", img: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?w=800&q=80" },
  { name: "Dugbe Commercial Hub", location: "Dugbe, Ibadan", category: "Retail", year: "2023", budget: "₦540M", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
  { name: "Lekki Phase 2 Villas", location: "Lekki, Lagos", category: "Residential", year: "2022", budget: "₦1.1B", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80" },
  { name: "Wuse Office Complex", location: "Wuse II, Abuja", category: "Commercial", year: "2022", budget: "₦780M", img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80" },
];

const filters = ["All", "Commercial", "Residential", "Mixed-Use", "Retail"] as const;
type Filter = typeof filters[number];

const services = [
  { icon: Building2, title: "Commercial Construction", desc: "Office towers, retail complexes, and mixed-use developments built to international standards with local expertise." },
  { icon: Users, title: "Residential Development", desc: "Premium estates and luxury apartments crafted with precision — from foundation to finishing." },
  { icon: Award, title: "Project Management", desc: "End-to-end oversight with weekly client reporting, ensuring quality, timeline, and budget compliance." },
  { icon: Clock, title: "Renovation & Retrofit", desc: "Structural upgrades and full renovations that breathe new life into existing buildings." },
];

const process = [
  { step: "01", title: "Site Assessment", desc: "We evaluate your land, study soil conditions, and conduct a full feasibility analysis before a single naira is committed." },
  { step: "02", title: "Design & Approval", desc: "Our architects produce detailed drawings and handle all council approvals — you don't chase government offices." },
  { step: "03", title: "Construction", desc: "Expert teams execute with certified materials, weekly progress reports, and zero tolerance for substandard work." },
  { step: "04", title: "Handover", desc: "Full documentation, facility walkthrough, and a 12-month structural warranty — your peace of mind is in writing." },
];

const testimonials = [
  { quote: "Crestline delivered our Wuse office complex 11 days ahead of schedule. In 12 years of doing business in Nigeria, I have never seen that. They are in a different class entirely.", name: "Alhaji Musa Dankwambo", role: "MD, Northgate Properties Ltd", img: "https://i.pravatar.cc/80?img=11" },
  { quote: "We had been burned twice by contractors before Crestline. The difference was night and day — transparent costs, weekly updates, and they flagged issues before they became problems.", name: "Mrs. Adaeze Okonkwo", role: "Director, Lakeview Investments", img: "https://i.pravatar.cc/80?img=47" },
  { quote: "The Lekki villas project came in ₦12M under budget. They called us to return the savings. That tells you everything about how they operate.", name: "Engr. Babatunde Fashola-James", role: "CEO, Crestview Homes", img: "https://i.pravatar.cc/80?img=33" },
];

const chatMessages = [{ from: "bot", text: "Hello! 👋 Welcome to Crestline Development. How can I help you today?" }];
const quickReplies = ["Request a quote", "Book site visit", "View our projects", "Speak to an engineer"];

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [start, target, duration]);
  return count;
}

function StatCard({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const count = useCountUp(value, 1800, start);
  return (
    <div className="text-center">
      <p className="font-bold text-[#c9a96e] leading-none mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
        {count}{suffix}
      </p>
      <p className="text-stone-400 uppercase tracking-widest text-[10px]">{label}</p>
    </div>
  );
}

export default function CrestlineDevelopment() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(chatMessages);
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", type: "", message: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [scrolled, setScrolled] = useState(false);
  const statsRef = useRef<HTMLElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const projectsRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const guaranteeRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const sectionRefs: Record<NavLink, React.RefObject<HTMLElement | null>> = {
    Projects: projectsRef, Services: servicesRef, Process: processRef,
    Guarantee: guaranteeRef, Contact: contactRef,
  };

  const scrollTo = (section: NavLink) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredProjects = activeFilter === "All" ? projects : projects.filter(p => p.category === activeFilter);

  const sendChat = (text?: string) => {
    const msg = text || chatInput;
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { from: "user", text: msg }]);
    setChatInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, {
        from: "bot",
        text: msg.toLowerCase().includes("quote") ? "To prepare your quote, please fill our contact form or call +234 (0) 801 234 5678 directly. We respond within 24 hours."
          : msg.toLowerCase().includes("visit") ? "We offer free site visits across Lagos, Abuja, and Port Harcourt. Fill the contact form below and select 'Site Visit' — an engineer will confirm within 24 hours."
          : msg.toLowerCase().includes("project") ? "We've delivered 147+ projects across Nigeria — commercial, residential, and mixed-use. Scroll up to see our featured work!"
          : "Our engineers are available Mon–Fri, 8AM–6PM. Reach us at projects@crestlinedevelopment.ng or +234 (0) 801 234 5678.",
      }]);
    }, 900);
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    if (!formData.message.trim()) errors.message = "Tell us about your project";
    return errors;
  };

  const handleSubmit = () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormErrors({});
    setFormState("loading");
    setTimeout(() => setFormState("success"), 2000);
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1c1c1c]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .serif { font-family: 'Playfair Display', serif; }
        .sans { font-family: 'DM Sans', sans-serif; }
        .project-card .overlay { opacity: 0; transition: opacity 0.4s ease; }
        .project-card .info { transform: translateY(12px); opacity: 0; transition: all 0.4s ease; }
        .project-card:hover .overlay { opacity: 1; }
        .project-card:hover .info { transform: translateY(0); opacity: 1; }
        .project-card img { transition: transform 0.7s ease; }
        .project-card:hover img { transform: scale(1.05); }
        .chat-messages { scrollbar-width: none; }
        .chat-messages::-webkit-scrollbar { display: none; }
        .partner-track { display: flex; gap: 0; animation: scroll 20s linear infinite; }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .hero-img { animation: slowzoom 12s ease-in-out infinite alternate; }
        @keyframes slowzoom { from { transform: scale(1); } to { transform: scale(1.06); } }
      `}</style>

      {/* Mobile sticky CTA */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${scrolled ? "translate-y-0" : "translate-y-full"}`}>
        <div className="flex">
          <button onClick={() => scrollTo("Contact")} className="sans flex-1 bg-[#1c1c1c] text-[#faf9f7] text-[11px] tracking-widest uppercase font-medium py-4 flex items-center justify-center gap-2 cursor-pointer">
            Get a Quote <ArrowUpRight size={13} />
          </button>
          <button onClick={() => scrollTo("Contact")} className="sans flex-1 bg-[#c9a96e] text-[#1c1c1c] text-[11px] tracking-widest uppercase font-medium py-4 flex items-center justify-center gap-2 cursor-pointer">
            Book Site Visit <MapPin size={13} />
          </button>
        </div>
      </div>

      {/* Floating Chat + WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" style={{ marginBottom: scrolled ? "56px" : "0" }}>
        {chatOpen && (
          <div className="sans w-80 bg-white border border-stone-200 shadow-2xl flex flex-col overflow-hidden" style={{ height: "420px", borderRadius: "16px" }}>
            <div className="bg-[#1c1c1c] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <p className="text-white text-xs font-medium">Crestline AI Assistant</p>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-stone-400 hover:text-white transition-colors cursor-pointer"><X size={14} /></button>
            </div>
            <div className="chat-messages flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-3 py-2 text-xs leading-relaxed ${m.from === "user" ? "bg-[#1c1c1c] text-white" : "bg-stone-100 text-[#1c1c1c]"}`} style={{ borderRadius: "10px" }}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {quickReplies.map((r) => (
                <button key={r} onClick={() => sendChat(r)} className="text-[10px] border border-stone-200 text-stone-500 px-2 py-1 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors cursor-pointer" style={{ borderRadius: "20px" }}>{r}</button>
              ))}
            </div>
            <div className="px-3 pb-3 flex gap-2">
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()} placeholder="Type a message..." className="flex-1 bg-stone-100 border border-stone-200 text-xs px-3 py-2 focus:outline-none focus:border-[#c9a96e] transition-colors" style={{ borderRadius: "8px" }} />
              <button onClick={() => sendChat()} className="bg-[#c9a96e] text-white w-8 h-8 flex items-center justify-center hover:bg-[#b8935a] transition-colors cursor-pointer" style={{ borderRadius: "8px" }}><Send size={13} /></button>
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <a href="https://wa.me/2348012345678" target="_blank" rel="noreferrer"
            className="w-12 h-12 flex items-center justify-center shadow-xl transition-colors duration-200 cursor-pointer"
            style={{ background: "#25D366", borderRadius: "50%" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
          <button onClick={() => setChatOpen(!chatOpen)} className="w-12 h-12 bg-[#1c1c1c] text-white flex items-center justify-center shadow-xl hover:bg-[#c9a96e] transition-colors duration-200 cursor-pointer relative" style={{ borderRadius: "50%" }}>
            <MessageCircle size={20} />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 flex items-center justify-center" style={{ borderRadius: "50%" }}>
              <div className="w-1.5 h-1.5 bg-white" style={{ borderRadius: "50%" }} />
            </div>
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="sans fixed top-0 left-0 right-0 z-40 bg-[#faf9f7]/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="serif text-xl font-semibold tracking-wide text-[#1c1c1c]">CRESTLINE</p>
            <p className="sans text-[9px] tracking-[0.25em] text-[#c9a96e] uppercase font-medium">Development Group</p>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button key={l} onClick={() => scrollTo(l)} className="sans text-[11px] tracking-widests text-stone-500 hover:text-[#1c1c1c] transition-colors uppercase font-medium cursor-pointer bg-transparent border-none">{l}</button>
            ))}
            <button onClick={() => scrollTo("Contact")} className="sans bg-[#c9a96e] text-[#1c1c1c] text-[11px] tracking-widest uppercase font-semibold px-5 py-2.5 hover:bg-[#1c1c1c] hover:text-white transition-colors duration-200 cursor-pointer">
              Request Site Visit
            </button>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#faf9f7] border-t border-stone-200 px-6 py-5 flex flex-col gap-5">
            {navLinks.map((l) => (
              <button key={l} onClick={() => scrollTo(l)} className="sans text-[11px] tracking-widest text-stone-500 uppercase font-medium text-left bg-transparent border-none cursor-pointer">{l}</button>
            ))}
            <button onClick={() => scrollTo("Contact")} className="sans bg-[#c9a96e] text-[#1c1c1c] text-[11px] tracking-widest uppercase font-semibold px-5 py-3 w-full cursor-pointer">
              Request Site Visit
            </button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80" alt="Construction" className="hero-img w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1c1c1c]/75" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-[#c9a96e]" />
              <p className="sans text-[10px] tracking-[0.3em] text-[#c9a96e] uppercase font-medium">Est. 2012 · Nigeria's Premier Builder</p>
            </div>
            <h1 className="serif font-normal leading-[1.05] text-white mb-8" style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
              We don't just<br />build structures.<br />
              <span className="italic text-[#c9a96e]">We build legacies.</span>
            </h1>
            <p className="sans text-stone-300 text-sm leading-relaxed max-w-xl mb-10 font-light">
              Crestline Development Group is Nigeria's most accountable construction partner — commercial, residential, and mixed-use projects delivered on time, on budget, in writing.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("Contact")} className="sans bg-[#c9a96e] text-[#1c1c1c] text-[11px] tracking-widest uppercase font-semibold px-8 py-4 hover:bg-white transition-colors duration-200 flex items-center gap-2 cursor-pointer">
                Request Site Visit <MapPin size={14} />
              </button>
              <button onClick={() => scrollTo("Projects")} className="sans border border-white/30 text-white text-[11px] tracking-widest uppercase font-medium px-8 py-4 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors duration-200 cursor-pointer flex items-center gap-2">
                View Our Work <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="sans bg-[#1c1c1c] px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => <StatCard key={s.label} {...s} start={statsVisible} />)}
        </div>
      </section>

      {/* Industries */}
      <section className="sans bg-stone-100 py-10 overflow-hidden border-y border-stone-200">
        <p className="sans text-[10px] tracking-[0.3em] text-stone-400 uppercase text-center mb-8">Industries We've Built For</p>
        <div className="flex overflow-hidden">
          <div className="partner-track whitespace-nowrap flex items-center">
            {[...industries, ...industries].map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex flex-col items-center gap-2 px-10 border-r border-stone-200 last:border-0 shrink-0">
                <div className="w-10 h-10 bg-white border border-stone-200 flex items-center justify-center shadow-sm">
                  <Icon size={18} className="text-[#c9a96e]" strokeWidth={1.5} />
                </div>
                <span className="sans text-[10px] tracking-widest text-stone-400 uppercase">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section ref={projectsRef} className="px-6 py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end gap-8 mb-10">
            <div>
              <p className="sans text-[10px] tracking-[0.3em] text-[#c9a96e] uppercase font-medium mb-3">Our Portfolio</p>
              <h2 className="serif font-normal text-[#1c1c1c] leading-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                Featured <span className="italic">Projects</span>
              </h2>
            </div>
            <div className="h-px bg-stone-200 flex-1 mb-4 hidden md:block" />
          </div>
          <div className="flex gap-2 mb-8 flex-wrap">
            {filters.map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`sans text-[11px] tracking-widest uppercase font-medium px-4 py-2 border transition-all duration-200 cursor-pointer ${activeFilter === f ? "bg-[#1c1c1c] text-white border-[#1c1c1c]" : "bg-transparent text-stone-500 border-stone-200 hover:border-[#c9a96e] hover:text-[#c9a96e]"}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <div key={project.name} className="project-card relative cursor-pointer overflow-hidden group">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img src={project.img} alt={project.name} className="w-full h-full object-cover" />
                  <div className="overlay absolute inset-0 bg-[#1c1c1c]/80" />
                  <div className="info absolute inset-0 flex flex-col justify-end p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="sans text-[9px] tracking-widest text-[#c9a96e] uppercase">{project.category} · {project.year}</span>
                      <span className="sans text-[9px] tracking-widest text-stone-400 uppercase">{project.budget}</span>
                    </div>
                    <h3 className="serif text-white text-xl font-semibold mb-1">{project.name}</h3>
                    <div className="flex items-center gap-1">
                      <MapPin size={11} className="text-stone-400" />
                      <p className="sans text-stone-400 text-[11px]">{project.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section ref={servicesRef} className="bg-stone-100 px-6 py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end gap-8 mb-14">
            <div>
              <p className="sans text-[10px] tracking-[0.3em] text-[#c9a96e] uppercase font-medium mb-3">What We Do</p>
              <h2 className="serif font-normal text-[#1c1c1c] leading-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                Our <span className="italic">Services</span>
              </h2>
            </div>
            <div className="h-px bg-stone-300 flex-1 mb-4 hidden md:block" />
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-stone-300">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group bg-stone-100 p-8 hover:bg-[#1c1c1c] transition-all duration-300 cursor-pointer">
                <div className="flex items-start justify-between mb-8">
                  <div className="border border-stone-300 group-hover:border-[#c9a96e] p-3 transition-colors duration-300">
                    <Icon size={18} className="text-[#c9a96e]" strokeWidth={1.5} />
                  </div>
                  <ChevronRight size={16} className="text-stone-300 group-hover:text-[#c9a96e] transition-colors duration-300 mt-1" />
                </div>
                <h3 className="serif text-2xl font-semibold text-[#1c1c1c] group-hover:text-[#faf9f7] mb-3 transition-colors duration-300">{title}</h3>
                <p className="sans text-stone-500 group-hover:text-stone-400 text-xs leading-relaxed transition-colors duration-300 font-light">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section ref={processRef} className="px-6 py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end gap-8 mb-14">
            <div>
              <p className="sans text-[10px] tracking-[0.3em] text-[#c9a96e] uppercase font-medium mb-3">How We Work</p>
              <h2 className="serif font-normal text-[#1c1c1c] leading-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                Our <span className="italic">Process</span>
              </h2>
            </div>
            <div className="h-px bg-stone-200 flex-1 mb-4 hidden md:block" />
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {process.map(({ step, title, desc }, i) => (
              <div key={step} className="relative">
                {i < process.length - 1 && <div className="absolute top-6 left-16 right-0 h-px bg-stone-200 hidden md:block" />}
                <div className="w-12 h-12 border border-stone-200 flex items-center justify-center mb-6 relative bg-[#faf9f7]">
                  <span className="serif text-[#c9a96e] font-semibold text-sm">{step}</span>
                </div>
                <h3 className="serif text-xl font-semibold text-[#1c1c1c] mb-3">{title}</h3>
                <p className="sans text-stone-500 text-xs leading-relaxed font-light">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section ref={guaranteeRef} className="bg-[#1c1c1c] px-6 py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Shield size={20} className="text-[#c9a96e]" strokeWidth={1.5} />
              <p className="sans text-[10px] tracking-[0.3em] text-[#c9a96e] uppercase font-medium">Our Differentiator</p>
            </div>
            <h2 className="serif font-normal text-white leading-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              The <span className="italic text-[#c9a96e]">₦0 Delay</span><br />Guarantee.
            </h2>
            <p className="sans text-stone-400 text-sm leading-relaxed font-light mb-8">
              Every Crestline project comes with a signed delivery commitment. If we miss your agreed handover date for any reason within our control — you pay nothing for the additional time. Zero. Not a naira.
            </p>
            <p className="sans text-stone-400 text-sm leading-relaxed font-light mb-10">
              In 12 years and 147 projects, we have never activated this clause. Not because it's hard to enforce — but because we've never needed to.
            </p>
            <div className="flex flex-col gap-4">
              {["Signed delivery timeline on every contract", "Weekly progress reports sent to your phone", "12-month structural warranty after handover", "Fixed-price contracts — no surprise invoices"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={15} className="text-[#c9a96e] shrink-0" strokeWidth={2} />
                  <p className="sans text-stone-300 text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#2a2a2a] border border-stone-800 p-8">
            <div className="flex items-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-[#c9a96e] fill-[#c9a96e]" />)}
            </div>
            <p className="serif text-2xl font-normal italic text-stone-300 leading-relaxed mb-8">
              "{testimonials[activeTestimonial].quote}"
            </p>
            <div className="flex items-center gap-4 pt-6 border-t border-stone-700">
              <img src={testimonials[activeTestimonial].img} alt={testimonials[activeTestimonial].name} className="w-10 h-10 object-cover rounded-full grayscale" />
              <div>
                <p className="sans text-white text-xs font-medium">{testimonials[activeTestimonial].name}</p>
                <p className="sans text-stone-500 text-[10px] tracking-widest uppercase">{testimonials[activeTestimonial].role}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  className={`h-0.5 transition-all duration-300 cursor-pointer ${i === activeTestimonial ? "w-12 bg-[#c9a96e]" : "w-6 bg-stone-700 hover:bg-stone-500"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#c9a96e] px-6 py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="serif font-normal text-[#1c1c1c] leading-tight mb-2" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
              Ready to build something <span className="italic">that lasts?</span>
            </h2>
            <p className="sans text-[#1c1c1c]/70 text-sm font-light">Free site visit. No commitment. Just clarity.</p>
          </div>
          <button onClick={() => scrollTo("Contact")} className="sans bg-[#1c1c1c] text-[#faf9f7] text-[11px] tracking-widest uppercase font-medium px-10 py-4 hover:bg-[#faf9f7] hover:text-[#1c1c1c] transition-colors duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap">
            Book Free Site Visit <MapPin size={14} />
          </button>
        </div>
      </section>

      {/* Contact */}
      <section ref={contactRef} className="px-6 py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="sans text-[10px] tracking-[0.3em] text-[#c9a96e] uppercase font-medium mb-4">Get in Touch</p>
            <h2 className="serif font-normal text-[#1c1c1c] leading-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Your project<br /><span className="italic text-[#c9a96e]">starts here.</span>
            </h2>
            <p className="sans text-stone-500 text-sm leading-relaxed font-light mb-10">
              Share your vision and we'll respond within 24 hours with a preliminary assessment and free site visit booking.
            </p>
            <div className="flex flex-col gap-5">
              {[
                { icon: Phone, text: "+234 (0) 801 234 5678" },
                { icon: Mail, text: "projects@crestlinedevelopment.ng" },
                { icon: MapPin, text: "Victoria Island, Lagos, Nigeria" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4 pb-5 border-b border-stone-200 last:border-0">
                  <div className="w-8 h-8 border border-stone-200 flex items-center justify-center shrink-0">
                    <Icon size={13} className="text-[#c9a96e]" strokeWidth={1.5} />
                  </div>
                  <span className="sans text-stone-500 text-xs">{text}</span>
                </div>
              ))}
            </div>
          </div>
          {formState === "success" ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4 border border-stone-200">
              <CheckCircle size={48} className="text-[#c9a96e]" strokeWidth={1.5} />
              <h3 className="serif text-2xl font-semibold text-[#1c1c1c]">Brief Received</h3>
              <p className="sans text-stone-500 text-sm text-center max-w-xs leading-relaxed">
                Thank you. A Crestline project consultant will reach out within 24 hours to confirm your site visit.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`sans w-full bg-stone-100 border text-[#1c1c1c] text-xs px-4 py-4 placeholder-stone-400 focus:outline-none focus:border-[#c9a96e] transition-colors ${formErrors.name ? "border-red-400" : "border-stone-200"}`} placeholder="Full Name" />
                  {formErrors.name && <p className="sans text-red-400 text-[10px] mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={`sans w-full bg-stone-100 border text-[#1c1c1c] text-xs px-4 py-4 placeholder-stone-400 focus:outline-none focus:border-[#c9a96e] transition-colors ${formErrors.phone ? "border-red-400" : "border-stone-200"}`} placeholder="Phone Number" />
                  {formErrors.phone && <p className="sans text-red-400 text-[10px] mt-1">{formErrors.phone}</p>}
                </div>
              </div>
              <div>
                <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`sans w-full bg-stone-100 border text-[#1c1c1c] text-xs px-4 py-4 placeholder-stone-400 focus:outline-none focus:border-[#c9a96e] transition-colors ${formErrors.email ? "border-red-400" : "border-stone-200"}`} placeholder="Email Address" />
                {formErrors.email && <p className="sans text-red-400 text-[10px] mt-1">{formErrors.email}</p>}
              </div>
              <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="sans w-full bg-stone-100 border border-stone-200 text-[#1c1c1c] text-xs px-4 py-4 focus:outline-none focus:border-[#c9a96e] transition-colors">
                <option value="">Project Type</option>
                <option>Commercial Construction</option>
                <option>Residential Development</option>
                <option>Mixed-Use Development</option>
                <option>Renovation & Retrofit</option>
                <option>Request Site Visit Only</option>
              </select>
              <div>
                <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`sans w-full bg-stone-100 border text-[#1c1c1c] text-xs px-4 py-4 placeholder-stone-400 focus:outline-none focus:border-[#c9a96e] transition-colors resize-none ${formErrors.message ? "border-red-400" : "border-stone-200"}`} placeholder="Tell us about your project — location, size, timeline..." />
                {formErrors.message && <p className="sans text-red-400 text-[10px] mt-1">{formErrors.message}</p>}
              </div>
              <button onClick={handleSubmit} disabled={formState === "loading"} className="sans bg-[#1c1c1c] text-[#faf9f7] text-[11px] tracking-widest uppercase font-medium py-4 hover:bg-[#c9a96e] hover:text-[#1c1c1c] transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60">
                {formState === "loading" ? (
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : <>Submit Project Brief <ArrowUpRight size={14} /></>}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="sans bg-[#1c1c1c] px-6 py-6 border-t border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="serif text-stone-600 text-sm">CRESTLINE DEVELOPMENT GROUP · Est. 2012</p>
          <p className="sans text-[10px] text-stone-700 tracking-widest uppercase">
            Demo by <span className="text-[#c9a96e]">Primyst</span>
          </p>
        </div>
      </footer>
    </div>
  );
}