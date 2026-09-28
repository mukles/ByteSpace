import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-lime-400 selection:text-black">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
            {/* Logo placeholder icon */}
            <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/>
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight">ByteSpace</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="text-white">Home</Link>
          <Link href="/courses" className="text-zinc-400 hover:text-white transition-colors">Courses</Link>
          <Link href="/creators" className="text-zinc-400 hover:text-white transition-colors">Creators</Link>
        </nav>
        
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/login" className="hidden sm:block text-zinc-300 hover:text-white transition-colors">Sign In</Link>
          <Link href="/signup" className="px-5 py-2.5 rounded-full border border-zinc-700 hover:bg-zinc-800 transition-colors">
            Join Us
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative px-4 pt-20 pb-32 max-w-5xl mx-auto text-center overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-lime-400/20 blur-[120px] rounded-full pointer-events-none" />
          
          <h1 className="relative text-5xl md:text-7xl font-semibold tracking-tight leading-tight mb-6">
            Get Access to Hundreds <br className="hidden md:block"/> Courses Available
          </h1>
          
          <p className="relative text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.
          </p>
          
          {/* Search Bar */}
          <div className="relative flex items-center max-w-2xl mx-auto bg-white rounded-full p-2 shadow-2xl">
            <div className="pl-6 pr-4 text-zinc-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Course, topic, creator" 
              className="flex-1 bg-transparent border-none outline-none text-black placeholder:text-zinc-400 px-2 py-3"
            />
            <button className="bg-lime-400 text-black font-medium px-8 py-3.5 rounded-full hover:bg-lime-500 transition-colors">
              Search
            </button>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="bg-white text-black py-24 rounded-t-[3rem]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <p className="text-violet-600 font-medium mb-2 uppercase tracking-wider text-sm">Featured Categories</p>
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight">Innovative Paths to Knowledge</h2>
              </div>
              <Link href="/categories" className="text-zinc-600 font-medium hover:text-black mt-4 md:mt-0 inline-flex items-center gap-2">
                View More &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {['Design', 'Development', 'IT & Software', 'Business', 'Marketing', 'Photography'].map((category) => (
                <div key={category} className="group cursor-pointer flex flex-col items-center justify-center p-8 rounded-2xl border border-zinc-200 hover:border-violet-600 hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {/* Placeholder Icon */}
                    <div className="w-6 h-6 bg-current rounded-sm" />
                  </div>
                  <h3 className="font-medium text-center">{category}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
