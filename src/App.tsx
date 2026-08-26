import { useState, useEffect, useRef } from 'react'

const NAV_ITEMS = [
  { label: 'init()', href: '#hero' },
  { label: 'getSkills()', href: '#skills' },
  { label: 'listProjects()', href: '#projects' },
  { label: 'whoAmI()', href: '#about' },
  { label: 'contact()', href: '#contact' },
]

const SKILLS = {
  'Languages & Frameworks': ['C#', '.NET', 'ASP.NET Core', 'Blazor', 'React', 'TypeScript', 'SQL', 'Web APIs'],
  Databases: ['SQL Server', 'PostgreSQL', 'MySQL', 'SQLite'],
  'Tools & Infra': ['Docker', 'Git', 'Nginx', 'RabbitMQ', 'Linux', 'Postman', 'Blender'],
  'Security & Learning': ['Reverse Engineering', 'Cybersecurity', 'Web App Security', 'IT Infrastructure'],
}

const PROJECTS = [
  {
    name: 'HexoraIT',
    fn: 'Open_Project("HexoraIT")',
    tag: 'v1.0 · self-hosted',
    desc: 'Modern documentation platform designed for IT teams. Organizes infrastructure knowledge, procedures, and technical documentation in a structured, maintainable way.',
    stack: ['C#', '.NET 10', 'React', 'Vite', 'MySql'],
    color: '#ff0099',
    href: 'https://github.com/Lewan24/HexoraIT',
    status: 'stable',
  },
  {
    name: 'OctoBackup',
    fn: 'Open_Project("OctoBackup")',
    tag: 'v1.0 · self-hosted',
    desc: 'Backup management application for administrators. Manages backup jobs for unlimited servers, databases, and SSH tunnels with scheduling and automation.',
    stack: ['C#', '.NET 9', 'PostgreSQL', 'Docker'],
    color: '#d438ce',
    href: 'https://github.com/Lewan24/OctoBackup',
    status: 'stable',
  },
  {
    name: 'NodexMesh',
    fn: 'Open_Project("NodexMesh")',
    tag: 'v1.0 · self-hosted',
    desc: 'Free milanote alternative, basicly similar functionallities, but with better look, customizable kanbans and demo to try on my Github.',
    stack: ['React', 'Vite', 'PostgreSQL', 'Docker', '.NET 10', 'C#'],
    color: '#a0ad3d',
    href: 'https://github.com/Lewan24/NodexMesh',
    status: 'active',
  },
  {
    name: 'WindowsAnalysisTool',
    fn: 'Open_Project("WindowsAnalysisTool")',
    tag: 'v1.0 · CLI',
    desc: 'CLI tool for Windows machines that scans and analyzes basic system vulnerabilities, performance, OS, security, and disks — generating a detailed HTML report.',
    stack: ['C#', '.NET', 'Windows API', 'HTML'],
    color: '#f27121',
    href: 'https://github.com/Lewan24/WindowsAnalysisTool',
    status: 'active',
  },
]

const ROADMAP = [
  { item: 'Master Degree in Cybersecurity', status: 'in_progress' },
  { item: 'Reverse Engineering', status: 'in_progress' },
  { item: 'CompTIA Security+', status: 'planned' },
  { item: 'Web Application Security', status: 'in_progress' },
  { item: 'IT Infrastructure Security', status: 'in_progress' },
  { item: 'Advanced .NET Architecture', status: 'in_progress' },
  { item: 'High-Performance APIs', status: 'in_progress' },
]

function TypewriterText({ text, speed = 55 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('')
  const idx = useRef(0)
  useEffect(() => {
    idx.current = 0
    setDisplayed('')
    const interval = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, idx.current + 1))
        idx.current++
      } else {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])
  return (
    <span>
      {displayed}
      <span className="cursor-blink" style={{ color: '#ff0099' }}>▌</span>
    </span>
  )
}

