const e = React.createElement;

class Product extends React.Component {

    constructor(props) {
        super(props);
    }

    openDetails(e){
        e.preventDefault();

        $.ajax({
            url: 'products/details/' + this.props.product.name + '.html',
            async: true,
            dataType: 'html',
            success: function (response) {
                openModal(response);
            },
            error: function (response){
                openModal("Failed to load product details");
            }
          });

    }

    onChange(x){

        this.props.modifyCart(this.props.product.name, x);
    }

    render() {
        return e('div',
            { className: "col-lg-4 col-md-6 portfolio-item" + (this.props.cart == true ? " item-cart":"") + " filter-" + this.props.product.type.replace(' ','-') + (this.props.cart == true ? "":" wow fadeInUp") },

            e("div",
                { className: "portfolio-wrap" },
                (this.props.cart || e("figure",
                    null,
                
                    e("img",
                        { src: "products/img/" + this.props.product.name + ".jpg", className: "img-fluid" },
                        null
                    ),

                    e("a",
                        { href: "products/img/" + this.props.product.name + ".jpg", className: "link-preview", title: "Preview", "data-title": this.props.product.name, "data-lightbox": this.props.product.name },
                        e("i", { className: "ion ion-eye" })
                    ),

                    e("a",
                        { href: "#" + this.props.product.name, className: "link-details", title: "Details", onClick: e => this.openDetails(e) },
                        e("i", { className: "ion ion-android-open" })
                    )
                
                )),

                e("div",
                    { className: "portfolio-info", style: {height: 'fit-content'} },

                    (!this.props.cart || e("br",
                        null,
                        null
                    )),

                    (this.props.product.added != 0 || e("h4",
                        null,
                        e("a",
                            { href: "#" + this.props.product.name, onClick: e => this.openDetails(e) },
                            this.props.product.name
                        )
                    )),

                    (this.props.product.added == 0 ||e("h4",
                        null,
                        e("a",
                            { href: "#" + this.props.product.name, onClick: e => this.openDetails(e), style: {color: "#18d26e"}  },
                            this.props.product.name
                        )
                    )),

                    e("p",
                        null,
                        this.props.product.type
                    ),

                    (!this.props.cart || e("br",
                        null,
                        null
                    )),

                    (!this.props.cart || e("p",
                        { className: "font", style: {textTransform: 'none'} },
                        "Each box contains " + this.props.product.quantity
                    )),

                    (!this.props.cart || e("br",
                        null,
                        null
                    )),

                    (!this.props.cart || e(NumericInput,
                        { mobile: true, min: 0, value: this.props.product.added, parse: parseInt, strict: true, onChange: this.onChange.bind(this) },
                        null
                    )),

                    (!this.props.cart || e("br",
                        null,
                        null
                    )),

                    (!this.props.cart || e("br",
                        null,
                        null
                    )),

                    (!this.props.cart || e("p",
                        { className: "font", style: {textTransform: 'none'} },
                        e("strong", { style: {color: "#5f5f5f"} }, this.props.product.added), " boxes of this type currently in cart"
                    )),

                    (!this.props.cart || e("br",
                        null,
                        null
                    ))
                )
            )

        );
    }
}

export default Product;

