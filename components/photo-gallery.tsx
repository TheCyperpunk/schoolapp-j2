"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const galleryImages = [
  { id: 1, src: "/placeholder.svg?height=400&width=600", category: "events", alt: "Annual Day Performance" },
  { id: 2, src: "/placeholder.svg?height=400&width=600", category: "classrooms", alt: "Colorful Classroom" },
  { id: 3, src: "/placeholder.svg?height=400&width=600", category: "sports", alt: "Sports Day Activities" },
  { id: 4, src: "/placeholder.svg?height=400&width=600", category: "celebrations", alt: "Birthday Celebration" },
  { id: 5, src: "/placeholder.svg?height=400&width=600", category: "events", alt: "Science Exhibition" },
  { id: 6, src: "/placeholder.svg?height=400&width=600", category: "classrooms", alt: "Art Corner" },
  { id: 7, src: "/placeholder.svg?height=400&width=600", category: "sports", alt: "Playground Fun" },
  { id: 8, src: "/placeholder.svg?height=400&width=600", category: "celebrations", alt: "Festival Celebration" },
  { id: 9, src: "/placeholder.svg?height=400&width=600", category: "events", alt: "Parent-Teacher Meeting" },
  { id: 10, src: "/placeholder.svg?height=400&width=600", category: "classrooms", alt: "Reading Corner" },
  { id: 11, src: "/placeholder.svg?height=400&width=600", category: "sports", alt: "Yoga Session" },
  { id: 12, src: "/placeholder.svg?height=400&width=600", category: "celebrations", alt: "Graduation Day" },
]

const categories = ["all", "events", "classrooms", "sports", "celebrations"]

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredImages =
    selectedCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return

    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedImage(filteredImages[newIndex].id)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Photo Gallery</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Capturing precious moments and memories at Little Scholars
          </p>
        </motion.div>

        {/* Filter Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`capitalize ${
                selectedCategory === category ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "hover:bg-yellow-50"
              }`}
            >
              {category === "all" ? "All Photos" : category}
            </Button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
                onClick={() => openLightbox(image.id)}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    View Image
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredImages.find((img) => img.id === selectedImage)?.src || "/placeholder.svg"}
                  alt={filteredImages.find((img) => img.id === selectedImage)?.alt}
                  className="max-w-full max-h-full object-contain"
                />

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-white hover:bg-white/20"
                  onClick={closeLightbox}
                >
                  <X className="w-6 h-6" />
                </Button>

                {/* Navigation Arrows */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={() => navigateImage("prev")}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={() => navigateImage("next")}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
