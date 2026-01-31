import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function SuccessStories() {
  const stories = [
    {
      names: "Rahul & Priya",
      date: "Married Jan 2023",
      image: "/images/success_story_1.jpg", // Indian couple smiling
      story: "We met through Vivah Matrimony in 2022. I was in Mumbai and she was in Pune. The platform helped us connect and realize we share the same values."
    },
    {
      names: "Amit & Sneha",
      date: "Married Dec 2022",
      image: "/images/success_story_2.jpg", // Couple wedding attire
      story: "Finding a partner who understands your profession is hard. Thanks to the detailed filters, I found Sneha who is also a doctor. Perfect match!"
    },
    {
      names: "Vikram & Anjali",
      date: "Married Nov 2023",
      image: "/images/success_story_3.jpg", // Sangeet ceremony
      story: "Our families met first through the platform. The trust badges gave us confidence to proceed. Today we are happily married."
    }
  ];

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display text-primary mb-6">Happily Ever Afters</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nothing gives us more joy than seeing two souls unite. Here are some of the beautiful stories that started on our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-border group hover:shadow-xl transition-all"
            >
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img 
                  src={story.image} 
                  alt={story.names} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 z-20 text-white">
                  <h3 className="text-2xl font-display font-bold">{story.names}</h3>
                  <p className="text-sm opacity-90 text-secondary">{story.date}</p>
                </div>
              </div>
              <div className="p-8 relative">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10 rotate-180" />
                <p className="text-muted-foreground leading-relaxed italic">
                  "{story.story}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
