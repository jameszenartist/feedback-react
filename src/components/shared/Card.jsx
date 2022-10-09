import PropTypes from "prop-types";

function Card({ children }) {
  return <div className="card">{children}</div>;
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
