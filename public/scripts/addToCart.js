window.addEventListener('load', function(){
    
    var btnsAdd = document.querySelectorAll('.student__btnadd');
    var cartCount = document.querySelector('.cart__count');

    btnsAdd.forEach(function (btn) {
        
        
        btn.addEventListener('click', function(event){
            event.preventDefault();
            var name = btn.getAttribute('data-name');
            
            var promise = fetch('/api/cart/' + name, { method: 'POST' });
            promise
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    cartCount.innerText = data.cartLength;
                });

        });

    });

});