import { useRef, useState } from 'react';
import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
import.meta.env.VITE_EMAILJS_SERVICE_ID;
import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
import emailjs from '@emailjs/browser';
import './app.css';

export default function Contact() {
  const handleSubmit = (e) => {
  e.preventDefault()
  const name = formRef.current.name.value.trim()
  const email = formRef.current.email.value.trim()
  const message = formRef.current.message.value.trim()
  
  // Layer 3: Extra checks
  if (!name || !email || !message) {
    setStatus('error')
    return
  }
  
  // Extra email check (browser type="email" already does this, but double-check)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    setStatus('error')
    return
  }
  setStatus('sending')

  emailjs.sendForm(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    formRef.current,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  )
  .then(() => setStatus('sent'))
  .catch(() => setStatus('error'))
}
    const formRef = useRef()
    const [status, setStatus] = useState('idle')
  return (
    <section className="min-h-screen p-6 pb-12">  {/* pt-24 clears fixed header */}
      <div className="text-left p-6 relative max-w-6xl mx-auto">
        <div className="h-16 mt-4 flex text-6xl items-center justify-center text-[#FF3831]">
          ~~~~~
        </div>
        <div className='flex'>
        <div className="w-full md:w-1/2 mr-6">hello</div>
        <div className="w-full md:w-1/2 mb-12 gap-3 rounded-lg border border-white/20 px-10 py-10">
        <h2 className="text-5xl md:text-6xl font-bold text-center text-[#FF3831] mt-4 mb-12 vintage-font">
          Contact Me
        </h2>
        <form ref={formRef} onSubmit={handleSubmit}>
            <div>
            <label className='block mb-2'>Name</label>
            <input name="name" type="text" required className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-white/20"/>
            </div>
            <div>
            <label className='block mb-2'>Email</label>
            <input name="email" type="email" required className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-white/20"/>
            </div>
            <div>
            <label className='block mb-2'>Message</label>
            <textarea name="message" required className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-white/20"/>
            </div>
        </form>
        <div className="mt-6 text-center">
       <button onClick={handleSubmit} disabled={status === 'sending'} 
          className="mt-4 px-6 py-3 rounded-lg 
          group relative overflow-hidden
          border border-white/40
          bg-[#FF3831]
          text-[#fffdd0]
          outline-none appearance-none
          cursor-pointer
          transition-all duration-200"
      >
        {/* Fill layer - slides in from left */}
        <span className={`
          absolute inset-0
          bg-[#fffdc9]
          -translate-x-full group-hover:translate-x-0
          transition-transform duration-200 ease-out z-0
        `} />
        
        {/* Text layer */}
        <span className={`relative z-10 transition-colors duration-200 vintage-font text-2xl
          group-hover:text-[#FF3831]`}>
          {status === 'idle' && 'Send Message'}
          {status === 'sending' && 'Sending...'}
          {status === 'sent' && '✓ Sent!'}
          {status === 'error' && (
          <p className="text-red-500 text-sm mt-2">
            Please fill all fields with valid information.
          </p>
        )}
        </span>
    </button>
        </div>

        </div>
        </div>
        <div className="mt-4 space-y-4">
          <div><img src="/ME6.png" alt="Contact" className="w-full h-auto" /></div>
        </div>
      </div>
    </section>
  );
}