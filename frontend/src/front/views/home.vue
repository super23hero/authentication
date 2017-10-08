<template>
    <div class="introduction">
        <div class="introduction__text">
          Seja o Papai Noel de quem precisa. Em 2016 queremos realizar o desejo de cerca de 300 crianças de três instituições, de São Jose e Palhoça, municípios de Santa Catarina.
          Perguntamos o que elas gostariam de ganhar do bom velhinho e as respostas estão junto às fotos de cada criança. Participe adotando quantas crianças puder.
          Sua adoção é muito importante e consiste na doação do brinquedo escolhido.
        </div>
        <div class="introduction__img-container">
          <img src="http://www.adoteonatal.com.br/js/ckfinder/userfiles/images/novo_foto_adoteonatal.jpg" alt="" class="introduction__img" />
        </div>
        <div class="introduction__text">
          A entrega é por nossa conta. E com Papai Noel! Todos estão convidados a participar!
          Podemos coletar os presentes dentro da Grande Florianópolis ou comprar, caso você esteja mais distante ou sem tempo. Temos um grupo de voluntários para isso, não se preocupe!
          Veja fotos das Edições Anteriores clicando aqui!
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>

<style>
  .introduction {
    padding: 1rem
  }

  .introduction__text {
    padding: 1rem 0;
  }

  .introduction__img-container {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .introduction__img {
    width: 600px;
    height: inherit;
  }
</style>
