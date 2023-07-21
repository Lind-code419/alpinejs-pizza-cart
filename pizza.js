document.addEventListener("alpine:init", () => {

    Alpine.data('pizzaCart', () => {
        return {

            title: 'Pizza Cart API',
            pizzas: [],
            username: 'Lind-code419',
            cartId: 'AaaCpfsnf8',
            cartPizzas: [],
            cartTotal: 0.00,
            paymentAmount: 0,
            message: '...',

            getCart() {
                const getCartUrl = 'https://pizza-api.projectcodex.net/api/pizza-cart/AaaCpfsnf8/get'
                return axios
                    .get(getCartUrl);
            },

            showCartData() {
                this.getCart().then(result => {
                    const cartData = result.data;
                    this.cartPizzas = cartData.pizzas;
                    this.cartTotal = cartData.total.toFixed(2);
                    // this.cartPizzas = result.data.pizzas;
                });

            },

            init() {
                axios
                    .get('https://pizza-api.projectcodex.net/api/pizzas')
                    .then(result => {
                        console.log(result.data)
                        this.pizzas = result.data.pizzas;
                    });
                this.showCartData();

            },

            addPizza(pizzaID) {
                //alert(pizzaID);
                return axios
                    .post('https://pizza-api.projectcodex.net/api/pizza-cart/add', {
                        "cart_code": "AaaCpfsnf8",
                        "pizza_id": pizzaID

                    })
                    .then(result => { this.showCartData() })

            },
            removePizza(pizzaID) {
                //alert(pizzaID);
                return axios
                    .post('https://pizza-api.projectcodex.net/api/pizza-cart/remove', {
                        "cart_code": "AaaCpfsnf8",
                        "pizza_id": pizzaID

                    })
                    .then(result => { this.showCartData() })
            },

            pay(amount) {
                return axios
                    .post('https://pizza-api.projectcodex.net/api/pizza-cart/pay', {
                        "cart_code": "AaaCpfsnf8",
                        amount
                    })
                    .then(result => {
                        if (result.data.status == 'failure') {
                            this.message = result.data.message;
                            setTimeout(() => this.message = '', 3000)
                        }
                        else {this.message = 'Payment successful';
                        setTimeout(()=>{
                            this.message='';
                            this.cartPizzas = [];
                            this.cartTotal = 0;
                            this.paymentAmount = 0.00;
                            this.cartId =''}, 5000)
                    
                    }
                    })
            },

          /*  payForCart() {
                // alert("pay now! R" + this.paymentAmount);
                this
                    .pay(this.paymentAmount)
                    
            }*/



        }
    });



});