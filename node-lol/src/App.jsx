import React from 'react';

const profiles = [
  { name: 'mono', tag: 'DESIGNER / CREATOR', bio: 'Building quiet things on a loud internet.', initials: 'M', accent: 'silver', links: ['Discord', 'Instagram', 'GitHub'] },
  { name: 'zero', tag: 'DEVELOPER', bio: 'Less noise. More signal.', initials: '0', accent: 'white', links: ['GitHub', 'YouTube'] },
  { name: 'void', tag: 'DIGITAL ARTIST', bio: 'A small corner of the internet.', initials: 'V', accent: 'grey', links: ['TikTok', 'Discord', 'Spotify'] }
];

function ProfileCard({ profile }) {
  return (
    <article className="profile-card">
      <div className="card-cover"><span className="cover-mark">N.</span><span className="online-dot" /></div>
      <div className="card-content">
        <div className="avatar">{profile.initials}</div>
        <div className="profile-heading"><h3>{profile.name}</h3><span className="verified">✳</span></div>
        <p className="profile-tag">{profile.tag}</p>
        <p className="profile-bio">{profile.bio}</p>
        <div className="profile-links">{profile.links.map(link => <span key={link}>{link}</span>)}</div>
      </div>
    </article>
  );
}

export default function App() {
  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#"><span className="brand-mark">N</span> NODE<span className="brand-dot">.</span>LOL</a>
        <div className="nav-links"><a href="#features">Features</a><a href="#showcase">Explore</a><a href="#about">About</a></div>
        <a className="nav-login" href="/auth/login">Sign in <span>↗</span></a>
      </nav>

      <section className="hero">
        <div className="eyebrow"><span className="eyebrow-line" /> YOUR SPACE ON THE INTERNET</div>
        <h1>Your identity.<br /><span>Your space.</span></h1>
        <p className="hero-copy">A personal page that feels like you. Build your corner of the internet, make it yours, and share it with everyone.</p>
        <div className="hero-actions"><a className="button button-light" href="/auth/login">Create your page <span>↗</span></a><a className="button button-quiet" href="#showcase">Explore profiles <span>↓</span></a></div>
        <div className="hero-meta"><span><i /> SIMPLE BY DESIGN</span><span>01 / 03 — NODE.LOL</span></div>
      </section>

      <section className="showcase section" id="showcase">
        <div className="section-top"><div><div className="eyebrow">THE COMMUNITY</div><h2>Made to be <span>yours.</span></h2></div><p>Every profile is a blank canvas.<br />Here are a few directions to take it.</p></div>
        <div className="profile-grid">{profiles.map(profile => <ProfileCard key={profile.name} profile={profile} />)}</div>
      </section>

      <section className="features section" id="features">
        <div className="eyebrow">YOUR PAGE. YOUR RULES.</div>
        <h2>Everything you need.<br /><span>Nothing you don't.</span></h2>
        <div className="feature-grid">
          <div className="feature"><span>01</span><h3>Make it yours</h3><p>Choose your colors, backgrounds, typography, and layout.</p></div>
          <div className="feature"><span>02</span><h3>Bring your links</h3><p>Keep your socials, projects, and favorite places together.</p></div>
          <div className="feature"><span>03</span><h3>See your reach</h3><p>Understand how people discover and visit your page.</p></div>
        </div>
      </section>

      <footer id="about"><a className="brand" href="#"><span className="brand-mark">N</span> NODE<span className="brand-dot">.</span>LOL</a><span>YOUR IDENTITY. YOUR SPACE. YOUR STYLE.</span><span>© 2026 NODE.LOL</span></footer>
    </main>
  );
}