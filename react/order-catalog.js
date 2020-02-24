'use strict';

import Product from "./product.js";

const e = React.createElement;

class OrderCatalog extends React.Component {

  constructor(props) {
    super(props);

    let products = retrieveObject("products");

    for(var i=0; i < products.length; i++){
        products[i].added = 0;
    }

    setCart(products);

    this.state = {
      products: products,
      types: getAllTypes()
    };
  }

  componentDidMount(){
      attachCartFilter();
  }



  modifyCart(name, added){

    let new_products = this.state.products;

    for(var i=0; i < new_products.length; i++){
        if(new_products[i]["name"] == name){
            new_products[i].added = added;
        }
    }

    setCart(new_products);

    this.setState({
        products: new_products,
        types: this.state.types
    });

  }

  render() {

    return e("div", { className: "container" },

        e("header",
            { className: "section-header" },
            e("h3",
                { className: "section-title" },
                "ORDER CART"
            )
        ),

        e("div",
            { className: "row" },
            e("div",
                { className: "col-lg-12" },
                e("ul",
                    { id: "cart-flters" },
                    
                    e("li",
                        { "data-filter": "*", className: "filter-active" },
                        "All"
                    ),

                    //Incase no types
                    (this.state.types.length != 0 &&
                        e(React.Fragment, null,
        
                            this.state.types.map(type => {
        
                                return e("li",
                                { "data-filter": ".filter-" + type.name.replace(' ','-'), key: type.name + " in cart" },
                                type.name
                                );
                            })
                        )
                    )

                )
            )
        ),
    
        e("div", { className: "row portfolio-container in-cart" },

            //Incase no products
            (this.state.products.length != 0 &&
                e(React.Fragment, null,

                    this.state.products.map(product => {

                        return e(Product,
                        {
                            key: product.name + " in cart",
                            cart: true,
                            product: product,
                            modifyCart: this.modifyCart.bind(this)
                        },
                        null);
                    })
                )
            )
        )
    );
  }
}

$("#react-cart-modal").each(function (i, ComponentContainer) {
    ReactDOM.render(
        e(OrderCatalog, null, null),
        ComponentContainer
    );
});