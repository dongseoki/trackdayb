import React from "react";
import "./Footer.css"

function Footer(props) {
    return (
        <>
            <footer>
                <div className="footer">
                    <div className="left">trackDay</div>
                    <div className="middle">
                        <div className="links">
                            <ul>
                                <li>ABOUT US</li>
                                <li>공지사항</li>
                                <li>이용가이드</li>
                                <li>FAQ/문의</li>
                            </ul>
                        </div>
                        <p>Copyright @ 2021 trackDay All rights reserved.</p>
                    </div>
                    <div className="right">
                        <address>      
                        대표자 : 이동석 | 사업자번호 : 116-99-99999<br />
                        서울특별시 마포구 와우산@로 24길<br />
                        Tel: (02)123-4567 | Fax: (02)234-5678<br />
                        개인정보보호 처리방침 | 이용약관<br />
                        </address>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;