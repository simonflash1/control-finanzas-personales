
import { useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";

interface AdBannerProps {
  adSlot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

const AdBanner = ({ adSlot, format = 'auto', className = '' }: AdBannerProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only run this in production environment
    if (process.env.NODE_ENV === 'production' && adContainerRef.current) {
      try {
        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
        
        console.log('Ad request sent for slot:', adSlot);
      } catch (error) {
        console.error('Error loading AdSense ad:', error);
      }
    }
  }, [adSlot]);

  if (process.env.NODE_ENV !== 'production') {
    return (
      <Card className={`flex items-center justify-center bg-muted/20 ${className}`} style={{ minHeight: '90px' }}>
        <div className="text-xs text-muted-foreground p-2 text-center">
          Ad Space ({adSlot})
          <br />
          <span className="text-[10px]">Only visible in production</span>
        </div>
      </Card>
    );
  }

  return (
    <div ref={adContainerRef} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={import.meta.env.VITE_ADSENSE_PUBLISHER_ID || "ca-pub-XXXXXXXXXXXXXXXX"} // Use env var with fallback
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;
