import React, { useState, useEffect } from "react";
import { Send, CheckCircle, Trash2, Mail, Linkedin, Github, Instagram, Info } from "lucide-react";

interface SavedMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

interface ContactFormProps {
  recipientEmail: string;
}

export default function ContactForm({ recipientEmail }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Validation States
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Local inbox simulation
  const [savedMessages, setSavedMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    const localMsgs = localStorage.getItem("portfolio_messages");
    if (localMsgs) {
      try {
        setSavedMessages(JSON.parse(localMsgs));
      } catch (e) {
        console.error("Failed to parse localStorage messages");
      }
    }
  }, []);

  const saveMessageToLocal = (newMsg: SavedMessage) => {
    const updated = [newMsg, ...savedMessages];
    setSavedMessages(updated);
    localStorage.setItem("portfolio_messages", JSON.stringify(updated));
  };

  const deleteMessage = (id: string) => {
    const updated = savedMessages.filter(msg => msg.id !== id);
    setSavedMessages(updated);
    localStorage.setItem("portfolio_messages", JSON.stringify(updated));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please provide a valid email address.";
    }

    if (!message.trim()) {
      newErrors.message = "Message content is required.";
    } else if (message.trim().length < 10) {
      newErrors.message = "Please write a bit more (minimum 10 characters).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (touched.name || touched.email || touched.message) {
      validate();
    }
  }, [name, email, message, touched]);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validate();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    fetch(`https://formsubmit.co/ajax/${recipientEmail || "hello@example.com"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        _subject: `New Portfolio Message from ${name}`
      })
    })
      .then((res) => {
        setIsSubmitting(false);
        if (res.ok) {
          setSubmitSuccess(true);
          setName("");
          setEmail("");
          setMessage("");
          setTouched({});
          setTimeout(() => setSubmitSuccess(false), 5000);
        } else {
          alert("Failed to deliver message automatically. Please verify your admin panel email.");
        }
      })
      .catch((err) => {
        console.error("Error submitting contact form", err);
        setIsSubmitting(false);
        alert("An error occurred while sending the message. Please check your network connection.");
      });
  };

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-border-theme/40 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-theme mb-6">
          Let's build.
        </h2>
        <p className="font-sans text-sm md:text-base font-medium text-text-variant mb-10 leading-relaxed">
          Currently open for new opportunities and interesting projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        {/* Success Alert */}
        {submitSuccess && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-800 dark:text-emerald-400 text-sm flex items-start gap-3 text-left animate-[fadeInUp_0.3s_ease_forwards]">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-500" />
            <div>
              <p className="font-bold uppercase tracking-wider text-xs">Message Delivered!</p>
              <p className="text-xs text-emerald-700/95 dark:text-emerald-400/95 mt-1">
                Your transmission has been logged into the browser state sandbox console below.
              </p>
            </div>
          </div>
        )}

        {/* Contact Form Glass Panel */}
        <form onSubmit={handleSubmit} className="space-y-6 text-left glass-panel p-6 md:p-8 rounded-2xl mb-12 relative overflow-hidden">
          {/* Name Field */}
          <div>
            <label className="block font-sans text-xs font-semibold tracking-widest text-text-theme/75 mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur("name")}
              placeholder="YOUR NAME"
              className={`w-full bg-surface-theme border rounded-xl px-4 py-3 text-sm text-text-theme font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-secondary-theme/40 transition-all ${
                touched.name && errors.name
                  ? "border-red-500 ring-1 ring-red-500/20"
                  : touched.name && !errors.name
                  ? "border-emerald-500"
                  : "border-border-theme focus:border-secondary-theme"
              }`}
            />
            {touched.name && errors.name && (
              <span className="text-xs text-red-500 mt-1.5 block font-bold uppercase tracking-wider">{errors.name}</span>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block font-sans text-xs font-semibold tracking-widest text-text-theme/75 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="HELLO@EXAMPLE.COM"
              className={`w-full bg-surface-theme border rounded-xl px-4 py-3 text-sm text-text-theme font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-secondary-theme/40 transition-all ${
                touched.email && errors.email
                  ? "border-red-500 ring-1 ring-red-500/20"
                  : touched.email && !errors.email
                  ? "border-emerald-500"
                  : "border-border-theme focus:border-secondary-theme"
              }`}
            />
            {touched.email && errors.email && (
              <span className="text-xs text-red-500 mt-1.5 block font-bold uppercase tracking-wider">{errors.email}</span>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label className="block font-sans text-xs font-semibold tracking-widest text-text-theme/75 mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={() => handleBlur("message")}
              placeholder="HOW CAN I HELP YOU BUILD?"
              className={`w-full bg-surface-theme border rounded-xl px-4 py-3 text-sm text-text-theme font-medium tracking-wide h-32 focus:outline-none focus:ring-2 focus:ring-secondary-theme/40 transition-all resize-none ${
                touched.message && errors.message
                  ? "border-red-500 ring-1 ring-red-500/20"
                  : touched.message && !errors.message
                  ? "border-emerald-500"
                  : "border-border-theme focus:border-secondary-theme"
              }`}
            />
            {touched.message && errors.message && (
              <span className="text-xs text-red-500 mt-1.5 block font-bold uppercase tracking-wider">{errors.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-primary-theme text-on-primary-theme font-semibold py-3.5 rounded-full hover:bg-secondary-theme hover:text-white hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Delivering message...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Transmit Message</span>
              </>
            )}
          </button>
        </form>

        {/* Social Links Panel */}
        <div className="flex justify-center gap-10 border-t border-border-theme/40 pt-10">
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-text-theme hover:scale-105 transition-all flex flex-col items-center gap-1.5 group"
          >
            <div className="w-11 h-11 border border-border-theme rounded-full bg-surface-theme flex items-center justify-center group-hover:bg-secondary-theme group-hover:text-white transition-all shadow-sm">
              <Linkedin className="w-4.5 h-4.5" />
            </div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-variant">LinkedIn</span>
          </a>

          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-text-theme hover:scale-105 transition-all flex flex-col items-center gap-1.5 group"
          >
            <div className="w-11 h-11 border border-border-theme rounded-full bg-surface-theme flex items-center justify-center group-hover:bg-secondary-theme group-hover:text-white transition-all shadow-sm">
              <Github className="w-4.5 h-4.5" />
            </div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-variant">GitHub</span>
          </a>

          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-text-theme hover:scale-105 transition-all flex flex-col items-center gap-1.5 group"
          >
            <div className="w-11 h-11 border border-border-theme rounded-full bg-surface-theme flex items-center justify-center group-hover:bg-secondary-theme group-hover:text-white transition-all shadow-sm">
              <Instagram className="w-4.5 h-4.5" />
            </div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-variant">Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}
