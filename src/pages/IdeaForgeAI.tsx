import React, { useState } from 'react';
import { Zap, Loader2, Sparkles, Code, Users, Clock, Target, Lightbulb, Wrench, Star, Upload, RotateCcw, AlertCircle } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import ContentContainer from '../components/layout/ContentContainer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';

interface ProjectIdea {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimated_time: string;
  innovation_score: number;
  features: string[];
  suggested_stack: string[];
}

interface ForgeInputs {
  theme: string;
  designStyle: string;
  techStack: string[];
  teamSize: string;
  buildTime: string;
  intent: string;
  specialRequests: string;
}

const IdeaForgeAI: React.FC = () => {
  const [inputs, setInputs] = useState<ForgeInputs>({
    theme: '',
    designStyle: '',
    techStack: [],
    teamSize: '',
    buildTime: '',
    intent: '',
    specialRequests: ''
  });
  
  const [generatedIdea, setGeneratedIdea] = useState<ProjectIdea | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ProjectIdea[]>([]);

  const themes = [
    'AI & Machine Learning', 'EdTech', 'Gaming', 'Environment & Sustainability', 
    'Developer Tools', 'Web3 & Blockchain', 'Cybersecurity', 'FinTech', 
    'HealthTech', 'Social Impact', 'E-commerce', 'Productivity', 'Other'
  ];

  const designStyles = [
    'Minimalist', 'Gamified', 'Retro/Vintage', 'Cyberpunk', 'Clean & Modern', 
    'Dark Mode', 'Glassmorphism', 'Neumorphism', 'Material Design', 'Other'
  ];

  const techOptions = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Express', 'Next.js', 'Nuxt.js',
    'Python', 'Django', 'Flask', 'FastAPI', 'JavaScript', 'TypeScript',
    'Flutter', 'React Native', 'Swift', 'Kotlin', 'Java', 'C#', '.NET',
    'Firebase', 'Supabase', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
    'AWS', 'Vercel', 'Netlify', 'Docker', 'TensorFlow', 'PyTorch',
    'Three.js', 'D3.js', 'Chart.js', 'Tailwind CSS', 'Bootstrap'
  ];

  const teamSizes = ['Solo', 'Duo', 'Trio', 'Squad (4)', 'Full Stack (5+)'];
  const buildTimes = ['2 hours', '4 hours', '8 hours', '12 hours', '24 hours', '48 hours', '1 week'];

  const handleTechStackToggle = (tech: string) => {
    setInputs(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
    }));
  };

  const buildPrompt = (): string => {
    return `Generate a unique, innovative project idea based on these specifications:

Theme: ${inputs.theme}
Design Style: ${inputs.designStyle}
Tech Stack: ${inputs.techStack.join(', ')}
Team Size: ${inputs.teamSize}
Build Time: ${inputs.buildTime}
Intent/Mood: ${inputs.intent}
Special Requirements: ${inputs.specialRequests}

Return ONLY a valid JSON response in this exact format:
{
  "title": "Creative project name",
  "description": "Detailed 2-3 sentence description of the project",
  "difficulty": "Easy|Medium|Hard",
  "estimated_time": "Realistic time estimate",
  "innovation_score": 85,
  "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  "suggested_stack": ["Tech1", "Tech2", "Tech3"]
}

Make it creative, feasible, and aligned with the specified constraints.`;
  };

  const forgeIdea = async () => {
    if (!inputs.theme || !inputs.designStyle || !inputs.teamSize || !inputs.buildTime) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (!apiKey || apiKey === 'your_openai_api_key_here') {
        throw new Error('OpenAI API key not configured');
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a creative project idea generator. Always respond with valid JSON only, no additional text or formatting."
            },
            {
              role: "user",
              content: buildPrompt()
            }
          ],
          max_tokens: 800,
          temperature: 0.8,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error('No response from API');
      }

      // Parse JSON response
      const idea: ProjectIdea = JSON.parse(content);
      setGeneratedIdea(idea);
      setHistory(prev => [idea, ...prev.slice(0, 4)]); // Keep last 5 ideas
      
    } catch (error: any) {
      console.error('Error generating idea:', error);
      
      // Fallback idea for demo purposes
      const fallbackIdea: ProjectIdea = {
        title: "EcoTrack - Personal Carbon Footprint Tracker",
        description: "A gamified web application that helps users track their daily carbon footprint through interactive challenges and provides personalized recommendations for sustainable living.",
        difficulty: "Medium",
        estimated_time: inputs.buildTime,
        innovation_score: 78,
        features: [
          "Daily activity logging",
          "Carbon footprint calculator",
          "Gamification with badges",
          "Social sharing features",
          "Sustainability tips"
        ],
        suggested_stack: inputs.techStack.length > 0 ? inputs.techStack.slice(0, 4) : ["React", "Node.js", "MongoDB", "Chart.js"]
      };
      
      setGeneratedIdea(fallbackIdea);
      setHistory(prev => [fallbackIdea, ...prev.slice(0, 4)]);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'Hard': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const isApiKeyConfigured = () => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    return apiKey && apiKey !== 'your_openai_api_key_here';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <PageHeader
        title="🔥 IdeaForge++"
        subtitle="Tell us your tech. We'll forge your mission."
        gradient="from-purple-600 via-pink-600 to-blue-600"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <Zap className="text-cyan-400 animate-pulse" size={20} />
            <span className="text-white/90 text-sm">AI-Powered Project Generator</span>
          </div>
        </div>
      </PageHeader>

      <ContentContainer className="max-w-6xl">
        {/* API Key Status Warning */}
        {!isApiKeyConfigured() && (
          <div className="mb-8 p-6 bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-xl">
            <div className="flex items-start space-x-3">
              <AlertCircle className="text-amber-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-amber-300 font-semibold mb-2">Demo Mode Active</h3>
                <p className="text-amber-100/80">
                  IdeaForge++ is running in demo mode. For full AI-powered idea generation, configure your OpenAI API key in the environment variables.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                <Wrench className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-white">Project Forge</h2>
            </div>

            <div className="space-y-6">
              {/* Project Theme */}
              <div>
                <Label className="text-cyan-300 font-medium">Project Theme *</Label>
                <Select value={inputs.theme} onValueChange={(value) => setInputs(prev => ({ ...prev, theme: value }))}>
                  <SelectTrigger className="bg-gray-800/60 border-cyan-500/30 text-white">
                    <SelectValue placeholder="Choose your domain" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-cyan-500/30">
                    {themes.map(theme => (
                      <SelectItem key={theme} value={theme} className="text-white hover:bg-gray-700">
                        {theme}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Design Style */}
              <div>
                <Label className="text-cyan-300 font-medium">Design Style *</Label>
                <Select value={inputs.designStyle} onValueChange={(value) => setInputs(prev => ({ ...prev, designStyle: value }))}>
                  <SelectTrigger className="bg-gray-800/60 border-cyan-500/30 text-white">
                    <SelectValue placeholder="Pick your aesthetic" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-cyan-500/30">
                    {designStyles.map(style => (
                      <SelectItem key={style} value={style} className="text-white hover:bg-gray-700">
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tech Stack */}
              <div>
                <Label className="text-cyan-300 font-medium">Tech Stack</Label>
                <div className="mt-2 max-h-32 overflow-y-auto bg-gray-800/30 rounded-lg p-3 border border-cyan-500/20">
                  <div className="flex flex-wrap gap-2">
                    {techOptions.map(tech => (
                      <Badge
                        key={tech}
                        variant={inputs.techStack.includes(tech) ? "default" : "outline"}
                        className={`cursor-pointer transition-all ${
                          inputs.techStack.includes(tech)
                            ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                            : 'border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20'
                        }`}
                        onClick={() => handleTechStackToggle(tech)}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Team Size & Build Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-cyan-300 font-medium">Team Size *</Label>
                  <Select value={inputs.teamSize} onValueChange={(value) => setInputs(prev => ({ ...prev, teamSize: value }))}>
                    <SelectTrigger className="bg-gray-800/60 border-cyan-500/30 text-white">
                      <SelectValue placeholder="Team" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-cyan-500/30">
                      {teamSizes.map(size => (
                        <SelectItem key={size} value={size} className="text-white hover:bg-gray-700">
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-cyan-300 font-medium">Build Time *</Label>
                  <Select value={inputs.buildTime} onValueChange={(value) => setInputs(prev => ({ ...prev, buildTime: value }))}>
                    <SelectTrigger className="bg-gray-800/60 border-cyan-500/30 text-white">
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-cyan-500/30">
                      {buildTimes.map(time => (
                        <SelectItem key={time} value={time} className="text-white hover:bg-gray-700">
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Intent/Mood */}
              <div>
                <Label className="text-cyan-300 font-medium">Intent/Mood</Label>
                <Input
                  value={inputs.intent}
                  onChange={(e) => setInputs(prev => ({ ...prev, intent: e.target.value }))}
                  placeholder="e.g., wild & interactive, serious & impactful"
                  className="bg-gray-800/60 border-cyan-500/30 text-white placeholder-gray-400"
                />
              </div>

              {/* Special Requests */}
              <div>
                <Label className="text-cyan-300 font-medium">Special Requests</Label>
                <Textarea
                  value={inputs.specialRequests}
                  onChange={(e) => setInputs(prev => ({ ...prev, specialRequests: e.target.value }))}
                  placeholder="e.g., must include animations, no database, mobile-first"
                  className="bg-gray-800/60 border-cyan-500/30 text-white placeholder-gray-400"
                  rows={3}
                />
              </div>

              {/* Forge Button */}
              <Button
                onClick={forgeIdea}
                disabled={loading || !inputs.theme || !inputs.designStyle || !inputs.teamSize || !inputs.buildTime}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white py-3 text-lg font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Forging Your Idea...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2" size={20} />
                    🚀 Forge My Idea
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            {generatedIdea ? (
              <div className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <Lightbulb className="text-white" size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Mission Blueprint</h2>
                  </div>
                  <Button
                    onClick={forgeIdea}
                    variant="outline"
                    size="sm"
                    className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20"
                  >
                    <RotateCcw size={16} className="mr-1" />
                    Regenerate
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Project Title */}
                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-4 border border-purple-500/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="text-purple-400" size={18} />
                      <span className="text-purple-300 font-medium">Project Title</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{generatedIdea.title}</h3>
                  </div>

                  {/* Description */}
                  <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl p-4 border border-blue-500/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="text-blue-400" size={18} />
                      <span className="text-blue-300 font-medium">Mission Brief</span>
                    </div>
                    <p className="text-gray-200 leading-relaxed">{generatedIdea.description}</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`rounded-xl p-4 border ${getDifficultyColor(generatedIdea.difficulty)}`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <Target size={16} />
                        <span className="font-medium">Difficulty</span>
                      </div>
                      <p className="text-lg font-bold">{generatedIdea.difficulty}</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-4 border border-green-500/30">
                      <div className="flex items-center space-x-2 mb-1 text-green-400">
                        <Clock size={16} />
                        <span className="font-medium">Build Time</span>
                      </div>
                      <p className="text-lg font-bold text-white">{generatedIdea.estimated_time}</p>
                    </div>
                  </div>

                  {/* Innovation Score */}
                  <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-4 border border-yellow-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Star className="text-yellow-400" size={18} />
                        <span className="text-yellow-300 font-medium">Innovation Score</span>
                      </div>
                      <span className="text-2xl font-bold text-white">{generatedIdea.innovation_score}/100</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${generatedIdea.innovation_score}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-xl p-4 border border-indigo-500/30">
                    <div className="flex items-center space-x-2 mb-3">
                      <Code className="text-indigo-400" size={18} />
                      <span className="text-indigo-300 font-medium">Core Features</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {generatedIdea.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                          <span className="text-gray-200">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Suggested Stack */}
                  <div className="bg-gradient-to-r from-teal-900/30 to-cyan-900/30 rounded-xl p-4 border border-teal-500/30">
                    <div className="flex items-center space-x-2 mb-3">
                      <Wrench className="text-teal-400" size={18} />
                      <span className="text-teal-300 font-medium">Recommended Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {generatedIdea.suggested_stack.map((tech, index) => (
                        <Badge key={index} className="bg-teal-500/20 text-teal-300 border-teal-500/30">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <Upload className="mr-2" size={16} />
                      Upload to MissionDeck
                    </Button>
                    <Button variant="outline" className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20">
                      <Users className="mr-2" size={16} />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-500/30 rounded-2xl p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">Ready to Forge</h3>
                <p className="text-gray-400">Fill in your preferences and hit the forge button to generate your custom project idea!</p>
              </div>
            )}

            {/* History Panel */}
            {history.length > 0 && (
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-500/30 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Clock className="mr-2 text-gray-400" size={18} />
                  Recent Ideas
                </h3>
                <div className="space-y-3">
                  {history.slice(0, 3).map((idea, index) => (
                    <div 
                      key={index}
                      className="p-3 bg-gray-800/40 rounded-lg border border-gray-600/30 cursor-pointer hover:bg-gray-700/40 transition-colors"
                      onClick={() => setGeneratedIdea(idea)}
                    >
                      <h4 className="font-medium text-white text-sm">{idea.title}</h4>
                      <p className="text-gray-400 text-xs mt-1 line-clamp-2">{idea.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default IdeaForgeAI;