import { useState, useEffect } from "react";
import {
  Home, Compass, Plus, Bell, User, Heart, MessageCircle,
  Share2, Bookmark, Settings, ChevronRight, Camera,
  ArrowLeft, MoreHorizontal, UserPlus, Flame, Hash,
  X, Globe, Lock, Moon, LogOut, Shield, Image,
  AtSign, Grid, Send, Play, Search, HelpCircle,
  Info, TrendingUp, Music, MapPin, Eye, Check,
  Filter, Star, Volume2, Smile, Sun,
} from "lucide-react";

// ─── Palette ─────────────────────────────────────────────────────────────────
const C = {
  bg: "#09090F",
  surface: "#131320",
  card: "#14141F",
  cardHi: "#1C1C2C",
  cyan: "#00CFFF",
  pink: "#FF2D78",
  lime: "#B8FF2E",
  purple: "#9F7AEA",
  orange: "#FF9500",
  text: "#F2F2FF",
  muted: "#6B6B8A",
  border: "rgba(255,255,255,0.07)",
};

const font = "'Plus Jakarta Sans', sans-serif";
const display = "'Bangers', cursive";

// ─── Mock data ────────────────────────────────────────────────────────────────
const STORIES = [
  { id: 0, name: "Your Story", initial: "+", color: C.cyan, isYou: true, active: false },
  { id: 1, name: "skibidi_lord", initial: "SK", color: C.pink, active: true },
  { id: 2, name: "toilet_boss", initial: "TB", color: C.purple, active: true },
  { id: 3, name: "giga_chad", initial: "GC", color: C.lime, active: false },
  { id: 4, name: "rizz_queen", initial: "RQ", color: C.orange, active: true },
  { id: 5, name: "npc_daily", initial: "ND", color: "#FF6B6B", active: false },
];

const INITIAL_POSTS = [
  {
    id: 1, user: "toilet_boss_99", name: "Toilet Boss",
    initial: "TB", color: C.pink,
    caption: "POV: When the skibidi toilet hits different at 3am 💀🚽",
    tags: ["#skibidi", "#nocap", "#fyp"],
    emoji: "🚽💀", gradA: "#2a001a", gradB: "#5a003a",
    likes: 4289, comments: 312, shares: 89, views: "23.4K",
    liked: false, saved: false, time: "2m ago",
  },
  {
    id: 2, user: "giga_chad_official", name: "Giga Chad",
    initial: "GC", color: C.cyan,
    caption: "No cap this sigma grindset ain't for everyone 🔥💪 stay mid or rise up",
    tags: ["#sigma", "#grindset", "#rizz"],
    emoji: "💪🔥", gradA: "#001530", gradB: "#003050",
    likes: 8732, comments: 567, shares: 234, views: "56.8K",
    liked: true, saved: false, time: "15m ago",
  },
  {
    id: 3, user: "rizz_queen_official", name: "Rizz Queen",
    initial: "RQ", color: C.lime,
    caption: "Skibidi Marcial understood the assignment fr fr 💅✨ slay behavior only",
    tags: ["#marcial", "#skibididop", "#slay"],
    emoji: "💅✨", gradA: "#0d1a00", gradB: "#254a00",
    likes: 2156, comments: 189, shares: 45, views: "12.1K",
    liked: false, saved: true, time: "1h ago",
  },
  {
    id: 4, user: "npc_moment_daily", name: "NPC Moments",
    initial: "NM", color: C.orange,
    caption: "Caught this NPC behavior in the wild 🤖 type shi fr no cap whatsoever",
    tags: ["#npc", "#viral", "#fyp"],
    emoji: "🤖🎮", gradA: "#1a0e00", gradB: "#3a2400",
    likes: 15489, comments: 1203, shares: 892, views: "234K",
    liked: false, saved: false, time: "3h ago",
  },
];

const NOTIFS = [
  { id: 1, type: "like", name: "Giga Chad", initial: "GC", color: C.cyan, action: "liked your post", time: "2m ago" },
  { id: 2, type: "follow", name: "Toilet Boss", initial: "TB", color: C.pink, action: "started following you", time: "5m ago" },
  { id: 3, type: "comment", name: "Rizz Queen", initial: "RQ", color: C.lime, action: 'commented: "bussin fr 🔥"', time: "12m ago" },
  { id: 4, type: "mention", name: "Sigma Lord", initial: "SL", color: C.purple, action: "mentioned you in a post", time: "1h ago" },
  { id: 5, type: "like", name: "NPC Moments", initial: "NM", color: C.orange, action: "liked your story", time: "2h ago" },
  { id: 6, type: "follow", name: "Skibidi Lord", initial: "SK", color: C.pink, action: "started following you", time: "3h ago" },
  { id: 7, type: "comment", name: "Giga Chad", initial: "GC", color: C.cyan, action: 'commented: "sheesh 💀"', time: "5h ago" },
];

const TRENDING = [
  { tag: "#skibididop", count: "2.4M posts", hot: true },
  { tag: "#sigmagrindset", count: "1.8M posts", hot: true },
  { tag: "#rizznation", count: "987K posts", hot: false },
  { tag: "#gyattttt", count: "743K posts", hot: true },
  { tag: "#npcmoment", count: "612K posts", hot: false },
  { tag: "#marcialgang", count: "445K posts", hot: false },
  { tag: "#nocap", count: "3.1M posts", hot: true },
  { tag: "#typeshi", count: "892K posts", hot: false },
];

const DISCOVER_GRID = [
  { id: 1, emoji: "🚽💀", gradA: "#2a0020", gradB: "#5a004a" },
  { id: 2, emoji: "💪🔥", gradA: "#001530", gradB: "#003060" },
  { id: 3, emoji: "💅✨", gradA: "#102000", gradB: "#204000" },
  { id: 4, emoji: "🤖🎮", gradA: "#201500", gradB: "#402800" },
  { id: 5, emoji: "🌊🏄", gradA: "#001a30", gradB: "#004050" },
  { id: 6, emoji: "👑🎭", gradA: "#200020", gradB: "#500050" },
  { id: 7, emoji: "⚡🔮", gradA: "#0a0030", gradB: "#200060" },
  { id: 8, emoji: "🦾🤯", gradA: "#200000", gradB: "#500010" },
  { id: 9, emoji: "🌙⭐", gradA: "#050020", gradB: "#150050" },
];

// ─── Utility ──────────────────────────────────────────────────────────────────
function fmt(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
}

