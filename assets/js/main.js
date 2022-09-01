

const Cardapio = [
    {
        id: 1,
        nome: 'Café Expresso',
        categoria: 'Bebidas Quentes',
        preco:14.00,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.',
        img: 'logo-jc.jpg',
        qtd: 1,
        novopreco: 0
    },
    {
        id: 2,
        nome: 'Capuccino',
        categoria: 'Bebidas Quentes',
        preco: 28.90,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.',
        img: 'logo-jc.jpg',
        qtd: 1,
        novopreco: 0
    },
    {
        id: 3,
        nome: 'Café Americano',
        categoria: 'Bebidas Quentes',
        preco: 14.00,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.',
        img: 'logo-jc.jpg',
        qtd: 1,
        novopreco: 0
    },
    {
        id: 4,
        nome: 'Café com Leite',
        categoria: 'Bebidas Quentes',
        preco: 14.00,
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.',
        img: 'logo-jc.jpg',
        qtd: 1,
        novopreco: 0
    },
    {
        id: 5,
        nome: "Pão de mel c/ brigadeiro",
        categoria: "Lanches",
        preco: 14.0,
        descricao:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.",
        img: "logo-jc.jpg",
        qtd: 1,
        novopreco: 0,
      },
      {
        id: 6,
        nome: "Pão de mel c/ paçoca",
        categoria: "Lanches",
        preco: 14.0,
        descricao:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.",
        img: "logo-jc.jpg",
        qtd: 1,
        novopreco: 0,
      }
]

const containerCardapio = $('.wrapper');
const containerCarrinho = $('.container-carrinho')
function carregarCardapio(cardapio) {
    let data = []
    const result = cardapio.forEach((c) => {
        data.push(`
            <div data-cid="${c.id}" class="card-produto d-flex">
                <div class="foto-produto">
                    <img src="./assets/img/${c.img}" alt="">
                </div>
                <div class="ps-2 w-100">
                    <h6 class="nome-produto">
                       ${c.nome}
                    </h6>

                    <p class="descricao-produto">
                        ${c.descricao}
                    </p>

                    <div class="acao d-flex justify-content-between align-items-end">
                        <span class="preco">R$ ${Intl.NumberFormat('pt-br', { minimumFractionDigits: 2 }).format(c.preco)}</span>
                        <button data-cid="${c.id}" class="adicionar">
                            +
                        </button>
                    </div>
                </div>
            </div>
        `)

    })
    containerCardapio.html(data);
}



function lerStorage() {
    return localStorage.produto ? JSON.parse(localStorage.produto) : [];
}

function salvarStorage(id_item) {
    const cid = id_item;
    const contentCart = lerStorage();

    if (localStorage.produto) {
        let index;
        const produto = contentCart.filter((produtoCart, i) => {
            if (produtoCart[0].id == cid) {
                index = i;
                return produtoCart[0]

            }

        })
        if (produto[0]) {
            maisUnidade(index)
        }
        else {
            const produto = Cardapio.filter((c) => c.id == cid)

            contentCart.push({ ...produto })
            localStorage.setItem('produto', JSON.stringify(contentCart))
            carregarStorage(lerStorage());
        }


    }
    else {
        const produto = Cardapio.filter((c) => c.id == cid)
        contentCart.push({ ...produto })
        localStorage.setItem('produto', JSON.stringify(contentCart))
        carregarStorage(lerStorage());
    }

}
function ContadorProdutos(quantidade)
{
    if(quantidade){
        $('.contador').removeClass('d-none').text(quantidade)
    }
    else
    {
        $('.contador').addClass('d-none')
    }
}
function carregarStorage(Cproduto) {
    let contarprodutos = 0;
    let calcularTotal = 0
    let botaoDiminuir = (quantidade, index) => { return quantidade > 1 ? `<button class="menos" onclick="menosUnidade(${index})" style="background-color: #D7986C">-</button>` : '<button class="menos" disabled="disabled">-</button>' }

    const retorno = Cproduto.map((c, index) => {
        contarprodutos+=c[0].qtd;
        return `
                <div class="card-produto d-flex" style="flex: 0">
                <div class="foto-produto">
                    <img src="./assets/img/${c[0].img}" alt="">
                </div>
                <div class="ms-2 w-100">
                    <h6 class="nome-produto">
                        ${c[0].nome} <span class="excluir" onclick="excluirProduto(${index})">X</span>
                    </h6>
                    <p class="descricao-produto">
                        ${c[0].descricao}
                    </p>
                    <div data-cid="${c[0].id}" class="operacao mt-2 d-flex justify-content-md-start gap-md-3 gap-0 justify-content-between">
                            ${botaoDiminuir(c[0].qtd, index)}
                            <span class="preco align-self-center">
                                x${c[0].qtd} - R$ ${carregarPreco(c[0].preco, c[0].qtd, index)}
                            </span>
                        <button class="mais" onclick="maisUnidade(${index})" >
                            +
                        </button>
                    </div>
                </div>
                </div> 
           `
    })
    if(retorno[0] != undefined)
    {
        ContadorProdutos(contarprodutos)
        containerCarrinho.html(retorno)
        
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
    containerCarrinho.html(` <p class="text-center" style="font-size: 20px;">Nenhum produto selecionado</p>`)
}

function maisUnidade(index) {

    let Produto = lerStorage()
    let NewPreco = Produto[index]

    NewPreco[0].qtd += 1
    Produto[index] = NewPreco

    localStorage.setItem('produto', JSON.stringify(Produto))
    carregarStorage(lerStorage())
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
    carregarCardapio(Cardapio);

    $('.adicionar').click(function () {
        salvarStorage($(this).attr('data-cid'));
    })

    $('.opcao').click(function (){
        $('.opcao').removeClass('selected')
        $(this).addClass('selected')
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

})



