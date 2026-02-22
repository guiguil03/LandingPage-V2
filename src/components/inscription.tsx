import { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import { gsap } from "gsap";
import { createUser, checkEmailExists } from "../hooks/Auth";
import { sendWelcomeEmail } from "../services/emailService";

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  runningLevel: "débutant" | "intermédiaire" | "avancé";
}

export interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

(() => {
  try {
    Modal.setAppElement("#root");
  } catch {
    // Silently fail
  }
})();

const initialFormData: UserFormData = {
  firstName: "",
  lastName: "",
  email: "",
  runningLevel: "débutant",
};

const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
  const [formData, setFormData] = useState<UserFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const totalSteps = 2;

  const formCardRef = useRef<HTMLDivElement>(null);
  const successCardRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const prevStepRef = useRef(1);

  /* ── Reset + animate in on open ── */
  useEffect(() => {
    if (!isOpen) return;
    const form = formCardRef.current;
    const success = successCardRef.current;
    const s1 = step1Ref.current;
    const s2 = step2Ref.current;
    if (!form || !success || !s1 || !s2) return;

    gsap.set(success, { display: "none", opacity: 0 });
    gsap.set(form, { display: "block", opacity: 0, y: 20, scale: 0.98 });
    gsap.set(s1, { display: "block", opacity: 1, x: 0 });
    gsap.set(s2, { display: "none", opacity: 0 });
    prevStepRef.current = 1;

    gsap.to(form, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power2.out" });
  }, [isOpen]);

  /* ── Step transition ── */
  useEffect(() => {
    const s1 = step1Ref.current;
    const s2 = step2Ref.current;
    if (!s1 || !s2) return;

    const from = prevStepRef.current;
    if (from === step) return;
    prevStepRef.current = step;

    const outEl = from === 1 ? s1 : s2;
    const inEl = step === 1 ? s1 : s2;
    const xOut = step > from ? -20 : 20;
    const xIn = step > from ? 20 : -20;

    gsap.to(outEl, {
      opacity: 0, x: xOut, duration: 0.2,
      onComplete: () => {
        gsap.set(outEl, { display: "none" });
        gsap.set(inEl, { display: "block", opacity: 0, x: xIn });
        gsap.to(inEl, { opacity: 1, x: 0, duration: 0.25 });
      },
    });
  }, [step]);

  /* ── Success toggle ── */
  useEffect(() => {
    const form = formCardRef.current;
    const success = successCardRef.current;
    if (!form || !success) return;

    if (showSuccessAlert) {
      gsap.to(form, {
        opacity: 0, scale: 0.95, duration: 0.2,
        onComplete: () => {
          gsap.set(form, { display: "none" });
          gsap.set(success, { display: "block", opacity: 0, scale: 0.95, y: 10 });
          gsap.to(success, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
        },
      });
    }
  }, [showSuccessAlert]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkEmail = async () => {
    if (formData.email.trim() === "") {
      setErrorMessage("Veuillez entrer une adresse email.");
      return false;
    }
    try {
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setErrorMessage("Cet email est déjà utilisé.");
        return false;
      }
      setErrorMessage("");
      return true;
    } catch (error) {
      console.error("Erreur vérification email:", error);
      setErrorMessage("Erreur de vérification. Réessayez.");
      return false;
    }
  };

  const sendWelcomeEmailToUser = async (firstName: string, email: string, runningLevel: string) => {
    try {
      return await sendWelcomeEmail(firstName, email, runningLevel);
    } catch (error) {
      console.error("Erreur envoi email:", error);
      return false;
    }
  };

  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
    setSuccessMessage("");
    onClose();
    setFormData(initialFormData);
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < totalSteps) {
      if (step === 1) {
        const isEmailValid = await checkEmail();
        if (!isEmailValid) return;
      }
      setStep(step + 1);
      return;
    }
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      await createUser(formData);
      const emailSent = await sendWelcomeEmailToUser(formData.firstName, formData.email, formData.runningLevel);
      setSuccessMessage(
        emailSent
          ? `Bienvenue ${formData.firstName} ! Un email a été envoyé à ${formData.email}.`
          : `Bienvenue ${formData.firstName} ! On a hâte de te voir courir.`
      );
      setShowSuccessAlert(true);
    } catch (error: unknown) {
      console.error("Erreur inscription:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Erreur lors de l'inscription. Réessayez."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-[#2a2826] border border-[#3a3836] text-white text-[15px] placeholder:text-white/40 rounded-2xl px-4 py-3.5 outline-none focus:border-primary-500/50 transition-colors duration-200";

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="w-full max-w-md mx-auto outline-none"
      overlayClassName="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      style={{
        content: {
          position: "relative",
          top: "auto", left: "auto", right: "auto", bottom: "auto",
          border: "none", padding: "0", background: "none",
          maxWidth: "460px", width: "100%",
        },
      }}
    >
      <div className="relative">
        {/* ── Success card ── */}
        <div
          ref={successCardRef}
          style={{ display: "none" }}
          className="bg-[#353331] border border-[#2E2E2E] rounded-[32px] p-8 sm:p-10"
        >
          <div className="w-14 h-14 rounded-full bg-primary-500/15 flex items-center justify-center mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className="text-primary-400"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">C'est fait !</h2>
          <p className="text-white text-[15px] leading-relaxed mb-8">{successMessage}</p>
          <button
            onClick={handleCloseSuccessAlert}
            className="w-full py-3.5 rounded-2xl text-[15px] font-semibold text-white bg-primary-500 hover:bg-primary-400 transition-colors duration-200"
          >
            Fermer
          </button>
        </div>

        {/* ── Form card ── */}
        <div
          ref={formCardRef}
          className="bg-[#353331] border border-[#2E2E2E] rounded-[32px] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 pt-8 sm:px-10 sm:pt-10">
            <h2 className="text-2xl font-bold text-white">Rejoins UNIFY</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center transition-colors duration-200"
              aria-label="Fermer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="px-8 sm:px-10 mt-6">
            <div className="h-[2px] w-full bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full"
                style={{
                  width: `${(step / totalSteps) * 100}%`,
                  transition: "width 0.4s ease-out",
                }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[11px] text-white/50">Étape {step} sur {totalSteps}</span>
              <span className="text-[11px] text-white/50">{step === 1 ? "Identité" : "Profil"}</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8 sm:px-10 sm:pb-10 pt-6">
            {errorMessage && (
              <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm">
                {errorMessage}
              </div>
            )}

            {/* Step 1 */}
            <div ref={step1Ref} className="space-y-4">
              <div>
                <label className="block text-[13px] text-white mb-2">Prénom</label>
                <input
                  type="text" name="firstName" value={formData.firstName}
                  onChange={handleChange} required placeholder="Ton prénom"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[13px] text-white mb-2">Nom</label>
                <input
                  type="text" name="lastName" value={formData.lastName}
                  onChange={handleChange} required placeholder="Ton nom"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[13px] text-white mb-2">Email</label>
                <input
                  type="email" name="email" value={formData.email}
                  onChange={handleChange} required placeholder="ton@email.com"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Step 2 */}
            <div ref={step2Ref} style={{ display: "none" }} className="space-y-4">
              <div>
                <label className="block text-[13px] text-white mb-2">Ton niveau</label>
                <select
                  name="runningLevel" value={formData.runningLevel}
                  onChange={handleChange} required
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="débutant">Débutant</option>
                  <option value="intermédiaire">Intermédiaire</option>
                  <option value="avancé">Avancé</option>
                </select>
              </div>
              <p className="text-[13px] text-white/60 leading-relaxed pt-2">
                En t'inscrivant, tu acceptes nos{" "}
                <a href="/conditions-generales" className="text-white/70 hover:text-white underline underline-offset-2">CGU</a>
                {" "}et notre{" "}
                <a href="/politique-de-confidentialite" className="text-white/70 hover:text-white underline underline-offset-2">politique de confidentialité</a>.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-8">
              {step > 1 && (
                <button
                  type="button" onClick={() => setStep(step - 1)}
                  className="py-3.5 px-5 rounded-2xl text-[15px] font-medium text-white border border-white/[0.08] hover:border-white/20 transition-all duration-200"
                >
                  Retour
                </button>
              )}
              <button
                type="submit" disabled={isSubmitting}
                className="flex-1 py-3.5 rounded-2xl text-[15px] font-semibold text-white bg-primary-500 hover:bg-primary-400 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting && (
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {step < totalSteps ? "Continuer" : "S'inscrire"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default SignupModal;
