// Single source of truth for shared navigation, services and footer content.

export const SERVICES = [
  { key: 'vapt',           href: 'service-vapt.html',                    icon: 'vapt',            title: 'Penetration Testing (VAPT)', blurb: 'Find what is exploitable, then prove it closed.' },
  { key: 'red-teaming',    href: 'service-red-teaming.html',             icon: 'red-team',        title: 'Red Teaming',                blurb: 'Test whether your defences actually hold.' },
  { key: 'threat-hunting', href: 'service-threat-hunting.html',          icon: 'threat-hunting',  title: 'Threat Hunting',             blurb: 'Find what is already inside, and evict it.' },
  { key: 'osint',          href: 'service-osint.html',                   icon: 'osint',           title: 'OSINT & Exposure',           blurb: 'Close what you are leaking in the open.' },
  { key: 'attack-surface', href: 'service-attack-surface-analysis.html', icon: 'attack-surface',  title: 'Attack Surface Analysis',    blurb: 'Know every asset you are responsible for.' },
] as const;

// Top-level nav (Services is the mega-menu trigger, rendered separately).
export const NAV = [
  { key: 'case-studies', href: 'case-studies.html', label: 'Case Studies' },
  { key: 'insights',     href: 'insights.html',     label: 'Insights' },
  { key: 'company',      href: 'company.html',      label: 'Company' },
  { key: 'trust',        href: 'trust.html',        label: 'Trust' },
] as const;

export const FOOTER_COLS = [
  { h: 'Services', links: [
    { href: 'service-vapt.html', t: 'Penetration Testing' },
    { href: 'service-red-teaming.html', t: 'Red Teaming' },
    { href: 'service-threat-hunting.html', t: 'Threat Hunting' },
    { href: 'service-osint.html', t: 'OSINT' },
    { href: 'service-attack-surface-analysis.html', t: 'Attack-Surface Analysis' },
  ]},
  { h: 'Company', links: [
    { href: 'company.html', t: 'About' },
    { href: 'team.html', t: 'Team' },
    { href: 'careers.html', t: 'Careers' },
    { href: 'case-studies.html', t: 'Case Studies' },
  ]},
  { h: 'Resources', links: [
    { href: 'insights.html', t: 'Insights' },
    { href: 'trust.html', t: 'Trust & Disclosure' },
    { href: 'contact.html', t: 'Contact' },
    { href: 'contact.html#book', t: 'Book Assessment' },
  ]},
  { h: 'Legal', links: [
    { href: 'privacy.html', t: 'Privacy Policy' },
    { href: 'terms.html', t: 'Terms of Service' },
    { href: 'cookies.html', t: 'Cookie Policy' },
  ]},
] as const;

export const SOCIAL = [
  { href: 'https://www.linkedin.com/company/sozoris', label: 'LinkedIn' },
  { href: 'https://x.com/sozoris', label: 'X' },
  { href: 'https://github.com/sozoris', label: 'GitHub' },
] as const;

// Verified, externally-checkable research. This is the firm's real proof, so it
// lives in shared data rather than being retyped per page. Every row must stay
// independently confirmable — if a claim cannot be linked or checked, it does
// not belong here.
export const DISCLOSURES = [
  { vendor: 'Better Auth', logo: 'assets/logos/better-auth.png', finding: 'OAuth refresh-token replay, plus insecure OIDC crypto defaults', status: 'Critical + High' },
  { vendor: 'n8n',         logo: 'assets/logos/n8n.svg',         finding: 'OAuth authorization bypass', cve: 'CVE-2026-33720', status: 'CVE assigned' },
  { vendor: 'SAP',         logo: 'assets/logos/sap.svg',         finding: 'SQL injection in @sap/hdi-deploy', status: 'Vendor-validated · bounty' },
  { vendor: 'Twilio',      logo: 'assets/logos/twilio.svg',      finding: 'Validated finding via HackerOne (CVSS 6.5)', status: 'Bounty awarded' },
  { vendor: 'FusionAuth',  logo: 'assets/logos/fusionauth.svg',  finding: 'Ongoing access to the private program', status: 'Trusted researcher' },
] as const;
