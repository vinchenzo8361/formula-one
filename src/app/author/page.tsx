import Link from 'next/link';
import { Globe, User, Camera, Mail, Code2 } from 'lucide-react';

export default function AuthorPage() {
  return (
    <div className="flex-1 p-8 text-foreground min-h-[calc(100vh-80px)] flex items-center justify-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-f1-red/10 blur-3xl rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/10 blur-3xl rounded-full" />
      
      <div className="max-w-2xl w-full relative z-10">
        <div className="bg-panel/80 backdrop-blur-xl p-10 md:p-14 rounded-[2.5rem] shadow-2xl border border-gray-200/20 text-center">
          
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-f1-red to-orange-500 rounded-full flex items-center justify-center mb-8 shadow-xl border-4 border-background">
            <Code2 className="w-16 h-16 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">Vineet Tejnani</h1>
          <p className="text-xl text-text-muted font-medium mb-8">Software Engineer & Creator of Apex F1</p>

          <div className="w-16 h-1 bg-f1-red mx-auto rounded-full mb-10" />

          <p className="text-lg leading-relaxed text-foreground/80 mb-12 max-w-lg mx-auto">
            Passionate about motorsport, data visualization, and building high-performance web applications. 
            Connect with me below to see more of my work or just chat about Formula 1!
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="https://github.com/vinchenzo8361" target="_blank" className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-background border border-gray-200/20 hover:border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group">
              <Code2 className="w-8 h-8 text-foreground group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm">GitHub</span>
            </Link>
            
            <Link href="https://linkedin.com/in/your-profile" target="_blank" className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-background border border-gray-200/20 hover:border-[#0A66C2] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group">
              <User className="w-8 h-8 text-[#0A66C2] group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm">LinkedIn</span>
            </Link>

            <Link href="https://instagram.com/your-handle" target="_blank" className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-background border border-gray-200/20 hover:border-[#E1306C] hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all group">
              <Camera className="w-8 h-8 text-[#E1306C] group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm">Instagram</span>
            </Link>

            <Link href="mailto:vineetbt4@gmail.com" className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-background border border-gray-200/20 hover:border-f1-red hover:bg-red-50 dark:hover:bg-red-900/20 transition-all group">
              <Mail className="w-8 h-8 text-f1-red group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm">Email</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
