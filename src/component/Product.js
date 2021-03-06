import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import TextareaAutosize from '@mui/material/TextareaAutosize';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import styledComponent from 'styled-components'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Layout from '../sample/Layout';
import Comment from './Comment';
import { addItem, itemTotal } from './cartHelpers';
import { getProduct, getSpecs } from '../product';

const labels = {
    0.5: '0.5',
    1: '1',
    1.5: '1.5',
    2: '2',
    2.5: '2.5',
    3: '3',
    3.5: '3.5',
    4: '4',
    4.5: '4.5',
    5: '5',
    6: "6",
};

const category = {
    0: "女生衣著",
    1: "男生衣著",
    2: "運動/健",
    3: "男女鞋",
    4: "電腦週邊",
    5: "美妝保養",
    6: "服飾飾品",
    7: "手機相機",
    8: "家電影音",
    9: "居家生活",
    10: "寵物",
    11: "戶外/旅行",
    12: "書籍"
}

const Element = ({ className, match }) => {
    const [redirect, setRedirect] = useState(false)
    const [product, setProduct] = useState({})
    const [star, setStar] = useState(2)
    const [values, setValues] = useState({});
    const [specs, setSpecs] = useState([])

    const { num } = values;
    const productId = match.params.productId
    const addIntoCart = () => {
        const number = parseInt(num)
        addItem({
            ...product,
            num: number
        }, () => { //數量,規格
            setRedirect(true)
        })
    }

    const handleButton = () => {

    }

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/" />
        }
    }

    const handleClick = (event) => {
        event.preventDefault();
    }

    useEffect(() => {
        getProduct(productId)
            .then(data => {
                console.log(data.category);
                // switch (data.category) {
                //     case "0": data.category = '女生衣著'; break;
                //     case "1": data.category = '男生衣著'; break;
                //     case "2": data.category = '運動/健身'; break;
                //     case "3": data.category = '男女鞋'; break;
                //     case "4": data.category = '電腦週邊'; break;
                //     case "5": data.category = '美妝保養'; break;
                //     case "6": data.category = '服飾飾品'; break;
                //     case "7": data.category = '手機相機'; break;
                //     case "8": data.category = '家電影音'; break;
                //     case "9": data.category = '居家生活'; break;
                //     case "10": data.category = '寵物'; break;
                //     case "11": data.category = '戶外/旅行'; break;
                //     case "12": data.category = '書籍'; break;
                // }
                setProduct(data)
                console.log(data)
            })
        getSpecs(productId)
            .then(data1 => {
                setSpecs(data1)
                console.log(data1)
            })
    }, [])
    console.log(product)

    return (
        <Layout>
            {shouldRedirect(redirect)}
            <div className={className}>
                <div className="content">
                    <div role="presentation" onClick={handleClick}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" to="/">
                                首頁
                            </Link>
                            <Link
                                underline="hover"
                                color="inherit"
                                to={`/products/${product.category}`}
                            >
                                {category[product.category]}
                            </Link>
                            <Typography color="text.primary">{product.name}</Typography>
                        </Breadcrumbs>
                    </div>
                    <br />
                    <Paper elevation={3} >

                        <div className="info">
                            <div id="carouselExampleIndicators" className="carousel slide slide-500" data-bs-ride="carousel">
                                <div className="carousel-indicators">
                                    <button type="button slide-indicator" data-bs-target="#carouselExampleIndicators"
                                        data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button slide-indicator" data-bs-target="#carouselExampleIndicators"
                                        data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button slide-indicator" data-bs-target="#carouselExampleIndicators"
                                        data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src="https://7ego.7-11.com.tw/Files/market/106354/image/MAI_214356379_X700X700.jpg"
                                            className="d-block w-100 productImg" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://7ego.7-11.com.tw/Files/market/106354/image/MAI_214356379_X700X700.jpg"
                                            className="d-block w-100 productImg" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://7ego.7-11.com.tw/Files/market/106354/image/MAI_214356379_X700X700.jpg"
                                            className="d-block w-100 productImg" alt="..." />
                                    </div>
                                </div>
                                <button className="carousel-control-prev slide-indicator" type="button"
                                    data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next slide-indicator" type="button"
                                    data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                            <Box sx={{ width: '100%', maxWidth: 500, padding: "50px 10px 10px 0" }}>
                                <Typography variant="h5" gutterBottom component="div">
                                    {product.name}
                                </Typography>
                                <Box
                                    sx={{
                                        width: 200,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Rating
                                        name="text-feedback"
                                        value={star}
                                        readOnly
                                        precision={0.5}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                    <Box sx={{ ml: 2 }}>({labels[star]})</Box>
                                </Box>
                                <Typography variant="h5" gutterBottom component="div" marginTop={5}>

                                    <Box sx={{ '& button': { m: 1 } }}>
                                        規格：
                                        {specs.map(data => (
                                            <Button variant="contained" size="small">
                                                {data.spec}
                                            </Button>
                                        ))}
                                        {/* <Button variant="contained" size="small">
                                            20ml
                                        </Button>
                                        <Button variant="outlined" size="small">
                                            50ml
                                        </Button>
                                        <Button variant="outlined" size="small">
                                            100ml
                                        </Button> */}
                                    </Box>
                                </Typography>

                                <Typography variant="h5" gutterBottom component="div" marginTop={5}>
                                    數量：
                                    <TextField
                                        type="number"
                                        label="Size"
                                        id="outlined-size-small"
                                        defaultValue="Small"
                                        size="small"
                                        value={num}
                                        onChange={handleChange("num")}
                                    />
                                </Typography>

                                <Typography variant="h5" gutterBottom component="div" marginTop={5}>
                                    售價：{product.price}元
                                </Typography>
                                <Typography variant="h5" gutterBottom component="div" marginTop={5}>

                                    <Box sx={{ '& button': { ml: 40 } }}>
                                        {/* 庫存：100 */}

                                        <Button variant="contained" onClick={addIntoCart}>
                                            加入購物車
                                        </Button>
                                    </Box>
                                    {/* <button className="btn btnRed" onClick={addIntoCart}>加入購物車</button> */}
                                </Typography>
                            </Box>
                            {/* <div className="detail">
                                <ul className="detailList">
                                    <li>JO MALONE 英國梨與小蒼蘭香水 100ml</li>
                                    <li>5.0(<a href="#">199</a>)</li>
                                    <li>售價：4420元</li>
                                    <li>庫存：100</li>
                                </ul>
                                <div className="btnWrap">
                                    <button className="btn btnRed" onClick={addIntoCart}>加入購物車</button>
                                </div>
                            </div> */}
                        </div>
                        <hr />
                        <div className="discription">
                            <h6>商品描述</h6>
                            <p>{product.description}</p>
                        </div>
                        <hr />
                        <Comment />
                        {/* <div className="commentWrap">
                            <Box sx={{ marginBottom: "20px" }}>
                                <Rating
                                    name="simple-controlled"
                                    value={star}
                                    onChange={(event, newValue) => {
                                        setValues(newValue);
                                    }}
                                    sx={{ display: "block", textAlign: "center" }}
                                />
                                <TextareaAutosize
                                    aria-label="empty textarea"
                                    placeholder=""
                                    minRows={10}
                                    style={{ width: 500 }}
                                />
                            </Box>
                            <Button variant="contained">送出評論</Button>
                        </div> */}
                    </Paper>
                </div>

            </div>
        </Layout >
    )
}

const Product = styled(Element)`
.content{
    width:66.666667%;
    margin:20px auto 0;
    // background-color: rgb(250, 237, 237);
}
.info{
    display: flex;
    justify-content:space-evenly;
}
.productImg{
    width:400px;
    height:400px;
}
.discription{
    margin-top: 50px;
    text-align: center;
}
.discription h6{
    font-size: 30px;
}
.discription p{
    margin: 20px 80px 70px;
    font-size: 20px;
    text-align: left;
}
.btnRed{
    background-color:rgb(240, 147, 147);
}
.btn-right-15{
    margin-right:15px;
}
.slide-indicator{
    background-color: rgb(165, 165, 165);
}
.slide-500{
    width:400px;
    height:400px;
}
.btnWrap{
    text-align: right;
    margin-top:90px;
}
.breadcrumbWrap{
    background-color: #fff;
}
.commentWrap{
    text-align: center;
    padding:30px;
}
.commentField{
    width:400px;
    height:200px;
    margin-right: 30px;
}
.btn-left-40{
    margin-left:40px ;
}
.checked {
    color: orange;
}
`

export default Product;