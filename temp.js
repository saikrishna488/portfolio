let cart = [
    { id: 1, name: "Pizza", price: 10, quantity: 2 },
    { id: 2, name: "Burger", price: 8, quantity: 1 },
   ];
   
   
   function addToCart(item) {

    let id = null


    cart.map((c)=>{
        if(c.id == item.id){
            id = c.id
        }
    })

    if(id){
        cart = cart.map((c)=>{
            if(c.id == id){
                return {
                    id : item.id,
                    name : item.name,
                    price : item.price,
                    quantity : c.quantity + item.quantity
                }
            }
            else{
                return c
            }
        })
    }
    else{
        cart.push(item)
    }

    updateCartTotal();
   }
   
   
   function updateCartTotal() {

    let total = 0

    cart.map((c)=>{
        total += c.price*c.quantity
    })
    console.log("Cart items are", cart);
    console.log(`Total Price: ${total}`);
   }
   
   
   

addToCart( { id: 1, name: "Pizza", price: 10, quantity: -1 })
addToCart( { id: 3, name: "Fries", price: 100, quantity: 1 })
   