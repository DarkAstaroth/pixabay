import React from 'react'

const Imagen = ({imagen}) => {

    // extraer las imagenes

    const {largeImageURL,likes,previewURL,tags,views} = imagen;

    return ( 
        <div className="col-12 col-sm6 col-md-4 col-lg-3 mb-4">
            <dic className="card">
                <img 
                    src={previewURL} 
                    alt={tags}
                    className="card-img-top"
                />
            </dic>
        </div>
     );
}
 
export default Imagen;