import { useState } from 'react';
import AnimatedSection from './AnimatedSection';

const WEB3FORMS_KEY = '75487d63-0561-4f15-8773-4d6505e0c8aa';

export default function Contact() {
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('.send-btn');
    const data = new FormData(form);

    data.append('access_key', WEB3FORMS_KEY);
    data.append('from_name', 'Anonymous');
    data.append('subject', 'New message from your portfolio');

    setSending(true);
    setStatus('');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();

      if (json.success) {
        btn.textContent = 'Sent ✓';
        setStatus('Thanks! Your message has been sent.');
        form.reset();
      } else {
        btn.textContent = 'Send Message';
        setStatus(json.message || 'Failed to send. Please try again.');
      }
    } catch {
      btn.textContent = 'Send Message';
      setStatus('Network error. Please try again.');
    } finally {
      setSending(false);
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = 'Send Message';
      }, 1500);
    }
  };

  return (
    <AnimatedSection className="contact" id="Contact-Me">
      <h2 className="heading">
        Any questions? <span>Message me</span>
      </h2>

      <div className="contact-info">
        <div className="contact-pill">
          <i className="bx bx-envelope" />
          <span>hoseajameszacarias@gmail.com</span>
        </div>
        <div className="contact-pill">
          <i className="bx bx-phone" />
          <span>09498225352/09661686469</span>
        </div>
      </div>

      <form className="contact-form contact-grid" onSubmit={handleSubmit}>
        <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="honeypot" />

        <div className="contact-left">
          <input type="text" name="name" placeholder="Full Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="tel" name="phone" placeholder="Phone Number" />
          <input type="text" name="topic" placeholder="Subject" required />
        </div>

        <div className="contact-right">
          <textarea name="message" placeholder="Your Message" rows={12} required />
        </div>

        <button type="submit" className="send-btn" disabled={sending}>
          Send Message
        </button>
      </form>

      {status && <p className="contact-status">{status}</p>}
    </AnimatedSection>
  );
}
