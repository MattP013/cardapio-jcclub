const Cardapio = [
    {
        id:1,
        nome:'Café Expresso',
        categoria:'Bebida Quentes',
        preco: Intl.NumberFormat('pt-br',{minimumFractionDigits: 2}).format(14.00),
        descricao:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.',
        img:'logo-jc.jpg'
    },
    {
        id:2,
        nome:'Capuccino',
        categoria:'Bebida Quentes',
        preco: Intl.NumberFormat('pt-br',{minimumFractionDigits: 2}).format(28.90),
        descricao:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.',
        img:'logo-jc.jpg'
    },
    {
        id:3,
        nome:'Café Americano',
        categoria:'Bebida Quentes',
        preco:Intl.NumberFormat('pt-br',{minimumFractionDigits: 2}).format(14.00),
        descricao:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.',
        img:'logo-jc.jpg'
    },
    {
        id:4,
        nome:'Café com Leite',
        categoria:'Bebida Quentes',
        preco:Intl.NumberFormat('pt-br',{minimumFractionDigits: 2}).format(14.00),
        descricao:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.',
        img:'logo-jc.jpg'
    }
]

const containerCardapio = $('.wrapper'); 
const containerCarrinho = $('.container-carrinho')
function carregarCardapio (cardapio){
    const result = cardapio.map((c)=>{
        return  `
            <div class="card-produto d-flex">
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
                        <span class="preco">R$ ${c.preco}</span>
                        <button data-cid="${c.id}" class="adicionar">
                            +
                        </button>
                    </div>
                </div>
            </div>
        `  
               
    })
    containerCardapio.html(result);
}
function lerStorage(){
    return localStorage.produto ? JSON.parse(localStorage.produto) : [];
}

function salvarStorage(id_item){
    const {cid} = id_item;
    const contentCart = lerStorage();
    if(contentCart.lenght > 0)
    {
        const produto = contentCart.filter((p)=> p.id == cid ? true : false)

        if (!produto) {

            console.log(produto);
            const salvar = [...lerStorage(), produto]
            localStorage.setItem('produto', JSON.stringify(salvar)) 
            carregarStorage(lerStorage());
        }
        
    }
    else
    {
        const produto = Cardapio.filter((c) => c.id == cid)
        const salvar = [...lerStorage(), produto]
         localStorage.setItem('produto', JSON.stringify(salvar)) 
         carregarStorage(lerStorage());

    }
}

function carregarStorage(Cproduto){
    const retorno = Cproduto.map((c,i) => {
        // console.log(c[i].img);
        return  `
            <div class="card-produto d-flex" style="flex: 0">
                <div class="foto-produto">
                    <img src="./assets/img/${c[i].img}" alt="">
                </div>
                <div class="ps-2 w-100">
                    <h6 class="nome-produto">
                        ${c[i].nome}
                    </h6>

                    <p class="descricao-produto">
                        ${c[i].descricao}
                    </p>

                    <div class="acao d-flex justify-content-between align-items-end">
                        <span class="preco">R$ ${c[i].preco}</span>
                        <button data-cid="${c[i].id}" class="adicionar">
                            +
                        </button>
                    </div>
                </div>
            </div>
        ` 
    });
    // console.log(retorno);
    containerCarrinho.html(retorno);
}

function Carrinho(){
}



$(document).ready(function(){
    localStorage.clear()
    carregarCardapio(Cardapio);

    $('.adicionar').click(function(){
        salvarStorage($(this).data());
    })
})

