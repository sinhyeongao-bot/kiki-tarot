'use client';

interface QuestionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function QuestionInput({ value, onChange }: QuestionInputProps) {
  return (
    <div className="w-full">
      <label className="block mb-3">
        <span className="text-gold-light/80 font-cinzel text-base tracking-wider">
          你的问题
        </span>
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, 500))}
          placeholder="在这个宁静的时刻，你想要询问什么..."
          className="
            w-full h-24 p-4 rounded-xl
            bg-card-bg/60 border border-gold-primary/10
            text-gray-200 placeholder-gray-600
            font-inter text-sm resize-none
            focus:outline-none focus:border-gold-primary/40 focus:bg-card-bg/80
            transition-all duration-300
          "
        />
        {/* Character counter */}
        <div className="absolute bottom-3 right-3 text-[10px] text-gold-primary/40">
          {value.length}/500
        </div>
      </div>
    </div>
  );
}