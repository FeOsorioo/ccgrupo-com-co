import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, MapPin, Mail, Phone, Clock, Send, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLang } from '../../i18n';

const EJ_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EJ_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EJ_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_CONFIGURED = !!(EJ_SERVICE && EJ_TEMPLATE && EJ_KEY &&
  !EJ_SERVICE.includes('xxxxxxx'));

interface FormState {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  servicio: string;
  sector: string;
  mensaje: string;
}

const empty: FormState = { nombre: '', empresa: '', email: '', telefono: '', servicio: '', sector: '', mensaje: '' };

interface Props { onBack: () => void; }

export default function ContactModule({ onBack }: Props) {
  const { t } = useLang();
  const ct = t.contact;

  const serviceOrder = ['01', '02', '03', '04', '05', '06'] as const;
  const serviceOptions = serviceOrder.map((id) => `${id} - ${t.services.items[id].title}`);
  // Sector list comes from the Sectors section data so it always stays in sync.
  const sectorOptions = [
    ...t.sectors.items.map((it) => it.name),
    ct.fields.sectorOther,
  ];

  useEffect(() => {
    const prev = document.title;
    document.title = ct.pageTitle;
    return () => { document.title = prev; };
  }, [ct.pageTitle]);

  const [form, setForm]           = useState<FormState>(empty);
  const [errors, setErrors]       = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const [sendError, setSendError] = useState(false);

  // If the user landed here from a sector popup CTA, pre-fill the sector
  // select with the sector they were reading about.
  useEffect(() => {
    try {
      const prefill = sessionStorage.getItem('ccg.prefillSector');
      if (prefill) {
        setForm(prev => ({ ...prev, sector: prefill }));
        sessionStorage.removeItem('ccg.prefillSector');
      }
    } catch { /* sessionStorage unavailable — silently skip */ }
  }, []);

  const contactInfo = [
    { icon: MapPin, label: ct.infoLabels.location, value: ct.info.address, sub: ct.infoSubs.location },
    { icon: Mail,   label: ct.infoLabels.email,    value: ct.info.email,   sub: ct.infoSubs.email   },
    { icon: Phone,  label: ct.infoLabels.phone,    value: ct.info.phone,   sub: ct.infoSubs.phone   },
    { icon: Clock,  label: ct.infoLabels.schedule, value: ct.scheduleValue, sub: ct.infoSubs.schedule },
  ];

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.nombre.trim())   next.nombre = ct.errors.nombre;
    if (!form.empresa.trim())  next.empresa = ct.errors.empresa;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = ct.errors.email;
    if (!form.telefono.trim()) next.telefono = ct.errors.telefono;
    if (!form.servicio)        next.servicio = ct.errors.servicio;
    if (!form.sector)          next.sector = ct.errors.sector;
    if (!form.mensaje.trim() || form.mensaje.trim().length < 20) next.mensaje = ct.errors.mensaje;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) setErrors(prev => ({ ...prev, [name]: undefined }));
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
            company:    form.empresa,
            from_email: form.email,
            phone:      form.telefono,
            service:    form.servicio,
            sector:     form.sector,
            message:    `[${ct.mailto.sector}: ${form.sector}]\n\n${form.mensaje}`,
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
      const subject = encodeURIComponent(`${ct.mailto.subjectPrefix} - ${form.servicio} (${form.sector})`);
      const body    = encodeURIComponent(
        `${ct.mailto.name}: ${form.nombre}\n${ct.mailto.company}: ${form.empresa}\nEmail: ${form.email}\n${ct.mailto.phone}: ${form.telefono}\n${ct.mailto.service}: ${form.servicio}\n${ct.mailto.sector}: ${form.sector}\n\n${form.mensaje}`
      );
      window.location.href = `mailto:commercial@ccgrupo.com.co?subject=${subject}&body=${body}`;
      setSending(false);
      setSubmitted(true);
    }
  };

  const inputBase =
    'contact-module-field w-full bg-white/5 border border-white/10 text-white placeholder-gray-300/40 font-body text-sm px-5 py-3.5 focus:outline-none focus:border-teal/60 focus:bg-white/8 transition-all duration-200';

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-14 pt-24 sm:pt-28 pb-20 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16"
        >
          <div className="font-mono text-[0.6rem] tracking-[0.35em] uppercase text-teal mb-4">
            {ct.label}
          </div>
          <h1 className="font-display text-[clamp(2.4rem,6vw,5.5rem)] leading-[1.03] mb-6 max-w-4xl">
            {ct.headingPre}
            <br />
            <em className="italic text-teal">{ct.headingEm}</em>
          </h1>
          <p className="font-body text-base text-gray-200 max-w-xl leading-relaxed">
            {ct.desc}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.45fr] gap-8 sm:gap-10 xl:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 sm:space-y-4"
          >
            {contactInfo.map(({ icon: Icon, label, value, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.07 }}
                className="contact-module-card flex items-start gap-4 p-3 sm:p-5 border border-white/8 bg-white/[0.02] hover:border-teal/30 hover:bg-white/[0.04] transition-all duration-300 group rounded-2xl min-w-0"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-teal/30 text-teal group-hover:bg-teal/10 transition-colors shrink-0">
                  <Icon size={16} />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-gray-300 mb-0.5">{label}</div>
                  <div className="font-body text-sm text-white font-medium break-words">{value}</div>
                  <div className="font-mono text-[0.55rem] text-gray-300 mt-0.5 break-words">{sub}</div>
                </div>
              </motion.div>
            ))}

            <div className="contact-module-note pt-5 sm:pt-6 border-t border-white/8">
              <p className="font-body text-sm font-light text-gray-200 leading-relaxed">
                {ct.commercial}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
                    className="w-16 h-16 flex items-center justify-center border border-teal/40 text-teal mb-8"
                  >
                    <CheckCircle size={32} />
                  </motion.div>
                  <h2 className="font-display text-2xl sm:text-3xl mb-4">{ct.success.title}</h2>
                  <p className="font-body text-gray-200 text-sm leading-relaxed max-w-sm mb-10 px-2">
                    {ct.success.pre} <strong className="text-white">{form.nombre.split(' ')[0]}</strong>{ct.success.post}
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm(empty); }}
                    className="font-mono text-[0.6rem] tracking-[0.2em] uppercase px-8 py-3 border border-teal/40 text-teal hover:bg-teal hover:text-navy-deep transition-all duration-300"
                  >
                    {ct.success.again}
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
                  className="contact-module-form space-y-4 sm:space-y-5 min-w-0"
                >
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <Field label={ct.fields.nombre} error={errors.nombre} htmlFor="f-nombre">
                      <input
                        id="f-nombre"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        placeholder={ct.placeholders.nombre}
                        className={inputBase}
                      />
                    </Field>
                    <Field label={ct.fields.empresa} error={errors.empresa} htmlFor="f-empresa">
                      <input
                        id="f-empresa"
                        name="empresa"
                        value={form.empresa}
                        onChange={handleChange}
                        placeholder={ct.placeholders.empresa}
                        className={inputBase}
                      />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <Field label={ct.fields.email} error={errors.email} htmlFor="f-email">
                      <input id="f-email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="name@company.com" className={inputBase} />
                    </Field>
                    <Field label={ct.fields.telefono} error={errors.telefono} htmlFor="f-telefono">
                      <input id="f-telefono" type="tel" name="telefono" value={form.telefono} onChange={handleChange} placeholder="+57 300 000 0000" className={inputBase} />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <Field label={ct.fields.servicio} error={errors.servicio} htmlFor="f-servicio">
                      <select id="f-servicio" name="servicio" value={form.servicio} onChange={handleChange} className={`${inputBase} appearance-none cursor-pointer`}>
                        <option value="" disabled className="bg-navy-deep">{ct.fields.selectPh}</option>
                        {serviceOptions.map((s) => <option key={s} value={s} className="bg-navy-deep">{s}</option>)}
                      </select>
                    </Field>
                    <Field label={ct.fields.sector} error={errors.sector} htmlFor="f-sector">
                      <select id="f-sector" name="sector" value={form.sector} onChange={handleChange} className={`${inputBase} appearance-none cursor-pointer`}>
                        <option value="" disabled className="bg-navy-deep">{ct.fields.sectorPh}</option>
                        {sectorOptions.map((s) => <option key={s} value={s} className="bg-navy-deep">{s}</option>)}
                      </select>
                    </Field>
                  </div>

                  <Field label={ct.fields.mensaje} error={errors.mensaje} htmlFor="f-mensaje">
                    <textarea id="f-mensaje" name="mensaje" value={form.mensaje} onChange={handleChange} rows={5} placeholder={ct.fields.messagePh} className={`${inputBase} resize-none`} />
                  </Field>

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full flex items-center justify-center gap-3 font-mono text-[0.65rem] tracking-[0.25em] uppercase px-10 py-4 bg-gradient-to-br from-teal-dark to-teal text-white overflow-hidden transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,180,216,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10">{sending ? ct.fields.sending : ct.fields.submit}</span>
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
                        {ct.sendError}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <p className="contact-module-privacy font-mono text-[0.52rem] tracking-[0.15em] text-gray-300 text-center max-w-md mx-auto">
                    {ct.fields.privacyNote}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
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
