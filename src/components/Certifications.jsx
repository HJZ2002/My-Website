import { motion } from 'framer-motion';
import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';
import { CERTIFICATIONS } from '../data/certifications';

export default function Certifications() {
  return (
    <AnimatedSection className="certs" id="Certifications">
      <h2 className="heading">
        Certifications<span />
      </h2>
      <StaggerContainer className="cert-grid">
        {CERTIFICATIONS.map((cert, index) => (
          <StaggerItem key={`${cert.title}-${index}`}>
            <motion.a
              href={cert.href || undefined}
              target={cert.href ? '_blank' : undefined}
              rel={cert.href ? 'noopener noreferrer' : undefined}
              className="cert-card"
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              onClick={!cert.href ? (e) => e.preventDefault() : undefined}
              style={!cert.href ? { cursor: 'default' } : undefined}
            >
              <img src={cert.image} alt={cert.title} className="cert-thumb" loading="lazy" />
              <div className="cert-meta">
                <h3 className="cert-title">{cert.title}</h3>
                {cert.issuer && <p className="cert-issuer">{cert.issuer}</p>}
              </div>
            </motion.a>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </AnimatedSection>
  );
}