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
    const validar = lerStorage();
    if(validar.lenght >= 0)
    {
        const produto = validar.filter((p)=> p.id == cid ? null : p)

        if (produto != null) {
            const salvar = [...lerStorage(), produto]
            localStorage.setItem('produto', JSON.stringify(salvar)) 
            carregarStorage();
        }
    }
    else
    {
        const produto = Cardapio.filter((c) => c.id == cid)
        const salvar = [...lerStorage(), produto]
         localStorage.setItem('produto', JSON.stringify(salvar)) 
         carregarStorage();

    }
}

function carregarStorage(){
    console.log(lerStorage());
    const retorno = lerStorage().map((c) => {
        return  `
            <div class="card-produto d-flex" style="flex: 0">
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
    });
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

