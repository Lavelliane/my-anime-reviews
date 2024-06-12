'use client';

import { animeSeries } from '@/dummyData/dummy';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { StarOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import Review from '@/components/Review';
import { calculateAverageRating } from '@/utils/calculateAverageRating';
import ReviewForm from '@/components/ReviewForm';
function AnimeDetailsPage() {
  const params = useParams();
  const [animeData, setAnimeData] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [onReviewFormOpen, setOnReviewFormOpen] = useState(false)
  useEffect(() => {
    if (params) {
      const anime = animeSeries.find((anime) => anime.id === +params.id);
      if (anime) {
        setAnimeData(anime);
        setAverageRating(calculateAverageRating(anime))
      }
    }
  }, [params]);

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
              src={animeData.image}
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
          <div className="flex">
            {/* DETAILS */}
            <div className="max-w-[394px] w-full">
              <p className="text-lg font-semibold mb-4">Details</p>
              <div className="grid grid-cols-2 mb-4 gap-5 text-sm">
                <p>Episodes</p>
                <p>{animeData.episodes}</p>
              </div>
              <div className="grid grid-cols-2 mb-4 gap-5 text-sm">
                <p>Genre</p>
                <p>{animeData.genre}</p>
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
            <ReviewForm id={animeData.id} closeForm={closeReviewForm} />
          </Modal>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}
export default AnimeDetailsPage;
