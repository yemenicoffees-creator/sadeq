import React, { useRef } from 'react';
import { Upload, Image as ImageIcon, Check } from 'lucide-react';

interface ImagePickerInputProps {
  label: string;
  value: string;
  onChange: (newUrl: string) => void;
  helperText?: string;
}

const STOCK_ASSETS = [
  { name: 'شعار الشركة الرسمي', url: '/assets/aistudio/Yemen_Coffee_logo______________2__3d5596d3.png' },
  { name: 'بن خولاني راوية 5 كجم', url: '/assets/aistudio/_______________a9779794.png' },
  { name: 'بن هرري راوية 5 كجم', url: '/assets/aistudio/______db8288c6.png' },
  { name: 'بن لُقمَتي راوية 5 كجم', url: '/assets/aistudio/5___b1c66e57.png' },
  { name: 'قهوة خضراء AAA هندي 10 كجم', url: '/assets/aistudio/_____________67dcf376.png' },
  { name: 'قهوة خضراء AA هندي 10 كجم', url: '/assets/aistudio/_____bacfc940.png' },
  { name: 'قهوة خضراء A هندي 10 كجم', url: '/assets/aistudio/____1520dc48.png' },
  { name: 'قرنفل إندونيسي راوية 10 كجم', url: '/assets/aistudio/______4578d008.png' },
  { name: 'قرنفل سريلانكي راوية 10 كجم', url: '/assets/aistudio/_______15a407f5.png' },
  { name: 'خلفية تحميص وحبوب القهوة', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1600&q=80' },
  { name: 'مزارع ومحاصيل البن الخضراء', url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80' },
  { name: 'هيل أخضر طبيعي', url: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80' },
  { name: 'زعفران أحمر سوبر نقيل', url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80' },
  { name: 'توابل وبهارات طبيعية', url: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80' },
  { name: 'مكسرات تجارية فاخرة', url: 'https://images.unsplash.com/photo-1543208541-00429edb185e?auto=format&fit=crop&w=800&q=80' },
];

export const ImagePickerInput: React.FC<ImagePickerInputProps> = ({
  label,
  value,
  onChange,
  helperText,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert file to Base64 Data URL for instant preview and LocalStorage persistence
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2 text-start">
      <label className="block text-xs font-bold text-gray-700">
        {label}
      </label>

      {/* Main input and Preview Row */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Preview Box */}
        <div className="w-16 h-16 rounded-xl border-2 border-dashed border-[#C49A55]/50 bg-gray-50 flex items-center justify-center p-1 overflow-hidden shrink-0 shadow-sm relative group">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-contain" />
          ) : (
            <ImageIcon className="w-6 h-6 text-gray-400" />
          )}
        </div>

        {/* Input & Buttons */}
        <div className="flex-1 w-full space-y-2">
          <input
            type="text"
            dir="ltr"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="أدخل رابط الصورة أو اختر من المعرض أو ارفع ملفًا"
            className="w-full p-2 text-xs border border-gray-300 rounded-lg text-start focus:ring-2 focus:ring-[#C49A55] focus:outline-none bg-white"
          />

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 rounded bg-[#38251D] hover:bg-[#C49A55] text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>رفع صورة من جهازك</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            <span className="text-[11px] text-gray-400">أو اختر من صور الشركة أدناه:</span>
          </div>
        </div>
      </div>

      {helperText && (
        <p className="text-[10px] text-gray-500">{helperText}</p>
      )}

      {/* Quick Gallery Picker Chips */}
      <div className="pt-1 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1.5 bg-gray-50 rounded-lg border border-gray-200">
        {STOCK_ASSETS.map((asset, i) => {
          const isSelected = value === asset.url;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange(asset.url)}
              className={`px-2 py-1 rounded text-[10px] font-medium transition-all flex items-center gap-1 border ${
                isSelected
                  ? 'bg-[#C49A55] text-white border-[#C49A55] font-bold shadow-sm'
                  : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
              }`}
            >
              {isSelected && <Check className="w-2.5 h-2.5" />}
              <span>{asset.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
