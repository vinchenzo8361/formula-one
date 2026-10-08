const fs = require('fs');
let c = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');
c = c.replace(/<\/Link>\s*<ThemeToggle \/>/, '</Link>\n          <Link href="/author" className="flex items-center gap-2 hover:text-foreground transition-colors">\n            <svg className="w-4 h-4 text-f1-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>\n            Author\n          </Link>\n          \n          <ThemeToggle />');
fs.writeFileSync('src/components/Navbar.tsx', c);
