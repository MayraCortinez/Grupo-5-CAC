import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { PrivateProvider } from '../../context/PrivateProvider';

const CreateProduct = () => {
  const {
    marca,
    setMarca,
    modelo,
    setModelo,
    color,
    setColor,
    precio,
    setPrecio,
    talle,
    setTalle,
    detalle,
    setDetalle,
    descripcion,
    setDescripcion,
    id,
    setId,
    img,
    setImg,
    previewImg,
    setPreviewImg,
    newProduct,
    fileHandler,
  } = useContext(PrivateContext);

  return (
    <div>
      <form onSubmit={newProduct} className="mt-5">
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="Marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
          <label htmlFor="floatingInputCustom">Marca</label>
        </Form.Floating>
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="Modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />
          <label htmlFor="floatingInputCustom">Modelo</label>
        </Form.Floating>
        <Form.Floating className="mb-3">
          <Form.Control
            type="text"
            id="exampleColorInput"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <label htmlFor="floatingInputCustom">Color</label>
        </Form.Floating>
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingInputCustom"
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          <label htmlFor="floatingInputCustom">Precio</label>
        </Form.Floating>
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingInputCustom"
            type="number"
            placeholder="Talle"
            value={talle}
            onChange={(e) => setTalle(e.target.value)}
          />
          <label htmlFor="floatingInputCustom">Talle</label>
        </Form.Floating>
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="Detalle"
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
          />
          <label htmlFor="floatingInputCustom">Detalle</label>
        </Form.Floating>
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <label htmlFor="floatingInputCustom">Descripción</label>
        </Form.Floating>
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingInputCustom"
            type="number"
            placeholder="id"
            value={id}
            onChange={(e) => setId(parseInt(e.target.value))}
          />
          <label htmlFor="floatingInputCustom">Id</label>
        </Form.Floating>
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingInputCustom"
            type="file"
            placeholder="Imágen"
            onChange={fileHandler}
          />
          <label htmlFor="floatingInputCustom">Imágen</label>
        </Form.Floating>
        {/* Vista previa de la imagen */}
        {previewImg && (
          <div className="mb-3 ">
            <img
              className="rounded rounded-lg"
              src={previewImg}
              alt="Vista previa"
              style={{ maxWidth: '200px' }}
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary mt-3">
          Agregar
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
