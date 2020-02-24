'use strict';

import Product from "./product.js";

const e = React.createElement;

class Catalog extends React.Component {

  constructor(props) {
    super(props);

    let products = retrieveObject("products");

    for(var i=0; i < products.length; i++){
        products[i].added = 0;
    }

    this.state = {
      products: products,
      types: getAllTypes()
    };
  }

  componentDidMount(){
      attachFilter();
  }

  render() {

    return e("div", { className: "container" },

        e("header",
            { className: "section-header" },
            e("h3",
                { className: "section-title" },
                "Product Catalog"
            )
        ),

        e("div",
            { className: "row" },
            e("div",
                { className: "col-lg-12" },
                e("ul",
                    { id: "portfolio-flters" },
                    
                    e("li",
                        { "data-filter": "*", className: "filter-active" },
                        "All"
                    ),

                    //Incase no types
                    (this.state.types.length != 0 &&
                        e(React.Fragment, null,
        
                            this.state.types.map(type => {
        
                                return e("li",
                                { "data-filter": ".filter-" + type.name.replace(' ','-'), key: type.name },
                                type.name
                                );
                            })
                        )
                    )

                )
            )
        ),
    
        e("div", { className: "row portfolio-container" },

            //Incase no products
            (this.state.products.length != 0 &&
                e(React.Fragment, null,

                    this.state.products.map(product => {

                        return e(Product,
                        {
                            key: product.name,
                            cart: false,
                            product: product,
                        },
                        null);
                    })
                )
            )
        )
    );
  }
}

$("#products").each(function (i, ComponentContainer) {
  ReactDOM.render(
    e(Catalog, null, null),
    ComponentContainer
  );
});