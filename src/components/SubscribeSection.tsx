import React from 'react';
import { Headphones, Volume2, Rss } from 'lucide-react';

const SubscribeSection: React.FC = () => {
  return (
    <section id="subscribe" className="py-20 relative">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-cyan-900/10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Never Miss an Episode</h2>
          <p className="text-gray-400 text-lg">Subscribe to Tech Horizons on your favorite platform and stay updated with our latest discussions on the future of technology.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <SubscribeCard 
            icon={<Headphones size={28} />}
            title="Apple Podcasts"
            description="Listen on the go with the Apple Podcasts app."
            buttonText="Subscribe on Apple"
            color="from-pink-600 to-red-500"
          />
          
          <SubscribeCard 
            icon={<Volume2 size={28} />}
            title="Spotify"
            description="Stream all episodes directly on Spotify."
            buttonText="Follow on Spotify"
            color="from-green-500 to-emerald-400"
          />
          
          <SubscribeCard 
            icon={<Rss size={28} />}
            title="RSS Feed"
            description="Add our RSS feed to your favorite podcast player."
            buttonText="Copy RSS Link"
            color="from-orange-500 to-amber-400"
          />
        </div>
        
        <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-2xl max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-white mb-4">Join Our Community</h3>
              <p className="text-gray-300 mb-6">Get exclusive updates, behind-the-scenes content, and join discussions with other tech enthusiasts.</p>
              
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your name" 
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-400"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium rounded-lg hover:from-purple-500 hover:to-cyan-400 transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
                >
                  Subscribe to Newsletter
                </button>
              </form>
            </div>
            
            <div className="md:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Community" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h4 className="text-xl font-bold text-white">Tech Horizons Community</h4>
                  <p className="text-gray-300">Join 5,000+ tech enthusiasts</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-purple-500/20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-cyan-500/20 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface SubscribeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  color: string;
}

const SubscribeCard: React.FC<SubscribeCardProps> = ({ icon, title, description, buttonText, color }) => {
  return (
    <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-6 rounded-xl transition-transform hover:-translate-y-2 duration-300">
      <div className={`w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r ${color} mb-6 shadow-lg`}>
        {icon}
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <button className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors">
        {buttonText}
      </button>
    </div>
  );
};

export default SubscribeSection;