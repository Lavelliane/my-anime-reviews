'use client'
import AnimeCards from "@/components/AnimeCards"
import FeaturedBanner from "@/components/FeaturedBanner"
import { animeSeries } from "@/dummyData/dummy"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import transformResponse from "@/utils/transformResponse"
import { Spin } from "antd"
import { GET_ANIMES } from "@/gql/animes/queries"

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
  const router = useRouter()
  const routeToDetails = (id) => {
    router.push(`anime/${id}`)
  }
  const { data: animesData, loading: isAnimesLoading } = useQuery(GET_ANIMES)

  return (
    <div>
        <Spin spinning={isAnimesLoading}>
          <FeaturedBanner {...staticDataBanner} />
          <p className="text-3xl font-bold mt-8 border-l-royal-purple border-l-8 pl-2">Anime</p>
          <p className="mt-2">Browse your favorite anime</p>
          <div className="flex gap-2 mt-4 justify-between">
            {animesData && !isAnimesLoading && transformResponse(animesData).animes.map((anime) => (
              <AnimeCards image={anime.image.url} key={anime.id} title={anime.title} season={anime.season} onClick={() => routeToDetails(anime.id)}/>
            ))}
          </div>
        </Spin>
    </div>
  )
}
export default HomePage