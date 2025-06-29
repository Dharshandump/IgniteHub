import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Lightbulb, Zap, Code, Rocket, Sparkles, Bot } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import ContentContainer from '../components/layout/ContentContainer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const IdeaForgeAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "👋 Hey Innovator! I'm IdeaForge++, your AI project assistant. I can help you brainstorm project ideas, solve technical doubts, suggest hackathon projects, or provide creative solutions. What's on your mind today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // For now, we'll simulate an AI response
      // When you provide the OpenAI API key, we'll implement the actual API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

      const aiResponse: Message = {
        role: 'assistant',
        content: "🤖 I'd love to help you with that! However, I need an OpenAI API key to provide intelligent responses. Once configured, I can help you with:\n\n• 💡 Project idea generation\n• 🔧 Technical problem solving\n• 🚀 Hackathon project suggestions\n• 📚 Learning path recommendations\n• 🎯 Feature implementation ideas\n\nPlease ask the developer to configure the OpenAI API key to unlock my full potential!",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: "⚠️ Oops! Something went wrong. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickPrompts = [
    { icon: <Lightbulb size={16} />, text: "Give me a web app idea", prompt: "Suggest a creative web application project idea for a beginner developer" },
    { icon: <Code size={16} />, text: "Help with React", prompt: "I'm learning React and need help with a specific concept or problem" },
    { icon: <Rocket size={16} />, text: "Hackathon project", prompt: "Suggest an innovative hackathon project idea that could win prizes" },
    { icon: <Zap size={16} />, text: "AI project ideas", prompt: "Give me some AI/ML project ideas suitable for students" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <PageHeader
        title="IdeaForge++"
        subtitle="Your AI Project Assistant for Ideas, Doubts, and Innovation"
        gradient="from-purple-600 via-pink-600 to-blue-600"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <Bot className="text-cyan-400" size={20} />
            <span className="text-white/90 text-sm">AI-Powered Innovation Assistant</span>
          </div>
        </div>
      </PageHeader>

      <ContentContainer className="max-w-4xl">
        {/* Chat Container */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 p-4 border-b border-cyan-500/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                <Sparkles className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-white font-semibold">IdeaForge++ Assistant</h3>
                <p className="text-cyan-300 text-sm">Ready to spark your next big idea</p>
              </div>
              <div className="ml-auto">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-900/30">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-gray-800/80 text-cyan-100 border border-cyan-500/30'
                  } shadow-lg`}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === 'assistant' && (
                      <Bot className="text-cyan-400 mt-1 flex-shrink-0" size={16} />
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-purple-200' : 'text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800/80 border border-cyan-500/30 px-4 py-3 rounded-2xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="text-cyan-400" size={16} />
                    <Loader2 className="text-cyan-400 animate-spin" size={16} />
                    <span className="text-cyan-100 text-sm">IdeaForge++ is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-6 py-3 border-t border-cyan-500/30 bg-gray-900/20">
            <p className="text-cyan-300 text-sm mb-3">Quick prompts to get started:</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInput(prompt.prompt)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-800/60 hover:bg-gray-700/60 border border-cyan-500/30 rounded-lg text-cyan-100 text-sm transition-all duration-200 hover:border-cyan-400/50"
                >
                  {prompt.icon}
                  <span>{prompt.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-cyan-500/30 bg-gray-900/40">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about projects, coding, or innovation..."
                  className="bg-gray-800/60 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 pr-12"
                  disabled={loading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Sparkles className="text-cyan-400" size={16} />
                </div>
              </div>
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 px-6"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Send size={18} />
                )}
              </Button>
            </div>
            <p className="text-gray-400 text-xs mt-2 text-center">
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            {
              icon: <Lightbulb className="text-yellow-400" size={24} />,
              title: "Project Ideas",
              description: "Get creative project suggestions tailored to your skill level"
            },
            {
              icon: <Code className="text-blue-400" size={24} />,
              title: "Technical Help",
              description: "Solve coding problems and learn new concepts"
            },
            {
              icon: <Rocket className="text-purple-400" size={24} />,
              title: "Hackathon Ready",
              description: "Competition-winning project ideas and strategies"
            },
            {
              icon: <Zap className="text-green-400" size={24} />,
              title: "Innovation Focus",
              description: "Cutting-edge ideas using latest technologies"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gray-800/60 rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* API Key Notice */}
        <div className="mt-8 p-6 bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-xl">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="text-amber-400" size={16} />
            </div>
            <div>
              <h3 className="text-amber-300 font-semibold mb-2">Ready for AI Integration</h3>
              <p className="text-amber-100/80 text-sm">
                This page is ready to connect with OpenAI's API. Once you provide your API key, 
                IdeaForge++ will become a powerful AI assistant capable of generating personalized 
                project ideas, solving technical problems, and providing innovative solutions.
              </p>
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default IdeaForgeAI;