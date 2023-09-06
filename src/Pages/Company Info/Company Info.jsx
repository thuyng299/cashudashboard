import React, { useState, useEffect } from "react";
import { fetchChartData } from "../../Services/Data";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "antd";
import slides from "../../Components/Carousel/CarouselData.json";
import { Carousel } from "../../Components/Carousel/Carousel";

export default function CompanyInfo() {
  return (
    <div
      className="container"
      style={{ background: "#b68149", borderRadius: "20px" }}
    >
      <Row span={24} className="rowDashboard" style={{ height: "88vh" }}>
        <Col
          span={8}
          style={{
            fontFamily: "Poppins, sans-serif",
            color: "white",
            background: "transparent",
            padding: "10px",
            height: "100%",
          }}
          className="Contentcol"
        >
          <div
            className="content"
            style={{ marginTop: "15vh", marginLeft: "10vh" }}
          >
            <h1>
              <b>Cashew</b>
            </h1>
            <p style={{ textAlign: "justify" }}>
              Cashew is native to Brazil and filled with antioxidants. It is a
              good choice for weight loss, especially when eaten raw, since not
              all fat from is absorbed when consumed in this form. Rich in
              protein and fiber like other nuts, it is good for heart health and
              lowering cholesterol. Cashew is loaded with copper, good for
              formation of red blood cells and anemia prevention. It also
              contains lots of magnesium, zinc and iron. Cashew also promotes
              eye health and due to high levels of selenium and copper, cashew
              oil is great for skin and hair.
            </p>
            <h2>
              <b>Did you know?</b>
            </h2>
            <p>
              Cashew is actually a seed from cashew tree and it grows outside
              so-called ‘cashew apple’.
            </p>

            <h2>
              <b>Good for:</b>
            </h2>
            <div class="elementor-widget-container">
              <ul class="elementor-inline-items elementor-icon-list-items elementor-post-info">
                <li
                  href="https://vitaminbase.eu/benefits/anemia-prevention/"
                  class="elementor-post-info__terms-list-item"
                >
                  anemia prevention
                </li>
                <li
                  href="https://vitaminbase.eu/benefits/eye-health/"
                  class="elementor-post-info__terms-list-item"
                >
                  eye health
                </li>
                <li
                  href="https://vitaminbase.eu/benefits/hair/"
                  class="elementor-post-info__terms-list-item"
                >
                  hair
                </li>
                <li
                  href="https://vitaminbase.eu/benefits/heart-health/"
                  class="elementor-post-info__terms-list-item"
                >
                  heart health
                </li>
                <li
                  href="https://vitaminbase.eu/benefits/lowering-cholesterol/"
                  class="elementor-post-info__terms-list-item"
                >
                  lowering cholesterol
                </li>
              </ul>
            </div>
          </div>
        </Col>
        <Col span={16} className="Carouselcol" style={{ height: "100%" }}>
          <Carousel data={slides.slides} />
        </Col>
      </Row>
    </div>
  );
}
