import PropTypes from "prop-types";
import styled from "styled-components";

const PieChartTitle = ({ className, siteName }) => {
  return (
    <>
      <div className={className}>
        <img className="buy123-line" src="/Images/pie-buy123-line.png" />
        <div className="words">
          <div className="previous-word">
            <span className="tiny-words">集團</span>
            <span className="title-words">{siteName}</span>
            <span>
              <p className="category-words">分類排行</p>
              <p className="eight-words">前8名熱門排行</p>
            </span>
          </div>
        </div>

        <img className="under-line" src="/Images/pie-under-line.png" />
      </div>
    </>
  );
};

PieChartTitle.propTypes = {
  className: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
};

export default styled(PieChartTitle)`
  width: 500px;
  margin-bottom: 20px;

  .buy123-line {
    width: 223.79px;
  }
  .words {
    display: flex;
    align-items: center;
    margin: 0 12px;
    justify-content: space-between;
  }
  .previous-word {
    display: flex;
    align-items: center;
  }

  .tiny-words {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    margin-right: 15px;
  }

  .title-words {
    font-size: 28px;
    font-weight: 600;
    color: white;
    margin-right: 15px;
  }

  .category-words {
    font-size: 16px;
    font-weight: 600;
    color: white;
  }

  .eight-words {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
  }

  .under-line {
    display: block;
    width: 100%;
  }
`;
