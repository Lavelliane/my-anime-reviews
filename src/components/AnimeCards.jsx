import { Card } from 'antd';
function AnimeCards({ image, title, season, onClick }) {

  return (
    <Card
      onClick={onClick}
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <img
          alt="example"
          src={`http://localhost:1337${image}`}
        />
      }
    >
      <p className='font-bold'>{title}</p>
      <p>{season}</p>
    </Card>
  );
}
export default AnimeCards;
