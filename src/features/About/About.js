import Images from 'constants/images';
import React from 'react';
import { Container } from 'reactstrap';
import './About.scss';
const Star = ()=>{
    let result =[];
    for(let i =0; i<20; i++){
        result.push(<div className="shooting_star" key={i}></div>);
    }
    return result;
}
function About() {
    return (
            <div className="div-container">
                <div className="night">
                  <Star/>
                </div>
                <div className="night">
                  <Star/>
                </div>
                
        <Container className="div-content">
            <h4>Xin chào mọi người!</h4>
            <p>Trang web này được tạo ra với mục đích nghiên cứu học tập.</p>
            <p>Mọi người tham khảo và đóng góp ý kiến giúp mình nhé!</p>
            <p>Trang web chủ yếu lấy ý tưởng và hình ảnh từ 
                <a className="link-brand unplash" href="https://unsplash.com"> https://unsplash.com</a></p>
            <ul> Trang web này sử dụng:
                <li>Database: <a className="link-brand mongodb" href="https://www.mongodb.com">Mongodb</a>,
                 <a className="link-brand firebase" href="https://firebase.google.com"> firebase/storage</a> (lưu ảnh avatar)
                 </li>
                <li>Back-end: <a className="link-brand nodejs" href="https://nodejs.org">NodeJS</a>,
                <a className="link-brand" href="https://expressjs.com"> ExpressJS</a>,
                <a className="link-brand firebase" href="https://firebase.google.com"> firebase/admin</a> (xử lý jwt)</li>
                <li>Front-end: <a className="link-brand reactjs" href="https://reactjs.org">ReactJS</a>, 
                <a className="link-brand reactstrap" href="https://reactstrap.github.io"> reactstrap</a>, 
                <a className="link-brand" href="https://formik.org"> formik</a></li>
            </ul>

            <div className="photo-app">
            <img alt="logo" className="app-logo" src={Images.logo} />
                <div className="app-name">Photo Gallery</div></div>    
        </Container>
        
        </div>
    );
}

export default About;