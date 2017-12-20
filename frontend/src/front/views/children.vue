<template>
  <div class="adopt">
    <h1>Adote uma criança</h1>
    <div class="children-filter">
      <input type="text" class="children-filter__input">
      <select class="children-filter__input" id="children-input-age">
        <option value="" disabled selected hidden>Idade</option>
      </select>
      <select class="children-filter__input">
        <option value="" disabled selected hidden>Sexo</option>
        <option value="m">Masculino</option>
        <option value="f">Feminino</option>
      </select>
    </div>
    <div class="children-list">
      <div class="child-card">
        <div class="child-card__content">
          <div class="child-card__name">Joãozinho Junior</div>
          <img class="child-card__photo" src="http://cdn3.colorir.com/desenhos/pintar/o-crianca-feliz_2.png"/>
        </div>
        <button type="button" class="child-card__adopte-me">Adote me!</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'children',
    mounted() {
      console.log('Component mounted.')
    }
  }
</script>

<style>

  .children-filter {
    display: flex;
    justify-content: center;
    padding: 0.5rem;
  }

  .children-filter__input{
    margin: 0.5rem;
    border-radius: 3px;
    border: none;
    padding: 0.5rem;
    width: 10rem
  }

  .children-list {
    display: flex;
    justify-content: center;
    padding: 2rem;
    background-color: grey;
    flex-wrap: wrap;
  }

  .child-card {
    margin: 8px;
    width: 208px;
    height: 278px;
    border: 1px solid blueviolet;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
  }

  .child-card__content {
    flex: 1;
    height: 100%;
  }

  .child-card__name {
    width: 100%;
    text-align: center;
    font-size: 22px;
  }

  .child-card__photo {
    max-width: 210px;
    max-height: 210px;
  }

  .child-card__adopte-me {
    margin-top: 10px;
    background-color: greenyellow;
    border-radius: 4px;
    border: none;
    width: 100%;
    color: #000;
    font-weight: bold;
    font-size: 18px;
    padding: 1rem;
    cursor: pointer;
    transition: box-shadow 0.1s linear, background-color 0.1s linear;
    outline: none;
  }

  .child-card__adopte-me:hover,
  .child-card__adopte-me:focus {
    box-shadow: inset 0 0 4px 0 #000000;
  }

  .child-card__adopte-me:active {
    /*background-color: var(--button-pressed-bg);*/
  }

</style>
