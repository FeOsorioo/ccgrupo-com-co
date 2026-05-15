import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Send, CheckCircle, AlertCircle, XCircle, Briefcase } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLang } from '../../i18n';

const EJ_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EJ_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EJ_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_CONFIGURED = !!(EJ_SERVICE && EJ_TEMPLATE && EJ_KEY &&
  !EJ_SERVICE.includes('xxxxxxx'));

interface FormState {
  nombre: string;
  telefono: string;
  email: string;
  mensaje: string;
}

const empty: FormState = { nombre: '', telefono: '', email: '', mensaje: '' };

interface Props { onBack: () => void; }

export default function CareersModule({ onBack }: Props) {
  const { t } = useLang();
  const ca = t.careers;

  useEffect(() => {
    const prev = document.title;
    document.title = ca.pageTitle;
    return () => { document.title = prev; };
  }, [ca.pageTitle]);

  const [form, setForm]           = useState<FormState>(empty);
  const [errors, setErrors]       = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const [sendError, setSendError] = useState(false);

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.nombre.trim())   next.nombre   = ca.errors.nombre;
    if (!form.telefono.trim()) next.telefono = ca.errors.telefono;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = ca.errors.email;
    }
    if (!form.mensaje.trim() || form.mensaje.trim().length < 20) {
      next.mensaje = ca.errors.mensaje;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setSendError(false);

    if (EMAILJS_CONFIGURED) {
      try {
        await emailjs.send(
          EJ_SERVICE!,
          EJ_TEMPLATE!,
          {
            from_name:  form.nombre,
            company:    'Postulación - Trabajo con CCG',
            from_email: form.email,
            phone:      form.telefono,
            service:    'Postulación de empleo',
            message:    form.mensaje,
            reply_to:   form.email,
          },
          EJ_KEY!
        );
        setSubmitted(true);
      } catch {
        setSendError(true);
      } finally {
        setSending(false);
      }
    } else {
      const subject = encodeURIComponent(`${ca.mailto.subject} - ${form.nombre}`);
      const body    = encodeURIComponent(
        `${ca.mailto.name}: ${form.nombre}\n${ca.mailto.phone}: ${form.telefono}\nEmail: ${form.email}\n\n${form.mensaje}`
      );
      window.location.href = `mailto:talento@ccgrupo.com.co?subject=${subject}&body=${body}`;
      setSending(false);
      setSubmitted(true);
    }
  };

  const inputBase =
    'contact-module-field w-full bg-white/5 border border-white/10 text-white placeholder-gray-300/40 font-body text-sm px-5 py-3.5 rounded-lg focus:outline-none focus:border-teal/60 focus:bg-white/8 transition-all duration-200';

  return (
    <div className="contact-module-root min-h-screen bg-navy-deep text-white relative overflow-x-hidden">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onBack}
        className="contact-module-back fixed top-4 left-4 sm:top-6 sm:left-6 z-50 flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-gray-200 hover:text-teal transition-colors group bg-navy-deep/70 backdrop-blur-md px-3 py-2 rounded-full border border-white/10"
      >
        <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
        {t.back}
      </motion.button>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-14 pt-24 sm:pt-28 pb-20 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.35em] uppercase text-teal mb-4">
            <Briefcase size={14} strokeWidth={1.8} />
            {ca.label}
          </div>
          <h1 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.05] mb-5">
            {ca.headingPre}{' '}
            <em className="italic text-teal not-italic-mobile">{ca.headingEm}</em>
          </h1>
          <p className="font-body text-base text-gray-200 max-w-xl mx-auto leading-relaxed">
            {ca.desc}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="contact-module-success flex flex-col items-center justify-center text-center py-14 sm:py-20 px-5 sm:px-8 border border-teal/20 bg-teal/5 rounded-3xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="w-16 h-16 flex items-center justify-center border border-teal/40 text-teal mb-8 rounded-full"
                >
                  <CheckCircle size={32} />
                </motion.div>
                <h2 className="font-display text-2xl sm:text-3xl mb-4">{ca.success.title}</h2>
                <p className="font-body text-gray-200 text-sm leading-relaxed max-w-sm mb-10 px-2">
                  {ca.success.pre}<strong className="text-white">{form.nombre.split(' ')[0]}</strong>{ca.success.post}
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm(empty); }}
                  className="font-mono text-[0.6rem] tracking-[0.2em] uppercase px-8 py-3 border border-teal/40 text-teal hover:bg-teal hover:text-navy-deep transition-all duration-300 rounded-lg"
                >
                  {ca.success.again}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="contact-module-form space-y-5 min-w-0"
              >
                <Field label={ca.fields.nombre} error={errors.nombre} htmlFor="ca-nombre">
                  <input
                    id="ca-nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder={ca.fields.nombrePh}
                    className={inputBase}
                  />
                </Field>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <Field label={ca.fields.telefono} error={errors.telefono} htmlFor="ca-telefono">
                    <input
                      id="ca-telefono"
                      type="tel"
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder={ca.fields.telefonoPh}
                      className={inputBase}
                    />
                  </Field>
                  <Field label={ca.fields.email} error={errors.email} htmlFor="ca-email">
                    <input
                      id="ca-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={ca.fields.emailPh}
                      className={inputBase}
                    />
                  </Field>
                </div>

                <Field label={ca.fields.mensaje} error={errors.mensaje} htmlFor="ca-mensaje">
                  <textarea
                    id="ca-mensaje"
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    rows={6}
                    placeholder={ca.fields.mensajePh}
                    className={`${inputBase} resize-none`}
                  />
                </Field>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full flex items-center justify-center gap-3 font-mono text-[0.65rem] tracking-[0.25em] uppercase px-10 py-4 bg-gradient-to-br from-teal-dark to-teal text-white overflow-hidden rounded-lg transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,180,216,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">{sending ? ca.fields.sending : ca.fields.submit}</span>
                  {!sending && <Send size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />}
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-teal to-teal-bright opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                <AnimatePresence>
                  {sendError && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 font-mono text-[0.55rem] text-red-400 justify-center"
                    >
                      <XCircle size={12} />
                      {ca.sendError}
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="contact-module-privacy font-mono text-[0.52rem] tracking-[0.15em] text-gray-300 text-center max-w-md mx-auto">
                  {ca.fields.privacyNote}
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ label, error, children, htmlFor }: { label: string; error?: string; children: React.ReactNode; htmlFor?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="contact-module-label font-mono text-[0.55rem] tracking-[0.2em] uppercase text-gray-200">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1.5 font-mono text-[0.55rem] text-red-400"
          >
            <AlertCircle size={10} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
