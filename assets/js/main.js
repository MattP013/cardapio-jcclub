
const containerCardapio = $('.wrapper');
const containerCarrinho = $('.container-carrinho')

function lerStorage() {
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

    let contentCart = lerStorage();
    if (contentCart.length == 0) {
        contentCart.push(newProduct)
        localStorage.setItem('carrinho', JSON.stringify(contentCart))
        loadCart()
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
            
        }
        else
        {
            contentCart.push(newProduct)
            localStorage.setItem('carrinho', JSON.stringify(contentCart))
            loadCart()
        }
    }
}

function createCard(product, element){
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

    $(preco).text(`x${product.quantidade} - ${product.preco}`)
    $(containerCarrinho).append(element)
}

function loadCart(){
    const productsOnCart = lerStorage();
    $(containerCarrinho).empty();
    if (productsOnCart.length != 0) {
        let amount = 0  
        const clonedCard = $(".to-clone").children().clone();
        productsOnCart.forEach((productOnCar) => {
        createCard(productOnCar, clonedCard)
            amount+=productOnCar.quantidade
        })
    
        productCounter(amount)
    }
    
}

function moreUnits(productOnCar, index) {
    updateProductOnCar = productOnCar[index]
    updateProductOnCar.quantidade++
    productOnCar[index] = updateProductOnCar;
    localStorage.setItem('carrinho', JSON.stringify(productOnCar))

    loadCart()
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
function carregarStorage(Cproduto) {
    let contarprodutos = 0;
    let calcularTotal = 0
    let botaoDiminuir = (quantidade, index) => { return quantidade > 1 ? `<button class="menos" onclick="menosUnidade(${index})" style="background-color: #D7986C">-</button>` : '<button class="menos" disabled="disabled">-</button>' }

    const retorno = Cproduto.map((c, index) => {
        contarprodutos+=c[0].qtd;
        return `
                <div class="card-produto d-flex">
                    <div class="foto-produto">
                        <img src="./assets/img/${c[0].img}" alt="">
                    </div>
                    <div class="ms-2 w-100">
                        <h6 class="nome-produto">
                            ${c[0].nome} <span class="excluir"><i class="fas fa-times"></i></span>
                        </h6>
                        <p class="descricao-produto">
                            ${c[0].descricao}
                        </p>
                        <div data-cid="${c[0].id}" class="operacao mt-2 d-flex justify-content-between">
                                ${botaoDiminuir(c[0].qtd, index)}
                                <span class="preco align-self-center">
                                    x${c[0].qtd} - R$ ${carregarPreco(c[0].preco, c[0].qtd, index)}
                                </span>
                            <button class="mais">
                                +
                            </button>
                        </div>
                    </div>
                </div> 
           `
    })
    if(retorno[0] != undefined)
    {
        productCounter(contarprodutos)
        containerCarrinho.html(retorno)
        $('.enviar-whatsapp').attr('disabled',false)
        
    }
    else
    {
        resetCar()
    }       
       
}

function excluirProduto(index){
    const DeleteProduto = lerStorage();
    DeleteProduto.splice(index,1);
    localStorage.setItem('produto', JSON.stringify(DeleteProduto))
    carregarStorage(DeleteProduto)
}

function carregarPreco(preco, qtd,index) {
    let Produto = lerStorage()
    let NewPreco = Produto[index]

    NewPreco[0].novopreco = preco * qtd
    Produto[index] = NewPreco
    localStorage.setItem('produto', JSON.stringify(Produto))
    atualizarPrecoTotal()

    return Intl.NumberFormat('pt-br', { minimumFractionDigits: 2 }).format(preco * qtd)
}


function atualizarPrecoTotal(){

    $('.container-total').removeClass('d-none')
    const precoAtualizado = lerStorage().reduce((soma, ValorAtual) => { return soma + ValorAtual[0].novopreco}, 0)
    $('.precoTotal').text( Intl.NumberFormat('pt-br', { minimumFractionDigits: 2 }).format(precoAtualizado))
}

function resetCar()
{
    $('.contador').addClass('d-none')
    $('.container-total').addClass('d-none')
    $('.enviar-whatsapp').attr('disabled',true)

    containerCarrinho.html(` <p class="text-center" style="font-size: 20px;">Nenhum produto selecionado</p>`)
}

function menosUnidade(index) {
    let Produto = lerStorage()
    let NewPreco = Produto[index]

    NewPreco[0].qtd -= 1
    Produto[index] = NewPreco

    localStorage.setItem('produto', JSON.stringify(Produto))
    carregarStorage(lerStorage())
}

$(document).ready(function () {
    localStorage.clear()
    loadCart()

    $(document).on('click', '.mais', function ()  {
        const id = $(this).parents(".card-produto").attr("data-idcart")
        const productsOnCar = lerStorage()        
        var index ;
        
        productsOnCar.map((product, i)=>{
        
                if(id == product.id){
                    index = i
                }
        }) 

        moreUnits(productsOnCar,index);
    });

    $('.adicionar').click(function () {
        const selected = $(this).parents('.card-produto');
        insertOnCart(selected);
    })

    $('.opcao').click(function (){
        $('.opcao').removeClass('selected')
        $(this).addClass('selected')
        $('.text-category').text($(this).text())
        if ($(this).text() == "Todos") {
            containerCardapio.children().removeClass('d-none')
        }
        else
        {
            const produtos = Cardapio.filter((cardapio)=> cardapio.categoria == $(this).text())
            containerCardapio.children().addClass('d-none')
            containerCardapio.children().each(function(){
               const content = $(this).find('.ps-2 > .nome-produto')
               produtos.forEach((produto)=>{
                    if (content.text().trim().toUpperCase() !== produto.nome.trim().toUpperCase()) {
                        
                    }
                    else
                    {
                        console.log(`Content: ${content.text().trim().toUpperCase()}`, `Produtos: ${produto.nome.trim().toUpperCase()}`);
                        $(this).removeClass('d-none')
                    }
               })
            })


        }
    })

    $('.enviar-whatsapp').click(function(){
        let Produtos = lerStorage()

        const ProdutosParaEnvio = Produtos.map((P)=>{
            return `${P[0].qtd}x ${P[0].nome} \n`
        })
        let preco = $('.precoTotal').text()
        const Mensagem = window.encodeURIComponent("Salve!! Acabei de fazer um pedido pelo site, segue abaixo:\n" + ProdutosParaEnvio  + "\n" + "Total: R$ " + preco + "\nEstou no aguardo!")
        window.open("https://api.whatsapp.com/send?phone=5513996154443&text=" + Mensagem, "__blank")
    })

})



