import React from 'react';

const Footer = () => {
  const links = [
    ['https://t.me/newsalaar', <i className="bi bi-telegram" />],
    ['https://www.facebook.com/profile.php?id=100017227802976', <i className="bi bi-facebook" />],
    ['mailto:keyshet@gmail.com', <i className="bi bi-envelope" />],
  ];
  return (
    <div className="footer flex flex-center">
      {links.map(([link, icon]) => <p key={link} className="p-15"><a href={link} target="_blank" rel="noreferrer">{icon}</a></p>)}
    </div>
  );
};

export default Footer;
