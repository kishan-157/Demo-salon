import React, { useState } from 'react';
import { SalonConfig } from '../config/salonConfig';
import { Sparkles, Scissors, Crown, Gem, Flower2, Heart, Star } from 'lucide-react';

interface BrandLogoProps {
  settings: SalonConfig;
  variant?: 'light' | 'dark'; // 'light' = white/bright text (for dark headers/footers), 'dark' = dark text (for light headers)
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  showWordmark?: boolean;
  iconOnly?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  settings,
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
  showWordmark = true,
  iconOnly = false,
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);

  const primaryColor = settings?.theme?.primaryColor || '#9E555A';
  const logoText = settings?.logoText || 'Bella Rose';
  const logoSubtitle = settings?.logoSubtitle || 'Luxury Salon & Spa';
  const logoIcon = settings?.logoIcon || 'monogram';
  const hasCustomImage = Boolean(settings?.logoImage && settings.logoImage.trim().length > 0 && !imageError);

  // Compute initials (up to 2 letters)
  const initials = logoText
    .split(' ')
    .filter(Boolean)
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'BR';

  // Size mappings
  const badgeSizeMap = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-2xl'
  };

  const imageSizeMap = {
    sm: 'h-8 max-w-[120px]',
    md: 'h-10 max-w-[150px]',
    lg: 'h-14 max-w-[200px]',
    xl: 'h-20 max-w-[260px]'
  };

  const textTitleMap = {
    sm: 'text-sm font-bold',
    md: 'text-lg sm:text-xl font-bold',
    lg: 'text-2xl font-bold',
    xl: 'text-3xl font-bold'
  };

  const subtitleSizeMap = {
    sm: 'text-[9px] tracking-wider',
    md: 'text-[10px] tracking-widest',
    lg: 'text-xs tracking-widest',
    xl: 'text-sm tracking-widest'
  };

  // Render Icon inside badge
  const renderIcon = () => {
    const iconSize = size === 'sm' ? 14 : size === 'md' ? 18 : size === 'lg' ? 24 : 34;
    switch (logoIcon) {
      case 'sparkles':
        return <Sparkles size={iconSize} />;
      case 'scissors':
        return <Scissors size={iconSize} />;
      case 'crown':
        return <Crown size={iconSize} />;
      case 'gem':
        return <Gem size={iconSize} />;
      case 'flower':
        return <Flower2 size={iconSize} />;
      case 'heart':
        return <Heart size={iconSize} />;
      case 'star':
        return <Star size={iconSize} />;
      case 'monogram':
      default:
        return <span>{initials}</span>;
    }
  };

  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      {hasCustomImage ? (
        <div className="flex items-center justify-center">
          <img
            src={settings.logoImage}
            alt={logoText}
            className={`${imageSizeMap[size]} object-contain drop-shadow-sm`}
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div
          className={`${badgeSizeMap[size]} rounded-2xl flex items-center justify-center font-serif font-bold shadow-sm transition-transform duration-300 hover:scale-105 shrink-0 border`}
          style={{
            backgroundColor: variant === 'light' ? 'rgba(255, 255, 255, 0.15)' : `${primaryColor}18`,
            borderColor: variant === 'light' ? 'rgba(255, 255, 255, 0.3)' : `${primaryColor}40`,
            color: variant === 'light' ? '#FFFFFF' : primaryColor
          }}
        >
          {renderIcon()}
        </div>
      )}

      {!iconOnly && showWordmark && (
        <div className="flex flex-col text-left">
          <span
            className={`${textTitleMap[size]} font-serif leading-tight tracking-tight`}
            style={{ color: variant === 'light' ? '#FFFFFF' : (settings?.theme?.textColor || '#2D2A29') }}
          >
            {logoText}
          </span>
          {showSubtitle && (
            <span
              className={`block ${subtitleSizeMap[size]} uppercase font-medium mt-0.5`}
              style={{
                color: variant === 'light' ? 'rgba(255, 255, 255, 0.7)' : (primaryColor)
              }}
            >
              {logoSubtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
