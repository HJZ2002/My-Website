import { motion } from 'framer-motion';
import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';
import { PROJECTS } from '../data/projects';

export default function Projects() {
  return (
    <AnimatedSection className="projects" id="Projects">
      <h2 className="heading">
        My <span>Projects</span>
      </h2>
      <StaggerContainer className="projects-box">
        {PROJECTS.map((project) => (
          <StaggerItem key={project.title}>
            <motion.article
              className="project-card"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <h3>{project.title}</h3>
                </a>
              ) : (
                <>
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <h3>{project.title}</h3>
                </>
              )}
              <p>{project.description}</p>
            </motion.article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </AnimatedSection>
  );
}
