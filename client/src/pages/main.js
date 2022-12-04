import "./style.css"
import {API_URL} from "../config";
import React, {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import EachProduct from "../pages/EachProduct";
import EachCustomer from "./EachCustomer";


export const Main = () => {
    const [products, setProducts] = useState([])
    const [customers, setCustomers] = useState([])
    const [pages1, setPages1] = useState(0)
    const [pages2, setPages2] = useState(0)
    const [searchParams1, setSearchParams1] = useSearchParams();
    const [searchParams2, setSearchParams2] = useSearchParams();
    const fetchData1 = async () => {
        const page = searchParams1.get("page") ? "&page=" + searchParams1.get("page") : '';
        try {
            const proRes = await fetch(`${API_URL}/products?sort=-id&size=6${page}`);
            const proJson = await proRes.json();
            setProducts(proJson.data.items);
            setPages1(proJson.data.total_pages)
        } catch (error) {
            console.log("error", error);
        }
    };
    const fetchData2 = async () => {
        const page = searchParams2.get("page") ? "&page=" + searchParams2.get("page") : '';
        try {
            const cusRes = await fetch(`${API_URL}/customers?sort=-id&size=3${page}`);
            const cusJson = await cusRes.json();
            setCustomers(cusJson.data.items);
            setPages2(cusJson.data.total_pages)
        } catch (error) {
            console.log("error", error);
        }
    };
    useEffect(() => {
        fetchData1();
    }, [searchParams1]);
    useEffect(() => {
        fetchData2();
    }, [searchParams2]);

    let myPage1 = searchParams1.get("page") ? searchParams1.get("page") : 0;
    let myPage2 = searchParams2.get("page") ? searchParams2.get("page") : 0;


    return (
        <>
            <nav className="navbar">
                <div className="navbar-container container">
                    <input type="checkbox" name="" id=""/>
                    <div className="hamburger-lines">
                        <span className="line line1"></span>
                        <span className="line line2"></span>
                        <span className="line line3"></span>
                    </div>
                    <ul className="menu-items">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#food">Category</a></li>
                        <li><a href="#food-menu">Menu</a></li>
                        <li><a href="#testimonials">Testimonial</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                    <h1 className="logo">
                        <img style={{borderRadius:50}} height={40} width={40} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbjJV3geAjUHFrHzgDSdb28kJ_elDyznzlew&usqp=CAU"}/>
                    </h1>
                </div>
            </nav>
            <section className="showcase-area" id="showcase">
                <div className="showcase-container">
                    <h1 className="main-title" id="home">Mazzali Taomlar</h1>
                    <h4 className="main-title1">Sog'lom ovqatlaning, bu sog'liq uchun foydalidir.</h4>
                    <a href="#food-menu" className="btn btn-primary">Menu</a>
                </div>
            </section>

            <section id="about">
                <div className="about-wrapper container">
                    <div className="about-text">
                        <p className="small">Biz Haqimizda</p>
                        <h2>Biz 10 yildan beri sog'lom taom tayyorlab kelmoqdamiz</h2>
                        <p>
                            Biz 10 yildan beri sog'lom taom tayyorlab kelmoqdamiz va
                            bundan barcha mijozlarimiz xursand. Ular har kelganida maqtab ketishadi.
                            Taomlarimiz shirinligidan tuy va marosimlarga ham bizga zakaz qilishadi.
                            Barcha uchun biz maromda ishlab kelamiz. Bizda taomlar turi ham ko'p va
                            ular juda shirin.
                        </p>
                    </div>
                    <div className="about-img">
                        <img src="https://www.gastronom.ru/binfiles/images/20150318/b4c3858a.jpg" alt="food"/>
                    </div>
                </div>
            </section>
            <section id="food">
                <h2>MAHSULOT TURLARI</h2>
                <div className="food-container container">
                    <div className="food-type fruite">
                        <div className="img-container">
                            <img src="https://i.postimg.cc/yxThVPXk/food1.jpg" alt="error"/>
                            <div className="img-content">
                                <h3>fruite</h3>
                                <a href="https://en.wikipedia.org/wiki/Fruit" className="btn btn-primary"
                                   target="blank">learn
                                    more</a>
                            </div>
                        </div>
                    </div>
                    <div className="food-type vegetable">
                        <div className="img-container">
                            <img src="https://i.postimg.cc/Nffm6Rkk/food2.jpg" alt="error"/>
                            <div className="img-content">
                                <h3>vegetable</h3>
                                <a href="https://en.wikipedia.org/wiki/Vegetable" className="btn btn-primary"
                                   target="blank">learn
                                    more</a>
                            </div>
                        </div>
                    </div>
                    <div className="food-type grin">
                        <div className="img-container">
                            <img src="https://i.postimg.cc/76ZwsPsd/food3.jpg" alt="error"/>
                            <div className="img-content">
                                <h3>grin</h3>
                                <a href="https://en.wikipedia.org/wiki/Grain" className="btn btn-primary"
                                   target="blank">learn
                                    more</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="food-menu">
                <h2 className="food-menu-heading">Siz qaysi taomni tanlaysiz?</h2>

                    <div className="">
                        <div className="flex justify-center">
                            <div className="lg:w-1/3 w-full" style={{width: 850}}>
                                <div className="p-10" style={{width: 850}}>
                                    <div className="d-flex" style={{display: "flex",width: 850, flexWrap: "wrap"}}>
                                        {products.length > 0 ? products.map((product, key) => <EachProduct key={key} product={product}
                                                                                                           fetchData={fetchData1}/>) : ''}
                                    </div>

                                    <div className="mt-10">
                                        {Array.from({length: pages1}, (_, index) => index + 1).map((pg, key) =>
                                            <Link
                                                className={`border px-3 py-1 mr-3 ${myPage1 === key ? 'bg-purple-600 text-purple-100' : ''}`}
                                                to={`?page=${key}`} key={key}>{key + 1}</Link>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
            <section id="testimonials">
                <h2 className="testimonial-title">Bizning mijozlarimiz nima deyishadi</h2>
                <div className="testimonial-container container">
                    <div className="testimonial-box">
                        <div className="">
                            <div className="flex justify-center">
                                <div >
                                    <div className="p-10">
                                        <div className="" style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around", width: 1100}}>
                                            {customers.length > 0 ? customers.map((customer, key) => <EachCustomer key={key} customer={customer}
                                                                                                               fetchData={fetchData2}/>) : ''}
                                        </div>

                                        <div className="mt-10">
                                            {Array.from({length: pages2}, (_, index) => index + 1).map((pg, key) =>
                                                <Link
                                                    className={`border px-3 py-1 mr-3 ${myPage2 === key ? 'bg-purple-600 text-purple-100' : ''}`}
                                                    to={`?page=${key}`} key={key}>{key + 1}</Link>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="contact">
                <div className="contact-container container">
                    <div className="contact-img">
                        <img src="https://i.postimg.cc/1XvYM67V/restraunt2.jpg" alt=""/>
                    </div>

                    <div className="form-container">
                        <h2>Bizning Kontakt</h2>
                        <input type="text" placeholder="Sizning ismingiz"/>
                        <input type="email" placeholder="emailingiz"/>
                        <textarea cols="30" rows="6" placeholder="Xabaringizni yozing"></textarea>
                        <a href="#" className="btn btn-primary">Yuborish</a>
                    </div>
                </div>
            </section>
            <footer id="footer">
                <h2>Restoran &copy; Barcha huquqlar himoyalangan</h2>
            </footer>
        </>
    )
}