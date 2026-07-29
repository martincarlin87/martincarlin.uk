export default function SiteFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative z-20 mt-32 px-6 md:px-10 lg:px-14">
            <hr className="site-rule" />
            <div className="flex flex-wrap items-center justify-between gap-4 py-6">
                <span className="site-path">
                    <span className="tilde">~</span>
                    <span className="slash">/</span>
                    <span style={{ color: 'var(--dim)' }}>EOF</span>
                </span>
                <span className="site-mono" style={{ color: 'var(--dim)' }}>
                    © {year} · Martin Carlin · Glasgow
                </span>
                <span className="site-mono" style={{ color: 'var(--dim)' }}>
                    Next.js · React · Vercel
                </span>
            </div>
        </footer>
    );
}