// ─── Shared micro-components ──────────────────────────────────────────────────
function Av({ initial, color, size = 38, ring = false }: { initial: string; color: string; size?: number; ring?: boolean }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color + "22",
      border: `2px solid ${ring ? color : "transparent"}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color, fontSize: size * 0.32, fontWeight: 800, fontFamily: font,
      flexShrink: 0,
    }}>
      {initial}
    </div>
  );
}

function Btn({ label, onClick, variant = "primary", small = false }: {
  label: string; onClick?: () => void; variant?: "primary" | "ghost" | "danger"; small?: boolean;
}) {
  const bg = variant === "primary"
    ? `linear-gradient(135deg, ${C.cyan}, ${C.pink})`
    : variant === "danger"
    ? C.pink + "22"
    : C.cardHi;
  const col = variant === "primary" ? "#fff" : variant === "danger" ? C.pink : C.text;
  const border = variant === "ghost" ? `1px solid ${C.border}` : "none";
  return (
    <button onClick={onClick} style={{
      height: small ? 34 : 50, padding: small ? "0 14px" : "0 20px",
      borderRadius: small ? 99 : 15, border, cursor: "pointer",
      background: bg, color: col,
      fontSize: small ? 12 : 15, fontWeight: 700, fontFamily: font,
      boxShadow: variant === "primary" ? `0 4px 20px ${C.cyan}35` : "none",
      whiteSpace: "nowrap",
    }}>
      {label}
    </button>
  );
}

function Field({ label, placeholder, icon: Icon, secret = false }: {
  label: string; placeholder: string; icon?: any; secret?: boolean;
}) {
  const [val, setVal] = useState("");
  return (
    <div>
      <div style={{ fontSize: 10, color: C.muted, fontFamily: font, fontWeight: 700, letterSpacing: 0.6, marginBottom: 5 }}>
        {label}
      </div>
      <div style={{
        height: 48, borderRadius: 13, background: C.cardHi,
        border: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", padding: "0 13px", gap: 9,
      }}>
        {Icon && <Icon size={15} color={C.muted} />}
        <input
          type={secret ? "password" : "text"}
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1, background: "none", border: "none", outline: "none",
            color: C.text, fontSize: 13, fontFamily: font,
          }}
        />
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div style={{
      height: 28, background: "transparent",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 20px", paddingTop: 6,
      fontSize: 11, fontWeight: 700, color: C.text, fontFamily: font,
    }}>
      <span>9:41</span>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <span style={{ fontSize: 10, letterSpacing: -1 }}>▋▋▋▋</span>
        <span style={{ fontSize: 11 }}>WiFi</span>
        <span style={{ fontSize: 10 }}>🔋</span>
      </div>
    </div>
  );
}

function BottomNav({ active, onSelect }: { active: string; onSelect: (t: string) => void }) {
  const tabs = [
    { id: "home", Icon: Home, label: "Home" },
    { id: "discover", Icon: Compass, label: "Explore" },
    { id: "create", Icon: Plus, label: "" },
    { id: "notifications", Icon: Bell, label: "Inbox" },
    { id: "profile", Icon: User, label: "Me" },
  ];
  return (
    <div style={{
      height: 60, background: C.surface, borderTop: `1px solid ${C.border}`,
      display: "flex", alignItems: "center",
    }}>
      {tabs.map(({ id, Icon, label }) => {
        const isOn = active === id;
        const isCreate = id === "create";
        return (
          <button key={id} onClick={() => onSelect(id)} style={{
            flex: 1, height: "100%", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: "none", border: "none", cursor: "pointer", gap: 2,
          }}>
            {isCreate ? (
              <div style={{
                width: 44, height: 28, borderRadius: 99,
                background: `linear-gradient(135deg, ${C.cyan}, ${C.pink})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 0 14px ${C.cyan}50`,
              }}>
                <Plus size={18} color="#fff" strokeWidth={2.5} />
              </div>
            ) : (
              <>
                <Icon size={21} color={isOn ? C.cyan : C.muted} strokeWidth={isOn ? 2.5 : 1.5} />
                <span style={{ fontSize: 9, fontWeight: 700, color: isOn ? C.cyan : C.muted, fontFamily: font }}>
                  {label}
                </span>
                {isOn && <div style={{ width: 3, height: 3, borderRadius: "50%", background: C.cyan }} />}
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── SPLASH ───────────────────────────────────────────────────────────────────
function SplashScreen() {
  return (
    <div style={{
      flex: 1, background: C.bg, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 18,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", width: 240, height: 240, borderRadius: "50%", background: C.cyan + "18", filter: "blur(70px)", top: 60, right: -60, pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: C.pink + "18", filter: "blur(70px)", bottom: 100, left: -50, pointerEvents: "none" }} />

      <div style={{
        width: 96, height: 96, borderRadius: 30,
        background: `linear-gradient(135deg, ${C.cyan}30, ${C.pink}30)`,
        border: `2px solid ${C.cyan}60`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 48, boxShadow: `0 0 50px ${C.cyan}45`,
      }}>
        💀
      </div>

      <div style={{ textAlign: "center", lineHeight: 1 }}>
        <div style={{ fontFamily: display, fontSize: 40, letterSpacing: 3, color: C.text }}>
          SKIBIDI
        </div>
        <div style={{
          fontFamily: display, fontSize: 30, letterSpacing: 4,
          background: `linear-gradient(90deg, ${C.cyan}, ${C.pink})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          MARCIAL
        </div>
      </div>

      <div style={{ color: C.muted, fontSize: 12, fontFamily: font, letterSpacing: 1.5 }}>
        THE FEED THAT HITS DIFFERENT
      </div>

      <div style={{ marginTop: 28 }}>
        <div style={{ width: 130, height: 3, borderRadius: 99, background: C.border, overflow: "hidden" }}>
          <div style={{
            width: "100%", height: "100%",
            background: `linear-gradient(90deg, ${C.cyan}, ${C.pink})`,
            animation: "load 2.4s ease-in-out forwards",
          }} />
        </div>
      </div>

      <style>{`
        @keyframes load { from { width: 0 } to { width: 100% } }
      `}</style>
    </div>
  );
}

