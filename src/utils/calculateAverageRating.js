export function calculateAverageRating(anime) {
    const reviews = anime.reviews;
    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
}