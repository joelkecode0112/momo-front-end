// import React from 'react';
import { useHistory } from "react-router";
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Footer from './Footer';
import { signup } from "../auth";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Element = ({ className }) => {
    const history = useHistory();
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState({})
    const [values, setValues] = useState({
        email: '',
        username: '',
        password: '',
    })

    const { email, password, username } = values

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    const handleClose = () => {
        setShow(false);
    };
    const clickSubmit = (event) => {
        event.preventDefault()
        signup({ email, password, username })
            .then(data => {
                console.log(data)
                if (data.error) {
                    setShow(true)
                    setMessage({ string: "已有重複email", status: "error" })
                } else {
                    setShow(true)
                    setMessage({ string: "註冊成功", status: "success" })
                    history.push("/signin")
                }
                // if (data.error) {
                //     setValues({ ...values, error: data.error, success: false })
                // } else {
                //     setValues({
                //         ...values,
                //         name: "",
                //         email: "",
                //         password: "",
                //         error: "",
                //         success: true
                //     })
                // }
            })
    }
    return (
        <div className={className} style={{ backgroundColor: "rgb(238, 77, 45)" }}>

            <div style={{ margin: "0 auto", height: "600px", width: "1040px", backgroundImage: "url('https://cf.shopee.tw/file/941617bff55f5cdc82aea8f3bbb16460')", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center" }}>
                <div className="form container float-end mt-4">
                    <form className="row g-3 pt-4">
                        <h5>註冊</h5>
                        <div className="mb-3">
                            <input type="text" className="form-control" value={email} placeholder='請輸入帳號:Email' required onChange={handleChange("email")} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" value={username} placeholder='請輸入帳號:Email' required onChange={handleChange("username")} />
                        </div>
                        <div className="mb-3">
                            <div className="form-group">
                                <div className="input-group" id="show_hide_password">
                                    <input className="form-control" type="password" placeholder='請輸入密碼' value={password} onChange={handleChange("password")} />
                                    {/* <div className="input-group-text">
                                        <a href=""><i className="fa fa-eye-slash" aria-hidden="true"></i></a>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="d-grid gap-2 col-12 mx-auto loginBtn pb-5">
                            <button className="btn btn-primary" onClick={clickSubmit}>註冊</button>
                        </div>
                    </form>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={show}
                onClose={handleClose}
                key="1"
            >
                <Alert onClose={handleClose} severity={message.status} sx={{ width: '100%' }}>
                    {message.string}
                </Alert>
            </Snackbar>
            <Footer />
        </div>
    )
}

const Signup = styled(Element)`
.navbar1{
    background-color:rgb(248, 209, 215);
}
.brandImg{
    width:40px;height:35px;
}
.form{
    background-color: #fff;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    box-shadow: 0 3px 10px 0 rgb(0 0 0 / 14%);
    border-radius: 0.25rem;
    overflow: hidden;
    width: 26.25rem;
}
#middleLine{
    margin: 10px;
    padding: 10px;
    color: #a3a2a3;
    font-family: monospace;
  }
.btn-facebook {
    color: #fff;
    background-color: #3b5998;
    border-color: rgba(0,0,0,0.2);
}
.btn-social {
    position: relative;
    padding-left: 15px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.btn-google {
    color: #fff;
    background-color: #dd4b39;
    border-color: rgba(0,0,0,0.2);
}
`

export default Signup;