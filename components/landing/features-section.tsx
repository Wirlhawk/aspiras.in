'use client'

import { Target, Clock, Sparkles } from 'lucide-react'
import FeatureCard from './feature-card'

const features = [
  {
    icon: Target,
    title: 'Set Goals',
    description: 'Create and categorize your aspirations with ease'
  },
  {
    icon: Clock,
    title: 'Track Progress',
    description: 'Monitor your journey with beautiful visual insights'
  },
  {
    icon: Sparkles,
    title: 'Stay Motivated',
    description: 'Celebrate wins and keep the momentum going'
  }
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-head text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Everything You Need
          </h2>
          <p className="font-sans text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, powerful tools to help you achieve your dreams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
