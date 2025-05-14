const misProductos = [
    {id: 1, nombre: "Yerba", precio: 500, descripcion: "Yerba mate al peso", imagen: "/images/Yerba.jpg", idCat: "Almacen", stock: 5},
    {id: 2, nombre: "Fideos", precio: 200, descripcion: "Fideos de trigo", imagen: "/images/Fideos.png", idCat: "Almacen", stock: 10},
    {id: 3, nombre: "Leche", precio: 150, descripcion: "Leche entera", imagen: "/images/Leche.jpg", idCat: "Lacteos", stock: 2},
    {id: 4, nombre: "Yogurt", precio: 100, descripcion: "Yogurt natural", imagen: "/images/Yogurt.png", idCat: "Lacteos", stock: 5}
];

export const getProductos = () => {
    return new Promise ((resolve)=> {
        setTimeout(()=>{
            resolve(misProductos)
        }, 1000)
    })
}

export const getUnProducto = (id) => {
    return new Promise ((resolve)=> {
        setTimeout(()=>{
            const producto = misProductos.find(item => item.id === id)
            resolve(producto)
        }, 1000)
    })
}

export const getProductoPorCategorias = (idCategoria) => {
    return new Promise ((resolve)=> {
        setTimeout(()=>{
            const productosPorCategoria = misProductos.filter(item => item.idCat === idCategoria)
            resolve(productosPorCategoria)
        }, 1000)
    })
}