var store = new Vue ({
    el: '#app',
    data: {
        showProduct: true,
        sitename: 'After School Lessons',
        cart: [],
        sortBy: "subject",  
        orderBy: 'ascending',
        searchValue: '',
        Lessons: lessons,  
        checkout: {
            Name: "",
            Phone_No: null,
        } ,   
    },
               
    methods: {
        addCourse: function (lesson) {
            this.cart.push(lesson)
            if(lesson.spaces > 0){
               --lesson.spaces    
            }
        },
        canAddToCart: function(lesson){
          return lesson.availableInventory > this.cartCount(lesson);
        },
        removeFromCart(lesson) {
            this.cart.splice(this.cart.indexOf(lesson.id));            
            ++lesson.spaces   
        },
        showCheckout(){
            this.showProduct = this.showProduct ? false : true;
        },
        cartCount(id){
            let count = 0;
            for (let i = 0; i < this.cart.length; i++){
                if(this.cart[i] === id){
                    count++
                }
            }
            return count;
        },        
        isNumber() {
            let num = document.getElementById("pNo")
            let lett = document.getElementById("letters")
            let submitBtn = document.querySelector(".submitBtn")
            var integers = /^[0-9]+$/
            var letters = /^[A-Za-z]+$/
            if(num.value.match(integers) && lett.value.match(letters)){                
                alert('Your Registration number has accepted....');
                window.location.href = "\index.html"
                return true;
            }
            else{
                alert('Please input only numeric characters for Phone number and letters for Name');

                return false;
            }
        },

    },
    computed: {

        cartItemCount: function(){
            return this.cart.length;
        },
        
        sorted() {
            let sortLessons = this.Lessons;       
     
            sortLessons = sortLessons.sort((a,b) => {
                    if(this.sortBy == "subject"){
                        let fa = a.subject.toLowerCase(), fb = b.subject.toLowerCase();

                        if (fa < fb ) {
                            return -1
                        }
                        if (fa > fb ) {
                            return 1
                        }
                    } 
                    else if (this.sortBy == 'location'){                        
                        let fa = a.location.toLowerCase(), fb = b.location.toLowerCase();

                        if (fa < fb ) {
                            return -1
                        }
                        if (fa > fb ) {
                            return 1
                        }
                    }
                return 0
            })
            if (this.sortBy == 'price'){                        
                sortLessons = sortLessons.sort((a,b) => {
                    return a.price - b.price
                })
            }
            if (this.sortBy == 'availability'){                        
                sortLessons = sortLessons.sort((a,b) => {
                    return a.spaces - b.spaces
                })
            }
            if (this.orderBy !=="ascending") {
                sortLessons.reverse()
            }
            if (this.searchValue != '' && this.searchValue) {
                sortLessons = sortLessons.filter((item) => {
                  return item.subject
                    .toUpperCase()
                    .includes(this.searchValue.toUpperCase())
                })
              }
            return sortLessons
        },
    }
}) 