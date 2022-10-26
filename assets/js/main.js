
const containerCardapio = $('.wrapper');
const containerCarrinho = $('.container-carrinho')

function readStorage() {
    return localStorage.carrinho ? JSON.parse(localStorage.carrinho) : [];
}

function insertOnCart(element) {
    const contentProduct = $(element).prop("innerText").split("\n");
    const ProductImage = $(element).children('.foto-produto').find('img').attr('src');
    const newProduct = {
        id: $(element).attr("data-id"),
        nome: contentProduct[0],
        descricao: contentProduct[2],
        preco: contentProduct[4].replace("R$","").replace(',','.').trim(),
        quantidade: 1,
        img: ProductImage,
        precofinal: 0
    }

    let contentCart = readStorage();
    if (contentCart.length == 0) {
        contentCart.push(newProduct)
        localStorage.setItem('carrinho', JSON.stringify(contentCart))
        loadCart()
        calcTotalPrice()
    }
    else
    {
    
        var index
        const isOnCar = contentCart.filter((produto,i) => {
            if (produto.id == newProduct.id) {
                index = i;
                return produto
            }
        })

        if (isOnCar.length > 0) {

            moreUnits(contentCart, index)
            calcTotalPrice()
            
        }
        else
        {
            contentCart.push(newProduct)
            localStorage.setItem('carrinho', JSON.stringify(contentCart))
            loadCart()
            calcTotalPrice()

        }
    }
}

function createCard(product){
    const element =  $(".to-clone").children().clone();
    $(element).attr("data-idcart",product.id);
    $(element).find("foto-produto > img").attr("src", `${product.img}`)
    const [span, nome, descricao, operacao] = $(element).children(".detalhes").children()
    $(nome).text(product.nome);
    $(descricao).text(product.descricao)
    
    const [btmenos, preco, btmais] = $(operacao).children(); 
    if (product.quantidade != 1) {
        $(btmenos).removeAttr("disabled")
        $(btmenos).css("background", "var(--color-base)")
    }

    $(preco).text(`x${product.quantidade} - R$ ${Intl.NumberFormat('pt-br', { minimumFractionDigits: 2 }).format(product.preco * product.quantidade)}`)
    $(containerCarrinho).append(element)
}

function loadCart(){
    const productsOnCart = readStorage();
    if (productsOnCart.length != 0 ) {
        let amount = 0  
        $('.enviar-whatsapp').attr('disabled',false)
        $(containerCarrinho).empty()
        productsOnCart.forEach((productOnCar) => {
            amount+=productOnCar.quantidade
            createCard(productOnCar)
        })
        
        productCounter(amount)
        calcTotalPrice()
    }
    else{
        resetCart()
    }
    
}

function resetCart()
{
    $(containerCarrinho).empty()
    $(".contador").text(0).addClass("d-none")
    $('.enviar-whatsapp').attr('disabled',true)
    $(".container-total").addClass("d-none")
    $(containerCarrinho).append(`<p class="sem-produto">Nenhum produto selecionado</p>`)
}

function moreUnits(productsOnCart, index) {
    updateProductOnCart = productsOnCart[index]
    updateProductOnCart.quantidade++
    productsOnCart[index] = updateProductOnCart;
    localStorage.setItem('carrinho', JSON.stringify(productsOnCart))

    loadCart()
}

function lessUnits(productsOnCart, index) {
    updateProductOnCart = productsOnCart[index]
    updateProductOnCart.quantidade--
    productsOnCart[index] = updateProductOnCart;
    localStorage.setItem('carrinho', JSON.stringify(productsOnCart))

    loadCart()
}

function deleteProductOnCart(productsOnCart, index)
{
    productsOnCart.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(productsOnCart))
    loadCart()
}

function calcTotalPrice()
{
    const productsOnCar = readStorage()
    let totalPrice = 0
     productsOnCar.forEach((product) =>{
        totalPrice+= product.quantidade * product.preco
    })
    
    $(".container-total").removeClass("d-none")
    $(".precoTotal").text(Intl.NumberFormat('pt-br', { minimumFractionDigits: 2 }).format(totalPrice));
}

function productCounter(totalAmount)
{
    if (totalAmount == 0) {

        $(".counter").text(0)
        $(".counter").addClass("d-none")
    }
    $(".contador").removeClass("d-none")
    $(".contador").text(totalAmount)
}


$(document).ready(function () {
    loadCart()

    $(document).on('click', '.mais', function ()  {
        const id = $(this).parents(".card-produto").attr("data-idcart")
        const productsOnCart= readStorage()        
        var index;
        
        const productToUpdate = productsOnCart.filter((product, i)=>{
        
                if(id == product.id){
                   index = i
                   return product
                }
        }) 
        
        moreUnits(productsOnCart,index);
    });

    $(document).on('click', '.excluir', function ()  {
        const id = $(this).parents(".card-produto").attr("data-idcart")
        const productsOnCart = readStorage()        

        var indexToDelete = 0
        productsOnCart.filter((product, index)=>{
            if(id == product.id){
                indexToDelete = index
             }
        })
        deleteProductOnCart(productsOnCart,indexToDelete)
    })

    $(document).on('click', '.menos', function ()  {
        const id = $(this).parents(".card-produto").attr("data-idcart")
        const productsOnCart = readStorage()        
        var index ;
        
        const productToUpdate = productsOnCart.filter((product, i)=>{
        
                if(id == product.id){
                   index = i
                   return product
                }
        }) 
        
        lessUnits(productsOnCart,index);
    });

    $('.adicionar').click(function () {
        const selected = $(this).parents('.card-produto');
        insertOnCart(selected);
    })

    $('.opcao').click(function (){
        $('.opcao').removeClass('selected')
        $(this).addClass('selected')
        $(".text-category").text($(this).text())
        const idcategory = $(this).attr("data-idcategory");

        if (idcategory == 0) {
            containerCardapio.children().removeClass('d-none')
        }
        else
        {
            containerCardapio.children().removeClass('d-none')
            containerCardapio.children().each(function(){
               const content = $(this).attr("data-category")
               console.log(content);
               if (content != idcategory) {
                   $(this).addClass("d-none")
               }
            })

        }
    })

    $('.enviar-whatsapp').click(function(){
        let productsOnCart = readStorage()

        const ProductsToSend = productsOnCart.map((P)=>{
            return `${P.quantidade}x ${P.nome} \n`
        })
        let price = $('.precoTotal').text()
        const message = window.encodeURIComponent("Salve!! Acabei de fazer um pedido pelo site, segue abaixo:\n" + ProductsToSend  + "\n" + "Total: R$ " + price + "\nEstou no aguardo!")
        window.open("https://api.whatsapp.com/send?phone=5513996154443&text=" + message, "__blank")
    })

})



