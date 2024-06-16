'use client'
import FeaturedBanner from "@/components/FeaturedBanner"
import { animeSeries } from "@/dummyData/dummy"

const staticDataBanner = {
  imageSource: "anime-covers/frieren.jpg", 
  title: "Frieren: Beyond Journey's End", 
  description: `During their decade-long quest to defeat the Demon King, the members
          of the hero's party—Himmel himself, the priest Heiter, the dwarf
          warrior Eisen, and the elven mage Frieren—forge bonds through
          adventures and battles, creating unforgettable precious memories for
          most of them.`, 
  id: 1,
}

function HomePage() {
  return (
    <div>
        <FeaturedBanner {...staticDataBanner} />
        <p className="text-3xl font-bold mt-8 border-l-royal-purple border-l-8 pl-2">Anime</p>
        <p className="mt-2">Browse your favorite anime</p>
        <div className="flex gap-2 mt-4 justify-between">

        </div>
    </div>
  )
}
export default HomePage