function StatusDot({ status }: { status: string }) {
  const color =
    status === 'active' ? '#00ff88' :
    status === 'in_progress' ? '#f27121' :
    '#8a2387'
  return (
    <span style={{
      display: 'inline-block',
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: color,
      boxShadow: `0 0 6px ${color}`,
      flexShrink: 0,
    }} />
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#171717', overflowX: 'hidden', position: 'relative' }}>

      {/* Grid overlay */}
      <div className="grid-overlay" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.4 }} />

      {/* Ambient blobs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, #36255C55 0%, transparent 65%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, #32292F66 0%, transparent 65%)', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', top: '40%', left: '60%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, #ff009911 0%, transparent 65%)', filter: 'blur(60px)' }} />
      </div>

      {/* ─── NAVBAR ─── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(23,23,23,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #36255C44' : '1px solid transparent',
        transition: 'all 0.3s ease',
        padding: '0 1.2rem',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#8a2387', background: '#23212C', border: '1px solid #36255C', borderRadius: 3, padding: '2px 6px' }}>
              ./
            </span>
            <span className="font-display" style={{ fontSize: '1rem', fontWeight: 700, background: 'linear-gradient(135deg, #ff0099, #8a2387)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              artur.dev
            </span>
          </div>

          {/* Desktop nav links */}
          <div className="nav-links">
            {NAV_ITEMS.map(({ label, href }) => (
              <a key={label} href={href} className="nav-fn">{label}</a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e8e8f0', padding: 4, alignItems: 'center' }}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div style={{ background: '#23212C', borderBottom: '1px solid #36255C55', padding: '1rem 1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {NAV_ITEMS.map(({ label, href }) => (
              <a key={label} href={href} className="nav-fn" onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section id="hero" className="hero-pad" style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
          <div className="hero-grid">
            <div>
              {/* System label */}
              <div className="font-mono" style={{ fontSize: '0.72rem', color: '#8a2387', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#ff0099' }}>▶</span>
                <span>system.init()</span>
                <span style={{ color: '#36255C' }}>// portfolio loaded</span>
              </div>

              {/* Name */}
              <h1 className="font-display" style={{ fontSize: 'clamp(2.4rem, 8vw, 5rem)', fontWeight: 800, lineHeight: 1.05, margin: 0, marginBottom: '0.4rem' }}>
                <span style={{ color: '#e8e8f0' }}>Hi, I&apos;m </span>
                <span style={{ background: 'linear-gradient(135deg, #ff0099 0%, #8a2387 50%, #f27121 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Artur
                </span>
              </h1>

              {/* Title typewriter */}
              <div className="font-mono" style={{ fontSize: 'clamp(0.82rem, 3vw, 1.15rem)', color: '#c890ff', marginBottom: '1.6rem', minHeight: '1.8rem' }}>
                <TypewriterText text=".NET Developer & Cybersecurity Student" speed={48} />
              </div>

              {/* Quote */}
              <p style={{ fontSize: '0.9rem', color: '#7070a0', fontStyle: 'italic', borderLeft: '2px solid #ff009944', paddingLeft: '1rem', marginBottom: '2.4rem', maxWidth: 560, lineHeight: 1.7 }}>
                &ldquo;I enjoy building software that saves time, reduces complexity, and makes everyday work easier.&rdquo;
              </p>

              {/* CTA buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center' }}>
                <a href="#projects" className="btn-fn">
                  <span style={{ opacity: 0.6 }}>{'() => '}</span>listProjects()
                </a>
                <a href="#contact" className="btn-fn-secondary">
                  <span style={{ opacity: 0.6 }}>{'() => '}</span>contact()
                </a>
                <a href="https://github.com/Lewan24" target="_blank" rel="noreferrer" className="btn-fn-secondary">
                  <GithubIcon /> github.profile()
                </a>
              </div>
            </div>

            {/* Terminal card — hidden on mobile via CSS */}
            <div className="hero-terminal-wrap">
              <TerminalCard />
            </div>
          </div>

          {/* Stats row */}
          <div className="stats-grid" style={{ marginTop: '4rem', background: '#36255C33', borderRadius: 8, overflow: 'hidden', border: '1px solid #36255C44' }}>
            {[
              { val: '4+', label: 'years .NET and IT' },
              { val: '8', label: 'main projects' },
              { val: '50+', label: 'public repos' },
              { val: '∞', label: 'automation tools' },
              { val: 'MSc', label: 'cybersecurity' },
            ].map(({ val, label }) => (
              <div key={label} style={{ padding: '1.2rem 1rem', background: '#23212Ccc', textAlign: 'center' }}>
                <div className="font-display" style={{ fontSize: '1.8rem', fontWeight: 700, background: 'linear-gradient(135deg, #ff0099, #8a2387)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {val}
                </div>
                <div className="font-mono" style={{ fontSize: '0.65rem', color: '#5050a0', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="neon-divider" style={{ position: 'relative', zIndex: 1 }} />

      {/* ─── SKILLS ─── */}
      <section id="skills" className="section-pad" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionHeader fn="getSkills()" label="02 // STACK" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '2.5rem' }}>
            {Object.entries(SKILLS).map(([category, items]) => (
              <div key={category} className="cyber-card" style={{ padding: '1.4rem' }}>
                <div className="font-mono" style={{ fontSize: '0.65rem', color: '#ff0099', marginBottom: '0.8rem', opacity: 0.8 }}>
                  {'// '}{category.toLowerCase().replace(/ /g, '_')}
                </div>
                <div className="font-display" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#c890ff', marginBottom: '0.8rem' }}>
                  {category}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {items.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="neon-divider" style={{ position: 'relative', zIndex: 1 }} />

      {/* ─── PROJECTS ─── */}
      <section id="projects" className="section-pad" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <SectionHeader fn="listProjects()" label="03 // PROJECTS" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginTop: '2.5rem' }}>
            {PROJECTS.map(project => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>

          {/* Automation blurb */}
          <div className="cyber-card" style={{ marginTop: '1.2rem', padding: '1.4rem 1.6rem', borderStyle: 'dashed', display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: 'linear-gradient(135deg, #f2712122, #e9405722)', border: '1px solid #f2712144', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '1.2rem' }}>⚙️</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="font-mono" style={{ fontSize: '0.7rem', color: '#f27121', marginBottom: 4, wordBreak: 'break-all' }}>
                automation_tools.forEach(tool =&gt; deploy(tool))
              </div>
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#7070a0', lineHeight: 1.6 }}>
                Beyond main projects, I regularly build small utilities and automation scripts that improve everyday development and IT administration workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="neon-divider" style={{ position: 'relative', zIndex: 1 }} />

      {/* ─── ABOUT / ROADMAP ─── */}
      <section id="about" className="section-pad" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionHeader fn="whoAmI()" label="04 // ABOUT" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '2.5rem' }}>

            {/* Bio */}
            <div className="cyber-card" style={{ padding: '1.6rem' }}>
              <div className="font-mono" style={{ fontSize: '0.65rem', color: '#ff0099', marginBottom: '1.2rem' }}>
                {'// bio.json'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <BioLine label="role" value='"IT Specialist + Freelance Dev"' color="#c890ff" />
                <BioLine label="focus" value='"Cybersecurity + .NET"' color="#ff0099" />
                <BioLine label="degree" value='"MSc Cybersecurity (in progress)"' color="#f27121" />
                <BioLine label="building" value='"Self-hosted tools & client projects"' color="#c890ff" />
                <BioLine label="email" value='"lewandowskiartur2@protonmail.com"' color="#8a2387" isEmail />
              </div>
              <div style={{ marginTop: '1.4rem', padding: '0.9rem', background: '#171717', borderRadius: 4, border: '1px solid #36255C33' }}>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#8080c0', lineHeight: 1.7 }}>
                  I&apos;m a software engineer focused on clean, maintainable, high-performance applications in the .NET ecosystem.
                  By day I work as an IT Specialist; by night I build free, self-hosted tools and take on client projects.
                  Currently pursuing a master&apos;s degree in Cybersecurity while exploring reverse engineering and security research.
                </p>
              </div>
            </div>

            {/* Roadmap */}
            <div className="cyber-card" style={{ padding: '1.6rem' }}>
              <div className="font-mono" style={{ fontSize: '0.65rem', color: '#8a2387', marginBottom: '1.2rem' }}>
                {'// currentRoadmap.map()'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {ROADMAP.map(({ item, status }) => (
                  <div key={item} className="roadmap-row">
                    <StatusDot status={status} />
                    <span className="font-mono" style={{ fontSize: '0.76rem', color: '#b0b0d0', flex: 1, minWidth: 0 }}>
                      {item}
                    </span>
                    <span
                      className="roadmap-badge"
                      style={{
                        color: status === 'in_progress' ? '#f27121' : '#8a2387',
                        background: status === 'in_progress' ? '#f2712111' : '#8a238711',
                        border: `1px solid ${status === 'in_progress' ? '#f2712133' : '#8a238733'}`,
                      }}
                    >
                      {status === 'in_progress' ? 'in_progress' : 'planned'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="neon-divider" style={{ position: 'relative', zIndex: 1 }} />

      {/* ─── CONTACT ─── */}
      <section id="contact" className="contact-pad" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <SectionHeader fn="contact()" label="05 // CONTACT" centered />
          <div className="cyber-card contact-card-pad" style={{ marginTop: '2.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, #ff009915 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div className="font-mono" style={{ fontSize: '0.68rem', color: '#5050a0', marginBottom: '1.4rem', wordBreak: 'break-word' }}>
              <span style={{ color: '#8a2387' }}>const</span>{' '}
              <span style={{ color: '#c890ff' }}>reach</span>{' '}
              <span style={{ color: '#ff0099' }}>=</span>{' '}
              <span style={{ color: '#f27121' }}>new</span>{' '}
              <span style={{ color: '#e8e8f0' }}>Connection(artur)</span>
            </div>

            <h3 className="font-display" style={{ fontSize: 'clamp(1.3rem, 5vw, 2rem)', fontWeight: 700, margin: '0 0 0.8rem', background: 'linear-gradient(135deg, #ff0099, #8a2387)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Let&apos;s build something.
            </h3>

            <p style={{ color: '#7070a0', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.8rem' }}>
              Open to collaborations, freelance projects, and interesting conversations about .NET, cybersecurity, or developer tooling.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', justifyContent: 'center', marginBottom: '1.4rem' }}>
              <a href="mailto:lewandowskiartur2@protonmail.com" className="btn-fn" style={{ fontSize: '0.8rem' }}>
                sendEmail(&quot;artur&quot;)
              </a>
              <a href="https://github.com/Lewan24" target="_blank" rel="noreferrer" className="btn-fn-secondary" style={{ fontSize: '0.8rem' }}>
                <GithubIcon /> github.connect()
              </a>
            </div>

            <div className="font-mono" style={{ fontSize: '0.68rem', color: '#36255C' }}>
              lewandowskiartur2@protonmail.com
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ position: 'relative', zIndex: 1, borderTop: '1px solid #36255C33', padding: '1.4rem 1.2rem', textAlign: 'center' }}>
        <div className="font-mono" style={{ fontSize: '0.65rem', color: '#36255C' }}>
          <span style={{ color: '#5050a0' }}>artur.dev</span>
          {' // '}
          <span>built with React + Vite</span>
          {' // '}
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  )
}

function SectionHeader({ fn, label, centered = false }: { fn: string; label: string; centered?: boolean }) {
  return (
    <div style={{ textAlign: centered ? 'center' : 'left' }}>
      <div className="font-mono" style={{ fontSize: '0.65rem', color: '#5050a0', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: 8, justifyContent: centered ? 'center' : 'flex-start' }}>
        <span style={{ height: 1, width: 24, background: 'linear-gradient(90deg, transparent, #8a2387)', display: 'inline-block' }} />
        {label}
        <span style={{ height: 1, width: 24, background: 'linear-gradient(90deg, #8a2387, transparent)', display: 'inline-block' }} />
      </div>
      <h2 className="font-display" style={{ margin: 0, fontSize: 'clamp(1.4rem, 5vw, 2.2rem)', fontWeight: 700, background: 'linear-gradient(135deg, #e8e8f0 30%, #c890ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        <span style={{ color: '#ff0099', WebkitTextFillColor: '#ff0099', fontFamily: "'JetBrains Mono', monospace", fontSize: '70%', opacity: 0.7 }}>
          {'() => '}
        </span>
        {fn}
      </h2>
    </div>
  )
}

function BioLine({ label, value, color, isEmail = false }: { label: string; value: string; color: string; isEmail?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'baseline' }}>
      <span className="font-mono" style={{ fontSize: '0.7rem', color: '#5050a0', minWidth: 55, flexShrink: 0 }}>
        {label}:
      </span>
      <span className="font-mono bio-email-val" style={{ fontSize: '0.7rem', color, wordBreak: isEmail ? 'break-all' : undefined }}>
        {value}
      </span>
    </div>
  )
}

function ProjectCard({ project }: { project: typeof PROJECTS[number] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="cyber-card"
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        cursor: 'default',
        borderColor: hovered ? `${project.color}55` : '#36255C44',
        boxShadow: hovered ? `0 0 28px ${project.color}18, 0 4px 32px #00000088` : 'none',
        transform: hovered ? 'translateY(-3px)' : 'none',
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 0 }}>
          <div className="font-mono" style={{ fontSize: '0.62rem', color: project.color, marginBottom: 4, opacity: 0.8, wordBreak: 'break-all' }}>
            {project.fn}
          </div>
          <h3 className="font-display" style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#e8e8f0' }}>
            {project.name}
          </h3>
        </div>
        <span className="font-mono" style={{ fontSize: '0.58rem', color: project.color, background: `${project.color}11`, border: `1px solid ${project.color}33`, borderRadius: 3, padding: '2px 6px', whiteSpace: 'nowrap', flexShrink: 0 }}>
          {project.tag}
        </span>
      </div>

      <p style={{ margin: 0, fontSize: '0.83rem', color: '#7070a0', lineHeight: 1.65, flex: 1 }}>
        {project.desc}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
        {project.stack.map(s => (
          <span key={s} className="skill-tag" style={{ borderColor: `${project.color}33`, color: project.color + 'cc' }}>
            {s}
          </span>
        ))}
      </div>

      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="btn-fn"
        style={{ borderColor: `${project.color}66`, color: project.color, background: `linear-gradient(135deg, ${project.color}11, ${project.color}06)`, alignSelf: 'flex-start', fontSize: '0.74rem' }}
      >
        <GithubIcon size={12} /> {project.fn.split('(')[0]}()
      </a>
    </div>
  )
}

function TerminalCard() {
  return (
    <div style={{ width: 300, background: '#171717', border: '1px solid #36255C55', borderRadius: 10, overflow: 'hidden', boxShadow: '0 0 40px #8a238722, 0 20px 60px #00000088', flexShrink: 0 }}>
      <div style={{ background: '#23212C', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid #36255C33' }}>
        {['#ff5f57', '#febc2e', '#28c840'].map(c => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }} />
        ))}
        <span className="font-mono" style={{ fontSize: '0.62rem', color: '#5050a0', marginLeft: 8 }}>artur@dev ~ $</span>
      </div>
      <div style={{ padding: '1.2rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', lineHeight: 2 }}>
        {[
          { cmd: 'whoami', out: 'artur' },
          { cmd: 'cat role.txt', out: '.NET Developer' },
          { cmd: 'cat status.txt', out: 'MSc Cybersecurity' },
          { cmd: 'ls projects/', out: 'HexoraIT  OctoBackup  WAT' },
        ].map(({ cmd, out }) => (
          <div key={cmd}>
            <div><span style={{ color: '#ff0099' }}>$ </span><span style={{ color: '#c890ff' }}>{cmd}</span></div>
            <div style={{ color: '#7070a0' }}>{out}</div>
          </div>
        ))}
        <div>
          <span style={{ color: '#ff0099' }}>$ </span>
          <span className="cursor-blink" style={{ color: '#c890ff' }}>▌</span>
        </div>
      </div>
    </div>
  )
}

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}
