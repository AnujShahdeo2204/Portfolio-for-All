import React from "react";
import { PhotographyData } from "../types";
import { Instagram } from "lucide-react";

interface PhotographyProps {
  photographyData: PhotographyData;
}

export default function Photography({ photographyData }: PhotographyProps) {
  if (!photographyData) return null;

  return (
    <section id="photography" className="relative group scroll-mt-24">
      {/* Decorative vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-border-theme/40 md:left-8"></div>
      
      <div className="pl-12 md:pl-24">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-theme">
              {photographyData.title}
            </h2>
            {photographyData.instagramUrl && (
              <a 
                href={photographyData.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-variant hover:text-secondary-theme transition-colors p-2 bg-surface-theme rounded-full border border-border-theme hover:border-secondary-theme/50"
                title="View on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            )}
          </div>
          <p className="text-text-variant text-base md:text-lg max-w-2xl leading-relaxed">
            {photographyData.description}
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {photographyData.photos.map((photo, idx) => (
            <div 
              key={photo.id || idx} 
              className="group/photo relative aspect-square overflow-hidden bg-surface-theme border border-border-theme/50 hover:border-secondary-theme/30 transition-all duration-500 rounded-lg"
            >
              <img 
                src={photo.url} 
                alt={photo.caption || "Photography shot"} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover/photo:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <p className="text-white text-center text-sm font-medium opacity-0 translate-y-4 group-hover/photo:opacity-100 group-hover/photo:translate-y-0 transition-all duration-300 delay-100">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
