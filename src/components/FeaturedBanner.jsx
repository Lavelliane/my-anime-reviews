import { Button } from 'antd'

function FeaturedBanner({ imageSource, title, description, id }) {
  return (
    <div className={`relative w-full h-[582px] bg-cover bg-center rounded-md flex items-end`}>
       <img src={imageSource} alt="Background" className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="absolute inset-0 bg-black opacity-30 rounded-md"></div>
      <div className="text-white mb-8 ml-8 w-[40%] relative z-10">
        <p className="font-bold text-3xl mb-4">{title}</p>
        <p className='mb-4'>
          {description}
        </p>
        <div className="flex gap-4 relative">
          <Button type="primary">Learn More</Button>
          <Button>Watch</Button>
        </div>
      </div>
    </div>
  )
}
export default FeaturedBanner
