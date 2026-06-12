import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';
import { TOOLS } from '../data/constants';

export default function Tools() {
  return (
    <AnimatedSection className="tools" id="ToolsPlatforms">
      <h2 className="heading">
        Tools & <span>Platforms</span>
      </h2>
      <StaggerContainer className="tools-grid">
        {TOOLS.map((tool) => (
          <StaggerItem key={tool.name}>
            <div className="tool-card">
              <i className={tool.icon} />
              <h4>{tool.name}</h4>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </AnimatedSection>
  );
}
