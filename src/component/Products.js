import React, { useEffect, useState } from 'react';
import styledcomponents from 'styled-components';
import { styled } from '@mui/material/styles';
import { useHistory } from "react-router";
import Pagination from '@mui/material/Pagination';
import Grow from "@mui/material/Grow";
import Box from '@mui/material/Box';
import Layout from './Layout';
import Filter from './Filter';
import { getProducts, searchKeyword } from "../product";
import ProductCard from './ProductCard';


const Element = ({ className, match, location }) => {
    const [products, setProducts] = useState([])
    const [selectPage, setSelectPage] = useState(1)
    const [count, setCount] = useState(0)
    const [filterArr, setFilterArr] = useState([])
    // const [pageNum, setPageNum] = useState(0)
    const history = useHistory();

    const categoryId = match.params.categoryId || ""
    const keyword = (location && location.state && location.state.keyword) || "all"

    const handleChange = (e, page) => {
        // setSelectPage(page)
        // setProducts(products.slice((page - 1) * 24, 24 * page))
        searchKeyword(keyword)
            .then(data => {
                if (data) {
                    setCount(Math.ceil(data.length / 24))
                    setProducts(data.filter(item => item.category === categoryId).slice((page - 1) * 24, 24 * page))
                    window.scrollTo(0, 0);
                }
            })
    }

    useEffect(() => {
        if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
            console.info("This page is reloaded");
            history.push({
                state: {
                    keyword: "all"
                }
            })

        }
        searchKeyword(keyword)
            .then(data => {
                if (data) {
                    setCount(Math.ceil(data.length / 24))
                    setProducts(data.filter(item => item.category === categoryId).slice((selectPage - 1) * 24, 24 * selectPage))
                }
            })
        // getProducts()
        //     .then(data => {
        //         if (data) {
        //             setProducts(data)
        //         }
        //     })
    }, [keyword])
    return (
        <Layout>
            <div className={className}>
                <div className="prod-content">
                    {/* 
                    <nav class="breadcrumb">
                        <a class="breadcrumb-item" href="#">??????</a>
                        <a class="breadcrumb-item" href="#">???????????????</a>
                        <a class="breadcrumb-item active" href="#">?????????</a>
                    </nav> */}
                    {/* <SplitButton /> */}
                    {keyword !== "all" ? <h5>????????????"{keyword}"</h5> : null}
                    <div class="dropdown-box">
                        {/* <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle dropdown-btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                ????????????
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item" href="#">?????????</a></li>
                                <li><a class="dropdown-item" href="#">?????????</a></li>
                            </ul>
                        </div>
                        <button class="btn btn-secondary dropdown-btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            ????????????
                        </button> */}
                    </div>

                    <div className="row">
                        {products && products.map(product => (
                            <div className="col-6 col-lg-3 mt-3">
                                <ProductCard product={product} editable={false} link={true} />
                            </div>
                        ))}
                        {/* {products && products.map(item => (
                            <a className="col-6 col-lg-3 mt-3" href={`/product/${item.id}`} style={{ textDecoration: "none", color: "#000" }}>
                                <div className="card">
                                    <img src="https://cf.shopee.tw/file/b5772fc8fe61728bd8afd0b135c54cf3_tn" className="card-img-top card-img-size"
                                        alt="..." />
                                    <div class="card-body" style={{ fontSize: "1.2rem" }}>
                                        <h3 class="card-title">{item.name.slice(0, 10)}</h3>
                                        <p class="card-text">{item.description.slice(0, 10)}</p>
                                        <p class="card-text">${item.price}</p>
                                        <p class="card-text">?????????{item.stock}</p>
                                    </div>
                                </div>
                            </a>
                        ))} */}
                    </div>
                    <br />
                    <br />
                    <Grow in={true}>
                        <Pagination sx={{ justifyContent: "center" }} count={count} showFirstButton showLastButton onChange={handleChange} />
                    </Grow>
                </div>
            </div>
            <Filter categoryId={categoryId} setFilterArr={setFilterArr} />
        </Layout >
    )
}
const Products = styledcomponents(Element)`
.prod-content{
    width: 66.666667%;
    margin: 0 auto;
    margin-top:20px;
}
.card:hover {
  -webkit-transform: translateY(-5px);
    -ms-transform: translateY(-5px);
    transform: translateY(-5px);
    -webkit-box-shadow: 0 6px 16px rgba(0,0,0,0.12);
    box-shadow: 0 6px 16px rgba(0,0,0,0.12);
}
.card-style{
    height: 350px;
}

.card-content{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
.price-div{
    position: absolute;
    bottom:5px;
}
.card-position{
    position: relative;
}
.card-img-size{
    height: 200px;
}
.dropdown-box{
    background-color: rgb(221, 208, 216);
    height: 50px;
    display: flex;
    justify-content: start;
}
.dropdown-btn{
    margin: 5px auto auto 5px;
}

.price-div{
    position: absolute;
    bottom:5px;
    color: black;
}
.a-style{
    text-decoration: none;
}
.css-wjh20t-MuiPagination-ul{
    justify-content: center;
}
`

export default Products;