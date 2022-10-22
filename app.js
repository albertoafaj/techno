const vm = new Vue({
    el: "#app",
    data: {
        produtos: [],
        produto: null,
        shoppingCart: [],
    },
    filters: {
        priceNumber(value) {
            return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
        }

    },
    computed: {
        shoppingCartValue() {
            let total = 0
            if (this.shoppingCart.length) {
                this.shoppingCart.forEach(item => {
                    total += item.preco
                })
            }
            return total
        }


    },
    methods: {
        fetchProdutos() {
            fetch("./api/produtos.json")
                .then(r => r.json())
                .then((json) => this.produtos = json)


        },
        fetchProduct(id) {
            fetch(`./api/produtos/${id}/dados.json`)
                .then(r => r.json())
                .then((json) => this.produto = json)
        },
        openModal(id) {
            this.fetchProduct(id);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        },
        closeModal({ target, currentTarget }) {
            if (target === currentTarget) this.produto = false;

        },
        addItem() {
            const { id, nome, preco } = this.produto
            this.produto.estoque--;
            this.shoppingCart.push({ id, nome, preco })
        },
        removeItem() {
            this.shoppingCart.splice(id, 1)
        }
    },
    created() {
        this.fetchProdutos();
    }

})