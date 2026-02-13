'use client'

import Star9 from '@/components/stars/s9'

interface FloatingStarProps {
  size?: number
  color?: string
  className?: string
  animationClass?: 'animate-float' | 'animate-float-delayed' | 'animate-float-slow'
}

export default function FloatingStar({ 
  size = 50, 
  color = '#ffda5c', 
  className = '',
  animationClass = 'animate-float'
}: FloatingStarProps) {
  return (
    <div className={`${animationClass} ${className}`}>
      <Star9 
        size={size} 
        color={color} 
        stroke="#080808" 
        strokeWidth={2}
      />
    </div>
  )
}
