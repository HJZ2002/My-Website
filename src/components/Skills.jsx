import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';
import { SKILLS } from '../data/constants';

export default function Skills() {
  return (
    <AnimatedSection className="skills" id="TechnicalSkills">
      <div className="skills-head">
        <h2>
          Technical <span>Skills</span>
        </h2>
        <p>Programming Languages That I&apos;m Familiar With</p>
      </div>
      <StaggerContainer className="skills-grid">
        {SKILLS.map((skill) => (
          <StaggerItem key={skill.name}>
            <div className="skill-card">
              <i className={skill.icon} />
              <h4>{skill.name}</h4>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </AnimatedSection>
  );
}
