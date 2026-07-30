import "./ItemList.css";

function ItemList({ items = [] }) {

    return (

        <div className="item-list">

            <h2>Purchased Items</h2>

            {items.length === 0 ? (

                <p>No items detected.</p>

            ) : (

                <table>

                    <thead>

                        <tr>

                            <th>Item</th>

                            <th>Quantity</th>

                            <th>Price</th>

                        </tr>

                    </thead>

                    <tbody>

                        {items.map((item,index)=>(

                            <tr key={index}>

                                <td>{item.name}</td>

                                <td>{item.quantity}</td>

                                <td>${item.price}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>

    );

}

export default ItemList;