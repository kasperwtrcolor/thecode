import { useState, useEffect, useCallback } from 'react';
import { useDevapp, UserButton, DevappProvider } from '@devfunlabs/web-sdk';
import { Trophy, Vault, Users, History, Play, Shield, Star, Crown, Zap, X, Info, Award, Target, Timer, Coins, MessageSquare, Flame, ShieldCheck, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';
const Confetti = ({
  isActive,
  onComplete
}) => {
  const confettiPieces = Array.from({
    length: 50
  }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: -10,
    rotation: Math.random() * 360,
    color: ['#FFE94E', '#FF6B9D', '#4ECDC4', '#45B7D1', '#96CEB4'][Math.floor(Math.random() * 5)],
    size: Math.random() * 8 + 4
  }));
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);
  if (!isActive) return null;
  return <div className="fixed inset-0 pointer-events-none z-40">
      {confettiPieces.map(piece => <motion.div key={piece.id} className="absolute" initial={{
      x: piece.x,
      y: piece.y,
      rotate: piece.rotation,
      opacity: 1
    }} animate={{
      y: window.innerHeight + 20,
      rotate: piece.rotation + 720,
      opacity: 0
    }} transition={{
      duration: 3,
      ease: "easeOut"
    }} style={{
      width: piece.size,
      height: piece.size,
      backgroundColor: piece.color,
      borderRadius: '2px'
    }} />)}
    </div>;
};
const FallingEmojis = ({
  isActive,
  onComplete
}) => {
  const sadEmojis = ['😢', '😭', '😔', '😞', '💔', '😿'];
  const emojiPieces = Array.from({
    length: 20
  }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: -30,
    emoji: sadEmojis[Math.floor(Math.random() * sadEmojis.length)],
    rotation: Math.random() * 20 - 10,
    size: Math.random() * 20 + 30
  }));
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);
  if (!isActive) return null;
  return <div className="fixed inset-0 pointer-events-none z-30">
      {}
      <motion.div className="absolute inset-0 flex items-center justify-center" initial={{
      opacity: 0,
      scale: 0.5,
      y: -50
    }} animate={{
      opacity: 1,
      scale: 1,
      y: 0
    }} exit={{
      opacity: 0,
      scale: 0.5,
      y: 50
    }} transition={{
      duration: 0.6,
      ease: "backOut"
    }}>
        <div className="main-title text-4xl md:text-6xl font-black text-red-500 text-center px-4" style={{
        textShadow: '0 0 40px rgba(239,68,68,0.8), 0 0 80px rgba(239,68,68,0.4), 3px 3px 0 white, -3px -3px 0 white, 3px -3px 0 white, -3px 3px 0 white',
        color: '#EF4444'
      }}>
          WRONG CODE!
        </div>
      </motion.div>
      {}
      {emojiPieces.map(piece => <motion.div key={piece.id} className="absolute emoji-sticker" initial={{
      x: piece.x,
      y: piece.y,
      rotate: piece.rotation,
      opacity: 1
    }} animate={{
      y: window.innerHeight + 50,
      rotate: piece.rotation + 180,
      opacity: 0
    }} transition={{
      duration: 2.5,
      ease: "easeOut"
    }} style={{
      fontSize: piece.size
    }}>
          {piece.emoji}
        </motion.div>)}
    </div>;
};
const ArrowIcon = ({
  size = 32
}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="glow-icon">
    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
const VaultArrows = ({
  isVisible,
  onComplete
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);
  if (!isVisible) return null;
  return <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center">
      <div className="flex gap-2">
        {Array.from({
        length: 3
      }, (_, i) => <motion.div key={i} initial={{
        opacity: 0,
        y: 20,
        scale: 0.5
      }} animate={{
        opacity: 1,
        y: [-10, -30, -10],
        scale: [1, 1.2, 1]
      }} transition={{
        duration: 1.5,
        repeat: 2,
        delay: i * 0.1,
        ease: "easeInOut"
      }} style={{
        color: 'var(--yellow)',
        filter: 'drop-shadow(0 0 20px rgba(255,233,78,0.6))'
      }}>
            <ArrowIcon size={40} />
          </motion.div>)}
      </div>
    </div>;
};
const CelebrationPopup = ({
  isVisible,
  winnerInfo,
  prizeAmount,
  onClose
}) => {
  if (!isVisible || !winnerInfo) return null;
  return <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <motion.div className="bg-white rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl" initial={{
      scale: 0.5,
      opacity: 0,
      rotateY: -180
    }} animate={{
      scale: 1,
      opacity: 1,
      rotateY: 0
    }} transition={{
      duration: 0.6,
      ease: "backOut"
    }}>
        <motion.div animate={{
        rotate: [0, 10, -10, 0]
      }} transition={{
        duration: 0.5,
        repeat: 3
      }}>
          <Crown className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        </motion.div>
        <motion.h2 className="text-3xl font-bold text-black mb-4 bg-white border-2 border-black rounded-xl px-4 py-2 inline-block" animate={{
        scale: [1, 1.1, 1]
      }} transition={{
        duration: 0.8,
        repeat: 2
      }}>
          🎉 CODE CRACKED! 🎉
        </motion.h2>
        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-lg font-bold text-black">
              <span className="text-yellow-600 font-bold">WINNER:</span><br />
              {winnerInfo.userId.slice(0, 12).toUpperCase()}...
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-lg font-bold text-black">
              <span className="text-yellow-600 font-bold">WINNING CODE:</span><br />
              <span className="font-mono text-2xl text-black">{winnerInfo.guess}</span>
            </p>
          </div>
          <motion.div className="bg-gray-50 rounded-2xl p-4" animate={{
          scale: [1, 1.05, 1]
        }} transition={{
          duration: 1,
          repeat: Infinity
        }}>
            <p className="text-xl font-bold text-yellow-600">
              PRIZE: {prizeAmount.toFixed(3)} SOL 💰
            </p>
          </motion.div>
        </div>
        <button onClick={onClose} className="cyber-button-primary px-8 py-3">
          AWESOME! 🚀
        </button>
      </motion.div>
    </div>;
};
const NavButton = ({
  icon: Icon,
  onClick,
  label,
  className = "",
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return <motion.button onClick={onClick} className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/30 transition-colors duration-200 group relative ${className}`} whileHover={{
    backgroundColor: "rgba(255,255,255,0.25)",
    scale: 1.05
  }} whileTap={{
    scale: 0.9
  }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} aria-label={label} role="button" tabIndex={0} {...props}>
      <Icon className="w-4 h-4 transition-colors duration-200 cartoon-icon" />
      
      {}
      <motion.div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded-md whitespace-nowrap pointer-events-none z-50" initial={{
      opacity: 0,
      y: 5,
      scale: 0.8
    }} animate={isHovered ? {
      opacity: 1,
      y: 0,
      scale: 1
    } : {
      opacity: 0,
      y: 5,
      scale: 0.8
    }} transition={{
      duration: 0.15,
      ease: "easeOut"
    }} style={{
      fontSize: '10px',
      fontFamily: 'Outfit, system-ui',
      textTransform: 'uppercase',
      letterSpacing: '0.02em'
    }}>
        {label}
        {}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black/80" />
      </motion.div>
    </motion.button>;
};
const TwitterHypeGenerator = ({
  vaultBalance,
  activeRound,
  recentGuesses,
  totalPlayers
}) => {
  const [selectedCategory, setSelectedCategory] = useState('prizepool');
  const [generatedTweet, setGeneratedTweet] = useState('');
  const [showCopied, setShowCopied] = useState(false);
  const tweetTemplates = {
    prizepool: [`🚨 THE VAULT IS GROWING! 🚨\n\n💰 ${vaultBalance.toFixed(3)} SOL up for grabs!\n🔓 Can YOU crack the 3-digit code?\n⚡ Every guess grows the prize!\n\n#TheCryptoCode #SolanaGaming #CrackTheCode\n\nhttps://dev.fun/p/4f152fb16842a0f7954e\nbuilt on @devfunpump`, `📈 PRIZE POOL ALERT! 📈\n\n${vaultBalance.toFixed(3)} SOL waiting for the code breaker! 🔑\n\nOne lucky player will take 95% of this vault 💎\nWho's brave enough to try? 🎯\n\n#SolanaGaming #CryptoGuessing\n\nhttps://dev.fun/p/4f152fb16842a0f7954e\nbuilt on @devfunpump`, `💥 ${vaultBalance.toFixed(3)} SOL VAULT! 💥\n\nThe prize keeps growing with every failed attempt 📊\nSomeone WILL crack this code... will it be you? 🤔\n\n#TheCode #Solana #CryptoChallenge\n\nhttps://dev.fun/p/4f152fb16842a0f7954e\nbuilt on @devfunpump`],
    newround: [`🎮 NEW ROUND STARTED! 🎮\n\n🔐 Fresh 3-digit code is set\n💰 ${activeRound?.feePerGuess || 0.01} SOL per guess\n🎯 Winner takes 95% of vault!\n\n000-999... what's your guess? 🤯\n\n#NewRound #CrackTheCode #SolanaGaming\n\nhttps://dev.fun/p/4f152fb16842a0f7954e\nbuilt on @devfunpump`, `🚀 GAME ON! NEW ROUND LIVE! 🚀\n\nAdmin has chosen a secret code 🤫\nEvery guess fuels the prize pool 💰\nOne perfect guess wins it all! ⚡\n\n#TheCryptoCode #NewRound #Solana\n\nhttps://dev.fun/p/4f152fb16842a0f7954e\nbuilt on @devfunpump`, `🔥 FRESH CODE ALERT! 🔥\n\nNew round just dropped! 📦\n${activeRound?.feePerGuess || 0.01} SOL to play, infinite SOL to win 💎\n\nThink you can break the code? 🧠\n\n#CrackTheCode #SolanaGaming\n\nhttps://dev.fun/p/4f152fb16842a0f7954e\nbuilt on @devfunpump`],
    digitmatch: [`🎯 DIGIT MATCH SPOTTED! 🎯\n\nSomeone just hit a correct digit! 🔥\nThey're getting warmer... 🌡️\nWho will crack the full code? 🤔\n\n#DigitMatch #CloseCall #CrackTheCode\n\nhttps://dev.fun/p/4f152fb16842a0f7954e\nbuilt on @devfunpump`, `⚡ CLOSE CALL ALERT! ⚡\n\nA player just matched a digit from the secret code! 🎲\nThe tension is building... 😱\nWho's next to try? 🎯\n\n#SolanaGaming #TheCode #AlmostThere\n\nhttps://dev.fun/p/4f152fb16842a0f7954e\nbuilt on @devfunpump`, `🔥 GETTING HOT! 🔥\n\nSomeone's guess contained a correct digit! 🎯\nThe code is crackable... who will be the one? 👑\n\n#DigitMatch #CryptoGuessing #SoClose\n\nhttps://dev.fun/p/4f152fb16842a0f7954e\nbuilt on @devfunpump`],
    activeround: [`⚡ ROUND IN PROGRESS! ⚡\n\n🎮 ${totalPlayers} players battling for the vault\n💰 ${vaultBalance.toFixed(3)} SOL prize pool\n🔐 One 3-digit code stands between them and victory\n\n#ActiveRound #CrackTheCode #SolanaGaming\n\nhttps://dev.fun/p/4f152fb16842a0f7954e\nbuilt on @devfunpump`, `🔥 THE HUNT CONTINUES! 🔥\n\nPlayers are dropping guesses left and right 🎯\nVault: ${vaultBalance.toFixed(3)} SOL 💰\nCode: Still uncracked 🔐\n\nJoin the hunt! 🎮\n\n#TheCode #CryptoHunt #Solana\n\nhttps://dev.fun/p/4f152fb16842a0f7954e\nbuilt on @devfunpump`, `📊 LIVE STATS UPDATE 📊\n\n👥 Active Players: ${totalPlayers}\n💰 Current Vault: ${vaultBalance.toFixed(3)} SOL\n🎯 Guesses Flying In!\n🔐 Code Status: UNCRACKED\n\n#LiveStats #CrackTheCode\n\nhttps://dev.fun/p/4f152fb16842a0f7954e\nbuilt on @devfunpump`],
    hype: [`🚨 THE ULTIMATE CRYPTO GUESSING GAME! 🚨\n\nRisk SOL ➡️ Guess the code ➡️ Win the vault! 💰\nEvery wrong guess makes the prize BIGGER! 📈\n\nAre you the chosen one? 👑\n\n#TheCryptoCode #SolanaGaming #RiskItAll\n\nhttps://dev.fun/p/4f152fb16842a0f7954e\nbuilt on @devfunpump`, `💎 SIMPLE CONCEPT, HUGE REWARDS! 💎\n\n3 digits (000-999) 🔢\nOne secret code 🤫\nUnlimited attempts ♾️\nOne MASSIVE payout! 💰\n\nWhat are you waiting for? 🚀\n\n#CrackTheCode #SolanaGaming\n\nhttps://dev.fun/p/4f152fb16842a0f7954e\nbuilt on @devfunpump`, `🎯 CAN YOU CRACK THE CODE? 🎯\n\nThousands of possibilities 🔢\nOne perfect combination 🎯\nLife-changing prize waiting 💰\n\nThe vault grows with every guess! 📈\n\n#CryptoChallenge #TheCode #Solana\n\nhttps://dev.fun/p/4f152fb16842a0f7954e\nbuilt on @devfunpump`],
    winner: [`🎉 CODE CRACKED! WINNER FOUND! 🎉\n\nSomeone just broke the code and claimed the vault! 💰\nThe legend walks away with ${(vaultBalance * 0.95).toFixed(3)} SOL! 👑\n\nNew round starting soon... 🚀\n\n#CodeCracked #Winner #SolanaGaming\n\nhttps://dev.fun/p/4f152fb16842a0f7954e\nbuilt on @devfunpump`, `👑 WE HAVE A CHAMPION! 👑\n\nThe secret code has been CRACKED! ⚡\nVault claimed: ${(vaultBalance * 0.95).toFixed(3)} SOL 💎\nThe hunt begins again... 🎯\n\n#Champion #CodeCracked #NewRound\n\nhttps://dev.fun/p/4f152fb16842a0f7954e\nbuilt on @devfunpump`, `🏆 VICTORY ACHIEVED! 🏆\n\nAfter countless guesses, someone found the combination! 🔓\n${(vaultBalance * 0.95).toFixed(3)} SOL transferred to the winner! 💰\n\n#Victory #CrackTheCode #SolanaWin\n\nhttps://dev.fun/p/4f152fb16842a0f7954e\nbuilt on @devfunpump`]
  };
  const generateTweet = () => {
    const templates = tweetTemplates[selectedCategory];
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    setGeneratedTweet(randomTemplate);
  };
  const copyTweet = () => {
    navigator.clipboard.writeText(generatedTweet);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
    if (userWallet && devbaseClient) {
      saveAchievement('social_sharer');
    }
  };
  const openTwitter = () => {
    const tweetText = encodeURIComponent(generatedTweet);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
    if (userWallet && devbaseClient) {
      saveAchievement('social_sharer');
    }
  };
  return <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {Object.keys(tweetTemplates).map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors ${selectedCategory === category ? 'bg-yellow-400 text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}>
            {category.toUpperCase()}
          </button>)}
      </div>
      
      <button onClick={generateTweet} className="cyber-button w-full">
        GENERATE {selectedCategory.toUpperCase()} TWEET
      </button>
      
      {generatedTweet && <div className="space-y-3">
          <div className="bg-black/20 border border-white/30 rounded-lg p-4">
            <pre className="text-white text-sm whitespace-pre-wrap font-mono">
              {generatedTweet}
            </pre>
          </div>
          <div className="flex gap-2">
            <button onClick={copyTweet} className={`flex-1 py-2 px-4 rounded-lg font-bold transition-colors ${showCopied ? 'bg-green-500 text-white' : 'cyber-button'}`}>
              {showCopied ? '✓ COPIED!' : 'COPY'}
            </button>
            <button onClick={openTwitter} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-bold transition-colors">
              POST TO X
            </button>
          </div>
        </div>}
    </div>;
};
const UserButtonStyled = () => {
  return <div className="w-10 h-10 flex items-center justify-center">
      <div style={{
      transform: 'scale(0.5)',
      transformOrigin: 'center'
    }}>
        <UserButton height="40px" primaryColor="#FFE94E" radius="20px" bgColor="rgba(255,255,255,0.1)" textColor="#ffffff" hoverBgColor="rgba(255,255,255,0.25)" />
      </div>
    </div>;
};
export default function AppWithProvider() {
  return <DevappProvider rpcEndpoint="https://rpc.dev.fun/4f152fb16842a0f7954e" devbaseEndpoint="https://devbase.dev.fun" appId="4f152fb16842a0f7954e">
      <App />
    </DevappProvider>;
}
const AchievementNotification = ({
  message,
  onClose
}) => {
  return <motion.div initial={{
    y: -100,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} exit={{
    y: -100,
    opacity: 0
  }} transition={{
    duration: 0.5,
    ease: "easeOut"
  }} className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white border-2 border-yellow-400 rounded-full px-6 py-3 shadow-lg flex items-center gap-3">
      <Award className="w-6 h-6 text-yellow-500" />
      <span className="text-lg font-bold text-black">{message}</span>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
        <X className="w-4 h-4" />
      </button>
    </motion.div>;
};
const AchievementIcon = ({
  achievement,
  isAchieved,
  userStats
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const achievementDetails = {
    'first_guess': {
      icon: Play,
      name: 'First Guess',
      description: 'Make your first guess in the game',
      color: '#22C55E'
    },
    'lucky_number': {
      icon: Target,
      name: 'Lucky Number',
      description: 'Guess a number containing a correct digit',
      color: '#F59E0B'
    },
    'code_breaker': {
      icon: Crown,
      name: 'Code Breaker',
      description: 'Successfully crack the vault code',
      color: '#FFE94E'
    },
    'persistent_player': {
      icon: Flame,
      name: 'Persistent Player',
      description: 'Make 10 guesses in a single round',
      color: '#EF4444'
    },
    'high_roller': {
      icon: Coins,
      name: 'High Roller',
      description: 'Spend a total of 5 SOL on guesses',
      color: '#8B5CF6'
    },
    'quick_win': {
      icon: Timer,
      name: 'Quick Win',
      description: 'Crack the code within the first 5 guesses',
      color: '#06B6D4'
    },
    'social_sharer': {
      icon: MessageSquare,
      name: 'Social Sharer',
      description: 'Share a game update on Twitter',
      color: '#1DA1F2'
    },
    'streak_master': {
      icon: Star,
      name: 'Streak Master',
      description: 'Win 3 rounds consecutively',
      color: '#DC2626'
    },
    'vault_guardian': {
      icon: ShieldCheck,
      name: 'Vault Guardian',
      description: 'Participate in 10 different rounds',
      color: '#059669'
    },
    'community_helper': {
      icon: Heart,
      name: 'Community Helper',
      description: 'Help other players with digit clues',
      color: '#EC4899'
    }
  };
  const detail = achievementDetails[achievement];
  if (!detail) return null;
  const IconComponent = detail.icon;
  const getProgress = () => {
    if (!userStats) return 0;
    switch (achievement) {
      case 'persistent_player':
        return Math.min(10, Math.max(...Object.values(userStats.guessesPerRound || {}), 0));
      case 'high_roller':
        return Math.min(5, userStats.totalSolSpent || 0);
      case 'vault_guardian':
        return Math.min(10, userStats.roundsParticipated || 0);
      case 'streak_master':
        return Math.min(3, userStats.maxConsecutiveWins || 0);
      default:
        return isAchieved ? 1 : 0;
    }
  };
  const getMaxProgress = () => {
    switch (achievement) {
      case 'persistent_player':
        return 10;
      case 'high_roller':
        return 5;
      case 'vault_guardian':
        return 10;
      case 'streak_master':
        return 3;
      default:
        return 1;
    }
  };
  const progress = getProgress();
  const maxProgress = getMaxProgress();
  const progressPercent = progress / maxProgress * 100;
  return <div className="relative flex flex-col items-center" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isAchieved ? 'border-yellow-400 bg-yellow-400/20 shadow-lg' : 'border-gray-400 bg-gray-400/10'}`} style={{
      backgroundColor: isAchieved ? `${detail.color}20` : 'rgba(156, 163, 175, 0.1)',
      borderColor: isAchieved ? detail.color : '#9CA3AF'
    }}>
        <IconComponent className={`w-6 h-6 transition-all duration-300 ${isAchieved ? 'opacity-100' : 'opacity-30'}`} style={{
        color: isAchieved ? detail.color : '#9CA3AF'
      }} />
      </div>
      
      {!isAchieved && maxProgress > 1 && <div className="w-12 h-1 bg-gray-200 rounded-full mt-1 overflow-hidden">
          <div className="h-full transition-all duration-300 rounded-full" style={{
        width: `${progressPercent}%`,
        backgroundColor: detail.color
      }} />
        </div>}

      <AnimatePresence>
        {isHovered && <motion.div initial={{
        opacity: 0,
        y: 10,
        scale: 0.9
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} exit={{
        opacity: 0,
        y: 10,
        scale: 0.9
      }} transition={{
        duration: 0.2
      }} className="absolute bottom-full mb-2 bg-black/90 text-white p-3 rounded-lg shadow-xl z-50 min-w-[200px]">
            <div className="text-center">
              <h4 className="font-bold text-sm mb-1" style={{
            color: detail.color
          }}>
                {detail.name}
              </h4>
              <p className="text-xs text-gray-300 mb-2">
                {detail.description}
              </p>
              {!isAchieved && maxProgress > 1 && <div className="text-xs">
                  <span style={{
              color: detail.color
            }}>
                    {progress.toFixed(1)}/{maxProgress}
                  </span>
                  <span className="text-gray-400"> progress</span>
                </div>}
              {isAchieved && <div className="text-xs font-bold text-yellow-400">
                  ✓ UNLOCKED
                </div>}
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
          </motion.div>}
      </AnimatePresence>
    </div>;
};
const ScrambleText = ({
  children,
  duration = 800,
  scrambleOnMount = false,
  className = ""
}) => {
  const [displayText, setDisplayText] = useState(String(children));
  const [isScrambling, setIsScrambling] = useState(false);
  const scrambleText = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);
    const originalText = String(children);
    const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.';
    let iterations = 0;
    const maxIterations = duration / 50;
    const interval = setInterval(() => {
      setDisplayText(current => {
        return originalText.split('').map((char, index) => {
          if (char === ' ') return ' ';
          if (iterations / maxIterations > index / originalText.length) {
            return char;
          }
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }).join('');
      });
      iterations++;
      if (iterations >= maxIterations) {
        clearInterval(interval);
        setDisplayText(originalText);
        setIsScrambling(false);
      }
    }, 50);
  }, [children, duration, isScrambling]);
  useEffect(() => {
    if (scrambleOnMount) {
      scrambleText();
    }
  }, [scrambleOnMount, scrambleText]);
  useEffect(() => {
    setDisplayText(String(children));
  }, [children]);
  return <motion.span className={className} onHoverStart={scrambleText} style={{
    fontFamily: 'Sora, monospace',
    cursor: 'pointer'
  }}>
      {displayText}
    </motion.span>;
};
function App() {
  const {
    devbaseClient,
    userWallet
  } = useDevapp();
  const [activeRound, setActiveRound] = useState(null);
  const [rounds, setRounds] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [playerGuess, setPlayerGuess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [newRoundCode, setNewRoundCode] = useState('');
  const [newRoundFee, setNewRoundFee] = useState('0.01');
  const [requiredToken, setRequiredToken] = useState('');
  const [requiredAmount, setRequiredAmount] = useState('');
  const [tokenMetadata, setTokenMetadata] = useState(null);
  const [userTokenBalance, setUserTokenBalance] = useState(0);
  const [showTokenError, setShowTokenError] = useState(false);
  const [vaultBalance, setVaultBalance] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showWinners, setShowWinners] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showStatsPopup, setShowStatsPopup] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationWinner, setCelebrationWinner] = useState(null);
  const [showFallingEmojis, setShowFallingEmojis] = useState(false);
  const [previousVaultBalance, setPreviousVaultBalance] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [userAchievements, setUserAchievements] = useState([]);
  const [showAchievementNotification, setShowAchievementNotification] = useState(false);
  const [achievementMessage, setAchievementMessage] = useState('');
  const ADMIN_WALLET = '6SxLVfFovSjR2LAFcJ5wfT6RFjc8GxsscRekGnLq8BMe';
  const achievementDefinitions = {
    'first_guess': 'First Guess!',
    'lucky_number': 'Lucky Number!',
    'code_breaker': 'Code Breaker!',
    'persistent_player': 'Persistent Player!',
    'high_roller': 'High Roller!',
    'quick_win': 'Quick Win!',
    'social_sharer': 'Social Sharer!',
    'streak_master': 'Streak Master!',
    'vault_guardian': 'Vault Guardian!',
    'community_helper': 'Community Helper!'
  };
  const triggerAchievementNotification = message => {
    setAchievementMessage(message);
    setShowAchievementNotification(true);
    setTimeout(() => setShowAchievementNotification(false), 3000);
  };
  const saveAchievement = async (achievementId, roundId = '', value = 0) => {
    if (!userWallet || !devbaseClient) return;
    try {
      const hasAchievement = await devbaseClient.evalCondition(`$FUNC_HAS_ACHIEVEMENT('${achievementId}', '${roundId}')`);
      if (!hasAchievement.success) {
        await devbaseClient.createEntity('achievements', {
          achievementId,
          roundId,
          value
        });
        triggerAchievementNotification(`Achievement Unlocked: ${achievementDefinitions[achievementId]}`);
        loadUserAchievements();
      }
    } catch (error) {
      console.error(`Error saving achievement ${achievementId}:`, error);
    }
  };
  useEffect(() => {
    const hasVisited = localStorage.getItem('theCodeHasVisited');
    if (!hasVisited || hasVisited !== 'true') {
      setShowWelcome(true);
    }
  }, []);
  useEffect(() => {
    if (!devbaseClient) return;
    const socketInstance = io('wss://ws.dev.fun/app-4f152fb16842a0f7954e');
    setSocket(socketInstance);
    const handleGuessMade = data => {
      loadData();
      loadVaultBalance();
    };
    const handleRoundUpdated = data => {
      loadData();
    };
    const handleCodeCracked = data => {
      loadData();
      loadVaultBalance();
      setShowConfetti(true);
      setCelebrationWinner(data);
      setShowCelebration(true);
    };
    socketInstance.on('guess-made', handleGuessMade);
    socketInstance.on('round-updated', handleRoundUpdated);
    socketInstance.on('code-cracked', handleCodeCracked);
    return () => {
      socketInstance.off('guess-made', handleGuessMade);
      socketInstance.off('round-updated', handleRoundUpdated);
      socketInstance.off('code-cracked', handleCodeCracked);
      socketInstance.disconnect();
    };
  }, [devbaseClient]);
  useEffect(() => {
    if (userWallet && devbaseClient) {
      setIsAdmin(userWallet === ADMIN_WALLET);
      loadData();
      loadVaultBalance();
      loadUserAchievements();
    }
  }, [userWallet, devbaseClient]);
  useEffect(() => {
    const loadTokenData = async () => {
      if (activeRound && activeRound.requiredToken) {
        const metadata = await fetchTokenMetadata(activeRound.requiredToken);
        setTokenMetadata(metadata);
        if (userWallet) {
          const balance = await checkTokenBalance(activeRound.requiredToken, userWallet);
          setUserTokenBalance(balance);
        }
      } else {
        setTokenMetadata(null);
        setUserTokenBalance(0);
      }
    };
    loadTokenData();
  }, [activeRound, userWallet]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (devbaseClient) {
        loadVaultBalance();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [devbaseClient]);
  const loadData = async () => {
    try {
      const [roundsData, guessesData] = await Promise.all([devbaseClient.listEntities('rounds'), devbaseClient.listEntities('guesses')]);
      setRounds(roundsData.sort((a, b) => b.startTime - a.startTime));
      setGuesses(guessesData);
      const active = roundsData.find(r => r.status === 'active');
      setActiveRound(active);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };
  const loadUserAchievements = async () => {
    if (!userWallet || !devbaseClient) return;
    try {
      const achievements = await devbaseClient.listEntities('achievements', {
        userId: userWallet
      });
      setUserAchievements(achievements);
    } catch (error) {
      console.error('Error loading user achievements:', error);
    }
  };
  const loadVaultBalance = async () => {
    try {
      const vaultAddress = '8sfVWQ3Dvf8tSKCdgrVaQRNfYtCozym3NwGfNNiHNXmn';
      const response = await fetch('https://rpc.dev.fun/593f960288c912411a22', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getBalance',
          params: [vaultAddress]
        })
      });
      const data = await response.json();
      if (data.result && data.result.value !== undefined) {
        const actualBalance = data.result.value / 1000000000;
        if (actualBalance > previousVaultBalance && previousVaultBalance > 0) {
          setShowArrows(true);
        }
        setPreviousVaultBalance(vaultBalance);
        setVaultBalance(actualBalance);
      } else {
        setVaultBalance(0);
      }
    } catch (error) {
      console.error('Error loading vault balance:', error);
      setVaultBalance(0);
    }
  };
  const createRound = async () => {
    if (!newRoundCode || newRoundCode.length !== 3) return;
    setLoading(true);
    setTransactionLoading(true);
    setLoadingMessage('Creating new round...');
    try {
      const roundData = {
        winningCombo: newRoundCode.padStart(3, '0'),
        feePerGuess: parseFloat(newRoundFee),
        status: 'active',
        prizePool: 0,
        startTime: Date.now()
      };
      if (requiredToken && requiredAmount) {
        roundData.requiredToken = requiredToken;
        roundData.requiredAmount = parseFloat(requiredAmount);
      }
      const newRound = await devbaseClient.createEntity('rounds', roundData);
      if (socket) {
        socket.emit('round-updated', {
          roundId: newRound.id,
          status: 'active',
          feePerGuess: parseFloat(newRoundFee),
          timestamp: Date.now()
        });
      }
      setNewRoundCode('');
      setNewRoundFee('0.01');
      setRequiredToken('');
      setRequiredAmount('');
      await loadData();
      await loadVaultBalance();
    } catch (error) {
      console.error('Error creating round:', error);
    }
    setLoading(false);
    setTransactionLoading(false);
    setLoadingMessage('');
  };
  const endRound = async roundId => {
    setLoading(true);
    setTransactionLoading(true);
    setLoadingMessage('Ending round...');
    try {
      await devbaseClient.updateEntity('rounds', roundId, {
        status: 'ended'
      });
      if (socket) {
        socket.emit('round-updated', {
          roundId: roundId,
          status: 'ended',
          timestamp: Date.now()
        });
      }
      await loadData();
    } catch (error) {
      console.error('Error ending round:', error);
    }
    setLoading(false);
    setTransactionLoading(false);
    setLoadingMessage('');
  };
  const checkTokenBalance = async (tokenAddress, walletAddress) => {
    try {
      const response = await fetch('https://rpc.dev.fun/593f960288c912411a22', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getTokenAccountsByOwner',
          params: [walletAddress, {
            mint: tokenAddress
          }, {
            encoding: 'jsonParsed'
          }]
        })
      });
      const data = await response.json();
      if (data.result && data.result.value && data.result.value.length > 0) {
        const balance = data.result.value[0].account.data.parsed.info.tokenAmount.uiAmount;
        return balance;
      }
      return 0;
    } catch (error) {
      console.error('Error checking token balance:', error);
      return 0;
    }
  };
  const fetchTokenMetadata = async tokenAddress => {
    try {
      const response = await fetch('https://rpc.dev.fun/593f960288c912411a22', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getAccountInfo',
          params: [tokenAddress, {
            encoding: 'jsonParsed'
          }]
        })
      });
      const data = await response.json();
      if (data.result && data.result.value) {
        try {
          const {
            fetchTokenInfoByAddress
          } = await import('@devfunlabs/web-sdk');
          const tokenInfo = await fetchTokenInfoByAddress(tokenAddress);
          if (tokenInfo && tokenInfo.image) {
            return {
              image: tokenInfo.image,
              symbol: tokenInfo.symbol || 'TOKEN'
            };
          }
        } catch (e) {
          console.log('Could not fetch token info from SDK');
        }
      }
      return null;
    } catch (error) {
      console.error('Error fetching token metadata:', error);
      return null;
    }
  };
  const makeGuess = async () => {
    if (!playerGuess || playerGuess.length !== 3 || !activeRound) return;
    if (activeRound.requiredToken && activeRound.requiredAmount) {
      const balance = await checkTokenBalance(activeRound.requiredToken, userWallet);
      if (balance < activeRound.requiredAmount) {
        setShowTokenError(true);
        setTimeout(() => setShowTokenError(false), 3000);
        return;
      }
    }
    setLoading(true);
    setTransactionLoading(true);
    setLoadingMessage('Submitting guess...');
    try {
      const newGuess = await devbaseClient.createEntity('guesses', {
        roundId: activeRound.id,
        guess: playerGuess.padStart(3, '0')
      });
      const userTotalGuesses = guesses.filter(g => g.userId === userWallet).length;
      if (userTotalGuesses === 0) {
        await saveAchievement('first_guess');
      }
      const totalRoundGuesses = guesses.filter(g => g.roundId === activeRound.id).length + 1;
      const hasDigitMatch = !newGuess.isCorrect && hasCorrectDigit(newGuess.guess, activeRound?.winningCombo) && totalRoundGuesses >= 10;
      if (hasDigitMatch) {
        await saveAchievement('lucky_number', activeRound.id);
      }
      if (newGuess.isCorrect) {
        await saveAchievement('code_breaker', activeRound.id);
        const roundGuesses = guesses.filter(g => g.roundId === activeRound.id).length + 1;
        if (roundGuesses <= 5) {
          await saveAchievement('quick_win', activeRound.id);
        }
      }
      const userGuessesInRound = guesses.filter(g => g.userId === userWallet && g.roundId === activeRound.id).length + 1;
      if (userGuessesInRound >= 10) {
        await saveAchievement('persistent_player', activeRound.id);
      }
      if (socket) {
        socket.emit('guess-made', {
          roundId: activeRound.id,
          guess: playerGuess.padStart(3, '0'),
          userId: userWallet,
          timestamp: Date.now()
        });
        if (newGuess.isCorrect) {
          socket.emit('code-cracked', {
            roundId: activeRound.id,
            userId: userWallet,
            guess: playerGuess.padStart(3, '0'),
            timestamp: Date.now()
          });
          setShowConfetti(true);
          setCelebrationWinner({
            userId: userWallet,
            guess: playerGuess.padStart(3, '0')
          });
          setShowCelebration(true);
        } else {
          setShowFallingEmojis(true);
        }
      }
      setPlayerGuess('');
      await loadData();
      await loadVaultBalance();
    } catch (error) {
      console.error('Error making guess:', error);
    }
    setLoading(false);
    setTransactionLoading(false);
    setLoadingMessage('');
  };
  const claimPrize = async () => {
    if (!activeRound || userHasClaimed) return;
    setLoading(true);
    setTransactionLoading(true);
    setLoadingMessage('Claiming prize...');
    try {
      await devbaseClient.createEntity('claims', {
        roundId: activeRound.id,
        amount: vaultBalance
      });
      setUserHasClaimed(true);
      await loadData();
      await loadVaultBalance();
    } catch (error) {
      console.error('Error claiming prize:', error);
    }
    setLoading(false);
    setTransactionLoading(false);
    setLoadingMessage('');
  };
  const hasWinningGuess = () => {
    if (!activeRound || !userWallet) return false;
    return guesses.some(g => g.roundId === activeRound.id && g.userId === userWallet && g.isCorrect);
  };
  const hasAlreadyClaimed = async () => {
    if (!activeRound || !userWallet || !devbaseClient) return false;
    try {
      const claims = await devbaseClient.listEntities('claims');
      return claims.some(c => c.roundId === activeRound.id && c.userId === userWallet);
    } catch (error) {
      console.error('Error checking claim status:', error);
      return false;
    }
  };
  const [userHasClaimed, setUserHasClaimed] = useState(false);
  useEffect(() => {
    const checkClaimStatus = async () => {
      if (hasWinningGuess()) {
        const claimed = await hasAlreadyClaimed();
        setUserHasClaimed(claimed);
      } else {
        setUserHasClaimed(false);
      }
    };
    checkClaimStatus();
  }, [activeRound, userWallet, guesses]);
  const isCodeCracked = () => {
    if (!activeRound) return false;
    return guesses.some(g => g.roundId === activeRound.id && g.isCorrect);
  };
  const getWinnerInfo = () => {
    if (!activeRound) return null;
    const winningGuess = guesses.find(g => g.roundId === activeRound.id && g.isCorrect);
    return winningGuess;
  };
  const getRoundGuesses = roundId => {
    return guesses.filter(g => g.roundId === roundId);
  };
  const getUniquePlayersInRound = roundId => {
    const roundGuesses = getRoundGuesses(roundId);
    return [...new Set(roundGuesses.map(g => g.userId))].length;
  };
  const getRecentGuesses = () => {
    if (!activeRound) return [];
    return guesses.filter(g => g.roundId === activeRound.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
  };
  const hasCorrectDigit = (guess, winningCombo) => {
    if (!winningCombo || !guess) return false;
    const winningDigits = winningCombo.split('');
    const guessDigits = guess.split('');
    return guessDigits.some(digit => winningDigits.includes(digit));
  };
  const getWinners = () => {
    const winners = [];
    rounds.forEach(round => {
      const winningGuess = guesses.find(g => g.roundId === round.id && g.isCorrect);
      if (winningGuess) {
        winners.push({
          ...winningGuess,
          round: round,
          winDate: new Date(winningGuess.createdAt)
        });
      }
    });
    return winners.sort((a, b) => b.winDate - a.winDate);
  };
  useEffect(() => {
    if (userWallet && devbaseClient && rounds.length > 0 && guesses.length > 0) {
      const userStats = getUserStats();
      if (userStats) {
        if (userStats.totalSolSpent >= 5) {
          saveAchievement('high_roller');
        }
        if (userStats.roundsParticipated >= 10) {
          saveAchievement('vault_guardian');
        }
        const userWins = guesses.filter(g => g.userId === userWallet && g.isCorrect).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        if (userWins.length >= 3) {
          let consecutiveWins = 1;
          for (let i = 1; i < userWins.length; i++) {
            const prevRoundIndex = rounds.findIndex(r => r.id === userWins[i - 1].roundId);
            const currRoundIndex = rounds.findIndex(r => r.id === userWins[i].roundId);
            if (Math.abs(prevRoundIndex - currRoundIndex) === 1) {
              consecutiveWins++;
              if (consecutiveWins >= 3) {
                saveAchievement('streak_master');
                break;
              }
            } else {
              consecutiveWins = 1;
            }
          }
        }
      }
    }
  }, [userWallet, devbaseClient, rounds, guesses]);
  const getUserStats = () => {
    if (!userWallet) return null;
    const userGuesses = guesses.filter(g => g.userId === userWallet);
    const userWins = userGuesses.filter(g => g.isCorrect);
    const roundsParticipated = [...new Set(userGuesses.map(g => g.roundId))];
    const totalSolSpent = userGuesses.reduce((total, guess) => {
      const round = rounds.find(r => r.id === guess.roundId);
      return total + (round ? round.feePerGuess : 0);
    }, 0);
    const guessesPerRound = {};
    userGuesses.forEach(guess => {
      guessesPerRound[guess.roundId] = (guessesPerRound[guess.roundId] || 0) + 1;
    });
    let maxConsecutiveWins = 0;
    let currentStreak = 0;
    const sortedWins = userWins.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    for (let i = 0; i < sortedWins.length; i++) {
      if (i === 0) {
        currentStreak = 1;
      } else {
        const prevRoundIndex = rounds.findIndex(r => r.id === sortedWins[i - 1].roundId);
        const currRoundIndex = rounds.findIndex(r => r.id === sortedWins[i].roundId);
        if (Math.abs(prevRoundIndex - currRoundIndex) === 1) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
      }
      maxConsecutiveWins = Math.max(maxConsecutiveWins, currentStreak);
    }
    return {
      totalGuesses: userGuesses.length,
      totalWins: userWins.length,
      roundsParticipated: roundsParticipated.length,
      totalSolSpent: totalSolSpent,
      winRate: userGuesses.length > 0 ? (userWins.length / userGuesses.length * 100).toFixed(1) : 0,
      guessesPerRound,
      maxConsecutiveWins
    };
  };
  const WelcomeScreen = () => <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => {
    setShowWelcome(false);
    localStorage.setItem('theCodeHasVisited', 'true');
  }}>
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-black flex items-center gap-3 bg-white border-2 border-black rounded-xl px-4 py-2">
            <Crown className="w-6 h-6 text-yellow-500" />
            THE CODE
          </h2>
        </div>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-black mb-3">
            ULTIMATE CRYPTO GUESSING GAME
          </h1>
        </div>
        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 mt-1 flex-shrink-0 text-yellow-500" />
              <p className="text-base font-semibold text-black">RISK SOL TO GUESS THE ADMIN'S SECRET 3-DIGIT VAULT CODE (000-999)</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <Vault className="w-5 h-5 mt-1 flex-shrink-0 text-yellow-500" />
              <p className="text-base font-semibold text-black">EVERY WRONG GUESS GROWS THE PRIZE POOL BIGGER AND MORE TEMPTING</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <Trophy className="w-5 h-5 mt-1 flex-shrink-0 text-yellow-500" />
              <p className="text-base font-semibold text-black">CRACK THE CODE AND CLAIM THE ENTIRE VAULT - WINNER TAKES ALL!</p>
            </div>
          </div>
        </div>
        <button onClick={() => {
        setShowWelcome(false);
        localStorage.setItem('theCodeHasVisited', 'true');
      }} className="cyber-button-primary w-full py-3 pulse-animation">
          ENTER THE GAME
        </button>
      </div>
    </div>;
  const TransactionLoader = () => <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl">
        <div className="glow-spinner mx-auto mb-6"></div>
        <p className="text-lg font-bold text-black mb-2">{loadingMessage.toUpperCase()}</p>
        <p className="text-base font-semibold text-black">PLEASE WAIT...</p>
      </div>
    </div>;
  const HistoryPopup = () => <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowHistory(false)}>
      <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-black flex items-center gap-3 bg-white border-2 border-black rounded-xl px-4 py-2">
            <History className="w-6 h-6 text-yellow-500" />
            ROUND HISTORY
          </h2>
          <button onClick={() => setShowHistory(false)} className="cyber-button-small flex items-center gap-2">
            <X className="w-4 h-4" />
            CLOSE
          </button>
        </div>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {rounds.map(round => {
          const roundGuesses = getRoundGuesses(round.id);
          const winningGuess = roundGuesses.find(g => g.isCorrect);
          return <div key={round.id} className="bg-gray-50 rounded-2xl p-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="text-base font-bold text-black">
                      ROUND {round.id.slice(-8).toUpperCase()}
                      <span className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ${round.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                        {round.status.toUpperCase()}
                      </span>
                    </p>
                    <p className="text-sm font-semibold text-black">
                      STARTED: {new Date(round.startTime).toLocaleString().toUpperCase()}
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-sm font-semibold text-black">PLAYERS: {getUniquePlayersInRound(round.id)}</p>
                    <p className="text-sm font-semibold text-black">GUESSES: {roundGuesses.length}</p>
                    <p className="text-sm font-semibold text-yellow-600">FEE: {round.feePerGuess} SOL</p>
                    {winningGuess && <p className="text-sm font-bold text-yellow-600">WINNER: {winningGuess.userId.slice(0, 8).toUpperCase()}...</p>}
                  </div>
                </div>
              </div>;
        })}
        </div>
      </div>
    </div>;
  const StatsPopup = () => {
    const stats = getUserStats();
    if (!stats) return null;
    const allAchievements = Object.keys(achievementDefinitions);
    const achievedIds = userAchievements.map(a => a.achievementId);
    return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowStatsPopup(false)}>
      <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[80vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-black flex items-center gap-3 bg-white border-2 border-black rounded-xl px-4 py-2">
            <Users className="w-6 h-6 text-yellow-500" />
            YOUR STATS
          </h2>
          <button onClick={() => setShowStatsPopup(false)} className="cyber-button-small flex items-center gap-2">
            <X className="w-4 h-4" />
            CLOSE
          </button>
        </div>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-black">{stats.totalGuesses}</p>
            <p className="text-base font-semibold text-black">TOTAL GUESSES</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-black">{stats.totalWins}</p>
            <p className="text-base font-semibold text-black">CODES CRACKED</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-black">{stats.roundsParticipated}</p>
            <p className="text-base font-semibold text-black">ROUNDS PLAYED</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-black">{stats.totalSolSpent.toFixed(3)} SOL</p>
            <p className="text-base font-semibold text-black">TOTAL SPENT</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-black">{stats.winRate}%</p>
            <p className="text-base font-semibold text-black">WIN RATE</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4">
            <h3 className="text-lg font-bold text-black mb-4 text-center">ACHIEVEMENTS</h3>
            <div className="grid grid-cols-5 gap-3">
              {allAchievements.map(achievementId => <AchievementIcon key={achievementId} achievement={achievementId} isAchieved={achievedIds.includes(achievementId)} userStats={stats} />)}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm font-semibold text-black">
                {achievedIds.length}/{allAchievements.length} Unlocked
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
  };
  const WinnersHistory = () => <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowWinners(false)}>
      <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-black flex items-center gap-3 bg-white border-2 border-black rounded-xl px-4 py-2">
            <Crown className="w-6 h-6 text-yellow-500" />
            HALL OF WINNERS
          </h2>
          <button onClick={() => setShowWinners(false)} className="cyber-button-small flex items-center gap-2">
            <X className="w-4 h-4" />
            CLOSE
          </button>
        </div>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {getWinners().map((winner, index) => <div key={winner.id} className="bg-gray-50 rounded-2xl p-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {index === 0 && <Crown className="w-6 h-6 text-yellow-500" />}
                    {index === 1 && <Trophy className="w-6 h-6 text-yellow-500" />}
                    {index === 2 && <Trophy className="w-5 h-5 text-yellow-500" />}
                    {index > 2 && <Star className="w-5 h-5 text-yellow-500" />}
                  </div>
                  <div>
                    <p className="text-base font-bold text-black">
                      {winner.userId.slice(0, 8).toUpperCase()}...
                    </p>
                    <p className="text-sm font-semibold text-yellow-600">
                  CRACKED CODE: <span className="font-mono">{winner.guess}</span>
                    </p>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-base font-bold text-yellow-600">
                    WON ROUND #{winner.round.id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-sm font-semibold text-black">
                    {winner.winDate.toLocaleDateString().toUpperCase()}
                  </p>
                </div>
              </div>
            </div>)}
          {getWinners().length === 0 && <div className="text-center py-8">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <p className="text-lg font-bold text-black">NO WINNERS YET!</p>
              <p className="text-base font-semibold text-black">BE THE FIRST TO CRACK THE CODE</p>
            </div>}
        </div>
      </div>
    </div>;
  const HowItWorksPopup = () => <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowHowItWorks(false)}>
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-black flex items-center gap-3">
            <Info className="w-7 h-7 text-yellow-500" />
            HOW IT WORKS
          </h2>
          <button onClick={() => setShowHowItWorks(false)} className="cyber-button-small flex items-center gap-2">
            <X className="w-4 h-4" />
            CLOSE
          </button>
        </div>
        <div className="space-y-6 max-h-[60vh] overflow-y-auto">
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-lg">1</div>
              <div>
                <h3 className="text-lg font-bold mb-3 text-black">CONNECT WALLET</h3>
                <p className="text-base font-semibold text-black">Connect your Solana wallet and get SOL ready for guessing.</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-lg">2</div>
              <div>
                <h3 className="text-lg font-bold mb-3 text-black">GUESS THE CODE</h3>
                <p className="text-base font-semibold text-black">Enter any 3-digit number (000-999). Each guess costs SOL and grows the vault.</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-lg">3</div>
              <div>
                <h3 className="text-lg font-bold mb-3 text-black">VAULT GROWS</h3>
                <p className="text-base font-semibold text-black">Every wrong guess makes the prize pool bigger and more tempting!</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-lg">4</div>
              <div>
                <h3 className="text-lg font-bold mb-3 text-black">WIN BIG</h3>
                <p className="text-base font-semibold text-black">Crack the code and claim 95% of vault! (5% platform fee)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  return <div className="min-h-screen">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col gap-4 mb-6 md:mb-8 pb-4 md:pb-6">
          <div className="flex justify-between items-center">
            <h1 className="main-title text-2xl md:text-4xl">
              <ScrambleText duration={800} scrambleOnMount={false}>
                THE CODE
              </ScrambleText>
            </h1>
            <UserButtonStyled />
          </div>
          <div className="flex justify-center">
            <div className="flex items-center gap-2 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              {userWallet && <NavButton icon={Users} onClick={() => setShowStatsPopup(true)} label="My Stats" />}
              <NavButton icon={History} onClick={() => setShowHistory(true)} label="History" />
              <NavButton icon={Crown} onClick={() => setShowWinners(true)} label="Winners" />
              <NavButton icon={Info} onClick={() => setShowHowItWorks(true)} label="How It Works" />
              {isAdmin && <NavButton icon={Shield} onClick={() => setShowAdminPanel(!showAdminPanel)} label="Admin" />}
            </div>
          </div>
        </div>
        {isAdmin && showAdminPanel && <div className="cyber-card p-4 md:p-6 mb-6 md:mb-8">
            <h2 className="sub-title mb-4 md:mb-6 flex items-center gap-3 text-sm md:text-base">
              <Shield className="w-5 md:w-6 h-5 md:h-6" />
              ADMIN DASHBOARD
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <h3 className="pixel-text text-gray-200 mb-4">CREATE NEW ROUND</h3>
                <div className="space-y-4">
                  <input type="text" placeholder="3-digit code (000-999)" value={newRoundCode} onChange={e => setNewRoundCode(e.target.value.slice(0, 3))} className="cyber-input w-full" maxLength="3" />
                  <input type="number" placeholder="Fee per guess (SOL)" value={newRoundFee} onChange={e => setNewRoundFee(e.target.value)} className="cyber-input w-full" step="0.001" min="0.001" />
                  <input type="text" placeholder="Required Token Address (optional)" value={requiredToken} onChange={e => setRequiredToken(e.target.value)} className="cyber-input w-full text-xs" />
                  <input type="number" placeholder="Required Token Amount (optional)" value={requiredAmount} onChange={e => setRequiredAmount(e.target.value)} className="cyber-input w-full" step="0.01" min="0" />
                  <button onClick={createRound} disabled={loading || !newRoundCode || newRoundCode.length !== 3} className="cyber-button w-full">
                    {loading ? 'Creating...' : 'Start Round'}
                  </button>
                </div>
              </div>
              <div>
                <h3 className="pixel-text text-gray-200 mb-4">ACTIVE ROUND CONTROL</h3>
                {activeRound ? <div className="space-y-4">
                    <p className="pixel-text-small text-yellow-400 glow-text">CODE: {activeRound.winningCombo}</p>
                    <p className="pixel-text-small text-cyan-400 glow-text">FEE: {activeRound.feePerGuess} SOL</p>
                    <p className="pixel-text-small text-gray-300">PLAYERS: {getUniquePlayersInRound(activeRound.id)}</p>
                    <button onClick={() => endRound(activeRound.id)} disabled={loading} className="cyber-button-danger w-full">
                      END ROUND
                    </button>
                  </div> : <p className="pixel-text text-gray-400">NO ACTIVE ROUND</p>}
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="pixel-text text-gray-200 mb-4">TWITTER HYPE GENERATOR</h3>
              <TwitterHypeGenerator vaultBalance={vaultBalance} activeRound={activeRound} recentGuesses={getRecentGuesses()} totalPlayers={activeRound ? getUniquePlayersInRound(activeRound.id) : 0} />
            </div>
          </div>}
        <div className="cyber-card p-6 md:p-8 mb-6 md:mb-8 relative">
          {tokenMetadata && tokenMetadata.image && <div className="token-floater">
              <img src={tokenMetadata.image} alt="Required Token" className="w-12 h-12 rounded-full border-2 border-white shadow-lg" />
              <div className="text-xs font-bold text-black mt-1">{tokenMetadata.symbol}</div>
            </div>}
          <div className="text-center relative">
            <div className="main-title yellow-accent glow-text mb-2 flex items-center justify-center gap-3">
              <ScrambleText duration={600}>
                {vaultBalance.toFixed(3)} SOL
              </ScrambleText>
              {showArrows && <div className="flex gap-1">
                  {Array.from({
                length: 2
              }, (_, i) => <motion.span key={i} initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: [0, 1, 0],
                y: [10, -5, -15],
                scale: [0.8, 1, 0.8]
              }} transition={{
                duration: 1.5,
                repeat: 1,
                delay: i * 0.1
              }} style={{
                color: 'var(--yellow)',
                filter: 'drop-shadow(0 0 15px rgba(255,233,78,0.6))'
              }}>
                      <ArrowIcon size={28} />
                    </motion.span>)}
                </div>}
          </div>
    <div className="flex items-center justify-center gap-3">
      <p className="pixel-text-small text-xl">DYNAMIC PRIZEPOOL</p>
      <div className="floating-placard">
        <span className="pixel-text-small font-bold">95% TO WINNER</span>
      </div>
    </div>
  </div>
        </div>
      {activeRound ? <div className="cyber-card p-4 md:p-6 mb-6 md:mb-8">
            <h2 className="sub-title mb-4 md:mb-6 flex items-center gap-3 justify-center text-sm md:text-base">
              <Play className="w-5 md:w-6 h-5 md:h-6 text-yellow-400 glow-icon" />
              Round Active - Crack The Code!
            </h2>
            <div className="max-w-md mx-auto space-y-4 md:space-y-6">
              <div className="text-center space-y-2">
                <p className="pixel-text">
                  Fee per guess: <span className="font-bold yellow-accent">{activeRound.feePerGuess} SOL</span>
                </p>
                {activeRound.requiredToken && activeRound.requiredAmount && <div className="bg-white/20 border border-white/40 rounded-lg p-3">
                    <p className="pixel-text-small mb-1">Required to play:</p>
                    <p className="pixel-text font-bold yellow-accent">
                      {activeRound.requiredAmount} {tokenMetadata?.symbol || 'tokens'}
                    </p>
                    {userWallet && <p className={`pixel-text-small mt-1 ${userTokenBalance >= activeRound.requiredAmount ? 'text-green-600' : 'text-red-600'}`}>
                        Your balance: {userTokenBalance.toFixed(2)}
                      </p>}
                  </div>}
              </div>
              {hasWinningGuess() ? <div className="text-center space-y-4 md:space-y-6">
                  <p className="pixel-text yellow-accent text-lg md:text-xl font-bold pulse-animation">You Cracked The Code!</p>
                  <button onClick={claimPrize} disabled={loading || userHasClaimed} className={`px-6 md:px-8 py-3 md:py-4 ${userHasClaimed ? 'cyber-button' : 'cyber-button-primary pulse-animation'}`}>
                    {loading ? 'Claiming...' : userHasClaimed ? 'CLAIMED ✓' : `Claim ${(vaultBalance * 0.95).toFixed(3)} SOL`}
                  </button>
                  {!userHasClaimed && <p className="pixel-text-small text-center mt-2">
                    95% of vault goes to winner • 5% platform fee
                  </p>}
                </div> : isCodeCracked() ? <div className="text-center space-y-6 md:space-y-8">
                  <h2 className="main-title glow-text" style={{
              color: 'var(--danger)',
              textShadow: '0 0 40px rgba(239,68,68,.8), 0 0 80px rgba(239,68,68,.4)'
            }}>Code Has Been Cracked!</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
                    <div className="text-center">
                      <p className="pixel-text text-xl yellow-accent font-bold">
                        Winner: {getWinnerInfo()?.userId.slice(0, 8).toUpperCase()}...
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="pixel-text text-xl yellow-accent font-bold">
                        Winning Code: <span className="font-mono">{getWinnerInfo()?.guess}</span>
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="pixel-text text-xl" style={{
                  color: 'var(--sub)'
                }}>
                        Round ended - waiting for new round
                      </p>
                    </div>
                  </div>
                </div> : <div className="space-y-4 md:space-y-6">
                  <div className="flex justify-center relative">
                    <input type="text" placeholder="Enter 3-digit code" value={playerGuess} onChange={e => setPlayerGuess(e.target.value.replace(/\D/g, '').slice(0, 3))} className="cyber-input text-center text-xl md:text-2xl font-mono tracking-widest w-full max-w-xs glow-input" maxLength="3" />
                    <div className="code-hint-floater">
                      <span className="text-xs font-bold text-black">CODE HAS BEEN CHOSEN, NOW BREAK IT!</span>
                    </div>
                  </div>
                  <button onClick={makeGuess} disabled={loading || !playerGuess || playerGuess.length !== 3 || !userWallet} className="cyber-button-primary w-full py-3 md:py-4">
                    {loading ? 'Submitting...' : `Guess (${activeRound.feePerGuess} SOL)`}
                  </button>
                </div>}
              <div className="text-center">
                <p className="pixel-text-small">
                  Your guesses this round: {guesses.filter(g => g.roundId === activeRound.id && g.userId === userWallet).length}
                </p>
              </div>
            </div>
          </div> : <div className="cyber-card p-4 md:p-6 mb-6 md:mb-8 text-center opacity-60">
            {!userWallet ? <>
                <h2 className="sub-title mb-4 text-sm md:text-base">CONNECT WALLET TO PLAY</h2>
                <p className="pixel-text">CONNECT YOUR WALLET TO SEE IF THERE'S AN ACTIVE GAME...</p>
              </> : <>
                <h2 className="sub-title mb-4 text-sm md:text-base">NO ACTIVE ROUND</h2>
                <p className="pixel-text">WAITING FOR ADMIN TO START A NEW ROUND...</p>
              </>}
          </div>}
        <div className="cyber-card p-4 md:p-6 mb-6 md:mb-8">
          <h2 className="sub-title mb-4 md:mb-6 flex items-center gap-3 text-sm md:text-base">
            <Play className="w-5 md:w-6 h-5 md:h-6 text-yellow-400 glow-icon" />
            Recent Guesses
          </h2>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {getRecentGuesses().map(guess => {
            const round = rounds.find(r => r.id === guess.roundId);
            const totalRoundGuesses = guesses.filter(g => g.roundId === guess.roundId).length;
            const hasDigitMatch = !guess.isCorrect && hasCorrectDigit(guess.guess, activeRound?.winningCombo) && totalRoundGuesses >= 10;
            return <div key={guess.id} className="list-row gap-2 md:gap-4 relative">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex items-center gap-2 md:gap-4">
                      <span className="font-mono pixel-text yellow-accent">{guess.guess}</span>
                      <span className="pixel-text-small">
                        BY {guess.userId.slice(0, 8).toUpperCase()}...
                      </span>
                      {hasDigitMatch && <div className="digit-match-floater">
                          <span className="text-xs font-bold">DIGIT MATCH!</span>
                        </div>}
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                      <span className="pixel-text-small yellow-accent">
                        {round ? `${round.feePerGuess} SOL` : ''}
                      </span>
                      <span className={`pixel-text-small px-2 py-1 ${guess.isCorrect ? 'pill-win' : 'pill-miss'}`}>
                        {guess.isCorrect ? '✓ WINNER!' : '✗'}
                      </span>
                      <span className="pixel-text-small">
                        {new Date(guess.createdAt).toLocaleTimeString().toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>;
          })}
            {getRecentGuesses().length === 0 && <p className="text-center pixel-text py-4">NO GUESSES YET</p>}
          </div>
        </div>
      </div>
      {showWelcome && <WelcomeScreen />}
      {showHistory && <HistoryPopup />}
      {showStatsPopup && <StatsPopup />}
      {showWinners && <WinnersHistory />}
      {showHowItWorks && <HowItWorksPopup />}
      {transactionLoading && <TransactionLoader />}
      <Confetti isActive={showConfetti} onComplete={() => setShowConfetti(false)} />
    <FallingEmojis isActive={showFallingEmojis} onComplete={() => setShowFallingEmojis(false)} />
      <VaultArrows isVisible={showArrows} onComplete={() => setShowArrows(false)} />
      <CelebrationPopup isVisible={showCelebration} winnerInfo={celebrationWinner} prizeAmount={vaultBalance * 0.95} onClose={() => {
      setShowCelebration(false);
      setCelebrationWinner(null);
    }} />
      <AnimatePresence>
        {showAchievementNotification && <AchievementNotification message={achievementMessage} onClose={() => setShowAchievementNotification(false)} />}
        {showTokenError && <motion.div initial={{
        y: -100,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} exit={{
        y: -100,
        opacity: 0
      }} transition={{
        duration: 0.5,
        ease: "easeOut"
      }} className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white border-2 border-red-400 rounded-full px-6 py-3 shadow-lg flex items-center gap-3">
            <X className="w-6 h-6 text-red-500" />
            <span className="text-lg font-bold text-black">
              Need {activeRound?.requiredAmount} {tokenMetadata?.symbol || 'tokens'} to play!
            </span>
          </motion.div>}
      </AnimatePresence>
      
      {}
      <div className="mt-16 py-4 overflow-hidden bg-black/20 border-y border-white/20">
        <div className="scrolling-text-container">
          <div className="scrolling-text">
            NO TOKEN LAUNCH YET. CA COMING SOON • NO TOKEN LAUNCH YET. CA COMING SOON • NO TOKEN LAUNCH YET. CA COMING SOON • NO TOKEN LAUNCH YET. CA COMING SOON • 
          </div>
        </div>
      </div>
      
      <footer className="py-8 border-t border-white/20">
        <div className="container mx-auto px-4 text-center">
          <a href="https://x.com/kasperwtrcolor" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 cyber-button-small hover:scale-110 transition-transform duration-200">
            <svg className="w-5 h-5 glow-icon" fill="currentColor" viewBox="0 0 24 24" style={{
            color: 'var(--yellow)'
          }}>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Follow on X
          </a>
        </div>
      </footer>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Outfit:wght@400;500;600&display=swap');
        :root{
          --bg1:#E6B7F1;         /* light lavender */
          --bg2:#D9A5E8;         /* deeper lavender */
          --glass:#F2C8FF;       /* pink glass tint */
          --glass-ink:#2B2140;   /* text over glass */
          --ink:#24172E;         /* main heading color */
          --sub:#5B466B;         /* subtext */
          --yellow:#FFE94E;      /* neon yellow */
          --yellow-500:#FDE047;
          --chip:#171717;        /* dark chip */
          --ok:#22C55E;
          --danger:#EF4444;
          --neon-blue:#00E5FF;   /* neon blue */
          --shadow:0 10px 30px rgba(36,23,46,.20), 0 6px 16px rgba(0,0,0,.08);
          --glow-yellow:0 0 40px rgba(255,233,78,.35);
          --glow-blue:0 0 20px rgba(0,229,255,.4);
        }
        html,body{background: radial-gradient(1200px 900px at 65% -10%, var(--bg1), var(--bg2));}
        .main-title{
          font-family:'Sora',system-ui;
          font-weight:800;
          font-size: clamp(36px, 5vw, 64px);
          color:var(--ink);
          letter-spacing:.01em;
          text-transform:none;
          line-height:1.05;
          text-shadow: 0 1px 0 #fff3;
        }
        .sub-title{
          font-family:'Sora',system-ui;
          font-weight:600;
          font-size:clamp(14px,1.4vw,18px);
          color:var(--sub);
          letter-spacing:.01em;
          text-transform:none;
        }
        .pixel-text,
        .pixel-text-small{
          font-family:'Outfit',system-ui;
          text-transform:none;
          letter-spacing:.01em;
          color:var(--sub);
        }
        .pixel-text{ font-size:14px; }
        .pixel-text-small{ font-size:12px; opacity:.9; }
        /* ==== GLASS CARD ==== */
        .cyber-card{
          background: rgba(255,255,255,.18);
          border: 1px solid rgba(255,255,255,.35);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 28px;
          box-shadow: var(--shadow);
        }
        /* ==== HEADER UNDERLINE / DIVIDER ==== */
        .glow-border{
          border-bottom: 0;
          box-shadow: inset 0 -1px 0 rgba(255,255,255,.35);
        }
        /* ==== BUTTONS ==== */
        .cyber-button,
        .cyber-button-small{
          font-family:'Sora';
          font-weight:700;
          letter-spacing:.02em;
          border-radius: 999px;
          border: none;
          background: rgba(0,0,0,.14);
          color:#fff;
          padding: 12px 18px;
          box-shadow: 0 6px 18px rgba(0,0,0,.15);
          transition:.2s ease;
          cursor: pointer;
        }
        .cyber-button:hover,
        .cyber-button-small:hover{ transform: translateY(-1px); filter: brightness(1.05); }
        .cyber-button:disabled{
          opacity: 0.5;
          cursor: not-allowed;
        }
        .cyber-button-primary{
          font-family:'Sora'; font-weight:800;
          border-radius: 999px; border: none;
          background: var(--yellow);
          color:#201A2A;
          padding: 14px 22px;
          box-shadow: var(--glow-yellow), 0 10px 30px rgba(0,0,0,.15);
          transition: transform .15s ease, box-shadow .2s ease;
          cursor: pointer;
        }
        .cyber-button-primary:hover:not(:disabled){ transform: translateY(-1px); box-shadow: 0 0 55px rgba(255,233,78,.55), 0 12px 34px rgba(0,0,0,.18); }
        .cyber-button-primary:disabled{
          opacity: 0.5;
          cursor: not-allowed;
        }
        .cyber-button-danger{ background:#ff5a79; color:white; border:none; cursor: pointer; }
        /* ==== INPUT (3-digit) ==== */
        .cyber-input{
          font-family:'Sora',monospace;
          font-weight:800;
          font-size: clamp(20px,3.5vw,28px);
          background: rgba(255,255,255,.16);
          border: 1px solid rgba(255,255,255,.45);
          color:#1b1028;
          border-radius: 22px;
          padding: 14px 18px;
          letter-spacing:.35em;
          text-align:center;
          box-shadow: inset 0 1px 0 #fff6, 0 8px 20px rgba(0,0,0,.08);
        }
        .cyber-input::placeholder{ color:#72598f; }
        .cyber-input:focus{ outline:none; box-shadow: 0 0 0 4px rgba(255,233,78,.35); }
        /* ==== ICONS & TEXT EFFECTS ==== */
        .glow-text{ text-shadow: 0 0 24px rgba(255,255,255,.35); }
        .glow-icon{ filter: drop-shadow(0 8px 16px rgba(0,0,0,.15)); }
        /* ==== COUNTDOWN ==== */
        .countdown{
          font-family:'Sora'; font-weight:800;
          color: var(--yellow);
          text-shadow: var(--glow-yellow);
        }
        /* ==== PROGRESS / AVATAR RAIL ==== */
        .rail{
          background: rgba(255,255,255,.18);
          border:1px solid rgba(255,255,255,.35);
          border-radius: 20px; padding: 10px 12px;
          backdrop-filter: blur(14px);
        }
        .rail-progress{
          height:10px; border-radius: 999px;
          background: #fff6; position:relative; overflow:hidden;
        }
        .rail-progress > span{
          display:block; height:100%;
          width: var(--pct, 35%);
          background: var(--yellow);
          box-shadow: var(--glow-yellow);
          border-radius:999px;
        }
        /* ==== LIST ROWS ==== */
        .list-row{
          border-radius: 18px;
          background: rgba(0,0,0,.09);
          border:1px solid rgba(255,255,255,.28);
          padding: 12px 14px;
        }
        .pill-win{
          background: rgba(255,233,78,.15);
          color:#3b3200;
          border:1px solid var(--yellow);
          border-radius:999px;
          padding:4px 10px;
          box-shadow: var(--glow-yellow);
        }
        .pill-miss{
          background: rgba(255,255,255,.10);
          color:#7b1c1c;
          border:1px solid rgba(239,68,68,.6);
          border-radius:999px;
          padding:4px 10px;
        }
        /* ==== METRIC CARDS ==== */
        .metric-number{
          font-family:'Sora'; font-weight:800;
          font-size: clamp(22px,3.8vw,34px);
          color:#101010;
          text-shadow: 0 1px 0 #fff8, var(--glow-yellow);
        }
        .metric-label{ color: var(--sub); font-family:'Outfit'; }
        /* Spinner */
        .glow-spinner{
          width:64px;height:64px;border-radius:50%;
          border:5px solid rgba(255,255,255,.35);
          border-top-color: var(--yellow);
          animation: spin 1s linear infinite;
          box-shadow: var(--glow-yellow);
        }
        @keyframes spin{ to{ transform: rotate(360deg);} }
        .yellow-accent {
          color: var(--yellow);
          text-shadow: var(--glow-yellow);
        }
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        /* Floating Placard */
        .floating-placard {
          background: rgba(255,233,78,0.2);
          border: 1px solid var(--yellow);
          border-radius: 16px;
          padding: 4px 8px;
          box-shadow: var(--glow-yellow);
          animation: float 3s ease-in-out infinite;
        }
        .floating-placard span {
          color: var(--yellow);
          font-size: 10px;
          text-shadow: var(--glow-yellow);
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        .emoji-sticker {
          filter: drop-shadow(0 0 0 white) drop-shadow(1px 1px 0 white) drop-shadow(-1px -1px 0 white) drop-shadow(1px -1px 0 white) drop-shadow(-1px 1px 0 white);
          text-shadow: 
            -2px -2px 0 white,
            2px -2px 0 white,
            -2px 2px 0 white,
            2px 2px 0 white,
            -2px 0 0 white,
            2px 0 0 white,
            0 -2px 0 white,
            0 2px 0 white;
        }
        
        /* Scrolling Text */
        .scrolling-text-container {
          position: relative;
          white-space: nowrap;
        }
        .scrolling-text {
          font-family: 'Sora', system-ui;
          font-weight: 700;
          font-size: 16px;
          color: var(--yellow);
          text-shadow: var(--glow-yellow);
          display: inline-block;
          animation: scroll-left 30s linear infinite;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        @keyframes scroll-left {
          0% {
            transform: translateX(100vw);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        /* Cartoon Icons */
        .cartoon-icon {
          color: #000000;
          stroke-width: 3;
          filter: drop-shadow(0 0 0 white) 
                  drop-shadow(1px 1px 0 white) 
                  drop-shadow(-1px -1px 0 white) 
                  drop-shadow(1px -1px 0 white) 
                  drop-shadow(-1px 1px 0 white)
                  drop-shadow(2px 0 0 white)
                  drop-shadow(-2px 0 0 white)
                  drop-shadow(0 2px 0 white)
                  drop-shadow(0 -2px 0 white);
        }
        .cartoon-icon:hover {
          color: #333333;
          transform: scale(1.1);
        }
        
        /* Code Hint Floater */
        .code-hint-floater {
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          border: 2px solid var(--yellow);
          border-radius: 12px;
          padding: 6px 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          animation: hint-float 2s ease-in-out infinite;
          z-index: 10;
          white-space: nowrap;
        }
        .code-hint-floater::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid white;
        }
        @keyframes hint-float {
          0%, 100% {
            transform: translateX(-50%) translateY(0px);
          }
          50% {
            transform: translateX(-50%) translateY(-5px);
          }
        }
        @media (max-width: 768px) {
          .code-hint-floater {
            top: -45px;
            font-size: 10px;
            padding: 4px 6px;
          }
        }

        /* Digit Match Floater */
        .digit-match-floater {
          background: white;
          border: 2px solid black;
          border-radius: 12px;
          padding: 4px 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          animation: digit-pulse 2s ease-in-out infinite;
          margin-left: 8px;
        }
        .digit-match-floater span {
          color: black;
          font-size: 10px;
          font-weight: 700;
        }
        @keyframes digit-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }
        
        /* Token Floater */
        .token-floater {
          position: absolute;
          top: 20px;
          right: 20px;
          background: white;
          border: 2px solid var(--yellow);
          border-radius: 16px;
          padding: 8px;
          box-shadow: var(--glow-yellow), 0 8px 20px rgba(0,0,0,0.15);
          animation: token-float 3s ease-in-out infinite;
          z-index: 10;
          text-align: center;
        }
        @keyframes token-float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(5deg);
          }
        }
        @media (max-width: 768px) {
          .token-floater {
            top: 10px;
            right: 10px;
            padding: 6px;
          }
          .token-floater img {
            width: 32px !important;
            height: 32px !important;
          }
          .token-floater .text-xs {
            font-size: 8px;
          }
        }
      `}</style>
    </div>;
}