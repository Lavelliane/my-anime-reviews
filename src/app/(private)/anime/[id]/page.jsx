'use client';

import { animeSeries } from '@/dummyData/dummy';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { StarOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Tag } from 'antd';
import Review from '@/components/Review';
import { calculateAverageRating } from '@/utils/calculateAverageRating';
import ReviewForm from '@/components/ReviewForm';
import { useLazyQuery } from '@apollo/client';
import { GET_ANIME } from '@/gql/animes/queries';
import transformResponse from '@/utils/transformResponse';
import transformSingleResponse from '@/utils/transformSingleResponse';
function AnimeDetailsPage() {
  const params = useParams();
  const [animeData, setAnimeData] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [onReviewFormOpen, setOnReviewFormOpen] = useState(false)
  const [getAnimeById] = useLazyQuery(GET_ANIME, {
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    handleGetAnime()
  }, [params]);

  const handleGetAnime = () => {
    if (params) {
      getAnimeById({
        variables: {
          id: params.id
        }
      }).then((res) => {
        if(res.data.anime){
          //SET AVERAGE RATING
          setAverageRating(calculateAverageRating(transformSingleResponse(res.data.anime)))
          setAnimeData(transformSingleResponse(res.data.anime))
        }
      }).catch(e => console.error(e))
    }
  }

  const showReviewForm = () => {
    setOnReviewFormOpen(true)
  }
  const closeReviewForm = () => {
    setOnReviewFormOpen(false)
  }
  return (
    <>
      {animeData ? (
        <>
          <div className="flex gap-10 items-center mb-10">
            <img
              src={`http://localhost:1337${animeData.image.url}`}
              alt={animeData.title}
              className="w-[394px] h-auto"
            />
            <div>
              <p className="font-bold text-2xl">{animeData.title}</p>
              <p className="mt-4">
                <StarOutlined className="text-2xl text-star-yellow" />{' '}
                <span className="font-semibold text-xl">{averageRating}</span>
              </p>
              <div className="gap-4 flex mt-8">
                <Button type="primary">Watch</Button>
                <Button>Save</Button>
              </div>
            </div>
          </div>
          <div className="flex gap-8">
            {/* DETAILS */}
            <div className="max-w-[394px] w-full">
              <p className="text-lg font-semibold mb-4">Details</p>
              <div className="grid grid-cols-2 mb-4 gap-5 text-sm">
                <p>Episodes</p>
                <p>{animeData.episodes}</p>
              </div>
              <div className="grid grid-cols-2 mb-4 gap-5 text-sm">
                <p>Genre</p>
                <Tag color="purple" className="w-[50%] text-center">{animeData.genre.split('_').join(' ')}</Tag>
              </div>
              <div className="grid grid-cols-2 mb-4 gap-5 text-sm">
                <p>Season</p>
                <p>{animeData.season}</p>
              </div>
            </div>
            {/* SYNOPSIS */}
            <div>
              <p className="text-lg font-semibold mb-4">Synopsis</p>
              <p>{animeData.synopsis}</p>
            </div>
          </div>
          {/* REVIEWS */}
          <div>
            <p className="text-xl font-bold mt-10">Reviews</p>
            <Button type="primary" className="bg-royal-purple w-[394px] mt-8 mb-8" onClick={() => setOnReviewFormOpen(true)}>Write a Review<PlusOutlined /></Button>
          </div>
          {animeData.reviews.length > 0 && (
            animeData.reviews.map((review, i) => <Review key={i} {...review} />)
          )}
          <Modal open={onReviewFormOpen} onCancel={closeReviewForm} footer={null}>
            <ReviewForm id={animeData.id} closeForm={closeReviewForm} refetch={handleGetAnime} />
          </Modal>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}
export default AnimeDetailsPage;
