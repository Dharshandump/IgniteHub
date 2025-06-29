import React, { useState } from 'react';
import { Zap, Loader2, Sparkles, Code, Users, Clock, Target, Lightbulb, Wrench, Star, ArrowRight, RotateCcw, AlertCircle, CheckCircle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
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
  detailedDescription: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimated_time: string;
  innovation_score: number;
  features: string[];
  suggested_stack: string[];
  targetAudience: string;
  marketPotential: string;
  keyBenefits: string[];
  implementationSteps: string[];
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

interface ProjectStep {
  id: number;
  title: string;
  description: string;
  aiTools: Array<{
    name: string;
    description: string;
    url: string;
    category: string;
  }>;
  tips: string[];
  estimatedTime: string;
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
  const [showProjectSteps, setShowProjectSteps] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

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

  const projectSteps: ProjectStep[] = [
    {
      id: 1,
      title: "🎯 Project Planning & Research",
      description: "Define your project scope, research competitors, and create a detailed plan",
      estimatedTime: "2-4 hours",
      aiTools: [
        {
          name: "ChatGPT",
          description: "Generate project requirements, user stories, and feature lists",
          url: "https://chat.openai.com",
          category: "Planning"
        },
        {
          name: "Claude",
          description: "Analyze competitors and create detailed project documentation",
          url: "https://claude.ai",
          category: "Research"
        },
        {
          name: "Notion AI",
          description: "Organize project plans, timelines, and documentation",
          url: "https://notion.so",
          category: "Organization"
        },
        {
          name: "Miro AI",
          description: "Create mind maps, user journey flows, and project roadmaps",
          url: "https://miro.com",
          category: "Visual Planning"
        }
      ],
      tips: [
        "Start with a clear problem statement",
        "Research 3-5 similar projects for inspiration",
        "Define your target audience clearly",
        "Break down features into must-have vs nice-to-have",
        "Set realistic milestones and deadlines"
      ]
    },
    {
      id: 2,
      title: "🎨 Design & Wireframing",
      description: "Create user interface designs, wireframes, and establish visual identity",
      estimatedTime: "3-6 hours",
      aiTools: [
        {
          name: "Figma AI",
          description: "Generate UI components and design systems automatically",
          url: "https://figma.com",
          category: "Design"
        },
        {
          name: "Uizard",
          description: "Transform sketches into digital wireframes using AI",
          url: "https://uizard.io",
          category: "Wireframing"
        },
        {
          name: "Galileo AI",
          description: "Generate complete UI designs from text descriptions",
          url: "https://usegalileo.ai",
          category: "UI Generation"
        },
        {
          name: "Khroma",
          description: "AI-powered color palette generator for your design",
          url: "https://khroma.co",
          category: "Color"
        },
        {
          name: "Looka",
          description: "Create logos and brand identity with AI assistance",
          url: "https://looka.com",
          category: "Branding"
        }
      ],
      tips: [
        "Start with low-fidelity wireframes before detailed designs",
        "Keep user experience simple and intuitive",
        "Ensure your design is mobile-responsive",
        "Choose a consistent color scheme and typography",
        "Create a style guide for consistency"
      ]
    },
    {
      id: 3,
      title: "⚙️ Development Setup",
      description: "Set up your development environment, choose tools, and initialize project",
      estimatedTime: "1-2 hours",
      aiTools: [
        {
          name: "GitHub Copilot",
          description: "AI pair programmer for faster code writing",
          url: "https://github.com/features/copilot",
          category: "Coding"
        },
        {
          name: "Cursor",
          description: "AI-powered code editor with intelligent suggestions",
          url: "https://cursor.sh",
          category: "IDE"
        },
        {
          name: "Replit AI",
          description: "Cloud-based development with AI assistance",
          url: "https://replit.com",
          category: "Cloud IDE"
        },
        {
          name: "Tabnine",
          description: "AI code completion for multiple programming languages",
          url: "https://tabnine.com",
          category: "Code Completion"
        }
      ],
      tips: [
        "Choose the right tech stack for your project needs",
        "Set up version control (Git) from the beginning",
        "Configure your development environment properly",
        "Install necessary dependencies and tools",
        "Create a clear folder structure"
      ]
    },
    {
      id: 4,
      title: "🏗️ Core Development",
      description: "Build the main functionality, implement features, and write clean code",
      estimatedTime: "60-80% of total time",
      aiTools: [
        {
          name: "GitHub Copilot",
          description: "Generate code snippets and complete functions",
          url: "https://github.com/features/copilot",
          category: "Coding"
        },
        {
          name: "CodeT5",
          description: "AI model for code generation and debugging",
          url: "https://huggingface.co/Salesforce/codet5-base",
          category: "Code Generation"
        },
        {
          name: "Sourcegraph Cody",
          description: "AI coding assistant for understanding large codebases",
          url: "https://sourcegraph.com/cody",
          category: "Code Understanding"
        },
        {
          name: "DeepCode",
          description: "AI-powered code review and bug detection",
          url: "https://snyk.io/platform/deepcode-ai/",
          category: "Code Quality"
        },
        {
          name: "Mintlify",
          description: "Auto-generate documentation for your code",
          url: "https://mintlify.com",
          category: "Documentation"
        }
      ],
      tips: [
        "Start with core features before adding extras",
        "Write clean, readable, and well-commented code",
        "Test your code frequently during development",
        "Follow coding best practices and conventions",
        "Break complex features into smaller, manageable tasks"
      ]
    },
    {
      id: 5,
      title: "🎨 Frontend Implementation",
      description: "Build user interfaces, implement responsive design, and add interactions",
      estimatedTime: "4-8 hours",
      aiTools: [
        {
          name: "v0 by Vercel",
          description: "Generate React components from text descriptions",
          url: "https://v0.dev",
          category: "Component Generation"
        },
        {
          name: "Framer AI",
          description: "Create interactive prototypes and animations",
          url: "https://framer.com",
          category: "Prototyping"
        },
        {
          name: "Tailwind UI",
          description: "Pre-built components with AI-powered customization",
          url: "https://tailwindui.com",
          category: "UI Components"
        },
        {
          name: "Anima",
          description: "Convert Figma designs to React code automatically",
          url: "https://animaapp.com",
          category: "Design to Code"
        }
      ],
      tips: [
        "Implement mobile-first responsive design",
        "Focus on user experience and accessibility",
        "Add smooth animations and transitions",
        "Optimize images and assets for web",
        "Test across different browsers and devices"
      ]
    },
    {
      id: 6,
      title: "🔧 Backend & Database",
      description: "Set up server, database, APIs, and handle data management",
      estimatedTime: "3-6 hours",
      aiTools: [
        {
          name: "Supabase AI",
          description: "Generate database schemas and SQL queries",
          url: "https://supabase.com",
          category: "Database"
        },
        {
          name: "Prisma AI",
          description: "Auto-generate database models and migrations",
          url: "https://prisma.io",
          category: "ORM"
        },
        {
          name: "Retool AI",
          description: "Build admin panels and internal tools quickly",
          url: "https://retool.com",
          category: "Admin Tools"
        },
        {
          name: "Postman AI",
          description: "Generate API tests and documentation",
          url: "https://postman.com",
          category: "API Testing"
        }
      ],
      tips: [
        "Design your database schema carefully",
        "Implement proper authentication and authorization",
        "Create RESTful or GraphQL APIs",
        "Add input validation and error handling",
        "Consider scalability from the beginning"
      ]
    },
    {
      id: 7,
      title: "🧪 Testing & Debugging",
      description: "Test functionality, fix bugs, and ensure quality",
      estimatedTime: "2-4 hours",
      aiTools: [
        {
          name: "Testim",
          description: "AI-powered automated testing for web applications",
          url: "https://testim.io",
          category: "Testing"
        },
        {
          name: "Mabl",
          description: "Intelligent test automation with AI insights",
          url: "https://mabl.com",
          category: "QA Testing"
        },
        {
          name: "DeepSource",
          description: "Automated code review and bug detection",
          url: "https://deepsource.io",
          category: "Code Analysis"
        },
        {
          name: "Sentry AI",
          description: "Intelligent error monitoring and debugging",
          url: "https://sentry.io",
          category: "Error Tracking"
        }
      ],
      tips: [
        "Test all user flows and edge cases",
        "Fix bugs as you find them",
        "Test on different devices and browsers",
        "Get feedback from others",
        "Document known issues and limitations"
      ]
    },
    {
      id: 8,
      title: "🚀 Deployment & Launch",
      description: "Deploy your project, set up hosting, and make it live",
      estimatedTime: "1-3 hours",
      aiTools: [
        {
          name: "Vercel AI",
          description: "Intelligent deployment with automatic optimizations",
          url: "https://vercel.com",
          category: "Hosting"
        },
        {
          name: "Netlify AI",
          description: "Smart deployment with performance insights",
          url: "https://netlify.com",
          category: "Hosting"
        },
        {
          name: "Railway",
          description: "Simple deployment with AI-powered infrastructure",
          url: "https://railway.app",
          category: "Cloud Platform"
        },
        {
          name: "Render",
          description: "Automated deployments with intelligent scaling",
          url: "https://render.com",
          category: "Cloud Hosting"
        }
      ],
      tips: [
        "Choose the right hosting platform for your needs",
        "Set up custom domain if needed",
        "Configure environment variables properly",
        "Test the deployed version thoroughly",
        "Set up monitoring and analytics"
      ]
    },
    {
      id: 9,
      title: "📈 Polish & Optimization",
      description: "Improve performance, add final touches, and optimize user experience",
      estimatedTime: "2-4 hours",
      aiTools: [
        {
          name: "Lighthouse AI",
          description: "Automated performance auditing and optimization suggestions",
          url: "https://developers.google.com/web/tools/lighthouse",
          category: "Performance"
        },
        {
          name: "Hotjar AI",
          description: "User behavior analytics with AI insights",
          url: "https://hotjar.com",
          category: "Analytics"
        },
        {
          name: "Optimizely",
          description: "AI-powered A/B testing and optimization",
          url: "https://optimizely.com",
          category: "Optimization"
        },
        {
          name: "TinyPNG",
          description: "AI-powered image compression",
          url: "https://tinypng.com",
          category: "Image Optimization"
        }
      ],
      tips: [
        "Optimize loading times and performance",
        "Add final UI polish and animations",
        "Implement SEO best practices",
        "Add social sharing capabilities",
        "Create a compelling project description"
      ]
    },
    {
      id: 10,
      title: "🎉 Documentation & Showcase",
      description: "Create documentation, demo videos, and prepare for presentation",
      estimatedTime: "1-2 hours",
      aiTools: [
        {
          name: "Gitiles",
          description: "AI-generated README files and documentation",
          url: "https://readme.so",
          category: "Documentation"
        },
        {
          name: "Loom AI",
          description: "Create demo videos with AI-powered editing",
          url: "https://loom.com",
          category: "Video"
        },
        {
          name: "Gamma",
          description: "AI-powered presentation creation",
          url: "https://gamma.app",
          category: "Presentations"
        },
        {
          name: "Canva AI",
          description: "Create project thumbnails and promotional graphics",
          url: "https://canva.com",
          category: "Graphics"
        }
      ],
      tips: [
        "Write clear installation and usage instructions",
        "Create an engaging demo video",
        "Add screenshots and examples",
        "Prepare a compelling pitch presentation",
        "Share your project on relevant platforms"
      ]
    }
  ];

  const handleTechStackToggle = (tech: string) => {
    setInputs(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
    }));
  };

  const buildPrompt = (): string => {
    return `You are an expert project idea generator for young innovators and developers. Generate a comprehensive, innovative project idea based on these specifications:

Theme: ${inputs.theme}
Design Style: ${inputs.designStyle}
Tech Stack: ${inputs.techStack.join(', ') || 'Any suitable technologies'}
Team Size: ${inputs.teamSize}
Build Time: ${inputs.buildTime}
Intent/Mood: ${inputs.intent || 'Professional and impactful'}
Special Requirements: ${inputs.specialRequests || 'None specified'}

Create a detailed project idea that is:
1. Innovative and unique
2. Feasible within the given timeframe
3. Aligned with the specified theme and requirements
4. Suitable for the team size
5. Commercially viable or socially impactful

Return ONLY a valid JSON response in this exact format:
{
  "title": "Creative and catchy project name",
  "description": "Brief 1-2 sentence overview of the project",
  "detailedDescription": "Comprehensive 4-5 sentence description explaining the project's purpose, functionality, target users, unique features, and potential impact",
  "difficulty": "Easy|Medium|Hard",
  "estimated_time": "${inputs.buildTime}",
  "innovation_score": 85,
  "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
  "suggested_stack": ["Tech1", "Tech2", "Tech3", "Tech4"],
  "targetAudience": "Specific description of who would use this project",
  "marketPotential": "Brief analysis of market opportunity and potential impact",
  "keyBenefits": ["Benefit 1", "Benefit 2", "Benefit 3"],
  "implementationSteps": ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"]
}

Make it creative, practical, and aligned with current technology trends. Ensure the innovation score reflects genuine uniqueness and market potential.`;
  };

  // Check if OpenAI API key is configured
  const getOpenAIKey = () => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    console.log('Checking OpenAI API Key:', apiKey ? 'Present' : 'Missing');
    return apiKey && apiKey.trim() !== '' && !apiKey.includes('your_openai_api_key_here') ? apiKey : null;
  };

  const forgeIdea = async () => {
    if (!inputs.theme || !inputs.designStyle || !inputs.teamSize || !inputs.buildTime) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setApiError(null);
    
    try {
      const apiKey = getOpenAIKey();
      
      if (!apiKey) {
        throw new Error('OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your environment variables.');
      }

      console.log('Making OpenAI API request...');

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
              content: "You are a creative project idea generator for young innovators. Always respond with valid JSON only, no additional text or formatting. Generate detailed, innovative, and feasible project ideas."
            },
            {
              role: "user",
              content: buildPrompt()
            }
          ],
          max_tokens: 1200,
          temperature: 0.8,
        }),
      });

      console.log('OpenAI API Response Status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('OpenAI API Error:', errorData);
        throw new Error(`OpenAI API Error (${response.status}): ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('OpenAI API Response:', data);
      
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error('No response content from OpenAI API');
      }

      // Clean the content to ensure it's valid JSON
      const cleanContent = content.trim().replace(/```json\n?|\n?```/g, '');
      
      try {
        const idea: ProjectIdea = JSON.parse(cleanContent);
        console.log('Generated Idea:', idea);
        
        setGeneratedIdea(idea);
        setHistory(prev => [idea, ...prev.slice(0, 4)]); // Keep last 5 ideas
        
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.error('Content that failed to parse:', cleanContent);
        throw new Error('Failed to parse AI response. Please try again.');
      }
      
    } catch (error: any) {
      console.error('Error generating idea:', error);
      setApiError(error.message);
      
      // Enhanced fallback idea with all required fields
      const fallbackIdea: ProjectIdea = {
        title: "EcoTrack - Smart Carbon Footprint Tracker",
        description: "A gamified web application that helps users track their daily carbon footprint through interactive challenges and provides personalized recommendations for sustainable living.",
        detailedDescription: "EcoTrack is an innovative web application designed to make environmental consciousness engaging and actionable. Users can log their daily activities such as transportation, energy consumption, and food choices, while the app calculates their carbon footprint in real-time. The platform features a gamification system with badges, leaderboards, and challenges to motivate users towards more sustainable behaviors. Advanced AI algorithms provide personalized recommendations based on user patterns, local climate data, and available eco-friendly alternatives. The app also includes a social component where users can share achievements, participate in community challenges, and connect with like-minded individuals committed to reducing their environmental impact.",
        difficulty: inputs.buildTime === '2 hours' || inputs.buildTime === '4 hours' ? 'Easy' : 
                   inputs.buildTime === '8 hours' || inputs.buildTime === '12 hours' ? 'Medium' : 'Hard',
        estimated_time: inputs.buildTime,
        innovation_score: 78,
        features: [
          "Daily activity logging with smart categorization",
          "Real-time carbon footprint calculation",
          "Gamification with badges and achievements",
          "AI-powered personalized recommendations",
          "Social sharing and community challenges",
          "Local environmental data integration",
          "Progress tracking and analytics dashboard"
        ],
        suggested_stack: inputs.techStack.length > 0 ? inputs.techStack.slice(0, 4) : ["React", "Node.js", "MongoDB", "Chart.js"],
        targetAudience: "Environmentally conscious individuals aged 18-35 who want to reduce their carbon footprint but need guidance and motivation to maintain sustainable habits",
        marketPotential: "Growing environmental awareness and corporate sustainability initiatives create a strong market opportunity. Potential for B2B partnerships with companies tracking employee sustainability metrics.",
        keyBenefits: [
          "Increased environmental awareness and action",
          "Gamified approach makes sustainability engaging",
          "Data-driven insights for better decision making",
          "Community support and motivation"
        ],
        implementationSteps: [
          "Set up project structure and basic UI components",
          "Implement user authentication and profile management",
          "Create activity logging system with carbon calculation",
          "Build gamification features and achievement system",
          "Integrate social features and community challenges",
          "Add AI recommendations and analytics dashboard",
          "Test, optimize, and deploy the application"
        ]
      };
      
      setGeneratedIdea(fallbackIdea);
      setHistory(prev => [fallbackIdea, ...prev.slice(0, 4)]);
    } finally {
      setLoading(false);
    }
  };

  const handleProceedWithProject = () => {
    setShowProjectSteps(true);
    // Scroll to project steps section
    setTimeout(() => {
      const stepsElement = document.getElementById('project-steps');
      if (stepsElement) {
        stepsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
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
    return getOpenAIKey() !== null;
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
            <span className="text-white/90 text-sm">
              {isApiKeyConfigured() ? 'AI-Powered Project Generator' : 'Demo Mode - Configure OpenAI API Key'}
            </span>
          </div>
        </div>
      </PageHeader>

      <ContentContainer className="max-w-6xl">
        {/* API Key Status */}
        {!isApiKeyConfigured() && (
          <div className="mb-8 p-6 bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-xl">
            <div className="flex items-start space-x-3">
              <AlertCircle className="text-amber-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-amber-300 font-semibold mb-2">OpenAI API Key Required</h3>
                <p className="text-amber-100/80 mb-3">
                  To use the full AI-powered idea generation, please configure your OpenAI API key in the environment variables.
                </p>
                <div className="bg-amber-900/30 rounded-lg p-3 border border-amber-500/20">
                  <p className="text-amber-200 text-sm font-mono">
                    Add: VITE_OPENAI_API_KEY=your_api_key_here
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Error Display */}
        {apiError && (
          <div className="mb-8 p-6 bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-500/30 rounded-xl">
            <div className="flex items-start space-x-3">
              <AlertCircle className="text-red-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-red-300 font-semibold mb-2">API Error</h3>
                <p className="text-red-100/80">{apiError}</p>
                <p className="text-red-200/60 text-sm mt-2">
                  Using fallback idea generation. Please check your OpenAI API key and try again.
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
                    {isApiKeyConfigured() ? 'Forging Your Idea...' : 'Generating Fallback Idea...'}
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

                  {/* Brief Description */}
                  <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl p-4 border border-blue-500/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="text-blue-400" size={18} />
                      <span className="text-blue-300 font-medium">Quick Overview</span>
                    </div>
                    <p className="text-gray-200 leading-relaxed">{generatedIdea.description}</p>
                  </div>

                  {/* Detailed Mission Brief */}
                  <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-xl p-4 border border-indigo-500/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <Code className="text-indigo-400" size={18} />
                      <span className="text-indigo-300 font-medium">Detailed Mission Brief</span>
                    </div>
                    <p className="text-gray-200 leading-relaxed">{generatedIdea.detailedDescription}</p>
                  </div>

                  {/* Target Audience & Market Potential */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-4 border border-green-500/30">
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="text-green-400" size={18} />
                        <span className="text-green-300 font-medium">Target Audience</span>
                      </div>
                      <p className="text-gray-200 text-sm leading-relaxed">{generatedIdea.targetAudience}</p>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-4 border border-yellow-500/30">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="text-yellow-400" size={18} />
                        <span className="text-yellow-300 font-medium">Market Potential</span>
                      </div>
                      <p className="text-gray-200 text-sm leading-relaxed">{generatedIdea.marketPotential}</p>
                    </div>
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

                  {/* Key Benefits */}
                  <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl p-4 border border-emerald-500/30">
                    <div className="flex items-center space-x-2 mb-3">
                      <CheckCircle className="text-emerald-400" size={18} />
                      <span className="text-emerald-300 font-medium">Key Benefits</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {generatedIdea.keyBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                          <span className="text-gray-200">{benefit}</span>
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

                  {/* Implementation Steps */}
                  <div className="bg-gradient-to-r from-violet-900/30 to-purple-900/30 rounded-xl p-4 border border-violet-500/30">
                    <div className="flex items-center space-x-2 mb-3">
                      <ArrowRight className="text-violet-400" size={18} />
                      <span className="text-violet-300 font-medium">Implementation Roadmap</span>
                    </div>
                    <div className="space-y-2">
                      {generatedIdea.implementationSteps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-violet-500/20 rounded-full flex items-center justify-center text-violet-300 text-sm font-bold mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-gray-200 text-sm">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4">
                    <Button 
                      onClick={handleProceedWithProject}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-3"
                    >
                      <ArrowRight className="mr-2" size={18} />
                      Proceed with Project
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

        {/* Project Steps Guide */}
        {showProjectSteps && generatedIdea && (
          <div id="project-steps" className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                🛠️ Step-by-Step Project Guide
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Follow this comprehensive guide to build <span className="text-cyan-400 font-semibold">{generatedIdea.title}</span> from start to finish, with AI tools to help you at every step.
              </p>
            </div>

            <div className="space-y-6">
              {projectSteps.map((step, index) => (
                <div key={step.id} className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl overflow-hidden">
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-800/30 transition-colors"
                    onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {step.id}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                          <p className="text-gray-300">{step.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-cyan-400 flex items-center">
                              <Clock size={14} className="mr-1" />
                              {step.estimatedTime}
                            </span>
                            <span className="text-sm text-purple-400">
                              {step.aiTools.length} AI tools available
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-cyan-400">
                        {expandedStep === step.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                      </div>
                    </div>
                  </div>

                  {expandedStep === step.id && (
                    <div className="border-t border-cyan-500/30 p-6 bg-gray-800/20">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* AI Tools */}
                        <div>
                          <h4 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center">
                            <Zap className="mr-2" size={18} />
                            Recommended AI Tools
                          </h4>
                          <div className="space-y-3">
                            {step.aiTools.map((tool, toolIndex) => (
                              <div key={toolIndex} className="bg-gray-900/40 rounded-lg p-4 border border-gray-600/30">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h5 className="font-semibold text-white">{tool.name}</h5>
                                    <span className="text-xs text-purple-400 bg-purple-400/20 px-2 py-1 rounded-full">
                                      {tool.category}
                                    </span>
                                  </div>
                                  <a 
                                    href={tool.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                                  >
                                    <ExternalLink size={16} />
                                  </a>
                                </div>
                                <p className="text-gray-300 text-sm">{tool.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tips */}
                        <div>
                          <h4 className="text-lg font-semibold text-green-300 mb-4 flex items-center">
                            <CheckCircle className="mr-2" size={18} />
                            Pro Tips for Beginners
                          </h4>
                          <div className="space-y-3">
                            {step.tips.map((tip, tipIndex) => (
                              <div key={tipIndex} className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-300 text-sm">{tip}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-purple-500/30">
                <h3 className="text-2xl font-bold text-white mb-4">🎉 Ready to Start Building?</h3>
                <p className="text-gray-300 mb-6">
                  You now have a complete roadmap to build {generatedIdea.title}. Remember, the key to success is starting small and iterating quickly!
                </p>
                <div className="flex justify-center space-x-4">
                  <Button 
                    onClick={() => setShowProjectSteps(false)}
                    variant="outline"
                    className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20"
                  >
                    Back to Blueprint
                  </Button>
                  <Button 
                    onClick={forgeIdea}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                  >
                    <Zap className="mr-2" size={16} />
                    Generate New Idea
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </ContentContainer>
    </div>
  );
};

export default IdeaForgeAI;