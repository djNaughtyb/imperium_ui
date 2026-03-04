import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';
import {
  Palette, Sparkles, Film, BookOpen, Zap, Crown,
  ArrowLeft, CreditCard, Plus, Minus, Check,
  Shield, Star, Flame, Skull, Heart, Rocket,
  Search, Coffee, Users
} from 'lucide-react';

const ComicStudio = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('comics'); // 'comics' or 'storyboards'
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [panelCount, setPanelCount] = useState(6);
  const [generating, setGenerating] = useState(false);

  const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

  // Comic book genres
  const comicGenres = [
    { id: 'superhero', label: 'Superhero', icon: <Shield className="w-5 h-5" />, color: 'from-blue-500 to-indigo-600' },
    { id: 'manga', label: 'Manga', icon: <Star className="w-5 h-5" />, color: 'from-pink-500 to-rose-500' },
    { id: 'action', label: 'Action', icon: <Flame className="w-5 h-5" />, color: 'from-orange-500 to-red-500' },
    { id: 'horror', label: 'Horror', icon: <Skull className="w-5 h-5" />, color: 'from-gray-700 to-black' },
    { id: 'romance', label: 'Romance', icon: <Heart className="w-5 h-5" />, color: 'from-pink-400 to-red-400' },
    { id: 'sci-fi', label: 'Sci-Fi', icon: <Rocket className="w-5 h-5" />, color: 'from-cyan-500 to-blue-600' },
    { id: 'fantasy', label: 'Fantasy', icon: <Sparkles className="w-5 h-5" />, color: 'from-purple-500 to-violet-600' },
    { id: 'mystery', label: 'Mystery', icon: <Search className="w-5 h-5" />, color: 'from-slate-500 to-gray-700' },
    { id: 'comedy', label: 'Comedy', icon: <Coffee className="w-5 h-5" />, color: 'from-yellow-400 to-orange-400' },
    { id: 'slice-of-life', label: 'Slice of Life', icon: <Users className="w-5 h-5" />, color: 'from-green-400 to-teal-400' },
  ];

  // Storyboard/movie genres
  const storyboardGenres = [
    { id: 'action-movie', label: 'Action Film', icon: <Flame className="w-5 h-5" />, color: 'from-red-500 to-orange-500' },
    { id: 'thriller', label: 'Thriller', icon: <Zap className="w-5 h-5" />, color: 'from-gray-600 to-slate-800' },
    { id: 'drama', label: 'Drama', icon: <Heart className="w-5 h-5" />, color: 'from-purple-400 to-pink-400' },
    { id: 'comedy-film', label: 'Comedy', icon: <Star className="w-5 h-5" />, color: 'from-yellow-400 to-amber-400' },
    { id: 'horror-film', label: 'Horror', icon: <Skull className="w-5 h-5" />, color: 'from-gray-800 to-black' },
    { id: 'sci-fi-film', label: 'Sci-Fi', icon: <Rocket className="w-5 h-5" />, color: 'from-blue-500 to-cyan-500' },
    { id: 'romance-film', label: 'Romance', icon: <Heart className="w-5 h-5" />, color: 'from-rose-400 to-pink-500' },
    { id: 'documentary', label: 'Documentary', icon: <Film className="w-5 h-5" />, color: 'from-emerald-500 to-teal-500' },
    { id: 'animation', label: 'Animation', icon: <Palette className="w-5 h-5" />, color: 'from-violet-500 to-purple-500' },
    { id: 'commercial', label: 'Commercial/Ad', icon: <CreditCard className="w-5 h-5" />, color: 'from-amber-500 to-yellow-500' },
  ];

  // Single subscription plan
  const plans = [
    {
      id: 'comic_pro',
      name: 'Comic Studio Pro',
      price: 49.62,
      credits: 50,
      features: [
        '50 credits/month',
        'Comic book creation',
        'Storyboard creation',
        'All genres',
        'HD exports',
        'Panel templates'
      ]
    }
  ];

  // Credit packs (refills, not tiers)
  const creditPacks = [
    { credits: 25, price: 9.99 },
    { credits: 50, price: 20.99 },
    { credits: 100, price: 44.99 },
    { credits: 250, price: 99.99 },
  ];

  const getGenerationCost = () => {
    if (panelCount <= 6) return 5;
    if (panelCount <= 12) return 10;
    return 15;
  };

  useEffect(() => {
    fetchSubscription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSubscription = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${API}/comic-studio/subscription`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubscription(response.data);
    } catch (error) {
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!user) {
      toast.error('Please login to subscribe');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(
        `${API}/comic-studio/subscribe`,
        { plan_id: 'comic_pro' },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success('Subscribed to Comic Studio Pro!');
        setSubscription(response.data.subscription);
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Subscription failed');
    }
  };

  const handleBuyCredits = async (pack) => {
    if (!user) {
      toast.error('Please login to purchase credits');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(
        `${API}/comic-studio/buy-credits`,
        { credits: pack.credits, price: pack.price },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success(`Added ${pack.credits} credits!`);
        setSubscription(prev => ({
          ...prev,
          credits: (prev?.credits || 0) + pack.credits
        }));
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Purchase failed');
    }
  };

  const handleGenerate = async () => {
    if (!subscription || subscription.credits < 1) {
      toast.error('Insufficient credits');
      return;
    }

    if (!selectedGenre || !prompt.trim()) {
      toast.error('Please select a genre and enter a description');
      return;
    }

    const cost = getGenerationCost();
    if (subscription.credits < cost) {
      toast.error(`You need ${cost} credits for this generation, but only have ${subscription.credits}.`);
      return;
    }

    setGenerating(true);
    try {
      const response = await axios.post(
        `${API}/comic-studio/generate`,
        {
          type: selectedTab === 'comics' ? 'comic' : 'storyboard',
          genre: selectedGenre,
          prompt: prompt.trim(),
          panel_count: panelCount,
          cost
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success(`${selectedTab === 'comics' ? 'Comic' : 'Storyboard'} generation started!`);
        setSubscription(prev => ({
          ...prev,
          credits: prev.credits - cost
        }));
        navigate(`/comic-studio/view/${response.data.project_id}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Generation failed');
    } finally {
      setGenerating(false);
    }
  };

  const genres = selectedTab === 'comics' ? comicGenres : storyboardGenres;
  const generationCost = getGenerationCost();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-violet-500/30 border-t-violet-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-slate-400 hover:text-white transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              {/* EMPIRE / COWICS wordmark placeholder */}
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-black tracking-wide text-white">
                  EMPIRE
                </span>
                <span className="text-xs font-bold tracking-[0.25em] text-white/80 -mt-1">
                  COWICS
                </span>
              </div>
              <span className="text-sm text-slate-400 hidden sm:inline">
                Comic Studio
              </span>
            </div>
          </div>

          {subscription && (
            <div className="flex items-center gap-4">
              <div className="bg-white/5 rounded-xl px-4 py-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">{subscription.credits}</span>
                <span className="text-slate-400 text-sm">credits</span>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Not Subscribed - Show Plans */}
        {!subscription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Create Stunning <span className="text-cyan-400">Comics</span> & <span className="text-purple-400">Storyboards</span>
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              AI-powered comic book and storyboard creation. Generate professional panels,
              layouts, and complete visual stories from your ideas.
            </p>

            {/* Subscription Card */}
            <div className="max-w-md mx-auto">
              <div className="glass rounded-3xl p-8 border border-cyan-500/30">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Crown className="w-6 h-6 text-amber-400" />
                  <span className="text-lg font-semibold">Comic Studio Pro</span>
                </div>

                <div className="text-center mb-6">
                  <span className="text-5xl font-bold">$49.62</span>
                  <span className="text-slate-400">/month</span>
                  <div className="text-cyan-400 font-medium mt-2">50 credits included</div>
                </div>

                <ul className="space-y-3 mb-8 text-left">
                  {plans[0].features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleSubscribe}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
                  data-testid="subscribe-comic-btn"
                >
                  <Sparkles className="w-5 h-5" />
                  Subscribe Now
                </button>
              </div>
            </div>

            {/* Credit Packs */}
            <div className="mt-12" id="credit-packs">
              <h3 className="text-xl font-semibold mb-6">Or Buy Credit Packs</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {creditPacks.map((pack) => (
                  <button
                    key={pack.credits}
                    onClick={() => handleBuyCredits(pack)}
                    className="glass rounded-xl p-4 hover:border-cyan-500/50 transition border border-white/10"
                    data-testid={`buy-${pack.credits}-credits`}
                  >
                    <div className="text-2xl font-bold text-cyan-400">{pack.credits}</div>
                    <div className="text-slate-400 text-sm">credits</div>
                    <div className="text-white font-semibold mt-2">${pack.price}</div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Subscribed - Show Creator */}
        {subscription && (
          <>
            {/* Tab Switcher */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/5 rounded-2xl p-1.5 flex gap-1">
                <button
                  onClick={() => { setSelectedTab('comics'); setSelectedGenre(null); }}
                  className={`px-6 py-3 rounded-xl font-medium transition flex items-center gap-2 ${
                    selectedTab === 'comics'
                      ? 'bg-cyan-500 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  data-testid="tab-comics"
                >
                  <BookOpen className="w-5 h-5" />
                  Comic Books
                </button>
                <button
                  onClick={() => { setSelectedTab('storyboards'); setSelectedGenre(null); }}
                  className={`px-6 py-3 rounded-xl font-medium transition flex items-center gap-2 ${
                    selectedTab === 'storyboards'
                      ? 'bg-purple-500 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  data-testid="tab-storyboards"
                >
                  <Film className="w-5 h-5" />
                  Storyboards
                </button>
              </div>
            </div>

            {/* Genre Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Select {selectedTab === 'comics' ? 'Comic' : 'Storyboard'} Genre
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {genres.map((genre) => (
                  <motion.button
                    key={genre.id}
                    onClick={() => setSelectedGenre(genre.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-4 rounded-xl text-left transition-all ${
                      selectedGenre === genre.id
                        ? `bg-gradient-to-br ${genre.color} text-white`
                        : 'bg-white/5 border border-white/10 hover:border-white/20 text-slate-300'
                    }`}
                    data-testid={`genre-${genre.id}`}
                  >
                    <div className="flex items-center gap-2">
                      {genre.icon}
                      <span className="text-sm font-medium">{genre.label}</span>
                    </div>
                    {selectedGenre === genre.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-violet-600" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Story/Scene Description */}
            <div className="mb-8">
              <label className="block text-lg font-semibold mb-4 text-center">
                Describe Your {selectedTab === 'comics' ? 'Comic Story' : 'Scene'}
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={selectedTab === 'comics'
                  ? "Describe your comic story... (e.g., 'A young hero discovers their powers during a high school basketball game')"
                  : "Describe your scene... (e.g., 'Opening shot of a busy city street at sunset, camera slowly zooms into a coffee shop window')"
                }
                className="w-full h-32 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition resize-none"
                data-testid="story-prompt"
              />
            </div>

            {/* Panel Count + Cost */}
            <div className="mb-8 flex justify-center">
              <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4">
                <span className="text-slate-400">Panels:</span>
                <button
                  onClick={() => setPanelCount(Math.max(4, panelCount - 2))}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xl font-bold w-12 text-center">{panelCount}</span>
                <button
                  onClick={() => setPanelCount(Math.min(20, panelCount + 2))}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <div className="flex flex-col text-sm text-slate-300">
                  <span>Cost: <span className="font-semibold text-cyan-400">{generationCost}</span> credits</span>
                  <span className="text-xs text-slate-500">
                    Small: 5 • Medium: 10 • Large: 15
                  </span>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center">
              <button
                onClick={handleGenerate}
                disabled={generating || !selectedGenre || !prompt.trim()}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold hover:opacity-90 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="generate-btn"
              >
                {generating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate {selectedTab === 'comics' ? 'Comic' : 'Storyboard'} ({generationCost} credits)
                  </>
                )}
              </button>
            </div>

            {/* Credits Info */}
            <div className="mt-8 text-center text-slate-400 text-sm">
              <p>
                Each generation costs 5–15 credits based on size • You have {subscription.credits} credits remaining
              </p>
              <button
                onClick={() => document.getElementById('credit-packs').scrollIntoView({ behavior: 'smooth' })}
                className="text-cyan-400 hover:text-cyan-300 mt-2"
              >
                Need more credits?
              </button>
            </div>

            {/* Credit Packs for Subscribers */}
            <div id="credit-packs" className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-xl font-semibold mb-6 text-center">Buy More Credits</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {creditPacks.map((pack) => (
                  <button
                    key={pack.credits}
                    onClick={() => handleBuyCredits(pack)}
                    className="glass rounded-xl p-4 hover:border-cyan-500/50 transition border border-white/10"
                  >
                    <div className="text-2xl font-bold text-cyan-400">{pack.credits}</div>
                    <div className="text-slate-400 text-sm">credits</div>
                    <div className="text-white font-semibold mt-2">${pack.price}</div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ComicStudio;
