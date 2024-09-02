const Carousal = () => {
  const imageHeight = "300px"; // Set a fixed height for all images

  return (
    <div id="carouselExampleIndicators" className="carousel slide">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://pbs.twimg.com/media/CXyHksWUQAAxJrb.jpg"
            className="d-block w-100"
            alt="Slide 1"
            style={{ height: imageHeight, objectFit: "cover" }} // Consistent height
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/14d5f677630559.5c8d3005a7c9c.png"
            className="d-block w-100"
            alt="Slide 2"
            style={{ height: imageHeight, objectFit: "cover" }} // Consistent height
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://i.pinimg.com/736x/b1/dd/8b/b1dd8b234a63c0860846300f44725be3.jpg"
            className="d-block w-100"
            alt="Slide 3"
            style={{ height: imageHeight, objectFit: "cover" }} // Consistent height
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousal;
