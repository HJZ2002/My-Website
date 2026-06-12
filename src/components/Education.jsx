import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { INTERESTS } from '../data/constants';

export default function Education() {
  return (
    <AnimatedSection className="edu-interest" id="Education">
      <div className="ei-wrap">
        <motion.div
          className="ei-card education-card"
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <h1 className="ei-title">
            My <span>Education</span>
          </h1>
          <div className="ei-card__icon">
            <i className="bx bxs-graduation" />
          </div>
          <h4 className="ei-card__title">BS in Computer Science</h4>
          <p className="ei-card__sub">Mapua Malayan Colleges Mindanao 2022–2026</p>
          <div className="ei-logo">
            <img src="/images/images.png" alt="School logo" loading="lazy" />
          </div>
          <ul className="ei-list">
            <li>1st Year Dean&apos;s Lister</li>
            <li>2nd Year Dean&apos;s Lister</li>
            <li>3rd Year Dean&apos;s Lister</li>
            <li>
              Graduated 2026 — <span>Cum Laude</span>
            </li>
          </ul>
        </motion.div>
       <div className="ei-connector" aria-hidden="true">
  <span className="ei-pulse" />
</div>
        <motion.div
          className="ei-card interest-card"
          id="Interest"
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <h1 className="ei-title">
            My <span>Interests</span>
          </h1>
          <div className="ei-card__icon">
            <i className="bx bx-bulb" />
          </div>
          <h4 className="ei-card__title">What I&apos;m Into</h4>
          <ul className="interest-list">
            {INTERESTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
