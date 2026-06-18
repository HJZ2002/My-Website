import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../data/constants';

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Home() {
  return (
    <section className="home" id="home">
      <div className="home-content">
        <motion.h1 {...fadeIn(0.1)}>
          Greetings👋 I&apos;m <span>Hosea James Zacarias</span>
        </motion.h1>
        <motion.h3 {...fadeIn(0.2)}>
          I&apos;m a <span>Computer Science Student,</span>
        </motion.h3>
        <motion.p {...fadeIn(0.3)}>
          The world of technology revolves around us and being able to understand this course means
          I am ready to spend my skills to the outside world and passion in programming and being a
          Developer and Web-Developer a lot of things I want to try in the real world and how it
          really works and understanding its fundamentals and its concepts.
        </motion.p>

        <motion.div className="social-icons" {...fadeIn(0.4)}>
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={link.label}
            >
              <i className={`bx ${link.icon}`} />
            </a>
          ))}
        </motion.div>

        <motion.div className="btn-group" {...fadeIn(0.5)}>
          <a href="#Contact-Me" className="gradient-btn">
            Contact Me
          </a>
        </motion.div>
      </div>

      <motion.div
        className="home-img"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.img
          src="/images/Avatar.jpg"
          alt="Hosea James Zacarias"
          loading="eager"
          fetchPriority="high"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
