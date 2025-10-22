import "./footer.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer-page__section">
      <div className="footer__container">
        <p className="footer__copyright">Developed by Stuart Clark</p>
        <p className="footer__year">{year}</p>
      </div>
    </footer>
  );
}

export default Footer;
