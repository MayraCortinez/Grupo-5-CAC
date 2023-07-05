import "./ProductCard.css"
import Swal from 'sweetalert2';

function ProductCard({
  color,
  descripcion,
  detalle,
  img,
  marca,
  modelo,
  precio,
  talle}) {
  
  const handleClick = () => {
    console.log(color)
    Swal.fire({
      title: `${marca} - ${modelo}`,
      text: detalle,
      color: `#FF0000`,
      
    })
  }

  return (
    <div className="my-container" onClick={() => handleClick(
      color,
      descripcion,
      detalle,
      img,
      marca,
      modelo,
      precio,
      talle)}>
      <div className="my-card">
        <div className="my-card-img">
          <img src={ img } alt={modelo} />
        </div>
        <div className="my-card-content">
          <h2 className="my-card-title">{marca}</h2>
          <h2 className="my-card-title">{modelo}</h2>
          <div className="my-card-details">
            <div className="my-size">
              <h3>Size :</h3>
              <span>{talle}</span>
            </div>
            <div className="my-color">
              <h3>Color :</h3>
              <span>{color}</span>
            </div>
            <div className="my-price">
              <h3>${precio}</h3>
            </div>
          </div>
       </div>
      </div>
    </div>
  );
}

export default ProductCard;