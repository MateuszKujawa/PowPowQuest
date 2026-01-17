import { memo } from "react";

const Background = memo(() => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-linear-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e]">
      {/* Static orbs - no animation for performance */}
      <div
        className="absolute w-72 h-72 bg-pink-500/15 rounded-full blur-2xl"
        style={{ top: "10%", left: "-5%" }}
      />
      <div
        className="absolute w-80 h-80 bg-purple-500/10 rounded-full blur-2xl"
        style={{ bottom: "10%", right: "-10%" }}
      />
      <div
        className="absolute w-64 h-64 bg-blue-500/8 rounded-full blur-2xl"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
});

Background.displayName = "Background";

export default Background;
