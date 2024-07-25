import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import axios from "axios";

export function Fakestore() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([{ id: 0, title: '', description: '', price: 0, image: '', category: '', rating: { rate: 0, count: 0 } }]);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [toggleTable, setToggleTable] = useState({ display: 'none' });

    function LoadCategories() {
        axios.get("http://fakestoreapi.com/products/categories")
            .then(response => {
                response.data.unshift("all");
                setCategories(response.data);
            })
    }

    function LoadProducts(url) {
        axios.get(url)
            .then(response => {
                setProducts(response.data);
            })
    }

    useEffect(() => {
        LoadCategories();
        LoadProducts("http://fakestoreapi.com/products");
    }, []);

    function handleCategoryChange(e) {
        if (e.target.value === "all") {
            LoadProducts("http://fakestoreapi.com/products");
        } else {
            LoadProducts(`http://fakestoreapi.com/products/category/${e.target.value}`);
        }
    }

    function handleAddClick(e) {
        axios.get(`http://fakestoreapi.com/products/${e.target.name}`)
            .then(response => {
                setCartItems([...cartItems, response.data]);
                alert(`${response.data.title}\nAdded To Cart`);
                setCartCount(cartItems.length + 1);
            })
    }

    function handleCartClick() {
        setToggleTable({ display: (toggleTable.display === "none") ? "block" : "none" });
    }

    return (
        <div className="container-fluid">
            <header className="d-flex bg-dark text-white justify-content-between p-3">
                <div className="h3">Fakestore.</div>
                <div className="fs-4">
                    <span className="me-4"><a className="text-white">Home</a></span>
                    <span className="me-4"><a className="text-white">Jewelery</a></span>
                    <span className="me-4"><a className="text-white">Electronics</a></span>
                </div>
                <div className="fs-4">
                    <button onClick={handleCartClick} className="btn btn-light bi bi-cart4 position-relative">
                        <span className="badge position-absolute rounded rounded-circle bg-danger text-white">{cartCount}</span>
                    </button>
                </div>
            </header>
            <section className="mt-3 row">
                <nav className="col-2">
                    <div className="mt-4">
                        <label className="fw-bold form-label">Select Category</label>
                        <div>
                            <select onChange={handleCategoryChange} className="form-select">
                                {categories.map(category =>
                                    <option value={category} key={category}> {category.toUpperCase()} </option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div>
                        <table style={toggleTable} className="table table-hover caption-top">
                            <caption>Your Cart Items</caption>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Preview</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item =>
                                    <tr key={item.id}>
                                        <td>{item.title}</td>
                                        <td>{item.price}</td>
                                        <td><img width="50" src={item.image} height="50" alt={item.title} /></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </nav>
                <main className="col-10 overflow-auto" style={{ height: '500px', display: 'flex', flexWrap: 'wrap' }}>
                    {products.map(product =>
                        <div className="card p-2 m-2" key={product.id} style={{ width: '200px' }}>
                            <img src={product.image} className="card-img-top" height="120" alt={product.title} />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">Price: {product.price}</p>
                                <p className="card-text">Rating: {product.rating.rate} <span className="bi bi-star-fill text-success"></span></p>
                                <button name={product.id} onClick={handleAddClick} className="btn btn-dark w-100 bi bi-cart3"> Add to Cart</button>
                            </div>
                        </div>
                    )}
                </main>
            </section>
        </div>
    )
}
