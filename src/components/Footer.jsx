import React from 'react';

const Footer = () => {
    const links = [
        ['https://t.me/newsalaar', <i className="bi bi-telegram"></i>],
        ['https://www.facebook.com/profile.php?id=100017227802976', <i className="bi bi-facebook"></i>],
        ['mailto:keyshet@gmail.com', <i className="bi bi-envelope"></i>]
    ]
    return (
        <div className="footer flex flex-center">
            {links.map(([link, icon]) => <p key={link} className="p-15"><a href={link} target="_blank">{icon}</a></p>)}
        </div>
    );
};

export default Footer;