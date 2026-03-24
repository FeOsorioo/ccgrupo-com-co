import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, MapPin, Mail, Phone, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useLang } from '../../i18n';

const services = [
  '01 — CX – Experiencia del Cliente',
  '02 — Leads & Ventas',
  '03 — Agentes Autónomos',
  '04 — Digital Studio',
];

interface FormState {
  nombre: string; empresa: string; email: string;
  telefono: string; servicio: string; mensaje: string;
}

const empty: FormState = { nombre: '', empresa: '', email: '', telefono: '', servicio: '', mensaje: '' };

interface Props { onBack: () => void; }

export default function ContactModule({ onBack }: Props) {
  const { t } = useLang();
  const ct = t.contact;

  const [form, setForm]         = useState<FormState>(empty);
  const [errors, setErrors]     = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]   = useState(false);

  const contactInfo = [
    { icon: MapPin, label: ct.infoLabels.location, value: 'Cra. 20 #133 – 74, La Calleja', sub: ct.infoSubs.location },
    { icon: Mail,   label: ct.infoLabels.email,    value: 'info@ccgrupo.com.co',            sub: ct.infoSubs.email   },
    { icon: Phone,  label: ct.infoLabels.phone,    value: '(601) 7443732',                  sub: ct.infoSubs.phone   },
    { icon: Clock,  label: ct.infoLabels.schedule, value: 'Lun – Vie · 8:00 – 18:00',      sub: ct.infoSubs.schedule },
  ];

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.nombre.trim())   next.nombre   = ct.errors.nombre;
    if (!form.empresa.trim())  next.empresa  = ct.errors.empresa;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = ct.errors.email;
    if (!form.telefono.trim()) next.telefono = ct.errors.telefono;
    if (!form.servicio)        next.servicio = ct.errors.servicio;
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
    await new Promise(r => setTimeout(r, 1400));
    setSending(false);
    setSubmitted(true);
  };

  const inputBase =
    'w-full bg-white/5 border border-white/10 text-white placeholder-gray-300/40 font-body text-sm px-5 py-3.5 focus:outline-none focus:border-teal/60 focus:bg-white/8 transition-all duration-200';

  return (
    <div className="min-h-screen bg-navy-deep text-white relative overflow-x-hidden">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onBack}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-gray-200 hover:text-teal transition-colors group"
      >
        <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
        {t.back}
      </motion.button>

      <div className="max-w-7xl mx-auto px-6 md:px-14 pt-28 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="font-mono text-[0.6rem] tracking-[0.35em] uppercase text-teal mb-4">
            {ct.label}
          </div>
          <h1 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[1.05] mb-6">
            {ct.headingPre}
            <br />
            <em className="italic text-teal">{ct.headingEm}</em>
          </h1>
          <p className="font-body text-base text-gray-200 max-w-lg leading-relaxed">
            {ct.desc}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 items-start">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            {contactInfo.map(({ icon: Icon, label, value, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.07 }}
                className="flex items-start gap-4 p-5 border border-white/8 bg-white/[0.02] hover:border-teal/30 hover:bg-white/[0.04] transition-all duration-300 group"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-teal/30 text-teal group-hover:bg-teal/10 transition-colors shrink-0">
                  <Icon size={16} />
                </div>
                <div>
                  <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-gray-300 mb-0.5">{label}</div>
                  <div className="font-body text-sm text-white font-medium">{value}</div>
                  <div className="font-mono text-[0.55rem] text-gray-300 mt-0.5">{sub}</div>
                </div>
              </motion.div>
            ))}

            <div className="pt-6 border-t border-white/8">
              <p className="font-body text-sm font-light text-gray-200 leading-relaxed">
                {ct.commercial}
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
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
                  className="flex flex-col items-center justify-center text-center py-20 px-8 border border-teal/20 bg-teal/5"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="w-16 h-16 flex items-center justify-center border border-teal/40 text-teal mb-8"
                  >
                    <CheckCircle size={32} />
                  </motion.div>
                  <h2 className="font-display text-3xl mb-4">{ct.success.title}</h2>
                  <p className="font-body text-gray-200 text-sm leading-relaxed max-w-sm mb-10">
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
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label={ct.fields.nombre} error={errors.nombre}>
                      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Juan García" className={inputBase} />
                    </Field>
                    <Field label={ct.fields.empresa} error={errors.empresa}>
                      <input name="empresa" value={form.empresa} onChange={handleChange} placeholder="Mi Empresa S.A.S." className={inputBase} />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label={ct.fields.email} error={errors.email}>
                      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="juan@empresa.com" className={inputBase} />
                    </Field>
                    <Field label={ct.fields.telefono} error={errors.telefono}>
                      <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} placeholder="+57 300 000 0000" className={inputBase} />
                    </Field>
                  </div>

                  <Field label={ct.fields.servicio} error={errors.servicio}>
                    <select name="servicio" value={form.servicio} onChange={handleChange} className={`${inputBase} appearance-none cursor-pointer`}>
                      <option value="" disabled className="bg-navy-deep">{ct.fields.selectPh}</option>
                      {services.map(s => <option key={s} value={s} className="bg-navy-deep">{s}</option>)}
                    </select>
                  </Field>

                  <Field label={ct.fields.mensaje} error={errors.mensaje}>
                    <textarea name="mensaje" value={form.mensaje} onChange={handleChange} rows={5} placeholder={ct.fields.messagePh} className={`${inputBase} resize-none`} />
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
                    <div className="absolute inset-0 bg-gradient-to-br from-teal to-teal-bright opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>

                  <p className="font-mono text-[0.52rem] tracking-[0.15em] text-gray-300 text-center">
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

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-gray-200">{label}</label>
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
