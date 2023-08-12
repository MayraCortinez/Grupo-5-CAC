import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
  return (
    <div style={{height: "550px"}} className='d-flex align-items-center justify-content-center'>
    <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  );
}

export default LoadingSpinner;