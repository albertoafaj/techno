const vm = new Vue({
    el: "#app",
    data: {
        produtos: [],
        produto: false,
        shoppingCart: [],
        alertMsg: "Item adicionado",
        alertActive: false,
        activeShoppingCart: false,
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
        clickOutShoppingCart({ target, currentTarget }) {
            if (target === currentTarget) this.activeShoppingCart = false;

        },

        addItem() {
            const { id, nome, preco } = this.produto
            this.produto.estoque--;
            this.shoppingCart.push({ id, nome, preco })
            this.alert(`${nome} adicionado ao carrinho`)
        },
        removeItem(id) {
            this.shoppingCart.splice(id, 1)
        },
        checkLocalStorage() {
            if (window.localStorage.shoppingCart) {
                this.shoppingCart = JSON.parse(window.localStorage.shoppingCart)
            }
        },
        alert(message) {
            this.alertMsg = message;
            this.alertActive = true;
            setTimeout(() => {
                this.alertActive = false;

            }, 1000)
        },
        router() {
            const hash = document.location.hash;
            if (hash)
                this.fetchProduct(hash.replace("#", ""));
        },
        comparStock() {
            const items = this.carrinho.filter(({ id }) => id === this.produto.id);
            this.produto.estoque -= items.length;
        },

    },
    created() {
        this.fetchProdutos();
        this.checkLocalStorage();
        this.router();
    },
    watch: {
        produto() {
            document.title = this.produto || "Techno"
            const hash = this.produto.id || ""
            history.pushState(null, null, `#${hash}`)
            if (this.produto) {
                comparStock();
            }
        },
        shoppingCart() {
            window.localStorage.shoppingCart = JSON.stringify(this.shoppingCart);
        }
    }

})