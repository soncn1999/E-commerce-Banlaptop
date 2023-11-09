import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Header-style/Header.scss';
import { Button, Input } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import path from '../utils/path';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUserRedux, handleLogoutRedux } from '../store/asyncActions';
import Swal from 'sweetalert2';

Header.propTypes = {

};

function Header(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user_id = useSelector((state) => state.user.id);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const userCurrent = useSelector((state) => state.user);

    useEffect(() => {
        //User Refresh
        if (!userCurrent.current && isLoggedIn && user_id) {
            dispatch(getCurrentUserRedux(user_id));
        }

        //Token Expired
        if (!isLoggedIn && !user_id) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Phiên làm việc đã hết hạn, hãy đăng nhập lại!',
                showConfirmButton: false,
                timer: 1500
            });
            navigate(`/${path.LOGIN}`);
        }

        return () => {
            if (!isLoggedIn) {
                navigate(`/${path.LOGIN}`);
            }
        }
    }, [isLoggedIn]);

    console.log('Current User Header >>> ', userCurrent);

    const handleUserLogout = () => {
        dispatch(handleLogoutRedux());
    }

    return (
        <div className="header">
            <div className="header-above">
                <div className="header-above__logo-box">
                    <Link to={`/${path.HOME}`}>
                        <div className="header-above__logo-box__img"></div>
                    </Link>
                </div>
                <div className="header-above__search-box">
                    <Input
                        bsSize="sm"
                        type="search"
                        className="header-above__search-box__form"
                    />
                    &nbsp;
                    <div className="header-above__search-box__btn">
                        <Button color="success">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </Button>
                    </div>
                </div>
                <div className="header-above__user-box">
                    {
                        userCurrent && userCurrent?.current ? <span>{`Hi, ${userCurrent.current.firstname} ${userCurrent.current.lastname}`}</span> : <i class="fa-solid fa-circle-user"></i>
                    }
                    <ul className="header-above__user-box__submenu">
                        <li className="header-above__user-box__item" onClick={() => navigate(`/${path.LOGIN}`)} style={{ cursor: 'pointer' }}>Đăng nhập</li>
                        <li className="header-above__user-box__item" onClick={() => navigate(`/${path.REGISTER}`)} style={{ cursor: 'pointer' }}>Đăng ký</li>
                        <li className="header-above__user-box__item" style={{ color: '#fa4a27' }} onClick={() => handleUserLogout()}>Đăng xuất</li>
                    </ul>
                </div>
                <div className="header-above__cart-box header--padding">
                    <div className="header-above__cart-box__quantity">{
                        userCurrent && userCurrent?.current?.cart.length ? userCurrent?.current?.cart.length : 0
                    }</div>
                    <div className="header-above__cart-box__icon">
                        <Link to={`/${path.CART}`}><i class="fa-solid fa-cart-shopping"></i></Link>
                    </div>
                </div>
                {
                    userCurrent && userCurrent?.current?.role == 'admin' ? <Link to={`/${path.PRIVATE}`}><div className="header-above__admin">
                        <i class="fa-solid fa-user-tie"></i>
                    </div></Link> : <div></div>
                }

            </div>
            <div className="header-below">
                <div className="header-below__all-category">
                    <div className="header-below__all-category__group">
                        <div className="header-below__all-category__group-public">
                            <i class="fa-solid fa-bars"></i>
                            &nbsp;
                            DANH MỤC NHÓM
                        </div>
                    </div>

                    <div className="header-below__submenu">
                        <ul className="header-below__submenu-list">
                            <li className="header-below__submenu-item">
                                <i class="fa-solid fa-laptop"></i>
                                &nbsp;
                                LAPTOP
                                <div className="header-below__submenu-item__container">
                                    <div className="header-below__submenu-item__wrapper">
                                        <div className="header-below__submenu-item__box">
                                            <div className="header-below__submenu-item__box__title">Laptop theo hãng</div>
                                            <div className="header-below__submenu-item__box__list">
                                                <li className="header-below__submenu-item__box__item">Laptop HP</li>
                                                <li className="header-below__submenu-item__box__item">Laptop Dell</li>
                                                <li className="header-below__submenu-item__box__item">Laptop Lenovo</li>
                                                <li className="header-below__submenu-item__box__item">Laptop Fujitsu</li>
                                            </div>
                                        </div>
                                        <div className="header-below__submenu-item__box">
                                            <div className="header-below__submenu-item__box__title">Laptop theo nhu cầu</div>
                                            <div className="header-below__submenu-item__box__list">
                                                <li className="header-below__submenu-item__box__item">Laptop Sinh viên - Văn phòng</li>
                                                <li className="header-below__submenu-item__box__item">Laptop Đồ Họa</li>
                                                <li className="header-below__submenu-item__box__item">Laptop Gaming</li>
                                                <li className="header-below__submenu-item__box__item">Laptop 2 trong 1</li>
                                            </div>
                                        </div>
                                        <div className="header-below__submenu-item__box">
                                            <div className="header-below__submenu-item__box__title">Laptop theo kích thước</div>
                                            <div className="header-below__submenu-item__box__list">
                                                <li className="header-below__submenu-item__box__item">Laptop 13 inch</li>
                                                <li className="header-below__submenu-item__box__item">Laptop 14 inch</li>
                                                <li className="header-below__submenu-item__box__item">Laptop 15 inch</li>
                                            </div>
                                        </div>
                                        <div className="header-below__submenu-item__box">
                                            <div className="header-below__submenu-item__box__title">Laptop theo Chip</div>
                                            <div className="header-below__submenu-item__box__list">
                                                <li className="header-below__submenu-item__box__item">Intel Pentium</li>
                                                <li className="header-below__submenu-item__box__item">Intel Core i3</li>
                                                <li className="header-below__submenu-item__box__item">Intel Core i5</li>
                                                <li className="header-below__submenu-item__box__item">Intel Core i7</li>
                                                <li className="header-below__submenu-item__box__item">AMD Ryzen</li>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="header-below__submenu-item">
                                <i class="fa-solid fa-computer"></i>
                                &nbsp;
                                PC
                                <div className="header-below__submenu-item__container">
                                    <div className="header-below__submenu-item__wrapper">
                                        <div className="header-below__submenu-item__box">
                                            <div className="header-below__submenu-item__box__title">Laptop theo hãng</div>
                                            <div className="header-below__submenu-item__box__list">
                                                <li className="header-below__submenu-item__box__item">Laptop HP</li>
                                                <li className="header-below__submenu-item__box__item">Laptop Dell</li>
                                                <li className="header-below__submenu-item__box__item">Laptop Lenovo</li>
                                                <li className="header-below__submenu-item__box__item">Laptop Fujitsu</li>
                                            </div>
                                        </div>
                                        <div className="header-below__submenu-item__box">
                                            <div className="header-below__submenu-item__box__title">Laptop theo nhu cầu</div>
                                            <div className="header-below__submenu-item__box__list">
                                                <li className="header-below__submenu-item__box__item">Laptop Sinh viên - Văn phòng</li>
                                                <li className="header-below__submenu-item__box__item">Laptop Đồ Họa</li>
                                                <li className="header-below__submenu-item__box__item">Laptop Gaming</li>
                                                <li className="header-below__submenu-item__box__item">Laptop 2 trong 1</li>
                                            </div>
                                        </div>
                                        <div className="header-below__submenu-item__box">
                                            <div className="header-below__submenu-item__box__title">Laptop theo kích thước</div>
                                            <div className="header-below__submenu-item__box__list">
                                                <li className="header-below__submenu-item__box__item">Laptop 13 inch</li>
                                                <li className="header-below__submenu-item__box__item">Laptop 14 inch</li>
                                                <li className="header-below__submenu-item__box__item">Laptop 15 inch</li>
                                            </div>
                                        </div>
                                        <div className="header-below__submenu-item__box">
                                            <div className="header-below__submenu-item__box__title">Laptop theo Chip</div>
                                            <div className="header-below__submenu-item__box__list">
                                                <li className="header-below__submenu-item__box__item">Intel Pentium</li>
                                                <li className="header-below__submenu-item__box__item">Intel Core i3</li>
                                                <li className="header-below__submenu-item__box__item">Intel Core i5</li>
                                                <li className="header-below__submenu-item__box__item">Intel Core i7</li>
                                                <li className="header-below__submenu-item__box__item">AMD Ryzen</li>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="header-below__submenu-item">
                                <i class="fa-solid fa-desktop"></i>
                                &nbsp;
                                MÀN HÌNH
                            </li>
                            <li className="header-below__submenu-item">
                                <i class="fa-solid fa-print"></i>
                                &nbsp;
                                MÁY IN
                            </li>
                            <li className="header-below__submenu-item">
                                <i class="fa-solid fa-cash-register"></i>
                                &nbsp;
                                MÁY SCAN
                            </li>
                            <li className="header-below__submenu-item">
                                <i class="fa-solid fa-server"></i>
                                &nbsp;
                                MÁY CHỦ
                            </li>
                            <li className="header-below__submenu-item">
                                <i class="fa-solid fa-laptop-code"></i>
                                &nbsp;
                                PHẦN MỀM
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;