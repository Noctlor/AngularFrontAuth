export interface Car {
    _id: string;
    placas: string;
    marca: string;
    color: string;
    posicion: {
      latitud: number;
      longitud: number;
    };
    user: {
      _id: string;
      name: string;

    };
  }