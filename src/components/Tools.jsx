import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';
import { TOOLS, SERVERHOSTING, FRONTEND_FRAMEWORKS, BACKEND } from '../data/constants';

function ToolIcon({ tool }) {
  if (tool.image) {
    return <img src={tool.image} alt={tool.name} className="tool-icon-img" loading="lazy" />;
  }
  return <i className={tool.icon} />;
}

function ToolGrid({ items }) {
  return (
    <StaggerContainer className="tools-grid">
      {items.map((tool) => (
        <StaggerItem key={tool.name}>
          <div className="tool-card">
            <ToolIcon tool={tool} />
            <h4>{tool.name}</h4>
          </div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

export default function Tools() {
  return (
    <AnimatedSection className="tools" id="ToolsPlatforms">
      <h2 className="heading">
        Tools & <span>Platforms</span>
      </h2>
      <ToolGrid items={TOOLS} />

      <h2 className="heading sub-heading">
        Server & <span>Hosting</span>
      </h2>
      <ToolGrid items={SERVERHOSTING} />

      <h2 className="heading sub-heading">
        Frontend <span>Frameworks</span>
      </h2>
      <ToolGrid items={FRONTEND_FRAMEWORKS} />

      <h2 className="heading sub-heading">
        Backend & <span>Database</span>
      </h2>
      <ToolGrid items={BACKEND} />
    </AnimatedSection>
  );
}