const Cardapio = [
    {
        id:1,
        nome:'Café Expresso',
        categoria:'Bebida Quentes',
        preco: Intl.NumberFormat('pt-br',{minimumFractionDigits: 2}).format(14.00),
        descricao:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.',
        img:'logo-jc.jpg',
        qtd:1,
        novopreco:0
    },
    {
        id:2,
        nome:'Capuccino',
        categoria:'Bebida Quentes',
        preco: Intl.NumberFormat('pt-br',{minimumFractionDigits: 2}).format(28.90),
        descricao:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.',
        img:'logo-jc.jpg',
        qtd:1,
        novopreco:0
    },
    {
        id:3,
        nome:'Café Americano',
        categoria:'Bebida Quentes',
        preco:Intl.NumberFormat('pt-br',{minimumFractionDigits: 2}).format(14.00),
        descricao:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.',
        img:'logo-jc.jpg',
        qtd:1,
        novopreco:0
    },
    {
        id:4,
        nome:'Café com Leite',
        categoria:'Bebida Quentes',
        preco:Intl.NumberFormat('pt-br',{minimumFractionDigits: 2}).format(14.00),
        descricao:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.',
        img:'logo-jc.jpg',
        qtd:1,
        novopreco:0
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
    const cid = id_item;
    const contentCart = lerStorage();

        if (localStorage.produto) {
            let index;
             const produto = contentCart.filter((produtoCart, i) =>{ 
                if( produtoCart[0].id == cid){
                    index = i;
                    return produtoCart[0]
                    
                }
            
            })
            if(produto[0])
            {
                maisUnidade(index)
            }
            else
            {
                const produto = Cardapio.filter((c) => c.id == cid)
    
                contentCart.push({...produto})
                localStorage.setItem('produto', JSON.stringify(contentCart)) 
                carregarStorage(lerStorage());
            }
            
            
        }
        else{
          const produto = Cardapio.filter((c) => c.id == cid)
        
          contentCart.push({...produto})
          localStorage.setItem('produto', JSON.stringify(contentCart)) 
          carregarStorage(lerStorage());
        }

        
 
        // const produto = Cardapio.filter((c) => c.id == cid)

        // contentCart.push({...produto})
        // localStorage.setItem('produto', JSON.stringify(contentCart)) 
        // carregarStorage(lerStorage());
    
}

function carregarStorage(Cproduto){
    
        const retorno = Cproduto.map((c,i)=>{
           return `
                <div class="card-produto d-flex" style="flex: 0">
                <div class="foto-produto">
                    <img src="./assets/img/${c[0].img}" alt="">
                </div>
                <div class="ms-2 w-100">
                    <h6 class="nome-produto">
                        ${c[0].nome}
                    </h6>
                    <p class="descricao-produto">
                        ${c[0].descricao}
                    </p>
                    <div data-cid="${c[0].id}" class="operacao mt-2 d-flex justify-content-md-start gap-md-3 gap-0 justify-content-between">
                        <button class="menos" disabled="disabled">
                            -
                        </button>
                            <span class="preco align-self-center">
                                x${c[0].qtd} - R$ ${carregarPreco(c[0].preco, c[0].qtd)}
                            </span>
                        <button onclick="maisUnidade(${i})" class="mais" >
                            +
                        </button>
                    </div>
                </div>
                </div> 
           `
       })

    containerCarrinho.html(retorno)
}



function carregarPreco(preco, qtd){
    const NewPreco = preco.replace(',','.')

     return Intl.NumberFormat('pt-br',{minimumFractionDigits: 2}).format( NewPreco * qtd)
}

function maisUnidade( index){

    
    // const Qtd = Produto.children('.preco').attr('data-quantidade')
    let Produto = lerStorage()
    let NewPreco = Produto[index]
    let chave = NewPreco[0].id;
    console.log(chave);
    let ativarButton = $(`.operacao[data-cid=${chave}]`).children('.menos')
    ativarButton.attr('disabled')
    console.log(ativarButton);
    // $(this).find(':button[type=submit]').prop('disabled', true);

    NewPreco[0].qtd+= 1
    Produto[index] = NewPreco


    localStorage.setItem('produto', JSON.stringify(Produto))
    carregarStorage(lerStorage())
}   

function menosUnidade(index)
{

}

$(document).ready(function(){
    localStorage.clear()
    carregarCardapio(Cardapio);

    $('.adicionar').click(function(){
        salvarStorage($(this).attr('data-cid'));
    }) 
})

