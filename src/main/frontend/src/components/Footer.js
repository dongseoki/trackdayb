import React, { useEffect, useState } from "react";
import "./Footer.css";

function Footer(props) {
    
    //// releaseVersion text 파일 읽어오기
    const [ releaseVersion, setReleaseVersion ] = useState('');

    let xhttp;
    function createHttpRequest() {
        xhttp = new XMLHttpRequest();
    }
    function readReleaseTxt(){
        createHttpRequest();
        xhttp.onreadystatechange = callFunction;
        xhttp.open('GET', 'latestReleaseVer.txt', true);
        xhttp.send(null);
    }
    function callFunction(){
        if(xhttp.readyState == 4){
            if(xhttp.status == 200){
                let responseData = xhttp.responseText;
                setReleaseVersion(responseData);
            }
        }
    }

    useEffect(()=>{
        readReleaseTxt();
    },[])
    

    return (
        <>
            <footer>
                <div className="footer">
                    <div className="left">trackDay</div>
                    <div className="middle">
                        <div className="links">
                            {/* <ul>
                                <li>ABOUT US</li>
                                <li>공지사항</li>
                                <li>이용가이드</li>
                                <li>FAQ/문의</li>
                            </ul> */}
                        </div>
                        <p>Copyright @ 2021 trackDay All rights reserved.</p>
                        <p>{releaseVersion}</p>
                    </div>
                    <div className="right">
                        <a href="https://forms.gle/zJmLVMoKX6nFWbuw6" target="_blank" rel="noopener noreferrer">
                            <p>&#127856; 피드백 남기러 가기 &#127856;</p>
                        </a>
                        <a href="https://open.kakao.com/o/gu0EefLd" target="_blank" rel="noopener noreferrer">
                            <p>&#128073; FAQ (개발자 오픈카톡) &#128072;</p>
                        </a>
                        {/* <address>      
                        대표자 : 이동석 | 사업자번호 : 116-99-99999<br />
                        서울특별시 마포구 와우산@로 24길<br />
                        Tel: (02)123-4567 | Fax: (02)234-5678<br />
                        개인정보보호 처리방침 | 이용약관<br />
                        </address> */}
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;