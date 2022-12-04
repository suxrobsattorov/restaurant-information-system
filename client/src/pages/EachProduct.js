export default function EachProduct({product}) {

    return (
        <div className="bg-slate-100 rounded-lg mb-4 p-4 hover:border hover:border-purple-700"
             style={{width: 390, marginRight: 10}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{maxWidth: 213}}>
                    <div className="font-medium">
                        <h2 style={{fontSize: 30, color: 'blue'}}>{product.name}</h2>
                    </div>
                    <span className="fa fa-star checked">
                            <h4 style={{fontSize: 20, color: 'green'}}>Price : {product.price} SO'M</h4>
                        </span>
                    <div className="text-slate-400">{product.description}</div>
                </div>
                <div>
                    <img
                        className="food-img"
                        src="https://st.depositphotos.com/1732591/2725/v/950/depositphotos_27257559-stock-illustration-crossed-fork-and-spoon-food.jpg"
                        alt=""/>
                </div>
            </div>
        </div>
    )
}
