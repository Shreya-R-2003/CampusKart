import React from "react";
import Faq from "react-faq-component";

const data = {
  title: "FAQs",
  rows: [
    {
      title: "What is the duration of the rental period?",
      content: `The maximum rental period is one month.So, If you order for rent on suppose 
      19th of a month, you can maximum rent it till the last day of that particular month.`,
    },
    {
      title: "What is the return process for rented items?",
      content: `For the return of items, you will have to come to the CampusKart Mart, and return the item.
      In case the item is not returned on the due date, then it will be extra charged on per day basis.`,
    },
    {
      title: "What happens if the item I purchased or rented is damaged or faulty?",
      content: `We will certainly make sure to replace it. You can contact this customercare number:+91-9876787654
      or mail us at:campuskart23pes@gmail.com, and very soon our volunteers will reach out to you.`,
    },
    {
      title: "Do you provide any warranty for the products?",
      content: `Yes. If the purchased item has a warranty, we make sure to not only provide warranty
      but also provide free repair of electronic products purchased from CampusKart irrespective of their warranty`,
    },
  ],
};

const styles = {
  bgColor: "white",
  titleTextColor: "crimson",
  rowTitleColor: "darkblue",
  rowContentColor: "black",
  arrowColor: "black",
};

const config = {
  // animate: true,
  // arrowIcon: "V",
  // tabFocus: true
};

const FAQ = () => {
    return (
      <div style={{ marginTop: '100px' }}>
        {/* Add the desired distance from the top */}
        <Faq data={data} styles={styles} config={config} />
      </div>
    );
  };
  

export default FAQ;