// ─── ONBOARDING ───────────────────────────────────────────────────────────────
function OnboardingScreen({ step, onNext, onSkip }: { step: number; onNext: () => void; onSkip: () => void }) {
  const slides = [
    { emoji: "💀🔥", gradA: "#1a0020", gradB: "#3a004a", color: C.pink, title: "Drop the Hardest Content", sub: "Share memes, clips, and moments that hit different. No mid allowed." },
    { emoji: "⚡🌊", gradA: "#001530", gradB: "#003050", color: C.cyan, title: "Rizz Up Your Feed", sub: "Discover trending content from the most sigma creators worldwide." },
    { emoji: "👑🎭", gradA: "#101a00", gradB: "#203400", color: C.lime, title: "Build Your Legacy", sub: "Grow your followers, drop W content, and become the most based creator on the app." },
  ];
  const s = slides[step];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg }}>
      <div style={{
        flex: 1, background: `linear-gradient(180deg, ${s.gradA}, ${C.bg})`,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 16, padding: "40px 28px 20px",
      }}>
        <div style={{
          width: 150, height: 150, borderRadius: 44,
          background: `linear-gradient(135deg, ${s.color}20, ${s.color}45)`,
          border: `2px solid ${s.color}60`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 68, boxShadow: `0 0 70px ${s.color}30`,
        }}>
          {s.emoji}
        </div>
        <div style={{ fontFamily: display, fontSize: 28, letterSpacing: 1.5, color: C.text, textAlign: "center", lineHeight: 1.2, marginTop: 6 }}>
          {s.title}
        </div>
        <div style={{ color: C.muted, fontSize: 13, textAlign: "center", fontFamily: font, lineHeight: 1.65, maxWidth: 270 }}>
          {s.sub}
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, justifyContent: "center", padding: "8px 0" }}>
        {slides.map((_, i) => (
          <div key={i} style={{
            height: 4, borderRadius: 99,
            width: i === step ? 26 : 8,
            background: i === step ? s.color : C.border,
            transition: "all 0.3s",
          }} />
        ))}
      </div>

      <div style={{ padding: "12px 24px 28px", display: "flex", flexDirection: "column", gap: 10 }}>
        <button onClick={onNext} style={{
          height: 52, borderRadius: 16, border: "none", cursor: "pointer",
          background: `linear-gradient(135deg, ${s.color}, ${s.color}99)`,
          color: step === 2 ? "#000" : "#fff", fontSize: 15, fontWeight: 800, fontFamily: font,
          boxShadow: `0 4px 24px ${s.color}40`,
        }}>
          {step === 2 ? "Get Started 🔥" : "Next →"}
        </button>
        {step < 2 && (
          <button onClick={onSkip} style={{
            height: 44, borderRadius: 16, cursor: "pointer",
            background: "none", border: `1px solid ${C.border}`,
            color: C.muted, fontSize: 13, fontWeight: 600, fontFamily: font,
          }}>
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin, onRegister, onForgot }: { onLogin: () => void; onRegister: () => void; onForgot: () => void }) {
  return (
    <div style={{ flex: 1, background: C.bg, display: "flex", flexDirection: "column", padding: "36px 24px 28px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", background: C.cyan + "14", filter: "blur(90px)", top: -90, right: -70, pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", background: C.pink + "14", filter: "blur(90px)", bottom: 80, left: -60, pointerEvents: "none" }} />

      <div style={{ zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 34 }}>
          <div style={{ fontSize: 40, marginBottom: 6 }}>💀</div>
          <div style={{ fontFamily: display, fontSize: 26, letterSpacing: 2.5, color: C.text }}>SKIBIDI MARCIAL</div>
          <div style={{ color: C.muted, fontSize: 12, fontFamily: font, marginTop: 5 }}>Welcome back, no cap</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          <Field label="USERNAME OR EMAIL" placeholder="marcial_skibidi" icon={AtSign} />
          <Field label="PASSWORD" placeholder="••••••••" icon={Lock} secret />

          <div style={{ textAlign: "right", marginTop: -4 }}>
            <button onClick={onForgot} style={{ background: "none", border: "none", color: C.cyan, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: font }}>
              Forgot password?
            </button>
          </div>

          <button onClick={onLogin} style={{
            marginTop: 4, height: 52, borderRadius: 16, border: "none", cursor: "pointer",
            background: `linear-gradient(135deg, ${C.cyan}, ${C.pink})`,
            color: "#fff", fontSize: 15, fontWeight: 800, fontFamily: font,
            boxShadow: `0 4px 28px ${C.cyan}40`,
          }}>
            Sign In 🔥
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1, height: 1, background: C.border }} />
            <span style={{ color: C.muted, fontSize: 11, fontFamily: font }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {[["G", "Google"], ["🍎", "Apple"], ["f", "Facebook"]].map(([icon, label]) => (
              <button key={label} style={{
                flex: 1, height: 46, borderRadius: 13, cursor: "pointer",
                background: C.cardHi, border: `1px solid ${C.border}`,
                color: C.text, fontSize: icon.length === 1 ? 15 : 20,
                fontWeight: 700, fontFamily: font,
              }}>
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 26, fontSize: 13, color: C.muted, fontFamily: font }}>
          {"New here? "}
          <button onClick={onRegister} style={{ background: "none", border: "none", color: C.cyan, fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: font }}>
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── FORGOT PASSWORD ──────────────────────────────────────────────────────────
function ForgotScreen({ onBack, onSent }: { onBack: () => void; onSent: () => void }) {
  const [sent, setSent] = useState(false);
  const handleSend = () => { setSent(true); setTimeout(onSent, 1800); };

  return (
    <div style={{ flex: 1, background: C.bg, display: "flex", flexDirection: "column", padding: "16px 24px 28px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", alignSelf: "flex-start", marginBottom: 20 }}>
        <ArrowLeft size={22} color={C.text} />
      </button>

      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: display, fontSize: 28, letterSpacing: 1.5, color: C.text }}>RESET PASSWORD</div>
        <div style={{ color: C.muted, fontSize: 13, fontFamily: font, marginTop: 5, lineHeight: 1.5 }}>
          Enter your email and we will send a reset link. Fr fr, no cap.
        </div>
      </div>

      {!sent ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="EMAIL ADDRESS" placeholder="marcial@skibidi.com" icon={AtSign} />
          <button onClick={handleSend} style={{
            marginTop: 8, height: 52, borderRadius: 16, border: "none", cursor: "pointer",
            background: `linear-gradient(135deg, ${C.cyan}, ${C.pink})`,
            color: "#fff", fontSize: 15, fontWeight: 800, fontFamily: font,
          }}>
            Send Reset Link
          </button>
        </div>
      ) : (
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 14,
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: C.cyan + "22", border: `2px solid ${C.cyan}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 36,
          }}>
            ✉️
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: display, fontSize: 22, color: C.text, letterSpacing: 1 }}>CHECK YOUR EMAIL</div>
            <div style={{ color: C.muted, fontSize: 13, fontFamily: font, marginTop: 6, lineHeight: 1.5 }}>
              Reset link sent! No cap, check your inbox 📬
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── REGISTER ─────────────────────────────────────────────────────────────────
function RegisterScreen({ onBack, onRegister }: { onBack: () => void; onRegister: () => void }) {
  const [gender, setGender] = useState("Male");
  const [agreed, setAgreed] = useState(true);

  return (
    <div style={{ flex: 1, background: C.bg, display: "flex", flexDirection: "column", padding: "16px 24px 28px", overflowY: "auto" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", alignSelf: "flex-start", marginBottom: 18 }}>
        <ArrowLeft size={22} color={C.text} />
      </button>

      <div style={{ marginBottom: 22 }}>
        <div style={{ fontFamily: display, fontSize: 28, letterSpacing: 1.5, color: C.text }}>JOIN THE GANG 💀</div>
        <div style={{ color: C.muted, fontSize: 12, fontFamily: font, marginTop: 4 }}>Create your Skibidi Marcial account</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        <Field label="FULL NAME" placeholder="Marcial Dela Cruz" icon={User} />
        <Field label="USERNAME" placeholder="@marcial_skibidi" icon={AtSign} />
        <Field label="EMAIL" placeholder="marcial@skibidi.com" icon={Globe} />
        <Field label="PASSWORD" placeholder="Min. 8 characters" icon={Lock} secret />
        <Field label="DATE OF BIRTH" placeholder="MM / DD / YYYY" icon={Info} />

        <div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: font, fontWeight: 700, letterSpacing: 0.6, marginBottom: 7 }}>GENDER</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["Male", "Female", "Other"].map(g => (
              <button key={g} onClick={() => setGender(g)} style={{
                flex: 1, height: 36, borderRadius: 99, cursor: "pointer",
                background: gender === g ? C.cyan + "22" : C.cardHi,
                border: `1px solid ${gender === g ? C.cyan : C.border}`,
                color: gender === g ? C.cyan : C.muted,
                fontSize: 12, fontWeight: 700, fontFamily: font,
              }}>
                {g}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div
            onClick={() => setAgreed(!agreed)}
            style={{
              width: 18, height: 18, borderRadius: 5, marginTop: 1,
              border: `2px solid ${agreed ? C.cyan : C.border}`,
              background: agreed ? C.cyan + "22" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0,
            }}
          >
            {agreed && <Check size={11} color={C.cyan} strokeWidth={3} />}
          </div>
          <p style={{ fontSize: 11, color: C.muted, fontFamily: font, lineHeight: 1.6, flex: 1 }}>
            I agree to the <span style={{ color: C.cyan, cursor: "pointer" }}>Terms of Service</span> and <span style={{ color: C.cyan, cursor: "pointer" }}>Privacy Policy</span>. No cap.
          </p>
        </div>

        <button onClick={onRegister} style={{
          marginTop: 6, height: 52, borderRadius: 16, border: "none", cursor: "pointer",
          background: `linear-gradient(135deg, ${C.cyan}, ${C.pink})`,
          color: "#fff", fontSize: 15, fontWeight: 800, fontFamily: font,
          boxShadow: `0 4px 28px ${C.pink}35`,
        }}>
          Create Account 🚀
        </button>

        <div style={{ textAlign: "center", fontSize: 12, color: C.muted, fontFamily: font }}>
          {"Already have an account? "}
          <button onClick={onBack} style={{ background: "none", border: "none", color: C.cyan, fontWeight: 700, cursor: "pointer", fontSize: 12, fontFamily: font }}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── HOME TAB ─────────────────────────────────────────────────────────────────
function HomeTab({ posts, onLike, onSave }: { posts: typeof INITIAL_POSTS; onLike: (id: number) => void; onSave: (id: number) => void }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>
      {/* AppBar */}
      <div style={{
        padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, background: C.bg, zIndex: 10,
      }}>
        <div style={{ fontFamily: display, fontSize: 22, letterSpacing: 2.5, color: C.text }}>
          SKIBIDI <span style={{ color: C.cyan }}>MARCIAL</span>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer" }}><Send size={19} color={C.text} /></button>
        </div>
      </div>

      {/* Stories */}
      <div style={{ padding: "12px 0 12px 16px", display: "flex", gap: 13, overflowX: "auto", scrollbarWidth: "none", borderBottom: `1px solid ${C.border}` }}>
        {STORIES.map(s => (
          <div key={s.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, flexShrink: 0, width: 58, cursor: "pointer" }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%", padding: 2,
              background: s.isYou ? C.cardHi : s.active ? `linear-gradient(135deg, ${C.cyan}, ${C.pink})` : C.border,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%", background: s.color + "22",
                border: `2px solid ${C.surface}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: s.color, fontSize: s.isYou ? 22 : 14, fontWeight: 800, fontFamily: font,
              }}>
                {s.isYou ? "+" : s.initial}
              </div>
            </div>
            <span style={{ fontSize: 9.5, color: C.muted, textAlign: "center", fontFamily: font, width: 58, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {s.name.length > 8 ? s.name.slice(0, 7) + "…" : s.name}
            </span>
          </div>
        ))}
        <div style={{ width: 16, flexShrink: 0 }} />
      </div>

      {/* Posts */}
      {posts.map(p => (
        <div key={p.id} style={{ borderBottom: `1px solid ${C.border}` }}>
          {/* Header */}
          <div style={{ padding: "11px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <Av initial={p.initial} color={p.color} size={38} ring />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 13, color: C.text, fontFamily: font }}>{p.name}</div>
              <div style={{ fontSize: 10, color: C.muted, fontFamily: font }}>@{p.user} · {p.time}</div>
            </div>
            <button style={{ height: 28, padding: "0 12px", borderRadius: 99, background: C.cyan + "18", border: `1px solid ${C.cyan}40`, color: C.cyan, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: font }}>
              Follow
            </button>
            <MoreHorizontal size={17} color={C.muted} style={{ cursor: "pointer" }} />
          </div>

          {/* Media */}
          <div style={{
            height: 270, background: `linear-gradient(160deg, ${p.gradA}, ${p.gradB})`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            position: "relative", gap: 6,
          }}>
            <div style={{ fontSize: 64 }}>{p.emoji}</div>
            <div style={{ position: "absolute", top: 10, right: 10, display: "flex", alignItems: "center", gap: 4, background: "rgba(0,0,0,0.5)", borderRadius: 99, padding: "3px 9px" }}>
              <Eye size={11} color={C.muted} />
              <span style={{ fontSize: 10, color: C.muted, fontFamily: font }}>{p.views}</span>
            </div>
            <div style={{ position: "absolute", bottom: 10, right: 10, width: 32, height: 32, borderRadius: "50%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Volume2 size={14} color={C.text} />
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 60, background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
          </div>

          {/* Actions */}
          <div style={{ padding: "10px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 9 }}>
              <button onClick={() => onLike(p.id)} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer" }}>
                <Heart size={21} color={p.liked ? C.pink : C.muted} fill={p.liked ? C.pink : "none"} />
                <span style={{ fontSize: 12, color: p.liked ? C.pink : C.muted, fontFamily: font }}>{fmt(p.liked ? p.likes + 1 : p.likes)}</span>
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer" }}>
                <MessageCircle size={21} color={C.muted} />
                <span style={{ fontSize: 12, color: C.muted, fontFamily: font }}>{fmt(p.comments)}</span>
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer" }}>
                <Share2 size={21} color={C.muted} />
                <span style={{ fontSize: 12, color: C.muted, fontFamily: font }}>{fmt(p.shares)}</span>
              </button>
              <div style={{ flex: 1 }} />
              <button onClick={() => onSave(p.id)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <Bookmark size={21} color={p.saved ? C.cyan : C.muted} fill={p.saved ? C.cyan : "none"} />
              </button>
            </div>
            <div style={{ fontSize: 13, color: C.text, fontFamily: font, lineHeight: 1.5 }}>
              <span style={{ fontWeight: 800 }}>{p.name}</span> {p.caption}
            </div>
            <div style={{ display: "flex", gap: 7, marginTop: 5, flexWrap: "wrap" }}>
              {p.tags.map(t => <span key={t} style={{ fontSize: 11, color: C.cyan, fontFamily: font, fontWeight: 700 }}>{t}</span>)}
            </div>
            <div style={{ marginTop: 7, fontSize: 11, color: C.muted, fontFamily: font, cursor: "pointer" }}>
              View all {p.comments} comments
            </div>
          </div>
        </div>
      ))}

      <div style={{ height: 16 }} />
    </div>
  );
}

// ─── DISCOVER TAB ─────────────────────────────────────────────────────────────
function DiscoverTab() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("For You");
  const cats = ["For You", "Trending", "Memes", "Sigma", "Skibidi", "Rizz", "NPC", "Gaming"];

  return (
    <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>
      {/* Sticky search */}
      <div style={{ padding: "12px 16px 8px", position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ height: 46, borderRadius: 14, background: C.cardHi, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", padding: "0 13px", gap: 10 }}>
          <Search size={16} color={C.muted} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search creators, memes, hashtags..." style={{ flex: 1, background: "none", border: "none", outline: "none", color: C.text, fontSize: 13, fontFamily: font }} />
          {query && <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={15} color={C.muted} /></button>}
        </div>
      </div>

      {/* Category chips */}
      <div style={{ display: "flex", gap: 8, padding: "6px 16px 12px", overflowX: "auto", scrollbarWidth: "none" }}>
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            height: 32, padding: "0 14px", borderRadius: 99, flexShrink: 0, cursor: "pointer",
            background: cat === c ? C.cyan : C.cardHi,
            border: `1px solid ${cat === c ? C.cyan : C.border}`,
            color: cat === c ? "#000" : C.muted, fontSize: 12, fontWeight: 700, fontFamily: font,
          }}>
            {c}
          </button>
        ))}
      </div>

      {/* Trending */}
      <div style={{ padding: "0 16px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <TrendingUp size={13} color={C.pink} />
          <span style={{ fontSize: 11, fontWeight: 800, color: C.text, fontFamily: font, letterSpacing: 0.6 }}>TRENDING NOW</span>
        </div>
        {TRENDING.map((t, i) => (
          <div key={t.tag} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.border}`, cursor: "pointer" }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: C.cardHi, display: "flex", alignItems: "center", justifyContent: "center", color: C.muted, fontSize: 11, fontWeight: 800, fontFamily: font }}>
              {i + 1}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.text, fontFamily: font }}>{t.tag}</div>
              <div style={{ fontSize: 11, color: C.muted, fontFamily: font }}>{t.count}</div>
            </div>
            {t.hot && (
              <div style={{ background: C.pink + "20", borderRadius: 99, padding: "2px 8px", display: "flex", alignItems: "center", gap: 3 }}>
                <Flame size={10} color={C.pink} />
                <span style={{ fontSize: 9, color: C.pink, fontWeight: 800, fontFamily: font }}>HOT</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Grid explore */}
      <div style={{ padding: "0 16px 8px" }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.text, fontFamily: font, letterSpacing: 0.6, marginBottom: 10 }}>EXPLORE</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
          {DISCOVER_GRID.map((g, i) => (
            <div key={g.id} style={{
              aspectRatio: i % 5 === 0 ? "1/2" : "1/1",
              gridRow: i % 5 === 0 ? "span 2" : "span 1",
              background: `linear-gradient(160deg, ${g.gradA}, ${g.gradB})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, cursor: "pointer", borderRadius: 4,
            }}>
              {g.emoji}
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 16 }} />
    </div>
  );
}

// ─── CREATE TAB ───────────────────────────────────────────────────────────────
function CreateTab({ onBack }: { onBack: () => void }) {
  const [caption, setCaption] = useState("");
  const [privacy, setPrivacy] = useState("Everyone");

  return (
    <div style={{ flex: 1, background: C.bg, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.border}` }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={22} color={C.text} /></button>
        <div style={{ fontFamily: display, fontSize: 18, letterSpacing: 2, color: C.text }}>NEW POST</div>
        <button style={{ height: 32, padding: "0 16px", borderRadius: 99, background: `linear-gradient(135deg, ${C.cyan}, ${C.pink})`, border: "none", cursor: "pointer", color: "#fff", fontSize: 12, fontWeight: 800, fontFamily: font }}>
          Share
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Media zone */}
        <div style={{ margin: "16px 16px 12px", height: 190, borderRadius: 18, background: C.cardHi, border: `2px dashed ${C.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer" }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: `linear-gradient(135deg, ${C.cyan}22, ${C.pink}22)`, border: `1px solid ${C.cyan}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Image size={24} color={C.cyan} />
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.text, fontFamily: font }}>Tap to upload</div>
            <div style={{ fontSize: 11, color: C.muted, fontFamily: font, marginTop: 2 }}>Photo · Video · GIF</div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ padding: "0 16px", display: "flex", gap: 8, marginBottom: 14 }}>
          {[{ Icon: Camera, label: "Camera" }, { Icon: Music, label: "Audio" }, { Icon: MapPin, label: "Location" }, { Icon: Smile, label: "Sticker" }].map(({ Icon, label }) => (
            <button key={label} style={{ flex: 1, height: 52, borderRadius: 12, background: C.cardHi, border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, cursor: "pointer" }}>
              <Icon size={15} color={C.muted} />
              <span style={{ fontSize: 9, color: C.muted, fontFamily: font, fontWeight: 700 }}>{label}</span>
            </button>
          ))}
        </div>

        {/* Caption */}
        <div style={{ padding: "0 16px 14px" }}>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: font, fontWeight: 700, letterSpacing: 0.6, marginBottom: 7 }}>CAPTION</div>
          <div style={{ minHeight: 80, borderRadius: 14, background: C.cardHi, border: `1px solid ${C.border}`, padding: 12 }}>
            <textarea
              value={caption}
              onChange={e => setCaption(e.target.value)}
              placeholder="Add a caption... no cap 💀"
              style={{ width: "100%", minHeight: 60, background: "none", border: "none", outline: "none", color: C.text, fontSize: 13, fontFamily: font, resize: "none", lineHeight: 1.6 }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
            <div style={{ display: "flex", gap: 12 }}>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 17 }}>😂</button>
              <button style={{ background: "none", border: "none", cursor: "pointer" }}><AtSign size={15} color={C.muted} /></button>
              <button style={{ background: "none", border: "none", cursor: "pointer" }}><Hash size={15} color={C.muted} /></button>
            </div>
            <span style={{ fontSize: 11, color: C.muted, fontFamily: font }}>{caption.length}/2200</span>
          </div>
        </div>

        {/* Options */}
        {[
          { label: "Privacy", val: privacy, Icon: Globe },
          { label: "Add Location", val: "None", Icon: MapPin },
          { label: "Tag People", val: "None", Icon: AtSign },
          { label: "Add Music", val: "None", Icon: Music },
          { label: "Advanced Settings", val: "", Icon: Settings },
        ].map(({ label, val, Icon }) => (
          <div key={label} style={{ margin: "0 16px", padding: "12px 0", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: C.cardHi, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={15} color={C.muted} />
            </div>
            <span style={{ flex: 1, fontSize: 13, color: C.text, fontFamily: font, fontWeight: 600 }}>{label}</span>
            {val && <span style={{ fontSize: 12, color: C.muted, fontFamily: font }}>{val}</span>}
            <ChevronRight size={15} color={C.muted} />
          </div>
        ))}
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

// ─── NOTIFICATIONS TAB ────────────────────────────────────────────────────────
function NotificationsTab() {
  const [filt, setFilt] = useState("All");
  const icons: Record<string, any> = { like: Heart, follow: UserPlus, comment: MessageCircle, mention: AtSign };
  const cols: Record<string, string> = { like: C.pink, follow: C.cyan, comment: C.lime, mention: C.purple };
  const fills: Record<string, boolean> = { like: true, follow: false, comment: false, mention: false };

  return (
    <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>
      <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ fontFamily: display, fontSize: 20, letterSpacing: 2, color: C.text }}>NOTIFICATIONS</div>
        <Filter size={17} color={C.muted} style={{ cursor: "pointer" }} />
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", borderBottom: `1px solid ${C.border}` }}>
        {["All", "Likes", "Comments", "Follows"].map(f => (
          <button key={f} onClick={() => setFilt(f)} style={{
            flex: 1, height: 40, background: "none", cursor: "pointer",
            border: "none",
            borderBottom: `2px solid ${filt === f ? C.cyan : "transparent"}`,
            color: filt === f ? C.cyan : C.muted,
            fontSize: 11, fontWeight: 800, fontFamily: font, transition: "all 0.2s",
          }}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ padding: "10px 0" }}>
        <div style={{ padding: "2px 16px 8px" }}>
          <span style={{ fontSize: 10, color: C.muted, fontFamily: font, fontWeight: 800, letterSpacing: 0.6 }}>NEW · TODAY</span>
        </div>
        {NOTIFS.map(n => {
          const NIcon = icons[n.type] || Bell;
          const nColor = cols[n.type] || C.cyan;
          const doFill = fills[n.type];
          return (
            <div key={n.id} style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${C.border}`, cursor: "pointer" }}>
              <div style={{ position: "relative" }}>
                <Av initial={n.initial} color={n.color} size={44} ring />
                <div style={{ position: "absolute", bottom: -2, right: -2, width: 18, height: 18, borderRadius: "50%", background: nColor + "25", border: `2px solid ${C.bg}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <NIcon size={9} color={nColor} fill={doFill ? nColor : "none"} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: C.text, fontFamily: font }}>{n.name}</span>
                <span style={{ fontSize: 12, color: C.muted, fontFamily: font }}>{" "}{n.action}</span>
                <div style={{ fontSize: 10, color: C.muted, fontFamily: font, marginTop: 2 }}>{n.time}</div>
              </div>
              {n.type === "follow" && (
                <button style={{ height: 30, padding: "0 13px", borderRadius: 99, background: C.cyan + "18", border: `1px solid ${C.cyan}40`, color: C.cyan, fontSize: 11, fontWeight: 800, cursor: "pointer", fontFamily: font }}>
                  Follow
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── PROFILE TAB ──────────────────────────────────────────────────────────────
function ProfileTab({ onSettings }: { onSettings: () => void }) {
  const [pTab, setPTab] = useState("posts");

  return (
    <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>
      <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: C.text, fontFamily: font }}>@marcial_skibidi</div>
        <div style={{ display: "flex", gap: 14 }}>
          <Plus size={21} color={C.text} style={{ cursor: "pointer" }} />
          <button onClick={onSettings} style={{ background: "none", border: "none", cursor: "pointer" }}><Settings size={21} color={C.text} /></button>
        </div>
      </div>

      {/* Profile card */}
      <div style={{ padding: "0 16px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 14 }}>
          <div style={{
            width: 82, height: 82, borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.cyan}30, ${C.pink}30)`,
            border: `3px solid ${C.cyan}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 30, fontWeight: 900, color: C.cyan, fontFamily: font,
            boxShadow: `0 0 28px ${C.cyan}40`,
          }}>
            MG
          </div>
          <div style={{ display: "flex", gap: 18, flex: 1, justifyContent: "space-around" }}>
            {[["234", "Posts"], ["12.4K", "Followers"], ["891", "Following"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 17, fontWeight: 900, color: C.text, fontFamily: font }}>{n}</div>
                <div style={{ fontSize: 10, color: C.muted, fontFamily: font, marginTop: 1 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: C.text, fontFamily: font }}>Marcial G.</div>
          <div style={{ fontSize: 12, color: C.muted, fontFamily: font, lineHeight: 1.65, marginTop: 3 }}>
            💀 skibidi || sigma || no cap{"\n"}
            type shi only 🔥 | content creator
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
          {["#skibidi", "#sigma", "#fyp"].map(t => (
            <span key={t} style={{ background: C.cyan + "18", color: C.cyan, border: `1px solid ${C.cyan}35`, borderRadius: 99, padding: "2px 10px", fontSize: 11, fontWeight: 700, fontFamily: font }}>
              {t}
            </span>
          ))}
        </div>

        {/* Rizz rating */}
        <div style={{ background: C.cardHi, borderRadius: 14, padding: "10px 14px", border: `1px solid ${C.border}`, marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 22 }}>⚡</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: C.muted, fontFamily: font, fontWeight: 700, letterSpacing: 0.5 }}>RIZZ RATING</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
              <div style={{ flex: 1, height: 5, borderRadius: 99, background: C.border, overflow: "hidden" }}>
                <div style={{ width: "84%", height: "100%", background: `linear-gradient(90deg, ${C.cyan}, ${C.pink})`, borderRadius: 99 }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 900, color: C.cyan, fontFamily: font }}>8.4</span>
            </div>
          </div>
          <div style={{ background: C.lime + "22", border: `1px solid ${C.lime}40`, borderRadius: 8, padding: "3px 9px" }}>
            <span style={{ fontSize: 10, color: C.lime, fontWeight: 800, fontFamily: font }}>SIGMA</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ flex: 1, height: 36, borderRadius: 10, background: C.cardHi, border: `1px solid ${C.border}`, color: C.text, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: font }}>Edit Profile</button>
          <button style={{ flex: 1, height: 36, borderRadius: 10, background: C.cardHi, border: `1px solid ${C.border}`, color: C.text, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: font }}>Share</button>
          <button style={{ width: 36, height: 36, borderRadius: 10, background: C.cardHi, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <UserPlus size={14} color={C.text} />
          </button>
        </div>
      </div>

      {/* Highlights */}
      <div style={{ padding: "0 16px 14px", display: "flex", gap: 14, overflowX: "auto", scrollbarWidth: "none" }}>
        {["💀 Skibidi", "🔥 Sigma", "🎮 Gaming", "💅 Rizz", "🤖 NPC"].map(h => (
          <div key={h} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0, cursor: "pointer" }}>
            <div style={{ width: 54, height: 54, borderRadius: "50%", background: C.cardHi, border: `2px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
              {h.split(" ")[0]}
            </div>
            <span style={{ fontSize: 9.5, color: C.muted, fontFamily: font }}>{h.split(" ").slice(1).join(" ")}</span>
          </div>
        ))}
      </div>

      {/* Profile tabs */}
      <div style={{ display: "flex", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        {[{ id: "posts", Icon: Grid }, { id: "reels", Icon: Play }, { id: "tagged", Icon: AtSign }].map(({ id, Icon }) => (
          <button key={id} onClick={() => setPTab(id)} style={{
            flex: 1, height: 44, background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            borderBottom: `2px solid ${pTab === id ? C.cyan : "transparent"}`,
          }}>
            <Icon size={18} color={pTab === id ? C.cyan : C.muted} />
          </button>
        ))}
      </div>

      {/* Posts grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, padding: "2px 0" }}>
        {INITIAL_POSTS.concat(INITIAL_POSTS).map((p, i) => (
          <div key={i} style={{
            aspectRatio: "1/1",
            background: `linear-gradient(160deg, ${p.gradA}, ${p.gradB})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, cursor: "pointer", position: "relative",
          }}>
            {p.emoji}
            {i % 3 === 0 && (
              <div style={{ position: "absolute", top: 5, right: 5, background: "rgba(0,0,0,0.5)", borderRadius: 4, padding: "2px 5px", display: "flex", alignItems: "center", gap: 2 }}>
                <Play size={7} color={C.text} fill={C.text} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ height: 16 }} />
    </div>
  );
}

// ─── SETTINGS SCREEN ──────────────────────────────────────────────────────────
function SettingsScreen({ onBack }: { onBack: () => void }) {
  const [dark, setDark] = useState(true);

  const sections = [
    { title: "Account", items: [{ label: "Edit Profile", Icon: User, col: C.cyan }, { label: "Privacy & Security", Icon: Shield, col: C.purple }, { label: "Password & Security", Icon: Lock, col: C.pink }] },
    { title: "Preferences", items: [{ label: "Notifications", Icon: Bell, col: C.orange }, { label: "Appearance", Icon: Moon, col: C.purple }, { label: "Language & Region", Icon: Globe, col: C.lime }] },
    { title: "Content", items: [{ label: "Saved Posts", Icon: Bookmark, col: C.cyan }, { label: "Blocked Accounts", Icon: Shield, col: C.pink }, { label: "Muted Words", Icon: Hash, col: C.muted }] },
    { title: "Support", items: [{ label: "Help & Support", Icon: HelpCircle, col: C.cyan }, { label: "About Skibidi Marcial", Icon: Info, col: C.muted }, { label: "Rate the App", Icon: Star, col: C.orange }] },
  ];

  return (
    <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>
      <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer" }}><ArrowLeft size={22} color={C.text} /></button>
        <div style={{ fontFamily: display, fontSize: 20, letterSpacing: 2, color: C.text }}>SETTINGS</div>
      </div>

      {/* Profile card */}
      <div style={{ margin: "14px 16px", padding: "14px", background: C.cardHi, borderRadius: 18, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.cyan + "22", border: `2px solid ${C.cyan}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900, color: C.cyan, fontFamily: font, boxShadow: `0 0 14px ${C.cyan}30` }}>
          MG
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: C.text, fontFamily: font }}>Marcial G.</div>
          <div style={{ fontSize: 11, color: C.muted, fontFamily: font }}>@marcial_skibidi · See profile</div>
        </div>
        <ChevronRight size={16} color={C.muted} />
      </div>

      {/* Dark mode toggle */}
      <div style={{ margin: "0 16px 14px", padding: "13px 14px", background: C.cardHi, borderRadius: 14, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12 }}>
        {dark ? <Moon size={17} color={C.purple} /> : <Sun size={17} color={C.orange} />}
        <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: C.text, fontFamily: font }}>Dark Mode</span>
        <div onClick={() => setDark(!dark)} style={{
          width: 46, height: 26, borderRadius: 99, cursor: "pointer",
          background: dark ? C.cyan : C.border, position: "relative", transition: "all 0.2s",
        }}>
          <div style={{
            width: 20, height: 20, borderRadius: "50%", background: "#fff",
            position: "absolute", top: 3, left: dark ? 23 : 3, transition: "all 0.2s",
          }} />
        </div>
      </div>

      {sections.map(sec => (
        <div key={sec.title} style={{ marginBottom: 10 }}>
          <div style={{ padding: "2px 16px 6px", fontSize: 10, fontWeight: 800, color: C.muted, fontFamily: font, letterSpacing: 0.6 }}>
            {sec.title.toUpperCase()}
          </div>
          <div style={{ margin: "0 16px", background: C.cardHi, borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            {sec.items.map(({ label, Icon, col }, idx) => (
              <div key={label} style={{ padding: "13px 14px", display: "flex", alignItems: "center", gap: 12, borderBottom: idx < sec.items.length - 1 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: col + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={14} color={col} />
                </div>
                <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: C.text, fontFamily: font }}>{label}</span>
                <ChevronRight size={14} color={C.muted} />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ margin: "8px 16px 32px" }}>
        <button style={{ width: "100%", height: 50, borderRadius: 14, background: C.pink + "18", border: `1px solid ${C.pink}35`, color: C.pink, fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: font, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <LogOut size={16} color={C.pink} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<string>("splash");
  const [onboardStep, setOnboardStep] = useState(0);
  const [activeTab, setActiveTab] = useState("home");
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    if (screen === "splash") {
      const t = setTimeout(() => setScreen("onboarding"), 2500);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const toggleLike = (id: number) => setPosts(ps => ps.map(p => p.id === id ? { ...p, liked: !p.liked } : p));
  const toggleSave = (id: number) => setPosts(ps => ps.map(p => p.id === id ? { ...p, saved: !p.saved } : p));

  const handleTab = (tab: string) => {
    if (tab === "create") { setShowCreate(true); return; }
    setShowCreate(false);
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (screen === "splash") return <SplashScreen />;
    if (screen === "onboarding") return (
      <OnboardingScreen
        step={onboardStep}
        onNext={() => onboardStep < 2 ? setOnboardStep(s => s + 1) : setScreen("login")}
        onSkip={() => setScreen("login")}
      />
    );
    if (screen === "login") return (
      <LoginScreen
        onLogin={() => setScreen("main")}
        onRegister={() => setScreen("register")}
        onForgot={() => setScreen("forgot")}
      />
    );
    if (screen === "forgot") return (
      <ForgotScreen
        onBack={() => setScreen("login")}
        onSent={() => setScreen("login")}
      />
    );
    if (screen === "register") return (
      <RegisterScreen
        onBack={() => setScreen("login")}
        onRegister={() => setScreen("main")}
      />
    );
    if (screen === "settings") return <SettingsScreen onBack={() => setScreen("main")} />;

    if (screen === "main") {
      if (showCreate) return <CreateTab onBack={() => { setShowCreate(false); setActiveTab("home"); }} />;
      return (
        <>
          {activeTab === "home" && <HomeTab posts={posts} onLike={toggleLike} onSave={toggleSave} />}
          {activeTab === "discover" && <DiscoverTab />}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "profile" && <ProfileTab onSettings={() => setScreen("settings")} />}
        </>
      );
    }
    return null;
  };

  const showNav = screen === "main" && !showCreate;

  // Screen navigator items
  const navItems = [
    { id: "splash", label: "💀 Splash" },
    { id: "onboarding", label: "🌊 Onboarding" },
    { id: "login", label: "🔑 Login" },
    { id: "forgot", label: "🔒 Forgot PW" },
    { id: "register", label: "🚀 Register" },
    { id: "main|home", label: "🏠 Home Feed" },
    { id: "main|discover", label: "🔍 Discover" },
    { id: "main|create", label: "➕ Create Post" },
    { id: "main|notifications", label: "🔔 Notifications" },
    { id: "main|profile", label: "👤 Profile" },
    { id: "settings", label: "⚙️ Settings" },
  ];

  const isActive = (id: string) => {
    if (id === "settings") return screen === "settings";
    if (id.startsWith("main|")) {
      const tab = id.split("|")[1];
      if (tab === "create") return screen === "main" && showCreate;
      return screen === "main" && activeTab === tab && !showCreate;
    }
    return screen === id;
  };

  const gotoNav = (id: string) => {
    setShowCreate(false);
    if (id === "settings") { setScreen("settings"); return; }
    if (id === "splash") { setScreen("splash"); setOnboardStep(0); return; }
    if (id === "onboarding") { setScreen("onboarding"); setOnboardStep(0); return; }
    if (id.startsWith("main|")) {
      const tab = id.split("|")[1];
      setScreen("main");
      if (tab === "create") { setShowCreate(true); return; }
      setActiveTab(tab);
      return;
    }
    setScreen(id);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#030309",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px 20px",
      position: "relative", overflow: "hidden",
      fontFamily: font,
    }}>
      {/* Ambient glow */}
      <div style={{ position: "fixed", width: 450, height: 450, borderRadius: "50%", background: "#00CFFF15", filter: "blur(120px)", top: -120, right: -100, pointerEvents: "none" }} />
      <div style={{ position: "fixed", width: 380, height: 380, borderRadius: "50%", background: "#FF2D7815", filter: "blur(120px)", bottom: -100, left: -80, pointerEvents: "none" }} />
      <div style={{ position: "fixed", width: 280, height: 280, borderRadius: "50%", background: "#B8FF2E10", filter: "blur(100px)", bottom: 100, right: 100, pointerEvents: "none" }} />

      <div style={{ display: "flex", gap: 40, alignItems: "flex-start", zIndex: 1 }}>

        {/* ── Phone mockup ── */}
        <div style={{
          width: 375, height: 790, borderRadius: 46,
          background: "#0D0D1C",
          border: "6px solid #1A1A2E",
          boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 50px 120px rgba(0,0,0,0.85), 0 0 80px rgba(0,207,255,0.07), inset 0 1px 0 rgba(255,255,255,0.04)`,
          display: "flex", flexDirection: "column", overflow: "hidden", position: "relative",
        }}>
          {/* Punch-hole camera */}
          <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 90, height: 24, borderRadius: 99, background: "#000", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#0a0a18" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#0a0a18", border: "1px solid #111125" }} />
          </div>

          <StatusBar />

          {/* Screen */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {renderContent()}
          </div>

          {/* Bottom nav */}
          {showNav && <BottomNav active={activeTab} onSelect={handleTab} />}

          {/* Home indicator */}
          <div style={{ height: 22, background: showNav ? C.surface : C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 100, height: 4, borderRadius: 99, background: "rgba(255,255,255,0.18)" }} />
          </div>
        </div>

        {/* ── Screen navigator panel ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 8 }}>
          <div style={{ fontSize: 9, color: "#363660", fontFamily: font, fontWeight: 800, letterSpacing: 1.5, marginBottom: 6 }}>
            SCREENS
          </div>
          {navItems.map(item => {
            const on = isActive(item.id);
            return (
              <button
                key={item.id}
                onClick={() => gotoNav(item.id)}
                style={{
                  height: 32, padding: "0 14px", borderRadius: 8, cursor: "pointer",
                  background: on ? C.cyan + "20" : "#0F0F1E",
                  border: `1px solid ${on ? C.cyan + "50" : "#1A1A2E"}`,
                  color: on ? C.cyan : "#404060",
                  fontSize: 11, fontWeight: 700, fontFamily: font,
                  textAlign: "left", whiteSpace: "nowrap",
                  transition: "all 0.15s",
                }}
              >
                {item.label}
              </button>
            );
          })}

          {/* Legend */}
          <div style={{ marginTop: 16, padding: "12px", background: "#0F0F1E", borderRadius: 12, border: "1px solid #1A1A2E" }}>
            <div style={{ fontSize: 9, color: "#363660", fontFamily: font, fontWeight: 800, letterSpacing: 1, marginBottom: 8 }}>DESIGN SYSTEM</div>
            {[
              { label: "Primary", color: C.cyan },
              { label: "Secondary", color: C.pink },
              { label: "Accent", color: C.lime },
              { label: "Purple", color: C.purple },
              { label: "Warm", color: C.orange },
            ].map(({ label, color }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <div style={{ width: 14, height: 14, borderRadius: 4, background: color }} />
                <span style={{ fontSize: 10, color: "#404060", fontFamily: font }}>{label}</span>
                <span style={{ fontSize: 9, color: "#2a2a40", fontFamily: font, marginLeft: "auto" }}>{color}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "fixed", bottom: 14, left: "50%", transform: "translateX(-50%)", fontSize: 9, color: "#1e1e38", fontFamily: font, fontWeight: 800, letterSpacing: 2, whiteSpace: "nowrap" }}>
        SKIBIDI MARCIAL · ANDROID APP UI · MATERIAL DESIGN 3 · FLUTTER READY
      </div>
    </div>
  );
}
