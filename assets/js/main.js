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

function AddCarrinho(id_item){
    const {cid} = id_item
    const retorno = Cardapio.map((c)=>{
        
        if (c.id == cid) {

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
        }
        else{
            console.log('n ta encontrando');
        }
    })

    containerCarrinho.html(retorno);
}



$(document).ready(function(){
    carregarCardapio(Cardapio);

    $('.adicionar').click(function(){
        AddCarrinho($(this).data());
        console.log($(this).data());
    })
})